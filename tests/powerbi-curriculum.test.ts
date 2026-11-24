import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import JSZip from 'jszip';
import {catalog} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {searchEntries} from '../src/lib/search.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';

test('Power BI publica 229 fichas en 40 grupos con procedimientos, fórmulas DAX y consultas M', async () => {
  const topic = catalog[0].items.find(item => item.kind === 'topic' && item.label === 'Power BI');
  assert.ok(topic?.kind === 'topic');
  assert.equal(topic.sections?.length, 40);
  assert.equal(topic.concepts.length, 229);
  const indexed = new Map(entries.map(entry => [entry.id, entry.href]));
  const formats = {dax: 0, powerquery: 0, steps: 0};
  for (const group of topic.sections) {
    assert.equal(group.collapsed, true);
    assert.equal(group.concepts[0].label, 'Definición');
    for (const note of group.concepts) {
      assert.equal(indexed.get(note.id), note.slug);
      assert.equal(resolvePracticeContext(note.slug), null);
    }
    const {notes} = await import(`../src/content/notes/powerbi/${group.id}.ts`) as {notes: {examples: {
      code: string; steps?: string[]; language?: 'dax' | 'powerquery'; external: boolean;
    }[]}[]};
    for (const {examples} of notes) {
      for (const example of examples) {
        assert.equal(example.external, true);
        if (example.language) {
          assert.ok(example.code);
          formats[example.language]++;
        } else {
          assert.equal(example.code, '');
          assert.ok(example.steps?.length);
          formats.steps++;
        }
      }
    }
  }
  assert.deepEqual(formats, {dax: 65, powerquery: 6, steps: 158});
  assert.equal(searchEntries(entries, 'Agregaciones DAX Power BI')[0]?.id, 'analisis-de-datos/powerbi/agregaciones-dax/definicion');
});

test('el laboratorio conserva los siete CSV y las fórmulas del modelo de Power BI', async () => {
  const spec = await readFile('specs/powerbi.md', 'utf8');
  const data = spec.split('## Datos compartidos\n')[1].split(/\n## /)[0];
  const csvs = [...data.matchAll(/^\*\*(\w+)\*\*[^\n]*\n\n\x60{3}csv\n([\s\S]+?)\n\x60{3}$/gm)];
  assert.deepEqual(csvs.map(([, name]) => name),
    ['Clientes', 'Productos', 'Pedidos', 'Metas', 'Sucios', 'PresupuestoAncho', 'Accesos']);
  const zip = await JSZip.loadAsync(await readFile('static/practice/powerbi/powerbi-laboratorio.zip'), {checkCRC32: true});
  const prefix = 'powerbi-laboratorio/';
  assert.deepEqual(Object.keys(zip.files).sort(), [...csvs.map(([, name]) => prefix + name + '.csv'), prefix + 'preparar-modelo.md'].sort());
  for (const [, name, csv] of csvs) {
    assert.equal(await zip.file(prefix + name + '.csv')!.async('string'), csv + '\n');
  }
  const guide = await zip.file(prefix + 'preparar-modelo.md')!.async('string');
  const daxBlocks = [...data.matchAll(/^\x60{3}dax\n([\s\S]+?)\n\x60{3}$/gm)];
  assert.equal(daxBlocks.length, 2);
  for (const [block] of daxBlocks) assert.ok(guide.includes(block));
  assert.match(guide, /relación \*\*inactiva\*\* con `Pedidos\[Envio\]`/);
  assert.match(execFileSync(process.execPath, ['scripts/prepare-powerbi-notes.mjs', '--check'], {encoding: 'utf8'}), /229 fichas/);
});
