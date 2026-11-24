// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/funciones-numericas/definicion",
    "remember": "No confundas redondear con mostrar menos decimales.",
    "examples": [
      {
        "id": "tableau/funciones-numericas/definicion/1",
        "title": "Calcular margen redondeado",
        "language": "text",
        "code": "ROUND(SUM([Ventas]-[Costo])/SUM([Ventas]),4)",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo en Text (Marks):",
        "hint": "",
        "textOutput": "0.3657.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/funciones-numericas/round-ceiling-y-floor",
    "remember": "CEILING y FLOOR dependen del soporte del conector.",
    "examples": [
      {
        "id": "tableau/funciones-numericas/round-ceiling-y-floor/1",
        "title": "Redondear un valor",
        "language": "text",
        "code": "ROUND([Ventas]/3,2)",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 1: 33.33.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/funciones-numericas/abs-y-division-protegida",
    "remember": "Devuelve NULL si la tasa no está definida.",
    "examples": [
      {
        "id": "tableau/funciones-numericas/abs-y-division-protegida/1",
        "title": "Calcular margen seguro",
        "language": "text",
        "code": "IF SUM([Ventas])<>0 THEN SUM([Ventas]-[Costo])/SUM([Ventas]) END",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo en Text (Marks):",
        "hint": "",
        "textOutput": "0.365714...; si el denominador fuera cero, NULL.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
