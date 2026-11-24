// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/alertas/definicion",
    "remember": "No confundas un callback con una tarea del grafo.",
    "examples": [
      {
        "id": "airflow/alertas/definicion/1",
        "title": "Registrar un fallo",
        "language": "python",
        "code": "def avisar(context):\n    logging.error(\"Falló %s\", context[\"task_instance\"].task_id)\n@task(on_failure_callback=avisar, retries=0)\ndef cargar():\n    raise RuntimeError(\"fallo de prueba\")\ncargar()",
        "hint": "Los errores del callback se buscan en logs del componente correspondiente; cambios manuales de estado no disparan todos los callbacks.",
        "textOutput": "Se invoca avisar al fallar la tarea durante ejecución.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/alertas/callbacks-de-exito-y-reintento",
    "remember": "Un reintento no es todavía el fallo definitivo.",
    "examples": [
      {
        "id": "airflow/alertas/callbacks-de-exito-y-reintento/1",
        "title": "Registrar éxito",
        "language": "python",
        "code": "def ok(context):\n    logging.info(\"Éxito: %s\", context[\"task_instance\"].task_id)\nEmptyOperator(task_id=\"validar\", on_success_callback=ok)",
        "hint": "El callback no tiene nodo propio.",
        "textOutput": "Se genera un mensaje de éxito al terminar la tarea.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/alertas/notifiers",
    "remember": "No incluyas tokens en el DAG.",
    "examples": [
      {
        "id": "airflow/alertas/notifiers/1",
        "title": "Configurar alertas de Slack",
        "code": "",
        "steps": [
          "Instala el provider slack compatible.",
          "Crea una conexión Slack de prueba.",
          "Usa su notifier documentado como on_failure_callback.",
          "Ejecuta una tarea que lance una excepción."
        ],
        "external": true,
        "hint": "Es un procedimiento condicionado a un servicio externo real.",
        "textOutput": "Se entrega una alerta al canal configurado si la integración tiene permisos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/alertas/deadline-alerts-y-sla",
    "remember": "Una alerta no equivale necesariamente a cancelar tareas.",
    "examples": [
      {
        "id": "airflow/alertas/deadline-alerts-y-sla/1",
        "title": "Alertar por un run que tarda demasiado",
        "code": "",
        "steps": [
          "En Airflow 3.1+, configura DeadlineAlert con una referencia, un intervalo y callback compatibles con la versión.",
          "Prueba un DAG cuya tarea tarde más que el intervalo.",
          "Observa la invocación del callback y el estado del run."
        ],
        "external": true,
        "hint": "API experimental desde 3.1; usa la guía versionada de Deadline Alerts. No reutilices sla de Airflow 2.",
        "textOutput": "Se dispara una alerta al exceder el umbral si el componente está operativo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
