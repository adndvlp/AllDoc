// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/campos-calculados/definicion",
    "remember": "Usa corchetes para campos y comillas para textos.",
    "examples": [
      {
        "id": "tableau/campos-calculados/definicion/1",
        "title": "Calcular beneficio",
        "language": "text",
        "code": "[Ventas]-[Costo]",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 1: 40; suma de todas las líneas: 640.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/campos-calculados/calculo-por-fila-y-agregado",
    "remember": "El nivel de cálculo cambia el resultado.",
    "examples": [
      {
        "id": "tableau/campos-calculados/calculo-por-fila-y-agregado/1",
        "title": "Calcular margen global",
        "language": "text",
        "code": "SUM([Ventas]-[Costo])/SUM([Ventas])",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo en Text (Marks):",
        "hint": "",
        "textOutput": "36.57% con formato Percentage.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/campos-calculados/operadores",
    "remember": "Usa paréntesis para fijar la precedencia.",
    "examples": [
      {
        "id": "tableau/campos-calculados/operadores/1",
        "title": "Identificar compras grandes",
        "language": "text",
        "code": "[Ventas]>=200 AND [Estado]='Completado'",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 2: True; linea 5: False.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/campos-calculados/mezcla-de-agregados",
    "remember": "Agrega ambos lados o trabaja por fila.",
    "examples": [
      {
        "id": "tableau/campos-calculados/mezcla-de-agregados/1",
        "title": "Corregir un margen",
        "code": "",
        "steps": [
          "Intenta SUM([Ventas])/[Costo]",
          "después reemplaza por SUM([Ventas])/SUM([Costo])."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Primera fórmula inválida; segunda ≈1.5766 sin filtros.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/campos-calculados/conversion-de-tipos",
    "remember": "Formatear no es convertir.",
    "examples": [
      {
        "id": "tableau/campos-calculados/conversion-de-tipos/1",
        "title": "Convertir identificador en texto",
        "language": "text",
        "code": "'L-'+STR([Linea])",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 1: L-1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
