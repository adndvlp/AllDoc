export const sqlBasePath = '/apuntes/analisis-de-datos/sql';

export type SqlExample = {
  title: string;
  code: string;
  hint: string;
  output: {columns: string[]; rows: string[][]};
};

export type SqlConcept = {
  id: string;
  number: string;
  title: string;
  label: string;
  description: string;
  examples: [SqlExample, ...SqlExample[]];
  remember: string;
  keywords: string[];
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

// Cada ficha se escribe una sola vez: las páginas y el buscador la reutilizan.
export const sqlConcepts: SqlConcept[] = [
  {
    id: 'select',
    number: '01',
    title: 'SELECT',
    label: 'Consultar una tabla',
    description: 'Consulta una tabla y elige qué columnas ver.',
    examples: [
      {
        title: 'Todas las columnas',
        code: 'SELECT * FROM productos;',
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
    keywords: ['elegir', 'seleccionar', 'columnas', 'mostrar', 'consultar', 'tabla', 'from', 'origen', 'asterisco', 'todas', 'varias', 'coma', 'especificas', 'productos', 'nombre', 'precio', 'negocio'],
  },
  {
    id: 'where',
    number: '02',
    title: 'WHERE',
    label: 'Quedarte con lo que buscas',
    description: 'Filtra los datos para ver solo los que cumplen una condición.',
    examples: [{
      title: 'Cumplir una condición',
      code: 'SELECT nombre FROM productos\nWHERE precio >= 1000;',
      hint: 'Solo productos con un precio de 1000 o más.',
      output: {columns: ['nombre'], rows: [['Monitor']]},
    }],
    remember: 'WHERE filtra filas.',
    keywords: ['filtrar', 'filtro', 'condicion', 'condición', 'mayor', 'igual', 'filas', 'precio', 'productos'],
  },
  {
    id: 'order-by',
    number: '03',
    title: 'ORDER BY',
    label: 'Poner en orden',
    description: 'Ordena el resultado por una columna.',
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
    keywords: ['ordenar', 'orden', 'ascendente', 'descendente', 'asc', 'desc', 'precio', 'barato', 'caro'],
  },
  {
    id: 'limit',
    number: '04',
    title: 'LIMIT',
    label: 'Ver solo unos cuantos',
    description: 'Limita cuántas filas aparecen en el resultado.',
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
    keywords: ['limitar', 'maximo', 'máximo', 'cantidad', 'primeros', 'cinco', 'tres', '5', '3', 'filas', 'productos'],
    note: 'Esta forma de LIMIT funciona en PostgreSQL, MySQL y SQLite.',
  },
  {
    id: 'comentarios',
    number: '05',
    title: 'Comentarios',
    label: 'Dejar notas en una consulta',
    description: 'Escribe notas para recordar qué hace tu consulta.',
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
    keywords: ['comentario', 'comentarios', 'notas', 'anotar', 'documentar', 'guiones', 'bloque', 'linea', 'línea', '--', '/*', '*/'],
  },
];
