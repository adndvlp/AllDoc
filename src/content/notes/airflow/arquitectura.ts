// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/arquitectura/definicion",
    "remember": "El scheduler decide; el executor coordina; los workers ejecutan.",
    "examples": [
      {
        "id": "airflow/arquitectura/definicion/1",
        "title": "Seguir un pedido desde el grafo hasta su ejecución",
        "code": "",
        "steps": [
          "Activa un DAG de prueba.",
          "Dispara una ejecución.",
          "Abre Grid y Logs."
        ],
        "external": true,
        "hint": "La UI lee estados persistidos y logs; no ejecuta directamente la lógica de negocio.",
        "textOutput": "Se observa un DAG Run y sus instancias de tarea.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/arquitectura/scheduler-y-executor",
    "remember": "Una tarea scheduled no significa que esté running.",
    "examples": [
      {
        "id": "airflow/arquitectura/scheduler-y-executor/1",
        "title": "Identificar el executor configurado",
        "language": "bash",
        "code": "airflow config get-value core executor",
        "hint": "El resultado depende del entorno.",
        "textOutput": "Nombre del executor efectivo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/arquitectura/dag-processor-y-serializacion",
    "remember": "El código al nivel superior se ejecuta durante el parsing, no solo al lanzar una tarea.",
    "examples": [
      {
        "id": "airflow/arquitectura/dag-processor-y-serializacion/1",
        "title": "Comprobar un DAG importado",
        "language": "bash",
        "code": "airflow dags list\nairflow dags list-import-errors",
        "hint": "La importación no equivale a una ejecución de sus tareas.",
        "textOutput": "El DAG aparece y no tiene errores si su código es válido.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/arquitectura/api-server-y-task-execution-api",
    "remember": "Usa airflow.sdk y APIs públicas, no tablas internas.",
    "examples": [
      {
        "id": "airflow/arquitectura/api-server-y-task-execution-api/1",
        "title": "Inspeccionar una ejecución",
        "code": "",
        "steps": [
          "Abre Grid en la UI.",
          "Abre una instancia y consulta su estado."
        ],
        "external": true,
        "hint": "En Airflow 2 se denominaba webserver al componente web y la arquitectura era distinta.",
        "textOutput": "Se muestran estado y duración de esa instancia.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/arquitectura/metadata-database",
    "remember": "No es tu data warehouse.",
    "examples": [
      {
        "id": "airflow/arquitectura/metadata-database/1",
        "title": "Comprobar conectividad de metadatos",
        "language": "bash",
        "code": "airflow db check",
        "hint": "No consulta los pedidos de negocio.",
        "textOutput": "Comprobación correcta si la base está accesible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/arquitectura/triggerer",
    "remember": "Una tarea deferred puede liberar su worker mientras espera.",
    "examples": [
      {
        "id": "airflow/arquitectura/triggerer/1",
        "title": "Observar una espera diferible",
        "code": "",
        "steps": [
          "Configura un sensor compatible con deferrable=True.",
          "Dispara el DAG antes de que exista su recurso.",
          "Observa Grid y luego crea el recurso."
        ],
        "external": true,
        "hint": "Se necesita un triggerer activo y un sensor compatible.",
        "textOutput": "La tarea puede pasar a deferred y reanudarse al cumplirse la condición.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
