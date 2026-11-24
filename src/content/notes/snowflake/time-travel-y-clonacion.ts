// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/time-travel-y-clonacion/definicion",
    "remember": "No es un historial ilimitado; comprueba tipo de tabla y edición.",
    "examples": [
      {
        "id": "snowflake/time-travel-y-clonacion/definicion/1",
        "title": "Consultar retención",
        "language": "sql",
        "code": "SHOW PARAMETERS LIKE 'DATA_RETENTION_TIME_IN_DAYS' IN TABLE ORDERS;",
        "hint": "",
        "textOutput": "Valor de retención efectivo para ORDERS.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/time-travel-y-clonacion/at-y-before",
    "remember": "El identificador de consulta y la retención deben ser válidos.",
    "examples": [
      {
        "id": "snowflake/time-travel-y-clonacion/at-y-before/1",
        "title": "Ver el importe antes de una actualización",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_HISTORY CLONE ORDERS;\nUPDATE DEMO_HISTORY SET AMOUNT=999 WHERE ORDER_ID=101;\nSET QID=LAST_QUERY_ID();\nSELECT AMOUNT FROM DEMO_HISTORY BEFORE(STATEMENT=>$QID) WHERE ORDER_ID=101;",
        "hint": "",
        "textOutput": "100, siempre que Time Travel esté habilitado y el estado anterior siga retenido.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/time-travel-y-clonacion/undrop",
    "remember": "Evita conflictos de nombre y recupera antes de vencer la retención.",
    "note": "Necesita retención mayor a cero.",
    "examples": [
      {
        "id": "snowflake/time-travel-y-clonacion/undrop/1",
        "title": "Restaurar una tabla de prueba",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_UNDROP AS SELECT ORDER_ID FROM ORDERS;\nDROP TABLE DEMO_UNDROP;\nUNDROP TABLE DEMO_UNDROP;\nSELECT COUNT(*) FROM DEMO_UNDROP;",
        "hint": "",
        "textOutput": "8 filas recuperadas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/time-travel-y-clonacion/zero-copy-cloning",
    "remember": "No significa costo cero para siempre ni que todos los objetos se clonen igual.",
    "examples": [
      {
        "id": "snowflake/time-travel-y-clonacion/zero-copy-cloning/1",
        "title": "Probar una modificación sin tocar origen",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_CLONE CLONE ORDERS;\nUPDATE DEMO_CLONE SET AMOUNT=999 WHERE ORDER_ID=101;\nSELECT (SELECT AMOUNT FROM ORDERS WHERE ORDER_ID=101) AS ORIGINAL,(SELECT AMOUNT FROM DEMO_CLONE WHERE ORDER_ID=101) AS COPY;",
        "hint": "",
        "textOutput": "ORIGINAL=100, COPY=999.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/time-travel-y-clonacion/fail-safe",
    "remember": "No se consulta mediante SQL ni reemplaza una estrategia de respaldo; temporales y transient no tienen Fail-safe.",
    "examples": [
      {
        "id": "snowflake/time-travel-y-clonacion/fail-safe/1",
        "title": "Responder a pérdida fuera de retención",
        "code": "",
        "steps": [
          "Comprueba si el objeto sigue en Time Travel.",
          "Si ya venció y es elegible, solicita evaluación a soporte de Snowflake.",
          "Registra alcance y verifica lo que se pueda recuperar."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Evaluación de recuperación, no garantía de restauración.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
