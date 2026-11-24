// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/dag-runs/definicion",
    "remember": "Identifica un run por dag_id y run_id, no por la hora a la que lo miras.",
    "examples": [
      {
        "id": "airflow/dag-runs/definicion/1",
        "title": "Crear una ejecución manual",
        "language": "bash",
        "code": "airflow dags trigger alldoc_ejemplo",
        "hint": "Usa el ID real del archivo y activa el DAG.",
        "textOutput": "Se crea un run nuevo si el DAG existe; el scheduler gestiona sus tareas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/dag-runs/logical-date-e-intervalo-de-datos",
    "remember": "No uses la hora actual como sustituto del intervalo.",
    "examples": [
      {
        "id": "airflow/dag-runs/logical-date-e-intervalo-de-datos/1",
        "title": "Mostrar el intervalo de un run diario",
        "language": "python",
        "code": "@task\ndef intervalo():\n    ctx = get_current_context()\n    print(ctx.get(\"logical_date\"), ctx.get(\"data_interval_start\"), ctx.get(\"data_interval_end\"))\nintervalo()",
        "hint": "Usa el timetable de la ficha anterior; runs manuales o por assets pueden no tener intervalo o fecha lógica.",
        "textOutput": "En un run de CronDataIntervalTimetable para 1 de septiembre se espera [2026-09-01, 2026-09-02) UTC.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/dag-runs/catchup",
    "remember": "catchup=False no elimina runs existentes ni impide backfills manuales.",
    "examples": [
      {
        "id": "airflow/dag-runs/catchup/1",
        "title": "Recuperar días omitidos",
        "language": "python",
        "code": "# En el encabezado: schedule=\"@daily\", catchup=True\nEmptyOperator(task_id=\"carga\")",
        "hint": "Prueba con un periodo corto para evitar cientos de runs.",
        "textOutput": "Al activar un calendario pasado se crean los runs elegibles pendientes, según capacidad y timetable.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/dag-runs/backfill",
    "remember": "Revisa el rango y política de reprocesamiento antes de lanzar.",
    "note": "Airflow 2 usa airflow dags backfill y flags diferentes.",
    "examples": [
      {
        "id": "airflow/dag-runs/backfill/1",
        "title": "Simular tres días de carga",
        "language": "bash",
        "code": "airflow backfill create --dag-id ventas_diarias --from-date 2026-09-01 --to-date 2026-09-03 --reprocess-behavior none --dry-run",
        "hint": "Crea previamente ventas_diarias con schedule diario y fecha inicial anterior al rango; quita --dry-run solo al confirmar.",
        "textOutput": "Lista las fechas candidatas sin crear los runs.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/dag-runs/reprocesamiento-y-clearing",
    "remember": "No confundas reintentar una tarea con crear un run nuevo.",
    "examples": [
      {
        "id": "airflow/dag-runs/reprocesamiento-y-clearing/1",
        "title": "Reejecutar solo la validación",
        "code": "",
        "steps": [
          "Abre Grid y el run fallido.",
          "Selecciona la tarea validar.",
          "Pulsa Clear y revisa las opciones antes de confirmar."
        ],
        "external": true,
        "hint": "Las opciones upstream/downstream amplían el alcance.",
        "textOutput": "La instancia queda disponible para reejecución, sin crear por sí misma un nuevo run.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
