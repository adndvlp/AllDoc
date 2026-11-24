// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/udf-udtf-y-procedimientos/definicion",
    "remember": "Usa funciones para transformar expresiones; procedimientos para flujos con efectos y control.",
    "examples": [
      {
        "id": "snowflake/udf-udtf-y-procedimientos/definicion/1",
        "title": "Crear una función SQL reutilizable",
        "language": "sql",
        "code": "CREATE OR REPLACE FUNCTION DEMO_TAX(x NUMBER) RETURNS NUMBER LANGUAGE SQL AS $$ x*0.16 $$;\nSELECT DEMO_TAX(100);",
        "hint": "",
        "textOutput": "16.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/udf-udtf-y-procedimientos/python-udf",
    "remember": "Elige runtime y dependencias soportados; evita acceso externo salvo integración autorizada.",
    "note": "Requiere runtime 3.12 disponible y privilegios de creación.",
    "examples": [
      {
        "id": "snowflake/udf-udtf-y-procedimientos/python-udf/1",
        "title": "Transformar texto con Python",
        "language": "sql",
        "code": "CREATE OR REPLACE FUNCTION DEMO_LABEL(s VARCHAR) RETURNS VARCHAR LANGUAGE PYTHON RUNTIME_VERSION='3.12' HANDLER='label' AS $$\ndef label(s):\n    return s.upper() if s is not None else None\n$$;\nSELECT DEMO_LABEL('ana');",
        "hint": "",
        "textOutput": "ANA.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/udf-udtf-y-procedimientos/udtf",
    "remember": "Define columnas de salida y cuántas filas genera por entrada.",
    "examples": [
      {
        "id": "snowflake/udf-udtf-y-procedimientos/udtf/1",
        "title": "Encapsular pedidos de un cliente",
        "language": "sql",
        "code": "CREATE OR REPLACE FUNCTION DEMO_ORDERS_FOR(cid NUMBER) RETURNS TABLE(ORDER_ID NUMBER,AMOUNT NUMBER(12,2)) AS $$ SELECT o.ORDER_ID,o.AMOUNT FROM ORDERS o WHERE o.CUSTOMER_ID=cid $$;\nSELECT * FROM TABLE(DEMO_ORDERS_FOR(1)) ORDER BY ORDER_ID;",
        "hint": "",
        "textOutput": "101:100,102:200,108:50.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/udf-udtf-y-procedimientos/stored-procedures-y-derechos",
    "remember": "No expongas privilegios del propietario sin limitar y validar entradas.",
    "examples": [
      {
        "id": "snowflake/udf-udtf-y-procedimientos/stored-procedures-y-derechos/1",
        "title": "Crear procedimiento SQL que devuelve conteo",
        "language": "sql",
        "code": "CREATE OR REPLACE PROCEDURE DEMO_COUNT() RETURNS NUMBER LANGUAGE SQL EXECUTE AS CALLER AS $$\nDECLARE n NUMBER;\nBEGIN\n SELECT COUNT(*) INTO :n FROM ORDERS;\n RETURN n;\nEND;\n$$;\nCALL DEMO_COUNT();",
        "hint": "",
        "textOutput": "8.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/udf-udtf-y-procedimientos/python-stored-procedures",
    "remember": "La sesión del handler la proporciona Snowflake; no abras otra conexión sin necesidad.",
    "note": "Requiere runtime y paquete disponibles en la cuenta.",
    "examples": [
      {
        "id": "snowflake/udf-udtf-y-procedimientos/python-stored-procedures/1",
        "title": "Contar pedidos mediante Snowpark",
        "language": "sql",
        "code": "CREATE OR REPLACE PROCEDURE DEMO_PY_COUNT() RETURNS NUMBER LANGUAGE PYTHON RUNTIME_VERSION='3.12' PACKAGES=('snowflake-snowpark-python') HANDLER='run' EXECUTE AS CALLER AS $$\ndef run(session):\n    return session.table('ORDERS').count()\n$$;\nCALL DEMO_PY_COUNT();",
        "hint": "",
        "textOutput": "8.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
