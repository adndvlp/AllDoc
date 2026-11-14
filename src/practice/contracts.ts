/** Protocolo independiente del editor y de las librerías de ejecución. */
export const PRACTICE_PROTOCOL_VERSION = 1;

export type DatasetReference = Readonly<{id: string; version: number}>;
export type PracticeCapabilities = Readonly<{
  multipleFiles: boolean;
  tables: boolean;
  figures: boolean;
  preview: boolean;
  network: 'none' | 'declared';
}>;
type ProfileMetadata = Readonly<{
  id: string;
  label: string;
  toolKey: string;
  languageId: string;
  runtimeId: string;
  completionId: string;
  completionDescription?: string;
  busyCompletionDescription?: string;
  editorAvailability?: 'planned' | 'enabled';
  defaultExampleId: string;
  defaultDataset: DatasetReference;
  executionLocation: 'browser' | 'remote';
  capabilities: PracticeCapabilities;
}>;
export type EnabledPracticeProfile = ProfileMetadata & {readonly availability: 'enabled'};
export type PlannedPracticeProfile = ProfileMetadata & {readonly availability: 'planned'};
export type PracticeProfile = EnabledPracticeProfile | PlannedPracticeProfile;

export type VirtualFile = Readonly<{path: string; languageId: string; content: string}>;
export type Workspace = Readonly<{
  id: string;
  toolKey: string;
  profileId: string;
  dataset: DatasetReference;
  files: readonly VirtualFile[];
  activeFile: string;
  revision: number;
  environmentVersion: string;
}>;

export type ColumnType = 'text' | 'integer' | 'number' | 'boolean' | 'bigint' | 'decimal' | 'date' | 'datetime';
export type DataColumn = Readonly<{name: string; type: ColumnType}>;
export type Cell = null | boolean | number | string;
export type RuntimeSchema = Readonly<{
  version: number;
  entities: readonly Readonly<{
    name: string;
    kind: 'table' | 'dataframe' | 'variable';
    columns: readonly DataColumn[];
    rowCount?: number;
    preview?: Readonly<{columns: readonly DataColumn[]; rows: readonly (readonly Cell[])[]; truncated: boolean}>;
  }>[];
}>;
export type EnvironmentManifest = Readonly<{
  version: string;
  runtime: Readonly<{id: string; version: string}>;
  packages: readonly Readonly<{name: string; version: string}>[];
}>;
export type MaterializedDataset = Readonly<{
  reference: DatasetReference;
  files: readonly Readonly<{path: string; bytes: Uint8Array}>[];
  bootstrap: string;
  schema: RuntimeSchema;
}>;
export type RuntimeContext = Readonly<{
  profile: EnabledPracticeProfile;
  environment: EnvironmentManifest;
  dataset: MaterializedDataset;
}>;
export type RunRequest = Readonly<{
  runId: string;
  generation: number;
  workspaceId: string;
  revision: number;
  files: readonly VirtualFile[];
  entryFile: string;
  selection?: Readonly<{from: number; to: number}>;
}>;
export type RunIdentity = Readonly<{runId: string; generation: number; revision: number}>;
export type RuntimeEvent = RunIdentity & {readonly protocolVersion: 1} & (
  | {readonly type: 'progress'; readonly phase: string}
  | {readonly type: 'stream'; readonly channel: 'stdout' | 'stderr'; readonly text: string}
  | {readonly type: 'table'; readonly columns: readonly DataColumn[]; readonly rows: readonly (readonly Cell[])[]; readonly truncated: boolean}
  | {readonly type: 'error'; readonly message: string; readonly file?: string; readonly line?: number; readonly column?: number}
  | {readonly type: 'end'; readonly status: 'success' | 'error' | 'cancelled' | 'timeout'; readonly environmentReset: boolean}
);
export interface RuntimeAdapter {
  init(context: RuntimeContext, signal: AbortSignal): Promise<void>;
  run(request: RunRequest): AsyncIterable<RuntimeEvent>;
  cancel(runId: string): Promise<{environmentReset: boolean}>;
  reset(signal: AbortSignal): Promise<void>;
  inspect(): Promise<RuntimeSchema>;
  dispose(): Promise<void>;
}

export type CompletionRequest = Readonly<{
  requestId: string;
  generation: number;
  workspaceId: string;
  revision: number;
  file: string;
  document: string;
  position: number;
  schema: RuntimeSchema;
}>;
export type CompletionResult = Readonly<{
  requestId: string;
  workspaceId: string;
  file: string;
  generation: number;
  revision: number;
  from: number;
  to: number;
  items: readonly Readonly<{label: string; insertText: string; detail?: string}>[];
}>;
export interface CompletionAdapter {
  complete(request: CompletionRequest, signal: AbortSignal): Promise<CompletionResult>;
  dispose(): Promise<void>;
}
export interface DatasetAdapter {
  materialize(reference: DatasetReference, runtimeId: string, signal: AbortSignal): Promise<MaterializedDataset>;
}
export type AdapterFactories = Readonly<{
  createRuntime: () => RuntimeAdapter;
  createCompletion: (runtime: RuntimeAdapter) => CompletionAdapter;
  createDataset: () => DatasetAdapter;
}>;
export type ProviderLoaders = Readonly<{
  runtime: () => Promise<AdapterFactories['createRuntime']>;
  completion: () => Promise<AdapterFactories['createCompletion']>;
  dataset: () => Promise<AdapterFactories['createDataset']>;
}>;
export type PracticeRegistration = {readonly defaultForTool?: boolean} & (
  | {readonly profile: EnabledPracticeProfile; readonly loaders: ProviderLoaders}
  | {readonly profile: PlannedPracticeProfile; readonly loaders?: never}
);
export interface PracticeRegistry {
  list(): readonly PracticeProfile[];
  get(id: string): PracticeProfile | undefined;
  forTool(toolKey: string): readonly PracticeProfile[];
  defaultForTool(toolKey: string): PracticeProfile | undefined;
  loadProviders(id: string): Promise<AdapterFactories>;
}
export type PracticeEditorContext = Readonly<{
  conceptId: string;
  conceptSlug: string;
  toolKey: string;
  profile: PracticeProfile;
  workspaceKey: string;
}>;
/** Ejecutar requiere un perfil habilitado; editar no habilita un runtime pendiente. */
export type PracticeContext = PracticeEditorContext & {readonly profile: EnabledPracticeProfile};
