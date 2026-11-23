import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sqlConcepts} from '../src/content/notes/sql.ts';
import {pandasDataframe} from '../src/content/notes/pandas.ts';
import {practiceRegistry} from '../src/practice/profiles.ts';

test('ejemplos: IDs únicos para las 166 variantes SQL y pandas; ocho IDs anteriores y defaults conservados', () => {
  const examples = [...sqlConcepts.flatMap(note => note.examples), ...pandasDataframe.examples];
  const ids = examples.map(example => example.id);
  assert.equal(ids.length, 167); assert.equal(new Set(ids).size, 167);
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
