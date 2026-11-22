import path from 'node:path';
import type {ParseFrontMatter} from '@docusaurus/types';
import {docsBasePath, getConceptByDocId, getConceptsForTopic} from '../content/concepts.ts';

// Docusaurus obtiene la metadata desde la misma fuente que fichas y búsqueda.
export const parseConceptFrontMatter: ParseFrontMatter = async ({filePath, fileContent, defaultParseFrontMatter}) => {
  const parsed = await defaultParseFrontMatter({filePath, fileContent});
  const relative = path.relative(path.resolve('docs'), path.resolve(filePath)).split(path.sep).join('/');
  if (relative.startsWith('../') || !/\.mdx?$/.test(relative)) return parsed;
  const concept = getConceptByDocId(relative.replace(/\.mdx?$/, ''));
  if (!concept) return parsed;
  const siblings = getConceptsForTopic(concept.areaId, concept.topicId);
  const position = siblings.findIndex(({id}) => id === concept.id);
  return {...parsed, frontMatter: {
    ...parsed.frontMatter,
    title: concept.title,
    sidebar_label: concept.title,
    sidebar_position: concept.order,
    description: concept.seoDescription ?? concept.description,
    slug: concept.slug.slice(docsBasePath.length),
    pagination_prev: parsed.frontMatter.pagination_prev !== undefined ? parsed.frontMatter.pagination_prev : (position > 0 ? siblings[position - 1].docId??siblings[position - 1].id : null),
    pagination_next: parsed.frontMatter.pagination_next !== undefined ? parsed.frontMatter.pagination_next : (siblings[position + 1]?.docId??siblings[position + 1]?.id??null),
  }};
};
