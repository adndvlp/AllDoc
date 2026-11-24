import type {PracticeEditorContext, RuntimeSchema, Workspace} from './contracts.ts';
import {productsDataset} from './datasets/rows/products.ts';
import {getDatasetManifest, loadPracticeDataset} from './datasets/index.ts';
import {pandasExampleCode} from './datasets/materialize.ts';
import {pandasCommerceManifest, pandasCommerceSchema} from './datasets/pandas-commerce.ts';
import {jsonOrdersManifest, jsonOrdersSchema} from './datasets/json-orders.ts';
import {numpySalesManifest, numpySalesSchema} from './datasets/numpy-sales.ts';
import {sqlite3ShopManifest, sqlite3ShopSchema} from './datasets/sqlite3-shop.ts';
import {sqliteEnvironment} from './adapters/sqlite/environment.ts';

const courseExamples = new Map([
  [jsonOrdersManifest, {schema: jsonOrdersSchema, load: () => import('../content/notes/json/deserializacion.ts')}],
  [numpySalesManifest, {schema: numpySalesSchema, load: () => import('../content/notes/numpy/ndarray-y-fundamentos.ts')}],
  [sqlite3ShopManifest, {schema: sqlite3ShopSchema, load: () => import('../content/notes/sqlite3/conexion-a-sqlite.ts')}],
]);

/** Solo se importa al abrir práctica. No crea ni simula un motor. */
export async function editorBootstrap(context: PracticeEditorContext) {
  const python = context.profile.languageId === 'python';
  const manifest = getDatasetManifest(context.profile.defaultDataset);
  const commerce = manifest === pandasCommerceManifest;
  const course = manifest && courseExamples.get(manifest);
  const path = python ? 'main.py' : 'consulta.sql';
  let schema: RuntimeSchema;
  let content: string;
  if (course) {
    const {notes} = await course.load();
    const example = notes.flatMap(note => note.examples).find(example => example.id === context.profile.defaultExampleId);
    if (!example) throw new Error('Ejemplo inicial no disponible');
    schema = course.schema;
    content = example.code;
  } else {
    const expected = commerce ? 'pandas/inspeccion/head-y-tail/1' : python ? 'pandas/dataframe/productos' : 'sql/select/todas-las-columnas';
    if (context.profile.defaultExampleId !== expected) throw new Error('Ejemplo inicial no disponible');
    if (commerce) {
      schema = pandasCommerceSchema;
      content = 'pedidos.head(2)';
    } else {
      const dataset = await loadPracticeDataset(context.profile.defaultDataset);
      const table = dataset.tables.find(table => table.name === 'productos') ?? dataset.tables[0];
      content = python ? pandasExampleCode(table) : `SELECT * FROM ${table.name};`;
      schema = {version: 0, entities: dataset.tables.map(entry => ({
        name: entry.name, kind: python ? 'dataframe' : 'table', columns: entry.columns, rowCount: entry.rows.length,
      }))};
    }
  }
  const environment = python ? (await import('./adapters/python/environment.ts')).pythonEnvironment : sqliteEnvironment;
  const workspace: Workspace = {id: context.workspaceKey, toolKey: context.toolKey, profileId: context.profile.id,
    dataset: context.profile.defaultDataset, files: [{path, languageId: context.profile.languageId, content}], activeFile: path, revision: 0,
    environmentVersion: environment.version};
  return {workspace, environment, schema};
}

export {productsDataset as editorDataset};
