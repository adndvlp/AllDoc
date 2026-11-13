import {concepts, type Concept, type ConceptId, type ConceptMeta} from './concepts.ts';
import {selectAllProductsQuery} from './sql-preview.ts';

const sqlMetadata = concepts.filter((concept): concept is Extract<Concept, {areaId: 'analisis-de-datos'; topicId: 'sql'}> =>
  concept.areaId === 'analisis-de-datos' && concept.topicId === 'sql');
export const sqlBasePath = sqlMetadata[0].slug.slice(0, sqlMetadata[0].slug.lastIndexOf('/'));

export type SqlExample = {
  title: string;
  code: string;
  hint: string;
  output: {columns: string[]; rows: string[][]};
};

export type SqlConcept = Omit<ConceptMeta, 'id'> & {
  id: string;
  conceptId: string;
  number: string;
  examples: [SqlExample, ...SqlExample[]];
  remember: string;
  note?: string;
};

export const sqlTable = {
  name: 'productos',
  columns: ['nombre', 'categoria', 'precio'],
  rows: [
    ['Teclado', 'Accesorios', '500'],
    ['Mouse', 'Accesorios', '250'],
    ['Monitor', 'Pantallas', '3500'],
  ],
};

type SqlBody = Pick<SqlConcept, 'examples' | 'remember' | 'note'>;
type SqlConceptId = Extract<ConceptId, `analisis-de-datos/sql/${string}`>;

// Solo cuerpos. Los títulos, descripciones, rutas y orden vienen de concepts.ts.
const bodies = {
  'analisis-de-datos/sql/select': {
    examples: [
      {
        title: 'Todas las columnas',
        code: selectAllProductsQuery,
        hint: 'El asterisco (*) pide todas.',
        output: {
          columns: ['nombre', 'categoria', 'precio'],
          rows: [
            ['Teclado', 'Accesorios', '500'],
            ['Mouse', 'Accesorios', '250'],
            ['Monitor', 'Pantallas', '3500'],
          ],
        },
      },
      {
        title: 'Columnas concretas',
        code: 'SELECT nombre, precio FROM productos;',
        hint: 'Escribe sus nombres separados por comas.',
        output: {
          columns: ['nombre', 'precio'],
          rows: [['Teclado', '500'], ['Mouse', '250'], ['Monitor', '3500']],
        },
      },
    ],
    remember: 'SELECT elige las columnas. FROM indica la tabla.',
  },
  'analisis-de-datos/sql/where': {
    examples: [{
      title: 'Cumplir una condición',
      code: 'SELECT nombre FROM productos\nWHERE precio >= 1000;',
      hint: 'Solo productos con un precio de 1000 o más.',
      output: {columns: ['nombre'], rows: [['Monitor']]},
    }],
    remember: 'WHERE filtra filas.',
  },
  'analisis-de-datos/sql/order-by': {
    examples: [{
      title: 'Del más barato al más caro',
      code: 'SELECT nombre, precio FROM productos\nORDER BY precio ASC;',
      hint: 'Ordena los productos por precio.',
      output: {
        columns: ['nombre', 'precio'],
        rows: [['Mouse', '250'], ['Teclado', '500'], ['Monitor', '3500']],
      },
    }],
    remember: 'ASC: de menor a mayor. DESC: de mayor a menor.',
  },
  'analisis-de-datos/sql/limit': {
    examples: [
      {
        title: 'Hasta 5 filas completas',
        code: 'SELECT * FROM productos LIMIT 5;',
        hint: 'Todas las columnas de un máximo de 5 productos.',
        output: {
          columns: ['nombre', 'categoria', 'precio'],
          rows: [
            ['Teclado', 'Accesorios', '500'],
            ['Mouse', 'Accesorios', '250'],
            ['Monitor', 'Pantallas', '3500'],
          ],
        },
      },
      {
        title: 'Hasta 3 nombres',
        code: 'SELECT nombre FROM productos LIMIT 3;',
        hint: 'Solo la columna nombre, con un máximo de 3 productos.',
        output: {
          columns: ['nombre'],
          rows: [['Teclado'], ['Mouse'], ['Monitor']],
        },
      },
    ],
    remember: 'LIMIT fija un máximo de filas. Si la tabla tiene menos, verás menos.',
    note: 'Esta forma de LIMIT funciona en PostgreSQL, MySQL y SQLite.',
  },
  'analisis-de-datos/sql/comentarios': {
    examples: [
      {
        title: 'Una línea o al final',
        code: '-- Consultar productos\nSELECT * FROM productos; -- Nota',
        hint: '-- comenta desde los guiones hasta el final de esa línea.',
        output: {columns: sqlTable.columns, rows: sqlTable.rows},
      },
      {
        title: 'Varias líneas',
        code: '/* Esta consulta obtiene\n   todos los productos */\nSELECT * FROM productos;',
        hint: 'Encierra el comentario entre /* y */.',
        output: {columns: sqlTable.columns, rows: sqlTable.rows},
      },
    ],
    remember: 'SQL ignora los comentarios al ejecutar la consulta.',
  },
} satisfies Record<SqlConceptId, SqlBody>;

// Adaptador para las páginas MDX actuales, que todavía reciben el ID corto.
export const sqlConcepts: SqlConcept[] = sqlMetadata.map((metadata) => ({
  ...metadata,
  ...bodies[metadata.id],
  conceptId: metadata.id,
  id: metadata.id.split('/').at(-1)!,
  number: String(metadata.order).padStart(2, '0'),
}));

export function getSqlConcept(id: string): SqlConcept | undefined {
  return sqlConcepts.find((concept) => concept.id === id || concept.conceptId === id);
}
