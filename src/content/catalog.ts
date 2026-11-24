import type {IconName} from '../components/Icon';
import type {AreaId} from './areas';
import {concepts, type ConceptMeta} from './concepts.ts';
import {getPublishedSqlCurriculum} from './sql/curriculum.ts';
import {pandasCurriculum} from './pandas-curriculum.ts';
import {jsonCurriculum} from './json-curriculum.ts';
import {numpyCurriculum} from './numpy-curriculum.ts';
import {scipyCurriculum} from './scipy-curriculum.ts';
import {matplotlibCurriculum} from './matplotlib-curriculum.ts';
import {seabornCurriculum} from './seaborn-curriculum.ts';
import {sqlalchemyCurriculum} from './sqlalchemy-curriculum.ts';
import {sqlite3Curriculum} from './sqlite3-curriculum.ts';
import {openpyxlCurriculum} from './openpyxl-curriculum.ts';

const courses = new Map([
  ['pandas', pandasCurriculum], ['openpyxl', openpyxlCurriculum], ['numpy', numpyCurriculum],
  ['scipy', scipyCurriculum], ['matplotlib', matplotlibCurriculum], ['seaborn', seabornCurriculum],
  ['sqlalchemy', sqlalchemyCurriculum], ['sqlite3', sqlite3Curriculum], ['json', jsonCurriculum],
]);

type TopicDefinition = {kind: 'topic'; id: string; label: string; sharedFrom?:AreaId};
type GroupDefinition = {kind: 'group'; id: string; label: string; items: readonly TopicDefinition[]};
export type AreaDefinition = {
  id: AreaId;
  sidebarId: string;
  number: string;
  title: string;
  description: string;
  icon: IconName;
  items: readonly (TopicDefinition | GroupDefinition)[];
};

export type CatalogSection={id:string;label:string;collapsed:true;concepts:readonly ConceptMeta[]};
export type CatalogTopic = TopicDefinition & {areaId: AreaId; concepts: readonly ConceptMeta[]; sections?:readonly CatalogSection[]};
export type CatalogGroup = Omit<GroupDefinition, 'items'> & {items: readonly CatalogTopic[]};
export type CatalogNode = CatalogTopic | CatalogGroup;
export type CatalogArea = Omit<AreaDefinition, 'items'> & {items: readonly CatalogNode[]};

const topic = (id: string, label: string): TopicDefinition => ({kind: 'topic', id, label});
const group = (id: string, label: string, items: TopicDefinition[]): GroupDefinition => ({kind: 'group', id, label, items});

// Orden y agrupación compartidos por el catálogo y el sidebar.
const definitions: readonly AreaDefinition[] = [
  {
    id: 'analisis-de-datos', sidebarId: 'analisisDeDatos', number: '01',
    title: 'Análisis de datos', description: 'Consultar, entender y trabajar con datos.', icon: 'data',
    items: [
      group('hojas-de-calculo', 'Hojas de cálculo', [topic('excel', 'Excel'), topic('spreadsheets', 'Spreadsheets')]),
      topic('power-query', 'Power Query'),
      topic('sql', 'SQL'),
      group('tablas-y-archivos', 'Tablas y archivos', [topic('pandas', 'Pandas'), topic('openpyxl', 'openpyxl')]),
      group('calculo-cientifico', 'Cálculo científico', [topic('numpy', 'NumPy'), topic('scipy', 'SciPy')]),
      group('visualizacion', 'Visualización', [topic('matplotlib', 'Matplotlib'), topic('seaborn', 'Seaborn')]),
      group('conexiones-sql', 'Conexiones SQL', [
        topic('sqlalchemy', 'SQLAlchemy'), topic('sqlite3', 'sqlite3'),
        topic('mysql-connector-python', 'mysql-connector-python'), topic('psycopg', 'psycopg'),
      ]),
      group('peticiones-y-formatos', 'Peticiones y formatos', [topic('requests', 'requests'), topic('httpx', 'httpx'), topic('json', 'json')]),
      topic('r', 'R'),
      topic('power-bi', 'Power BI'),
      topic('tableau', 'Tableau'),
      group('transformacion-de-datos', 'Transformación de datos', [topic('dbt', 'dbt'), topic('alteryx', 'Alteryx')]),
      topic('apache-spark', 'Apache Spark'),
      topic('apache-airflow', 'Apache Airflow'),
      group('plataformas-de-datos', 'Plataformas de datos', [topic('databricks', 'Databricks'), topic('snowflake', 'Snowflake')]),
    ],
  },
  {
    id: 'desarrollo-web', sidebarId: 'desarrolloWeb', number: '02',
    title: 'Desarrollo web', description: 'Las piezas con las que construyes para la web.', icon: 'web', items: [],
  },
  {
    id: 'ia', sidebarId: 'ia', number: '03',
    title: 'IA', description: 'Ideas y herramientas de inteligencia artificial.', icon: 'ai', items: [],
  },
  {
    id:'lenguajes',sidebarId:'lenguajes',number:'04',title:'Lenguajes',
    description:'Conceptos y sintaxis para recordar y practicar.',icon:'book',
    items:[{...topic('sql','SQL'),sharedFrom:'analisis-de-datos'}],
  },
];

