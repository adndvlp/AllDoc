// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/documentacion-y-linaje/definicion",
    "remember": "Documentar el significado de la fila y de cada métrica, no solo repetir el nombre.",
    "examples": [
      {
        "id": "dbt/documentacion-y-linaje/definicion/1",
        "title": "Describir el mart",
        "language": "yaml",
        "code": "models:\n  - name: customer_revenue\n    description: Una fila por cliente con ingresos de pedidos completados\n    columns:\n      - name: revenue\n        description: Suma de importes completados, cero sin pedidos",
        "hint": "Documentar el significado de la fila y de cada métrica, no solo repetir el nombre.",
        "textOutput": "La descripción queda disponible en manifest y docs.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/documentacion-y-linaje/doc-blocks-y-doc",
    "remember": "El archivo Markdown debe estar en una ruta de documentación reconocida.",
    "examples": [
      {
        "id": "dbt/documentacion-y-linaje/doc-blocks-y-doc/1",
        "title": "Crear models/revenue_docs.md",
        "language": "markdown",
        "code": "{% docs revenue_definition %}\nImporte total de pedidos completados, sin incluir cancelados.\n{% enddocs %}",
        "hint": "El archivo Markdown debe estar en una ruta de documentación reconocida.",
        "textOutput": "En YAML usar description: \"{{ doc('revenue_definition') }}\"; docs muestra el texto del bloque.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/documentacion-y-linaje/dbt-docs-generate-y-serve",
    "remember": "El catálogo consulta metadatos del warehouse; no publicar información sensible.",
    "examples": [
      {
        "id": "dbt/documentacion-y-linaje/dbt-docs-generate-y-serve/1",
        "title": "Generar y abrir documentación",
        "language": "bash",
        "code": "dbt docs generate\ndbt docs serve --port 8080",
        "hint": "El catálogo consulta metadatos del warehouse; no publicar información sensible.",
        "textOutput": "Sitio local en localhost:8080 con los modelos construidos, sus columnas y dependencias.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/documentacion-y-linaje/lineage-e-impacto",
    "remember": "Una dependencia no equivale a un join ni a una garantía de calidad.",
    "examples": [
      {
        "id": "dbt/documentacion-y-linaje/lineage-e-impacto/1",
        "title": "Identificar afectados por staging",
        "language": "bash",
        "code": "dbt ls --select stg_orders+ --resource-type model",
        "hint": "Una dependencia no equivale a un join ni a una garantía de calidad.",
        "textOutput": "stg_orders, int_completed_orders, fct_orders y customer_revenue en el proyecto base.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/documentacion-y-linaje/exposures",
    "remember": "Una exposure no ejecuta el dashboard.",
    "examples": [
      {
        "id": "dbt/documentacion-y-linaje/exposures/1",
        "title": "Registrar un reporte (models/exposures.yml)",
        "language": "yaml",
        "code": "exposures:\n  - name: sales_dashboard\n    type: dashboard\n    maturity: medium\n    depends_on:\n      - ref('customer_revenue')\n    owner:\n      name: Analytics\n      email: analytics@example.com",
        "hint": "Una exposure no ejecuta el dashboard.",
        "textOutput": "El DAG incorpora sales_dashboard como consumidor de customer_revenue; el correo es ficticio.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/documentacion-y-linaje/metadata-y-persist-docs",
    "remember": "La persistencia depende del adaptador y no equivale a políticas de acceso.",
    "examples": [
      {
        "id": "dbt/documentacion-y-linaje/metadata-y-persist-docs/1",
        "title": "Persistir documentación de modelos",
        "language": "yaml",
        "code": "models:\n  tienda_dbt:\n    +persist_docs:\n      relation: true\n      columns: true",
        "hint": "La persistencia depende del adaptador y no equivale a políticas de acceso.",
        "textOutput": "Tras reconstruir, el motor compatible recibe comentarios de las descripciones configuradas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
