// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/configuracion-de-recursos/definicion",
    "remember": "Las configuraciones se heredan y pueden sobrescribirse.",
    "examples": [
      {
        "id": "dbt/configuracion-de-recursos/definicion/1",
        "title": "Configurar el nombre físico",
        "language": "sql",
        "code": "{{ config(alias='orders_report', materialized='table') }}\nselect * from {{ ref('fct_orders') }}",
        "hint": "Las configuraciones se heredan y pueden sobrescribirse.",
        "textOutput": "El modelo lab_example se referencia por su nombre lógico; la tabla física es orders_report.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/configuracion-de-recursos/config-y-precedencia",
    "remember": "Preferir defaults por carpeta y excepciones locales.",
    "examples": [
      {
        "id": "dbt/configuracion-de-recursos/config-y-precedencia/1",
        "title": "Sobrescribir el default view",
        "language": "sql",
        "code": "{{ config(materialized='table') }}\nselect * from {{ ref('stg_orders') }}",
        "hint": "Preferir defaults por carpeta y excepciones locales.",
        "textOutput": "lab_example se construye como tabla pese al default de proyecto view.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/configuracion-de-recursos/propiedades-yaml",
    "remember": "name es el nombre lógico del modelo.",
    "examples": [
      {
        "id": "dbt/configuracion-de-recursos/propiedades-yaml/1",
        "title": "Documentar y etiquetar",
        "language": "yaml",
        "code": "models:\n  - name: fct_orders\n    description: Pedidos completados\n    config:\n      tags: [finance]",
        "hint": "name es el nombre lógico del modelo.",
        "textOutput": "fct_orders tiene descripción y tag finance tras parse.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/configuracion-de-recursos/schemas-database-y-alias",
    "remember": "En Core el schema personalizado normalmente se añade a target.schema.",
    "examples": [
      {
        "id": "dbt/configuracion-de-recursos/schemas-database-y-alias/1",
        "title": "Separar un modelo en esquema finance",
        "language": "sql",
        "code": "{{ config(schema='finance', alias='sales') }}\nselect * from {{ ref('fct_orders') }}",
        "hint": "En Core el schema personalizado normalmente se añade a target.schema.",
        "textOutput": "Con la macro estándar y target dbt_dev, relación dbt_dev_finance.sales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/configuracion-de-recursos/nombres-personalizados",
    "remember": "Conservar aislamiento por entorno al personalizar nombres.",
    "note": "Restaurar la macro estándar después; las otras macros siguen el mismo patrón de override con firmas propias.",
    "examples": [
      {
        "id": "dbt/configuracion-de-recursos/nombres-personalizados/1",
        "title": "Personalizar un esquema (macros/generate_schema_name.sql)",
        "language": "sql",
        "code": "{% macro generate_schema_name(custom_schema_name, node) -%}\n  {{ target.schema }}{% if custom_schema_name is not none %}_{{ custom_schema_name | trim }}{% endif %}\n{%- endmacro %}",
        "hint": "Conservar aislamiento por entorno al personalizar nombres.",
        "textOutput": "schema finance resuelve dbt_dev_finance; sin schema personalizado, dbt_dev.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/configuracion-de-recursos/enabled-y-tags",
    "remember": "No deshabilitar modelos que otros modelos activos necesitan.",
    "examples": [
      {
        "id": "dbt/configuracion-de-recursos/enabled-y-tags/1",
        "title": "Etiquetar un modelo de laboratorio",
        "language": "sql",
        "code": "{{ config(enabled=true, tags=['daily']) }}\nselect * from {{ ref('fct_orders') }}",
        "hint": "No deshabilitar modelos que otros modelos activos necesitan.",
        "textOutput": "dbt ls --select tag:daily lista lab_example.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/configuracion-de-recursos/versiones-de-proyecto",
    "remember": "La versión de proyecto no es la versión de Core.",
    "examples": [
      {
        "id": "dbt/configuracion-de-recursos/versiones-de-proyecto/1",
        "title": "Restringir la versión del motor",
        "language": "yaml",
        "code": "require-dbt-version: ['>=1.10.6', '<1.11.0']",
        "hint": "La versión de proyecto no es la versión de Core.",
        "textOutput": "Una versión fuera del intervalo produce error de compatibilidad.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
