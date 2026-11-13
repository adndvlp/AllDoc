import path from 'node:path';
import type {ParseFrontMatter} from '@docusaurus/types';
import {docsBasePath, getConcept} from '../content/concepts.ts';

// Docusaurus obtiene la metadata desde la misma fuente que fichas y búsqueda.
export const parseConceptFrontMatter: ParseFrontMatter = async ({filePath, fileContent, defaultParseFrontMatter}) => {
  const parsed = await defaultParseFrontMatter({filePath, fileContent});
  const relative = path.relative(path.resolve('docs'), path.resolve(filePath)).split(path.sep).join('/');
  if (relative.startsWith('../') || !/\.mdx?$/.test(relative)) return parsed;
  const concept = getConcept(relative.replace(/\.mdx?$/, ''));
  if (!concept) return parsed;
  return {...parsed, frontMatter: {
    ...parsed.frontMatter,
    title: concept.title,
    sidebar_label: concept.title,
    sidebar_position: concept.order,
    description: concept.seoDescription ?? concept.description,
    slug: concept.slug.slice(docsBasePath.length),
  }};
};
