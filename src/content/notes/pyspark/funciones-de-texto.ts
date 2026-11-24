// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/funciones-de-texto/definicion",
    "remember": "Usa funciones nativas antes de UDFs.",
    "examples": [
      {
        "id": "pyspark/funciones-de-texto/definicion/1",
        "title": "Convertir nombres a mayúsculas",
        "language": "python",
        "code": "customers.select(F.upper(\"name\").alias(\"name\")).orderBy(\"name\").show()",
        "hint": "",
        "textOutput": "ANA, DIEGO, LUIS, MARTA, SOFIA.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/funciones-de-texto/trim-lower-upper-e-initcap",
    "remember": "Limpiar no equivale a validar.",
    "examples": [
      {
        "id": "pyspark/funciones-de-texto/trim-lower-upper-e-initcap/1",
        "title": "Limpiar texto de entrada",
        "language": "python",
        "code": "spark.range(1).select(F.lower(F.trim(F.lit(\"  MX  \"))).alias(\"country\")).show()",
        "hint": "",
        "textOutput": "mx.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/funciones-de-texto/concat-concat-ws-substring-y-length",
    "remember": "concat puede devolver NULL si un argumento es NULL; concat_ws omite cadenas nulas.",
    "examples": [
      {
        "id": "pyspark/funciones-de-texto/concat-concat-ws-substring-y-length/1",
        "title": "Crear una etiqueta",
        "language": "python",
        "code": "customers.select(F.concat_ws(\" - \", \"name\", \"country\").alias(\"label\")).orderBy(\"label\").show(1)",
        "hint": "",
        "textOutput": "Ana - MX.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/funciones-de-texto/split-y-expresiones-regulares",
    "remember": "Los patrones de regex no son SQL LIKE.",
    "examples": [
      {
        "id": "pyspark/funciones-de-texto/split-y-expresiones-regulares/1",
        "title": "Limpiar un código",
        "language": "python",
        "code": "spark.range(1).select(F.regexp_replace(F.lit(\"MX-123\"), \"[^0-9]\", \"\").alias(\"code\")).show()",
        "hint": "",
        "textOutput": "123 como texto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/funciones-de-texto/extraer-y-separar-campos",
    "remember": "Usa delimitadores y patrones compatibles con el dato real.",
    "examples": [
      {
        "id": "pyspark/funciones-de-texto/extraer-y-separar-campos/1",
        "title": "Separar un código de sucursal",
        "language": "python",
        "code": "spark.range(1).select(F.split(F.lit(\"MX-001\"),\"-\").alias(\"parts\"),F.substring(F.lit(\"MX-001\"),1,2).alias(\"prefix\")).show()",
        "hint": "",
        "textOutput": "parts=[MX,001], prefix=MX.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
