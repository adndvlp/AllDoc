// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/definicion",
    "remember": "Separar responsabilidades: carga, transformación, validación y consumo.",
    "examples": [
      {
        "id": "dbt/extensibilidad-e-integraciones/definicion/1",
        "title": "Integrar una tienda",
        "language": "text",
        "code": "Fivetran/Airbyte → raw → dbt → marts → Power BI/Tableau/Looker/Metabase",
        "hint": "dbt se integra con herramientas de ingestión, orquestación, calidad y consumo mediante modelos, artefactos, APIs y adaptadores.",
        "textOutput": "Los dashboards consultan relaciones publicadas; dbt no realiza la extracción de APIs por defecto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/dbtrunner-e-invoke",
    "remember": "No ejecutar varias invocaciones concurrentes en el mismo proceso; usar procesos separados.",
    "examples": [
      {
        "id": "dbt/extensibilidad-e-integraciones/dbtrunner-e-invoke/1",
        "title": "Ejecutar un build desde Python",
        "language": "python",
        "code": "from dbt.cli.main import dbtRunner\nresult = dbtRunner().invoke(['build','--select','fct_orders'])\nprint(result.success)\nif not result.success:\n    raise SystemExit(1)",
        "hint": "No ejecutar varias invocaciones concurrentes en el mismo proceso; usar procesos separados.",
        "textOutput": "True si el modelo y tests seleccionados se construyen; requiere proyecto, perfil y upstream disponibles.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/dependencias-explicitas-y-dinamicas",
    "remember": "Usar comentario SQL, no comentario Jinja, para una referencia explícita.",
    "examples": [
      {
        "id": "dbt/extensibilidad-e-integraciones/dependencias-explicitas-y-dinamicas/1",
        "title": "Registrar un padre aunque se use en una rama",
        "language": "sql",
        "code": "-- depends_on: {{ ref('stg_orders') }}\n{% if execute %}\nselect count(*) as n from {{ ref('stg_orders') }}\n{% else %}\nselect 0 as n\n{% endif %}",
        "hint": "Usar comentario SQL, no comentario Jinja, para una referencia explícita.",
        "textOutput": "El DAG registra stg_orders y la ejecución devuelve n=5.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/adaptadores-personalizados",
    "remember": "No es lo mismo que escribir una macro SQL dentro de un proyecto.",
    "examples": [
      {
        "id": "dbt/extensibilidad-e-integraciones/adaptadores-personalizados/1",
        "title": "Diseñar integración de un motor nuevo",
        "language": "text",
        "code": "Implementar conexión → Relation/Column → macros y materializaciones → pruebas de adaptador",
        "hint": "Un adaptador integra conexiones, relaciones, macros y estrategias de un motor con dbt.",
        "textOutput": "El motor puede aparecer como plugin solo tras implementar y distribuir el adaptador; ejemplo conceptual, no código ejecutable.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/administrative-discovery-y-semantic-layer-apis",
    "remember": "Usar tokens de alcance mínimo y endpoint regional correcto; no confundir con API Python de Core.",
    "examples": [
      {
        "id": "dbt/extensibilidad-e-integraciones/administrative-discovery-y-semantic-layer-apis/1",
        "title": "Consultar una ejecución mediante la API administrativa",
        "language": "text",
        "code": "Obtener token autorizado → elegir base URL de cuenta → consultar run por ID con endpoint documentado",
        "hint": "Las APIs de plataforma permiten administrar jobs, consultar metadatos y consumir métricas respectivamente.",
        "textOutput": "Se recibe metadata de ejecución si token, cuenta e ID son válidos; no requiere acceso directo al warehouse para consultar el estado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/observabilidad-y-telemetria",
    "remember": "No asumir que todos los motores/exportadores emiten las mismas trazas.",
    "examples": [
      {
        "id": "dbt/extensibilidad-e-integraciones/observabilidad-y-telemetria/1",
        "title": "Guardar salida estructurada para un colector",
        "language": "bash",
        "code": "dbt --log-format json build > dbt-events.jsonl",
        "hint": "No asumir que todos los motores/exportadores emiten las mismas trazas.",
        "textOutput": "Archivo de eventos de consola para análisis, sin garantía de formato idéntico entre versiones; configurar el colector por separado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/calidad-externa-y-auditoria",
    "remember": "Comparar claves, grano y diferencias de filas antes de migrar una tabla.",
    "examples": [
      {
        "id": "dbt/extensibilidad-e-integraciones/calidad-externa-y-auditoria/1",
        "title": "Comparar dos versiones sin paquete externo",
        "language": "sql",
        "code": "select order_id, amount from {{ ref('fct_orders') }}\nexcept\nselect order_id, amount from {{ ref('int_completed_orders') }}",
        "hint": "Comparar claves, grano y diferencias de filas antes de migrar una tabla.",
        "textOutput": "Cero filas con los modelos base; invertir EXCEPT para comprobar diferencias en ambos sentidos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/sqlfluff-y-desarrollo",
    "remember": "Lint no prueba reglas de negocio; ejecutar también dbt test.",
    "examples": [
      {
        "id": "dbt/extensibilidad-e-integraciones/sqlfluff-y-desarrollo/1",
        "title": "Revisar SQL con templater dbt",
        "language": "bash",
        "code": "python -m pip install sqlfluff sqlfluff-templater-dbt\nsqlfluff lint models --dialect postgres --templater dbt",
        "hint": "Lint no prueba reglas de negocio; ejecutar también dbt test.",
        "textOutput": "Se muestran infracciones de estilo/sintaxis según reglas y versión; no modifica archivos con lint.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
