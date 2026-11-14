import {concepts, docsBasePath, type ConceptMeta} from '../content/concepts.ts';
import type {PracticeContext, PracticeProfile, PracticeRegistry} from './contracts.ts';
import {datasetReference, identifier} from './guards.ts';
import {practiceRegistry} from './profiles.ts';

export function workspaceKey(profile: PracticeProfile): string {
  if (!identifier(profile.id) || !identifier(profile.toolKey) || !datasetReference(profile.defaultDataset)) throw new Error('Perfil de workspace inválido');
  // Tupla sin ambigüedad por separadores; un cambio de concepto no cambia esta identidad.
  return JSON.stringify([profile.toolKey, profile.id, profile.defaultDataset.id, profile.defaultDataset.version]);
}

export function createPracticeContextResolver({registry, entries = concepts}: {registry: PracticeRegistry; entries?: readonly ConceptMeta[]}) {
  const byPath = new Map<string, Readonly<ConceptMeta>>();
  const ids = new Set<string>();
  for (const entry of entries) {
    if (ids.has(entry.id) || byPath.has(entry.slug)) throw new Error('Concepto o ruta duplicados en el contexto de práctica');
    if (!entry.id.startsWith(entry.areaId + '/' + entry.topicId + '/') || entry.slug !== docsBasePath + '/' + entry.id) {
      throw new Error('Metadata de concepto incoherente: ' + entry.id);
    }
    ids.add(entry.id);
    byPath.set(entry.slug, Object.freeze({...entry}));
  }
  return (pathname: string): PracticeContext | null => {
    if (!pathname.startsWith('/') || pathname.startsWith('//')) return null;
    const path = pathname.split(/[?#]/, 1)[0].replace(/\/$/, '');
    const entry = byPath.get(path);
    if (!entry) return null;
    const toolKey = entry.areaId + '/' + entry.topicId;
    const profile = registry.defaultForTool(toolKey);
    if (!profile || profile.availability !== 'enabled') return null;
    return Object.freeze({conceptId: entry.id, conceptSlug: entry.slug, toolKey, profile, workspaceKey: workspaceKey(profile)});
  };
}

export const resolvePracticeContext = createPracticeContextResolver({registry: practiceRegistry});
