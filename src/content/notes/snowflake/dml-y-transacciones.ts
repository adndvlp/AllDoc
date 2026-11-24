// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/dml-y-transacciones/definicion",
    "remember": "Prueba el filtro con SELECT antes de escribir.",
    "examples": [
      {
        "id": "snowflake/dml-y-transacciones/definicion/1",
        "title": "Crear una copia aislada para cambios",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_DML CLONE ORDERS;\nSELECT COUNT(*) FROM DEMO_DML;",
        "hint": "",
        "textOutput": "8 filas en una copia independiente a nivel lógico.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/dml-y-transacciones/insert-update-y-delete",
    "remember": "Sin WHERE, UPDATE o DELETE puede afectar toda la tabla.",
    "examples": [
      {
        "id": "snowflake/dml-y-transacciones/insert-update-y-delete/1",
        "title": "Corregir y borrar un registro de prueba",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_DML CLONE ORDERS;\nINSERT INTO DEMO_DML VALUES(999,1,10,'2026-03-05','pending',NULL);\nUPDATE DEMO_DML SET STATUS='completed' WHERE ORDER_ID=999;\nDELETE FROM DEMO_DML WHERE ORDER_ID=999;\nSELECT COUNT(*) FROM DEMO_DML;",
        "hint": "",
        "textOutput": "8 filas al final, el pedido 999 ya no existe.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/dml-y-transacciones/merge-y-upsert",
    "remember": "Deduplica la fuente antes de MERGE para evitar resultados no deterministas.",
    "examples": [
      {
        "id": "snowflake/dml-y-transacciones/merge-y-upsert/1",
        "title": "Actualizar o insertar una venta",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_MERGE(ID NUMBER,AMOUNT NUMBER);\nINSERT INTO DEMO_MERGE VALUES(1,10);\nMERGE INTO DEMO_MERGE t USING (SELECT COLUMN1 AS ID,COLUMN2 AS AMOUNT FROM VALUES(1,20),(2,30)) s ON t.ID=s.ID WHEN MATCHED THEN UPDATE SET t.AMOUNT=s.AMOUNT WHEN NOT MATCHED THEN INSERT(ID,AMOUNT) VALUES(s.ID,s.AMOUNT);\nSELECT * FROM DEMO_MERGE ORDER BY ID;",
        "hint": "",
        "textOutput": "1:20, 2:30.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/dml-y-transacciones/begin-commit-y-rollback",
    "remember": "Prepara las tablas antes de BEGIN; DDL puede confirmar implícitamente.",
    "examples": [
      {
        "id": "snowflake/dml-y-transacciones/begin-commit-y-rollback/1",
        "title": "Deshacer una cancelación de prueba",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_TX CLONE ORDERS;\nBEGIN;\nUPDATE DEMO_TX SET STATUS='cancelled' WHERE ORDER_ID=101;\nROLLBACK;\nSELECT STATUS FROM DEMO_TX WHERE ORDER_ID=101;",
        "hint": "",
        "textOutput": "completed.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/dml-y-transacciones/autocommit-y-aislamiento",
    "remember": "Una transacción no confirma cambios de otra sesión sin COMMIT; distintas sentencias pueden ver cambios confirmados entretanto.",
    "note": "Evita cambiar parámetros de transacción en medio de una transacción activa.",
    "examples": [
      {
        "id": "snowflake/dml-y-transacciones/autocommit-y-aislamiento/1",
        "title": "Consultar configuración",
        "language": "sql",
        "code": "SHOW PARAMETERS LIKE 'AUTOCOMMIT' IN SESSION;",
        "hint": "",
        "textOutput": "Valor de sesión (TRUE por defecto).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
