// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/data-tests/definicion",
    "remember": "Cero filas de fallo significa que el test pasa.",
    "examples": [
      {
        "id": "dbt/data-tests/definicion/1",
        "title": "Comprobar importes negativos (tests/no_negative_orders.sql)",
        "language": "sql",
        "code": "select * from {{ ref('stg_orders') }} where amount < 0",
        "hint": "Cero filas de fallo significa que el test pasa.",
        "textOutput": "Cero filas; pasa con los datos base.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/data-tests/unique",
    "remember": "Combinar con not_null para una clave primaria lógica.",
    "examples": [
      {
        "id": "dbt/data-tests/unique/1",
        "title": "Validar identificadores (models/schema.yml)",
        "language": "yaml",
        "code": "models:\n  - name: stg_orders\n    columns:\n      - name: order_id\n        data_tests: [unique]",
        "hint": "Combinar con not_null para una clave primaria lógica.",
        "textOutput": "dbt test --select stg_orders pasa: cinco IDs distintos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/data-tests/not-null",
    "remember": "No valida que un texto no esté vacío.",
    "examples": [
      {
        "id": "dbt/data-tests/not-null/1",
        "title": "Exigir ID de cliente",
        "language": "yaml",
        "code": "models:\n  - name: stg_customers\n    columns:\n      - name: customer_id\n        data_tests: [not_null]",
        "hint": "No valida que un texto no esté vacío.",
        "textOutput": "Pasa; los cuatro IDs existen. Aplicado a country, falla por Diego.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/data-tests/relationships",
    "remember": "Añadir not_null si la FK lógica también debe ser obligatoria.",
    "examples": [
      {
        "id": "dbt/data-tests/relationships/1",
        "title": "Validar relación pedido-cliente",
        "language": "yaml",
        "code": "models:\n  - name: stg_orders\n    columns:\n      - name: customer_id\n        data_tests:\n          - relationships:\n              arguments:\n                to: ref('stg_customers')\n                field: customer_id",
        "hint": "Añadir not_null si la FK lógica también debe ser obligatoria.",
        "textOutput": "Pasa; los cinco pedidos apuntan a clientes existentes.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/data-tests/accepted-values",
    "remember": "No reemplaza not_null.",
    "examples": [
      {
        "id": "dbt/data-tests/accepted-values/1",
        "title": "Restringir estados válidos",
        "language": "yaml",
        "code": "models:\n  - name: stg_orders\n    columns:\n      - name: status\n        data_tests:\n          - accepted_values:\n              arguments:\n                values: ['completed','cancelled']",
        "hint": "No reemplaza not_null.",
        "textOutput": "Pasa para los cinco pedidos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/data-tests/singular-tests",
    "remember": "Devolver violaciones, no una fila con un conteo de cero.",
    "examples": [
      {
        "id": "dbt/data-tests/singular-tests/1",
        "title": "Detectar pedidos cancelados en hechos (tests/no_cancelled_facts.sql)",
        "language": "sql",
        "code": "select * from {{ ref('fct_orders') }} where status <> 'completed'",
        "hint": "Devolver violaciones, no una fila con un conteo de cero.",
        "textOutput": "Cero filas; pasa.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/data-tests/custom-generic-tests",
    "remember": "El nombre del bloque test se usa luego en YAML.",
    "examples": [
      {
        "id": "dbt/data-tests/custom-generic-tests/1",
        "title": "Crear una regla de mínimo (tests/generic/test_minimum.sql)",
        "language": "sql",
        "code": "{% test minimum(model, column_name, min_value) %}\nselect * from {{ model }} where {{ column_name }} < {{ min_value }}\n{% endtest %}",
        "hint": "El nombre del bloque test se usa luego en YAML.",
        "textOutput": "Declarar minimum con arguments: {min_value: 0} en amount valida todos los pedidos; pasa.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/data-tests/severity-warn-if-y-error-if",
    "remember": "Una advertencia no siempre bloquea recursos descendientes; --warn-error puede cambiarlo.",
    "examples": [
      {
        "id": "dbt/data-tests/severity-warn-if-y-error-if/1",
        "title": "Advertir por países faltantes",
        "language": "yaml",
        "code": "models:\n  - name: stg_customers\n    columns:\n      - name: country\n        data_tests:\n          - not_null:\n              config:\n                severity: warn\n                warn_if: '>0'",
        "hint": "Una advertencia no siempre bloquea recursos descendientes; --warn-error puede cambiarlo.",
        "textOutput": "Una fila de fallo, estado WARN en condiciones normales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/data-tests/where-y-store-failures",
    "remember": "Los registros persistidos pueden contener datos sensibles; proteger el esquema de auditoría.",
    "examples": [
      {
        "id": "dbt/data-tests/where-y-store-failures/1",
        "title": "Guardar un fallo de país",
        "language": "yaml",
        "code": "models:\n  - name: stg_customers\n    columns:\n      - name: country\n        data_tests:\n          - not_null:\n              config:\n                where: 'customer_id >= 1'\n                store_failures: true",
        "hint": "Los registros persistidos pueden contener datos sensibles; proteger el esquema de auditoría.",
        "textOutput": "Una fila con customer_id=4 se registra en la relación de fallos; el test falla. Retirar el test deliberado al terminar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
