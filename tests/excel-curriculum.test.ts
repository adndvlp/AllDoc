import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {getTopics, catalog} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {searchEntries} from '../src/lib/search.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';
import {editorBootstrap} from '../src/practice/editor-bootstrap.ts';

const prefix = '/apuntes/analisis-de-datos/excel/';

test('Excel publica las 259 fichas en 37 grupos y conserva su lugar en el catálogo', () => {
  const excel = getTopics('analisis-de-datos').find(item => item.id === 'excel');
  assert.equal(excel?.sections?.length, 37);
  assert.equal(excel.concepts.length, 259);
  assert.ok(excel.sections.every(group => group.collapsed && group.concepts[0].label === 'Definición'));
  const group = catalog[0].items.find(item => item.id === 'hojas-de-calculo');
  assert.equal(group?.kind, 'group');
  assert.equal(group.items[0].id, 'excel');
  assert.ok(searchEntries(entries, 'xlookup').some(entry => entry.context.endsWith('/ Excel')));
  assert.match(execFileSync(process.execPath, ['scripts/prepare-excel-notes.mjs', '--check'], {encoding: 'utf8'}), /259 fichas/);
});

test('Excel comparte un libro independiente entre fichas y prepara sus seis hojas', async () => {
  const first = resolvePracticeContext(prefix + 'libro-hojas-y-celdas/definicion');
  const later = resolvePracticeContext(prefix + 'agregaciones/sum');
  assert.ok(first && later);
  assert.equal(first.profile.runtimeId, 'ironcalc');
  assert.equal(first.workspaceKey, later.workspaceKey);
  const seed = await editorBootstrap(first);
  assert.equal(seed.workspace.activeFile, 'libro.json');
  assert.deepEqual(seed.schema.entities.map(entity => entity.name), ['Sales', 'Customers', 'Products', 'Targets', 'Leads', 'Scratch']);
});
