// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/json-y-otros-tipos/definicion",
    "remember": "Leer JSON como texto y como struct son operaciones diferentes.",
    "examples": [
      {
        "id": "pyspark/json-y-otros-tipos/definicion/1",
        "title": "Extraer un campo JSON",
        "language": "python",
        "code": "d = spark.createDataFrame([('{\"amount\":100}',)],\"raw STRING\")\nd.select(F.from_json(\"raw\",\"amount INT\").getField(\"amount\").alias(\"amount\")).show()",
        "hint": "",
        "textOutput": "100 como entero.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/json-y-otros-tipos/get-json-object-y-schema-of-json",
    "remember": "Para datos de producción, valida un esquema representativo.",
    "examples": [
      {
        "id": "pyspark/json-y-otros-tipos/get-json-object-y-schema-of-json/1",
        "title": "Consultar ruta de JSON",
        "language": "python",
        "code": "spark.range(1).select(F.get_json_object(F.lit('{\"a\":{\"b\":2}}'),\"$.a.b\").alias(\"b\")).show()",
        "hint": "",
        "textOutput": "2 como texto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/json-y-otros-tipos/varianttype-e-intervalos",
    "remember": "Variant no sustituye la validación de campos que exige el negocio.",
    "examples": [
      {
        "id": "pyspark/json-y-otros-tipos/varianttype-e-intervalos/1",
        "title": "Parsear JSON como variant",
        "language": "python",
        "code": "spark.range(1).select(F.parse_json(F.lit('{\"amount\":100}')).alias(\"v\")).printSchema()",
        "hint": "",
        "textOutput": "v de tipo variant.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/json-y-otros-tipos/binarios-codificacion-y-hashing",
    "remember": "Una huella no garantiza unicidad ni anonimización de datos personales.",
    "examples": [
      {
        "id": "pyspark/json-y-otros-tipos/binarios-codificacion-y-hashing/1",
        "title": "Codificar un texto",
        "language": "python",
        "code": "spark.range(1).select(F.base64(F.encode(F.lit(\"MX\"),\"UTF-8\")).alias(\"encoded\")).show()",
        "hint": "",
        "textOutput": "TVg=.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/json-y-otros-tipos/serializar-y-consultar-json",
    "remember": "El esquema inferido de una única muestra puede omitir campos presentes en otros registros.",
    "examples": [
      {
        "id": "pyspark/json-y-otros-tipos/serializar-y-consultar-json/1",
        "title": "Serializar una persona",
        "language": "python",
        "code": "nested.where(\"id = 1\").select(F.to_json(\"person\").alias(\"json\")).show(truncate=False)",
        "hint": "",
        "textOutput": "Un objeto JSON con id=1 y name=Ana.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
