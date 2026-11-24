import {createPracticeRegistry} from './registry.ts';
import type {EnabledPracticeProfile, ProviderLoaders} from './contracts.ts';

const pythonProfile: EnabledPracticeProfile = {
  id: 'python-pandas', label: 'pandas', toolKey: 'analisis-de-datos/pandas',
  languageId: 'python', runtimeId: 'pyodide', completionId: 'python-jedi',
  completionDescription: 'Python · Jedi y columnas registradas',
  busyCompletionDescription: 'Análisis pausado durante la ejecución',
  defaultExampleId: 'pandas/dataframe/productos',
  defaultDataset: {id: 'productos-basico', version: 1},
  executionLocation: 'browser', availability: 'enabled', editorAvailability: 'enabled',
  capabilities: {multipleFiles: false, tables: true, figures: false, preview: false, network: 'none'},
};
const pythonLoaders: ProviderLoaders = {
  runtime: () => import(/* webpackChunkName: "practice-python-bridge" */ './adapters/python/browser.ts').then(({createPythonRuntime}) => createPythonRuntime),
  completion: () => import(/* webpackChunkName: "practice-python-bridge" */ './adapters/python/browser.ts').then(({createPythonCompletion}) => createPythonCompletion),
  dataset: () => import(/* webpackChunkName: "practice-dataset-adapter" */ './datasets/index.ts').then(({createDatasetAdapter}) => createDatasetAdapter),
};

const spreadsheetProfile: EnabledPracticeProfile = {
  id: 'excel-ironcalc', label: 'Excel', toolKey: 'analisis-de-datos/excel',
  languageId: 'excel', runtimeId: 'ironcalc', completionId: 'excel-formulas',
  completionDescription: 'Fórmulas en inglés · Ejemplo: SUM(A1:A8)',
  defaultExampleId: 'excel/agregaciones/sum/1', defaultDataset: {id: 'excel-ventas', version: 1},
  executionLocation: 'browser', availability: 'enabled', editorAvailability: 'enabled',
  capabilities: {multipleFiles: false, tables: true, figures: false, preview: false, network: 'none'},
};

const spreadsheetLoaders = (label: string): ProviderLoaders => ({
  runtime: () => import('./adapters/excel/browser.ts').then(module => () => module.createExcelRuntime(label)),
  completion: () => import('./adapters/excel/browser.ts').then(module => module.createExcelCompletion),
  dataset: () => import('./adapters/excel/dataset.ts').then(module => module.createExcelDataset),
});

