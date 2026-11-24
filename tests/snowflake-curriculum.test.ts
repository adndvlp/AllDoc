import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import JSZip from 'jszip';
import {catalog} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {searchEntries} from '../src/lib/search.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';

test('Snowflake publica 231 fichas en 40 grupos dentro de Plataformas de datos', async () => {
  const group = catalog[0].items.find(item => item.kind === 'group' && item.id === 'plataformas-de-datos');
  assert.ok(group?.kind === 'group');
  const topic = group.items.find(item => item.id === 'snowflake');
  assert.equal(topic?.sections?.length, 40);
  assert.equal(topic.concepts.length, 231);
  const indexed = new Map(entries.map(entry => [entry.id, entry.href]));
  const formats = {sql: 0, python: 0, bash: 0, steps: 0};
  for (const section of topic.sections) {
    assert.equal(section.collapsed, true);
    assert.equal(section.concepts[0].label, 'Definición');
    for (const note of section.concepts) {
      assert.equal(indexed.get(note.id), note.slug);
      assert.equal(resolvePracticeContext(note.slug), null);
    }
    const {notes} = await import(`../src/content/notes/snowflake/${section.id}.ts`) as {notes: {examples: {
      code: string; steps?: string[]; language?: 'sql' | 'python' | 'bash'; external: boolean;
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
  assert.deepEqual(formats, {sql: 170, python: 14, bash: 1, steps: 46});
  assert.equal(searchEntries(entries, 'Snowflake importar ventas.csv en una tabla aislada')[0]?.id,
    'analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/definicion');
});

test('el laboratorio conserva el SQL y el CSV y proporciona la plantilla para la conexión alldoc', async () => {
  const zip = await JSZip.loadAsync(await readFile('static/practice/snowflake/snowflake-laboratorio.zip'), {checkCRC32: true});
  assert.deepEqual(Object.keys(zip.files).sort(), ['connections.example.toml', 'preparar.sql', 'ventas.csv']
    .map(name => 'snowflake-laboratorio/' + name));
  const spec = await readFile('specs/snowflake.md', 'utf8');
  const data = spec.split('## Datos compartidos\n')[1].split(/\n## /)[0];
  const sql = await zip.file('snowflake-laboratorio/preparar.sql')!.async('string');
  const csv = await zip.file('snowflake-laboratorio/ventas.csv')!.async('string');
  assert.equal(sql, /^\x60{3}sql\n([\s\S]+?)\n\x60{3}$/m.exec(data)?.[1] + '\n');
  assert.equal(csv, /^\x60{3}csv\n([\s\S]+?)\n\x60{3}$/m.exec(data)?.[1] + '\n');
  const connection = await zip.file('snowflake-laboratorio/connections.example.toml')!.async('string');
  assert.match(connection, /^\[alldoc\]$/m);
  assert.match(connection, /^warehouse = "ALLDOC_WH"\ndatabase = "ALLDOC_LAB"\nschema = "PRACTICE"$/m);
  assert.match(execFileSync(process.execPath, ['scripts/prepare-snowflake-notes.mjs', '--check'], {encoding: 'utf8'}), /231 fichas/);
});
