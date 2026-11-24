import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';

test('Psycopg publica sus 204 fichas en 25 grupos con búsqueda y sin perfil de práctica', () => {
  const topic = getTopics('analisis-de-datos').find(item => item.id === 'psycopg');
  assert.equal(topic?.sections?.length, 25);
  assert.equal(topic.concepts.length, 204);
  const indexed = new Map(entries.map(entry => [entry.id, entry]));
  for (const group of topic.sections) {
    assert.equal(group.collapsed, true);
    assert.equal(group.concepts[0].label, 'Definición');
    for (const note of group.concepts) {
      assert.equal(indexed.get(note.id)?.href, note.slug);
      assert.equal(resolvePracticeContext(note.slug), null);
    }
  }
  assert.deepEqual(indexed.get('analisis-de-datos/psycopg/instalacion-y-compatibilidad/definicion')?.keywords,
    ['Definición', 'Consultar la versión instalada', 'Instalación y compatibilidad']);
});

test('el archivo de laboratorio permite importar DSN sin ejecutar la preparación de PostgreSQL', async () => {
  const filename = 'static/practice/psycopg/lab_psycopg.py';
  const [spec, lab] = await Promise.all([readFile('specs/psycopg.md', 'utf8'), readFile(filename, 'utf8')]);
  const seed = spec.split('## Datos compartidos\n')[1].match(/```python\n([\s\S]+?)\n```/)?.[1];
  assert.ok(seed);
  const [header, guarded] = lab.trimEnd().split('\nif __name__ == "__main__":\n');
  assert.match(header, /DSN = make_conninfo/);
  assert.doesNotMatch(header, /psycopg\.connect|DROP TABLE/);
  assert.ok(guarded);
  assert.equal(header + '\n' + guarded.split('\n').map(line => line.slice(4)).join('\n'), seed);
  assert.match(execFileSync(process.execPath, ['scripts/prepare-psycopg-notes.mjs', '--check'], {encoding: 'utf8'}), /204 fichas/);
});
