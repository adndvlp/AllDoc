import type {AreaId} from './areas';
import {publishedSqlMetadata} from './sql/published.ts';
import {resolveSqlDocument} from './sql/placements.ts';

export const docsBasePath = '/apuntes';

export type ConceptMeta = {
  id: string;
  areaId: AreaId;
  topicId: string;
  slug: string;
  title: string;
  label: string;
  description: string;
  order: number;
  seoDescription?: string;
  docId?: string;
  aliases?: readonly string[];
};

function defineConcept<const T extends Omit<ConceptMeta, 'slug'>>(definition: T) {
  return {...definition, slug: `${docsBasePath}/${definition.id}`};
}

// Metadata de navegación. Los cuerpos y las palabras clave viven en módulos separados.
export const concepts = [
  ...publishedSqlMetadata,
  defineConcept({
    id: 'analisis-de-datos/pandas/dataframe',
    areaId: 'analisis-de-datos', topicId: 'pandas', order: 1,
    title: 'DataFrame', label: 'Crear una tabla',
    description: 'Un DataFrame es una tabla: columnas para cada dato y filas para cada producto.',
  }),
] as const satisfies readonly ConceptMeta[];

export type Concept = (typeof concepts)[number];
export type ConceptId = Concept['id'];

const byId = new Map<string, ConceptMeta>(concepts.map((concept) => [concept.id, concept]));

export function getConcept(id: string): ConceptMeta | undefined {
  return byId.get(id);
}
export function getConceptByDocId(docId:string):ConceptMeta|undefined {
  const placement=resolveSqlDocument(docId);if(placement)return byId.get(placement.conceptId);
  return concepts.find(c=>(('docId' in c&&c.docId)||c.id)===docId);
}

export function getConceptsForTopic(areaId: AreaId, topicId: string): ConceptMeta[] {
  return concepts.filter((concept) => concept.areaId === areaId && concept.topicId === topicId)
    .sort((a, b) => a.order - b.order);
}
