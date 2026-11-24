// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/macros-y-contexto/definicion",
    "remember": "Una macro genera código o devuelve valores de plantilla; no es necesariamente una UDF del motor.",
    "examples": [
      {
        "id": "dbt/macros-y-contexto/definicion/1",
        "title": "Definir macro (macros/cents.sql)",
        "language": "sql",
        "code": "{% macro cents(amount) %}\n  round(({{ amount }}) * 100, 0)\n{% endmacro %}",
        "hint": "Una macro genera código o devuelve valores de plantilla; no es necesariamente una UDF del motor.",
        "textOutput": "Llamar cents('amount') genera una expresión SQL de centavos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/macros-y-contexto/argumentos-y-return",
    "remember": "Pasar nombres de columnas como texto al generar SQL.",
    "examples": [
      {
        "id": "dbt/macros-y-contexto/argumentos-y-return/1",
        "title": "Devolver una lista (macros/order_columns.sql)",
        "language": "sql",
        "code": "{% macro order_columns() %}\n  {{ return(['order_id','amount']) }}\n{% endmacro %}",
        "hint": "Pasar nombres de columnas como texto al generar SQL.",
        "textOutput": "order_columns() devuelve una lista Jinja; join(', ') produce order_id, amount.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/macros-y-contexto/invocar-macros",
    "remember": "Las macros que producen SQL deben estar en un contexto SQL válido.",
    "examples": [
      {
        "id": "dbt/macros-y-contexto/invocar-macros/1",
        "title": "Convertir importes a centavos",
        "language": "sql",
        "code": "select order_id, {{ cents('amount') }} as cents from {{ ref('fct_orders') }} order by order_id",
        "hint": "Las macros que producen SQL deben estar en un contexto SQL válido.",
        "textOutput": "101:10000; 102:5000; 103:20000; 105:15000; requiere macro cents.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/macros-y-contexto/this-y-target",
    "remember": "this se usa, por ejemplo, para leer la tabla incremental existente.",
    "examples": [
      {
        "id": "dbt/macros-y-contexto/this-y-target/1",
        "title": "Mostrar el entorno del modelo",
        "language": "sql",
        "code": "select '{{ target.name }}' as env, '{{ this.identifier }}' as relation_name",
        "hint": "this se usa, por ejemplo, para leer la tabla incremental existente.",
        "textOutput": "dev y lab_example si ese es el nombre del modelo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/macros-y-contexto/model-graph-y-flags",
    "remember": "Durante parse el grafo puede estar incompleto.",
    "examples": [
      {
        "id": "dbt/macros-y-contexto/model-graph-y-flags/1",
        "title": "Inspeccionar el nodo durante ejecución",
        "language": "sql",
        "code": "{% if execute %}{% do log(model.name ~ ':' ~ flags.WHICH, info=true) %}{% endif %}\nselect 1 as ok",
        "hint": "Durante parse el grafo puede estar incompleto.",
        "textOutput": "Se registra el nombre y comando, por ejemplo lab_example:run; ok=1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/macros-y-contexto/execute-parse-y-compilacion",
    "remember": "Proteger accesos a resultados de consultas con if execute; compile también puede ejecutar macros de consulta.",
    "examples": [
      {
        "id": "dbt/macros-y-contexto/execute-parse-y-compilacion/1",
        "title": "Evitar acceder a un resultado durante parse",
        "language": "sql",
        "code": "{% if execute %}\n  {% set r = run_query('select 1') %}\n  {% set n = r.columns[0].values()[0] %}\n{% else %}{% set n = 0 %}{% endif %}\nselect {{ n }} as n",
        "hint": "Proteger accesos a resultados de consultas con if execute; compile también puede ejecutar macros de consulta.",
        "textOutput": "En ejecución n=1; parse no intenta leer una tabla de resultados inexistente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/macros-y-contexto/run-query",
    "remember": "No inicia una transacción automáticamente; evitar efectos secundarios durante compilación.",
    "examples": [
      {
        "id": "dbt/macros-y-contexto/run-query/1",
        "title": "Consultar un total en compilación",
        "language": "sql",
        "code": "{% if execute %}\n  {% set r=run_query('select count(*) from raw.orders') %}\n  {% set n=r.columns[0].values()[0] %}\n{% else %}{% set n=0 %}{% endif %}\nselect {{ n }} as n",
        "hint": "No inicia una transacción automáticamente; evitar efectos secundarios durante compilación.",
        "textOutput": "n=5 en la ejecución del modelo con los datos iniciales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/macros-y-contexto/statement-blocks",
    "remember": "fetch_result debe activarse para leer filas.",
    "examples": [
      {
        "id": "dbt/macros-y-contexto/statement-blocks/1",
        "title": "Recuperar un conteo",
        "language": "sql",
        "code": "{% if execute %}\n  {% call statement('n_orders', fetch_result=true) %}select count(*) from raw.orders{% endcall %}\n  {% set n=load_result('n_orders')['data'][0][0] %}\n{% else %}{% set n=0 %}{% endif %}\nselect {{ n }} as n",
        "hint": "fetch_result debe activarse para leer filas.",
        "textOutput": "n=5.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/macros-y-contexto/adapter-y-relation",
    "remember": "No concatenar nombres físicos a ciegas.",
    "examples": [
      {
        "id": "dbt/macros-y-contexto/adapter-y-relation/1",
        "title": "Inspeccionar columnas de staging",
        "language": "sql",
        "code": "{% set rel = ref('stg_orders') %}\n{% if execute %}\n  {% set cols=adapter.get_columns_in_relation(rel) %}\n  {% do log(cols | map(attribute='name') | join(', '), info=true) %}\n{% endif %}\nselect 1 as ok",
        "hint": "No concatenar nombres físicos a ciegas.",
        "textOutput": "Con staging construido, el log enumera seis columnas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/macros-y-contexto/dispatch",
    "remember": "Implementar variantes cuando el SQL cambia entre motores.",
    "examples": [
      {
        "id": "dbt/macros-y-contexto/dispatch/1",
        "title": "Crear macro despachada (macros/label.sql)",
        "language": "sql",
        "code": "{% macro label() %}{{ return(adapter.dispatch('label','tienda_dbt')()) }}{% endmacro %}\n{% macro default__label() %} 'generic' {% endmacro %}\n{% macro postgres__label() %} 'postgres' {% endmacro %}",
        "hint": "Implementar variantes cuando el SQL cambia entre motores.",
        "textOutput": "select {{ label() }} as engine devuelve postgres en el laboratorio.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/macros-y-contexto/serializacion-json-y-yaml",
    "remember": "Distinguir tipos Jinja del texto SQL generado.",
    "examples": [
      {
        "id": "dbt/macros-y-contexto/serializacion-json-y-yaml/1",
        "title": "Extraer un valor JSON",
        "language": "sql",
        "code": "{% set cfg=fromjson('{\"threshold\": 150}') %}\nselect {{ cfg['threshold'] }} as threshold",
        "hint": "Distinguir tipos Jinja del texto SQL generado.",
        "textOutput": "150; toyaml(cfg) o tojson(cfg) devolverían texto serializado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/macros-y-contexto/log-exceptions-y-metadatos",
    "remember": "No imprimir secretos ni generar errores por datos que podrían ser normales.",
    "examples": [
      {
        "id": "dbt/macros-y-contexto/log-exceptions-y-metadatos/1",
        "title": "Validar un parámetro",
        "language": "sql",
        "code": "{% set n=var('min_amount',150) %}\n{% if n < 0 %}{{ exceptions.raise_compiler_error('min_amount negativo') }}{% endif %}\n{% do log(invocation_id, info=true) %}\nselect {{ n }} as n",
        "hint": "No imprimir secretos ni generar errores por datos que podrían ser normales.",
        "textOutput": "150 por defecto; con min_amount=-1 la compilación falla deliberadamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
