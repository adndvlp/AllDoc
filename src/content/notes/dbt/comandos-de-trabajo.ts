// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/comandos-de-trabajo/definicion",
    "remember": "run construye modelos; build coordina modelos, seeds, snapshots y tests.",
    "examples": [
      {
        "id": "dbt/comandos-de-trabajo/definicion/1",
        "title": "Construir el proyecto base",
        "language": "bash",
        "code": "dbt build",
        "hint": "run construye modelos; build coordina modelos, seeds, snapshots y tests.",
        "textOutput": "Se construyen los recursos activos siguiendo dependencias y se ejecutan las pruebas configuradas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-debug",
    "remember": "Usarlo antes de diagnosticar SQL cuando no conecta.",
    "examples": [
      {
        "id": "dbt/comandos-de-trabajo/dbt-debug/1",
        "title": "Comprobar conexión",
        "language": "bash",
        "code": "dbt debug --target dev",
        "hint": "Usarlo antes de diagnosticar SQL cuando no conecta.",
        "textOutput": "All checks passed si el perfil y los permisos son válidos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-run",
    "remember": "No carga seeds ni ejecuta tests por sí mismo.",
    "examples": [
      {
        "id": "dbt/comandos-de-trabajo/dbt-run/1",
        "title": "Construir el mart y sus padres",
        "language": "bash",
        "code": "dbt run --select +customer_revenue",
        "hint": "No carga seeds ni ejecuta tests por sí mismo.",
        "textOutput": "Se reconstruyen modelos ascendentes y customer_revenue; fuentes se leen, no se cargan.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-build",
    "remember": "Una prueba de error puede impedir construir recursos dependientes.",
    "examples": [
      {
        "id": "dbt/comandos-de-trabajo/dbt-build/1",
        "title": "Construir un flujo completo",
        "language": "bash",
        "code": "dbt build --select +customer_revenue",
        "hint": "Una prueba de error puede impedir construir recursos dependientes.",
        "textOutput": "Mart disponible y tests seleccionados ejecutados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-test",
    "remember": "Los modelos de los data tests deben existir.",
    "examples": [
      {
        "id": "dbt/comandos-de-trabajo/dbt-test/1",
        "title": "Validar el modelo de ingresos",
        "language": "bash",
        "code": "dbt test --select fct_orders",
        "hint": "Los modelos de los data tests deben existir.",
        "textOutput": "Con tests de order_id configurados, pasan unique y not_null.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-seed-y-snapshot",
    "remember": "No son sustitutos de run.",
    "examples": [
      {
        "id": "dbt/comandos-de-trabajo/dbt-seed-y-snapshot/1",
        "title": "Cargar catálogos y capturar historial",
        "language": "bash",
        "code": "dbt seed --select country_names\ndbt snapshot --select customer_history",
        "hint": "No son sustitutos de run.",
        "textOutput": "Dos filas del catálogo y cuatro versiones iniciales si el snapshot está definido.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-compile",
    "remember": "No materializa modelos; macros run_query pueden consultar el motor.",
    "examples": [
      {
        "id": "dbt/comandos-de-trabajo/dbt-compile/1",
        "title": "Inspeccionar SQL de un modelo",
        "language": "bash",
        "code": "dbt compile --select fct_orders",
        "hint": "No materializa modelos; macros run_query pueden consultar el motor.",
        "textOutput": "SQL compilado en target/compiled/tienda_dbt/models/marts/fct_orders.sql.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-parse",
    "remember": "Útil para validar estructura de proyecto y generar manifest.",
    "examples": [
      {
        "id": "dbt/comandos-de-trabajo/dbt-parse/1",
        "title": "Generar metadatos",
        "language": "bash",
        "code": "dbt parse",
        "hint": "Útil para validar estructura de proyecto y generar manifest.",
        "textOutput": "target/manifest.json generado si el proyecto es válido.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-ls",
    "remember": "Sirve para comprobar qué afectará una ejecución.",
    "examples": [
      {
        "id": "dbt/comandos-de-trabajo/dbt-ls/1",
        "title": "Listar modelos de marts",
        "language": "bash",
        "code": "dbt ls --select path:models/marts --resource-type model",
        "hint": "Sirve para comprobar qué afectará una ejecución.",
        "textOutput": "fct_orders, dim_customers y customer_revenue en el proyecto base.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-show",
    "remember": "Los upstream persistidos deben existir.",
    "examples": [
      {
        "id": "dbt/comandos-de-trabajo/dbt-show/1",
        "title": "Previsualizar pedidos",
        "language": "bash",
        "code": "dbt show --select fct_orders --limit 2",
        "hint": "Los upstream persistidos deben existir.",
        "textOutput": "Dos filas de cuatro; sin ORDER BY no se garantiza cuáles.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-clean-y-deps",
    "remember": "No confundir limpieza local con DROP de relaciones.",
    "examples": [
      {
        "id": "dbt/comandos-de-trabajo/dbt-clean-y-deps/1",
        "title": "Reinstalar dependencias",
        "language": "bash",
        "code": "dbt clean\ndbt deps",
        "hint": "No confundir limpieza local con DROP de relaciones.",
        "textOutput": "Se eliminan directorios configurados y se reinstalan paquetes declarados; definir clean-targets: [target, dbt_packages] antes.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
