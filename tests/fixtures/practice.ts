import type {ConceptMeta} from '../../src/content/concepts.ts';
import type {AdapterFactories, EnabledPracticeProfile, PracticeRegistration} from '../../src/practice/contracts.ts';

export const sqlProfile: EnabledPracticeProfile = {
  id: 'sql-sqlite', label: 'SQL (SQLite)', toolKey: 'analisis-de-datos/sql',
  languageId: 'sql', runtimeId: 'sqlite-wasm', completionId: 'sql-schema',
  defaultExampleId: 'sql/select/todas-las-columnas',
  defaultDataset: {id: 'productos-basico', version: 1},
  executionLocation: 'browser', availability: 'enabled',
  capabilities: {multipleFiles: false, tables: true, figures: false, preview: false, network: 'none'},
};

export const pandasConcept: ConceptMeta = {
  id: 'analisis-de-datos/pandas/dataframe', areaId: 'analisis-de-datos', topicId: 'pandas',
  slug: '/apuntes/analisis-de-datos/pandas/dataframe', title: 'DataFrame',
  label: 'Crear una tabla', description: 'Una tabla de productos.', order: 1,
};

export function registration(profile: EnabledPracticeProfile = sqlProfile) {
  const calls = {runtime: 0, completion: 0, dataset: 0, constructed: 0};
  const factories: AdapterFactories = {
    createRuntime: () => {
      calls.constructed++;
      return {
        async init() {},
        async *run(request) {
          const identity = {protocolVersion: 1 as const, runId: request.runId,
            generation: request.generation, revision: request.revision};
          yield {...identity, type: 'stream', channel: 'stdout', text: request.files[0].content};
          yield {...identity, type: 'end', status: 'success', environmentReset: false};
        },
        async cancel() {return {environmentReset: true};}, async reset() {},
        async inspect() {return {version: 0, entities: []};}, async dispose() {},
      };
    },
    createCompletion: () => ({
      async complete(request) {
        return {requestId: request.requestId, workspaceId: request.workspaceId, file: request.file,
          generation: request.generation, revision: request.revision,
          from: request.position, to: request.position, items: [{label: profile.label, insertText: 'example'}]};
      },
      async dispose() {},
    }),
    createDataset: () => ({
      async materialize(reference) {return {reference, files: [], bootstrap: '', schema: {version: 0, entities: []}};},
    }),
  };
  const entry: PracticeRegistration = {profile, loaders: {
    async runtime() {calls.runtime++; return factories.createRuntime;},
    async completion() {calls.completion++; return factories.createCompletion;},
    async dataset() {calls.dataset++; return factories.createDataset;},
  }};
  return {entry, calls, factories};
}
