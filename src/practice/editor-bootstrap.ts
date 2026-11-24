import type {PracticeEditorContext, RuntimeSchema, Workspace} from './contracts.ts';
import {productsDataset} from './datasets/rows/products.ts';
import {getDatasetManifest, loadPracticeDataset} from './datasets/index.ts';
import {pandasExampleCode} from './datasets/materialize.ts';
import {pandasCommerceManifest, pandasCommerceSchema} from './datasets/pandas-commerce.ts';
import {jsonOrdersManifest, jsonOrdersSchema} from './datasets/json-orders.ts';
import {numpySalesManifest, numpySalesSchema} from './datasets/numpy-sales.ts';
import {scipyBusinessManifest, scipyBusinessSchema} from './datasets/scipy-business.ts';
import {matplotlibSalesManifest, matplotlibSalesSchema} from './datasets/matplotlib-sales.ts';
import {seabornBranchesManifest, seabornBranchesSchema} from './datasets/seaborn-branches.ts';
import {sqlalchemySalesManifest, sqlalchemySalesSchema} from './datasets/sqlalchemy-sales.ts';
import {sqlite3ShopManifest, sqlite3ShopSchema} from './datasets/sqlite3-shop.ts';
import {openpyxlSalesManifest, openpyxlSalesSchema} from './datasets/openpyxl-sales.ts';
import {sqliteEnvironment} from './adapters/sqlite/environment.ts';

const courseExamples = new Map([
  [jsonOrdersManifest, {schema: jsonOrdersSchema, load: () => import('../content/notes/json/deserializacion.ts')}],
  [numpySalesManifest, {schema: numpySalesSchema, load: () => import('../content/notes/numpy/ndarray-y-fundamentos.ts')}],
  [scipyBusinessManifest, {schema: scipyBusinessSchema, load: () => import('../content/notes/scipy/entorno.ts')}],
  [matplotlibSalesManifest, {schema: matplotlibSalesSchema, load: () => import('../content/notes/matplotlib/fundamentos.ts')}],
  [seabornBranchesManifest, {schema: seabornBranchesSchema, load: () => import('../content/notes/seaborn/introduccion.ts')}],
  [sqlalchemySalesManifest, {schema: sqlalchemySalesSchema, load: () => import('../content/notes/sqlalchemy/sqlalchemy-arquitectura.ts')}],
  [sqlite3ShopManifest, {schema: sqlite3ShopSchema, load: () => import('../content/notes/sqlite3/conexion-a-sqlite.ts')}],
  [openpyxlSalesManifest, {schema: openpyxlSalesSchema, load: () => import('../content/notes/openpyxl/workbook.ts')}],
]);

/** Solo se importa al abrir práctica. No crea ni simula un motor. */
export async function editorBootstrap(context: PracticeEditorContext) {
  if (context.profile.runtimeId === 'webr') {
    const [{rCommerceSchema}, {rEnvironment}, {notes}] = await Promise.all([
      import('./adapters/r/dataset.ts'), import('./adapters/r/environment.ts'), import('../content/notes/r/entorno-y-paquetes.ts'),
    ]);
    const example = notes.flatMap(note => note.examples).find(item => item.id === context.profile.defaultExampleId);
    if (!example) throw new Error('Ejemplo inicial de R no disponible');
    const path = 'main.R';
    const workspace: Workspace = {id: context.workspaceKey, toolKey: context.toolKey, profileId: context.profile.id,
      dataset: context.profile.defaultDataset, files: [{path, languageId: 'r', content: example.code}], activeFile: path, revision: 0,
      environmentVersion: rEnvironment.version};
    return {workspace, environment: rEnvironment, schema: rCommerceSchema};
  }
  if (context.profile.runtimeId === 'ironcalc') {
    const [{spreadsheetSchema}, {EXCEL_FILE}] = await Promise.all([
      import('./adapters/excel/dataset.ts'), import('./adapters/excel/workbook.ts'),
    ]);
    const dataset = context.profile.defaultDataset;
    const version = `ironcalc@0.9.1/${dataset.id}@${dataset.version}`;
    const workspace: Workspace = {id: context.workspaceKey, toolKey: context.toolKey, profileId: context.profile.id,
      dataset, files: [{path: EXCEL_FILE, languageId: 'excel', content: '{}'}],
      activeFile: EXCEL_FILE, revision: 0, environmentVersion: version};
    return {workspace, schema: spreadsheetSchema(dataset.id),
      environment: {version, runtime: {id: 'ironcalc', version: '0.9.1'}, packages: []}};
  }
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
  const environment = python
    ? (await import('./adapters/python/environment.ts')).getPythonEnvironment(context.profile.id)
    : sqliteEnvironment;
  const workspace: Workspace = {id: context.workspaceKey, toolKey: context.toolKey, profileId: context.profile.id,
    dataset: context.profile.defaultDataset, files: [{path, languageId: context.profile.languageId, content}], activeFile: path, revision: 0,
    environmentVersion: environment.version};
  return {workspace, environment, schema};
}

export {productsDataset as editorDataset};
