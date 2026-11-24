// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/executors/definicion",
    "remember": "Escoge según aislamiento, infraestructura, escala y latencia.",
    "examples": [
      {
        "id": "airflow/executors/definicion/1",
        "title": "Inspeccionar la configuración",
        "language": "bash",
        "code": "airflow config get-value core executor\nairflow info",
        "hint": "No cambies de executor en un entorno activo sin plan de migración.",
        "textOutput": "Se muestra el executor efectivo y el entorno.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/executors/localexecutor",
    "remember": "No es un clúster distribuido; considera CPU, memoria y base de metadatos.",
    "examples": [
      {
        "id": "airflow/executors/localexecutor/1",
        "title": "Configurar ejecución local",
        "language": "text",
        "code": "AIRFLOW__CORE__EXECUTOR=LocalExecutor",
        "hint": "Es configuración de entorno, no una orden para ejecutar en el DAG. Para producción usa una base soportada.",
        "textOutput": "Los procesos usan LocalExecutor al arrancar con configuración y base compatibles.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/executors/celeryexecutor",
    "remember": "Todos los workers deben tener código y dependencias compatibles.",
    "examples": [
      {
        "id": "airflow/executors/celeryexecutor/1",
        "title": "Comprobar un worker Celery",
        "code": "",
        "steps": [
          "Despliega broker Redis o RabbitMQ, base de metadatos y provider celery.",
          "Configura CeleryExecutor y arranca workers.",
          "Lanza un DAG de prueba y revisa la cola y logs del worker."
        ],
        "external": true,
        "hint": "Usa el procedimiento de despliegue oficial y conexiones protegidas.",
        "textOutput": "Las tareas se ejecutan en workers que consumen su cola.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/executors/kubernetesexecutor",
    "remember": "El pod necesita imagen, código, secretos y acceso a sus datos.",
    "examples": [
      {
        "id": "airflow/executors/kubernetesexecutor/1",
        "title": "Observar pods de tarea",
        "language": "bash",
        "code": "kubectl get pods -n airflow",
        "hint": "Requiere clúster, provider cncf-kubernetes y KubernetesExecutor configurado; los pods pueden borrarse al terminar.",
        "textOutput": "Aparecen pods de los componentes y, durante ejecuciones, pods de tarea según configuración.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
