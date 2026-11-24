import type {PyodideAPI} from 'pyodide';
import type {PyProxy} from 'pyodide/ffi';
import type {CompletionRequest, CompletionResult, MaterializedDataset, RunRequest, RuntimeEvent, RuntimeSchema} from '../../contracts.ts';
import {pythonHelper} from './helpers.ts';
import {pythonFigures} from './figures.ts';
import {eventBytes, isArtifactFile, isPlotExportPath, isRuntimeEvent, isWorkbookPath, MAX_ARTIFACT_BYTES} from '../../protocol.ts';
import {isRuntimeSchema} from '../../isolation/messages.ts';
import {practicePhase} from '../../timing.ts';

export interface PythonEngine {
  init(dataset: MaterializedDataset): Promise<void>;
  run(request: RunRequest, emit: (event: RuntimeEvent) => void): Promise<void>;
  inspect(): RuntimeSchema;
  complete(request: CompletionRequest): CompletionResult;
  reset(): Promise<void>;
  dispose(): void;
}

function* artifactPaths(fs: PyodideAPI['FS'], root: string, accepts: (path: string) => boolean) {
  const folders = [''];
  let remaining = 200;
  while (folders.length && remaining > 0) {
    const folder = folders.shift()!;
    for (const name of fs.readdir(root + folder).sort()) {
      if (name === '.' || name === '..') continue;
      if (remaining-- === 0) return;
      const absolute = root + folder + '/' + name;
      const stats = fs.lstat(absolute);
      if (fs.isDir(stats.mode)) {
        folders.push(folder + '/' + name);
        continue;
      }
      const path = (folder + '/' + name).slice(1);
      if (!fs.isFile(stats.mode) || !accepts(path) || stats.size > MAX_ARTIFACT_BYTES) continue;
      yield {path, absolute, stamp: stats.mtime.getTime() + ':' + stats.size};
    }
  }
}

