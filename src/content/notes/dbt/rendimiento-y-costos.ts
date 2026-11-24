// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/rendimiento-y-costos/definicion",
    "remember": "Medir con planes y tiempos, no asumir que más modelos significa peor rendimiento.",
    "examples": [
      {
        "id": "dbt/rendimiento-y-costos/definicion/1",
        "title": "Examinar un plan (PostgreSQL después de build)",
        "language": "sql",
        "code": "explain select * from dbt_dev.fct_orders where customer_id=1;",
        "hint": "Medir con planes y tiempos, no asumir que más modelos significa peor rendimiento.",
        "textOutput": "Un plan del motor; con cuatro filas puede elegir scan secuencial aunque exista un índice.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/rendimiento-y-costos/materializacion-y-costo-de-lectura",
    "remember": "Elegir según costo de construcción, lectura y frescura requerida.",
    "examples": [
      {
        "id": "dbt/rendimiento-y-costos/materializacion-y-costo-de-lectura/1",
        "title": "Elegir materializaciones",
        "language": "text",
        "code": "stg_orders: view\nfct_orders: table\ninc_orders: incremental",
        "hint": "Una vista difiere cálculo a consumidores.",
        "textOutput": "Staging ligero, hechos persistidos e incremental para actualizaciones; validar tiempos reales antes de cambiar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/rendimiento-y-costos/indices-particiones-y-clustering",
    "remember": "No copiar configuraciones entre adaptadores.",
    "examples": [
      {
        "id": "dbt/rendimiento-y-costos/indices-particiones-y-clustering/1",
        "title": "Crear índices con configuración PostgreSQL",
        "language": "sql",
        "code": "{{ config(materialized='table', indexes=[{'columns':['customer_id']}]) }}\nselect * from {{ ref('fct_orders') }}",
        "hint": "No copiar configuraciones entre adaptadores.",
        "textOutput": "La tabla lab_example tiene un índice en customer_id si el adaptador admite indexes; no garantiza mejora con pocos datos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/rendimiento-y-costos/explain-y-filtros",
    "remember": "Usar EXPLAIN ANALYZE con precaución: ejecuta la consulta.",
    "examples": [
      {
        "id": "dbt/rendimiento-y-costos/explain-y-filtros/1",
        "title": "Filtrar por intervalo de fecha (PostgreSQL)",
        "language": "sql",
        "code": "explain select * from raw.orders where order_date >= date '2026-01-01' and order_date < date '2026-02-01';",
        "hint": "Usar EXPLAIN ANALYZE con precaución: ejecuta la consulta.",
        "textOutput": "Plan del intervalo; ejecutar sin EXPLAIN devuelve cuatro pedidos, incluidos cancelados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/rendimiento-y-costos/partial-parsing-y-cache",
    "remember": "No es caché de resultados SQL; invalidar si hay metadatos obsoletos.",
    "examples": [
      {
        "id": "dbt/rendimiento-y-costos/partial-parsing-y-cache/1",
        "title": "Forzar un parse completo",
        "language": "bash",
        "code": "dbt --no-partial-parse parse",
        "hint": "No es caché de resultados SQL; invalidar si hay metadatos obsoletos.",
        "textOutput": "Se reconstruye la representación del proyecto sin reutilizar el parse parcial previo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/rendimiento-y-costos/concurrencia",
    "remember": "Más threads pueden aumentar contención o costo.",
    "examples": [
      {
        "id": "dbt/rendimiento-y-costos/concurrencia/1",
        "title": "Comparar dos configuraciones",
        "language": "bash",
        "code": "dbt build --threads 1\ndbt build --threads 4",
        "hint": "Más threads pueden aumentar contención o costo.",
        "textOutput": "Mismos datos esperados; tiempos pueden variar, medir con run_results.json.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
