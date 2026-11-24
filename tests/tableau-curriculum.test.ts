import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import JSZip from 'jszip';
import {catalog} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {searchEntries} from '../src/lib/search.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';

test('Tableau publica 189 fichas en 32 grupos con instrucciones, pasos y fórmulas', async () => {
  const topic = catalog[0].items.find(item => item.kind === 'topic' && item.id === 'tableau');
  assert.ok(topic?.kind === 'topic');
  assert.equal(topic.sections?.length, 32);
  assert.equal(topic.concepts.length, 189);
  const indexed = new Map(entries.map(entry => [entry.id, entry.href]));
  const formats = {formulas: 0, steps: 0, prose: 0};
  for (const group of topic.sections) {
    assert.equal(group.collapsed, true);
    assert.equal(group.concepts[0].label, 'Definición');
    for (const note of group.concepts) {
      assert.equal(indexed.get(note.id), note.slug);
      assert.equal(resolvePracticeContext(note.slug), null);
    }
    const {notes} = await import(`../src/content/notes/tableau/${group.id}.ts`) as {notes: {examples: {
      code: string; steps?: string[]; language?: string; instructions?: string; hint: string; external: boolean;
    }[]}[]};
    for (const {examples} of notes) {
      for (const example of examples) {
        assert.equal(example.external, true);
        if (example.code) {
          assert.equal(example.language, 'text');
          assert.ok(example.instructions);
          formats.formulas++;
        } else if (example.steps?.length) {
          formats.steps++;
        } else {
          assert.ok(example.hint);
          formats.prose++;
        }
      }
    }
  }
  assert.deepEqual(formats, {formulas: 25, steps: 108, prose: 56});
  assert.equal(searchEntries(entries, 'Campos calculados Tableau')[0]?.id, 'analisis-de-datos/tableau/campos-calculados/definicion');
});

test('el laboratorio conserva los cuatro CSV y las convenciones originales de Tableau', async () => {
  const spec = await readFile('specs/tableau.md', 'utf8');
  const data = spec.split('## Datos compartidos\n')[1].split(/\n## /)[0];
  const tables = [...data.matchAll(/^\*\*(\w+\.csv)\*\*[^\n]*\n\n\x60{3}csv\n([\s\S]+?)\n\x60{3}$/gm)];
  assert.deepEqual(tables.map(([, name]) => name), ['ventas.csv', 'clientes.csv', 'metas.csv', 'leads.csv']);
  const zip = await JSZip.loadAsync(await readFile('static/practice/tableau/tableau-laboratorio.zip'), {checkCRC32: true});
  const prefix = 'tableau-laboratorio/';
  assert.deepEqual(Object.keys(zip.files).sort(), [...tables.map(([, name]) => prefix + name), prefix + 'preparar-datos.md'].sort());
  for (const [, name, csv] of tables) {
    assert.equal(await zip.file(prefix + name)!.async('string'), csv + '\n');
  }
  const guide = await zip.file(prefix + 'preparar-datos.md')!.async('string');
  const conventions = data.slice(data.indexOf('**Preparación y convenciones de práctica**')).trimEnd();
  assert.ok(guide.includes(conventions));
  assert.match(guide, /\`Linea\` como identificador/);
  assert.match(execFileSync(process.execPath, ['scripts/prepare-tableau-notes.mjs', '--check'], {encoding: 'utf8'}), /189 fichas/);
});
