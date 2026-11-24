// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/materializaciones/definicion",
    "remember": "La misma consulta puede ser una vista, tabla o parte de otra consulta.",
    "examples": [
      {
        "id": "dbt/materializaciones/definicion/1",
        "title": "Construir una tabla (models/lab_orders.sql)",
        "language": "sql",
        "code": "{{ config(materialized='table') }}\nselect * from {{ ref('fct_orders') }}",
        "hint": "La misma consulta puede ser una vista, tabla o parte de otra consulta.",
        "textOutput": "Una tabla lab_orders con cuatro filas después de dbt run --select lab_orders.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/materializaciones/view",
    "remember": "Útil para staging ligero; el costo se traslada a la lectura.",
    "examples": [
      {
        "id": "dbt/materializaciones/view/1",
        "title": "Crear una vista",
        "language": "sql",
        "code": "{{ config(materialized='view') }}\nselect order_id, amount from {{ ref('fct_orders') }}",
        "hint": "Útil para staging ligero; el costo se traslada a la lectura.",
        "textOutput": "Una vista con cuatro filas consultables.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/materializaciones/table",
    "remember": "Los cambios de origen requieren reconstruir el modelo para verse en la tabla.",
    "examples": [
      {
        "id": "dbt/materializaciones/table/1",
        "title": "Persistir ingresos",
        "language": "sql",
        "code": "{{ config(materialized='table') }}\nselect sum(amount) as revenue from {{ ref('fct_orders') }}",
        "hint": "Los cambios de origen requieren reconstruir el modelo para verse en la tabla.",
        "textOutput": "Una tabla con revenue=500.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/materializaciones/ephemeral",
    "remember": "No consultar directamente un modelo ephemeral en el warehouse.",
    "examples": [
      {
        "id": "dbt/materializaciones/ephemeral/1",
        "title": "Crear lógica intermedia (models/lab_ephemeral.sql)",
        "language": "sql",
        "code": "{{ config(materialized='ephemeral') }}\nselect order_id from {{ ref('fct_orders') }}",
        "hint": "No consultar directamente un modelo ephemeral en el warehouse.",
        "textOutput": "Un consumidor con ref('lab_ephemeral') incorpora la CTE; no aparece tabla lab_ephemeral.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/materializaciones/incremental",
    "remember": "La materialización sola no identifica automáticamente registros nuevos.",
    "examples": [
      {
        "id": "dbt/materializaciones/incremental/1",
        "title": "Definir una tabla incremental inicial",
        "language": "sql",
        "code": "{{ config(materialized='incremental', unique_key='order_id') }}\nselect * from {{ ref('stg_orders') }}",
        "hint": "La materialización sola no identifica automáticamente registros nuevos.",
        "textOutput": "Primera ejecución: cinco filas; aún no hay filtro incremental.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/materializaciones/materialized-view",
    "remember": "No equivale a una vista normal ni garantiza refresco automático.",
    "examples": [
      {
        "id": "dbt/materializaciones/materialized-view/1",
        "title": "Crear una vista materializada en PostgreSQL",
        "language": "sql",
        "code": "{{ config(materialized='materialized_view') }}\nselect customer_id, sum(amount) as revenue from {{ ref('fct_orders') }} group by customer_id",
        "hint": "No equivale a una vista normal ni garantiza refresco automático.",
        "textOutput": "Tres filas persistidas en una vista materializada, si el adaptador admite la configuración.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/materializaciones/python-models",
    "remember": "No se ejecutan como modelos Python sobre dbt-postgres.",
    "note": "Requiere adaptador Snowflake y entorno Python compatible; BigQuery y Databricks tienen sus propias APIs.",
    "examples": [
      {
        "id": "dbt/materializaciones/python-models/1",
        "title": "Filtrar pedidos en un modelo Snowpark (alternativo)",
        "language": "python",
        "code": "def model(dbt, session):\n    dbt.config(materialized=\"table\")\n    return dbt.ref(\"stg_orders\").filter(\"STATUS = 'completed'\")",
        "hint": "No se ejecutan como modelos Python sobre dbt-postgres.",
        "textOutput": "Cuatro filas si los mismos datos están en Snowflake y las columnas siguen el casing indicado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
