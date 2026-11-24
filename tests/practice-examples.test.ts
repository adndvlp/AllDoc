import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sqlConcepts} from '../src/content/notes/sql.ts';
import {pandasDataframe} from '../src/content/notes/pandas.ts';
import {practiceRegistry} from '../src/practice/profiles.ts';
import {pandasCurriculum} from '../src/content/pandas-curriculum.ts';
import {jsonCurriculum} from '../src/content/json-curriculum.ts';
import {numpyCurriculum} from '../src/content/numpy-curriculum.ts';
import {sqlite3Curriculum} from '../src/content/sqlite3-curriculum.ts';
import {openpyxlCurriculum} from '../src/content/openpyxl-curriculum.ts';
import {scipyCurriculum} from '../src/content/scipy-curriculum.ts';
import {sqlalchemyCurriculum} from '../src/content/sqlalchemy-curriculum.ts';
import {matplotlibCurriculum} from '../src/content/matplotlib-curriculum.ts';
import {seabornCurriculum} from '../src/content/seaborn-curriculum.ts';

test('ejemplos: IDs únicos para SQL y los temarios Python con los ejemplos anteriores y predeterminados', async () => {
  const courses = [['pandas', pandasCurriculum], ['json', jsonCurriculum], ['numpy', numpyCurriculum],
    ['sqlite3', sqlite3Curriculum], ['openpyxl', openpyxlCurriculum], ['scipy', scipyCurriculum],
    ['sqlalchemy', sqlalchemyCurriculum], ['matplotlib', matplotlibCurriculum], ['seaborn', seabornCurriculum]] as const;
  const groups = await Promise.all(courses.flatMap(([tool, groups]) => groups.map(async ({key}) =>
    (await import(`../src/content/notes/${tool}/${key}.ts`)).notes as {examples: {id: string}[]}[])));
  const examples = [...sqlConcepts.flatMap(note => note.examples), ...pandasDataframe.examples,
    ...groups.flatMap(notes => notes.flatMap(note => note.examples))];
  const ids = examples.map(example => example.id);
  assert.equal(ids.length, 1711); assert.equal(new Set(ids).size, 1711);
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
