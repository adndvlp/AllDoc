import {after, before, test} from 'node:test';
import assert from 'node:assert/strict';
import {resolve} from 'node:path';
import {readFile} from 'node:fs/promises';
import {WebR} from 'webr';
import {webRVersion} from '../src/practice/adapters/r/environment.ts';
import {createREngine} from '../src/practice/adapters/r/core.ts';
import {createRDataset, rCommerce} from '../src/practice/adapters/r/dataset.ts';
import {completeR} from '../src/practice/adapters/r/completion.ts';
import {isRuntimeEvent} from '../src/practice/protocol.ts';
import {rCurriculum} from '../src/content/r-curriculum.ts';
import type {RunRequest, RuntimeEvent} from '../src/practice/contracts.ts';

const webR = new WebR({interactive: false});
const engine = createREngine(webR, async () => {});
const dataset = await createRDataset().materialize(rCommerce, 'webr', new AbortController().signal);

before(async () => {
  const lock = JSON.parse(await readFile('specs/r-packages.lock.json', 'utf8')) as {packages: {name: string; version: string}[]};
  await webR.init();
  await webR.FS.mkdir('/r-fixtures');
  await webR.FS.mount('NODEFS', {root: resolve('.r-packages', webRVersion)}, '/r-fixtures');
  const paths = lock.packages.map(item => JSON.stringify(`/r-fixtures/${item.name}_${item.version}.tgz`));
  await webR.evalRVoid(`for (file in c(${paths.join(',')})) utils::untar(file, exdir=.libPaths()[[1]], tar="internal")`);
  await engine.init(dataset);
});
after(() => webR.close());

async function run(content: string, selection?: RunRequest['selection']) {
  const request = {runId: 'r-test', generation: 1, revision: 1, workspaceId: 'r', entryFile: 'main.R',
    files: [{path: 'main.R', languageId: 'r', content}], selection};
  const events: RuntimeEvent[] = [];
  await engine.run(request, event => events.push(event));
  assert.ok(events.every(event => isRuntimeEvent(event, request)));
  return events;
}

test('WebR mantiene tablas, tipos, NA y equipo de datos entre ejecuciones', async () => {
  const seed = await engine.inspect();
  const clientes = seed.entities.find(item => item.name === 'clientes');
  assert.deepEqual(clientes?.preview?.rows[3], [4, 'Pedro', null, '2026-02-15']);
  const code = 'stop("no ejecutar")\nventas <- pedidos |> dplyr::filter(monto > 150) |> select(id, monto)';
  const from = code.indexOf('\n') + 1;
  assert.equal((await run(code, {from, to: code.length})).at(-1)?.type, 'end');
  const result = (await run('ventas')).find(event => event.type === 'table');
  assert.deepEqual(result?.rows, [[102, 200], [103, 300]]);
  const schema = await engine.inspect();
  const document = 'ventas$mo';
  const completion = await completeR({requestId: 'r', generation: 1, revision: 1, workspaceId: 'r', file: 'main.R',
    document, position: document.length, schema}, engine.functionNames);
  assert.deepEqual(completion.items.map(item => item.label), ['monto']);
  assert.equal(completion.from, 7);
  const namespace = 'dplyr::fil';
  const functions = await completeR({requestId: 'r', generation: 1, revision: 1, workspaceId: 'r', file: 'main.R',
    document: namespace, position: namespace.length, schema}, engine.functionNames);
  assert.ok(functions.items.some(item => item.label === 'filter'));
});

test('WebR conserva consola y errores y entrega una gráfica PNG real de ggplot2', async () => {
  const bad = await run('cat("antes\\n"); stop("error de prueba")');
  assert.ok(bad.some(event => event.type === 'stream' && event.text.includes('antes')));
  assert.ok(bad.some(event => event.type === 'error' && event.message === 'error de prueba'));
  assert.equal(bad.at(-1)?.type, 'end');
  const events = await run('ggplot2::ggplot(productos, ggplot2::aes(producto, precio)) + ggplot2::geom_col()');
  const plot = events.find(event => event.type === 'figure');
  assert.ok(plot && plot.bytes.length > 1000);
  assert.deepEqual([...plot.bytes.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
});

test('WebR ejecuta los 190 ejemplos locales de R sobre los datos del temario', async () => {
  const scope = await new webR.Shelter();
  let count = 0;
  for (const {key} of rCurriculum) {
    const {notes} = await import(`../src/content/notes/r/${key}.ts`) as {notes: {examples: {id: string; code: string; external?: boolean}[]}[]};
    for (const example of notes.flatMap(note => note.examples).filter(example => !example.external)) {
      const result = await scope.captureR(`local({${dataset.bootstrap}\n${example.code}\n})`, {captureGraphics: false, throwJsException: false});
      try {
        const error = result.output.find(item => item.type === 'error');
        if (error) assert.fail(example.id + ' ' + (await (await error.data.get('message')).toArray())[0]);
        count++;
      } finally {await scope.purge();}
    }
  }
  assert.equal(count, 190);
});
