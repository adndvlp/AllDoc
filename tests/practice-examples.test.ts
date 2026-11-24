import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sqlConcepts} from '../src/content/notes/sql.ts';
import {pandasDataframe} from '../src/content/notes/pandas.ts';
import {practiceRegistry} from '../src/practice/profiles.ts';
import {pandasCurriculum} from '../src/content/pandas-curriculum.ts';

test('ejemplos: IDs únicos para SQL y pandas con los ejemplos anteriores y predeterminados', async () => {
  const groups = await Promise.all(pandasCurriculum.map(async ({key}) =>
    (await import(`../src/content/notes/pandas/${key}.ts`)).notes as {examples: {id: string}[]}[]));
  const examples = [...sqlConcepts.flatMap(note => note.examples), ...pandasDataframe.examples,
    ...groups.flatMap(notes => notes.flatMap(note => note.examples))];
  const ids = examples.map(example => example.id);
  assert.equal(ids.length, 391); assert.equal(new Set(ids).size, 391);
  const legacy = [
    'sql/select/todas-las-columnas', 'sql/select/columnas-concretas',
    'sql/where/condicion', 'sql/order-by/precio-ascendente',
    'sql/limit/filas-completas', 'sql/limit/nombres',
    'sql/comentarios/una-linea', 'sql/comentarios/varias-lineas',
    'pandas/dataframe/productos',
  ];
  for(const id of legacy)assert.ok(ids.includes(id));
  for (const profile of practiceRegistry.list()) assert.ok(ids.includes(profile.defaultExampleId));
});
