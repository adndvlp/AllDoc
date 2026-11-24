// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/operators/definicion",
    "remember": "Instanciar el operator crea una tarea; execute ocurre después.",
    "examples": [
      {
        "id": "airflow/operators/definicion/1",
        "title": "Crear una tarea de comando",
        "language": "python",
        "code": "BashOperator(task_id=\"saludo\", bash_command=\"echo ventas\")",
        "hint": "El provider standard aporta operadores de uso general.",
        "textOutput": "El log contiene ventas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/operators/emptyoperator",
    "remember": "No extrae ni transforma datos.",
    "examples": [
      {
        "id": "airflow/operators/emptyoperator/1",
        "title": "Marcar el final del flujo",
        "language": "python",
        "code": "EmptyOperator(task_id=\"inicio\") >> EmptyOperator(task_id=\"fin\")",
        "hint": "Sirve para estructurar el grafo.",
        "textOutput": "Dos tareas vacías completan el flujo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/operators/pythonoperator",
    "remember": "Entrega la función sin llamarla en python_callable.",
    "examples": [
      {
        "id": "airflow/operators/pythonoperator/1",
        "title": "Calcular ingresos",
        "language": "python",
        "code": "def calcular(precio, cantidad):\n    return precio * cantidad\nPythonOperator(task_id=\"calcular\", python_callable=calcular, op_kwargs={\"precio\": 25, \"cantidad\": 4})",
        "hint": "op_kwargs se convierte en argumentos nombrados.",
        "textOutput": "El retorno esperado es 100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/operators/bashoperator-y-task-bash",
    "remember": "Usa set -e si necesitas propagar fallos intermedios.",
    "examples": [
      {
        "id": "airflow/operators/bashoperator-y-task-bash/1",
        "title": "Contar líneas del CSV",
        "language": "python",
        "code": "BashOperator(task_id=\"lineas\", bash_command=\"set -e; wc -l < /tmp/alldoc_airflow/orders.csv\")",
        "hint": "El comando corre en el worker que tenga el archivo.",
        "textOutput": "El log muestra 6 líneas incluyendo el encabezado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/operators/sqlexecutequeryoperator",
    "remember": "conn_id identifica la conexión; la consulta se ejecuta en el motor externo.",
    "note": "Instala provider postgres y crea ventas_pg en Connections.",
    "examples": [
      {
        "id": "airflow/operators/sqlexecutequeryoperator/1",
        "title": "Consultar un valor de prueba",
        "language": "python",
        "code": "from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator\nSQLExecuteQueryOperator(task_id=\"consulta\", conn_id=\"ventas_pg\", sql=\"SELECT 2 + 3 AS total\", do_xcom_push=True)",
        "hint": "No necesita una tabla, pero sí conexión real.",
        "textOutput": "La consulta devuelve una fila con 5 si PostgreSQL está disponible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/operators/pythonvirtualenvoperator-y-externalpythonoperator",
    "remember": "Importa dentro de la función las bibliotecas que necesita ese entorno.",
    "note": "Requiere virtualenv y permisos de creación de entornos.",
    "examples": [
      {
        "id": "airflow/operators/pythonvirtualenvoperator-y-externalpythonoperator/1",
        "title": "Aislar una dependencia",
        "language": "python",
        "code": "from airflow.providers.standard.operators.python import PythonVirtualenvOperator\ndef version():\n    import decimal\n    print(decimal.Decimal(\"1.20\"))\nPythonVirtualenvOperator(task_id=\"aislado\", python_callable=version, requirements=[], system_site_packages=False)",
        "hint": "ExternalPythonOperator utiliza la ruta python de un entorno ya preparado.",
        "textOutput": "El log muestra 1.20 desde un entorno aislado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/operators/task-bash",
    "remember": "Devuelve el comando, no el resultado de ejecutarlo.",
    "examples": [
      {
        "id": "airflow/operators/task-bash/1",
        "title": "Mostrar una región",
        "language": "python",
        "code": "@task.bash\ndef comando():\n    return \"echo MX\"\ncomando()",
        "hint": "La función construye el comando durante la ejecución.",
        "textOutput": "El log muestra MX.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/operators/externalpythonoperator",
    "remember": "El entorno externo debe existir en el worker.",
    "examples": [
      {
        "id": "airflow/operators/externalpythonoperator/1",
        "title": "Ejecutar un cálculo con otro intérprete",
        "language": "python",
        "code": "from airflow.providers.standard.operators.python import ExternalPythonOperator\nimport sys\ndef calcular():\n    print(2 + 3)\nExternalPythonOperator(task_id=\"externo\", python=sys.executable, python_callable=calcular)",
        "hint": "sys.executable usa el intérprete del laboratorio para probar la mecánica; sustituye la ruta por la de otro entorno para aislar dependencias.",
        "textOutput": "El log imprime 5.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
