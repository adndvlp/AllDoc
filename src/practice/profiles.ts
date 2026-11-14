import {createPracticeRegistry} from './registry.ts';

// Solo metadata. Ningún motor, editor, cuerpo o dataset de filas se importa aquí.
export const practiceRegistry = createPracticeRegistry([
  {profile: {
    id: 'sql-sqlite', label: 'SQL (SQLite)', toolKey: 'analisis-de-datos/sql',
    languageId: 'sql', runtimeId: 'sqlite-wasm', completionId: 'sql-schema',
    defaultExampleId: 'sql/select/todas-las-columnas',
    defaultDataset: {id: 'productos-basico', version: 1},
    executionLocation: 'browser', availability: 'planned', editorAvailability: 'enabled',
    capabilities: {multipleFiles: false, tables: true, figures: false, preview: false, network: 'none'},
  }},
  {profile: {
    id: 'python-pandas', label: 'pandas', toolKey: 'analisis-de-datos/pandas',
    languageId: 'python', runtimeId: 'pyodide', completionId: 'python-jedi',
    defaultExampleId: 'pandas/dataframe/productos',
    defaultDataset: {id: 'productos-basico', version: 1},
    executionLocation: 'browser', availability: 'planned', editorAvailability: 'enabled',
    capabilities: {multipleFiles: false, tables: true, figures: false, preview: false, network: 'none'},
  }},
]);
