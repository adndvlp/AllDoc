// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/null-y-condicionales/definicion",
    "remember": "WHERE conserva solo condiciones TRUE.",
    "examples": [
      {
        "id": "snowflake/null-y-condicionales/definicion/1",
        "title": "Localizar países ausentes",
        "language": "sql",
        "code": "SELECT CUSTOMER_ID FROM CUSTOMERS WHERE COUNTRY IS NULL;",
        "hint": "",
        "textOutput": "6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/null-y-condicionales/is-not-null-e-igualdad-segura",
    "remember": "NULL = NULL no devuelve TRUE.",
    "examples": [
      {
        "id": "snowflake/null-y-condicionales/is-not-null-e-igualdad-segura/1",
        "title": "Comparar dos ausentes",
        "language": "sql",
        "code": "SELECT NULL = NULL AS NORMAL, NULL IS NOT DISTINCT FROM NULL AS SEGURA;",
        "hint": "",
        "textOutput": "NORMAL=NULL, SEGURA=TRUE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/null-y-condicionales/coalesce-nvl-y-nullif",
    "remember": "NULLIF(denominador,0) evita dividir por cero.",
    "examples": [
      {
        "id": "snowflake/null-y-condicionales/coalesce-nvl-y-nullif/1",
        "title": "Sustituir ausentes y proteger división",
        "language": "sql",
        "code": "SELECT COALESCE(NULL,'Unknown'), NVL(NULL,0), 10/NULLIF(0,0);",
        "hint": "",
        "textOutput": "Unknown, 0, NULL.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/null-y-condicionales/case-e-iff",
    "remember": "CASE evalúa condiciones en orden y devuelve la primera coincidente.",
    "examples": [
      {
        "id": "snowflake/null-y-condicionales/case-e-iff/1",
        "title": "Clasificar pedidos",
        "language": "sql",
        "code": "SELECT ORDER_ID, CASE WHEN AMOUNT>=300 THEN 'High' WHEN AMOUNT>=100 THEN 'Medium' ELSE 'Low' END AS SEGMENT, IFF(STATUS='completed',1,0) AS VALID FROM ORDERS WHERE ORDER_ID IN (103,108) ORDER BY ORDER_ID;",
        "hint": "",
        "textOutput": "103:High,1; 108:Low,0.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
