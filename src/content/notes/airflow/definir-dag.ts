// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/definir-dag/definicion",
    "remember": "El dag_id debe ser único dentro del entorno.",
    "examples": [
      {
        "id": "airflow/definir-dag/definicion/1",
        "title": "Crear un DAG manual completo",
        "language": "python",
        "code": "from airflow.sdk import DAG\nfrom airflow.providers.standard.operators.empty import EmptyOperator\nimport pendulum\nwith DAG(\"ventas_manual\", start_date=pendulum.datetime(2026,9,1,tz=\"UTC\"), schedule=None, catchup=False):\n    EmptyOperator(task_id=\"inicio\")",
        "hint": "Guarda el bloque completo al nivel superior en su propio archivo.",
        "textOutput": "Aparece ventas_manual con una tarea y sin programación automática.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/definir-dag/dag",
    "remember": "Invoca la función decorada para crear el DAG.",
    "examples": [
      {
        "id": "airflow/definir-dag/dag/1",
        "title": "Crear un DAG con decorador",
        "language": "python",
        "code": "@dag(dag_id=\"ventas_decorador\", schedule=None, start_date=pendulum.datetime(2026,9,1,tz=\"UTC\"), catchup=False)\ndef ventas():\n    EmptyOperator(task_id=\"inicio\")\nventas()",
        "hint": "Código de nivel superior después de los imports compartidos, fuera del with.",
        "textOutput": "Se registra ventas_decorador.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/definir-dag/identificadores-y-tags",
    "remember": "No confundas el nombre de una variable Python con el task_id.",
    "examples": [
      {
        "id": "airflow/definir-dag/identificadores-y-tags/1",
        "title": "Etiquetar un flujo",
        "language": "python",
        "code": "# En el encabezado del DAG:\n# tags=[\"ventas\", \"diario\"], description=\"Reporte de ventas\"\njob = EmptyOperator(task_id=\"cargar_pedidos\")",
        "hint": "job solo es la variable Python que apunta a la tarea.",
        "textOutput": "La tarea se llama cargar_pedidos; al configurar tags aparecen filtros de catálogo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/definir-dag/default-args",
    "remember": "Un parámetro explícito de la tarea tiene prioridad.",
    "examples": [
      {
        "id": "airflow/definir-dag/default-args/1",
        "title": "Compartir una política de reintentos",
        "language": "python",
        "code": "# En el encabezado del DAG:\n# default_args={\"retries\": 2, \"retry_delay\": timedelta(minutes=5)}\na = EmptyOperator(task_id=\"a\")\nb = EmptyOperator(task_id=\"b\", retries=0)",
        "hint": "Los argumentos comentados deben añadirse al constructor DAG.",
        "textOutput": "a hereda dos reintentos; b no reintenta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/definir-dag/documentacion-del-dag-y-tareas",
    "remember": "Explica entradas, salidas y responsables junto al flujo.",
    "examples": [
      {
        "id": "airflow/definir-dag/documentacion-del-dag-y-tareas/1",
        "title": "Documentar la carga",
        "language": "python",
        "code": "demo.doc_md = \"# Ventas\\nCarga de pedidos diarios\"\nEmptyOperator(task_id=\"load\", doc_md=\"Valida y carga el lote\")",
        "hint": "doc_md admite Markdown.",
        "textOutput": "La documentación queda disponible en los detalles del DAG y de la tarea.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
