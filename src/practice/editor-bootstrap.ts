import type {PracticeEditorContext, RuntimeSchema, Workspace} from './contracts.ts';
import {productsDataset} from './datasets/rows/products.ts';
import {pandasExampleCode} from './datasets/materialize.ts';
import {sqliteEnvironment} from './adapters/sqlite/environment.ts';

/** Solo se importa al abrir práctica. No crea ni simula un motor. */
export async function editorBootstrap(context: PracticeEditorContext) {
  const python = context.profile.languageId === 'python';
  const expected = python ? 'pandas/dataframe/productos' : 'sql/select/todas-las-columnas';
  if (context.profile.defaultExampleId !== expected) throw new Error('Ejemplo inicial no disponible');
  const table = productsDataset.tables[0]; const path = python ? 'main.py' : 'consulta.sql';
  const workspace: Workspace = {id: context.workspaceKey, toolKey: context.toolKey, profileId: context.profile.id,
    dataset: context.profile.defaultDataset, files: [{path, languageId: context.profile.languageId,
      content: python ? pandasExampleCode(table) : `SELECT * FROM ${table.name};`}], activeFile: path, revision: 0,
    environmentVersion: python ? 'editor@1' : sqliteEnvironment.version};
  const schema: RuntimeSchema = {version: 0, entities: productsDataset.tables.map((entry) => ({
    name: entry.name, kind: python ? 'dataframe' : 'table', columns: entry.columns, rowCount: entry.rows.length}))};
  return {workspace, environment: python ? null : sqliteEnvironment, schema};
}

export {productsDataset as editorDataset};
