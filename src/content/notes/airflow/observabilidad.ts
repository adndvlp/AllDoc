// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/observabilidad/definicion",
    "remember": "Distingue errores de datos de errores de infraestructura.",
    "examples": [
      {
        "id": "airflow/observabilidad/definicion/1",
        "title": "Registrar métricas de negocio en logs",
        "language": "python",
        "code": "@task\ndef registrar():\n    logging.info(\"filas=%s ventas=%s\", 4, 3000)\nregistrar()",
        "hint": "Usa logging en lugar de imprimir credenciales o datasets completos.",
        "textOutput": "El log contiene filas=4 ventas=3000.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/observabilidad/health-checks-y-heartbeats",
    "remember": "Un HTTP 200 por sí solo no garantiza que todos los componentes estén saludables.",
    "examples": [
      {
        "id": "airflow/observabilidad/health-checks-y-heartbeats/1",
        "title": "Consultar salud local",
        "language": "bash",
        "code": "curl -fsS http://localhost:8080/api/v2/monitor/health",
        "hint": "Inspecciona los campos, no solo el código HTTP.",
        "textOutput": "JSON con estado de componentes según despliegue y configuración.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/observabilidad/tareas-huerfanas-y-timeout-de-heartbeat",
    "remember": "No confundas una tarea lenta con una tarea que dejó de reportar actividad.",
    "examples": [
      {
        "id": "airflow/observabilidad/tareas-huerfanas-y-timeout-de-heartbeat/1",
        "title": "Diagnosticar una instancia running sin progreso",
        "code": "",
        "steps": [
          "Revisa logs del worker y el scheduler.",
          "Comprueba si el proceso o pod sigue vivo y si reporta heartbeat.",
          "Espera la reconciliación o aplica clearing selectivo tras comprobar efectos secundarios."
        ],
        "external": true,
        "hint": "No borres metadatos ni fuerces éxito para ocultar el problema.",
        "textOutput": "Se identifica si la instancia perdió su proceso o continúa ejecutándose.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/observabilidad/metricas-y-alertas-de-infraestructura",
    "remember": "Monitoriza latencia de planificación, duración, cola y capacidad de pools.",
    "examples": [
      {
        "id": "airflow/observabilidad/metricas-y-alertas-de-infraestructura/1",
        "title": "Definir una alerta por saturación",
        "code": "",
        "steps": [
          "Habilita un backend de métricas según la guía de la versión.",
          "Crea un panel de tareas queued y slots disponibles.",
          "Configura alerta si la cola crece durante una ventana sostenida."
        ],
        "external": true,
        "hint": "Los nombres de métricas y exportadores dependen de versión y despliegue.",
        "textOutput": "El panel muestra presión de capacidad; la alerta se activa al superar el umbral elegido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/observabilidad/remote-logging",
    "remember": "El log debe seguir disponible cuando desaparece el pod.",
    "examples": [
      {
        "id": "airflow/observabilidad/remote-logging/1",
        "title": "Verificar logs de un worker efímero",
        "code": "",
        "steps": [
          "Configura remote_logging y destino remoto con permisos de escritura y lectura.",
          "Ejecuta un DAG en un worker efímero.",
          "Tras su salida, abre sus logs desde la UI."
        ],
        "external": true,
        "hint": "Requiere provider y destino real; no uses rutas locales como almacenamiento remoto.",
        "textOutput": "Los logs siguen recuperables si se escribieron correctamente en el backend.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/observabilidad/analisis-de-causa-raiz",
    "remember": "Reintentar sin entender el fallo puede duplicar efectos.",
    "examples": [
      {
        "id": "airflow/observabilidad/analisis-de-causa-raiz/1",
        "title": "Investigar una carga fallida",
        "code": "",
        "steps": [
          "Identifica el primer task_id failed.",
          "Consulta su log y la versión del DAG.",
          "Comprueba si escribió datos parcialmente.",
          "Corrige la causa y reejecuta el lote de forma idempotente."
        ],
        "external": true,
        "hint": "Documenta el run_id, el fallo, la corrección y la validación final.",
        "textOutput": "Se obtiene una explicación verificable y una recuperación controlada.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
