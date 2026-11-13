import {catalog, type CatalogArea} from './catalog.ts';
import {searchKeywords} from './search-keywords.ts';
import type {SearchEntry} from '../lib/search';

export function buildSearchIndex(areas: readonly CatalogArea[], keywords: Readonly<Record<string, readonly string[]>>): SearchEntry[] {
  return areas.flatMap((area) => area.items.flatMap((item) => item.kind === 'group' ? [...item.items] : [item])
    .flatMap((topic) => topic.concepts.map((concept) => ({
      id: concept.id,
      title: concept.title,
      description: concept.description,
      context: area.title + ' / ' + topic.label,
      href: concept.slug,
      keywords: [...(keywords[concept.id] ?? [])],
    }))));
}

export const entries = buildSearchIndex(catalog, searchKeywords);
