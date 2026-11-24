// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/taskflow/definicion",
    "remember": "Llamar a la función decorada durante el parsing construye una tarea; no ejecuta su cuerpo.",
    "examples": [
      {
        "id": "airflow/taskflow/definicion/1",
        "title": "Contar pedidos",
        "language": "python",
        "code": "@task\ndef contar():\n    with open(\"/tmp/alldoc_airflow/orders.csv\") as f:\n        return len(list(csv.DictReader(f)))\ncontar()",
        "hint": "El archivo solo se abre en tiempo de ejecución.",
        "textOutput": "La tarea devuelve 5 al ejecutarse.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/taskflow/argumentos-y-dependencias-implicitas",
    "remember": "Los argumentos TaskFlow conectan datos pequeños y orden de ejecución.",
    "examples": [
      {
        "id": "airflow/taskflow/argumentos-y-dependencias-implicitas/1",
        "title": "Calcular ticket medio",
        "language": "python",
        "code": "@task\ndef total():\n    return 3000\n@task\ndef promedio(ventas, n):\n    return ventas / n\npromedio(total(), 4)",
        "hint": "total() devuelve una referencia durante el parsing.",
        "textOutput": "promedio devuelve 750 después de total.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/taskflow/multiples-salidas",
    "remember": "Usa claves para consumir un resultado concreto.",
    "examples": [
      {
        "id": "airflow/taskflow/multiples-salidas/1",
        "title": "Separar ventas y pedidos",
        "language": "python",
        "code": "@task(multiple_outputs=True)\ndef resumen():\n    return {\"ventas\": 3000, \"pedidos\": 4}\n@task\ndef mostrar(n):\n    print(n)\nmostrar(resumen()[\"pedidos\"])",
        "hint": "La clave pedidos selecciona una salida.",
        "textOutput": "mostrar imprime 4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/taskflow/task-group",
    "remember": "Las funciones del grupo definen el grafo; sus tareas ejecutan el trabajo.",
    "examples": [
      {
        "id": "airflow/taskflow/task-group/1",
        "title": "Reutilizar una validación",
        "language": "python",
        "code": "@task_group(group_id=\"control\")\ndef control():\n    EmptyOperator(task_id=\"schema\") >> EmptyOperator(task_id=\"filas\")\ncontrol()",
        "hint": "Usa group_id distintos al reutilizar el mismo diseño.",
        "textOutput": "Aparece el grupo control con dos tareas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
