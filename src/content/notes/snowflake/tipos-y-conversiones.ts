// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/tipos-y-conversiones/definicion",
    "remember": "NUMBER con escala fija sirve para importes; FLOAT es aproximado.",
    "examples": [
      {
        "id": "snowflake/tipos-y-conversiones/definicion/1",
        "title": "Declarar un importe",
        "language": "sql",
        "code": "SELECT 12.34::NUMBER(10,2) AS PRICE, TYPEOF(TO_VARIANT(12.34)) AS T;",
        "hint": "",
        "textOutput": "PRICE=12.34, T=DECIMAL.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/tipos-y-conversiones/number-float-varchar-boolean",
    "remember": "No almacenes cantidades como texto si vas a calcular.",
    "examples": [
      {
        "id": "snowflake/tipos-y-conversiones/number-float-varchar-boolean/1",
        "title": "Convertir cuatro valores",
        "language": "sql",
        "code": "SELECT CAST('12.50' AS NUMBER(8,2)), CAST('1.5' AS FLOAT), CAST(7 AS VARCHAR), CAST('true' AS BOOLEAN);",
        "hint": "",
        "textOutput": "12.50, 1.5, texto 7, TRUE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/tipos-y-conversiones/cast-y-try-cast",
    "remember": "TRY_CAST admite expresiones de origen string; no silencia cualquier error SQL.",
    "examples": [
      {
        "id": "snowflake/tipos-y-conversiones/cast-y-try-cast/1",
        "title": "Limpiar un importe inválido",
        "language": "sql",
        "code": "SELECT '42'::NUMBER AS OK, TRY_CAST('oops' AS NUMBER) AS BAD, TRY_TO_NUMBER('15.5',10,1) AS N;",
        "hint": "",
        "textOutput": "42, NULL, 15.5.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/tipos-y-conversiones/date-y-timestamp",
    "remember": "TZ conserva el offset, no el nombre de la zona con sus reglas futuras.",
    "examples": [
      {
        "id": "snowflake/tipos-y-conversiones/date-y-timestamp/1",
        "title": "Convertir una marca temporal",
        "language": "sql",
        "code": "SELECT TO_DATE('2026-02-03','YYYY-MM-DD'), TO_TIMESTAMP_NTZ('2026-02-03 10:30:00');",
        "hint": "",
        "textOutput": "2026-02-03 y 2026-02-03 10:30:00 sin zona.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
