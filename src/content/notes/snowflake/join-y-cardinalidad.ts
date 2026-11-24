// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/join-y-cardinalidad/definicion",
    "remember": "Una clave repetida puede multiplicar filas y métricas.",
    "examples": [
      {
        "id": "snowflake/join-y-cardinalidad/definicion/1",
        "title": "Traer el nombre del comprador",
        "language": "sql",
        "code": "SELECT o.ORDER_ID,c.NAME FROM ORDERS o JOIN CUSTOMERS c ON o.CUSTOMER_ID=c.CUSTOMER_ID WHERE o.ORDER_ID=101;",
        "hint": "",
        "textOutput": "101, Ana.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/join-y-cardinalidad/inner-join-on-y-using",
    "remember": "No requiere una FK declarada para funcionar.",
    "examples": [
      {
        "id": "snowflake/join-y-cardinalidad/inner-join-on-y-using/1",
        "title": "Combinar por columna compartida",
        "language": "sql",
        "code": "SELECT ORDER_ID,NAME FROM ORDERS JOIN CUSTOMERS USING(CUSTOMER_ID) WHERE ORDER_ID=102;",
        "hint": "",
        "textOutput": "102, Ana.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/join-y-cardinalidad/left-right-y-full-outer-join",
    "remember": "Las columnas del lado ausente son NULL.",
    "examples": [
      {
        "id": "snowflake/join-y-cardinalidad/left-right-y-full-outer-join/1",
        "title": "Conservar clientes sin pedidos",
        "language": "sql",
        "code": "SELECT c.CUSTOMER_ID,o.ORDER_ID FROM CUSTOMERS c LEFT JOIN ORDERS o ON c.CUSTOMER_ID=o.CUSTOMER_ID WHERE c.CUSTOMER_ID=5;",
        "hint": "",
        "textOutput": "5, NULL; RIGHT JOIN invirtiendo las tablas conserva lo mismo; FULL también conservaría pedidos huérfanos si existieran.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/join-y-cardinalidad/anti-join-y-semi-join",
    "remember": "NOT EXISTS evita problemas de NOT IN con NULL.",
    "examples": [
      {
        "id": "snowflake/join-y-cardinalidad/anti-join-y-semi-join/1",
        "title": "Encontrar clientes sin pedido",
        "language": "sql",
        "code": "SELECT c.CUSTOMER_ID FROM CUSTOMERS c WHERE NOT EXISTS (SELECT 1 FROM ORDERS o WHERE o.CUSTOMER_ID=c.CUSTOMER_ID) ORDER BY 1;",
        "hint": "",
        "textOutput": "5 y 6. Con EXISTS se obtienen 1, 2, 3 y 4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/join-y-cardinalidad/filtros-en-on-y-where",
    "remember": "Para contar cero coincidencias usa COUNT de una clave derecha no nula.",
    "examples": [
      {
        "id": "snowflake/join-y-cardinalidad/filtros-en-on-y-where/1",
        "title": "Contar completados incluyendo clientes sin compras",
        "language": "sql",
        "code": "SELECT c.CUSTOMER_ID,COUNT(o.ORDER_ID) FROM CUSTOMERS c LEFT JOIN ORDERS o ON c.CUSTOMER_ID=o.CUSTOMER_ID AND o.STATUS='completed' GROUP BY 1 ORDER BY 1;",
        "hint": "",
        "textOutput": "1:2, 2:1, 3:2, 4:1, 5:0, 6:0.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/join-y-cardinalidad/cross-join-y-self-join",
    "remember": "Controla el producto cartesiano antes de agregar.",
    "examples": [
      {
        "id": "snowflake/join-y-cardinalidad/cross-join-y-self-join/1",
        "title": "Contar parejas cliente-producto",
        "language": "sql",
        "code": "SELECT COUNT(*) FROM CUSTOMERS CROSS JOIN PRODUCTS;",
        "hint": "",
        "textOutput": "24 pares.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/join-y-cardinalidad/join-multiple-y-granularidad",
    "remember": "Al sumar ventas por producto usa cantidad por precio de línea, no el total del pedido repetido.",
    "examples": [
      {
        "id": "snowflake/join-y-cardinalidad/join-multiple-y-granularidad/1",
        "title": "Ingresos por categoría",
        "language": "sql",
        "code": "SELECT p.CATEGORY,SUM(i.QUANTITY*i.UNIT_PRICE) AS SALES FROM ORDER_ITEMS i JOIN ORDERS o ON o.ORDER_ID=i.ORDER_ID JOIN PRODUCTS p ON p.PRODUCT_ID=i.PRODUCT_ID WHERE o.STATUS='completed' GROUP BY 1 ORDER BY 1;",
        "hint": "",
        "textOutput": "Electronics:400, Furniture:900.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/join-y-cardinalidad/asof-join",
    "remember": "ON agrupa por claves de igualdad; evita empates en timestamps derechos si necesitas determinismo.",
    "examples": [
      {
        "id": "snowflake/join-y-cardinalidad/asof-join/1",
        "title": "Encontrar el tipo de cambio anterior",
        "language": "sql",
        "code": "WITH t AS (SELECT 1 AS ID,'2026-02-03'::DATE AS D,'USD' AS CCY), r AS (SELECT 'USD' AS CCY,'2026-02-01'::DATE AS D,17 AS RATE UNION ALL SELECT 'USD','2026-02-04'::DATE,18) SELECT t.ID,r.RATE FROM t ASOF JOIN r MATCH_CONDITION(t.D>=r.D) ON t.CCY=r.CCY;",
        "hint": "",
        "textOutput": "1, 17.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
