import type {AreaId} from './areas';
import {publishedSqlMetadata} from './sql/published.ts';
import {resolveSqlDocument} from './sql/placements.ts';
import {pandasCurriculum} from './pandas-curriculum.ts';
import {jsonCurriculum} from './json-curriculum.ts';
import {numpyCurriculum} from './numpy-curriculum.ts';
import {scipyCurriculum} from './scipy-curriculum.ts';
import {matplotlibCurriculum} from './matplotlib-curriculum.ts';
import {seabornCurriculum} from './seaborn-curriculum.ts';
import {excelCurriculum} from './excel-curriculum.ts';
import {googleSheetsCurriculum} from './google-sheets-curriculum.ts';
import {rCurriculum} from './r-curriculum.ts';
import {sqlalchemyCurriculum} from './sqlalchemy-curriculum.ts';
import {sqlite3Curriculum} from './sqlite3-curriculum.ts';
import {openpyxlCurriculum} from './openpyxl-curriculum.ts';

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
  practiceProfileId?: string;
};

function defineConcept<const T extends Omit<ConceptMeta, 'slug'>>(definition: T) {
  return {...definition, slug: `${docsBasePath}/${definition.id}`};
}

// Metadata de navegación. Los cuerpos y las palabras clave viven en módulos separados.
const pandasDataframe = {
  id: 'analisis-de-datos/pandas/dataframe',
  title: 'DataFrame', label: 'Crear una tabla de productos',
  description: 'Un DataFrame es una tabla: columnas para cada dato y filas para cada producto.',
};
const pandasMetadata = pandasCurriculum.flatMap((group, index) => {
  const children = group.children.map(({id, label, description}) => ({
    id, label, description, title: label === 'Definición' ? group.label : label,
    practiceProfileId: 'python-pandas-comercio',
  }));
  return index === 0 ? [...children, pandasDataframe] : children;
}).map((concept, index) => defineConcept({
  ...concept, areaId: 'analisis-de-datos', topicId: 'pandas', order: index + 1,
}));

function courseMetadata<TopicId extends string>(topicId: TopicId, curriculum: typeof jsonCurriculum) {
  return curriculum.flatMap(group => group.children.map(concept => ({
    ...concept, title: concept.label === 'Definición' ? group.label : concept.label,
  }))).map((concept, index) => defineConcept({
    ...concept, areaId: 'analisis-de-datos' as const, topicId, order: index + 1,
  }));
}

export const concepts = [...publishedSqlMetadata, ...pandasMetadata, ...courseMetadata('excel', excelCurriculum),
  ...courseMetadata('google-sheets', googleSheetsCurriculum),
  ...courseMetadata('r', rCurriculum),
  ...courseMetadata('openpyxl', openpyxlCurriculum),
  ...courseMetadata('numpy', numpyCurriculum), ...courseMetadata('scipy', scipyCurriculum),
  ...courseMetadata('matplotlib', matplotlibCurriculum), ...courseMetadata('seaborn', seabornCurriculum),
  ...courseMetadata('sqlalchemy', sqlalchemyCurriculum), ...courseMetadata('sqlite3', sqlite3Curriculum),
  ...courseMetadata('json', jsonCurriculum),
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
