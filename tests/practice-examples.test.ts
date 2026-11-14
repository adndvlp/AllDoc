import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sqlConcepts} from '../src/content/notes/sql.ts';
import {pandasDataframe} from '../src/content/notes/pandas.ts';
import {practiceRegistry} from '../src/practice/profiles.ts';

test('ejemplos: IDs estables y únicos para las ocho variantes SQL y pandas; defaults existentes resolubles', () => {
  const examples = [...sqlConcepts.flatMap(note => note.examples), ...pandasDataframe.examples];
  const ids = examples.map(example => example.id);
  assert.equal(ids.length, 9); assert.equal(new Set(ids).size, 9);
  assert.deepEqual(ids, [
    'sql/select/todas-las-columnas', 'sql/select/columnas-concretas',
    'sql/where/condicion', 'sql/order-by/precio-ascendente',
    'sql/limit/filas-completas', 'sql/limit/nombres',
    'sql/comentarios/una-linea', 'sql/comentarios/varias-lineas',
    'pandas/dataframe/productos',
  ]);
  for (const profile of practiceRegistry.list()) assert.ok(ids.includes(profile.defaultExampleId));
});
