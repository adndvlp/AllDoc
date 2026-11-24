// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/definicion",
    "remember": "Separa fuentes crudas, datos limpios y modelos de consumo.",
    "examples": [
      {
        "id": "snowflake/elt-y-modelado-analitico/definicion/1",
        "title": "Diseñar tres capas",
        "code": "",
        "steps": [
          "RAW conserva archivos/registros recibidos.",
          "STAGING normaliza tipos y claves.",
          "MART publica métricas y dimensiones verificadas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El informe usa MART; la investigación de errores puede volver a RAW.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/hechos-dimensiones-y-granularidad",
    "remember": "Define qué representa una fila antes de elegir medidas y joins.",
    "examples": [
      {
        "id": "snowflake/elt-y-modelado-analitico/hechos-dimensiones-y-granularidad/1",
        "title": "Medir ventas con una dimensión",
        "language": "sql",
        "code": "SELECT c.COUNTRY,SUM(o.AMOUNT) AS SALES FROM ORDERS o JOIN CUSTOMERS c USING(CUSTOMER_ID) WHERE o.STATUS='completed' GROUP BY 1 ORDER BY 1;",
        "hint": "",
        "textOutput": "Mexico:600, Spain:300, USA:400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/star-schema-y-snowflake-schema",
    "remember": "El modelo snowflake no es lo mismo que la plataforma Snowflake.",
    "examples": [
      {
        "id": "snowflake/elt-y-modelado-analitico/star-schema-y-snowflake-schema/1",
        "title": "Diseñar dimensiones de productos",
        "code": "",
        "steps": [
          "Estrella: FACT_ORDER_ITEMS → DIM_PRODUCT con categoría incorporada.",
          "Snowflake schema: FACT_ORDER_ITEMS → DIM_PRODUCT → DIM_CATEGORY.",
          "Compara los joins necesarios para ventas por categoría."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Misma métrica con uno o dos joins de dimensiones, respectivamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/scd-tipo-1",
    "remember": "Úsala si no necesitas el valor histórico de la dimensión.",
    "examples": [
      {
        "id": "snowflake/elt-y-modelado-analitico/scd-tipo-1/1",
        "title": "Actualizar país de un cliente",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_DIM1 CLONE CUSTOMERS;\nUPDATE DEMO_DIM1 SET COUNTRY='Canada' WHERE CUSTOMER_ID=1;\nSELECT COUNTRY FROM DEMO_DIM1 WHERE CUSTOMER_ID=1;",
        "hint": "",
        "textOutput": "Canada; el país anterior no queda como fila de dimensión.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/scd-tipo-2",
    "remember": "Cierra la versión anterior y abre la nueva en una operación coherente; evita intervalos solapados.",
    "examples": [
      {
        "id": "snowflake/elt-y-modelado-analitico/scd-tipo-2/1",
        "title": "Registrar cambio de país",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_DIM2(ID NUMBER,COUNTRY VARCHAR,VALID_FROM DATE,VALID_TO DATE);\nINSERT INTO DEMO_DIM2 VALUES(1,'Mexico','2026-01-01',NULL);\nBEGIN;\nUPDATE DEMO_DIM2 SET VALID_TO='2026-03-01' WHERE ID=1 AND VALID_TO IS NULL;\nINSERT INTO DEMO_DIM2 VALUES(1,'Canada','2026-03-01',NULL);\nCOMMIT;\nSELECT COUNTRY,VALID_FROM,VALID_TO FROM DEMO_DIM2 ORDER BY VALID_FROM;",
        "hint": "",
        "textOutput": "Mexico desde enero hasta inicio de marzo; Canada desde marzo, sin fecha de cierre.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/incrementales-backfills-e-idempotencia",
    "remember": "Un mismo lote repetido debe producir el mismo estado final; usa claves y límites de periodo, no solo timestamps de llegada.",
    "examples": [
      {
        "id": "snowflake/elt-y-modelado-analitico/incrementales-backfills-e-idempotencia/1",
        "title": "Reprocesar febrero",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_MART LIKE ORDERS;\nBEGIN;\nDELETE FROM DEMO_MART WHERE ORDER_DATE>='2026-02-01' AND ORDER_DATE<'2026-03-01';\nINSERT INTO DEMO_MART SELECT * FROM ORDERS WHERE ORDER_DATE>='2026-02-01' AND ORDER_DATE<'2026-03-01';\nCOMMIT;\nSELECT COUNT(*) FROM DEMO_MART;",
        "hint": "",
        "textOutput": "4 filas de febrero. Repetir únicamente el bloque BEGIN–COMMIT mantiene 4, si la fuente no cambia.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/deduplicacion-y-validaciones",
    "remember": "No uses DISTINCT para ocultar una multiplicación de filas por JOIN.",
    "examples": [
      {
        "id": "snowflake/elt-y-modelado-analitico/deduplicacion-y-validaciones/1",
        "title": "Elegir un lead por correo",
        "language": "sql",
        "code": "SELECT LEAD_ID,EMAIL FROM LEADS WHERE EMAIL IS NOT NULL QUALIFY ROW_NUMBER() OVER(PARTITION BY EMAIL ORDER BY LEAD_ID DESC)=1 ORDER BY LEAD_ID;",
        "hint": "",
        "textOutput": "2:ana@example.com y 3:luis@example.com.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/data-metric-functions",
    "remember": "Distingue medir anomalías de corregir automáticamente los datos.",
    "note": "Requiere disponibilidad de DMF y permisos para usar las funciones del sistema.",
    "examples": [
      {
        "id": "snowflake/elt-y-modelado-analitico/data-metric-functions/1",
        "title": "Medir nulos en correos",
        "language": "sql",
        "code": "SELECT SNOWFLAKE.CORE.NULL_COUNT(SELECT EMAIL FROM LEADS);",
        "hint": "",
        "textOutput": "1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
