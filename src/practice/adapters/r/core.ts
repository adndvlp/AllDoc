import type {WebR, RObject} from 'webr';
import type {Cell, ColumnType, DataColumn, MaterializedDataset, RunRequest, RuntimeEvent, RuntimeSchema} from '../../contracts.ts';
import {MAX_ARTIFACT_BYTES, isRuntimeEvent} from '../../protocol.ts';
import {rCommerceBootstrap} from '../../datasets/rows/r-commerce.ts';
import {rPackageReferences} from './package-references.ts';

// Los valores de tabla se recortan antes de cruzar el puente del Worker.
const encodeFrame = `function(data, limit) {
  count <- nrow(data)
  size <- ncol(data)
  n <- min(count, limit)
  data <- as.data.frame(data)[seq_len(n), seq_len(min(size, 40L)), drop = FALSE]
  kind <- function(x) {
    if (inherits(x, "Date")) "date" else if (inherits(x, "POSIXt")) "datetime"
    else if (is.factor(x)) "text" else if (is.logical(x)) "boolean"
    else if (is.integer(x)) "integer" else if (is.double(x)) "number" else "text"
  }
  types <- vapply(data, kind, character(1))
  values <- Map(function(x, type) {
    if (type %in% c("date", "datetime", "text")) substr(as.character(x), 1L, 512L)
    else { x[!is.finite(x)] <- NA; x }
  }, data, types)
  list(count, count > n || size > length(data), substr(names(data), 1L, 120L), unname(types), unname(values))
}`;

type Vector = {values?: unknown[]};
type Preview = {columns: DataColumn[]; rows: Cell[][]; rowCount: number; truncated: boolean};

function preview(value: Vector): Preview {
  const [count, truncated, names, types, data] = (value.values ?? []) as Vector[];
  const columns = (names?.values ?? []).map((name, index) => ({name: String(name), type: types.values?.[index] as ColumnType}));
  const vectors = data?.values as Vector[] ?? [];
  const rowCount = Number(count.values?.[0] ?? 0);
  const rows = Array.from({length: vectors[0]?.values?.length ?? 0}, (_, row) =>
    vectors.map(vector => (vector.values?.[row] ?? null) as Cell));
  return {columns, rows, rowCount, truncated: truncated.values?.[0] === true};
}

