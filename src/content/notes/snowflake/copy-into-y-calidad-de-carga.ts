// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/definicion",
    "remember": "Cargar no es lo mismo que consultar directamente un stage.",
    "note": "Requiere el archivo y formato de las fichas Stages; no altera ORDERS.",
    "examples": [
      {
        "id": "snowflake/copy-into-y-calidad-de-carga/definicion/1",
        "title": "Importar ventas.csv en una tabla aislada",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_LOAD LIKE ORDERS;\nCOPY INTO DEMO_LOAD FROM @DEMO_STAGE/ventas.csv FILE_FORMAT=(FORMAT_NAME=DEMO_CSV);\nSELECT COUNT(*) FROM DEMO_LOAD;",
        "hint": "",
        "textOutput": "2 filas cargadas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/consultar-archivos-y-metadatos",
    "remember": "Guarda trazabilidad al cargar si necesitas investigar errores.",
    "note": "Requiere DEMO_STAGE/ventas.csv y DEMO_CSV.",
    "examples": [
      {
        "id": "snowflake/copy-into-y-calidad-de-carga/consultar-archivos-y-metadatos/1",
        "title": "Inspeccionar CSV antes de cargar",
        "language": "sql",
        "code": "SELECT $1::NUMBER AS ID,$3::NUMBER AS AMOUNT,METADATA$FILENAME AS FILE_NAME,METADATA$FILE_ROW_NUMBER AS LINE FROM @DEMO_STAGE/ventas.csv (FILE_FORMAT=>DEMO_CSV) ORDER BY ID;",
        "hint": "",
        "textOutput": "IDs 201 y 202, montos 80 y 120, nombre de archivo y número de fila registrados por Snowflake.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/validation-mode-y-on-error",
    "remember": "CONTINUE puede dejar una carga parcial; revisa filas rechazadas y reconcilia conteos.",
    "note": "La validación no admite todas las modalidades de COPY con transformación.",
    "examples": [
      {
        "id": "snowflake/copy-into-y-calidad-de-carga/validation-mode-y-on-error/1",
        "title": "Validar el archivo compartido",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_VALIDATE LIKE ORDERS;\nCOPY INTO DEMO_VALIDATE FROM @DEMO_STAGE/ventas.csv FILE_FORMAT=(FORMAT_NAME=DEMO_CSV) VALIDATION_MODE=RETURN_ALL_ERRORS;\nSELECT COUNT(*) FROM DEMO_VALIDATE;",
        "hint": "",
        "textOutput": "No se esperan errores y conteo 0: no se insertaron filas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/transformar-durante-copy",
    "remember": "Usa una tabla de destino con columnas y tipos correspondientes.",
    "note": "Requiere el CSV compartido en el stage.",
    "examples": [
      {
        "id": "snowflake/copy-into-y-calidad-de-carga/transformar-durante-copy/1",
        "title": "Cargar solo ID e importe",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_MINI(ID NUMBER,AMOUNT NUMBER(12,2));\nCOPY INTO DEMO_MINI FROM (SELECT $1::NUMBER,$3::NUMBER(12,2) FROM @DEMO_STAGE/ventas.csv) FILE_FORMAT=(FORMAT_NAME=DEMO_CSV);\nSELECT * FROM DEMO_MINI ORDER BY ID;",
        "hint": "",
        "textOutput": "201:80,202:120.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/infer-schema-y-schema-evolution",
    "remember": "Revisa tipos inferidos y privilegios antes de permitir evolución automática.",
    "note": "El archivo Parquet no forma parte del CSV compartido.",
    "examples": [
      {
        "id": "snowflake/copy-into-y-calidad-de-carga/infer-schema-y-schema-evolution/1",
        "title": "Inferir columnas de Parquet",
        "code": "",
        "steps": [
          "Sube un archivo Parquet de prueba con columnas id y amount a un stage.",
          "Crea DEMO_PARQUET como formato PARQUET.",
          "Ejecuta SELECT * FROM TABLE(INFER_SCHEMA(LOCATION=>'@DEMO_STAGE/ejemplo.parquet',FILE_FORMAT=>'DEMO_PARQUET'));",
          "Para evolución, configura ENABLE_SCHEMA_EVOLUTION y MATCH_BY_COLUMN_NAME según los requisitos oficiales."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Metadatos de id y amount con sus tipos inferidos; la tabla no cambia al ejecutar INFER_SCHEMA.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/historial-e-idempotencia-de-copy",
    "remember": "FORCE=TRUE puede duplicar filas; conserva un control de lotes y claves de negocio.",
    "examples": [
      {
        "id": "snowflake/copy-into-y-calidad-de-carga/historial-e-idempotencia-de-copy/1",
        "title": "Repetir una carga",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_REPEAT LIKE ORDERS;\nCOPY INTO DEMO_REPEAT FROM @DEMO_STAGE/ventas.csv FILE_FORMAT=(FORMAT_NAME=DEMO_CSV);\nCOPY INTO DEMO_REPEAT FROM @DEMO_STAGE/ventas.csv FILE_FORMAT=(FORMAT_NAME=DEMO_CSV);\nSELECT COUNT(*) FROM DEMO_REPEAT;",
        "hint": "",
        "textOutput": "2 filas, no 4, si el archivo no cambió y la metadata de carga sigue vigente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/unloading-y-exportacion",
    "remember": "Usa un prefijo de salida distinto al de entrada; protege datos sensibles antes de exportar.",
    "examples": [
      {
        "id": "snowflake/copy-into-y-calidad-de-carga/unloading-y-exportacion/1",
        "title": "Exportar pedidos completados",
        "language": "sql",
        "code": "COPY INTO @DEMO_STAGE/export/demo_done.csv FROM (SELECT ORDER_ID,AMOUNT FROM ORDERS WHERE STATUS='completed' ORDER BY ORDER_ID) FILE_FORMAT=(TYPE=CSV COMPRESSION=NONE) HEADER=TRUE SINGLE=TRUE OVERWRITE=TRUE;\nLIST @DEMO_STAGE/export/;",
        "hint": "",
        "textOutput": "Archivo de salida con encabezado y seis filas, si el stage existe.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
