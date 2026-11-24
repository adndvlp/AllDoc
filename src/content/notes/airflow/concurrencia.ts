// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/concurrencia/definicion",
    "remember": "Elegible no significa que haya capacidad disponible.",
    "examples": [
      {
        "id": "airflow/concurrencia/definicion/1",
        "title": "Limitar runs de un DAG",
        "language": "python",
        "code": "# En el encabezado: max_active_runs=1\nEmptyOperator(task_id=\"cargar\")",
        "hint": "Útil para evitar escrituras concurrentes sobre el mismo recurso.",
        "textOutput": "Solo un run activo del DAG a la vez según el límite.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/concurrencia/parallelism-y-max-active-tasks",
    "remember": "Los límites actúan conjuntamente con el executor y pools.",
    "examples": [
      {
        "id": "airflow/concurrencia/parallelism-y-max-active-tasks/1",
        "title": "Limitar tareas del flujo",
        "language": "python",
        "code": "# En el encabezado: max_active_tasks=2\nfor i in range(4):\n    EmptyOperator(task_id=f\"carga_{i}\")",
        "hint": "Comprueba el límite global con airflow config get-value core parallelism.",
        "textOutput": "Como máximo dos instancias de este DAG en ejecución simultánea según el límite.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/concurrencia/limites-por-tarea",
    "remember": "Usa límites específicos para tareas que compiten por el mismo recurso.",
    "examples": [
      {
        "id": "airflow/concurrencia/limites-por-tarea/1",
        "title": "Limitar cargas de una tabla",
        "language": "python",
        "code": "EmptyOperator(task_id=\"cargar_tabla\", max_active_tis_per_dag=1)",
        "hint": "La tarea vacía representa una escritura exclusiva.",
        "textOutput": "Una instancia de esa tarea puede correr a la vez entre runs.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/concurrencia/pools-y-pool-slots",
    "remember": "Un pool limita capacidad, no orden de dependencias.",
    "examples": [
      {
        "id": "airflow/concurrencia/pools-y-pool-slots/1",
        "title": "Proteger una base de datos",
        "language": "python",
        "code": "# Antes, en terminal: airflow pools set ventas_db 2 \"Conexiones de laboratorio\"\nEmptyOperator(task_id=\"consulta_grande\", pool=\"ventas_db\", pool_slots=2)\nEmptyOperator(task_id=\"consulta_pequena\", pool=\"ventas_db\")",
        "hint": "Crea el pool antes de ejecutar el DAG.",
        "textOutput": "Las dos tareas no pueden ocupar el pool simultáneamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/concurrencia/priority-weight",
    "remember": "No es una garantía de orden absoluto.",
    "examples": [
      {
        "id": "airflow/concurrencia/priority-weight/1",
        "title": "Priorizar una publicación",
        "language": "python",
        "code": "EmptyOperator(task_id=\"urgente\", priority_weight=10, weight_rule=\"absolute\")\nEmptyOperator(task_id=\"normal\", priority_weight=1, weight_rule=\"absolute\")",
        "hint": "El scheduler puede agrupar decisiones; no uses prioridad como dependencia.",
        "textOutput": "Si ambas compiten por recursos, urgente tiene mayor prioridad configurada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/concurrencia/queues",
    "remember": "Debe existir un worker que consuma la cola elegida.",
    "examples": [
      {
        "id": "airflow/concurrencia/queues/1",
        "title": "Separar tareas de procesamiento pesado",
        "language": "python",
        "code": "EmptyOperator(task_id=\"pesada\", queue=\"batch\")",
        "hint": "No tiene ese efecto en todos los executors; requiere infraestructura Celery.",
        "textOutput": "En Celery configurado con esa cola, la tarea se envía a batch.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