export function createREngine(webR: WebR, install: (names: string[]) => Promise<void>) {
  let version = 0;
  let graphRun = 0;
  const inspected = `local({
    names <- head(Filter(function(name) !bindingIsActive(name, .GlobalEnv) &&
      is.data.frame(get(name, .GlobalEnv)), ls(.GlobalEnv)), 32L)
    names <- names[nchar(names) <= 200L]
    setNames(lapply(names, function(name) (${encodeFrame})(get(name, .GlobalEnv), 12L)), names)
  })`;

  async function inspect(): Promise<RuntimeSchema> {
    const scope = await new webR.Shelter();
    try {
      const frames = await (await scope.evalR(inspected)).toJs({depth: 5}) as {names: string[] | null; values: Vector[]};
      return {version, entities: (frames.names ?? []).map((name, index) => {
        const {rowCount, ...table} = preview(frames.values[index]);
        return {name, kind: 'dataframe', columns: table.columns, rowCount, preview: table};
      })};
    } finally {await scope.purge();}
  }

  return {
    async init(dataset: MaterializedDataset) {
      if (dataset.bootstrap !== rCommerceBootstrap) throw new Error('Datos de R incompatibles');
      await install(['dplyr', 'tidyr']);
      await webR.evalRVoid(`suppressPackageStartupMessages({${dataset.bootstrap}\n})`);
    },
    inspect,
    async run(request: RunRequest, emit: (event: RuntimeEvent) => void) {
      const file = request.files.find(item => item.path === request.entryFile && item.languageId === 'r');
      if (!file) throw new Error('Archivo R inválido');
      const identity = {protocolVersion: 1 as const, runId: request.runId, generation: request.generation, revision: request.revision};
      const code = request.selection ? file.content.slice(request.selection.from, request.selection.to) : file.content;
      const offset = request.selection ? file.content.slice(0, request.selection.from).split('\n').length - 1 : 0;
      const folder = '/tmp/alldoc-r-figures-' + ++graphRun;
      const scope = await new webR.Shelter();
      let status: 'success' | 'error' = 'success';
      function report(message: string) {
        status = 'error';
        const line = /<text>:(\d+):/.exec(message)?.[1];
        emit({...identity, type: 'error', file: file!.path, message: message.slice(0, 4000),
          ...(line ? {line: offset + Number(line)} : {})});
      }
      try {
        const packages = rPackageReferences(code);
        if (packages.length) await install(packages);
        await webR.FS.mkdir(folder);
        const result = await scope.captureR(`(function() {
          previous <- base::options(device = function(...) grDevices::png(${JSON.stringify(folder + '/figure-%02d.png')},
            width = 760L, height = 440L, bg = "white", type = "cairo"))
          base::on.exit({ while (grDevices::dev.cur() > 1L) grDevices::dev.off(); base::options(previous) })
          code <- base::parse(text = ${JSON.stringify(code)}, keep.source = TRUE)
          output <- NULL
          for (i in base::seq_along(code)) {
            item <- base::withVisible(base::eval(code[[i]], base::.GlobalEnv))
            if (!item$visible) next
            if (i == length(code) && base::is.data.frame(item$value)) output <- (${encodeFrame})(item$value, 100L)
            else base::print(item$value)
          }
          output
        })()`, {captureGraphics: false, throwJsException: false});
        for (const entry of result.output) {
          const message = typeof entry.data === 'string' ? entry.data
            : (await (await entry.data.get('message')).toArray())[0] ?? '';
          if (entry.type === 'error') report(message);
          else if (message) emit({...identity, type: 'stream', channel: entry.type === 'stdout' ? 'stdout' : 'stderr', text: (message + '\n').slice(0, 4000)});
        }
        if (status === 'success' && await result.result.type() === 'list') {
          const {columns, rows, truncated} = preview(await result.result.toJs({depth: 4}) as Vector);
          const event = {...identity, type: 'table' as const, columns, rows, truncated};
          if (isRuntimeEvent(event)) emit(event);
        }
        const {contents} = await webR.FS.lookupPath(folder);
        const files = Object.keys(contents ?? {}).filter(name => /^figure-\d+\.png$/.test(name)).sort();
        for (const [index, name] of files.slice(0, 6).entries()) {
          const bytes = await webR.FS.readFile(folder + '/' + name);
          const event = {...identity, type: 'figure' as const, title: 'Gráfica ' + (index + 1), bytes};
          if (bytes.length <= MAX_ARTIFACT_BYTES && isRuntimeEvent(event)) emit(event);
        }
      } catch (error) {report(error instanceof Error ? error.message : String(error));}
      finally {
        await webR.evalRVoid(`unlink(${JSON.stringify(folder)}, recursive = TRUE)`).catch(() => {});
        await scope.purge();
      }
      version++;
      emit({...identity, type: 'end', status, environmentReset: false});
    },
    async functionNames(packageName: string) {
      // Solo consulta namespaces que ya se cargaron. El autocompletado no instala ni ejecuta el documento.
      if (!/^[A-Za-z][A-Za-z0-9.]*$/.test(packageName)) return [];
      const scope = await new webR.Shelter();
      try {
        const result = await scope.evalR(`if (${JSON.stringify(packageName)} %in% loadedNamespaces()) getNamespaceExports(${JSON.stringify(packageName)}) else character()`);
        return ((await result.toJs({depth: 1}) as Vector).values ?? []).filter((name): name is string => typeof name === 'string');
      } finally {await scope.purge();}
    },
  };
}
