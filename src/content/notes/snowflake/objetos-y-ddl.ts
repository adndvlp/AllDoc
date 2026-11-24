// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/objetos-y-ddl/definicion",
    "remember": "DDL normalmente confirma una transacción activa y se ejecuta en su propia transacción.",
    "examples": [
      {
        "id": "snowflake/objetos-y-ddl/definicion/1",
        "title": "Crear una tabla desde una consulta",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_DONE AS SELECT * FROM ORDERS WHERE STATUS='completed';\nSELECT COUNT(*) FROM DEMO_DONE;",
        "hint": "",
        "textOutput": "6 filas; ORDERS permanece intacta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/objetos-y-ddl/create-alter-drop-y-truncate",
    "remember": "IF EXISTS evita fallar si el objeto no existe; OR REPLACE puede reemplazar datos y permisos.",
    "examples": [
      {
        "id": "snowflake/objetos-y-ddl/create-alter-drop-y-truncate/1",
        "title": "Modificar una tabla aislada",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_DDL(ID NUMBER);\nALTER TABLE DEMO_DDL ADD COLUMN LABEL VARCHAR;\nALTER TABLE DEMO_DDL RENAME COLUMN LABEL TO NAME;\nINSERT INTO DEMO_DDL VALUES(1,'A');\nTRUNCATE TABLE DEMO_DDL;\nSELECT COUNT(*) FROM DEMO_DDL;\nDROP TABLE IF EXISTS DEMO_DDL;",
        "hint": "",
        "textOutput": "Conteo 0 tras vaciarla; al final el objeto ya no existe.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/objetos-y-ddl/permanent-temporary-y-transient",
    "remember": "Una temporal puede ocultar una tabla homónima; elige según retención requerida.",
    "examples": [
      {
        "id": "snowflake/objetos-y-ddl/permanent-temporary-y-transient/1",
        "title": "Crear dos tipos de tabla de trabajo",
        "language": "sql",
        "code": "CREATE OR REPLACE TEMP TABLE DEMO_TEMP AS SELECT ORDER_ID FROM ORDERS;\nCREATE OR REPLACE TRANSIENT TABLE DEMO_TRANSIENT AS SELECT ORDER_ID FROM ORDERS;",
        "hint": "",
        "textOutput": "Ambas contienen 8 filas; la primera desaparece al cerrar la sesión, la segunda no.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/objetos-y-ddl/primary-key-foreign-key-y-unique",
    "remember": "Valida unicidad y referencias en la carga; no supongas integridad por declarar una clave.",
    "examples": [
      {
        "id": "snowflake/objetos-y-ddl/primary-key-foreign-key-y-unique/1",
        "title": "Detectar claves repetidas",
        "language": "sql",
        "code": "SELECT CUSTOMER_ID,COUNT(*) FROM CUSTOMERS GROUP BY 1 HAVING COUNT(*)>1;",
        "hint": "",
        "textOutput": "Ninguna fila con el dataset inicial.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/objetos-y-ddl/not-null-default-y-check",
    "remember": "CHECK para tablas estándar es GA desde abril de 2026; antes no estaba disponible como hoy. Un CHECK no sustituye NOT NULL.",
    "note": "Verificar restricciones y compatibilidad de cargas antes de añadir CHECK a tablas existentes.",
    "examples": [
      {
        "id": "snowflake/objetos-y-ddl/not-null-default-y-check/1",
        "title": "Proteger cantidades positivas",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_CHECK(ID NUMBER NOT NULL, QTY NUMBER NOT NULL DEFAULT 1 CHECK(QTY>0));\nINSERT INTO DEMO_CHECK(ID) VALUES(1);\nSELECT * FROM DEMO_CHECK;",
        "hint": "",
        "textOutput": "1,1. Intentar insertar QTY=0 falla por CHECK.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/objetos-y-ddl/sequences-nextval-e-identity",
    "remember": "No garantizan ausencia de huecos ni orden cronológico estricto.",
    "examples": [
      {
        "id": "snowflake/objetos-y-ddl/sequences-nextval-e-identity/1",
        "title": "Crear identificador automático",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_SEQ(ID NUMBER IDENTITY(1,1), LABEL VARCHAR);\nINSERT INTO DEMO_SEQ(LABEL) VALUES('A');\nSELECT * FROM DEMO_SEQ;",
        "hint": "",
        "textOutput": "Una fila con ID generado y LABEL=A.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/objetos-y-ddl/show-describe-y-get-ddl",
    "remember": "Los metadatos visibles dependen del rol.",
    "examples": [
      {
        "id": "snowflake/objetos-y-ddl/show-describe-y-get-ddl/1",
        "title": "Inspeccionar ORDERS",
        "language": "sql",
        "code": "SHOW TABLES LIKE 'ORDERS';\nDESCRIBE TABLE ORDERS;\nSELECT GET_DDL('TABLE','ORDERS');",
        "hint": "",
        "textOutput": "Metadatos de ORDERS, sus seis columnas y texto DDL de la tabla.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
