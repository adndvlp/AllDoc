// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/unit-tests-y-contratos/definicion",
    "remember": "Los data tests revisan datos reales; los unit tests comprueban casos de lógica.",
    "examples": [
      {
        "id": "dbt/unit-tests-y-contratos/definicion/1",
        "title": "Ejecutar solo unit tests",
        "language": "bash",
        "code": "dbt test --select test_type:unit",
        "hint": "Los data tests revisan datos reales; los unit tests comprueban casos de lógica.",
        "textOutput": "Se ejecutan las pruebas unitarias declaradas, no los data tests.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/unit-tests-y-contratos/unit-test-con-given-y-expect",
    "remember": "Incluir todas las referencias directas del modelo.",
    "examples": [
      {
        "id": "dbt/unit-tests-y-contratos/unit-test-con-given-y-expect/1",
        "title": "Probar el filtro de pedidos (models/unit_tests.yml)",
        "language": "yaml",
        "code": "unit_tests:\n  - name: only_completed\n    model: int_completed_orders\n    given:\n      - input: ref('stg_orders')\n        rows:\n          - {order_id: 1, status: completed}\n          - {order_id: 2, status: cancelled}\n    expect:\n      rows:\n        - {order_id: 1, status: completed}",
        "hint": "Incluir todas las referencias directas del modelo.",
        "textOutput": "Con staging existente para inferir tipos, dbt test --select only_completed pasa.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/unit-tests-y-contratos/overrides-y-modelos-incrementales",
    "remember": "En un unit test incremental se comprueban filas que se añadirían o actualizarían, no toda la tabla final.",
    "examples": [
      {
        "id": "dbt/unit-tests-y-contratos/overrides-y-modelos-incrementales/1",
        "title": "Simular ejecución completa (fragmento de un unit test incremental)",
        "language": "yaml",
        "code": "overrides:\n  macros:\n    is_incremental: false",
        "hint": "En un unit test incremental se comprueban filas que se añadirían o actualizarían, no toda la tabla final.",
        "textOutput": "El modelo usa su rama de carga completa en la prueba. Requiere definir given y expect para el modelo incremental.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/unit-tests-y-contratos/model-contracts",
    "remember": "No reemplaza pruebas de unicidad o relaciones; soporte de constraints varía.",
    "examples": [
      {
        "id": "dbt/unit-tests-y-contratos/model-contracts/1",
        "title": "Fijar estructura de un modelo de una columna",
        "language": "yaml",
        "code": "models:\n  - name: lab_contract\n    config:\n      materialized: table\n      contract:\n        enforced: true\n    columns:\n      - name: order_id\n        data_type: integer",
        "hint": "No reemplaza pruebas de unicidad o relaciones; soporte de constraints varía.",
        "textOutput": "Con models/lab_contract.sql = select order_id from {{ ref('stg_orders') }}, se construyen cinco filas; si se añade una columna no declarada, falla.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
