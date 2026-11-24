// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/source-freshness/definicion",
    "remember": "Mide oportunidad de datos, no validez de su contenido.",
    "examples": [
      {
        "id": "dbt/source-freshness/definicion/1",
        "title": "Evaluar fuentes",
        "language": "bash",
        "code": "dbt source freshness",
        "hint": "Mide oportunidad de datos, no validez de su contenido.",
        "textOutput": "Se evaluarán fuentes con freshness configurado; se genera sources.json.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/source-freshness/loaded-at-field-y-umbrales",
    "remember": "Los campos de carga deben reflejar el momento que realmente interesa.",
    "note": "Para simplificar se usa updated_at, no un timestamp separado de ingestión. Verificar zona horaria y versión; Core 1.10 usa config.",
    "examples": [
      {
        "id": "dbt/source-freshness/loaded-at-field-y-umbrales/1",
        "title": "Definir SLA de pedidos (fusionar en sources.yml)",
        "language": "yaml",
        "code": "sources:\n  - name: shop\n    schema: raw\n    tables:\n      - name: customers\n      - name: orders\n        config:\n          loaded_at_field: updated_at\n          freshness:\n            warn_after: {count: 24, period: hour}\n            error_after: {count: 48, period: hour}",
        "hint": "Los campos de carga deben reflejar el momento que realmente interesa.",
        "textOutput": "El máximo inicial es 2026-02-01 10:00; si el reloj supera esa fecha por más de 48 horas, ERROR esperado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
