import type {IconName} from '../components/Icon';
import type {AreaId} from './areas';
import {concepts, type ConceptMeta} from './concepts.ts';

type TopicDefinition = {kind: 'topic'; id: string; label: string};
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

export type CatalogTopic = TopicDefinition & {areaId: AreaId; concepts: readonly ConceptMeta[]};
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
      topic('excel', 'Excel'),
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
];

export function buildCatalog(areas: readonly AreaDefinition[], entries: readonly ConceptMeta[]): CatalogArea[] {
  if (new Set(entries.map((entry) => entry.id)).size !== entries.length) throw new Error('IDs de concepto duplicados');
  if (new Set(areas.map((area) => area.id)).size !== areas.length) throw new Error('IDs de área duplicados');
  const assigned = new Set<string>();
  const result = areas.map((area): CatalogArea => {
    const nodeIds = new Set<string>();
    const register = (id: string) => {
      if (nodeIds.has(id)) throw new Error('ID de catálogo duplicado: ' + area.id + '/' + id);
      nodeIds.add(id);
    };
    const attach = (definition: TopicDefinition): CatalogTopic => {
      register(definition.id);
      const members = entries.filter((entry) => entry.areaId === area.id && entry.topicId === definition.id)
        .sort((a, b) => a.order - b.order);
      members.forEach((entry) => assigned.add(entry.id));
      return {...definition, areaId: area.id, concepts: members};
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

export function getTopics(areaId: AreaId): CatalogTopic[] {
  const area = catalog.find((item) => item.id === areaId);
  return area?.items.flatMap((item) => item.kind === 'group' ? [...item.items] : [item]) ?? [];
}
