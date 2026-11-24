// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/lectura-de-datos/definicion",
    "remember": "La ruta debe ser accesible a los executors.",
    "examples": [
      {
        "id": "pyspark/lectura-de-datos/definicion/1",
        "title": "Leer CSV con esquema",
        "language": "python",
        "code": "spark.read.option(\"header\", True).schema(\"id INT, amount INT\").csv(str(base / \"sample.csv\")).show()",
        "hint": "",
        "textOutput": "Filas (1,100) y (2,200).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/lectura-de-datos/csv-y-opciones",
    "remember": "Inferir tipos puede requerir lectura adicional y producir tipos no deseados.",
    "examples": [
      {
        "id": "pyspark/lectura-de-datos/csv-y-opciones/1",
        "title": "Inferir tipos de una muestra",
        "language": "python",
        "code": "spark.read.options(header=True, inferSchema=True).csv(str(base / \"sample.csv\")).printSchema()",
        "hint": "",
        "textOutput": "id y amount de tipo integer.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/lectura-de-datos/json-y-texto",
    "remember": "Para JSON multilínea, activa multiLine cuando corresponda.",
    "examples": [
      {
        "id": "pyspark/lectura-de-datos/json-y-texto/1",
        "title": "Leer eventos JSON",
        "language": "python",
        "code": "spark.read.json(str(base / \"sample.json\")).select(\"id\", \"amount\").show()",
        "hint": "",
        "textOutput": "(1,100), (2,200).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/lectura-de-datos/parquet-y-orc",
    "remember": "Son opciones habituales para datos analíticos; CSV no guarda tipos.",
    "examples": [
      {
        "id": "pyspark/lectura-de-datos/parquet-y-orc/1",
        "title": "Leer Parquet",
        "language": "python",
        "code": "spark.read.parquet(str(base / \"orders.parquet\")).select(\"order_id\").orderBy(\"order_id\").show(2)",
        "hint": "",
        "textOutput": "101, 102.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/lectura-de-datos/format-option-y-load",
    "remember": "`read.format(\"csv\").load(...)` equivale al método csv con opciones equivalentes.",
    "examples": [
      {
        "id": "pyspark/lectura-de-datos/format-option-y-load/1",
        "title": "Leer texto sin conversión",
        "language": "python",
        "code": "spark.read.format(\"text\").load(str(base / \"sample.csv\")).show(truncate=False)",
        "hint": "",
        "textOutput": "Tres líneas: id,amount; 1,100; 2,200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/lectura-de-datos/jdbc",
    "remember": "No incrustes credenciales ni aumentes conexiones sin considerar la base.",
    "note": "Ejemplo externo: define jdbc_url, jdbc_user y jdbc_password desde variables de entorno y añade el JAR JDBC compatible al iniciar Spark.",
    "examples": [
      {
        "id": "pyspark/lectura-de-datos/jdbc/1",
        "title": "Leer una tabla PostgreSQL",
        "language": "python",
        "code": "df = spark.read.format(\"jdbc\").options(url=jdbc_url, dbtable=\"public.orders\", user=jdbc_user, password=jdbc_password, driver=\"org.postgresql.Driver\").load()\ndf.printSchema()",
        "hint": "",
        "textOutput": "El esquema de la tabla remota, si la conexión y permisos son válidos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
