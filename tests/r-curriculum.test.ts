import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {searchEntries} from '../src/lib/search.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';
import {editorBootstrap} from '../src/practice/editor-bootstrap.ts';
import {notes as sqliteNotes} from '../src/content/notes/r/bases-de-datos-y-sql.ts';

const prefix = '/apuntes/analisis-de-datos/r/';

test('las cuatro fichas de SQLite en memoria se pueden probar con WebR', () => {
  const examples = sqliteNotes.flatMap(note => note.examples);
  assert.equal(examples.length, 4);
  assert.ok(examples.every(example => !('external' in example) || !example.external));
});

test('R publica 213 fichas en 47 grupos y usa la misma identidad desde ambas áreas', () => {
  const topic = getTopics('analisis-de-datos').find(item => item.id === 'r');
  const shared = getTopics('lenguajes').find(item => item.id === 'r');
  assert.equal(topic?.concepts.length, 213);
  assert.equal(topic.sections?.length, 47);
  assert.ok(topic.sections.every(group => group.collapsed));
  assert.deepEqual(shared?.concepts, topic.concepts);
  assert.ok(searchEntries(entries, 'ggplot2').some(entry => entry.href === prefix + 'visualizacion-con-ggplot2/definicion'));
  assert.match(execFileSync(process.execPath, ['scripts/prepare-r-notes.mjs', '--check'], {encoding: 'utf8'}), /213 fichas/);
});

test('las fichas de R comparten una sesión WebR y el dataset de comercio', async () => {
  const first = resolvePracticeContext(prefix + 'entorno-y-paquetes/definicion');
  const second = resolvePracticeContext(prefix + 'variables-y-operadores/definicion');
  assert.ok(first && second);
  assert.equal(first.workspaceKey, second.workspaceKey);
  assert.equal(first.profile.runtimeId, 'webr');
  const seed = await editorBootstrap(first);
  assert.equal(seed.workspace.activeFile, 'main.R');
  assert.deepEqual(seed.schema.entities.map(entity => entity.name), ['clientes', 'pedidos', 'productos', 'detalle', 'leads']);
});
