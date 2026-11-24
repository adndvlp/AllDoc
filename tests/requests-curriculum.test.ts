import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
import {loadPyodide} from 'pyodide';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {requestsCurriculum} from '../src/content/requests-curriculum.ts';
import {getPythonAdditionalPackages} from '../src/practice/adapters/python/environment.ts';
import {initializePythonVM} from '../src/practice/adapters/python/initialize.ts';
import {createPythonEngine} from '../src/practice/adapters/python/core.ts';
import {pythonPackages} from '../src/practice/adapters/python/packages.ts';
import type {RuntimeEvent} from '../src/practice/contracts.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';
import {editorBootstrap} from '../src/practice/editor-bootstrap.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';

const start = '/apuntes/analisis-de-datos/requests/http-y-apis/definicion';

test('requests publica el temario completo y sus fichas aparecen en el buscador', () => {
  const topic = getTopics('analisis-de-datos').find(item => item.id === 'requests');
  assert.equal(topic?.sections?.length, 19);
  assert.equal(topic.concepts.length, 127);
  const indexed = new Map(entries.map(entry => [entry.id, entry.href]));
  for (const group of topic.sections) {
    assert.equal(group.collapsed, true);
    assert.equal(group.concepts[0].label, 'Definición');
    for (const note of group.concepts) assert.equal(indexed.get(note.id), note.slug);
  }
  assert.match(execFileSync(process.execPath, ['scripts/prepare-requests-notes.mjs', '--check'], {encoding: 'utf8'}), /fichas cotejadas/);
});

test('Pyodide ejecuta los 125 ejemplos de requests de forma aislada sobre la API simulada', async () => {
  const pyodide = await initializePythonVM(loadPyodide, {
    lockFileContents: JSON.stringify(pythonPackages.lock), packageCacheDir: resolve('.python-packages', pythonPackages.runtimeVersion),
    jsglobals: Object.freeze({}), stdout() {}, stderr() {},
  }, getPythonAdditionalPackages('python-requests'));
  assert.equal(pyodide.runPython('import requests; requests.__version__'), pythonPackages.lock.packages.requests.version);
  const engine = createPythonEngine(pyodide);
  const data = await createDatasetAdapter().materialize({id: 'requests-pedidos', version: 1}, 'pyodide', new AbortController().signal);
  await engine.init(data);
  try {
    assert.deepEqual(engine.inspect().entities.find(entity => entity.name === 'pedidos')?.preview?.rows[0],
      [101, 800, 'completed', '2026-08-01', 1, 'MX']);
    const document = 'import requests\nrequests.ge';
    const suggestions = engine.complete({requestId: 'requests-jedi', generation: 1, revision: 0, workspaceId: 'requests',
      file: 'main.py', document, position: document.length, schema: engine.inspect()});
    assert.ok(suggestions.items.some(item => item.label === 'get'));
    const external: string[] = [];
    const failures: string[] = [];
    const expectedText = new Map([
      ['requests/http-y-apis/definicion/1', /200 800/],
      ['requests/errores-y-timeout/timeout/1', /^Tiempo agotado$/],
      ['requests/reintentos/http-adapter/1', /^200$/],
    ]);
    let revision = 0;
    for (const {key} of requestsCurriculum) {
      const {notes} = await import(`../src/content/notes/requests/${key}.ts`) as {notes: {examples: {
        id: string; code: string; external?: boolean;
      }[]}[]};
      for (const {id, code, external: local} of notes.flatMap(note => note.examples)) {
        if (local) {external.push(id); continue;}
        await engine.reset();
        const events: RuntimeEvent[] = [];
        await engine.run({runId: id, generation: 1, revision: ++revision, workspaceId: 'requests',
          files: [{path: 'main.py', languageId: 'python', content: code}], entryFile: 'main.py'}, event => events.push(event));
        const error = events.find(event => event.type === 'error');
        const text = events.flatMap(event => event.type === 'stream' && event.channel === 'stdout' ? [event.text] : []).join('').trim();
        if (error) failures.push(id + ' ' + error.message);
        const expected = expectedText.get(id);
        if (expected && !expected.test(text)) failures.push(id + ' salida incorrecta: ' + text);
        expectedText.delete(id);
      }
    }
    assert.deepEqual(failures, []);
    assert.equal(revision, 125);
    assert.deepEqual(external, ['requests/pruebas/librerias-mock/1', 'requests/concurrencia/thread-pool/1']);
    assert.deepEqual([...expectedText.keys()], []);
  } finally {engine.dispose();}
});

test('requests abre su propio entorno aislado con cuatro pedidos y una consulta inicial', async () => {
  const context = resolvePracticeContext(start);
  assert.ok(context);
  assert.equal(context.profile.id, 'python-requests');
  assert.equal(context.profile.capabilities.network, 'none');
  const {workspace, schema, environment} = await editorBootstrap(context);
  assert.match(workspace.files[0].content, /requests\.get\(BASE \+ "\/orders\/101"/);
  assert.ok(environment.packages.some(pkg => pkg.name.toLowerCase() === 'requests'));
  const data = await createDatasetAdapter().materialize(workspace.dataset, 'pyodide', new AbortController().signal);
  assert.deepEqual(data.schema, schema);
  assert.equal(schema.entities.find(table => table.name === 'pedidos')?.rowCount, 4);
  assert.doesNotMatch(data.bootstrap ?? '', /\.serve_forever\(/);
});
