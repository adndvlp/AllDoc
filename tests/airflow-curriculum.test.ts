import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import JSZip from 'jszip';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {searchEntries} from '../src/lib/search.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';

test('Airflow publica 200 fichas en 34 grupos y conserva los formatos originales', async () => {
  const topics = getTopics('analisis-de-datos');
  const topic = topics.find(item => item.label === 'Apache Airflow');
  assert.equal(topic?.sections?.length, 34);
  assert.equal(topic.concepts.length, 200);
  assert.equal(topics.filter(item => item.label === 'Apache Airflow').length, 1);
  const indexed = new Map(entries.map(entry => [entry.id, entry.href]));
  const formats = {python: 0, bash: 0, text: 0, steps: 0};
  for (const group of topic.sections) {
    assert.equal(group.collapsed, true);
    assert.equal(group.concepts[0].label, 'Definición');
    for (const note of group.concepts) {
      assert.equal(indexed.get(note.id), note.slug);
      assert.equal(resolvePracticeContext(note.slug), null);
    }
    const {notes} = await import(`../src/content/notes/airflow/${group.id}.ts`) as {notes: {examples: {
      code: string; steps?: string[]; language?: 'python' | 'bash' | 'text'; external: boolean;
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
  assert.deepEqual(formats, {python: 131, bash: 29, text: 2, steps: 38});
  assert.equal(searchEntries(entries, 'Airflow generar un resumen de ventas reproducible')[0]?.id,
    'analisis-de-datos/airflow/pipeline-ventas/definicion');
});

test('el laboratorio de Airflow entrega los pedidos, la plantilla y el DAG de ventas completo', async () => {
  const zip = await JSZip.loadAsync(await readFile('static/practice/airflow/airflow-laboratorio.zip'), {checkCRC32: true});
  assert.deepEqual(Object.keys(zip.files).sort(), ['dag_ejemplo.py', 'dag_resumen_ventas.py', 'orders.csv']
    .map(name => 'airflow-laboratorio/' + name));
  const spec = await readFile('specs/airflow.md', 'utf8');
  const fixture = /<<'CSV'\n([\s\S]+?)\nCSV/m.exec(spec)?.[1];
  assert.ok(fixture);
  const orders = await zip.file('airflow-laboratorio/orders.csv')!.async('string');
  assert.equal(orders, fixture + '\n');
  const completed = orders.trim().split('\n').slice(1).map(row => row.split(',')).filter(row => row[4] === 'completed');
  assert.equal(completed.length, 4);
  assert.equal(completed.reduce((sum, row) => sum + Number(row[3]), 0), 3000);
  const source = await zip.file('airflow-laboratorio/dag_ejemplo.py')!.async('string');
  assert.equal(source, /^\x60{3}python\n([\s\S]+?)\n\x60{3}$/m.exec(spec)?.[1] + '\n');
  const resolvedDag = await zip.file('airflow-laboratorio/dag_resumen_ventas.py')!.async('string');
  assert.match(resolvedDag, /dag_id="alldoc_resumen_ventas"/);
  assert.match(resolvedDag, /\n    publicar\(transformar\(extraer\(\)\)\)\n$/);
  assert.match(execFileSync(process.execPath, ['scripts/prepare-airflow-notes.mjs', '--check'], {encoding: 'utf8'}), /200 fichas/);
});
