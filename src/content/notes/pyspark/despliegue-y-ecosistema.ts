// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/despliegue-y-ecosistema/definicion",
    "remember": "La API puede ser común; configuración, almacenamiento y versiones no siempre lo son.",
    "examples": [
      {
        "id": "pyspark/despliegue-y-ecosistema/definicion/1",
        "title": "Comprobar dónde corre la aplicación",
        "language": "python",
        "code": "print(spark.sparkContext.master)",
        "hint": "",
        "textOutput": "local[2]; en un cluster aparecería el master configurado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/despliegue-y-ecosistema/spark-submit-y-dependencias",
    "remember": "Las dependencias Python deben estar disponibles también para los workers.",
    "note": "Crea job.py con: from pyspark.sql import SparkSession; s=SparkSession.builder.getOrCreate(); print(s.range(3).count()); s.stop(). Resultado: 3. Ejecutar en terminal, no en Python.",
    "examples": [
      {
        "id": "pyspark/despliegue-y-ecosistema/spark-submit-y-dependencias/1",
        "title": "Lanzar un script de prueba",
        "language": "bash",
        "code": "spark-submit --master \"local[2]\" job.py",
        "hint": "",
        "textOutput": "El script imprime el resultado definido en job.py y finaliza.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/despliegue-y-ecosistema/almacenamiento-distribuido",
    "remember": "Una ruta local del driver puede no existir en workers remotos.",
    "note": "Ejemplo externo: define remote_path con URI real (hdfs://, s3a://, abfss:// o gs://), configura el conector y la identidad autorizada.",
    "examples": [
      {
        "id": "pyspark/despliegue-y-ecosistema/almacenamiento-distribuido/1",
        "title": "Consultar archivo en almacenamiento remoto",
        "language": "python",
        "code": "df = spark.read.parquet(remote_path)\ndf.printSchema()",
        "hint": "",
        "textOutput": "El esquema del dataset remoto si existe y se tienen permisos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/despliegue-y-ecosistema/orquestacion-y-seguridad",
    "remember": "No guardes contraseñas en notebooks ni argumentos visibles de logs.",
    "note": "Airflow, catálogos externos y servicios cloud requieren instalación y permisos propios.",
    "examples": [
      {
        "id": "pyspark/despliegue-y-ecosistema/orquestacion-y-seguridad/1",
        "title": "Diseñar una ejecución diaria",
        "steps": [
          "crear una tarea spark-submit con fecha de proceso",
          "asignar identidad con mínimo privilegio",
          "guardar salida por fecha",
          "comprobar recuentos",
          "configurar reintentos y alertas."
        ],
        "code": "",
        "external": true,
        "hint": "",
        "textOutput": "Un DAG externo ejecuta y monitorea el job; repetir la fecha no duplica datos si el job es idempotente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
