import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {searchEntries} from '../src/lib/search.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';

test('PySpark publica 222 fichas en los 42 grupos de Apache Spark', async () => {
  const topics = getTopics('analisis-de-datos');
  const topic = topics.find(item => item.label === 'Apache Spark (PySpark)');
  assert.equal(topic?.sections?.length, 42);
  assert.equal(topic.concepts.length, 222);
  assert.equal(topics.filter(item => item.label.startsWith('Apache Spark')).length, 1);
  const indexed = new Map(entries.map(entry => [entry.id, entry.href]));
  const languages = {python: 0, bash: 0, steps: 0};
  for (const group of topic.sections) {
    assert.equal(group.collapsed, true);
    assert.equal(group.concepts[0].label, 'Definición');
    for (const note of group.concepts) {
      assert.equal(indexed.get(note.id), note.slug);
      assert.equal(resolvePracticeContext(note.slug), null);
    }
    const {notes} = await import(`../src/content/notes/pyspark/${group.id}.ts`) as {notes: {note?: string; examples: {
      code: string; steps?: string[]; language?: 'python' | 'bash'; external: boolean;
    }[]}[]};
    for (const {examples} of notes) {
      for (const example of examples) {
        assert.equal(example.external, true);
        if (example.language) {
          assert.ok(example.code);
          languages[example.language]++;
        } else {
          assert.equal(example.code, '');
          assert.ok(example.steps?.length);
          languages.steps++;
        }
      }
    }
  }
  assert.deepEqual(languages, {python: 216, bash: 2, steps: 4});
  assert.equal(searchEntries(entries, 'SparkSession PySpark')[0]?.id, 'analisis-de-datos/pyspark/spark-session/definicion');
});

test('el laboratorio conserva la preparación completa y los archivos se generan desde la especificación', async () => {
  const spec = await readFile('specs/pyspark.md', 'utf8');
  const data = spec.split('## Datos compartidos\n')[1].split(/\n## /)[0];
  const [, bootstrap] = /^\x60{3}python\n([\s\S]+?)\n\x60{3}$/m.exec(data) ?? [];
  assert.ok(bootstrap);
  assert.equal(await readFile('static/practice/pyspark/lab_pyspark.py', 'utf8'), bootstrap + '\n');
  assert.match(execFileSync(process.execPath, ['scripts/prepare-pyspark-notes.mjs', '--check'], {encoding: 'utf8'}), /222 fichas/);
});
