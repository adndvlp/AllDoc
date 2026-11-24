// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/funciones-personalizadas/definicion",
    "remember": "Prefiere funciones Spark nativas: permiten optimización y evitan transferencias innecesarias.",
    "examples": [
      {
        "id": "pyspark/funciones-personalizadas/definicion/1",
        "title": "Clasificar con una UDF",
        "language": "python",
        "code": "@F.udf(\"string\")\ndef label(x):\n    return \"large\" if x is not None and x >= 500 else \"small\"\norders.select(\"order_id\",label(\"amount\").alias(\"label\")).orderBy(\"order_id\").show(1)",
        "hint": "",
        "textOutput": "101,large.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/funciones-personalizadas/pandas-udf-y-arrow",
    "remember": "La función debe respetar la cardinalidad y los tipos declarados; requiere pandas y PyArrow.",
    "note": "Instala las dependencias SQL opcionales indicadas en el anexo.",
    "examples": [
      {
        "id": "pyspark/funciones-personalizadas/pandas-udf-y-arrow/1",
        "title": "Duplicar importes por lotes",
        "language": "python",
        "code": "import pandas as pd\n@F.pandas_udf(\"long\")\ndef twice(s: pd.Series) -> pd.Series:\n    return s * 2\norders.select(\"order_id\",twice(\"amount\").alias(\"double\")).orderBy(\"order_id\").show(1)",
        "hint": "",
        "textOutput": "101,1000.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/funciones-personalizadas/applyinpandas-y-mapinpandas",
    "remember": "Un grupo grande puede agotar memoria; declara el esquema de salida.",
    "note": "Requiere import pandas as pd y PyArrow; para este caso groupBy/agg nativo es preferible.",
    "examples": [
      {
        "id": "pyspark/funciones-personalizadas/applyinpandas-y-mapinpandas/1",
        "title": "Sumar por cliente con pandas",
        "language": "python",
        "code": "import pandas as pd\ndef total(pdf):\n    return pd.DataFrame({\"customer_id\":[int(pdf.customer_id.iloc[0])],\"total\":[int(pdf.amount.sum())]})\norders.groupBy(\"customer_id\").applyInPandas(total,\"customer_id INT, total LONG\").orderBy(\"customer_id\").show()",
        "hint": "",
        "textOutput": "(1,700),(2,1000),(3,900).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/funciones-personalizadas/udtf-y-tvf",
    "remember": "Una UDTF puede devolver cero, una o muchas filas por llamada.",
    "note": "UDTF de Python disponible desde Spark 3.5; consulta compatibilidad de Arrow y Connect en la versión instalada.",
    "examples": [
      {
        "id": "pyspark/funciones-personalizadas/udtf-y-tvf/1",
        "title": "Generar filas desde una UDTF",
        "language": "python",
        "code": "from pyspark.sql.functions import udtf\n@udtf(returnType=\"n INT\")\nclass Expand:\n    def eval(self, n: int):\n        for i in range(n):\n            yield (i,)\nExpand(F.lit(3)).orderBy(\"n\").show()",
        "hint": "",
        "textOutput": "0,1,2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/funciones-personalizadas/serializacion-y-limites-de-udf",
    "remember": "No captures SparkSession dentro de una UDF ni dependas de mutaciones globales del driver.",
    "examples": [
      {
        "id": "pyspark/funciones-personalizadas/serializacion-y-limites-de-udf/1",
        "title": "Comparar planes",
        "language": "python",
        "code": "orders.select((F.col(\"amount\")*2).alias(\"double\")).explain()",
        "hint": "",
        "textOutput": "Una expresión nativa aparece como proyección, sin etapa de evaluación de UDF Python.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/funciones-personalizadas/python-data-source-api",
    "remember": "Usa una fuente integrada si existe; la fuente personalizada declara esquema y forma de lectura.",
    "note": "API incorporada en Spark 4.0; fuentes reales deben definir particiones, opciones y manejo de errores.",
    "examples": [
      {
        "id": "pyspark/funciones-personalizadas/python-data-source-api/1",
        "title": "Registrar una fuente mínima",
        "language": "python",
        "code": "from pyspark.sql.datasource import DataSource, DataSourceReader, InputPartition\nclass DemoReader(DataSourceReader):\n    def partitions(self):\n        return [InputPartition(0)]\n    def read(self, partition):\n        yield (1,)\nclass DemoSource(DataSource):\n    @classmethod\n    def name(cls):\n        return \"alldoc_demo\"\n    def schema(self):\n        return \"id INT\"\n    def reader(self, schema):\n        return DemoReader()\nspark.dataSource.register(DemoSource)\nspark.read.format(\"alldoc_demo\").load().show()",
        "hint": "",
        "textOutput": "Una fila id=1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/funciones-personalizadas/mapinpandas",
    "remember": "No presupongas que un lote contiene todas las filas de una clave.",
    "note": "Requiere pandas y PyArrow.",
    "examples": [
      {
        "id": "pyspark/funciones-personalizadas/mapinpandas/1",
        "title": "Duplicar valores de cada lote",
        "language": "python",
        "code": "import pandas as pd\ndef batches(iterator):\n    for pdf in iterator:\n        yield pdf.assign(amount=pdf.amount*2)\norders.select(\"order_id\",\"amount\").mapInPandas(batches,\"order_id INT, amount INT\").orderBy(\"order_id\").show(1)",
        "hint": "",
        "textOutput": "(101,1000).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
