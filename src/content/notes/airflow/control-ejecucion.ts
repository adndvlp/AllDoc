// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/control-ejecucion/definicion",
    "remember": "Una excepción no capturada marca un intento como fallido.",
    "examples": [
      {
        "id": "airflow/control-ejecucion/definicion/1",
        "title": "Provocar un fallo controlado",
        "language": "python",
        "code": "@task(retries=0)\ndef validar():\n    raise ValueError(\"Falta columna amount\")\nvalidar()",
        "hint": "El error se registra en Logs.",
        "textOutput": "La tarea y el run de una sola tarea quedan failed.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/control-ejecucion/retries-y-retry-delay",
    "remember": "Un reintento repite el cuerpo de la tarea, incluidos efectos secundarios.",
    "examples": [
      {
        "id": "airflow/control-ejecucion/retries-y-retry-delay/1",
        "title": "Reintentar una conexión fallida",
        "language": "python",
        "code": "@task(retries=2, retry_delay=timedelta(seconds=10))\ndef conectar():\n    raise ConnectionError(\"Servicio no disponible\")\nconectar()",
        "hint": "Es un fallo deliberado para observar up_for_retry.",
        "textOutput": "Hasta tres intentos en total; finalmente failed.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/control-ejecucion/retry-exponential-backoff",
    "remember": "Define un límite de espera apropiado.",
    "examples": [
      {
        "id": "airflow/control-ejecucion/retry-exponential-backoff/1",
        "title": "Espaciar los reintentos",
        "language": "python",
        "code": "@task(retries=3, retry_delay=timedelta(seconds=10), retry_exponential_backoff=True, max_retry_delay=timedelta(minutes=1))\ndef consultar():\n    raise ConnectionError(\"Temporal\")\nconsultar()",
        "hint": "No asumas que las esperas son exactamente 10, 20 y 40 segundos; existe variación.",
        "textOutput": "Se observan esperas calculadas entre intentos con límite de un minuto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/control-ejecucion/execution-timeout",
    "remember": "No equivale al timeout total de un sensor ni al deadline de un DAG.",
    "examples": [
      {
        "id": "airflow/control-ejecucion/execution-timeout/1",
        "title": "Interrumpir una tarea lenta",
        "language": "python",
        "code": "@task(execution_timeout=timedelta(seconds=2), retries=0)\ndef lenta():\n    import time\n    time.sleep(10)\nlenta()",
        "hint": "Ejemplo deliberado de timeout.",
        "textOutput": "El intento falla por exceder el límite configurado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/control-ejecucion/depends-on-past",
    "remember": "No es una dependencia hacia otra tarea del mismo run.",
    "examples": [
      {
        "id": "airflow/control-ejecucion/depends-on-past/1",
        "title": "Evitar saltar una carga histórica",
        "language": "python",
        "code": "# En el encabezado: schedule=\"@daily\", catchup=True\nEmptyOperator(task_id=\"cargar\", depends_on_past=True)",
        "hint": "Para observarlo sustituye EmptyOperator por una tarea que falle en un día controlado.",
        "textOutput": "Si falla la instancia anterior, la siguiente puede quedar bloqueada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/control-ejecucion/estados-de-task-instance",
    "remember": "Distingue un fallo propio de un fallo de un antecedente.",
    "examples": [
      {
        "id": "airflow/control-ejecucion/estados-de-task-instance/1",
        "title": "Observar un antecedente fallido",
        "language": "python",
        "code": "@task(retries=0)\ndef falla():\n    raise ValueError(\"inválido\")\nfalla() >> EmptyOperator(task_id=\"despues\")",
        "hint": "Revisa ambos estados en Grid.",
        "textOutput": "falla queda failed; despues queda upstream_failed con la regla predeterminada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
