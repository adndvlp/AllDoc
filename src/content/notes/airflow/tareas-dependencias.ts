// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/tareas-dependencias/definicion",
    "remember": "La misma tarea puede tener muchas instancias históricas.",
    "examples": [
      {
        "id": "airflow/tareas-dependencias/definicion/1",
        "title": "Definir una unidad de trabajo",
        "language": "python",
        "code": "EmptyOperator(task_id=\"validar\")",
        "hint": "Dispara dos runs para observar dos instancias distintas.",
        "textOutput": "Cada ejecución manual crea una instancia de validar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/tareas-dependencias/dependencias-y",
    "remember": "a >> b significa que a es upstream de b.",
    "examples": [
      {
        "id": "airflow/tareas-dependencias/dependencias-y/1",
        "title": "Encadenar pasos",
        "language": "python",
        "code": "a = EmptyOperator(task_id=\"a\")\nb = EmptyOperator(task_id=\"b\")\na >> b",
        "hint": "b << a expresa la misma relación.",
        "textOutput": "b espera el éxito de a con la regla predeterminada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/tareas-dependencias/set-upstream-y-set-downstream",
    "remember": "a.set_downstream(b) equivale a a >> b.",
    "examples": [
      {
        "id": "airflow/tareas-dependencias/set-upstream-y-set-downstream/1",
        "title": "Declarar dependencias con métodos",
        "language": "python",
        "code": "a = EmptyOperator(task_id=\"extraer\")\nb = EmptyOperator(task_id=\"cargar\")\nb.set_upstream(a)",
        "hint": "El método se llama desde la tarea que espera a su antecedente.",
        "textOutput": "extraer → cargar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/tareas-dependencias/fan-out-y-fan-in",
    "remember": "Las ramas independientes pueden ejecutarse en paralelo si hay capacidad.",
    "examples": [
      {
        "id": "airflow/tareas-dependencias/fan-out-y-fan-in/1",
        "title": "Validar dos fuentes antes de publicar",
        "language": "python",
        "code": "inicio = EmptyOperator(task_id=\"inicio\")\na = EmptyOperator(task_id=\"validar_mx\")\nb = EmptyOperator(task_id=\"validar_es\")\nfin = EmptyOperator(task_id=\"publicar\")\ninicio >> [a, b] >> fin",
        "hint": "Una lista de tareas permite declarar las ramas a la vez.",
        "textOutput": "Publicar espera las dos validaciones.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/tareas-dependencias/taskgroup",
    "remember": "Un TaskGroup no es una unidad de ejecución aislada.",
    "examples": [
      {
        "id": "airflow/tareas-dependencias/taskgroup/1",
        "title": "Agrupar la preparación",
        "language": "python",
        "code": "with TaskGroup(group_id=\"preparacion\") as prep:\n    a = EmptyOperator(task_id=\"extraer\")\n    b = EmptyOperator(task_id=\"validar\")\n    a >> b\nprep >> EmptyOperator(task_id=\"publicar\")",
        "hint": "El prefijo evita colisiones de nombres.",
        "textOutput": "El grafo contiene preparacion.extraer y preparacion.validar dentro del grupo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
