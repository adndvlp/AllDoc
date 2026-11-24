// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/sources-y-seeds/definicion",
    "remember": "source() para entradas externas; ref() para recursos gestionados por dbt.",
    "examples": [
      {
        "id": "dbt/sources-y-seeds/definicion/1",
        "title": "Cargar el catálogo de países",
        "language": "bash",
        "code": "dbt seed --select country_names",
        "hint": "source() para entradas externas; ref() para recursos gestionados por dbt.",
        "textOutput": "Dos filas de referencia, MX y ES, en dbt_dev.country_names.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/sources-y-seeds/source",
    "remember": "El primer argumento es el nombre de la fuente, no el esquema físico.",
    "examples": [
      {
        "id": "dbt/sources-y-seeds/source/1",
        "title": "Leer pedidos de origen",
        "language": "sql",
        "code": "select order_id from {{ source('shop','orders') }} order by order_id",
        "hint": "El primer argumento es el nombre de la fuente, no el esquema físico.",
        "textOutput": "101, 102, 103, 104, 105.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/sources-y-seeds/identifier-y-esquema",
    "remember": "Cambiar el nombre lógico requiere actualizar source().",
    "examples": [
      {
        "id": "dbt/sources-y-seeds/identifier-y-esquema/1",
        "title": "Declarar un nombre lógico alternativo",
        "language": "yaml",
        "code": "sources:\n  - name: shop_alt\n    schema: raw\n    tables:\n      - name: purchases\n        identifier: orders",
        "hint": "Cambiar el nombre lógico requiere actualizar source().",
        "textOutput": "source('shop_alt','purchases') apunta a raw.orders.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/sources-y-seeds/seed-y-tipos-de-columna",
    "remember": "Después de cambiar tipos puede requerirse --full-refresh.",
    "examples": [
      {
        "id": "dbt/sources-y-seeds/seed-y-tipos-de-columna/1",
        "title": "Fijar el tipo del código",
        "language": "yaml",
        "code": "seeds:\n  tienda_dbt:\n    country_names:\n      +column_types:\n        country: varchar(2)",
        "hint": "Después de cambiar tipos puede requerirse --full-refresh.",
        "textOutput": "dbt seed --full-refresh --select country_names crea el código como varchar(2).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/sources-y-seeds/usar-un-seed",
    "remember": "Cargar el seed antes de consultar si no se usa build.",
    "examples": [
      {
        "id": "dbt/sources-y-seeds/usar-un-seed/1",
        "title": "Traducir códigos de países",
        "language": "sql",
        "code": "select c.customer_id, s.country_name\nfrom {{ ref('stg_customers') }} c\nleft join {{ ref('country_names') }} s on c.country=s.country\norder by c.customer_id",
        "hint": "Cargar el seed antes de consultar si no se usa build.",
        "textOutput": "1 Mexico; 2 Mexico; 3 Spain; 4 NULL.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
