import path from 'node:path';
import type {ParseFrontMatter} from '@docusaurus/types';
import {docsBasePath, getConceptByDocId, getConceptsForTopic} from '../content/concepts.ts';
import {resolveSqlDocument,sqlDocIdForLocation} from '../content/sql/placements.ts';

// Docusaurus obtiene la metadata desde la misma fuente que fichas y búsqueda.
export const parseConceptFrontMatter: ParseFrontMatter = async ({filePath, fileContent, defaultParseFrontMatter}) => {
  const parsed = await defaultParseFrontMatter({filePath, fileContent});
  const relative = path.relative(path.resolve('docs'), path.resolve(filePath)).split(path.sep).join('/');
  if (relative.startsWith('../') || !/\.mdx?$/.test(relative)) return parsed;
  const docId=relative.replace(/\.mdx?$/, '');const placement=resolveSqlDocument(docId);
  const concept = getConceptByDocId(docId);
  if (!concept) return parsed;
  const siblings = getConceptsForTopic(concept.areaId, concept.topicId);
  const position = siblings.findIndex(({id}) => id === concept.id);
  const docFor=(c:typeof concept|undefined)=>c?(placement?sqlDocIdForLocation(c.id,placement.locationId):c.docId??c.id):null;
  return {...parsed, frontMatter: {
    ...parsed.frontMatter,
    title: concept.title,
    sidebar_label: placement?concept.label:concept.title,
    sidebar_position: concept.order,
    description: concept.seoDescription ?? concept.description,
    slug: (placement?.path??concept.slug).slice(docsBasePath.length),
    ...(placement?{displayed_sidebar:placement.locationId==='lenguajes'?'lenguajes':'analisisDeDatos',alldoc_canonical:concept.slug}:{}),
    pagination_prev: parsed.frontMatter.pagination_prev !== undefined ? parsed.frontMatter.pagination_prev : docFor(siblings[position-1]),
    pagination_next: parsed.frontMatter.pagination_next !== undefined ? parsed.frontMatter.pagination_next : docFor(siblings[position+1]),
  }};
};
