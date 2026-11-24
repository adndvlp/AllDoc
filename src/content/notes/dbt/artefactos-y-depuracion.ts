// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/artefactos-y-depuracion/definicion",
    "remember": "Consultar la versión de esquema antes de automatizar el consumo.",
    "examples": [
      {
        "id": "dbt/artefactos-y-depuracion/definicion/1",
        "title": "Inspeccionar archivos de una ejecución",
        "language": "bash",
        "code": "dbt build\nls target",
        "hint": "Consultar la versión de esquema antes de automatizar el consumo.",
        "textOutput": "manifest.json y run_results.json, además de directorios compiled/run cuando corresponda.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/artefactos-y-depuracion/manifest-json",
    "remember": "No confundir lo declarado en manifest con lo que efectivamente se construyó.",
    "examples": [
      {
        "id": "dbt/artefactos-y-depuracion/manifest-json/1",
        "title": "Leer dependencias de fct_orders",
        "language": "python",
        "code": "import json\nwith open('target/manifest.json') as f:\n    m=json.load(f)\nprint(m['nodes']['model.tienda_dbt.fct_orders']['depends_on']['nodes'])",
        "hint": "No confundir lo declarado en manifest con lo que efectivamente se construyó.",
        "textOutput": "Incluye model.tienda_dbt.int_completed_orders en el proyecto base.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/artefactos-y-depuracion/run-results-json",
    "remember": "La siguiente ejecución puede sobrescribirlo; conservar copias para histórico.",
    "examples": [
      {
        "id": "dbt/artefactos-y-depuracion/run-results-json/1",
        "title": "Leer estados de ejecución",
        "language": "python",
        "code": "import json\nwith open('target/run_results.json') as f:\n    r=json.load(f)\nfor x in r['results']:\n    print(x['unique_id'], x['status'])",
        "hint": "La siguiente ejecución puede sobrescribirlo; conservar copias para histórico.",
        "textOutput": "Identificadores y estados, por ejemplo model.tienda_dbt.fct_orders success si se construyó sin errores.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/artefactos-y-depuracion/catalog-json-y-sources-json",
    "remember": "Se generan con comandos distintos.",
    "examples": [
      {
        "id": "dbt/artefactos-y-depuracion/catalog-json-y-sources-json/1",
        "title": "Actualizar catálogo y frescura",
        "language": "bash",
        "code": "dbt docs generate\ndbt source freshness",
        "hint": "Se generan con comandos distintos.",
        "textOutput": "target/catalog.json describe relaciones; target/sources.json contiene resultados si hay fuentes configuradas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/artefactos-y-depuracion/sql-compilado-y-ejecutado",
    "remember": "El contenido no es necesariamente idéntico al SELECT escrito por el autor.",
    "examples": [
      {
        "id": "dbt/artefactos-y-depuracion/sql-compilado-y-ejecutado/1",
        "title": "Leer SQL de fct_orders",
        "language": "bash",
        "code": "dbt compile --select fct_orders\ncat target/compiled/tienda_dbt/models/marts/fct_orders.sql",
        "hint": "El contenido no es necesariamente idéntico al SELECT escrito por el autor.",
        "textOutput": "SELECT con la referencia física resuelta en lugar de ref().",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/artefactos-y-depuracion/errores-de-compilacion-y-base-de-datos",
    "remember": "Inspeccionar el primer error y el nodo que lo produce.",
    "examples": [
      {
        "id": "dbt/artefactos-y-depuracion/errores-de-compilacion-y-base-de-datos/1",
        "title": "Provocar un error de referencia (modelo temporal)",
        "language": "sql",
        "code": "select * from {{ ref('no_existe') }}",
        "hint": "Inspeccionar el primer error y el nodo que lo produce.",
        "textOutput": "Error de dependencia al analizar/compilar. Retirar el modelo antes de continuar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/artefactos-y-depuracion/logs-y-flags-de-diagnostico",
    "remember": "Guardar logs con cuidado y evitar registrar secretos.",
    "examples": [
      {
        "id": "dbt/artefactos-y-depuracion/logs-y-flags-de-diagnostico/1",
        "title": "Generar log estructurado",
        "language": "bash",
        "code": "dbt --debug --log-format json run --select fct_orders",
        "hint": "Guardar logs con cuidado y evitar registrar secretos.",
        "textOutput": "Mensajes JSON de eventos de ejecución; detalles dependen del motor y versión.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/artefactos-y-depuracion/retry",
    "remember": "Corregir primero la causa y preservar run_results del intento fallido.",
    "examples": [
      {
        "id": "dbt/artefactos-y-depuracion/retry/1",
        "title": "Reintentar un build fallido",
        "language": "bash",
        "code": "dbt build\n# corregir el error en el recurso\ndbt retry",
        "hint": "Corregir primero la causa y preservar run_results del intento fallido.",
        "textOutput": "Reintenta recursos necesarios del build anterior, no todos los que tuvieron éxito.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
