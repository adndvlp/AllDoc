// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/snapshots-e-historial/definicion",
    "remember": "No recupera cambios ocurridos entre ejecuciones que nunca observó.",
    "examples": [
      {
        "id": "dbt/snapshots-e-historial/definicion/1",
        "title": "Crear snapshots/customer_history.yml",
        "language": "yaml",
        "code": "snapshots:\n  - name: customer_history\n    relation: source('shop','customers')\n    config:\n      unique_key: customer_id\n      strategy: timestamp\n      updated_at: updated_at",
        "hint": "No recupera cambios ocurridos entre ejecuciones que nunca observó.",
        "textOutput": "dbt snapshot --select customer_history crea cuatro versiones iniciales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/snapshots-e-historial/timestamp-strategy",
    "remember": "Una modificación que no actualiza el timestamp puede no detectarse.",
    "examples": [
      {
        "id": "dbt/snapshots-e-historial/timestamp-strategy/1",
        "title": "Modificar un cliente (PostgreSQL directo, después del snapshot inicial)",
        "language": "sql",
        "code": "update raw.customers set country='ES', updated_at=timestamp '2026-03-01 08:00' where customer_id=1;",
        "hint": "Una modificación que no actualiza el timestamp puede no detectarse.",
        "textOutput": "Tras dbt snapshot --select customer_history, Ana tiene dos versiones, la anterior cerrada y la nueva vigente. Restaurar raw tras practicar; para repetir desde cero limpiar solo el snapshot de laboratorio.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/snapshots-e-historial/check-strategy",
    "remember": "Usar check_cols explícitas evita cambios de historial por campos irrelevantes.",
    "examples": [
      {
        "id": "dbt/snapshots-e-historial/check-strategy/1",
        "title": "Capturar cambios de nombre o país (snapshot alternativo)",
        "language": "yaml",
        "code": "snapshots:\n  - name: customer_check_history\n    relation: source('shop','customers')\n    config:\n      unique_key: customer_id\n      strategy: check\n      check_cols: [name, country]",
        "hint": "Usar check_cols explícitas evita cambios de historial por campos irrelevantes.",
        "textOutput": "Primera ejecución crea cuatro versiones; cambiar name o country crea otra versión en la siguiente captura.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/snapshots-e-historial/scd-tipo-1-y-tipo-2",
    "remember": "Snapshots implementan historial tipo 2; una dimensión normal reconstruida puede ser tipo 1.",
    "examples": [
      {
        "id": "dbt/snapshots-e-historial/scd-tipo-1-y-tipo-2/1",
        "title": "Consultar versiones vigentes",
        "language": "sql",
        "code": "select customer_id, country from {{ ref('customer_history') }} where dbt_valid_to is null order by customer_id",
        "hint": "Snapshots implementan historial tipo 2; una dimensión normal reconstruida puede ser tipo 1.",
        "textOutput": "Cuatro clientes vigentes; si se realizó el cambio de Ana, aparece ES para ella.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/snapshots-e-historial/hard-deletes-y-soft-deletes",
    "remember": "hard_deletes ignore/invalidate/new_record controla el tratamiento en versiones/adaptadores compatibles.",
    "note": "new_record añade un registro de borrado y metadata dbt_is_deleted donde se admite; migrar snapshots existentes explícitamente.",
    "examples": [
      {
        "id": "dbt/snapshots-e-historial/hard-deletes-y-soft-deletes/1",
        "title": "Cerrar versiones al borrar una fila (snapshot nuevo)",
        "language": "yaml",
        "code": "snapshots:\n  - name: customer_delete_history\n    relation: source('shop','customers')\n    config:\n      unique_key: customer_id\n      strategy: timestamp\n      updated_at: updated_at\n      hard_deletes: invalidate",
        "hint": "hard_deletes ignore/invalidate/new_record controla el tratamiento en versiones/adaptadores compatibles.",
        "textOutput": "Después de capturar y borrar al cliente 4 sin pedidos, la siguiente captura cierra su versión. Usar solo laboratorio y restaurar cliente 4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/snapshots-e-historial/metadatos-e-intervalos-de-vigencia",
    "remember": "Con dbt_valid_to_current configurado, la fila actual puede tener fecha centinela en vez de NULL.",
    "examples": [
      {
        "id": "dbt/snapshots-e-historial/metadatos-e-intervalos-de-vigencia/1",
        "title": "Ver historial de Ana",
        "language": "sql",
        "code": "select customer_id, country, dbt_valid_from, dbt_valid_to from {{ ref('customer_history') }} where customer_id=1 order by dbt_valid_from",
        "hint": "Con dbt_valid_to_current configurado, la fila actual puede tener fecha centinela en vez de NULL.",
        "textOutput": "Después de la actualización: una versión MX cerrada y una ES vigente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/snapshots-e-historial/cdc-e-historial-de-hechos",
    "remember": "No confundir un snapshot periódico con un log completo de eventos.",
    "examples": [
      {
        "id": "dbt/snapshots-e-historial/cdc-e-historial-de-hechos/1",
        "title": "Elegir estrategia",
        "language": "text",
        "code": "Cambio de país de cliente → snapshot SCD2\nCorrección de importe → incremental con unique_key\nTodos los eventos de cambio → CDC de origen",
        "hint": "CDC captura cambios de origen.",
        "textOutput": "Se preserva historial donde se necesita; el incremental por sí solo no guarda cada versión.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
