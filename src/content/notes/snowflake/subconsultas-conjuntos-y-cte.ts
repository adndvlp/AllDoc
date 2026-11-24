// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/definicion",
    "remember": "Usa un CTE para nombrar resultados que necesites volver a consultar.",
    "examples": [
      {
        "id": "snowflake/subconsultas-conjuntos-y-cte/definicion/1",
        "title": "Filtrar compras sobre el promedio",
        "language": "sql",
        "code": "SELECT ORDER_ID FROM ORDERS WHERE AMOUNT>(SELECT AVG(AMOUNT) FROM ORDERS) ORDER BY 1;",
        "hint": "",
        "textOutput": "102,103,105,107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/subconsulta-escalar-y-correlacionada",
    "remember": "Snowflake limita algunas posiciones de subconsultas correlacionadas escalares; un agregado sin GROUP BY puede garantizar una fila.",
    "examples": [
      {
        "id": "snowflake/subconsultas-conjuntos-y-cte/subconsulta-escalar-y-correlacionada/1",
        "title": "Detectar compras mayores al promedio de su cliente",
        "language": "sql",
        "code": "SELECT o.ORDER_ID FROM ORDERS o WHERE o.AMOUNT>(SELECT AVG(x.AMOUNT) FROM ORDERS x WHERE x.CUSTOMER_ID=o.CUSTOMER_ID) ORDER BY 1;",
        "hint": "",
        "textOutput": "102,103,105.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/in-exists-any-y-all",
    "remember": "Revisa restricciones de subconsultas y NULL; ANY/ALL se usan en WHERE.",
    "examples": [
      {
        "id": "snowflake/subconsultas-conjuntos-y-cte/in-exists-any-y-all/1",
        "title": "Buscar ventas superiores a todos los pedidos cancelados",
        "language": "sql",
        "code": "SELECT ORDER_ID FROM ORDERS WHERE AMOUNT>ALL(SELECT AMOUNT FROM ORDERS WHERE STATUS='cancelled') ORDER BY 1;",
        "hint": "",
        "textOutput": "102,103,105,107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/cte-y-multiples-with",
    "remember": "No presupongas que se materializan físicamente.",
    "examples": [
      {
        "id": "snowflake/subconsultas-conjuntos-y-cte/cte-y-multiples-with/1",
        "title": "Contar clientes con ventas de al menos 300",
        "language": "sql",
        "code": "WITH s AS (SELECT CUSTOMER_ID,SUM(AMOUNT) AS TOTAL FROM ORDERS WHERE STATUS='completed' GROUP BY 1), f AS (SELECT * FROM s WHERE TOTAL>=300) SELECT COUNT(*) FROM f;",
        "hint": "",
        "textOutput": "4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/cte-recursivo-y-connect-by",
    "remember": "Define una condición de parada y protege contra ciclos.",
    "examples": [
      {
        "id": "snowflake/subconsultas-conjuntos-y-cte/cte-recursivo-y-connect-by/1",
        "title": "Generar tres niveles",
        "language": "sql",
        "code": "WITH RECURSIVE n(i) AS (SELECT 1 UNION ALL SELECT i+1 FROM n WHERE i<3) SELECT i FROM n ORDER BY i;",
        "hint": "",
        "textOutput": "1,2,3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/union-union-all-y-by-name",
    "remember": "Sin BY NAME, la posición determina la correspondencia.",
    "examples": [
      {
        "id": "snowflake/subconsultas-conjuntos-y-cte/union-union-all-y-by-name/1",
        "title": "Combinar dos listas de países",
        "language": "sql",
        "code": "SELECT COUNTRY FROM CUSTOMERS WHERE CUSTOMER_ID=1 UNION ALL SELECT COUNTRY FROM CUSTOMERS WHERE CUSTOMER_ID=2;",
        "hint": "",
        "textOutput": "Dos filas Mexico; UNION sin ALL devolvería una.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/intersect-y-except",
    "remember": "Alinea columnas y tipos compatibles.",
    "examples": [
      {
        "id": "snowflake/subconsultas-conjuntos-y-cte/intersect-y-except/1",
        "title": "Clientes sin pedidos por diferencia",
        "language": "sql",
        "code": "SELECT CUSTOMER_ID FROM CUSTOMERS EXCEPT SELECT CUSTOMER_ID FROM ORDERS ORDER BY 1;",
        "hint": "",
        "textOutput": "5,6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
