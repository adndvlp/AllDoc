import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';

const tool = 'mysql-connector-python';

test('Connector/Python publica las 142 fichas en 23 grupos y conserva el acceso desde búsqueda', () => {
  const topic = getTopics('analisis-de-datos').find(item => item.id === tool);
  assert.equal(topic?.sections?.length, 23);
  assert.equal(topic.concepts.length, 142);
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

test('Connector/Python distribuye los datos SQL y la conexión de laboratorio de la especificación', async () => {
  const spec = await readFile(`specs/${tool}.md`, 'utf8');
  const data = spec.split('## Datos compartidos\n')[1].split(/\n## /)[0];
  const sql = data.match(/```sql\n([\s\S]+?)\n```/)?.[1];
  const helper = data.match(/```python\n([\s\S]+?)\n```/)?.[1];
  assert.ok(sql && helper);
  assert.equal(await readFile(`static/practice/${tool}/datos.sql`, 'utf8'), sql + '\n');
  assert.equal(await readFile(`static/practice/${tool}/lab_mysql.py`, 'utf8'), helper + '\n');
  assert.match(execFileSync(process.execPath, [`scripts/prepare-${tool}-notes.mjs`, '--check'], {encoding: 'utf8'}), /142 fichas/);
});
