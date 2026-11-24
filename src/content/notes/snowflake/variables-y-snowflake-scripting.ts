// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/variables-y-snowflake-scripting/definicion",
    "remember": "Distingue variable de sesión ($nombre), variable local y parámetros bind.",
    "examples": [
      {
        "id": "snowflake/variables-y-snowflake-scripting/definicion/1",
        "title": "Reutilizar un umbral",
        "language": "sql",
        "code": "SET MIN_AMOUNT=200;\nSELECT COUNT(*) FROM ORDERS WHERE AMOUNT>=$MIN_AMOUNT;\nUNSET MIN_AMOUNT;",
        "hint": "",
        "textOutput": "4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/variables-y-snowflake-scripting/identifier-y-sql-dinamico",
    "remember": "Parametriza valores y limita identificadores permitidos; no concatenes entrada sin validar.",
    "examples": [
      {
        "id": "snowflake/variables-y-snowflake-scripting/identifier-y-sql-dinamico/1",
        "title": "Consultar una tabla elegida",
        "language": "sql",
        "code": "SET T='ORDERS';\nSELECT COUNT(*) FROM IDENTIFIER($T);\nUNSET T;",
        "hint": "",
        "textOutput": "8.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/variables-y-snowflake-scripting/bloques-variables-y-if",
    "remember": "Usa := para asignar y RETURN para devolver el resultado.",
    "examples": [
      {
        "id": "snowflake/variables-y-snowflake-scripting/bloques-variables-y-if/1",
        "title": "Evaluar un umbral en un bloque",
        "language": "sql",
        "code": "EXECUTE IMMEDIATE $$\nDECLARE n NUMBER DEFAULT 8;\nBEGIN\n IF (n >= 5) THEN RETURN 'OK'; END IF;\n RETURN 'LOW';\nEND;\n$$;",
        "hint": "",
        "textOutput": "OK.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/variables-y-snowflake-scripting/bucles-cursores-y-excepciones",
    "remember": "Prefiere SQL por conjuntos cuando no necesitas lógica fila por fila.",
    "examples": [
      {
        "id": "snowflake/variables-y-snowflake-scripting/bucles-cursores-y-excepciones/1",
        "title": "Acumular tres valores",
        "language": "sql",
        "code": "EXECUTE IMMEDIATE $$\nDECLARE n NUMBER DEFAULT 0;\nBEGIN\n FOR i IN 1 TO 3 DO n := n+i; END FOR;\n RETURN n;\nEND;\n$$;",
        "hint": "",
        "textOutput": "6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/variables-y-snowflake-scripting/execute-immediate-y-binds",
    "remember": "Los parámetros de valor no son nombres de tabla; para nombres utiliza IDENTIFIER.",
    "examples": [
      {
        "id": "snowflake/variables-y-snowflake-scripting/execute-immediate-y-binds/1",
        "title": "Ejecutar una consulta parametrizada",
        "language": "sql",
        "code": "EXECUTE IMMEDIATE $$\nDECLARE stmt VARCHAR DEFAULT 'SELECT COUNT(*) FROM ORDERS WHERE AMOUNT > ?';\n n NUMBER DEFAULT 200;\n rs RESULTSET;\nBEGIN\n rs := (EXECUTE IMMEDIATE :stmt USING (n));\n RETURN TABLE(rs);\nEND;\n$$;",
        "hint": "",
        "textOutput": "2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
