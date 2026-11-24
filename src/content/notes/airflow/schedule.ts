// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/schedule/definicion",
    "remember": "schedule=None permite ejecución manual sin calendario automático.",
    "examples": [
      {
        "id": "airflow/schedule/definicion/1",
        "title": "Crear un flujo diario",
        "language": "python",
        "code": "# En el encabezado del DAG: schedule=\"@daily\"\nEmptyOperator(task_id=\"reporte\")",
        "hint": "El ejemplo requiere cambiar el encabezado.",
        "textOutput": "Con el DAG activo, se crean runs diarios según el calendario y la fecha inicial.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/schedule/cron-y-presets",
    "remember": "Cron usa minuto, hora, día del mes, mes y día de la semana.",
    "examples": [
      {
        "id": "airflow/schedule/cron-y-presets/1",
        "title": "Programar un reporte a las ocho",
        "language": "python",
        "code": "# En el encabezado del DAG: schedule=\"0 8 * * *\"\nEmptyOperator(task_id=\"reporte\")",
        "hint": "No significa ejecutar inmediatamente al activar.",
        "textOutput": "Se programa a las 08:00 de la zona horaria del DAG.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/schedule/intervalos-timedelta",
    "remember": "Usa cron si necesitas una hora civil específica.",
    "examples": [
      {
        "id": "airflow/schedule/intervalos-timedelta/1",
        "title": "Programar cada seis horas",
        "language": "python",
        "code": "# En el encabezado del DAG: schedule=timedelta(hours=6)\nEmptyOperator(task_id=\"actualizar\")",
        "hint": "El punto de partida y el timetable determinan la alineación.",
        "textOutput": "Se crean ejecuciones según intervalos de seis horas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/schedule/start-date-y-end-date",
    "remember": "Usa fechas fijas y conscientes de zona horaria.",
    "examples": [
      {
        "id": "airflow/schedule/start-date-y-end-date/1",
        "title": "Acotar un proceso temporal",
        "language": "python",
        "code": "# En el encabezado del DAG:\n# start_date=pendulum.datetime(2026,9,1,tz=\"UTC\"),\n# end_date=pendulum.datetime(2026,9,30,tz=\"UTC\"),\n# schedule=\"@daily\"\nEmptyOperator(task_id=\"reporte\")",
        "hint": "La hora efectiva depende del intervalo y del scheduler.",
        "textOutput": "El calendario queda acotado al periodo configurado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/schedule/zonas-horarias",
    "remember": "Distingue la hora local de la UTC que usa internamente Airflow.",
    "examples": [
      {
        "id": "airflow/schedule/zonas-horarias/1",
        "title": "Programar a hora mexicana",
        "language": "python",
        "code": "# En el encabezado:\n# start_date=pendulum.datetime(2026,9,1,tz=\"America/Mexico_City\"),\n# schedule=\"0 8 * * *\"\nEmptyOperator(task_id=\"reporte\")",
        "hint": "La UI puede mostrar otra zona horaria.",
        "textOutput": "El calendario usa las 08:00 de Ciudad de México.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/schedule/timetables",
    "remember": "Distingue calendario de ejecución e intervalo de datos.",
    "examples": [
      {
        "id": "airflow/schedule/timetables/1",
        "title": "Programar por intervalo explícito de cron",
        "language": "python",
        "code": "from airflow.timetables.interval import CronDataIntervalTimetable\n# En el encabezado (importar antes del with):\n# schedule=CronDataIntervalTimetable(\"0 0 * * *\", timezone=\"UTC\")\nEmptyOperator(task_id=\"diario\")",
        "hint": "No todos los schedules cron de Airflow 3 usan el mismo tipo de timetable; este lo fija explícitamente.",
        "textOutput": "Cada run programado representa un día completo y se habilita al cerrar su intervalo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
