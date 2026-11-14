import {createPracticeRegistry} from './registry.ts';

// Solo metadata. Ningún motor, editor, cuerpo o dataset de filas se importa aquí.
export const practiceRegistry = createPracticeRegistry([
  {profile: {
    id: 'sql-sqlite', label: 'SQL (SQLite)', toolKey: 'analisis-de-datos/sql',
    languageId: 'sql', runtimeId: 'sqlite-wasm', completionId: 'sql-schema',
    completionDescription: 'SQLite · Sugerencias del esquema actual',
    defaultExampleId: 'sql/select/todas-las-columnas',
    defaultDataset: {id: 'productos-basico', version: 1},
    executionLocation: 'browser', availability: 'enabled', editorAvailability: 'enabled',
    capabilities: {multipleFiles: false, tables: true, figures: false, preview: false, network: 'none'},
  }, loaders: {
    runtime: () => import(/* webpackChunkName: "practice-sql-bridge" */ './adapters/sqlite/browser.ts').then((module) => module.createSQLiteRuntime),
    completion: () => import(/* webpackChunkName: "practice-sql-completion" */ './adapters/sqlite/completion.ts').then((module) => module.createSQLCompletion),
    dataset: () => import(/* webpackChunkName: "practice-dataset-adapter" */ './datasets/index.ts').then((module) => module.createDatasetAdapter),
  }},
  {profile: {
    id: 'python-pandas', label: 'pandas', toolKey: 'analisis-de-datos/pandas',
    languageId: 'python', runtimeId: 'pyodide', completionId: 'python-jedi',
    completionDescription: 'Python · Jedi y columnas registradas',
    busyCompletionDescription: 'Análisis pausado durante la ejecución',
    defaultExampleId: 'pandas/dataframe/productos',
    defaultDataset: {id: 'productos-basico', version: 1},
    executionLocation: 'browser', availability: 'enabled', editorAvailability: 'enabled',
    capabilities: {multipleFiles: false, tables: true, figures: false, preview: false, network: 'none'},
  }, loaders: {
    runtime: () => import(/* webpackChunkName: "practice-python-bridge" */ './adapters/python/browser.ts').then((module) => module.createPythonRuntime),
    completion: () => import(/* webpackChunkName: "practice-python-bridge" */ './adapters/python/browser.ts').then((module) => module.createPythonCompletion),
    dataset: () => import(/* webpackChunkName: "practice-dataset-adapter" */ './datasets/index.ts').then((module) => module.createDatasetAdapter),
  }},
]);
