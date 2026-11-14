import {test, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {loadPyodide, type PyodideAPI} from 'pyodide';
import {resolve} from 'node:path';
import {createPythonEngine, type PythonEngine} from '../src/practice/adapters/python/core.ts';
import {pythonPackages} from '../src/practice/adapters/python/packages.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';
import {isCompletionResult, isRuntimeEvent} from '../src/practice/protocol.ts';
import {initializePythonVM} from '../src/practice/adapters/python/initialize.ts';
import type {CompletionRequest, MaterializedDataset, RunRequest, RuntimeEvent} from '../src/practice/contracts.ts';

let pyodide: PyodideAPI; let dataset: MaterializedDataset;
const engines: PythonEngine[] = [];
before(async () => {
  pyodide = await initializePythonVM(loadPyodide, {lockFileContents: JSON.stringify(pythonPackages.lock),
    packageCacheDir: resolve('.python-packages', pythonPackages.runtimeVersion),
    jsglobals: Object.freeze({}), stdout() {}, stderr() {}});
  assert.equal(pyodide.version, pythonPackages.runtimeVersion);
  assert.equal(pyodide.runPython('import pandas, jedi; pandas.__version__'), pythonPackages.lock.packages.pandas.version);
  assert.equal(pyodide.runPython('jedi.__version__'), pythonPackages.lock.packages.jedi.version);
  dataset = await createDatasetAdapter().materialize({id: 'productos-basico', version: 1}, 'pyodide', new AbortController().signal);
});
after(() => {for (const engine of engines) engine.dispose();});
async function engine() {const value = createPythonEngine(pyodide); engines.push(value); await value.init(dataset); return value;}
let sequence = 0;
async function run(engine: PythonEngine, content: string, selection?: RunRequest['selection']) {
  const request: RunRequest = {runId: 'python-'+(++sequence), generation: 1, revision: sequence, workspaceId: 'pandas',
    files: [{path: 'main.py', languageId: 'python', content}], entryFile: 'main.py', selection};
  const events: RuntimeEvent[] = []; await engine.run(request, (event) => events.push(event));
  assert.ok(events.every((event) => isRuntimeEvent(event, request)));
  assert.equal(events.filter((event) => event.type === 'end').length, 1); return events;
}
const tables = (events: RuntimeEvent[]) => events.filter((event) => event.type === 'table');
function complete(engine: PythonEngine, document: string, position = document.length) {
  const request: CompletionRequest = {requestId: 'completion-'+(++sequence), generation: 1, revision: sequence, workspaceId: 'pandas',
    file: 'main.py', document, position, schema: engine.inspect()};
  const result = engine.complete(request); assert.ok(isCompletionResult(result, request)); return result;
}

test('Pyodide real: dataset compartido, DataFrame filtrado y precio numérico', async () => {
  const value = await engine(); const result = tables(await run(value, 'productos[productos["precio"] > 300][["nombre", "precio"]]'));
  assert.deepEqual(result[0].rows, [['Teclado', 500], ['Monitor', 3500]]);
  assert.deepEqual(result[0].columns.map((c) => c.type), ['text', 'integer']);
  assert.equal(value.inspect().entities[0].rowCount, 3);
});
test('Pyodide real: variables y cambios parciales persisten; reiniciar datos no modifica el paquete ni otra sesión', async () => {
  const a = await engine(), b = await engine();
  const error = await run(a, 'numero = 7\nproductos["precio"] = 1\nventas = productos[["precio"]].copy()\nraise ValueError("fallo real")');
  assert.equal(error.at(-1)?.type, 'end'); assert.ok(error.some((e) => e.type === 'error' && e.message.includes('fallo real')));
  assert.deepEqual(tables(await run(a, 'productos[["precio"]]'))[0].rows, [[1], [1], [1]]);
  assert.deepEqual(tables(await run(b, 'productos[["precio"]]'))[0].rows, [[500], [250], [3500]]);
  assert.ok(a.inspect().entities.some((e) => e.name === 'ventas'));
  const scalar = await run(a, 'numero + 1'); assert.ok(scalar.some((e) => e.type === 'stream' && e.text.includes('8')));
  await a.reset(); assert.ok(!a.inspect().entities.some((e) => e.name === 'ventas'));
  assert.deepEqual(tables(await run(a, 'productos[["precio"]]'))[0].rows, [[500], [250], [3500]]);
});
test('Pyodide real: stdout/stderr, await y última expresión; sintaxis y traceback conservan archivo y línea', async () => {
  const value = await engine(); const result = await run(value, 'import sys, asyncio\nprint("salida ñ")\nprint("aviso", file=sys.stderr)\nawait asyncio.sleep(0)\nproductos.head(1)');
  assert.ok(result.some((e) => e.type === 'stream' && e.channel === 'stdout' && e.text.includes('salida ñ')));
  assert.ok(result.some((e) => e.type === 'stream' && e.channel === 'stderr' && e.text.includes('aviso')));
  assert.deepEqual(tables(result)[0].rows[0], ['Teclado', 'Accesorios', 500]);
  for (const content of ['x = 1\nraise ValueError("real")', 'x = 1\nif:']) {
    const events = await run(value, content); const error = events.find((e) => e.type === 'error')!;
    assert.equal(error.file, 'main.py'); assert.equal(error.line, 2);
    const end = events.at(-1); assert.equal(end?.type === 'end' && end.status, 'error');
  }
});
test('Pyodide real: selección UTF-16 no ejecuta el resto y sitúa errores en el archivo original', async () => {
  const value = await engine(); const text = '# 😀\nproductos.head(1)\nraise Exception("no debe ejecutarse")';
  const from = text.indexOf('productos'), to = text.indexOf('\nraise');
  assert.equal(tables(await run(value, text, {from, to}))[0].rows.length, 1);
  const bad = '# 😀\nraise ValueError("selección")'; const selected = await run(value, bad, {from: bad.indexOf('raise'), to: bad.length});
  const error = selected.find((e) => e.type === 'error')!; assert.equal(error.file, 'main.py'); assert.equal(error.line, 2);
});
test('Pyodide real: null, vacío, booleano, bigint, fechas, cero filas y truncamiento son serializables', async () => {
  const value = await engine();
  const result = tables(await run(value, 'pd.DataFrame({"vacio": [None], "texto": [""], "activo": [True], "grande": [2**63-1], "fecha": [pd.Timestamp("2026-01-02")]})'))[0];
  assert.deepEqual(result.rows, [[null, '', true, '9223372036854775807', '2026-01-02T00:00:00']]);
  assert.equal(result.columns[3].type, 'bigint');
  const empty = tables(await run(value, 'productos.head(0)'))[0]; assert.equal(empty.rows.length, 0); assert.equal(empty.columns.length, 3);
  const large = tables(await run(value, 'pd.DataFrame({"x": range(1000)})'))[0]; assert.equal(large.rows.length, 200); assert.equal(large.truncated, true);
});
test('Pyodide real: Jedi completa pandas sin ejecutar el programa; columnas siguen solo DataFrames registrados', async () => {
  const value = await engine();
  const jedi = complete(value, 'raise Exception("no ejecutar")\nimport pandas as pd\npd.Da');
  assert.ok(jedi.items.some((e) => e.label === 'DataFrame'));
  const columns = complete(value, 'productos["pre'); assert.ok(columns.items.some((e) => e.label === 'precio'));
  assert.equal(complete(value, 'sin_registrar["pre').items.some((e) => e.label === 'precio'), false);
  await run(value, 'ventas = productos.rename(columns={"precio": "importe"})\ndel productos');
  assert.ok(complete(value, 'ventas["imp').items.some((e) => e.label === 'importe'));
  assert.equal(complete(value, 'productos["pre').items.some((e) => e.label === 'precio'), false);
});
test('Pyodide real: offsets de sugerencia son UTF-16 y disponer libera el entorno del núcleo', async () => {
  const value = await engine(); const doc = '# 😀\nimport pandas as pd\npd.Da'; const result = complete(value, doc);
  assert.equal(result.from, doc.length - 2); assert.equal(result.to, doc.length);
  value.dispose(); assert.throws(() => value.inspect(), /entorno|dispuesto/i);
});

test('Pyodide real: completar columnas usa el esquema y no invoca propiedades del objeto del usuario', async () => {
  const value = await engine(); const schema = value.inspect();
  await run(value, 'class Trampa(type(productos)):\n    @property\n    def columns(self):\n        raise AssertionError("no invocar la propiedad durante análisis")\nproductos.__class__ = Trampa');
  const document = 'productos["pre';
  const result = value.complete({requestId: 'metadata-only', generation: 1, revision: 1, workspaceId: 'pandas', file: 'main.py', document, position: document.length, schema});
  assert.ok(result.items.some((item) => item.label === 'precio'));
});

test('Pyodide real: límites UTF-8 de código y stdout dejan un final explícito y permiten seguir ejecutando', async () => {
  const value = await engine();
  const output = await run(value, 'print("ñ" * 600000)');
  const end = output.at(-1); assert.equal(end?.type === 'end' && end.status, 'error');
  assert.equal(output.filter((event) => event.type === 'error').length, 1);
  assert.match(output.find((event) => event.type === 'error')!.message, /límite de salida.*1 MiB/);
  assert.ok(output.reduce((sum, event) => sum + new TextEncoder().encode(JSON.stringify(event)).byteLength, 0) <= 1_048_576);
  assert.deepEqual(tables(await run(value, 'productos.head(1)'))[0].rows, [['Teclado', 'Accesorios', 500]]);
  const code = await run(value, '#' + 'ñ'.repeat(600000));
  assert.ok(code.some((event) => event.type === 'error' && event.message.includes('1 MiB')));
});

test('Pyodide real: una función de una ejecución anterior conserva su excepción y señala la llamada actual', async () => {
  const value = await engine();
  await run(value, 'def falla():\n    numero = 1\n    raise ValueError("función conservada")');
  const events = await run(value, 'falla()'); const error = events.find((event) => event.type === 'error')!;
  assert.equal(error.message, 'ValueError: función conservada'); assert.equal(error.file, 'main.py'); assert.equal(error.line, 1);
});
