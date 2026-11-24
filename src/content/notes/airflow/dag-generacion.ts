// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/dag-generacion/definicion",
    "remember": "Usa orden estable y evita consultas de red durante el parsing.",
    "examples": [
      {
        "id": "airflow/dag-generacion/definicion/1",
        "title": "Generar tareas por país",
        "language": "python",
        "code": "for pais in sorted([\"MX\", \"ES\"]):\n    EmptyOperator(task_id=f\"cargar_{pais.lower()}\")",
        "hint": "No es dynamic task mapping: la cantidad ya se conoce al construir el grafo.",
        "textOutput": "Aparecen cargar_es y cargar_mx desde el momento de importación.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/dag-generacion/dag-factories",
    "remember": "Registra IDs únicos y genera la misma estructura para la misma configuración.",
    "examples": [
      {
        "id": "airflow/dag-generacion/dag-factories/1",
        "title": "Crear dos flujos independientes",
        "language": "python",
        "code": "def fabrica(pais):\n    with DAG(f\"ventas_{pais.lower()}\", schedule=None, start_date=pendulum.datetime(2026,9,1,tz=\"UTC\"), catchup=False) as d:\n        EmptyOperator(task_id=\"procesar\")\n    return d\nfor pais in [\"MX\", \"ES\"]:\n    globals()[f\"ventas_{pais.lower()}\"] = fabrica(pais)",
        "hint": "Código de nivel superior, fuera del encabezado with; no hay lecturas externas.",
        "textOutput": "Se registran ventas_mx y ventas_es.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/dag-generacion/configuracion-declarativa",
    "remember": "Valida la configuración y no la consultes en una API durante parsing.",
    "examples": [
      {
        "id": "airflow/dag-generacion/configuracion-declarativa/1",
        "title": "Generar nodos desde configuración",
        "language": "python",
        "code": "config = [{\"pais\": \"MX\", \"activo\": True}, {\"pais\": \"ES\", \"activo\": False}]\nfor item in config:\n    if item[\"activo\"]:\n        EmptyOperator(task_id=f\"procesar_{item['pais'].lower()}\")",
        "hint": "La misma idea puede utilizar un archivo local versionado junto al DAG.",
        "textOutput": "Solo se crea procesar_mx.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
