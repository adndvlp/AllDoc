// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/instalacion-y-proyecto/definicion",
    "remember": "Ejecutar desde la carpeta con dbt_project.yml.",
    "examples": [
      {
        "id": "dbt/instalacion-y-proyecto/definicion/1",
        "title": "Comprobar el proyecto",
        "language": "bash",
        "code": "dbt debug",
        "hint": "Ejecutar desde la carpeta con dbt_project.yml.",
        "textOutput": "Conexión y configuración válidas si se completó la preparación.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/instalacion-y-proyecto/entorno-virtual",
    "remember": "Activar el entorno antes de usar dbt.",
    "examples": [
      {
        "id": "dbt/instalacion-y-proyecto/entorno-virtual/1",
        "title": "Instalar el adaptador",
        "language": "bash",
        "code": "python -m venv .venv\nsource .venv/bin/activate\npython -m pip install 'dbt-core>=1.10.6,<1.11' 'dbt-postgres>=1.10,<1.11'",
        "hint": "Activar el entorno antes de usar dbt.",
        "textOutput": "Core y su adaptador quedan instalados en el entorno.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/instalacion-y-proyecto/dbt-init",
    "remember": "No ejecutarlo encima del proyecto compartido.",
    "examples": [
      {
        "id": "dbt/instalacion-y-proyecto/dbt-init/1",
        "title": "Crear un proyecto independiente",
        "language": "bash",
        "code": "dbt init demo_tienda",
        "hint": "No ejecutarlo encima del proyecto compartido.",
        "textOutput": "Aparece el directorio demo_tienda con archivos iniciales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/instalacion-y-proyecto/dbt-project-yml",
    "remember": "El nombre bajo models debe coincidir con name.",
    "examples": [
      {
        "id": "dbt/instalacion-y-proyecto/dbt-project-yml/1",
        "title": "Materializar marts como tablas",
        "language": "yaml",
        "code": "models:\n  tienda_dbt:\n    marts:\n      +materialized: table",
        "hint": "El nombre bajo models debe coincidir con name.",
        "textOutput": "Los modelos de models/marts usan table salvo una configuración más específica.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/instalacion-y-proyecto/profiles-yml-y-targets",
    "remember": "El perfil de Core no debe guardar contraseñas en Git.",
    "examples": [
      {
        "id": "dbt/instalacion-y-proyecto/profiles-yml-y-targets/1",
        "title": "Elegir el entorno de desarrollo",
        "language": "yaml",
        "code": "tienda_dbt:\n  target: dev\n  outputs:\n    dev:\n      type: postgres\n      host: localhost\n      port: 5432\n      user: analyst\n      password: \"{{ env_var('DBT_ENV_SECRET_PASSWORD') }}\"\n      dbname: analytics_lab\n      schema: dbt_dev\n      threads: 4",
        "hint": "El perfil de Core no debe guardar contraseñas en Git.",
        "textOutput": "dbt --target dev apunta a analytics_lab.dbt_dev.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/instalacion-y-proyecto/directorios-y-extensiones",
    "remember": "Una propiedad YAML documenta/configura recursos; no sustituye el SQL de un modelo.",
    "examples": [
      {
        "id": "dbt/instalacion-y-proyecto/directorios-y-extensiones/1",
        "title": "Reconocer los archivos",
        "language": "text",
        "code": "models/staging/stg_orders.sql\nmodels/staging/sources.yml\nseeds/country_names.csv\nmacros/\ntests/\nsnapshots/\nanalyses/",
        "hint": "Los directorios separan modelos SQL/Python, seeds CSV, macros SQL/Jinja, tests, snapshots, analyses y propiedades YAML.",
        "textOutput": "dbt descubre los recursos de cada ruta configurada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
