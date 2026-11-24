// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/pipelines-declarativos/definicion",
    "remember": "Una función declarativa devuelve un DataFrame; no debe ejecutar acciones ni escrituras manuales.",
    "note": "Ejemplo de módulo de pipeline, no notebook aislado; requiere proyecto SDP y tabla persistente orders_input con los datos compartidos. El entorno SDP proporciona spark.",
    "examples": [
      {
        "id": "pyspark/pipelines-declarativos/definicion/1",
        "title": "Definir una vista materializada",
        "language": "python",
        "code": "from pyspark import pipelines as dp\nfrom pyspark.sql import functions as F\n@dp.materialized_view\ndef customer_totals():\n    return spark.read.table(\"orders_input\").groupBy(\"customer_id\").agg(F.sum(\"amount\").alias(\"total\"))",
        "hint": "",
        "textOutput": "Al ejecutar el pipeline, se publica customer_totals con una fila por cliente. Para los orders compartidos: 700,1000,900.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/pipelines-declarativos/streaming-tables-temporary-views-y-flows",
    "remember": "No confundas las APIs de Apache Spark con extensiones específicas de Databricks.",
    "note": "En un proyecto SDP define events_path con la ruta accesible a los datos de prueba; no llamar start() en la función.",
    "examples": [
      {
        "id": "pyspark/pipelines-declarativos/streaming-tables-temporary-views-y-flows/1",
        "title": "Definir una tabla incremental",
        "language": "python",
        "code": "from pyspark import pipelines as dp\n@dp.table\ndef incoming_orders():\n    return spark.readStream.schema(\"id INT, amount INT\").json(events_path)",
        "hint": "",
        "textOutput": "El pipeline ingiere los registros nuevos del directorio events_path, si el origen está configurado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/pipelines-declarativos/cli-y-validacion",
    "remember": "Primero valida en un catálogo aislado; la ejecución crea o actualiza datasets.",
    "note": "Terminal: ejecutar desde un proyecto creado con spark-pipelines init y configurado según la guía oficial de Spark 4.1.",
    "examples": [
      {
        "id": "pyspark/pipelines-declarativos/cli-y-validacion/1",
        "title": "Validar un proyecto",
        "language": "bash",
        "code": "spark-pipelines dry-run",
        "hint": "",
        "textOutput": "Se valida el grafo/configuración del proyecto sin materializar sus resultados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/pipelines-declarativos/vista-temporal-y-dependencias",
    "remember": "El motor infiere dependencias por referencias a datasets.",
    "note": "Mismo proyecto SDP y tabla de entrada que en la ficha de definición.",
    "examples": [
      {
        "id": "pyspark/pipelines-declarativos/vista-temporal-y-dependencias/1",
        "title": "Declarar limpieza intermedia",
        "language": "python",
        "code": "from pyspark import pipelines as dp\n@dp.temporary_view\ndef clean_orders():\n    return spark.read.table(\"orders_input\").where(\"amount > 0\")",
        "hint": "",
        "textOutput": "El grafo incluye clean_orders con 6 filas para los datos compartidos; puede ser consumido por otros nodos del pipeline.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
