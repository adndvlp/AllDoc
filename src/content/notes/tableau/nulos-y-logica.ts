// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/nulos-y-logica/definicion",
    "remember": "Un valor ausente no equivale a cero.",
    "examples": [
      {
        "id": "tableau/nulos-y-logica/definicion/1",
        "title": "Identificar canal faltante",
        "language": "text",
        "code": "ISNULL([Canal])",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 5: True.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/nulos-y-logica/if-y-elseif",
    "remember": "La primera condición verdadera determina la salida.",
    "examples": [
      {
        "id": "tableau/nulos-y-logica/if-y-elseif/1",
        "title": "Clasificar importes",
        "language": "text",
        "code": "IF [Ventas]>=300 THEN 'Alto' ELSEIF [Ventas]>=100 THEN 'Medio' ELSE 'Bajo' END",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 6 Alto; linea 1 Medio; linea 5 Bajo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/nulos-y-logica/case",
    "remember": "Usa IF cuando necesites desigualdades.",
    "examples": [
      {
        "id": "tableau/nulos-y-logica/case/1",
        "title": "Etiquetar canales",
        "language": "text",
        "code": "CASE [Canal] WHEN 'Web' THEN 'Digital' WHEN 'Tienda' THEN 'Fisico' ELSE 'Otro' END",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 1 Digital; linea 3 Fisico; linea 5 Otro.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/nulos-y-logica/ifnull-y-zn",
    "remember": "ZN no genera filas inexistentes.",
    "examples": [
      {
        "id": "tableau/nulos-y-logica/ifnull-y-zn/1",
        "title": "Rellenar canal",
        "language": "text",
        "code": "IFNULL([Canal],'Sin canal')",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 5: Sin canal.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/nulos-y-logica/iif",
    "remember": "La condición nula no es necesariamente falsa.",
    "examples": [
      {
        "id": "tableau/nulos-y-logica/iif/1",
        "title": "Crear indicador",
        "language": "text",
        "code": "IIF([Estado]='Completado',1,0)",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 1: 1; linea 5: 0.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
