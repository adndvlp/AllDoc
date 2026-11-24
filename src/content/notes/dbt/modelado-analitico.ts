// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/modelado-analitico/definicion",
    "remember": "Declarar qué representa cada fila antes de elegir joins o métricas.",
    "examples": [
      {
        "id": "dbt/modelado-analitico/definicion/1",
        "title": "Identificar granularidad",
        "language": "text",
        "code": "fct_orders: un pedido completado\ndim_customers: un cliente\ncustomer_revenue: un cliente",
        "hint": "Modelar datos es organizar hechos y atributos para contestar preguntas de negocio sin ambigüedades.",
        "textOutput": "Cuatro, cuatro y cuatro filas respectivamente; no mezclar granos sin decidir agregación.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/modelado-analitico/facts-dimensions-y-esquema-estrella",
    "remember": "Una dimensión debe ser única en la clave usada para unirla al hecho.",
    "examples": [
      {
        "id": "dbt/modelado-analitico/facts-dimensions-y-esquema-estrella/1",
        "title": "Ingresos por país",
        "language": "sql",
        "code": "select c.country, sum(o.amount) as revenue\nfrom {{ ref('fct_orders') }} o join {{ ref('dim_customers') }} c using(customer_id)\ngroup by c.country order by c.country",
        "hint": "Una dimensión debe ser única en la clave usada para unirla al hecho.",
        "textOutput": "ES 150; MX 350.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/modelado-analitico/grain-y-fan-out",
    "remember": "Agregar antes de unir hechos cuando sus granos difieren.",
    "examples": [
      {
        "id": "dbt/modelado-analitico/grain-y-fan-out/1",
        "title": "Detectar multiplicación de clientes",
        "language": "sql",
        "code": "select count(*) as joined_rows, count(distinct c.customer_id) as customers\nfrom {{ ref('dim_customers') }} c left join {{ ref('fct_orders') }} o using(customer_id)",
        "hint": "Agregar antes de unir hechos cuando sus granos difieren.",
        "textOutput": "joined_rows=5; customers=4. Ana aparece dos veces.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/modelado-analitico/claves-naturales-sustitutas-y-compuestas",
    "remember": "No concatenar claves sin tratar separadores, NULL y posibles colisiones.",
    "examples": [
      {
        "id": "dbt/modelado-analitico/claves-naturales-sustitutas-y-compuestas/1",
        "title": "Crear clave técnica (PostgreSQL)",
        "language": "sql",
        "code": "select customer_id, md5('shop:' || customer_id::text) as customer_key from {{ ref('stg_customers') }}",
        "hint": "No concatenar claves sin tratar separadores, NULL y posibles colisiones.",
        "textOutput": "Cuatro claves de texto hexadecimales estables para IDs base.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/modelado-analitico/bridge-tables",
    "remember": "Una tabla puente puede multiplicar medidas si no se define atribución.",
    "examples": [
      {
        "id": "dbt/modelado-analitico/bridge-tables/1",
        "title": "Crear una relación cliente-mes de compra",
        "language": "sql",
        "code": "select distinct customer_id, date_trunc('month',order_date)::date as month from {{ ref('fct_orders') }}",
        "hint": "Una tabla puente puede multiplicar medidas si no se define atribución.",
        "textOutput": "Tres relaciones: cliente 1 enero, 2 enero, 3 febrero.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/modelado-analitico/deduplicacion",
    "remember": "Un ORDER BY determinista evita elegir arbitrariamente entre empates.",
    "examples": [
      {
        "id": "dbt/modelado-analitico/deduplicacion/1",
        "title": "Conservar la versión más nueva (datos simulados)",
        "language": "sql",
        "code": "with versions(id,amount,ts) as (values (1,100,1),(1,120,2),(2,50,1)), ranked as (\nselect *, row_number() over(partition by id order by ts desc) as rn from versions)\nselect id, amount from ranked where rn=1 order by id",
        "hint": "Un ORDER BY determinista evita elegir arbitrariamente entre empates.",
        "textOutput": "1:120; 2:50.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/modelado-analitico/reconciliacion",
    "remember": "Comparar el mismo filtro y granularidad.",
    "examples": [
      {
        "id": "dbt/modelado-analitico/reconciliacion/1",
        "title": "Verificar ingresos de pedidos completados",
        "language": "sql",
        "code": "select (select sum(amount) from {{ ref('stg_orders') }} where status='completed') - (select sum(amount) from {{ ref('fct_orders') }}) as difference",
        "hint": "Comparar el mismo filtro y granularidad.",
        "textOutput": "difference=0.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
