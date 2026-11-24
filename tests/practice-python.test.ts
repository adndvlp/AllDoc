import {test, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {loadPyodide, type PyodideAPI} from 'pyodide';
import {resolve} from 'node:path';
import {createPythonEngine, type PythonEngine} from '../src/practice/adapters/python/core.ts';
import {pythonPackages} from '../src/practice/adapters/python/packages.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';
import {isCompletionResult, isRuntimeEvent} from '../src/practice/protocol.ts';
import {initializePythonVM} from '../src/practice/adapters/python/initialize.ts';
import {pandasCurriculum} from '../src/content/pandas-curriculum.ts';
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

test('Pyodide real: los 214 ejemplos integrados de pandas ejecutan sobre los datos compartidos', async () => {
  const course = await createDatasetAdapter().materialize({id: 'pandas-comercio', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide);
  engines.push(value);
  await value.init(course);
  const schema = (entities: typeof course.schema.entities) => entities.map(({name, rowCount, columns}) => ({name, rowCount, columns}))
    .sort((first, second) => first.name.localeCompare(second.name));
  assert.deepEqual(schema(value.inspect().entities), schema(course.schema.entities));
  let executed = 0;
  let external = 0;
  for (const {key} of pandasCurriculum) {
    const {notes} = await import(`../src/content/notes/pandas/${key}.ts`) as {notes: {examples: {
      id: string; code: string; external?: boolean;
    }[]}[]};
    for (const example of notes.flatMap(note => note.examples)) {
      if (example.external) { external++; continue; }
      await value.reset();
      const events = await run(value, example.code);
      assert.ok(events.some(event => event.type === 'end' && event.status === 'success'),
        example.id + ': ' + events.find(event => event.type === 'error')?.message);
      if (example.id === 'pandas/seleccion-de-datos/loc/1') {
        assert.deepEqual(tables(events)[0].rows, [[101, 100], [102, 200], [103, 150]]);
      }
      executed++;
    }
  }
  assert.equal(executed, 214);
  assert.equal(external, 10);
});

test('Pyodide real: json muestra pedidos anidados, ejecuta sus ejemplos y recupera los datos iniciales', async () => {
  const {jsonCurriculum} = await import('../src/content/json-curriculum.ts');
  const course = await createDatasetAdapter().materialize({id: 'json-pedidos', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide);
  engines.push(value);
  await value.init(course);
  const orders = () => value.inspect().entities.find(entity => entity.name === 'pedidos');
  assert.equal(orders()?.kind, 'variable');
  assert.equal(orders()?.rowCount, 3);
  assert.deepEqual(orders()?.columns, course.schema.entities[0].columns);
  assert.deepEqual(orders()?.preview?.rows.map(row => row[0]), [101, 102, 103]);
  assert.match(String(orders()?.preview?.rows[0][1]), /Ana/);
  await run(value, 'pedidos.pop()\nruta.write_text("[]", encoding="utf-8")');
  assert.equal(orders()?.rowCount, 2);
  await value.reset();
  const restored = await run(value, 'print(len(json.loads(ruta.read_text(encoding="utf-8"))), len(ruta_jsonl.read_text().splitlines()))');
  assert.ok(restored.some(event => event.type === 'stream' && event.text.trim() === '3 3'));
  assert.equal(orders()?.rowCount, 3);
  assert.ok(complete(value, 'import json\njson.loa').items.some(item => item.label === 'loads'));

  let executed = 0;
  let external = 0;
  for (const {key} of jsonCurriculum) {
    const {notes} = await import(`../src/content/notes/json/${key}.ts`) as {notes: {examples: {
      id: string; code: string; language: string; external?: boolean;
    }[]}[]};
    for (const example of notes.flatMap(note => note.examples)) {
      if (example.external) { external++; continue; }
      assert.equal(example.language, 'python');
      await value.reset();
      const events = await run(value, example.code);
      assert.ok(events.some(event => event.type === 'end' && event.status === 'success'),
        example.id + ': ' + events.find(event => event.type === 'error')?.message);
      executed++;
    }
  }
  assert.equal(executed, 81);
  assert.equal(external, 9);
});

test('Pyodide real: NumPy muestra sus arrays y reproduce las salidas de los 196 ejemplos del editor', async () => {
  const {numpyCurriculum} = await import('../src/content/numpy-curriculum.ts');
  const course = await createDatasetAdapter().materialize({id: 'numpy-ventas', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide);
  engines.push(value);
  await value.init(course);
  const sales = () => value.inspect().entities.find(entity => entity.name === 'ventas');
  assert.deepEqual(sales()?.columns.map(column => column.name), ['T1', 'T2', 'T3', 'T4']);
  assert.deepEqual(sales()?.preview?.rows[1], [150, 200, 250, 350]);
  assert.deepEqual(value.inspect().entities.find(entity => entity.name === 'fechas')?.preview?.rows[0], ['2026-01-05']);
  await run(value, 'ventas[0, 0] = 800');
  assert.equal(sales()?.preview?.rows[0][0], 800);
  await value.reset();
  assert.equal(sales()?.preview?.rows[0][0], 100);
  assert.ok(complete(value, 'import numpy as np\nnp.ar').items.some(item => item.label === 'array'));

  const differences: {id: string; expected: string; actual: string}[] = [];
  const local: string[] = [];
  let executed = 0;
  for (const {key} of numpyCurriculum) {
    const {notes} = await import(`../src/content/notes/numpy/${key}.ts`) as {notes: {examples: {
      id: string; code: string; textOutput: string; external?: boolean;
    }[]}[]};
    for (const example of notes.flatMap(note => note.examples)) {
      if (example.external) {local.push(example.id); continue;}
      await value.reset();
      const events = await run(value, example.code);
      const failed = events.find(event => event.type === 'error');
      const actual = failed ? failed.message : events.flatMap(event =>
        event.type === 'stream' && event.channel === 'stdout' ? [event.text] : []).join('').trim();
      if (failed || actual !== example.textOutput) differences.push({id: example.id, expected: example.textOutput, actual});
      executed++;
    }
  }
  assert.equal(executed, 196);
  assert.deepEqual(local, ['numpy/precision-y-errores-numericos/errstate-y-seterr/1',
    'numpy/archivos-e-intercambio-de-datos/memmap/1']);
  assert.deepEqual(differences, []);
});

test('Pyodide real: sqlite3 inspecciona una copia de la base, conserva cambios y vuelve a sembrar al reiniciar', async () => {
  const dataset = await createDatasetAdapter().materialize({id: 'sqlite3-tienda', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide);
  engines.push(value);
  await value.init(dataset);
  const customers = () => value.inspect().entities.find(entity => entity.name === 'clientes');
  assert.equal(customers()?.kind, 'table');
  assert.equal(customers()?.rowCount, 4);
  assert.deepEqual(customers()?.preview?.rows[0], [1, 'Ana', 'Mexico']);
  assert.deepEqual(customers()?.preview?.rows[3], [4, 'Diego', null]);

  await run(value, 'con.execute("UPDATE clientes SET nombre = \'Elena\' WHERE id = 1")\n' +
    'con.execute(\'CREATE TABLE "prueba""nombre"(a INTEGER)\')\n' +
    'con.execute(\'INSERT INTO "prueba""nombre" VALUES (42)\')\n' +
    'traza = []\ncon.set_trace_callback(traza.append)\ncon.row_factory = sqlite3.Row');
  assert.deepEqual(customers()?.preview?.rows[0], [1, 'Elena', 'Mexico']);
  assert.deepEqual(value.inspect().entities.find(entity => entity.name === 'prueba"nombre')?.preview?.rows, [[42]]);
  const traced = await run(value, 'print(traza)');
  assert.ok(traced.some(event => event.type === 'stream' && event.channel === 'stdout' && event.text.trim() === '[]'));
  await run(value, 'con.execute("BEGIN")\ncon.execute("UPDATE clientes SET nombre = \'Luz\' WHERE id = 1")');
  assert.deepEqual(customers()?.preview?.rows[0], [1, 'Elena', 'Mexico']);
  await run(value, 'con.execute("COMMIT")');
  assert.deepEqual(customers()?.preview?.rows[0], [1, 'Luz', 'Mexico']);
  assert.ok(complete(value, 'con.exe').items.some(item => item.label === 'execute'));
  await run(value, 'con.close()');
  assert.deepEqual(value.inspect().entities, []);
  await value.reset();
  assert.deepEqual(customers()?.preview?.rows[0], [1, 'Ana', 'Mexico']);
});

test('Pyodide real: las 131 fichas compatibles de sqlite3 se ejecutan con los datos compartidos', async () => {
  const {sqlite3Curriculum} = await import('../src/content/sqlite3-curriculum.ts');
  const dataset = await createDatasetAdapter().materialize({id: 'sqlite3-tienda', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide);
  engines.push(value);
  await value.init(dataset);
  const local: string[] = [];
  let executed = 0;
  for (const {key} of sqlite3Curriculum) {
    const {notes} = await import(`../src/content/notes/sqlite3/${key}.ts`) as {notes: {examples: {
      id: string; code: string; textOutput: string; language: string; external?: boolean;
    }[]}[]};
    for (const example of notes.flatMap(note => note.examples)) {
      if (example.external) {local.push(example.id); continue;}
      assert.equal(example.language, 'python');
      await value.reset();
      const events = await run(value, example.code);
      const failed = events.find(event => event.type === 'error');
      assert.equal(failed, undefined, example.id + ': ' + failed?.message);
      const output = events.flatMap(event => event.type === 'stream' && event.channel === 'stdout' ? [event.text] : []).join('').trim();
      const expected = [...example.textOutput.matchAll(/\x60([^\x60]+)\x60/g)].map(match => match[1]);
      assert.ok(output, example.id + ': salida vacía');
      const matches = expected.map(text => output.includes(text));
      assert.ok(example.id.endsWith('/extensiones-cargables/1') ? matches.some(Boolean) : matches.every(Boolean),
        example.id + ': ' + output + ' / ' + example.textOutput);
      executed++;
    }
  }
  assert.equal(executed, 131);
  assert.deepEqual(local, ['sqlite3/callbacks-y-control-de-ejecucion/interrupt/1',
    'sqlite3/pruebas-y-flujos-reproducibles/cli-de-sqlite3/1']);
});

test('Pyodide real: openpyxl carga los datos, modifica archivos XLSX y permite reabrir la descarga', async () => {
  await pyodide.loadPackage('openpyxl');
  assert.equal(pyodide.runPython('import openpyxl; openpyxl.__version__'), pythonPackages.lock.packages.openpyxl.version);
  const dataset = await createDatasetAdapter().materialize({id: 'openpyxl-ventas', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide);
  engines.push(value);
  await value.init(dataset);
  const sheets = value.inspect().entities;
  assert.deepEqual(sheets.map(entity => [entity.name, entity.rowCount]), [['Ventas', 6], ['Resumen', 2]]);
  assert.equal(sheets[0].preview?.rows[1][1], 'Laptop');

  const edited = await run(value, 'ws["B2"] = "Monitor"\nPath("salida").mkdir()\nwb.save("salida/ventas_editadas.xlsx")\nPath("danado.xlsx").write_text("texto")');
  const files = edited.filter(event => event.type === 'file');
  assert.deepEqual(files.map(event => event.path).sort(), ['salida/ventas_editadas.xlsx', 'ventas_base.xlsx']);
  const saved = files.find(event => event.path === 'salida/ventas_editadas.xlsx')!;
  const file = '/tmp/openpyxl-download-test.xlsx';
  pyodide.FS.writeFile(file, saved.bytes);
  try {
    assert.equal(pyodide.runPython('openpyxl.load_workbook("/tmp/openpyxl-download-test.xlsx")["Ventas"]["B2"].value'), 'Monitor');
  } finally {pyodide.FS.unlink(file);}
  assert.equal(value.inspect().entities[0].preview?.rows[1][1], 'Monitor');
  assert.ok(complete(value, 'from openpyxl import Work').items.some(item => item.label === 'Workbook'));
  await value.reset();
  assert.equal(value.inspect().entities[0].preview?.rows[1][1], 'Laptop');
});

test('Pyodide real: ejecuta las 168 fichas compatibles de openpyxl', async () => {
  const {openpyxlCurriculum} = await import('../src/content/openpyxl-curriculum.ts');
  await pyodide.loadPackage('openpyxl');
  const dataset = await createDatasetAdapter().materialize({id: 'openpyxl-ventas', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide);
  engines.push(value);
  await value.init(dataset);
  let count = 0;
  const external: string[] = [];
  for (const {key} of openpyxlCurriculum) {
    const {notes} = await import(`../src/content/notes/openpyxl/${key}.ts`) as {notes: {examples: {
      id: string; code: string; external?: boolean;
    }[]}[]};
    for (const example of notes.flatMap(note => note.examples)) {
      if (example.external) {external.push(example.id); continue;}
      await value.reset();
      const events = await run(value, example.code);
      const end = events.at(-1);
      assert.ok(end?.type === 'end' && end.status === 'success',
        example.id + ': ' + events.find(event => event.type === 'error')?.message);
      count++;
    }
  }
  assert.equal(count, 168);
  assert.deepEqual(external, ['openpyxl/objetos-adicionales/insertar-imagen/1', 'openpyxl/formatos-avanzados/macros/1',
    'openpyxl/formatos-avanzados/tablas-dinamicas/1', 'openpyxl/integraciones/matplotlib/1']);
});

test('Pyodide real: SciPy carga sus datos, completa stats y verifica 177 ejemplos', async () => {
  const {scipyCurriculum} = await import('../src/content/scipy-curriculum.ts');
  await pyodide.loadPackage('scipy');
  assert.equal(pyodide.runPython('import scipy; scipy.__version__'), pythonPackages.lock.packages.scipy.version);
  const dataset = await createDatasetAdapter().materialize({id: 'scipy-negocio', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide);
  engines.push(value);
  await value.init(dataset);
  const entity = (name: string) => value.inspect().entities.find(item => item.name === name);
  assert.deepEqual(entity('ventas')?.preview?.rows, [[100], [120], [120], [140], [220]]);
  assert.deepEqual(entity('ventas_nan')?.preview?.rows[2], [null]);
  assert.deepEqual(entity('conversiones')?.preview?.rows, [[40, 160], [60, 140]]);
  assert.ok(complete(value, 'stats.ttest_').items.some(item => item.label === 'ttest_ind'));
  await run(value, 'ventas[0] = 400');
  assert.deepEqual(entity('ventas')?.preview?.rows[0], [400]);

  const differences: {id: string; expected: string; actual: string}[] = [];
  const local: string[] = [];
  let executed = 0;
  for (const {key} of scipyCurriculum) {
    const {notes} = await import(`../src/content/notes/scipy/${key}.ts`) as {notes: {examples: {
      id: string; code: string; textOutput: string; external?: boolean;
    }[]}[]};
    for (const example of notes.flatMap(note => note.examples)) {
      if (example.external) {
        local.push(example.id);
        continue;
      }
      await value.reset();
      const events = await run(value, example.code);
      const failed = events.find(event => event.type === 'error');
      const actual = failed ? failed.message : events.flatMap(event =>
        event.type === 'stream' && event.channel === 'stdout' ? [event.text] : []).join('').trim();
      if (failed || actual !== example.textOutput) differences.push({id: example.id, expected: example.textOutput, actual});
      executed++;
    }
  }
  assert.equal(executed, 177);
  assert.deepEqual(local, ['scipy/io/matrix-market/1']);
  assert.deepEqual(differences, []);
});

test('Pyodide real: SQLAlchemy comparte datos entre Core, ORM e inspector y restaura al reiniciar', async () => {
  await pyodide.loadPackage('sqlalchemy');
  assert.equal(pyodide.runPython('import sqlalchemy; sqlalchemy.__version__'), pythonPackages.lock.packages.sqlalchemy.version);
  const seed = await createDatasetAdapter().materialize({id: 'sqlalchemy-ventas', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide);
  engines.push(value);
  await value.init(seed);
  const pedidos = () => value.inspect().entities.find(entity => entity.name === 'pedidos');
  assert.deepEqual(pedidos()?.preview?.rows[0], [101, 1, 100, '2026-02-01', 'completed', null]);
  assert.ok(complete(value, 'engine.con').items.some(item => item.label === 'connect'));

  const edited = await run(value, 'with Sesion.begin() as s:\n    pedido = s.get(Pedido, 101)\n    pedido.monto = 777');
  assert.ok(edited.some(event => event.type === 'end' && event.status === 'success'));
  assert.equal(pedidos()?.preview?.rows[0][2], 777);

  const opened = await run(value, 'c = engine.connect()\ntrx = c.begin()\nc.execute(update(pedidos).where(pedidos.c.id == 101).values(monto=999));');
  assert.ok(opened.some(event => event.type === 'end' && event.status === 'success'));
  assert.equal(pedidos()?.preview?.rows[0][2], 777);
  const finished = await run(value, 'trx.commit()\nc.close()');
  assert.ok(finished.some(event => event.type === 'end' && event.status === 'success'));
  assert.equal(pedidos()?.preview?.rows[0][2], 999);

  await value.reset();
  assert.equal(pedidos()?.preview?.rows[0][2], 100);
  const join = await run(value, 'with Sesion() as s:\n    print(s.get(Pedido, 101).cliente.nombre)');
  assert.ok(join.some(event => event.type === 'stream' && event.text.trim() === 'Ana'));
});

test('Pyodide real: SQLAlchemy reproduce las salidas de los 228 ejemplos web', async () => {
  const {sqlalchemyCurriculum} = await import('../src/content/sqlalchemy-curriculum.ts');
  await pyodide.loadPackage('sqlalchemy');
  const dataset = await createDatasetAdapter().materialize({id: 'sqlalchemy-ventas', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide);
  engines.push(value);
  await value.init(dataset);

  const differences: {id: string; expected: string; actual: string}[] = [];
  const external: string[] = [];
  let executed = 0;
  for (const {key} of sqlalchemyCurriculum) {
    const {notes} = await import(`../src/content/notes/sqlalchemy/${key}.ts`) as {notes: {examples: {
      id: string; code: string; textOutput: string; external?: boolean;
    }[]}[]};
    for (const example of notes.flatMap(note => note.examples)) {
      if (example.external) {
        external.push(example.id);
        continue;
      }
      await value.reset();
      const events = await run(value, example.code);
      const failed = events.find(event => event.type === 'error');
      const actual = failed ? failed.message : events.flatMap(event =>
        event.type === 'stream' && event.channel === 'stdout' ? [event.text] : []).join('').trim();
      if (failed || actual !== example.textOutput) differences.push({id: example.id, expected: example.textOutput, actual});
      executed++;
    }
  }
  assert.equal(executed, 228);
  assert.deepEqual(external, [
    'sqlalchemy/sqlalchemy-arquitectura/instalacion/1',
    'sqlalchemy/asyncio/definicion/1',
    'sqlalchemy/asyncio/asyncsession-y-async-sessionmaker/1',
    'sqlalchemy/asyncio/run-sync-y-asyncresult/1',
    'sqlalchemy/alembic/definicion/1',
    'sqlalchemy/alembic/revision-y-autogenerate/1',
    'sqlalchemy/alembic/upgrade-downgrade-y-revision-history/1',
  ]);
  assert.deepEqual(differences, []);
});

test('Pyodide real: Matplotlib captura show antes de close, mantiene figuras y descarga exportaciones nuevas', async () => {
  await pyodide.loadPackage('matplotlib');
  assert.equal(pyodide.runPython('import matplotlib; matplotlib.__version__'), pythonPackages.lock.packages.matplotlib.version);
  const dataset = await createDatasetAdapter().materialize({id: 'matplotlib-ventas', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide, {figures: true});
  engines.push(value);
  await value.init(dataset);
  assert.equal(value.inspect().entities.find(item => item.name === 'df')?.rowCount, 6);
  assert.ok(complete(value, 'plt.subpl').items.some(item => item.label === 'subplots'));

  const shown = await run(value, 'fig, ax = plt.subplots()\nax.plot(meses, ventas)\nax.set_title("Ventas")\nplt.show()\nplt.close(fig)');
  const plot = shown.find(event => event.type === 'figure');
  assert.equal(plot?.title, 'Ventas');
  assert.ok(plot.bytes.byteLength > 1000);
  assert.ok(shown.some(event => event.type === 'end' && event.status === 'success'));

  const exports = await run(value, 'fig, ax = plt.subplots()\nax.bar(regiones, ventas_region)\nfor ext in ["png", "jpg", "svg", "pdf"]:\n    fig.savefig(salida / f"ventas.{ext}")');
  assert.deepEqual(exports.filter(event => event.type === 'file').map(event => event.path), [
    'salidas_matplotlib/ventas.jpg', 'salidas_matplotlib/ventas.pdf',
    'salidas_matplotlib/ventas.png', 'salidas_matplotlib/ventas.svg',
  ]);
  assert.equal(exports.filter(event => event.type === 'figure').length, 1);
  assert.ok(exports.some(event => event.type === 'end' && event.status === 'success'));
  const idle = await run(value, 'print(len(plt.get_fignums()))');
  assert.equal(idle.filter(event => event.type === 'figure' || event.type === 'file').length, 0);
  assert.ok(idle.some(event => event.type === 'stream' && event.text.trim() === '1'));

  const mutation = await run(value, 'ax.set_title("Ventas por región")');
  assert.ok(mutation.some(event => event.type === 'figure' && event.title === 'Ventas por región'));
  await value.reset();
  const restored = await run(value, 'print(len(plt.get_fignums()))');
  assert.ok(restored.some(event => event.type === 'stream' && event.text.trim() === '0'));
  assert.equal(restored.filter(event => event.type === 'figure' || event.type === 'file').length, 0);
  value.dispose();
});

test('Pyodide real: ejecuta y renderiza los 148 ejemplos web de Matplotlib', async () => {
  const {matplotlibCurriculum} = await import('../src/content/matplotlib-curriculum.ts');
  await pyodide.loadPackage('matplotlib');
  const dataset = await createDatasetAdapter().materialize({id: 'matplotlib-ventas', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide, {figures: true});
  engines.push(value);
  await value.init(dataset);
  const textOnly = new Set(['matplotlib/gestion-figuras/limpiar-cerrar/1', 'matplotlib/interactividad/definicion/1']);
  const external: string[] = [], failures: string[] = [];
  let executed = 0;
  for (const {key} of matplotlibCurriculum) {
    const {notes} = await import(`../src/content/notes/matplotlib/${key}.ts`) as {notes: {examples: {
      id: string; code: string; external?: boolean;
    }[]}[]};
    for (const example of notes.flatMap(note => note.examples)) {
      if (example.external) {
        external.push(example.id);
        continue;
      }
      await value.reset();
      const events = await run(value, example.code);
      const error = events.find(event => event.type === 'error');
      if (error) failures.push(example.id + ' ' + error.message);
      else if (!textOnly.has(example.id) && !events.some(event => event.type === 'figure')) failures.push(example.id + ' sin gráfica');
      if (example.id === 'matplotlib/interactividad/func-animation/1') {
        assert.ok(events.some(event => event.type === 'file' && event.path === 'salidas_matplotlib/ventas.gif'));
      }
      executed++;
    }
  }
  assert.equal(executed, 148);
  assert.deepEqual(external, [
    'matplotlib/interactividad/eventos-callbacks/1',
    'matplotlib/interactividad/widgets/1',
    'matplotlib/interactividad/widgets/2',
  ]);
  assert.deepEqual(failures, []);
  value.dispose();
});

test('Pyodide real: Seaborn prepara las ventas, completa sns y Objects y conserva datos válidos', async () => {
  await pyodide.loadPackage('seaborn');
  assert.equal(pyodide.runPython('import seaborn; seaborn.__version__'), pythonPackages.lock.packages.seaborn.version);
  const dataset = await createDatasetAdapter().materialize({id: 'seaborn-sucursales', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide, {figures: true});
  engines.push(value);
  await value.init(dataset);
  const sales = () => value.inspect().entities.find(item => item.name === 'ventas');
  assert.equal(sales()?.rowCount, 16);
  assert.deepEqual(sales()?.preview?.rows[0], ['2026-09-01T00:00:00', 'N1', 'Norte', 'Online', 100, 24, 11, 4, 0]);
  assert.ok(complete(value, 'sns.scat').items.some(item => item.label === 'scatterplot'));
  assert.ok(complete(value, 'so.Plo').items.some(item => item.label === 'Plot'));
  const total = await run(value, 'print(ventas["ingresos"].sum())');
  assert.ok(total.some(event => event.type === 'stream' && event.text.trim() === '2080'));
  await run(value, 'ventas.loc[0, "ingresos"] = 200');
  assert.equal(sales()?.preview?.rows[0][4], 200);
  await value.reset();
  assert.equal(sales()?.preview?.rows[0][4], 100);
  value.dispose();
});

test('Pyodide real: Seaborn ejecuta los 162 ejemplos web y exporta las figuras de Objects', async () => {
  const {seabornCurriculum} = await import('../src/content/seaborn-curriculum.ts');
  await pyodide.loadPackage('seaborn');
  const dataset = await createDatasetAdapter().materialize({id: 'seaborn-sucursales', version: 1}, 'pyodide', new AbortController().signal);
  const value = createPythonEngine(pyodide, {figures: true});
  engines.push(value);
  await value.init(dataset);

  const textOnly = new Map([
    ['seaborn/introduccion/importacion-y-version/1', pythonPackages.lock.packages.seaborn.version],
    ['seaborn/estructura-de-datos/pivot-y-pivot-table/1', 'Norte      520     440'],
    ['seaborn/estructura-de-datos/datos-faltantes-y-categorias/1', '15'],
    ['seaborn/estadistica-descriptiva/definicion/1', '130.000000'],
    ['seaborn/estadistica-descriptiva/media-mediana-y-moda/1', '130.0 130.0 [120, 140]'],
    ['seaborn/estadistica-descriptiva/varianza-y-desviacion-estandar/1', '746.67 27.33'],
    ['seaborn/estadistica-descriptiva/cuartiles-percentiles-e-iqr/1', '[115.0, 130.0, 145.0] 30.0'],
    ['seaborn/estadistica-descriptiva/outliers/1', '[500]'],
    ['seaborn/analisis-exploratorio/comunicar-conclusiones/1', 'Online 1120'],
    ['seaborn/compatibilidad/definicion/1', pythonPackages.lock.packages.seaborn.version],
  ]);
  const downloads = new Map([
    ['seaborn/personalizacion/mostrar-y-exportar/1', ['ventas.png', 'ventas.svg']],
    ['seaborn/objects-composicion/show-save-y-on/1', ['totales-objects.png']],
  ]);
  const external: string[] = [], failures: string[] = [];
  let executed = 0;
  for (const {key} of seabornCurriculum) {
    const {notes} = await import(`../src/content/notes/seaborn/${key}.ts`) as {notes: {examples: {
      id: string; code: string; external?: boolean;
    }[]}[]};
    for (const {id, code, external: local} of notes.flatMap(note => note.examples)) {
      if (local) {
        external.push(id);
        continue;
      }
      await value.reset();
      const events = await run(value, code);
      const error = events.find(event => event.type === 'error');
      const stdout = events.flatMap(event => event.type === 'stream' && event.channel === 'stdout' ? [event.text] : []).join('').trim();
      const count = events.filter(event => event.type === 'figure').length;
      const expectedText = textOnly.get(id);
      if (error) failures.push(id + ' ' + error.message);
      else if (expectedText ? count !== 0 || !stdout.includes(expectedText) : count === 0) failures.push(id + ' salida incorrecta');
      if (/<seaborn\.(?:axisgrid|matrix)\..* at 0x/i.test(stdout)) failures.push(id + ' objeto de cuadrícula en bruto');
      if (downloads.has(id)) assert.deepEqual(events.filter(event => event.type === 'file').map(event => event.path), downloads.get(id));
      executed++;
    }
  }
  assert.equal(executed, 162);
  assert.deepEqual(external, ['seaborn/introduccion/datasets-de-ejemplo/1']);
  assert.deepEqual(failures, []);
  value.dispose();
});
