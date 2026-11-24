// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/operacion/definicion",
    "remember": "Usa interfaces públicas y controla los permisos de operación.",
    "examples": [
      {
        "id": "airflow/operacion/definicion/1",
        "title": "Listar DAGs",
        "language": "bash",
        "code": "airflow dags list",
        "hint": "El listado depende de los archivos procesados.",
        "textOutput": "Lista los DAGs disponibles en el entorno.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/operacion/grid-y-graph",
    "remember": "Usa Grid para historial y Graph para entender bloqueos.",
    "examples": [
      {
        "id": "airflow/operacion/grid-y-graph/1",
        "title": "Localizar la causa de un fallo",
        "code": "",
        "steps": [
          "Abre un DAG con varias tareas.",
          "En Grid selecciona un run fallido.",
          "Abre Graph y localiza el antecedente failed.",
          "Abre Logs de esa instancia."
        ],
        "external": true,
        "hint": "upstream_failed no implica que el cuerpo de esa tarea haya corrido.",
        "textOutput": "Se observa la dependencia que impide ejecutar las tareas posteriores.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/operacion/logs-y-rendered-templates",
    "remember": "Consulta el run y el intento correctos antes de diagnosticar.",
    "examples": [
      {
        "id": "airflow/operacion/logs-y-rendered-templates/1",
        "title": "Inspeccionar el comando de una tarea",
        "code": "",
        "steps": [
          "Ejecuta la ficha de BashOperator con env templado.",
          "Abre la instancia y su vista de plantillas renderizadas si está disponible.",
          "Compara con Logs."
        ],
        "external": true,
        "hint": "No expongas campos que puedan contener secretos.",
        "textOutput": "El identificador del run se observa en el parámetro renderizado o en el log.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/operacion/pause-unpause-y-trigger",
    "remember": "Pausar no equivale a cancelar una tarea en ejecución.",
    "examples": [
      {
        "id": "airflow/operacion/pause-unpause-y-trigger/1",
        "title": "Activar y disparar un DAG",
        "language": "bash",
        "code": "airflow dags unpause ventas_manual\nairflow dags trigger ventas_manual",
        "hint": "Crea antes ventas_manual.",
        "textOutput": "El DAG queda activo y se crea una ejecución manual.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/operacion/rest-api-v2",
    "remember": "En Airflow 3 las rutas públicas son /api/v2; no uses endpoints internos de la UI.",
    "note": "Requiere API activa y autenticación configurada.",
    "examples": [
      {
        "id": "airflow/operacion/rest-api-v2/1",
        "title": "Consultar DAGs mediante API",
        "language": "bash",
        "code": "curl -fsS -H \"Authorization: Bearer $AIRFLOW_TOKEN\" http://localhost:8080/api/v2/dags",
        "hint": "Obtén AIRFLOW_TOKEN mediante el auth manager de tu entorno; no lo incluyas en el documento ni en logs.",
        "textOutput": "JSON con DAGs accesibles al usuario si el token es válido.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
