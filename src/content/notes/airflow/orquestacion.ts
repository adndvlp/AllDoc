// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/orquestacion/definicion",
    "remember": "Airflow decide cuándo ejecutar y en qué orden, no sustituye al motor de procesamiento.",
    "examples": [
      {
        "id": "airflow/orquestacion/definicion/1",
        "title": "Coordinar extracción y reporte",
        "language": "python",
        "code": "extraer = EmptyOperator(task_id=\"extraer\")\nreportar = EmptyOperator(task_id=\"reportar\")\nextraer >> reportar",
        "hint": "La flecha define una dependencia, no transfiere datos.",
        "textOutput": "El grafo muestra extraer → reportar; son tareas vacías de demostración.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/orquestacion/dag-y-aciclicidad",
    "remember": "Una tarea no puede depender de sí misma directa ni indirectamente.",
    "examples": [
      {
        "id": "airflow/orquestacion/dag-y-aciclicidad/1",
        "title": "Representar un flujo de ventas",
        "language": "python",
        "code": "a = EmptyOperator(task_id=\"extract\")\nb = EmptyOperator(task_id=\"transform\")\nc = EmptyOperator(task_id=\"load\")\na >> b >> c",
        "hint": "Cada nodo puede representar un paso distinto de negocio.",
        "textOutput": "Tres nodos en secuencia en Graph.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/orquestacion/etl-y-elt",
    "remember": "El orden de las dependencias expresa el patrón.",
    "examples": [
      {
        "id": "airflow/orquestacion/etl-y-elt/1",
        "title": "Comparar dos patrones",
        "language": "python",
        "code": "extract = EmptyOperator(task_id=\"extract\")\ntransform = EmptyOperator(task_id=\"transform\")\nload = EmptyOperator(task_id=\"load\")\nextract >> load >> transform",
        "hint": "Para ETL, coloca transform antes de load; los nodos son ilustrativos.",
        "textOutput": "El flujo corresponde a ELT.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/orquestacion/procesamiento-batch",
    "remember": "Una ejecución debe tener una unidad de trabajo finita.",
    "examples": [
      {
        "id": "airflow/orquestacion/procesamiento-batch/1",
        "title": "Procesar un día de pedidos",
        "language": "python",
        "code": "@task\ndef batch():\n    with open(\"/tmp/alldoc_airflow/orders.csv\") as f:\n        return sum(r[\"order_date\"] == \"2026-09-01\" for r in csv.DictReader(f))\nbatch()",
        "hint": "La fecha delimita un lote.",
        "textOutput": "El XCom de retorno vale 2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
