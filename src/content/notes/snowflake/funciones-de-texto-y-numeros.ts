// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/funciones-de-texto-y-numeros/definicion",
    "remember": "Una expresión escalar no reduce la cantidad de filas.",
    "examples": [
      {
        "id": "snowflake/funciones-de-texto-y-numeros/definicion/1",
        "title": "Normalizar nombres",
        "language": "sql",
        "code": "SELECT CUSTOMER_ID, UPPER(NAME) AS NAME FROM CUSTOMERS WHERE CUSTOMER_ID=1;",
        "hint": "",
        "textOutput": "1, ANA.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/funciones-de-texto-y-numeros/upper-lower-length-y-trim",
    "remember": "TRIM no elimina espacios internos.",
    "examples": [
      {
        "id": "snowflake/funciones-de-texto-y-numeros/upper-lower-length-y-trim/1",
        "title": "Limpiar una etiqueta",
        "language": "sql",
        "code": "SELECT UPPER('mx'), LOWER('ANA'), LENGTH('Ana'), TRIM(' Ana ');",
        "hint": "",
        "textOutput": "MX, ana, 3, Ana.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/funciones-de-texto-y-numeros/substring-replace-y-concat",
    "remember": "SUBSTRING usa posiciones desde 1; CONCAT devuelve NULL si un argumento es NULL.",
    "examples": [
      {
        "id": "snowflake/funciones-de-texto-y-numeros/substring-replace-y-concat/1",
        "title": "Construir un código",
        "language": "sql",
        "code": "SELECT CONCAT('MX','-',SUBSTRING('2026',3,2)), REPLACE('A-B','-','/');",
        "hint": "",
        "textOutput": "MX-26, A/B.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/funciones-de-texto-y-numeros/split-y-regexp",
    "remember": "REGEXP_LIKE ancla implícitamente el patrón a ambos extremos.",
    "examples": [
      {
        "id": "snowflake/funciones-de-texto-y-numeros/split-y-regexp/1",
        "title": "Normalizar y separar texto",
        "language": "sql",
        "code": "SELECT SPLIT('A,B',','), REGEXP_LIKE('MX-12','MX-[0-9]+'), REGEXP_REPLACE('A123','[0-9]+','');",
        "hint": "",
        "textOutput": "Array [\"A\",\"B\"], TRUE, A.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/funciones-de-texto-y-numeros/round-abs-ceil-floor-y-mod",
    "remember": "ROUND cambia precisión, no equivale a truncar.",
    "examples": [
      {
        "id": "snowflake/funciones-de-texto-y-numeros/round-abs-ceil-floor-y-mod/1",
        "title": "Calcular indicadores",
        "language": "sql",
        "code": "SELECT ROUND(10/3,2), ABS(-5), CEIL(2.1), FLOOR(2.9), MOD(7,3);",
        "hint": "",
        "textOutput": "3.33, 5, 3, 2, 1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