export function createPythonEngine(pyodide: PyodideAPI, {figures = false} = {}): PythonEngine {
  type Namespace = PyProxy & {set(key: string, value: unknown): void; has(key: string): boolean; delete(key: string): boolean};
  let scope: Namespace | null = null; let seed: MaterializedDataset | null = null; let version = 0; let disposed = false;
  const root = '/home/pyodide/alldoc-' + crypto.randomUUID();
  const encoder = new TextEncoder();
  const requireScope = () => {if (!scope || disposed) throw new Error('El entorno Python está dispuesto o no está preparado'); return scope;};
  const evaluate = (code: string) => pyodide.runPython(code, {globals: requireScope()});
  async function reset() {
    if (!seed) throw new Error('Faltan los datos iniciales');
    const previous = pyodide.FS.cwd(); pyodide.FS.mkdirTree(root); pyodide.FS.chdir(root);
    try {
      for (const file of seed.files) {
        const slash = file.path.lastIndexOf('/'); if (slash >= 0) pyodide.FS.mkdirTree(file.path.slice(0, slash));
        pyodide.FS.writeFile(file.path, file.bytes);
      }
      requireScope().set('_bootstrap', seed.bootstrap);
      requireScope().set('_inspect_variables', JSON.stringify(Object.fromEntries(seed.schema.entities
        .filter(entity => entity.kind === 'variable')
        .map(entity => [entity.name, entity.columns.map(column => column.name)]))));
      requireScope().set('_inspect_tables', JSON.stringify(seed.schema.entities
        .filter(entity => entity.kind === 'table').map(entity => entity.name)));
      requireScope().set('_inspect_workbook', seed.reference.id === 'openpyxl-ventas');
      requireScope().set('_inspect_scipy', seed.reference.id === 'scipy-negocio');
      requireScope().set('_inspect_sqlalchemy', seed.reference.id === 'sqlalchemy-ventas');
      requireScope().set('_inspect_figures', figures);
      requireScope().set('_inspect_seaborn', seed.reference.id === 'seaborn-sucursales');
      if (figures) evaluate('_reset_figures()');
      evaluate('_prepare(_bootstrap)'); requireScope().delete('_bootstrap'); version++;
    } finally {pyodide.FS.chdir(previous);}
  }
  return {
    async init(dataset) {
      if (disposed) throw new Error('El entorno Python está dispuesto');
      if (scope) throw new Error('El entorno Python ya está preparado');
      scope = pyodide.runPython('dict()') as Namespace;
      try {await practicePhase('python-data', async () => {
        evaluate(pythonHelper);
        if (figures) evaluate(pythonFigures);
        seed = dataset;
        await reset();
      });}
      catch (error) {scope.destroy(); scope = null; throw error;}
    },
    async run(request, emit) {
      const identity = {protocolVersion: 1 as const, runId: request.runId, generation: request.generation, revision: request.revision};
      let bytes = 0; let limited = false; let sawError = false; let status: 'success' | 'error' = 'success';
      const pending = {stdout: '', stderr: ''}; let streamCount = 0;
      const send = (body: Record<string, unknown>) => {
        const event = {...body, ...identity};
        if (!isRuntimeEvent(event, request) || event.type === 'end') throw new Error('Salida Python incompatible con el protocolo');
        if (event.type === 'error') {
          if (!sawError) {sawError = true; emit({...event, message: limited ? 'Se alcanzó el límite de salida de 1 MiB' : event.message.slice(0, 2048)});} return;
        }
        const length = eventBytes(event, encoder);
        if (limited || bytes + length > 1_048_576 - 4096) {limited = true; throw new Error('Se alcanzó el límite de salida de 1 MiB');}
        bytes += length; emit(event);
      };
      const flush = (channel: 'stdout' | 'stderr') => {
        if (!pending[channel]) return;
        const text = pending[channel]; pending[channel] = ''; streamCount++;
        send({type: 'stream', channel, text});
      };
      const sendArtifact = (artifact: Omit<Extract<RuntimeEvent, {type: 'figure'}>, keyof typeof identity>
        | Omit<Extract<RuntimeEvent, {type: 'file'}>, keyof typeof identity>) => {
        flush('stdout'); flush('stderr');
        const event = {...artifact, ...identity};
        if (isRuntimeEvent(event, request) && bytes + eventBytes(event, encoder) <= MAX_ARTIFACT_BYTES - 8192) send(artifact);
      };
      const writer = (channel: 'stdout' | 'stderr') => {
        const decoder = new TextDecoder();
        return {write(buffer: Uint8Array) {
          pending[channel] += decoder.decode(buffer, {stream: true});
          if ((streamCount < 25 && pending[channel].includes('\n')) || pending[channel].length >= 4096) flush(channel);
          return buffer.byteLength;
        }};
      };
      const previous = pyodide.FS.cwd();
      let capturing = false;
      try {
        const own = requireScope(); const file = request.files.find((f) => f.path === request.entryFile);
        if (!file) throw new Error('Archivo Python inexistente');
        const selection = request.selection;
        if (selection && (!Number.isSafeInteger(selection.from) || !Number.isSafeInteger(selection.to) || selection.from < 0 || selection.to <= selection.from || selection.to > file.content.length)) throw new Error('Selección inválida');
        const prefix = selection ? file.content.slice(0, selection.from) : '';
        const source = selection ? file.content.slice(selection.from, selection.to) : file.content;
        if (encoder.encode(source).byteLength > 1_048_576) throw new Error('El código supera 1 MiB');
        pyodide.FS.chdir(root);
        for (const file of request.files) {
          const slash = file.path.lastIndexOf('/'); if (slash >= 0) pyodide.FS.mkdirTree(file.path.slice(0, slash));
          pyodide.FS.writeFile(file.path, file.content);
        }
        own.set('_request', JSON.stringify({entryFile: request.entryFile, source, lineOffset: prefix.split('\n').length - 1, columnOffset: prefix.length - prefix.lastIndexOf('\n') - 1}));
        own.set('_publish', (value: string) => {flush('stdout'); flush('stderr'); send(JSON.parse(value));});
        pyodide.setStdout(writer('stdout')); pyodide.setStderr(writer('stderr'));
        const previousExports = new Map<string, string>();
        if (figures) {
          for (const file of artifactPaths(pyodide.FS, root, isPlotExportPath)) previousExports.set(file.path, file.stamp);
          own.set('_publish_figure', (title: string, bytes: Uint8Array) => sendArtifact({type: 'figure', title, bytes}));
          evaluate('_start_figures()');
          capturing = true;
        }
        send({type: 'progress', phase: 'Ejecutando Python'});
        const result = await pyodide.runPythonAsync('await _run(_request)', {globals: own});
        flush('stdout'); flush('stderr');
        status = result === 'error' || limited ? 'error' : 'success';
        if (capturing) {
          capturing = false;
          evaluate(status === 'success' ? '_finish_figures(True)' : '_finish_figures(False)');
        }
        const accepts = figures ? isPlotExportPath : seed?.reference.id === 'openpyxl-ventas' ? isWorkbookPath : null;
        if (status === 'success' && accepts) {
          for (const file of artifactPaths(pyodide.FS, root, accepts)) {
            if (previousExports.get(file.path) === file.stamp) continue;
            sendArtifact({type: 'file', path: file.path, bytes: pyodide.FS.readFile(file.absolute)});
          }
        }
      } catch (error) {
        status = 'error';
        send({type: 'error', file: request.entryFile, message: error instanceof Error ? error.message : String(error)});
      } finally {
        // El panel recibe datos normalizados o bytes, nunca un DataFrame/PyProxy.
        if (capturing) evaluate('_finish_figures(False)');
        if (scope?.has('_publish_figure')) scope.delete('_publish_figure');
        if (scope?.has('_publish')) scope.delete('_publish');
        if (scope?.has('_request')) scope.delete('_request');
        pyodide.setStdout({batched() {}}); pyodide.setStderr({batched() {}});
        pyodide.FS.chdir(previous); version++;
      }
      if (limited && !sawError) send({type: 'error', file: request.entryFile, message: 'Se alcanzó el límite de salida de 1 MiB'});
      emit({...identity, type: 'end', status, environmentReset: false});
    },
    inspect() {
      const schema: RuntimeSchema = {version, entities: JSON.parse(evaluate('_inspect()'))};
      if (!isRuntimeSchema(schema)) throw new Error('Esquema Python incompatible'); return schema;
    },
    complete(request) {
      requireScope().set('_completion', JSON.stringify(request));
      try {return {requestId: request.requestId, generation: request.generation, workspaceId: request.workspaceId, revision: request.revision,
        file: request.file, ...JSON.parse(evaluate('_complete(_completion)'))};}
      finally {requireScope().delete('_completion');}
    },
    reset,
    dispose() {
      if (disposed) return;
      if (figures && scope) evaluate('_plt.close("all")');
      disposed = true; scope?.destroy(); scope = null; seed = null;
    },
  };
}
