// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/join/definicion",
    "remember": "Comprueba la cardinalidad antes de sumar resultados de un join.",
    "examples": [
      {
        "id": "pyspark/join/definicion/1",
        "title": "Obtener cliente y pedido",
        "language": "python",
        "code": "orders.join(customers,\"customer_id\",\"inner\").select(\"order_id\",\"name\").orderBy(\"order_id\").show(2)",
        "hint": "",
        "textOutput": "(101,Ana), (102,Ana).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/join/condicion-y-alias",
    "remember": "Una lista de nombres de clave comunes genera una sola copia de esas claves.",
    "examples": [
      {
        "id": "pyspark/join/condicion-y-alias/1",
        "title": "Unir usando ON explícito",
        "language": "python",
        "code": "o = orders.alias(\"o\")\nc = customers.alias(\"c\")\no.join(c,F.col(\"o.customer_id\")==F.col(\"c.customer_id\")).select(\"o.order_id\",\"c.name\").orderBy(\"order_id\").show(1)",
        "hint": "",
        "textOutput": "101,Ana.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/join/left-right-y-full",
    "remember": "Una condición posterior sobre la tabla opcional puede eliminar las filas conservadas.",
    "examples": [
      {
        "id": "pyspark/join/left-right-y-full/1",
        "title": "Incluir clientes sin pedidos",
        "language": "python",
        "code": "customers.join(orders,\"customer_id\",\"left\").where(F.col(\"order_id\").isNull()).select(\"customer_id\",\"name\").orderBy(\"customer_id\").show()",
        "hint": "",
        "textOutput": "(4,Diego), (5,Sofia).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/join/semi-y-anti-join",
    "remember": "Un semi join evita multiplicar filas izquierdas por coincidencias derechas.",
    "examples": [
      {
        "id": "pyspark/join/semi-y-anti-join/1",
        "title": "Buscar clientes que nunca pidieron",
        "language": "python",
        "code": "customers.join(orders,\"customer_id\",\"left_anti\").select(\"name\").orderBy(\"name\").show()",
        "hint": "",
        "textOutput": "Diego, Sofia.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/join/cross-join-y-self-join",
    "remember": "El producto cartesiano puede crecer como N×M.",
    "examples": [
      {
        "id": "pyspark/join/cross-join-y-self-join/1",
        "title": "Combinar dos IDs con dos canales",
        "language": "python",
        "code": "spark.range(2).crossJoin(spark.createDataFrame([(\"web\",),(\"store\",)],\"channel STRING\")).orderBy(\"id\",\"channel\").show()",
        "hint": "",
        "textOutput": "(0,store),(0,web),(1,store),(1,web).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/join/cardinalidad-y-joins-multiples",
    "remember": "No sumes el importe completo de un pedido por cada línea de detalle.",
    "examples": [
      {
        "id": "pyspark/join/cardinalidad-y-joins-multiples/1",
        "title": "Calcular ventas de productos",
        "language": "python",
        "code": "items.join(orders,\"order_id\").join(products,\"product_id\").where(\"status = 'completed'\").groupBy(\"category\").agg(F.sum(F.col(\"quantity\")*F.col(\"unit_price\")).alias(\"revenue\")).orderBy(\"category\").show()",
        "hint": "",
        "textOutput": "Electronics=1300, Furniture=1000.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/join/self-join",
    "remember": "Evita columnas ambiguas y condiciones que combinen una fila consigo misma sin intención.",
    "examples": [
      {
        "id": "pyspark/join/self-join/1",
        "title": "Encontrar clientes distintos del mismo país",
        "language": "python",
        "code": "a=customers.alias(\"a\")\nb=customers.alias(\"b\")\na.join(b,(F.col(\"a.country\")==F.col(\"b.country\")) & (F.col(\"a.customer_id\")<F.col(\"b.customer_id\"))).select(F.col(\"a.name\").alias(\"a\"),F.col(\"b.name\").alias(\"b\")).orderBy(\"a\").show()",
        "hint": "",
        "textOutput": "(Ana,Luis),(Marta,Sofia).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/join/right-y-full-en-la-practica",
    "remember": "Usa claves de prueba que permitan observar la diferencia.",
    "examples": [
      {
        "id": "pyspark/join/right-y-full-en-la-practica/1",
        "title": "Comparar conjuntos con claves faltantes",
        "language": "python",
        "code": "a=spark.createDataFrame([(1,),(2,)],\"id INT\")\nb=spark.createDataFrame([(2,),(3,)],\"id INT\")\na.join(b,\"id\",\"full\").orderBy(\"id\").show()",
        "hint": "",
        "textOutput": "1,2,3; con right serían 2,3 y con left serían 1,2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
