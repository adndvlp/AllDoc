// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/snowpark-python/definicion",
    "remember": "No es pandas: una transformación Snowpark suele ser lazy, es decir, no ejecuta hasta una acción.",
    "note": "Requiere conexión alldoc y paquete snowflake-snowpark-python.",
    "examples": [
      {
        "id": "snowflake/snowpark-python/definicion/1",
        "title": "Abrir sesión y contar pedidos",
        "language": "python",
        "code": "from snowflake.snowpark import Session\nsession = Session.builder.config(\"connection_name\", \"alldoc\").create()\ntry:\n    print(session.table(\"ORDERS\").count())\nfinally:\n    session.close()",
        "hint": "",
        "textOutput": "8.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/snowpark-python/session-sql-y-session-table",
    "remember": "Una llamada a sql no ejecuta por sí sola la consulta; usa collect, show u otra acción.",
    "note": "Usa la sesión abierta como en Definición (antes de close).",
    "examples": [
      {
        "id": "snowflake/snowpark-python/session-sql-y-session-table/1",
        "title": "Consultar ventas con SQL",
        "language": "python",
        "code": "df = session.sql(\"SELECT SUM(AMOUNT) AS TOTAL FROM ORDERS WHERE STATUS=?\", params=[\"completed\"])\nprint(df.collect())",
        "hint": "",
        "textOutput": "Lista con una Row cuyo TOTAL es 1300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/snowpark-python/select-filter-y-order-by",
    "remember": "Usa col para referenciar columnas; filter no equivale a filtrar una lista local.",
    "note": "Requiere sesión abierta.",
    "examples": [
      {
        "id": "snowflake/snowpark-python/select-filter-y-order-by/1",
        "title": "Obtener pedidos grandes",
        "language": "python",
        "code": "from snowflake.snowpark.functions import col\ndf = session.table(\"ORDERS\").filter((col(\"STATUS\")==\"completed\") & (col(\"AMOUNT\")>200)).select(\"ORDER_ID\",\"AMOUNT\").sort(\"ORDER_ID\")\ndf.show()",
        "hint": "",
        "textOutput": "103:300 y 107:400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/snowpark-python/group-by-y-agg",
    "remember": "Se ejecuta en Snowflake, no necesita descargar filas primero.",
    "note": "Requiere sesión abierta.",
    "examples": [
      {
        "id": "snowflake/snowpark-python/group-by-y-agg/1",
        "title": "Calcular ventas por cliente",
        "language": "python",
        "code": "from snowflake.snowpark.functions import col, sum as sf_sum\ndf = session.table(\"ORDERS\").filter(col(\"STATUS\")==\"completed\").group_by(\"CUSTOMER_ID\").agg(sf_sum(\"AMOUNT\").alias(\"TOTAL\")).sort(\"CUSTOMER_ID\")\ndf.show()",
        "hint": "",
        "textOutput": "1:300,2:300,3:300,4:400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/snowpark-python/join-y-granularidad",
    "remember": "Selecciona columnas explícitamente para evitar nombres ambiguos.",
    "note": "Requiere sesión abierta.",
    "examples": [
      {
        "id": "snowflake/snowpark-python/join-y-granularidad/1",
        "title": "Traer el nombre de un comprador",
        "language": "python",
        "code": "from snowflake.snowpark.functions import col\no = session.table(\"ORDERS\").select(\"ORDER_ID\",\"CUSTOMER_ID\")\nc = session.table(\"CUSTOMERS\").select(\"CUSTOMER_ID\",\"NAME\")\no.join(c,\"CUSTOMER_ID\").filter(col(\"ORDER_ID\")==101).select(\"ORDER_ID\",\"NAME\").show()",
        "hint": "",
        "textOutput": "101, Ana.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/snowpark-python/lazy-evaluation-pushdown-y-acciones",
    "remember": "Filtra y agrega antes de traer datos a Python.",
    "note": "Requiere sesión abierta y dependencias pandas.",
    "examples": [
      {
        "id": "snowflake/snowpark-python/lazy-evaluation-pushdown-y-acciones/1",
        "title": "Obtener un escalar y un DataFrame local",
        "language": "python",
        "code": "from snowflake.snowpark.functions import col\ndf = session.table(\"ORDERS\").filter(col(\"STATUS\")==\"completed\").select(\"ORDER_ID\")\nprint(df.count())\nprint(df.to_pandas().shape)",
        "hint": "",
        "textOutput": "6 y (6, 1); ambas son acciones.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/snowpark-python/save-as-table-y-modos-de-escritura",
    "remember": "overwrite puede sustituir datos: utiliza tablas de laboratorio.",
    "note": "Requiere sesión abierta y permiso de escritura.",
    "examples": [
      {
        "id": "snowflake/snowpark-python/save-as-table-y-modos-de-escritura/1",
        "title": "Guardar un modelo de completados",
        "language": "python",
        "code": "from snowflake.snowpark.functions import col\nsession.table(\"ORDERS\").filter(col(\"STATUS\")==\"completed\").write.mode(\"overwrite\").save_as_table(\"DEMO_SP_DONE\")\nprint(session.table(\"DEMO_SP_DONE\").count())",
        "hint": "",
        "textOutput": "6 filas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
