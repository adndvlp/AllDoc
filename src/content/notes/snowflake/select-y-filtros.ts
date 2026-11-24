// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/select-y-filtros/definicion",
    "remember": "WHERE ocurre lógicamente antes de SELECT.",
    "examples": [
      {
        "id": "snowflake/select-y-filtros/definicion/1",
        "title": "Mostrar compras completadas",
        "language": "sql",
        "code": "SELECT ORDER_ID, AMOUNT FROM ORDERS WHERE STATUS='completed' ORDER BY ORDER_ID;",
        "hint": "",
        "textOutput": "101:100, 102:200, 103:300, 105:200, 106:100, 107:400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/select-y-filtros/alias-y-comentarios",
    "remember": "Un alias no renombra la columna física.",
    "examples": [
      {
        "id": "snowflake/select-y-filtros/alias-y-comentarios/1",
        "title": "Mostrar importe con nombre de negocio",
        "language": "sql",
        "code": "-- Importe del pedido\nSELECT ORDER_ID AS ID, AMOUNT AS TOTAL FROM ORDERS WHERE ORDER_ID=101;",
        "hint": "",
        "textOutput": "ID=101, TOTAL=100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/select-y-filtros/select-exclude-replace-y-rename",
    "remember": "No modifica la tabla original; EXCLUDE precede a REPLACE/RENAME.",
    "examples": [
      {
        "id": "snowflake/select-y-filtros/select-exclude-replace-y-rename/1",
        "title": "Omitir cupón y cambiar importe visible",
        "language": "sql",
        "code": "SELECT * EXCLUDE COUPON REPLACE (AMOUNT*2 AS AMOUNT) RENAME AMOUNT AS DOBLE FROM ORDERS WHERE ORDER_ID=101;",
        "hint": "",
        "textOutput": "Una fila sin COUPON; DOBLE=200, ORDER_ID=101 y demás columnas originales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/select-y-filtros/operadores-and-or-not",
    "remember": "Usa paréntesis para expresar la intención.",
    "examples": [
      {
        "id": "snowflake/select-y-filtros/operadores-and-or-not/1",
        "title": "Seleccionar pedidos relevantes",
        "language": "sql",
        "code": "SELECT ORDER_ID FROM ORDERS WHERE STATUS='completed' AND (AMOUNT>=300 OR CUSTOMER_ID=1) ORDER BY ORDER_ID;",
        "hint": "",
        "textOutput": "101, 102, 103, 107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/select-y-filtros/in-y-between",
    "remember": "NOT IN con NULL puede producir UNKNOWN; para fechas con hora suele convenir un rango semiabierto.",
    "examples": [
      {
        "id": "snowflake/select-y-filtros/in-y-between/1",
        "title": "Filtrar importe y cliente",
        "language": "sql",
        "code": "SELECT ORDER_ID FROM ORDERS WHERE CUSTOMER_ID IN (1,2) AND AMOUNT BETWEEN 100 AND 200 ORDER BY ORDER_ID;",
        "hint": "",
        "textOutput": "101, 102, 104.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/select-y-filtros/like-ilike-y-patrones",
    "remember": "No confundir patrones LIKE con expresiones regulares.",
    "examples": [
      {
        "id": "snowflake/select-y-filtros/like-ilike-y-patrones/1",
        "title": "Buscar nombres con a inicial",
        "language": "sql",
        "code": "SELECT NAME FROM CUSTOMERS WHERE NAME ILIKE 'a%';",
        "hint": "",
        "textOutput": "Ana.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/select-y-filtros/order-by-limit-y-offset",
    "remember": "Añade un desempate estable para paginar.",
    "examples": [
      {
        "id": "snowflake/select-y-filtros/order-by-limit-y-offset/1",
        "title": "Recuperar el segundo y tercer mayor pedido",
        "language": "sql",
        "code": "SELECT ORDER_ID, AMOUNT FROM ORDERS ORDER BY AMOUNT DESC, ORDER_ID LIMIT 2 OFFSET 1;",
        "hint": "",
        "textOutput": "103:300 y 102:200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/select-y-filtros/distinct",
    "remember": "Con varias columnas, la combinación completa debe ser distinta.",
    "examples": [
      {
        "id": "snowflake/select-y-filtros/distinct/1",
        "title": "Listar estados",
        "language": "sql",
        "code": "SELECT DISTINCT STATUS FROM ORDERS ORDER BY STATUS;",
        "hint": "",
        "textOutput": "cancelled, completed, pending.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
