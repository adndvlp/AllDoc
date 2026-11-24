// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/prep-flujos/definicion",
    "remember": "El flujo transforma datos antes de visualizarlos.",
    "examples": [
      {
        "id": "tableau/prep-flujos/definicion/1",
        "title": "Crear flujo",
        "code": "",
        "external": true,
        "hint": "En Prep Builder conecta leads.csv y añade Clean Step.",
        "textOutput": "Un Input y un Clean Step muestran cuatro registros.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-flujos/input-y-profile-pane",
    "remember": "Comprueba la muestra y los tipos antes de limpiar.",
    "examples": [
      {
        "id": "tableau/prep-flujos/input-y-profile-pane/1",
        "title": "Inspeccionar origen",
        "code": "",
        "steps": [
          "Conecta leads.csv",
          "abre un Clean Step y revisa Origen y Email."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se observan variantes Web/web, espacios en Tienda si se conservaron, y correo ausente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-flujos/steps-y-ramas",
    "remember": "Cada rama parte del estado anterior a la bifurcación.",
    "examples": [
      {
        "id": "tableau/prep-flujos/steps-y-ramas/1",
        "title": "Separar leads",
        "code": "",
        "steps": [
          "Desde Input crea dos Clean Steps",
          "en uno conserva Email no nulo y en el otro solo Email nulo."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Tres registros en rama válida; uno en rama de revisión.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
