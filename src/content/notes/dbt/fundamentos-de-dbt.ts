// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/fundamentos-de-dbt/definicion",
    "remember": "dbt no es una base de datos: ejecuta transformaciones en el motor conectado.",
    "examples": [
      {
        "id": "dbt/fundamentos-de-dbt/definicion/1",
        "title": "Seguir una transformación",
        "language": "text",
        "code": "raw.orders → stg_orders → int_completed_orders → fct_orders",
        "hint": "dbt transforma datos ya disponibles en una plataforma de datos y organiza el SQL como un proyecto con dependencias y validaciones.",
        "textOutput": "Cuatro pedidos completados en el modelo final; la tabla raw conserva cinco.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/fundamentos-de-dbt/etl-y-elt",
    "remember": "La extracción y carga normalmente las realiza otra herramienta.",
    "examples": [
      {
        "id": "dbt/fundamentos-de-dbt/etl-y-elt/1",
        "title": "Ubicar dbt en el flujo",
        "language": "text",
        "code": "API → ingestor → raw.orders → dbt → fct_orders → BI",
        "hint": "ETL transforma antes de cargar.",
        "textOutput": "Los datos llegan a raw antes de que dbt ejecute SQL.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/fundamentos-de-dbt/core-plataforma-y-fusion",
    "remember": "El lenguaje del proyecto es compartido, pero no todas las capacidades lo son.",
    "note": "Fusion tiene su propia instalación y matriz de adaptadores/funciones; no asumir paridad.",
    "examples": [
      {
        "id": "dbt/fundamentos-de-dbt/core-plataforma-y-fusion/1",
        "title": "Identificar el entorno instalado",
        "language": "bash",
        "code": "dbt --version",
        "hint": "El lenguaje del proyecto es compartido, pero no todas las capacidades lo son.",
        "textOutput": "Se muestran versiones de Core y plugins en el laboratorio; no identifica por sí solo un plan de plataforma.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/fundamentos-de-dbt/adaptadores-y-warehouse",
    "remember": "El SQL y las materializaciones disponibles dependen del adaptador.",
    "examples": [
      {
        "id": "dbt/fundamentos-de-dbt/adaptadores-y-warehouse/1",
        "title": "Inspeccionar el adaptador local",
        "language": "bash",
        "code": "dbt --version",
        "hint": "El SQL y las materializaciones disponibles dependen del adaptador.",
        "textOutput": "Aparece postgres entre los plugins si está instalado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
