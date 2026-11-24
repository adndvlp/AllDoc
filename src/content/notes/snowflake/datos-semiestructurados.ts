// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/datos-semiestructurados/definicion",
    "remember": "Extraer una propiedad devuelve VARIANT; convierte a tipo escalar para calcular.",
    "examples": [
      {
        "id": "snowflake/datos-semiestructurados/definicion/1",
        "title": "Consultar un atributo JSON",
        "language": "sql",
        "code": "SELECT EVENT_ID,PAYLOAD:event::VARCHAR AS EVENT FROM EVENTS ORDER BY EVENT_ID;",
        "hint": "",
        "textOutput": "1:purchase,2:visit.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/datos-semiestructurados/parse-json-object-y-array",
    "remember": "JSON mal formado da error; TRY_PARSE_JSON devuelve NULL cuando falla.",
    "examples": [
      {
        "id": "snowflake/datos-semiestructurados/parse-json-object-y-array/1",
        "title": "Construir una estructura",
        "language": "sql",
        "code": "SELECT OBJECT_CONSTRUCT('id',1,'items',ARRAY_CONSTRUCT('A','B')) AS DATA;",
        "hint": "",
        "textOutput": "Objeto con id=1 e items=[\"A\",\"B\"]; orden de claves no garantizado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/datos-semiestructurados/rutas-y-tipos",
    "remember": "Los índices de ARRAY comienzan en cero.",
    "examples": [
      {
        "id": "snowflake/datos-semiestructurados/rutas-y-tipos/1",
        "title": "Extraer primer producto",
        "language": "sql",
        "code": "SELECT PAYLOAD:items[0]:sku::VARCHAR AS SKU,PAYLOAD:items[0]:qty::NUMBER AS QTY FROM EVENTS WHERE EVENT_ID=1;",
        "hint": "",
        "textOutput": "A,2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/datos-semiestructurados/null-sql-y-null-json",
    "remember": "Una propiedad inexistente y una propiedad JSON null no son idénticas.",
    "examples": [
      {
        "id": "snowflake/datos-semiestructurados/null-sql-y-null-json/1",
        "title": "Comparar dos rutas",
        "language": "sql",
        "code": "SELECT IS_NULL_VALUE(PARSE_JSON('{\"a\":null}'):a) AS JSON_NULL, PARSE_JSON('{}'):a IS NULL AS MISSING;",
        "hint": "",
        "textOutput": "TRUE, TRUE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/datos-semiestructurados/lateral-y-flatten",
    "remember": "OUTER=>TRUE conserva una fila para expansiones vacías.",
    "examples": [
      {
        "id": "snowflake/datos-semiestructurados/lateral-y-flatten/1",
        "title": "Expandir productos de eventos",
        "language": "sql",
        "code": "SELECT e.EVENT_ID,f.VALUE:sku::VARCHAR AS SKU,f.VALUE:qty::NUMBER AS QTY FROM EVENTS e,LATERAL FLATTEN(INPUT=>e.PAYLOAD:items) f ORDER BY e.EVENT_ID,f.INDEX;",
        "hint": "",
        "textOutput": "1:A,2 y 1:B,1; el evento 2 no produce filas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
