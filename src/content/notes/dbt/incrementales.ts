// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/incrementales/definicion",
    "remember": "El filtro incremental y la estrategia de escritura son decisiones separadas.",
    "examples": [
      {
        "id": "dbt/incrementales/definicion/1",
        "title": "Crear models/inc_orders.sql",
        "language": "sql",
        "code": "{{ config(materialized='incremental', unique_key='order_id', incremental_strategy='delete+insert') }}\nselect * from {{ ref('stg_orders') }}\n{% if is_incremental() %}\nwhere updated_at >= (select coalesce(max(updated_at),timestamp '1900-01-01') from {{ this }})\n{% endif %}",
        "hint": "El filtro incremental y la estrategia de escritura son decisiones separadas.",
        "textOutput": "Primera ejecución: cinco filas. Repetir sin cambios mantiene cinco IDs.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/incrementales/is-incremental-y-this",
    "remember": "El SQL debe ser válido con ambas ramas.",
    "examples": [
      {
        "id": "dbt/incrementales/is-incremental-y-this/1",
        "title": "Probar primera carga y actualización",
        "language": "bash",
        "code": "dbt run --select inc_orders --full-refresh\ndbt run --select inc_orders",
        "hint": "El SQL debe ser válido con ambas ramas.",
        "textOutput": "Primero carga cinco filas; segundo aplica filtro del ejemplo y actualiza la fila de mayor timestamp sin duplicarla.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/incrementales/unique-key",
    "remember": "No crea por sí sola una restricción UNIQUE ni valida duplicados.",
    "examples": [
      {
        "id": "dbt/incrementales/unique-key/1",
        "title": "Actualizar una orden de laboratorio (PostgreSQL directo)",
        "language": "sql",
        "code": "update raw.orders set amount=160, updated_at=timestamp '2026-02-02 10:00' where order_id=105;",
        "hint": "No crea por sí sola una restricción UNIQUE ni valida duplicados.",
        "textOutput": "Después de dbt run --select inc_orders, 105 vale 160 y siguen cinco filas. Restaurar importe y timestamp originales y ejecutar full-refresh al finalizar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/incrementales/estrategias-append-y-delete-insert",
    "remember": "append solo sirve si el filtro no reenvía filas o si el modelo admite duplicados.",
    "examples": [
      {
        "id": "dbt/incrementales/estrategias-append-y-delete-insert/1",
        "title": "Elegir estrategia de actualización",
        "language": "sql",
        "code": "{{ config(materialized='incremental', unique_key='order_id', incremental_strategy='delete+insert') }}\nselect * from {{ ref('stg_orders') }}",
        "hint": "append solo sirve si el filtro no reenvía filas o si el modelo admite duplicados.",
        "textOutput": "Una segunda carga con las mismas claves conserva cinco filas con entradas únicas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/incrementales/estrategias-merge-e-insert-overwrite",
    "remember": "Postgres 15+ admite merge mediante el adaptador compatible; insert_overwrite se usa en plataformas como BigQuery, no en el laboratorio PostgreSQL.",
    "examples": [
      {
        "id": "dbt/incrementales/estrategias-merge-e-insert-overwrite/1",
        "title": "Configurar merge (alternativa para inc_orders)",
        "language": "sql",
        "code": "{{ config(materialized='incremental', unique_key='order_id', incremental_strategy='merge') }}\nselect * from {{ ref('stg_orders') }}",
        "hint": "Postgres 15+ admite merge mediante el adaptador compatible; insert_overwrite se usa en plataformas como BigQuery, no en el laboratorio PostgreSQL.",
        "textOutput": "Con soporte del adaptador y PostgreSQL 15+, IDs repetidos actualizan filas en lugar de añadirlas; cinco filas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/incrementales/microbatch-y-event-time",
    "remember": "Requiere adaptador compatible y una columna temporal; no es solo un filtro is_incremental.",
    "note": "Consultar matriz de estrategias y versión; evitar usar este ejemplo sin acotar el rango de ejecución.",
    "examples": [
      {
        "id": "dbt/incrementales/microbatch-y-event-time/1",
        "title": "Configurar lotes diarios (ejemplo alternativo)",
        "language": "sql",
        "code": "{{ config(materialized='incremental', incremental_strategy='microbatch', event_time='order_date', begin='2026-01-01', batch_size='day') }}\nselect * from {{ ref('stg_orders') }}",
        "hint": "Requiere adaptador compatible y una columna temporal; no es solo un filtro is_incremental.",
        "textOutput": "En un entorno compatible, dbt construye lotes diarios; requiere configurar event_time también en padres que deban filtrarse, y revisar rango de backfill antes de ejecutar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/incrementales/full-refresh-y-full-refresh",
    "remember": "Usar al cambiar lógica histórica, y comprobar costo.",
    "examples": [
      {
        "id": "dbt/incrementales/full-refresh-y-full-refresh/1",
        "title": "Reconstruir inc_orders",
        "language": "bash",
        "code": "dbt run --select inc_orders --full-refresh",
        "hint": "Usar al cambiar lógica histórica, y comprobar costo.",
        "textOutput": "Cinco filas a partir del estado actual de raw; no conserva versiones anteriores.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/incrementales/on-schema-change",
    "remember": "Añadir una columna no rellena automáticamente valores históricos.",
    "examples": [
      {
        "id": "dbt/incrementales/on-schema-change/1",
        "title": "Fallar si cambia el esquema",
        "language": "sql",
        "code": "{{ config(materialized='incremental', unique_key='order_id', on_schema_change='fail') }}\nselect * from {{ ref('stg_orders') }}",
        "hint": "Añadir una columna no rellena automáticamente valores históricos.",
        "textOutput": "Si se añade una columna al SELECT tras crear la relación, ejecución incremental falla en lugar de modificarla silenciosamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/incrementales/late-arriving-data-y-lookback",
    "remember": "Combinar solapamiento con clave y estrategia de actualización; no cubre atrasos ilimitados.",
    "examples": [
      {
        "id": "dbt/incrementales/late-arriving-data-y-lookback/1",
        "title": "Releer últimos siete días (variante de inc_orders)",
        "language": "sql",
        "code": "{{ config(materialized='incremental', unique_key='order_id', incremental_strategy='delete+insert') }}\nselect * from {{ ref('stg_orders') }}\n{% if is_incremental() %}\nwhere updated_at >= (select coalesce(max(updated_at),timestamp '1900-01-01') - interval '7 days' from {{ this }})\n{% endif %}",
        "hint": "Combinar solapamiento con clave y estrategia de actualización; no cubre atrasos ilimitados.",
        "textOutput": "Una fila con timestamp dentro del solapamiento se reprocesa aunque sea anterior al máximo; se mantienen claves únicas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/incrementales/incremental-predicates",
    "remember": "Un predicado incorrecto puede dejar coincidencias fuera y crear duplicados.",
    "examples": [
      {
        "id": "dbt/incrementales/incremental-predicates/1",
        "title": "Limitar escaneo del destino con merge (ejemplo PostgreSQL)",
        "language": "sql",
        "code": "{{ config(materialized='incremental', unique_key='order_id', incremental_strategy='merge', incremental_predicates=[\"DBT_INTERNAL_DEST.order_date >= date '2026-01-01'\"]) }}\nselect * from {{ ref('stg_orders') }}",
        "hint": "Un predicado incorrecto puede dejar coincidencias fuera y crear duplicados.",
        "textOutput": "Con soporte del adaptador, merge limita la coincidencia a destino desde enero; todos los IDs base están dentro del intervalo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/incrementales/backfill-e-idempotencia",
    "remember": "No avanzar marcas de agua sin considerar correcciones antiguas.",
    "examples": [
      {
        "id": "dbt/incrementales/backfill-e-idempotencia/1",
        "title": "Reprocesar todo en laboratorio",
        "language": "bash",
        "code": "dbt run --select inc_orders --full-refresh\ndbt run --select inc_orders",
        "hint": "No avanzar marcas de agua sin considerar correcciones antiguas.",
        "textOutput": "Cinco filas con los mismos valores al repetir sin cambios; comprobar count(*) y count(distinct order_id).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
