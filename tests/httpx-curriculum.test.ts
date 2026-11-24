import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
import {loadPyodide} from 'pyodide';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {httpxCurriculum} from '../src/content/httpx-curriculum.ts';
import {getPythonAdditionalPackages} from '../src/practice/adapters/python/environment.ts';
import {initializePythonVM} from '../src/practice/adapters/python/initialize.ts';
import {createPythonEngine} from '../src/practice/adapters/python/core.ts';
import {pythonPackages} from '../src/practice/adapters/python/packages.ts';
import type {RuntimeEvent} from '../src/practice/contracts.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';
import {editorBootstrap} from '../src/practice/editor-bootstrap.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';

const start = '/apuntes/analisis-de-datos/httpx/fundamentos-http/definicion';

test('httpx publica las 158 fichas y las registra en el buscador', () => {
  const topic = getTopics('analisis-de-datos').find(item => item.id === 'httpx');
  assert.equal(topic?.sections?.length, 28);
  assert.equal(topic.concepts.length, 158);
  const indexed = new Map(entries.map(entry => [entry.id, entry.href]));
  for (const group of topic.sections) {
    assert.equal(group.collapsed, true);
    assert.equal(group.concepts[0].label, 'Definición');
    for (const note of group.concepts) assert.equal(indexed.get(note.id), note.slug);
  }
  assert.match(execFileSync(process.execPath, ['scripts/prepare-httpx-notes.mjs', '--check'], {encoding: 'utf8'}), /158 fichas/);
});

test('httpx prepara sus clientes y sus cuatro pedidos sin compartir borradores con requests', async () => {
  const context = resolvePracticeContext(start);
  const requests = resolvePracticeContext('/apuntes/analisis-de-datos/requests/http-y-apis/definicion');
  assert.ok(context && requests);
  assert.notEqual(context.workspaceKey, requests.workspaceKey);
  assert.equal(context.profile.id, 'python-httpx');
  assert.equal(context.profile.capabilities.network, 'none');
  const {workspace, schema, environment} = await editorBootstrap(context);
  assert.match(workspace.files[0].content, /c\.get\("\/pedidos\/1"\)/);
  assert.ok(environment.packages.some(pkg => pkg.name === 'httpx' && pkg.version === '0.28.1'));
  assert.ok(environment.packages.some(pkg => pkg.name === 'httpcore'));
  assert.ok(!environment.packages.some(pkg => pkg.name === 'requests'));
  const data = await createDatasetAdapter().materialize(workspace.dataset, 'pyodide', new AbortController().signal);
  assert.deepEqual(data.schema, schema);
  assert.equal(schema.entities.find(entity => entity.name === 'pedidos')?.rowCount, 4);
  assert.match(data.bootstrap, /httpx\.AsyncClient\(base_url=BASE, transport=httpx\.MockTransport\(handler\)/);
});

test('Pyodide ejecuta los ejemplos de HTTPX con la biblioteca real sobre MockTransport', async () => {
  const pyodide = await initializePythonVM(loadPyodide, {
    lockFileContents: JSON.stringify(pythonPackages.lock), packageCacheDir: resolve('.python-packages', pythonPackages.runtimeVersion),
    jsglobals: Object.freeze({}), stdout() {}, stderr() {},
  }, getPythonAdditionalPackages('python-httpx'));
  assert.equal(pyodide.runPython('import httpx; httpx.__version__'), '0.28.1');
  const engine = createPythonEngine(pyodide);
  const data = await createDatasetAdapter().materialize({id: 'httpx-pedidos', version: 1}, 'pyodide', new AbortController().signal);
  await engine.init(data);
  try {
    assert.deepEqual(engine.inspect().entities.find(entity => entity.name === 'pedidos')?.preview?.rows[0],
      [1, 'Ana', 800, 'completed', '2026-08-01']);
    const document = 'import httpx\nhttpx.AsyncCl';
    const suggestions = engine.complete({requestId: 'httpx-jedi', generation: 1, revision: 0, workspaceId: 'httpx',
      file: 'main.py', document, position: document.length, schema: engine.inspect()});
    assert.ok(suggestions.items.some(item => item.label === 'AsyncClient'));
    const expected = new Map([
      ['httpx/fundamentos-http/definicion/1', '200 800'],
      ['httpx/programacion-asincrona/definicion/1', '800'],
      ['httpx/programacion-asincrona/asyncio-gather/1', '[1, 3, 4]'],
      ['httpx/programacion-asincrona/anyio-y-trio/1', '200'],
      ['httpx/transportes/asgitransport/1', 'ventas'],
      ['httpx/datos-de-api-y-validacion/interpretar-html/1', '800'],
    ]);
    const failures: string[] = [];
    const external: string[] = [];
    let revision = 0;
    for (const {key} of httpxCurriculum) {
      const {notes} = await import(`../src/content/notes/httpx/${key}.ts`) as {notes: {examples: {
        id: string; code: string; practiceCode?: string; external?: boolean;
      }[]}[]};
      for (const {id, code, practiceCode, external: local} of notes.flatMap(note => note.examples)) {
        if (local) {external.push(id); continue;}
        if (practiceCode) {
          assert.match(code, /^(?:asyncio\.run\(main\(\)\)|anyio\.run\(main\))$/m);
          assert.equal(practiceCode, code.replace(/\n(?:asyncio|anyio)\.run\([^\n]+$/, '\nawait main()'));
        }
        await engine.reset();
        const events: RuntimeEvent[] = [];
        await engine.run({runId: id, generation: 1, revision: ++revision, workspaceId: 'httpx',
          files: [{path: 'main.py', languageId: 'python', content: practiceCode ?? code}], entryFile: 'main.py'}, event => events.push(event));
        const error = events.find(event => event.type === 'error');
        const end = events.at(-1);
        if (error || end?.type !== 'end' || end.status !== 'success') failures.push(id + ' ' + (error?.message ?? 'ejecución incompleta'));
        if (expected.has(id)) {
          const printed = events.flatMap(event => event.type === 'stream' && event.channel === 'stdout' ? [event.text] : []).join('').trim();
          assert.equal(printed, expected.get(id), id);
          expected.delete(id);
        }
      }
    }
    assert.deepEqual(failures, []);
    assert.equal(revision, 150);
    assert.deepEqual(external, [
      'httpx/metodos-http/get/1', 'httpx/https-y-configuracion-del-entorno/certificados-de-cliente/1',
      'httpx/proxies-y-protocolos/socks/1', 'httpx/proxies-y-protocolos/http-1-1-y-http-2/1',
      'httpx/streaming-y-archivos/httpx-stream-y-client-stream/1', 'httpx/extensiones-de-bajo-nivel/tracing/1',
      'httpx/pruebas-de-integraciones-http/respx/1', 'httpx/pruebas-de-integraciones-http/pytest-httpx/1',
    ]);
    assert.deepEqual([...expected.keys()], []);
  } finally {engine.dispose();}
});
