import type {AreaId} from './areas';

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
};

function defineConcept<const T extends Omit<ConceptMeta, 'slug'>>(definition: T) {
  return {...definition, slug: `${docsBasePath}/${definition.id}`};
}

// Metadata de navegación. Los cuerpos y las palabras clave viven en módulos separados.
export const concepts = [
  defineConcept({
    id: 'analisis-de-datos/sql/select',
    areaId: 'analisis-de-datos', topicId: 'sql', order: 1,
    title: 'SELECT', label: 'Consultar una tabla',
    description: 'Consulta una tabla y elige qué columnas ver.',
    seoDescription: 'Consulta todas las columnas o elige varias con SELECT y FROM.',
  }),
  defineConcept({
    id: 'analisis-de-datos/sql/where',
    areaId: 'analisis-de-datos', topicId: 'sql', order: 2,
    title: 'WHERE', label: 'Quedarte con lo que buscas',
    description: 'Filtra los datos para ver solo los que cumplen una condición.',
  }),
  defineConcept({
    id: 'analisis-de-datos/sql/order-by',
    areaId: 'analisis-de-datos', topicId: 'sql', order: 3,
    title: 'ORDER BY', label: 'Poner en orden',
    description: 'Ordena el resultado por una columna.',
  }),
  defineConcept({
    id: 'analisis-de-datos/sql/limit',
    areaId: 'analisis-de-datos', topicId: 'sql', order: 4,
    title: 'LIMIT', label: 'Ver solo unos cuantos',
    description: 'Limita cuántas filas aparecen en el resultado.',
  }),
  defineConcept({
    id: 'analisis-de-datos/sql/comentarios',
    areaId: 'analisis-de-datos', topicId: 'sql', order: 5,
    title: 'Comentarios', label: 'Dejar notas en una consulta',
    description: 'Escribe notas para recordar qué hace tu consulta.',
    seoDescription: 'Deja notas con -- para una línea y con /* ... */ para varias.',
  }),
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

export function getConceptsForTopic(areaId: AreaId, topicId: string): ConceptMeta[] {
  return concepts.filter((concept) => concept.areaId === areaId && concept.topicId === topicId)
    .sort((a, b) => a.order - b.order);
}
