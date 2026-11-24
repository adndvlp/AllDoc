// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/definicion",
    "remember": "MetricFlow construye SQL a partir de métricas y dimensiones; no sustituye modelos físicos.",
    "examples": [
      {
        "id": "dbt/semantic-layer-y-metricflow/definicion/1",
        "title": "Consultar una métrica común",
        "language": "text",
        "code": "fct_orders → modelo semántico orders → métrica revenue → agrupación por mes",
        "hint": "La capa semántica define métricas y relaciones de negocio encima de modelos para generar consultas coherentes.",
        "textOutput": "Enero 350, febrero 150 en los datos base; requiere configuración y entorno MetricFlow compatible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/semantic-models-y-entities",
    "remember": "La clave debe corresponder al grain real, no solo a un nombre de columna.",
    "note": "Sintaxis clásica; para consultar métricas hace falta un motor MetricFlow y adaptador soportados, no solo dbt-postgres.",
    "examples": [
      {
        "id": "dbt/semantic-layer-y-metricflow/semantic-models-y-entities/1",
        "title": "Definir pedidos en sintaxis clásica (models/semantic_orders.yml)",
        "language": "yaml",
        "code": "semantic_models:\n  - name: orders\n    model: ref('fct_orders')\n    defaults:\n      agg_time_dimension: order_date\n    entities:\n      - {name: order, type: primary, expr: order_id}\n      - {name: customer, type: foreign, expr: customer_id}\n    dimensions:\n      - name: order_date\n        type: time\n        type_params: {time_granularity: day}\n      - {name: status, type: categorical}\n    measures:\n      - {name: order_revenue, agg: sum, expr: amount}\n      - {name: order_count, agg: count, expr: order_id}",
        "hint": "La clave debe corresponder al grain real, no solo a un nombre de columna.",
        "textOutput": "En Core 1.10 el recurso declara dos medidas, fecha diaria y entidades pedido/cliente. Ejecutar parse para validar la estructura.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/measures-y-simple-metrics-clasico",
    "remember": "Las measures se reemplazan por simple metrics directas en la nueva especificación.",
    "examples": [
      {
        "id": "dbt/semantic-layer-y-metricflow/measures-y-simple-metrics-clasico/1",
        "title": "Publicar ingresos y número de pedidos (añadir al YAML clásico)",
        "language": "yaml",
        "code": "metrics:\n  - name: revenue\n    label: Revenue\n    type: simple\n    type_params: {measure: order_revenue}\n  - name: orders_count\n    label: Orders\n    type: simple\n    type_params: {measure: order_count}",
        "hint": "Las measures se reemplazan por simple metrics directas en la nueva especificación.",
        "textOutput": "Métricas esperadas sin agrupación: revenue=500 y orders_count=4 en plataforma compatible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/nueva-especificacion-yaml",
    "remember": "No mezclar el modelo semántico clásico y el nuevo para la misma definición.",
    "examples": [
      {
        "id": "dbt/semantic-layer-y-metricflow/nueva-especificacion-yaml/1",
        "title": "Definir ingresos con sintaxis nueva (alternativa al YAML clásico)",
        "language": "yaml",
        "code": "models:\n  - name: fct_orders\n    semantic_model:\n      enabled: true\n    agg_time_dimension: order_date\n    columns:\n      - name: order_id\n        entity: {name: order, type: primary}\n      - name: customer_id\n        entity: {name: customer, type: foreign}\n      - name: order_date\n        granularity: day\n        dimension: {type: time}\n      - name: status\n        dimension: {type: categorical}\n    metrics:\n      - name: revenue\n        type: simple\n        agg: sum\n        expr: amount\n      - name: orders_count\n        type: simple\n        agg: count\n        expr: order_id",
        "hint": "No mezclar el modelo semántico clásico y el nuevo para la misma definición.",
        "textOutput": "Equivale a las dos métricas clásicas; revenue=500, orders_count=4. No se ejecuta en Core 1.10.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/dimensiones-categoricas-y-temporales",
    "remember": "No sumar promedios de grupos sin ponderar.",
    "examples": [
      {
        "id": "dbt/semantic-layer-y-metricflow/dimensiones-categoricas-y-temporales/1",
        "title": "Desglosar revenue por mes",
        "language": "text",
        "code": "Métrica: revenue\nDimensión temporal: metric_time, granularidad month",
        "hint": "Permiten dividir una métrica por atributos o periodos.",
        "textOutput": "2026-01:350; 2026-02:150, en una consulta compatible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/ratio-metrics",
    "remember": "Calcular ratio de agregados, no promedio de ratios sin justificación.",
    "examples": [
      {
        "id": "dbt/semantic-layer-y-metricflow/ratio-metrics/1",
        "title": "Definir ticket medio en spec clásica (añadir a metrics)",
        "language": "yaml",
        "code": "- name: average_order_value\n  label: Average order value\n  type: ratio\n  type_params:\n    numerator: revenue\n    denominator: orders_count",
        "hint": "Calcular ratio de agregados, no promedio de ratios sin justificación.",
        "textOutput": "500/4 = 125 sin agrupación; enero 350/3, febrero 150/1. Nueva spec: numerator y denominator directamente en la métrica.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/derived-metrics",
    "remember": "Declarar las métricas de entrada y sus alias si se usan.",
    "examples": [
      {
        "id": "dbt/semantic-layer-y-metricflow/derived-metrics/1",
        "title": "Estimar ingreso neto hipotético del 90% (spec clásica)",
        "language": "yaml",
        "code": "- name: estimated_net\n  label: Estimated net\n  type: derived\n  type_params:\n    expr: revenue * 0.9\n    metrics:\n      - name: revenue",
        "hint": "Declarar las métricas de entrada y sus alias si se usan.",
        "textOutput": "450 total; es una regla de negocio simulada, no ingreso neto real. En spec nueva expr y metrics son claves directas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/time-spine",
    "remember": "Debe cubrir el rango de datos y la granularidad requerida.",
    "examples": [
      {
        "id": "dbt/semantic-layer-y-metricflow/time-spine/1",
        "title": "Crear models/time_spine.sql para un laboratorio PostgreSQL",
        "language": "sql",
        "code": "{{ config(materialized='table') }}\nselect d::date as date_day\nfrom generate_series(date '2026-01-01',date '2026-02-28',interval '1 day') as t(d)",
        "hint": "Debe cubrir el rango de datos y la granularidad requerida.",
        "textOutput": "59 días; para MetricFlow declarar además time_spine.standard_granularity_column: date_day en propiedades del modelo y granularity: day en la columna según versión.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/cumulative-metrics",
    "remember": "Requieren time spine y dimensión temporal compatible.",
    "examples": [
      {
        "id": "dbt/semantic-layer-y-metricflow/cumulative-metrics/1",
        "title": "Definir acumulado de ingresos (spec clásica)",
        "language": "yaml",
        "code": "- name: cumulative_revenue\n  label: Cumulative revenue\n  type: cumulative\n  type_params:\n    measure: order_revenue",
        "hint": "Requieren time spine y dimensión temporal compatible.",
        "textOutput": "Con time spine y consulta por mes: acumulado enero 350, febrero 500; validar configuración y rango temporal en MetricFlow.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/conversion-metrics",
    "remember": "Definir la entidad, orden temporal, ventana y criterio de conteo.",
    "note": "La especificación YAML de conversion difiere por versión; consultar referencia oficial antes de implementarla.",
    "examples": [
      {
        "id": "dbt/semantic-layer-y-metricflow/conversion-metrics/1",
        "title": "Definir conversión de visita a compra",
        "language": "text",
        "code": "Datos ilustrativos: visitas A día 1, B día 1; compra A día 2.\nEntidad: usuario; base: visita; conversión: compra; ventana: 7 días.",
        "hint": "Miden qué proporción de entidades con evento base realiza un evento posterior dentro de una ventana.",
        "textOutput": "1 de 2 usuarios convierte: 50%. No hay tabla de visitas en el dataset base; ejemplo conceptual de la métrica.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/saved-queries-y-exports",
    "remember": "Un saved query no es un modelo SQL ordinario.",
    "examples": [
      {
        "id": "dbt/semantic-layer-y-metricflow/saved-queries-y-exports/1",
        "title": "Guardar consulta mensual (archivo YAML en entorno compatible)",
        "language": "yaml",
        "code": "saved_queries:\n  - name: monthly_revenue\n    query_params:\n      metrics: [revenue]\n      group_by: [\"TimeDimension('metric_time', 'month')\"]",
        "hint": "Un saved query no es un modelo SQL ordinario.",
        "textOutput": "La consulta semántica produce ingresos por mes; export requiere configuración adicional de tipo, nombre y entorno.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/consumo-desde-bi-y-api",
    "remember": "La disponibilidad depende del plan, permisos, adaptador y conector.",
    "examples": [
      {
        "id": "dbt/semantic-layer-y-metricflow/consumo-desde-bi-y-api/1",
        "title": "Consumir monthly_revenue",
        "language": "text",
        "code": "Configurar credenciales de solo lectura → elegir revenue y month en conector compatible → ejecutar consulta",
        "hint": "La plataforma permite consultar métricas con conectores compatibles o APIs semánticas.",
        "textOutput": "El reporte muestra 350 y 150 si se usan los datos de laboratorio en plataforma compatible; no se conecta automáticamente desde Core.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
