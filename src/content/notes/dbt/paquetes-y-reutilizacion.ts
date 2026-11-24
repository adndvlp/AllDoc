// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/definicion",
    "remember": "Fijar versiones y revisar compatibilidad antes de actualizar.",
    "examples": [
      {
        "id": "dbt/paquetes-y-reutilizacion/definicion/1",
        "title": "Declarar dbt-utils (packages.yml)",
        "language": "yaml",
        "code": "packages:\n  - package: dbt-labs/dbt_utils\n    version: 1.3.0",
        "hint": "Fijar versiones y revisar compatibilidad antes de actualizar.",
        "textOutput": "dbt deps instala el paquete compatible en dbt_packages y genera lockfile.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/packages-yml-y-dependencies-yml",
    "remember": "No declarar el mismo conjunto en archivos incompatibles; distinguir paquetes de proyectos.",
    "examples": [
      {
        "id": "dbt/paquetes-y-reutilizacion/packages-yml-y-dependencies-yml/1",
        "title": "Resolver dependencias",
        "language": "bash",
        "code": "dbt deps",
        "hint": "No declarar el mismo conjunto en archivos incompatibles; distinguir paquetes de proyectos.",
        "textOutput": "Se descarga el paquete especificado en packages.yml y se actualiza package-lock.yml.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/lockfile-y-version-pinning",
    "remember": "Versionar el lockfile y actualizarlo deliberadamente.",
    "examples": [
      {
        "id": "dbt/paquetes-y-reutilizacion/lockfile-y-version-pinning/1",
        "title": "Actualizar versiones permitidas",
        "language": "bash",
        "code": "dbt deps --upgrade",
        "hint": "Versionar el lockfile y actualizarlo deliberadamente.",
        "textOutput": "Se vuelven a resolver las versiones; con pin exacto se conserva la versión fijada salvo otros cambios.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/dbt-utils",
    "remember": "Usar namespace del paquete y declarar primero la dependencia.",
    "examples": [
      {
        "id": "dbt/paquetes-y-reutilizacion/dbt-utils/1",
        "title": "Generar clave de cliente",
        "language": "sql",
        "code": "select customer_id, {{ dbt_utils.generate_surrogate_key(['customer_id']) }} as sk from {{ ref('stg_customers') }}",
        "hint": "Usar namespace del paquete y declarar primero la dependencia.",
        "textOutput": "Cuatro claves estables y distintas con los datos base; requiere dbt-utils instalado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/dbt-expectations-y-hub",
    "remember": "Verificar versión y repositorio actual antes de instalar paquetes comunitarios.",
    "examples": [
      {
        "id": "dbt/paquetes-y-reutilizacion/dbt-expectations-y-hub/1",
        "title": "Ejemplo de test de rango tras instalar paquete compatible",
        "language": "yaml",
        "code": "models:\n  - name: stg_orders\n    columns:\n      - name: amount\n        data_tests:\n          - dbt_expectations.expect_column_values_to_be_between:\n              arguments:\n                min_value: 0\n                max_value: 1000",
        "hint": "Verificar versión y repositorio actual antes de instalar paquetes comunitarios.",
        "textOutput": "Pasa con cinco importes entre 0 y 1000 si la versión del paquete admite este test y sintaxis.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/hooks-de-modelo",
    "remember": "Evitar efectos secundarios no idempotentes; comportamiento transaccional depende del adaptador.",
    "examples": [
      {
        "id": "dbt/paquetes-y-reutilizacion/hooks-de-modelo/1",
        "title": "Analizar estadísticas de una tabla PostgreSQL",
        "language": "sql",
        "code": "{{ config(materialized='table', post_hook='analyze {{ this }}') }}\nselect * from {{ ref('fct_orders') }}",
        "hint": "Evitar efectos secundarios no idempotentes; comportamiento transaccional depende del adaptador.",
        "textOutput": "Se construye lab_example y se ejecuta ANALYZE sobre su relación.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/hooks-de-proyecto",
    "remember": "Se ejecutan por invocación, no por cada fila ni necesariamente por cada nodo.",
    "examples": [
      {
        "id": "dbt/paquetes-y-reutilizacion/hooks-de-proyecto/1",
        "title": "Registrar el inicio (dbt_project.yml)",
        "language": "yaml",
        "code": "on-run-start:\n  - \"{{ log('Inicio del proyecto', info=true) }}\"",
        "hint": "Se ejecutan por invocación, no por cada fila ni necesariamente por cada nodo.",
        "textOutput": "Se registra el mensaje al iniciar un comando que ejecuta el hook; no modifica datos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/dbt-run-operation",
    "remember": "Una macro de operación puede cambiar datos: revisar el código antes de ejecutarla.",
    "examples": [
      {
        "id": "dbt/paquetes-y-reutilizacion/dbt-run-operation/1",
        "title": "Crear una operación (macros/report_message.sql)",
        "language": "sql",
        "code": "{% macro report_message(label='ventas') %}\n  {% do log('Reporte: ' ~ label, info=true) %}\n{% endmacro %}",
        "hint": "Una macro de operación puede cambiar datos: revisar el código antes de ejecutarla.",
        "textOutput": "dbt run-operation report_message --args '{label: mensual}' imprime Reporte: mensual.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/materializaciones-personalizadas",
    "remember": "Es código de infraestructura: manejar caché, relaciones existentes, transacciones y hooks.",
    "note": "Ejemplo conceptual; no es una implementación ejecutable ni se garantiza portabilidad.",
    "examples": [
      {
        "id": "dbt/paquetes-y-reutilizacion/materializaciones-personalizadas/1",
        "title": "Diseñar una materialización",
        "language": "text",
        "code": "Obtener this → preparar relación → ejecutar DDL → aplicar hooks/commit → devolver relaciones creadas",
        "hint": "Un bloque materialization implementa cómo construir relaciones para un adaptador.",
        "textOutput": "La especificación del adaptador define los pasos exactos. Usar view/table incorporadas hasta necesitar un comportamiento distinto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
