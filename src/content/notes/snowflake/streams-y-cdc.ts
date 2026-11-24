// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/streams-y-cdc/definicion",
    "remember": "Consultar un stream no consume su offset; una transacción DML que lo consume y confirma sí lo avanza.",
    "examples": [
      {
        "id": "snowflake/streams-y-cdc/definicion/1",
        "title": "Crear stream y detectar inserción",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_CDC(ID NUMBER,AMOUNT NUMBER);\nCREATE OR REPLACE STREAM DEMO_STREAM ON TABLE DEMO_CDC;\nINSERT INTO DEMO_CDC VALUES(1,10);\nSELECT ID,METADATA$ACTION,METADATA$ISUPDATE FROM DEMO_STREAM;",
        "hint": "",
        "textOutput": "1, INSERT, FALSE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/streams-y-cdc/standard-y-append-only-streams",
    "remember": "Append-only no sirve para replicar borrados o modificaciones.",
    "examples": [
      {
        "id": "snowflake/streams-y-cdc/standard-y-append-only-streams/1",
        "title": "Observar una actualización",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_CDC(ID NUMBER,AMOUNT NUMBER);\nINSERT INTO DEMO_CDC VALUES(1,10);\nCREATE OR REPLACE STREAM DEMO_STREAM ON TABLE DEMO_CDC;\nUPDATE DEMO_CDC SET AMOUNT=20 WHERE ID=1;\nSELECT AMOUNT,METADATA$ACTION,METADATA$ISUPDATE FROM DEMO_STREAM ORDER BY AMOUNT;",
        "hint": "",
        "textOutput": "10:DELETE,TRUE y 20:INSERT,TRUE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/streams-y-cdc/consumir-cambios-y-offsets",
    "remember": "Crea una tabla destino por consumidor y no compartas un stream entre procesos independientes.",
    "examples": [
      {
        "id": "snowflake/streams-y-cdc/consumir-cambios-y-offsets/1",
        "title": "Consumir inserciones de un stream",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_CDC(ID NUMBER);\nCREATE OR REPLACE STREAM DEMO_STREAM ON TABLE DEMO_CDC APPEND_ONLY=TRUE;\nCREATE OR REPLACE TABLE DEMO_CDC_OUT(ID NUMBER);\nINSERT INTO DEMO_CDC VALUES(1);\nINSERT INTO DEMO_CDC_OUT SELECT ID FROM DEMO_STREAM;\nSELECT COUNT(*) FROM DEMO_STREAM;",
        "hint": "",
        "textOutput": "0 pendientes tras confirmar el INSERT; DEMO_CDC_OUT contiene 1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/streams-y-cdc/staleness-y-recuperacion",
    "remember": "Comprueba STALE_AFTER y recrea/reconcilia con un backfill si pierdes cambios.",
    "note": "Requiere DEMO_STREAM.",
    "examples": [
      {
        "id": "snowflake/streams-y-cdc/staleness-y-recuperacion/1",
        "title": "Inspeccionar vigencia",
        "language": "sql",
        "code": "SHOW STREAMS LIKE 'DEMO_STREAM';",
        "hint": "",
        "textOutput": "Metadatos de stale y stale_after según configuración; no se presupone que esté vencido.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
