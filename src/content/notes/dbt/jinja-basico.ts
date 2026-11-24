// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/jinja-basico/definicion",
    "remember": "Jinja actúa en compilación; SQL opera sobre filas en el warehouse.",
    "examples": [
      {
        "id": "dbt/jinja-basico/definicion/1",
        "title": "Generar una constante",
        "language": "sql",
        "code": "select {{ 50 * 2 }} as amount",
        "hint": "Jinja actúa en compilación; SQL opera sobre filas en el warehouse.",
        "textOutput": "SQL compilado select 100 as amount; devuelve 100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/jinja-basico/expresiones-y-comentarios",
    "remember": "Los comentarios Jinja desaparecen del SQL compilado.",
    "examples": [
      {
        "id": "dbt/jinja-basico/expresiones-y-comentarios/1",
        "title": "Insertar un valor",
        "language": "sql",
        "code": "{# comentario interno #}\nselect {{ 2 + 3 }} as n",
        "hint": "Los comentarios Jinja desaparecen del SQL compilado.",
        "textOutput": "n=5; el comentario no aparece en SQL compilado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/jinja-basico/set-y-tipos",
    "remember": "Las variables Jinja no son columnas SQL.",
    "examples": [
      {
        "id": "dbt/jinja-basico/set-y-tipos/1",
        "title": "Reutilizar una constante",
        "language": "sql",
        "code": "{% set limits = {'low': 100, 'high': 200} %}\nselect {{ limits['high'] }} as threshold",
        "hint": "Las variables Jinja no son columnas SQL.",
        "textOutput": "threshold=200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/jinja-basico/if-elif-y-else",
    "remember": "No confundir con CASE WHEN por fila.",
    "examples": [
      {
        "id": "dbt/jinja-basico/if-elif-y-else/1",
        "title": "Elegir una etiqueta",
        "language": "sql",
        "code": "{% if target.name == 'dev' %}\nselect 'sandbox' as env\n{% else %}\nselect 'production' as env\n{% endif %}",
        "hint": "No confundir con CASE WHEN por fila.",
        "textOutput": "env=sandbox con target dev.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/jinja-basico/for-loop-y-filtros",
    "remember": "No recorre las filas de una tabla a menos que obtengas datos explícitamente.",
    "examples": [
      {
        "id": "dbt/jinja-basico/for-loop-y-filtros/1",
        "title": "Generar columnas de un SELECT",
        "language": "sql",
        "code": "{% for col in ['order_id','amount'] %}\n  {% if loop.first %}select {% endif %}{{ col }}{% if not loop.last %}, {% endif %}\n{% endfor %}\nfrom {{ ref('stg_orders') }}",
        "hint": "No recorre las filas de una tabla a menos que obtengas datos explícitamente.",
        "textOutput": "Cinco filas con order_id y amount.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/jinja-basico/filtros-jinja",
    "remember": "El operador | aplica un filtro al valor de su izquierda.",
    "examples": [
      {
        "id": "dbt/jinja-basico/filtros-jinja/1",
        "title": "Construir una lista de columnas",
        "language": "sql",
        "code": "{% set cols=['order_id','amount'] %}\nselect {{ cols | join(', ') }} from {{ ref('stg_orders') }}",
        "hint": "El operador | aplica un filtro al valor de su izquierda.",
        "textOutput": "SQL select order_id, amount from la relación de staging.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/jinja-basico/namespace-y-do",
    "remember": "Usarlos para construir estructuras, no como reemplazo de SQL.",
    "examples": [
      {
        "id": "dbt/jinja-basico/namespace-y-do/1",
        "title": "Construir una lista",
        "language": "sql",
        "code": "{% set ns = namespace(cols=[]) %}\n{% for c in ['order_id','amount'] %}{% do ns.cols.append(c) %}{% endfor %}\nselect {{ ns.cols | join(', ') }} from {{ ref('stg_orders') }}",
        "hint": "Usarlos para construir estructuras, no como reemplazo de SQL.",
        "textOutput": "Se generan dos columnas y cinco filas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/jinja-basico/var-y-vars",
    "remember": "--vars cambia el valor de compilación sin editar SQL.",
    "examples": [
      {
        "id": "dbt/jinja-basico/var-y-vars/1",
        "title": "Parametrizar un mínimo",
        "language": "sql",
        "code": "select order_id from {{ ref('fct_orders') }} where amount >= {{ var('min_amount',150) }}",
        "hint": "--vars cambia el valor de compilación sin editar SQL.",
        "textOutput": "103 y 105; con dbt run --vars '{min_amount: 200}' solo 103.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/jinja-basico/env-var",
    "remember": "Los secretos DBT_ENV_SECRET_ se restringen a contextos permitidos como profiles y packages.",
    "examples": [
      {
        "id": "dbt/jinja-basico/env-var/1",
        "title": "Leer la contraseña del perfil",
        "language": "yaml",
        "code": "password: \"{{ env_var('DBT_ENV_SECRET_PASSWORD') }}\"",
        "hint": "Los secretos DBT_ENV_SECRET_ se restringen a contextos permitidos como profiles y packages.",
        "textOutput": "El perfil usa el valor establecido fuera del repositorio; no imprimirlo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
