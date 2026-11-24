// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/gobernanza-y-mesh/definicion",
    "remember": "Access de dbt controla referencias en proyectos, no sustituye GRANT del warehouse.",
    "examples": [
      {
        "id": "dbt/gobernanza-y-mesh/definicion/1",
        "title": "Asignar propietario de un dominio (models/groups.yml)",
        "language": "yaml",
        "code": "groups:\n  - name: finance\n    owner:\n      name: Finance Analytics\n      email: finance@example.com",
        "hint": "Access de dbt controla referencias en proyectos, no sustituye GRANT del warehouse.",
        "textOutput": "El grupo finance queda disponible para asignar modelos; datos de contacto ficticios.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/gobernanza-y-mesh/groups-y-ownership",
    "remember": "Declarar el grupo antes de asignarlo a un modelo.",
    "examples": [
      {
        "id": "dbt/gobernanza-y-mesh/groups-y-ownership/1",
        "title": "Asignar fct_orders a finanzas",
        "language": "yaml",
        "code": "models:\n  - name: fct_orders\n    config:\n      group: finance",
        "hint": "Declarar el grupo antes de asignarlo a un modelo.",
        "textOutput": "El manifest indica el grupo finance; requiere definirlo antes.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/gobernanza-y-mesh/access-private-protected-public",
    "remember": "No confundir access con permisos SQL o seguridad de filas.",
    "examples": [
      {
        "id": "dbt/gobernanza-y-mesh/access-private-protected-public/1",
        "title": "Publicar un contrato de consumo",
        "language": "yaml",
        "code": "models:\n  - name: fct_orders\n    config:\n      group: finance\n      access: public",
        "hint": "No confundir access con permisos SQL o seguridad de filas.",
        "textOutput": "El recurso puede exponerse como interfaz a consumidores autorizados; en Mesh requiere configuración adicional.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/gobernanza-y-mesh/grants",
    "remember": "Crear roles previamente y aplicar mínimo privilegio.",
    "examples": [
      {
        "id": "dbt/gobernanza-y-mesh/grants/1",
        "title": "Permitir SELECT a un rol existente (modelo temporal)",
        "language": "sql",
        "code": "{{ config(materialized='table', grants={'select':['report_reader']}) }}\nselect * from {{ ref('fct_orders') }}",
        "hint": "Crear roles previamente y aplicar mínimo privilegio.",
        "textOutput": "report_reader obtiene SELECT sobre lab_example si existe y el usuario tiene permisos para otorgarlo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/gobernanza-y-mesh/model-versions",
    "remember": "Publicar cambios incompatibles como una nueva versión en vez de romper consumidores.",
    "examples": [
      {
        "id": "dbt/gobernanza-y-mesh/model-versions/1",
        "title": "Versionar un modelo de laboratorio (models/versioned_orders.yml)",
        "language": "yaml",
        "code": "models:\n  - name: versioned_orders\n    latest_version: 2\n    versions:\n      - v: 1\n      - v: 2",
        "hint": "Publicar cambios incompatibles como una nueva versión en vez de romper consumidores.",
        "textOutput": "Crear models/versioned_orders_v1.sql con select order_id from {{ ref('fct_orders') }} y _v2.sql con select order_id, amount from {{ ref('fct_orders') }}. ref('versioned_orders', version=1) devuelve una columna; sin versión usa v2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/gobernanza-y-mesh/deprecacion",
    "remember": "Avisar a consumidores y migrarlos antes de retirarla; no elimina automáticamente la relación.",
    "examples": [
      {
        "id": "dbt/gobernanza-y-mesh/deprecacion/1",
        "title": "Anunciar retiro de v1 (fragmento de versions)",
        "language": "yaml",
        "code": "- v: 1\n  deprecation_date: 2027-01-01 00:00:00.000000+00:00",
        "hint": "Avisar a consumidores y migrarlos antes de retirarla; no elimina automáticamente la relación.",
        "textOutput": "dbt registra fecha y puede emitir avisos según proximidad/versión; mantener v2 definida.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/gobernanza-y-mesh/dbt-mesh-y-dependencias-entre-proyectos",
    "remember": "Requiere plataforma, permisos, metadatos y plan compatibles.",
    "examples": [
      {
        "id": "dbt/gobernanza-y-mesh/dbt-mesh-y-dependencias-entre-proyectos/1",
        "title": "Declarar proyecto productor (dependencies.yml del consumidor)",
        "language": "yaml",
        "code": "projects:\n  - name: finance_project",
        "hint": "Requiere plataforma, permisos, metadatos y plan compatibles.",
        "textOutput": "El consumidor puede resolver interfaces públicas del productor si ambos están configurados en Mesh.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/gobernanza-y-mesh/cross-project-ref",
    "remember": "Una dependencia de proyecto no es una dependencia de paquete instalada con dbt deps.",
    "examples": [
      {
        "id": "dbt/gobernanza-y-mesh/cross-project-ref/1",
        "title": "Consumir hechos publicados (proyecto consumidor)",
        "language": "sql",
        "code": "select sum(amount) as revenue from {{ ref('finance_project','fct_orders') }}",
        "hint": "Una dependencia de proyecto no es una dependencia de paquete instalada con dbt deps.",
        "textOutput": "500 si el productor publica los datos base; requiere Mesh configurado y acceso al modelo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