// Solo metadata. Ningún motor, editor, cuerpo o dataset de filas se importa aquí.
export const practiceRegistry = createPracticeRegistry([
  {profile: {
    id: 'sql-sqlite', label: 'SQL (SQLite)', toolKey: 'analisis-de-datos/sql',
    languageId: 'sql', runtimeId: 'sqlite-wasm', completionId: 'sql-schema',
    completionDescription: 'SQLite · Sugerencias del esquema actual',
    defaultExampleId: 'sql/select/todas-las-columnas',
    defaultDataset: {id: 'negocio-relacional', version: 1},
    executionLocation: 'browser', availability: 'enabled', editorAvailability: 'enabled',
    capabilities: {multipleFiles: false, tables: true, figures: false, preview: false, network: 'none'},
  }, loaders: {
    runtime: () => import(/* webpackChunkName: "practice-sql-bridge" */ './adapters/sqlite/browser.ts').then((module) => module.createSQLiteRuntime),
    completion: () => import(/* webpackChunkName: "practice-sql-completion" */ './adapters/sqlite/completion.ts').then((module) => module.createSQLCompletion),
    dataset: () => import(/* webpackChunkName: "practice-dataset-adapter" */ './datasets/index.ts').then((module) => module.createDatasetAdapter),
  }},
  {profile: pythonProfile, defaultForTool: true, loaders: pythonLoaders},
  {profile: {...pythonProfile, id: 'python-pandas-comercio', defaultExampleId: 'pandas/inspeccion/head-y-tail/1',
    defaultDataset: {id: 'pandas-comercio', version: 1}}, loaders: pythonLoaders},
  {profile: {...pythonProfile, id: 'python-json', label: 'json', toolKey: 'analisis-de-datos/json',
    completionDescription: 'Python · Sugerencias Jedi',
    defaultExampleId: 'json/deserializacion/definicion/1', defaultDataset: {id: 'json-pedidos', version: 1}}, loaders: pythonLoaders},
  {profile: {...pythonProfile, id: 'python-requests', label: 'requests', toolKey: 'analisis-de-datos/requests',
    completionDescription: 'Python · API de pedidos simulada',
    defaultExampleId: 'requests/http-y-apis/definicion/1', defaultDataset: {id: 'requests-pedidos', version: 1}}, loaders: pythonLoaders},
  {profile: {...pythonProfile, id: 'python-httpx', label: 'httpx', toolKey: 'analisis-de-datos/httpx',
    completionDescription: 'Python · API de pedidos simulada',
    defaultExampleId: 'httpx/fundamentos-http/definicion/1', defaultDataset: {id: 'httpx-pedidos', version: 1}}, loaders: pythonLoaders},
  {profile: {...pythonProfile, id: 'python-numpy', label: 'NumPy', toolKey: 'analisis-de-datos/numpy',
    completionDescription: 'Python · Sugerencias Jedi',
    defaultExampleId: 'numpy/ndarray-y-fundamentos/shape-ndim-y-size/1',
    defaultDataset: {id: 'numpy-ventas', version: 1}}, loaders: pythonLoaders},
  {profile: {...pythonProfile, id: 'python-sqlite3', label: 'sqlite3', toolKey: 'analisis-de-datos/sqlite3',
    completionDescription: 'Python · Sugerencias Jedi',
    defaultExampleId: 'sqlite3/conexion-a-sqlite/connection-y-cursor/1',
    defaultDataset: {id: 'sqlite3-tienda', version: 1}}, loaders: pythonLoaders},
  {profile: {...pythonProfile, id: 'python-openpyxl', label: 'openpyxl', toolKey: 'analisis-de-datos/openpyxl',
    completionDescription: 'Python · Sugerencias Jedi',
    defaultExampleId: 'openpyxl/workbook/load-workbook/1',
    defaultDataset: {id: 'openpyxl-ventas', version: 1}}, loaders: pythonLoaders},
  {profile: {...pythonProfile, id: 'python-scipy', label: 'SciPy', toolKey: 'analisis-de-datos/scipy',
    completionDescription: 'Python · Sugerencias Jedi',
    defaultExampleId: 'scipy/entorno/definicion/1',
    defaultDataset: {id: 'scipy-negocio', version: 1}}, loaders: pythonLoaders},
  {profile: {...pythonProfile, id: 'python-sqlalchemy', label: 'SQLAlchemy', toolKey: 'analisis-de-datos/sqlalchemy',
    completionDescription: 'Python · Sugerencias Jedi',
    defaultExampleId: 'sqlalchemy/sqlalchemy-arquitectura/definicion/1',
    defaultDataset: {id: 'sqlalchemy-ventas', version: 1}}, loaders: pythonLoaders},
  {profile: {...pythonProfile, id: 'python-matplotlib', label: 'Matplotlib', toolKey: 'analisis-de-datos/matplotlib',
    capabilities: {...pythonProfile.capabilities, figures: true},
    completionDescription: 'Python · Sugerencias Jedi',
    defaultExampleId: 'matplotlib/fundamentos/definicion/1',
    defaultDataset: {id: 'matplotlib-ventas', version: 1}}, loaders: pythonLoaders},
  {profile: {...pythonProfile, id: 'python-seaborn', label: 'Seaborn', toolKey: 'analisis-de-datos/seaborn',
    capabilities: {...pythonProfile.capabilities, figures: true},
    completionDescription: 'Python · Sugerencias Jedi',
    defaultExampleId: 'seaborn/introduccion/definicion/1',
    defaultDataset: {id: 'seaborn-sucursales', version: 1}}, loaders: pythonLoaders},
  {profile: spreadsheetProfile, loaders: spreadsheetLoaders(spreadsheetProfile.label)},
  {profile: {...spreadsheetProfile, id: 'google-sheets-ironcalc', label: 'Google Sheets', toolKey: 'analisis-de-datos/google-sheets',
    defaultExampleId: 'google-sheets/agregacion/sum/1', defaultDataset: {id: 'google-sheets-ventas', version: 1}},
  loaders: spreadsheetLoaders('Google Sheets')},
  {profile: {
    id: 'r-webr', label: 'R', toolKey: 'analisis-de-datos/r', languageId: 'r', runtimeId: 'webr', completionId: 'r-schema',
    completionDescription: 'R · Funciones y columnas de las tablas', busyCompletionDescription: 'Sugerencias en pausa durante la ejecución',
    defaultExampleId: 'r/entorno-y-paquetes/definicion/1', defaultDataset: {id: 'r-comercio', version: 1},
    executionLocation: 'browser', availability: 'enabled', editorAvailability: 'enabled',
    capabilities: {multipleFiles: false, tables: true, figures: true, preview: true, network: 'none'},
  }, loaders: {
    runtime: () => import('./adapters/r/browser.ts').then(module => module.createRRuntime),
    completion: () => import('./adapters/r/browser.ts').then(module => module.createRCompletion),
    dataset: () => import('./adapters/r/dataset.ts').then(module => module.createRDataset),
  }},
]);
