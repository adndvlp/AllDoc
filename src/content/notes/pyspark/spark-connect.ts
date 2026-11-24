// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/spark-connect/definicion",
    "remember": "No requiere acceder directamente a la JVM del servidor ni expone RDD/SparkContext como Spark clásico.",
    "note": "Ejemplo externo: iniciar un servidor Spark Connect compatible, instalar dependencias cliente y ejecutar en un proceso separado sin la sesión clásica preparada.",
    "examples": [
      {
        "id": "pyspark/spark-connect/definicion/1",
        "title": "Conectar con un servidor de prueba",
        "language": "python",
        "code": "from pyspark.sql import SparkSession\nremote_spark = SparkSession.builder.remote(\"sc://localhost:15002\").getOrCreate()\nremote_spark.range(3).show()",
        "hint": "",
        "textOutput": "id=0,1,2 si el servidor está activo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/spark-connect/sesiones-y-compatibilidad",
    "remember": "Comprueba compatibilidad antes de trasladar código que usa SparkContext o internals JVM.",
    "note": "Ejecutar tras la ficha de conexión, no sobre la sesión local spark.",
    "examples": [
      {
        "id": "pyspark/spark-connect/sesiones-y-compatibilidad/1",
        "title": "Consultar versión remota",
        "language": "python",
        "code": "print(remote_spark.version)\nremote_spark.stop()",
        "hint": "",
        "textOutput": "La versión del servidor y cierre de la sesión del cliente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
