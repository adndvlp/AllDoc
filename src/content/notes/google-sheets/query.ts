// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/query/definicion",
    "remember": "El rango sustituye FROM; el último argumento indica filas de encabezado.",
    "examples": [
      {
        "id": "google-sheets/query/definicion/1",
        "title": "Seleccionar IDs e importes",
        "language": "excel-formula",
        "code": "=QUERY(Ventas!A1:K9,\"select A,J\",1)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Encabezados id, importe; 8 filas con IDs 101–108 y sus importes.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/query/select-y-columnas",
    "remember": "En rango directo usa A, B, etc.; en arrays construidos normalmente Col1, Col2.",
    "examples": [
      {
        "id": "google-sheets/query/select-y-columnas/1",
        "title": "Elegir columnas de un array",
        "language": "excel-formula",
        "code": "=QUERY({Ventas!A2:A9,Ventas!J2:J9},\"select Col2,Col1 limit 2\",0)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Filas: 200,101; 300,102.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/query/where",
    "remember": "El texto de la consulta va entre comillas dobles y los literales de texto dentro entre simples.",
    "examples": [
      {
        "id": "google-sheets/query/where/1",
        "title": "Filtrar cancelados",
        "language": "excel-formula",
        "code": "=QUERY(Ventas!A1:K9,\"select A,J where H = 'cancelled' order by A\",1)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "id, importe: 104,100; 108,300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/query/fechas-en-query",
    "remember": "La columna fuente debe contener fechas reales.",
    "examples": [
      {
        "id": "google-sheets/query/fechas-en-query/1",
        "title": "Listar pedidos de septiembre",
        "language": "excel-formula",
        "code": "=QUERY(Ventas!A1:K9,\"select A where B >= date '2026-09-01' order by A\",1)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Encabezado id y filas 105,106,107,108.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/query/group-by-y-agregaciones",
    "remember": "Las columnas no agregadas deben agruparse.",
    "examples": [
      {
        "id": "google-sheets/query/group-by-y-agregaciones/1",
        "title": "Sumar por estado",
        "language": "excel-formula",
        "code": "=QUERY(Ventas!A1:K9,\"select H,sum(J) group by H order by H\",1)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "cancelled,400; completed,2000, además de encabezados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/query/order-by-limit-offset",
    "remember": "Para ranking estable añade criterios de desempate.",
    "examples": [
      {
        "id": "google-sheets/query/order-by-limit-offset/1",
        "title": "Mostrar segundo mayor pedido",
        "language": "excel-formula",
        "code": "=QUERY(Ventas!A1:K9,\"select A,J order by J desc,A limit 1 offset 1\",1)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "id, importe: 106,400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/query/pivot",
    "remember": "Necesita agregación; columnas dependen de categorías presentes.",
    "examples": [
      {
        "id": "google-sheets/query/pivot/1",
        "title": "Cruzar estado y canal",
        "language": "excel-formula",
        "code": "=QUERY(Ventas!A1:K9,\"select I,sum(J) group by I pivot H order by I\",1)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Filas store: 300 cancelado, 600 completado; web: 100 cancelado, 1400 completado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/query/label-y-format",
    "remember": "Escribe estas cláusulas después de las cláusulas de selección y agrupación.",
    "examples": [
      {
        "id": "google-sheets/query/label-y-format/1",
        "title": "Nombrar total",
        "language": "excel-formula",
        "code": "=QUERY(Ventas!A1:K9,\"select sum(J) label sum(J) 'Total' format sum(J) '#,##0.00'\",1)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Encabezado Total; valor 2400 mostrado como 2,400.00.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/query/patrones-y-nulos",
    "remember": "Las comparaciones de texto del lenguaje QUERY distinguen mayúsculas.",
    "examples": [
      {
        "id": "google-sheets/query/patrones-y-nulos/1",
        "title": "Encontrar clientes sin país",
        "language": "excel-formula",
        "code": "=QUERY(Clientes!A1:E6,\"select B where C is null\",1)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Encabezado nombre y fila Diego.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/query/parametros-dinamicos",
    "remember": "Mantén separados texto de consulta y valores.",
    "examples": [
      {
        "id": "google-sheets/query/parametros-dinamicos/1",
        "title": "Consultar umbral configurable",
        "language": "text",
        "code": "",
        "hint": "En Practica B1 escribe 400 y en A3 escribe =QUERY(Ventas!A1:K9,\"select A,J where J >= \"&B1&\" order by A\",1). Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "103,600; 106,400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/query/tipos-y-limites-de-query",
    "remember": "Prepara datos homogéneos; usa UNIQUE, búsquedas o FILTER como alternativas.",
    "examples": [
      {
        "id": "google-sheets/query/tipos-y-limites-de-query/1",
        "title": "Contar filas por estado",
        "language": "excel-formula",
        "code": "=QUERY(Ventas!A1:K9,\"select H,count(A) group by H order by H\",1)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "cancelled,2; completed,6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
