// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/templates/definicion",
    "remember": "No todos los parámetros de un operator son templated fields.",
    "examples": [
      {
        "id": "airflow/templates/definicion/1",
        "title": "Imprimir el identificador del run",
        "language": "python",
        "code": "BashOperator(task_id=\"run\", bash_command=\"echo $RUN_ID\", env={\"RUN_ID\": \"{{ run_id }}\"})",
        "hint": "env es un campo templado de BashOperator; pasa datos externos por variables, no interpolándolos en comandos.",
        "textOutput": "El log muestra el identificador de la ejecución.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/templates/intervalos-ds-y-ts",
    "remember": "Una fecha lógica no es necesariamente la fecha real de ejecución.",
    "examples": [
      {
        "id": "airflow/templates/intervalos-ds-y-ts/1",
        "title": "Mostrar una fecha lógica",
        "language": "python",
        "code": "BashOperator(task_id=\"fecha\", bash_command=\"echo $FECHA\", env={\"FECHA\": \"{{ ds }}\"})",
        "hint": "Prueba con un run programado que tenga fecha lógica.",
        "textOutput": "En un run con fecha lógica 2026-09-01, muestra 2026-09-01.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/templates/macros",
    "remember": "Las macros operan sobre valores del contexto, no sobre filas de tu base.",
    "examples": [
      {
        "id": "airflow/templates/macros/1",
        "title": "Calcular la fecha anterior",
        "language": "python",
        "code": "BashOperator(task_id=\"ayer\", bash_command=\"echo $DIA\", env={\"DIA\": \"{{ macros.ds_add(ds, -1) }}\"})",
        "hint": "Requiere un run con ds definido.",
        "textOutput": "Para ds=2026-09-01 muestra 2026-08-31.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/templates/renderizado-y-tipos",
    "remember": "El resultado de una plantilla puede ser texto o un objeto según configuración.",
    "examples": [
      {
        "id": "airflow/templates/renderizado-y-tipos/1",
        "title": "Recibir un entero en PythonOperator",
        "language": "python",
        "code": "# En el encabezado: render_template_as_native_obj=True\ndef ver(valor):\n    print(type(valor).__name__, valor)\nPythonOperator(task_id=\"tipo\", python_callable=ver, op_kwargs={\"valor\": \"{{ 2 + 3 }}\"})",
        "hint": "Sin renderizado nativo, ese campo se renderiza normalmente como texto.",
        "textOutput": "El log muestra int 5.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
