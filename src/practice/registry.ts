import type {AdapterFactories, PracticeProfile, PracticeRegistration, PracticeRegistry, ProviderLoaders} from './contracts.ts';
import {record, identifier, datasetReference} from './guards.ts';

function validateProfile(value: unknown): asserts value is PracticeProfile {
  if (!record(value) || !['id', 'label', 'toolKey', 'languageId', 'runtimeId', 'completionId', 'defaultExampleId'].every((key) => identifier(value[key]))
    || !/^[a-z0-9-]+\/[a-z0-9-]+$/.test(value.toolKey as string)
    || !datasetReference(value.defaultDataset)
    || !['browser', 'remote'].includes(value.executionLocation as string)
    || !['planned', 'enabled'].includes(value.availability as string)
    || (value.editorAvailability !== undefined && !['planned', 'enabled'].includes(value.editorAvailability as string))
    || !record(value.capabilities)
    || !['multipleFiles', 'tables', 'figures', 'preview'].every((key) => typeof (value.capabilities as Record<string, unknown>)[key] === 'boolean')
    || !['none', 'declared'].includes(value.capabilities.network as string)) {
    throw new Error('Perfil de práctica inválido');
  }
}

function snapshot(profile: PracticeProfile): PracticeProfile {
  return Object.freeze({...profile, defaultDataset: Object.freeze({...profile.defaultDataset}),
    capabilities: Object.freeze({...profile.capabilities})});
}

export function createPracticeRegistry(entries: readonly PracticeRegistration[]): PracticeRegistry {
  const profiles = new Map<string, PracticeProfile>();
  const loaders = new Map<string, ProviderLoaders>();
  const byTool = new Map<string, readonly PracticeProfile[]>();
  const defaults = new Map<string, PracticeProfile>();
  const explicitDefaults = new Set<string>();
  const providers = new Map<string, Promise<AdapterFactories>>();

  for (const entry of entries) {
    validateProfile(entry.profile);
    const profile = snapshot(entry.profile);
    if (profiles.has(profile.id)) throw new Error('Perfil de práctica duplicado: ' + profile.id);
    if (entry.defaultForTool !== undefined && typeof entry.defaultForTool !== 'boolean') throw new Error('Perfil predeterminado inválido');
    if (profile.availability === 'enabled') {
      if (!entry.loaders || !['runtime', 'completion', 'dataset'].every((key) => typeof entry.loaders?.[key as keyof ProviderLoaders] === 'function')) {
        throw new Error('Perfil habilitado sin todos sus proveedores: ' + profile.id);
      }
      loaders.set(profile.id, Object.freeze({...entry.loaders}));
    } else if (entry.loaders !== undefined) throw new Error('Perfil pendiente con proveedores ejecutables: ' + profile.id);
    profiles.set(profile.id, profile);
    byTool.set(profile.toolKey, Object.freeze([...(byTool.get(profile.toolKey) ?? []), profile]));
    if (entry.defaultForTool) {
      if (explicitDefaults.has(profile.toolKey)) throw new Error('Más de un perfil predeterminado: ' + profile.toolKey);
      explicitDefaults.add(profile.toolKey);
      defaults.set(profile.toolKey, profile);
    }
  }
  for (const [toolKey, variants] of byTool) {
    if (!defaults.has(toolKey)) {
      if (variants.length !== 1) throw new Error('Falta un perfil predeterminado: ' + toolKey);
      defaults.set(toolKey, variants[0]);
    }
  }
  const all = Object.freeze(Array.from(profiles.values()));
  const empty: readonly PracticeProfile[] = Object.freeze([]);
  return Object.freeze({
    list: () => all,
    get: (id: string) => profiles.get(id),
    forTool: (toolKey: string) => byTool.get(toolKey) ?? empty,
    defaultForTool: (toolKey: string) => defaults.get(toolKey),
    loadProviders(id: string) {
      const profile = profiles.get(id);
      if (!profile) return Promise.reject(new Error('Perfil de práctica desconocido: ' + id));
      if (profile.availability !== 'enabled') return Promise.reject(new Error('Perfil de práctica pendiente: ' + id));
      const cached = providers.get(id);
      if (cached) return cached;
      const loader = loaders.get(id)!;
      // Se cargan fábricas, no instancias: init y la memoria del motor pertenecen al gestor de sesión.
      const pending = Promise.resolve().then(async () => {
        const [createRuntime, createCompletion, createDataset] = await Promise.all([loader.runtime(), loader.completion(), loader.dataset()]);
        if (![createRuntime, createCompletion, createDataset].every((factory) => typeof factory === 'function')) {
          throw new Error('Proveedor de práctica inválido: ' + id);
        }
        return Object.freeze({createRuntime, createCompletion, createDataset});
      }).catch((error: unknown) => {
        if (providers.get(id) === pending) providers.delete(id);
        throw error;
      });
      providers.set(id, pending);
      return pending;
    },
  });
}
