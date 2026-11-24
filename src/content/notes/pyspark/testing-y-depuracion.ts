// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/testing-y-depuracion/definicion",
    "remember": "Prueba también nulos, empates, duplicados y entradas vacías.",
    "examples": [
      {
        "id": "pyspark/testing-y-depuracion/definicion/1",
        "title": "Comprobar una agregación",
        "language": "python",
        "code": "from pyspark.testing.utils import assertDataFrameEqual\nactual = orders.groupBy(\"customer_id\").agg(F.sum(\"amount\").alias(\"total\"))\nexpected = spark.createDataFrame([(1,700),(2,1000),(3,900)],\"customer_id INT, total LONG\")\nassertDataFrameEqual(actual,expected)",
        "hint": "",
        "textOutput": "La aserción termina sin error; no exige orden de filas por defecto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/testing-y-depuracion/assertschemaequal",
    "remember": "Una prueba de esquema no comprueba valores.",
    "examples": [
      {
        "id": "pyspark/testing-y-depuracion/assertschemaequal/1",
        "title": "Comprobar tipos seleccionados",
        "language": "python",
        "code": "from pyspark.testing.utils import assertSchemaEqual\nexpected = spark.createDataFrame([],\"order_id INT, amount INT\")\nassertSchemaEqual(orders.select(\"order_id\",\"amount\").schema,expected.schema)",
        "hint": "",
        "textOutput": "La comparación termina sin error.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/testing-y-depuracion/reglas-de-negocio-y-regresion",
    "remember": "Separa una condición válida de una expectativa accidental del dataset.",
    "examples": [
      {
        "id": "pyspark/testing-y-depuracion/reglas-de-negocio-y-regresion/1",
        "title": "Verificar no duplicación de claves",
        "language": "python",
        "code": "assert orders.count() == orders.select(\"order_id\").distinct().count()\nassert orders.filter(F.col(\"customer_id\").isNull()).count() == 0",
        "hint": "",
        "textOutput": "Ambas aserciones pasan para los datos preparados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/testing-y-depuracion/excepciones-y-compatibilidad",
    "remember": "Comprueba versión y clase de error antes de aplicar una solución de otra versión.",
    "examples": [
      {
        "id": "pyspark/testing-y-depuracion/excepciones-y-compatibilidad/1",
        "title": "Consultar versiones",
        "language": "python",
        "code": "import sys, pyspark\nprint(sys.version.split()[0],pyspark.__version__,spark.version)",
        "hint": "",
        "textOutput": "Versiones instaladas de Python, cliente PySpark y servidor Spark; en la instalación local de referencia Spark y PySpark son 4.1.0.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
