// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/spark-session/definicion",
    "remember": "Una sesión concentra la configuración y el acceso a los datos.",
    "examples": [
      {
        "id": "pyspark/spark-session/definicion/1",
        "title": "Crear una sesión local",
        "language": "python",
        "code": "spark = SparkSession.builder.master(\"local[2]\").appName(\"AllDoc\").getOrCreate()",
        "hint": "",
        "textOutput": "Una sesión local con dos hilos de ejecución disponibles.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/spark-session/sparkcontext",
    "remember": "Se obtiene de la sesión; no crees otro contexto activo.",
    "note": "Spark Connect no expone SparkContext.",
    "examples": [
      {
        "id": "pyspark/spark-session/sparkcontext/1",
        "title": "Obtener el contexto",
        "language": "python",
        "code": "sc = spark.sparkContext\nprint(sc.master)",
        "hint": "",
        "textOutput": "`local[2]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/spark-session/configuracion-y-ciclo-de-vida",
    "remember": "Detén Spark al terminar, no después de cada ejemplo.",
    "examples": [
      {
        "id": "pyspark/spark-session/configuracion-y-ciclo-de-vida/1",
        "title": "Ajustar particiones de shuffle",
        "language": "python",
        "code": "spark.conf.set(\"spark.sql.shuffle.partitions\", \"4\")\nprint(spark.conf.get(\"spark.sql.shuffle.partitions\"))",
        "hint": "",
        "textOutput": "`4`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/spark-session/cerrar-la-sesion",
    "remember": "No ejecutes stop antes de terminar las demás fichas.",
    "note": "Ejecutar únicamente al terminar el trabajo.",
    "examples": [
      {
        "id": "pyspark/spark-session/cerrar-la-sesion/1",
        "title": "Finalizar una aplicación",
        "language": "python",
        "code": "spark.stop()",
        "hint": "",
        "textOutput": "La sesión deja de poder ejecutar consultas; vuelve a ejecutar la preparación para continuar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
