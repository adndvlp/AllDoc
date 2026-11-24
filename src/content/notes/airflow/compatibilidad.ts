// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/compatibilidad/definicion",
    "remember": "No mezcles imports y comandos de versiones distintas en un mismo ejemplo.",
    "examples": [
      {
        "id": "airflow/compatibilidad/definicion/1",
        "title": "Identificar versión instalada",
        "language": "bash",
        "code": "airflow version",
        "hint": "Consulta documentación de esa versión y de los providers.",
        "textOutput": "Muestra la versión real.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/compatibilidad/imports-y-operators",
    "remember": "Migra imports y revisa parámetros eliminados.",
    "examples": [
      {
        "id": "airflow/compatibilidad/imports-y-operators/1",
        "title": "Comparar imports de tareas y BashOperator",
        "language": "python",
        "code": "# Airflow 2.10:\n# from airflow.decorators import dag, task\n# from airflow.operators.bash import BashOperator\n# Airflow 3:\nfrom airflow.sdk import dag, task\nfrom airflow.providers.standard.operators.bash import BashOperator",
        "hint": "El bloque es de nivel superior; descomenta solo la variante de tu entorno.",
        "textOutput": "En Airflow 3 con provider standard se importan las clases de la variante activa.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/compatibilidad/datasets-assets-y-scheduling",
    "remember": "Revisa schedule y timetable durante migraciones, no solo los nombres de clases.",
    "examples": [
      {
        "id": "airflow/compatibilidad/datasets-assets-y-scheduling/1",
        "title": "Comparar identidades de datos",
        "language": "python",
        "code": "# Airflow 2.10:\n# from airflow.datasets import Dataset\n# ventas = Dataset(\"s3://bucket/ventas.csv\")\n# Airflow 3:\nfrom airflow.sdk import Asset\nventas = Asset(\"s3://bucket/ventas.csv\")",
        "hint": "Adapta también productores y consumidores al migrar.",
        "textOutput": "La declaración crea una identidad de datos, no un archivo en S3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/compatibilidad/webserver-backfill-y-api",
    "remember": "Comprueba help y no ejecutes comandos administrativos antiguos a ciegas.",
    "examples": [
      {
        "id": "airflow/compatibilidad/webserver-backfill-y-api/1",
        "title": "Inspeccionar comandos de Airflow 3",
        "language": "bash",
        "code": "airflow api-server --help\nairflow backfill create --help",
        "hint": "En Airflow 2.10, consulta airflow webserver y airflow dags backfill; API /api/v1.",
        "textOutput": "Muestra opciones del API Server y backfill de Airflow 3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/compatibilidad/migracion-y-funcionalidades-removidas",
    "remember": "Valida dependencias y cambios de comportamiento antes de actualizar metadatos.",
    "examples": [
      {
        "id": "airflow/compatibilidad/migracion-y-funcionalidades-removidas/1",
        "title": "Preparar una migración desde 2.10",
        "code": "",
        "steps": [
          "Inventaría imports, SubDAGs, SLA, schedule y API v1.",
          "Sustituye por TaskGroups, Deadline Alerts cuando aplique y API v2.",
          "Ejecuta las comprobaciones recomendadas de compatibilidad.",
          "Prueba una copia de la metadata DB en staging."
        ],
        "external": true,
        "hint": "Usa la guía oficial de actualización y un plan de reversión.",
        "textOutput": "Los DAGs migrados se importan y pasan las pruebas de ejecución.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
