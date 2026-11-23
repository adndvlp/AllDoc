import {catalog, type CatalogArea} from './catalog.ts';
import {searchKeywords} from './search-keywords.ts';
import type {SearchEntry} from '../lib/search';

export function buildSearchIndex(areas: readonly CatalogArea[], keywords: Readonly<Record<string, readonly string[]>>): SearchEntry[] {
  const seen=new Set<string>();
  return areas.flatMap((area) => area.items.flatMap((item) => item.kind === 'group' ? [...item.items] : [item])
    .flatMap((topic) => topic.concepts.filter(concept=>{if(seen.has(concept.id))return false;seen.add(concept.id);return true;}).map((concept) => ({
      id: concept.id,
      title: concept.title,
      description: concept.description,
      context: area.title + ' / ' + topic.label,
      href: concept.slug,
      keywords: [...(keywords[concept.id] ?? [])],
    }))));
}

export const entries = buildSearchIndex(catalog, searchKeywords);
