// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/seleccion-de-nodos/definicion",
    "remember": "Comprobar selección con dbt ls antes de ejecutar cambios grandes.",
    "examples": [
      {
        "id": "dbt/seleccion-de-nodos/definicion/1",
        "title": "Seleccionar un mart",
        "language": "bash",
        "code": "dbt ls --select customer_revenue",
        "hint": "Comprobar selección con dbt ls antes de ejecutar cambios grandes.",
        "textOutput": "Lista customer_revenue y, según tipo de selección, tests relacionados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/seleccion-de-nodos/select-y-exclude",
    "remember": "Excluir un padre no garantiza que el modelo hijo tenga datos actualizados.",
    "examples": [
      {
        "id": "dbt/seleccion-de-nodos/select-y-exclude/1",
        "title": "Construir marts salvo un reporte",
        "language": "bash",
        "code": "dbt run --select path:models/marts --exclude customer_revenue",
        "hint": "Excluir un padre no garantiza que el modelo hijo tenga datos actualizados.",
        "textOutput": "Construye fct_orders y dim_customers; asume upstream existentes.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/seleccion-de-nodos/operadores-y",
    "remember": "El lado del signo + indica la dirección.",
    "examples": [
      {
        "id": "dbt/seleccion-de-nodos/operadores-y/1",
        "title": "Seleccionar familias",
        "language": "bash",
        "code": "dbt ls --select +customer_revenue\ndbt ls --select stg_orders+\ndbt ls --select @stg_orders",
        "hint": "El lado del signo + indica la dirección.",
        "textOutput": "Primero padres del reporte; segundo descendientes de staging; tercero también otros padres necesarios.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/seleccion-de-nodos/metodos-de-seleccion",
    "remember": "Usar config.materialized:table para tablas, no el nombre físico.",
    "examples": [
      {
        "id": "dbt/seleccion-de-nodos/metodos-de-seleccion/1",
        "title": "Listar tablas",
        "language": "bash",
        "code": "dbt ls --select config.materialized:table --resource-type model",
        "hint": "Usar config.materialized:table para tablas, no el nombre físico.",
        "textOutput": "Tres marts del proyecto base.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/seleccion-de-nodos/union-e-interseccion",
    "remember": "Citar el argumento para preservar los espacios.",
    "examples": [
      {
        "id": "dbt/seleccion-de-nodos/union-e-interseccion/1",
        "title": "Cruzar ruta y materialización",
        "language": "bash",
        "code": "dbt ls --select 'path:models/marts,config.materialized:table'",
        "hint": "Citar el argumento para preservar los espacios.",
        "textOutput": "Los tres marts; con un espacio también seleccionaría tablas fuera de marts.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/seleccion-de-nodos/selectors-yml",
    "remember": "El selector por nombre se usa con --selector.",
    "examples": [
      {
        "id": "dbt/seleccion-de-nodos/selectors-yml/1",
        "title": "Guardar la selección de marts",
        "language": "yaml",
        "code": "selectors:\n  - name: daily_marts\n    definition:\n      method: path\n      value: models/marts",
        "hint": "El selector por nombre se usa con --selector.",
        "textOutput": "dbt run --selector daily_marts construye los marts.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/seleccion-de-nodos/threads-target-y-fail-fast",
    "remember": "El DAG limita qué nodos pueden ejecutarse a la vez.",
    "examples": [
      {
        "id": "dbt/seleccion-de-nodos/threads-target-y-fail-fast/1",
        "title": "Ejecutar en desarrollo",
        "language": "bash",
        "code": "dbt build --target dev --threads 2 --fail-fast",
        "hint": "El DAG limita qué nodos pueden ejecutarse a la vez.",
        "textOutput": "Se ejecutan hasta dos tareas elegibles simultáneamente; ante un error se intenta detener el resto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/seleccion-de-nodos/seleccion-indirecta-de-tests",
    "remember": "eager incluye tests si algún padre es seleccionado; cautious exige todos; buildable también considera ancestros; empty omite tests indirectos.",
    "examples": [
      {
        "id": "dbt/seleccion-de-nodos/seleccion-indirecta-de-tests/1",
        "title": "Excluir tests indirectos",
        "language": "bash",
        "code": "dbt build --select fct_orders --indirect-selection empty",
        "hint": "eager incluye tests si algún padre es seleccionado; cautious exige todos; buildable también considera ancestros; empty omite tests indirectos.",
        "textOutput": "Construye fct_orders sin seleccionar sus tests por asociación indirecta; tests seleccionados explícitamente siguen siendo otra posibilidad.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
