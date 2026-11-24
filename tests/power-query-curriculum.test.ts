import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import JSZip from 'jszip';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';
import {powerQueryCurriculum} from '../src/content/power-query-curriculum.ts';

test('Power Query publica 179 fichas en 39 grupos contraídos y deja la ejecución en el entorno del usuario', () => {
  const topic = getTopics('analisis-de-datos').find(item => item.id === 'power-query');
  assert.equal(topic?.sections?.length, 39);
  assert.equal(topic.concepts.length, 179);
  const indexed = new Map(entries.map(entry => [entry.id, entry.href]));
  for (const group of topic.sections) {
    assert.equal(group.collapsed, true);
    assert.equal(group.concepts[0].label, 'Definición');
    for (const note of group.concepts) {
      assert.equal(indexed.get(note.id), note.slug);
      assert.equal(resolvePracticeContext(note.slug), null);
    }
  }
});

test('los ejemplos de Power Query distinguen los pasos del editor de las expresiones M', async () => {
  const examples = [];
  for (const {key} of powerQueryCurriculum) {
    const {notes} = await import(`../src/content/notes/power-query/${key}.ts`) as {notes: {examples: {
      id: string; code: string; steps?: string[]; language?: string; external: boolean;
    }[]}[]};
    examples.push(...notes.flatMap(note => note.examples));
  }
  assert.equal(examples.filter(example => example.language === 'powerquery' && example.code).length, 142);
  assert.equal(examples.filter(example => !example.code && example.steps?.length).length, 37);
  assert.ok(examples.every(example => example.external));
});

test('Power Query conserva las cinco consultas M del temario en el archivo descargable', async () => {
  const zip = await JSZip.loadAsync(await readFile('static/practice/power-query/power-query-datos.zip'), {checkCRC32: true});
  const spec = await readFile('specs/power-query.md', 'utf8');
  const data = spec.split('## Datos compartidos\n')[1].split(/\n## /)[0];
  const sources = [...data.matchAll(/^\*\*(\w+)\*\*\n\n```powerquery\n([\s\S]+?)\n```$/gm)];
  assert.deepEqual(sources.map(match => match[1]), ['Pedidos', 'Clientes', 'Leads', 'Presupuesto', 'Importacion']);
  assert.equal(Object.values(zip.files).filter(file => !file.dir).length, sources.length);
  for (const [, name, body] of sources) {
    const file = zip.file(`power-query-datos/${name}.pq`);
    assert.ok(file, name);
    assert.equal(await file.async('string'), body + '\n');
  }
  assert.match(execFileSync(process.execPath, ['scripts/prepare-power-query-notes.mjs', '--check'], {encoding: 'utf8'}), /179 fichas/);
});
