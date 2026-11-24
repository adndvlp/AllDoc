// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/fechas-y-timestamps/definicion",
    "remember": "No analices fechas como texto si necesitas aritmética temporal.",
    "examples": [
      {
        "id": "pyspark/fechas-y-timestamps/definicion/1",
        "title": "Convertir una fecha",
        "language": "python",
        "code": "spark.range(1).select(F.to_date(F.lit(\"2026-09-01\")).alias(\"date\")).printSchema()",
        "hint": "",
        "textOutput": "date de tipo date.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/fechas-y-timestamps/parseo-y-formato",
    "remember": "Formatear no cambia un dato a tipo fecha.",
    "examples": [
      {
        "id": "pyspark/fechas-y-timestamps/parseo-y-formato/1",
        "title": "Extraer etiqueta mensual",
        "language": "python",
        "code": "orders.select(F.date_format(\"order_date\", \"yyyy-MM\").alias(\"month\")).distinct().orderBy(\"month\").show()",
        "hint": "",
        "textOutput": "2026-08, 2026-09.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/fechas-y-timestamps/extraccion-de-componentes",
    "remember": "Agrupa por año y mes para no mezclar años.",
    "examples": [
      {
        "id": "pyspark/fechas-y-timestamps/extraccion-de-componentes/1",
        "title": "Extraer año y trimestre",
        "language": "python",
        "code": "orders.select(F.year(\"order_date\").alias(\"year\"), F.quarter(\"order_date\").alias(\"quarter\")).distinct().show()",
        "hint": "",
        "textOutput": "(2026,3).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/fechas-y-timestamps/diferencias-y-desplazamientos",
    "remember": "Los meses no tienen una duración fija en días.",
    "examples": [
      {
        "id": "pyspark/fechas-y-timestamps/diferencias-y-desplazamientos/1",
        "title": "Calcular plazo",
        "language": "python",
        "code": "spark.range(1).select(F.datediff(F.lit(\"2026-09-10\"), F.lit(\"2026-09-01\")).alias(\"days\"), F.add_months(F.lit(\"2026-01-31\"),1).alias(\"next\")).show()",
        "hint": "",
        "textOutput": "days=9, next=2026-02-28.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/fechas-y-timestamps/trunc-date-trunc-y-last-day",
    "remember": "Usa límites temporales coherentes al agrupar.",
    "examples": [
      {
        "id": "pyspark/fechas-y-timestamps/trunc-date-trunc-y-last-day/1",
        "title": "Obtener inicio de mes",
        "language": "python",
        "code": "orders.select(F.trunc(\"order_date\", \"month\").alias(\"month\")).distinct().orderBy(\"month\").show()",
        "hint": "",
        "textOutput": "2026-08-01, 2026-09-01.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/fechas-y-timestamps/fecha-actual-y-zona-horaria",
    "remember": "Fija UTC para reproducibilidad y evita conversiones dobles.",
    "examples": [
      {
        "id": "pyspark/fechas-y-timestamps/fecha-actual-y-zona-horaria/1",
        "title": "Consultar zona y fecha actual",
        "language": "python",
        "code": "print(spark.conf.get(\"spark.sql.session.timeZone\"))\nspark.range(1).select(F.current_date().alias(\"today\")).show()",
        "hint": "",
        "textOutput": "UTC y la fecha de ejecución en UTC; no hay un día fijo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
