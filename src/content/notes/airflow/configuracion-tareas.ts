// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/configuracion-tareas/definicion",
    "remember": "No uses Variables para transportar resultados entre tareas.",
    "examples": [
      {
        "id": "airflow/configuracion-tareas/definicion/1",
        "title": "Leer un umbral de negocio",
        "language": "python",
        "code": "@task\ndef umbral():\n    return int(Variable.get(\"min_pedidos\", default=\"2\"))\numbral()",
        "hint": "La lectura ocurre durante la tarea.",
        "textOutput": "Devuelve 2 si no se configuró la variable.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/configuracion-tareas/variables-y-entorno",
    "remember": "La variable debe estar disponible en el proceso que la resuelve.",
    "examples": [
      {
        "id": "airflow/configuracion-tareas/variables-y-entorno/1",
        "title": "Cambiar el umbral",
        "language": "bash",
        "code": "export AIRFLOW_VAR_MIN_PEDIDOS=3",
        "hint": "Reinicia el entorno si cambias variables de procesos existentes.",
        "textOutput": "El ejemplo anterior retorna 3 si el proceso tiene la variable y no existe una fuente de mayor prioridad.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/configuracion-tareas/params-y-validacion",
    "remember": "Usa Params para configurar un run sin editar código.",
    "examples": [
      {
        "id": "airflow/configuracion-tareas/params-y-validacion/1",
        "title": "Validar un límite mínimo",
        "language": "python",
        "code": "# En el encabezado: params={\"limite\": Param(2, type=\"integer\", minimum=1)}\n@task\ndef mostrar():\n    print(get_current_context()[\"params\"][\"limite\"])\nmostrar()",
        "hint": "Activa el formulario de trigger para probar un valor válido.",
        "textOutput": "El valor predeterminado es 2; un valor inválido como 0 se rechaza al validar parámetros.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/configuracion-tareas/dag-run-conf",
    "remember": "Valida valores externos antes de utilizarlos.",
    "examples": [
      {
        "id": "airflow/configuracion-tareas/dag-run-conf/1",
        "title": "Recibir un país manualmente",
        "language": "python",
        "code": "@task\ndef configurar():\n    conf = get_current_context()[\"dag_run\"].conf or {}\n    pais = conf.get(\"pais\", \"MX\")\n    if pais not in {\"MX\", \"ES\"}:\n        raise ValueError(\"País inválido\")\n    print(pais)\nconfigurar()",
        "hint": "Dispara mediante UI o CLI con ese JSON.",
        "textOutput": "Con conf={\"pais\":\"ES\"} imprime ES; sin configuración imprime MX.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/configuracion-tareas/get-current-context",
    "remember": "No lo llames al nivel superior del archivo DAG.",
    "examples": [
      {
        "id": "airflow/configuracion-tareas/get-current-context/1",
        "title": "Identificar la instancia de ejecución",
        "language": "python",
        "code": "@task\ndef identificar():\n    ctx = get_current_context()\n    print(ctx[\"run_id\"], ctx[\"ti\"].task_id)\nidentificar()",
        "hint": "Los IDs dependen de la ejecución concreta.",
        "textOutput": "El log contiene el run_id real y el task_id identificar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
