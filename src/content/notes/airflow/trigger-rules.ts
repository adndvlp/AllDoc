// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/trigger-rules/definicion",
    "remember": "all_success es la regla predeterminada.",
    "examples": [
      {
        "id": "airflow/trigger-rules/definicion/1",
        "title": "Exigir dos validaciones correctas",
        "language": "python",
        "code": "a = EmptyOperator(task_id=\"a\")\nb = EmptyOperator(task_id=\"b\")\n[a, b] >> EmptyOperator(task_id=\"publicar\", trigger_rule=\"all_success\")",
        "hint": "Las reglas se aplican a los antecedentes directos.",
        "textOutput": "publicar se ejecuta si a y b terminan correctamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/trigger-rules/all-done-y-one-failed",
    "remember": "No uses all_done para publicar datos cuya validación falló.",
    "examples": [
      {
        "id": "airflow/trigger-rules/all-done-y-one-failed/1",
        "title": "Registrar el final incluso con error",
        "language": "python",
        "code": "@task(retries=0)\ndef falla():\n    raise ValueError(\"error\")\nfalla() >> EmptyOperator(task_id=\"registrar\", trigger_rule=\"all_done\")",
        "hint": "Un nodo hoja exitoso con all_done puede ocultar el fallo del DAG Run; aplica el patrón watcher cuando corresponda.",
        "textOutput": "registrar se ejecuta aunque falla esté failed.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/trigger-rules/one-success",
    "remember": "No garantiza que el resto de antecedentes haya terminado.",
    "examples": [
      {
        "id": "airflow/trigger-rules/one-success/1",
        "title": "Continuar tras una fuente exitosa",
        "language": "python",
        "code": "a = EmptyOperator(task_id=\"fuente_a\")\nb = EmptyOperator(task_id=\"fuente_b\")\n[a,b] >> EmptyOperator(task_id=\"continuar\", trigger_rule=\"one_success\")",
        "hint": "Úsalo solo si no necesitas resultados de todas las ramas.",
        "textOutput": "continuar puede comenzar al completarse la primera fuente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/trigger-rules/branching",
    "remember": "Después de un branch la unión suele necesitar una regla distinta de all_success.",
    "examples": [
      {
        "id": "airflow/trigger-rules/branching/1",
        "title": "Elegir reporte nacional",
        "language": "python",
        "code": "@task.branch\ndef elegir():\n    return \"mexico\"\nm = EmptyOperator(task_id=\"mexico\")\ne = EmptyOperator(task_id=\"espana\")\nelegir() >> [m,e]",
        "hint": "También existe BranchPythonOperator para código clásico.",
        "textOutput": "mexico se ejecuta; espana queda skipped.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/trigger-rules/unir-ramas",
    "remember": "Las ramas skipped no bloquean esta regla.",
    "examples": [
      {
        "id": "airflow/trigger-rules/unir-ramas/1",
        "title": "Publicar después de una decisión",
        "language": "python",
        "code": "@task.branch\ndef elegir():\n    return \"mx\"\na = EmptyOperator(task_id=\"mx\")\nb = EmptyOperator(task_id=\"es\")\nfin = EmptyOperator(task_id=\"fin\", trigger_rule=\"none_failed_min_one_success\")\nelegir() >> [a,b] >> fin",
        "hint": "La unión no exige que ambas ramas tengan éxito.",
        "textOutput": "mx y fin terminan success; es queda skipped.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/trigger-rules/shortcircuitoperator",
    "remember": "Sirve para detener un camino sin considerarlo un error de ejecución.",
    "examples": [
      {
        "id": "airflow/trigger-rules/shortcircuitoperator/1",
        "title": "Omitir publicación si no hay filas",
        "language": "python",
        "code": "from airflow.providers.standard.operators.python import ShortCircuitOperator\na = ShortCircuitOperator(task_id=\"hay_datos\", python_callable=lambda: False)\na >> EmptyOperator(task_id=\"publicar\")",
        "hint": "También existe @task.short_circuit; ignore_downstream_trigger_rules controla alcance del salto.",
        "textOutput": "hay_datos termina success; publicar queda skipped.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/trigger-rules/latestonlyoperator",
    "remember": "Úsalo para acciones que no deben repetirse en runs históricos.",
    "examples": [
      {
        "id": "airflow/trigger-rules/latestonlyoperator/1",
        "title": "Evitar enviar reportes históricos",
        "language": "python",
        "code": "from airflow.providers.standard.operators.latest_only import LatestOnlyOperator\n# En el encabezado: schedule=\"@daily\", catchup=True\nLatestOnlyOperator(task_id=\"latest\") >> EmptyOperator(task_id=\"notificar\")",
        "hint": "Los runs manuales no se comportan igual que los programados.",
        "textOutput": "En runs históricos no recientes, notificar puede quedar skipped.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/trigger-rules/setup-y-teardown",
    "remember": "La limpieza debe poder ejecutarse aunque falle el trabajo, si la preparación tuvo éxito.",
    "examples": [
      {
        "id": "airflow/trigger-rules/setup-y-teardown/1",
        "title": "Representar crear, usar y liberar recurso",
        "language": "python",
        "code": "s = EmptyOperator(task_id=\"crear\").as_setup()\nw = EmptyOperator(task_id=\"trabajo\")\nt = EmptyOperator(task_id=\"liberar\").as_teardown(setups=s)\ns >> w >> t",
        "hint": "Son nodos ilustrativos; para recursos reales usa operadores adecuados y limpieza idempotente.",
        "textOutput": "Airflow identifica crear como setup y liberar como teardown.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/trigger-rules/watcher-pattern",
    "remember": "Conecta el watcher a todas las tareas cuyo fallo deba detectar.",
    "examples": [
      {
        "id": "airflow/trigger-rules/watcher-pattern/1",
        "title": "Propagar un fallo aunque termine la limpieza",
        "language": "python",
        "code": "@task(retries=0)\ndef trabajo():\n    raise ValueError(\"error\")\n@task(trigger_rule=\"one_failed\", retries=0)\ndef watcher():\n    raise RuntimeError(\"Pipeline fallido\")\na = trabajo()\nb = EmptyOperator(task_id=\"limpiar\", trigger_rule=\"all_done\")\na >> b\n[a,b] >> watcher()",
        "hint": "El watcher protege contra el estado engañoso de las hojas.",
        "textOutput": "limpiar termina success y watcher failed; el DAG Run falla.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
