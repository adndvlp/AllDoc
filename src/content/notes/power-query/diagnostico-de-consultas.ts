// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/diagnostico-de-consultas/definicion",
    "remember": "Mide el comportamiento real; no deduzcas rendimiento solo por el número de pasos.",
    "examples": [
      {
        "id": "power-query/diagnostico-de-consultas/definicion/1",
        "title": "Registrar una evaluación de pedidos",
        "code": "",
        "steps": [
          "Abre Power Query Editor en Power BI Desktop",
          "En Herramientas inicia diagnóstico",
          "Actualiza la vista previa de Pedidos y detén diagnóstico"
        ],
        "external": true,
        "hint": "El editor genera consultas de diagnóstico si la función está disponible.",
        "textOutput": "Tablas de diagnóstico con operaciones y duraciones dependientes del entorno, no un tiempo fijo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/diagnostico-de-consultas/duracion-y-consultas-al-origen",
    "remember": "No sumes porcentajes de duración exclusiva de evaluaciones independientes.",
    "note": "La disponibilidad y el contenido del diagnóstico dependen del conector y de la versión.",
    "examples": [
      {
        "id": "power-query/diagnostico-de-consultas/duracion-y-consultas-al-origen/1",
        "title": "Identificar una lectura de SQL",
        "code": "",
        "steps": [
          "Con una consulta SQL autorizada, inicia diagnóstico",
          "Actualiza el paso filtrado y detén diagnóstico",
          "Filtra el resultado por la evaluación correspondiente e inspecciona operaciones de origen"
        ],
        "external": true,
        "hint": "Compara la información del origen con los pasos aplicados.",
        "textOutput": "Si el conector registra la consulta nativa, se puede inspeccionar; duración y número de operaciones varían.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
