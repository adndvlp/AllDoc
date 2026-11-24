// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/definicion",
    "remember": "No escribir CREATE TABLE para un modelo SQL habitual.",
    "examples": [
      {
        "id": "dbt/modelos-sql-y-dependencias/definicion/1",
        "title": "Crear un modelo de pedidos grandes (models/large_orders.sql)",
        "language": "sql",
        "code": "select order_id, amount from {{ ref('stg_orders') }} where amount >= 150",
        "hint": "No escribir CREATE TABLE para un modelo SQL habitual.",
        "textOutput": "103:200 y 105:150 tras dbt run --select large_orders.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/ref",
    "remember": "Referenciar el nombre del archivo sin .sql, no el esquema.",
    "examples": [
      {
        "id": "dbt/modelos-sql-y-dependencias/ref/1",
        "title": "Consumir el modelo de pedidos completados",
        "language": "sql",
        "code": "select sum(amount) as revenue from {{ ref('fct_orders') }}",
        "hint": "Referenciar el nombre del archivo sin .sql, no el esquema.",
        "textOutput": "500.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/dag-upstream-y-downstream",
    "remember": "Un upstream alimenta al modelo; un downstream lo consume.",
    "examples": [
      {
        "id": "dbt/modelos-sql-y-dependencias/dag-upstream-y-downstream/1",
        "title": "Seguir dependencias de pedidos",
        "language": "text",
        "code": "source:shop.orders → stg_orders → int_completed_orders → fct_orders → customer_revenue",
        "hint": "El grafo dirigido acíclico representa qué recursos dependen de otros y permite ejecutarlos en orden.",
        "textOutput": "customer_revenue depende transitivamente de shop.orders.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/staging",
    "remember": "Mantener una granularidad compatible con el origen.",
    "examples": [
      {
        "id": "dbt/modelos-sql-y-dependencias/staging/1",
        "title": "Normalizar estado de pedidos",
        "language": "sql",
        "code": "select order_id, lower(trim(status)) as status from {{ source('shop','orders') }}",
        "hint": "Mantener una granularidad compatible con el origen.",
        "textOutput": "Cinco filas; 104 queda cancelled, las demás completed.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/intermediate",
    "remember": "Extraer lógica compartida, no crear capas sin propósito.",
    "examples": [
      {
        "id": "dbt/modelos-sql-y-dependencias/intermediate/1",
        "title": "Aislar pedidos completados",
        "language": "sql",
        "code": "select * from {{ ref('stg_orders') }} where status='completed'",
        "hint": "Extraer lógica compartida, no crear capas sin propósito.",
        "textOutput": "Cuatro filas; 104 queda fuera.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/marts",
    "remember": "Definir qué representa cada fila antes de publicar.",
    "examples": [
      {
        "id": "dbt/modelos-sql-y-dependencias/marts/1",
        "title": "Consultar ingresos por país",
        "language": "sql",
        "code": "select country, sum(revenue) as revenue from {{ ref('customer_revenue') }} group by country order by country",
        "hint": "Definir qué representa cada fila antes de publicar.",
        "textOutput": "ES 150; MX 350; Unknown 0.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/analyses",
    "remember": "Usar compile para obtener SQL ejecutable aparte.",
    "examples": [
      {
        "id": "dbt/modelos-sql-y-dependencias/analyses/1",
        "title": "Guardar una consulta puntual (analyses/revenue.sql)",
        "language": "sql",
        "code": "select sum(amount) from {{ ref('fct_orders') }}",
        "hint": "Usar compile para obtener SQL ejecutable aparte.",
        "textOutput": "dbt compile --select revenue genera SQL; no crea una relación revenue.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