export function buildCatalog(areas: readonly AreaDefinition[], entries: readonly ConceptMeta[]): CatalogArea[] {
  if (new Set(entries.map((entry) => entry.id)).size !== entries.length) throw new Error('IDs de concepto duplicados');
  if (new Set(areas.map((area) => area.id)).size !== areas.length) throw new Error('IDs de área duplicados');
  const assigned = new Set<string>();
  const sectionsByTopic=new Map<string,readonly CatalogSection[]>();
  const result = areas.map((area): CatalogArea => {
    const nodeIds = new Set<string>();
    const register = (id: string) => {
      if (nodeIds.has(id)) throw new Error('ID de catálogo duplicado: ' + area.id + '/' + id);
      nodeIds.add(id);
    };
    const attach = (definition: TopicDefinition): CatalogTopic => {
      register(definition.id);
      const sourceArea=definition.sharedFrom??area.id;
      const members = entries.filter((entry) => entry.areaId === sourceArea && entry.topicId === definition.id)
        .sort((a, b) => a.order - b.order);
      members.forEach((entry) => assigned.add(entry.id));
      let sections:readonly CatalogSection[]|undefined;
      if(sourceArea==='analisis-de-datos'&&definition.id==='sql'){
        const key=sourceArea+'/'+definition.id;
        sections=sectionsByTopic.get(key);
        if(!sections){const byId=new Map(members.map(c=>[c.id,c]));sections=getPublishedSqlCurriculum().map(g=>({id:g.key,label:g.label,collapsed:true as const,concepts:g.children.flatMap(c=>byId.has(c.id)?[byId.get(c.id)!]:[])})).filter(g=>g.concepts.length);sectionsByTopic.set(key,sections);}
      }
      const course = courses.get(definition.id);
      if (sourceArea === 'analisis-de-datos' && course) {
        sections = course.map(group => ({
          id: group.key, label: group.label, collapsed: true as const,
          concepts: members.filter(concept => concept.id.startsWith(`${sourceArea}/${definition.id}/${group.key}/`)
            || (group.key === 'series-y-dataframe' && concept.id === 'analisis-de-datos/pandas/dataframe')),
        })).filter(section => section.concepts.length > 0);
      }
      return {...definition, areaId: area.id, concepts: members,...(sections?.length?{sections}:{})};
    };
    return {...area, items: area.items.map((item) => {
      if (item.kind === 'topic') return attach(item);
      register(item.id);
      return {...item, items: item.items.map(attach)};
    })};
  });
  for (const entry of entries) {
    if (!assigned.has(entry.id)) throw new Error('Concepto sin área o herramienta en el catálogo: ' + entry.id);
  }
  return result;
}

export const catalog = buildCatalog(definitions, concepts);

export function countConcepts(nodes: readonly CatalogNode[]): number {
  return nodes.reduce((count, node) => count + (node.kind === 'group' ? countConcepts(node.items) : node.concepts.length), 0);
}

export function getTopics(areaId: AreaId): CatalogTopic[] {
  const area = catalog.find((item) => item.id === areaId);
  return area?.items.flatMap((item) => item.kind === 'group' ? [...item.items] : [item]) ?? [];
}
