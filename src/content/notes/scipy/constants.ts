// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/constants/definicion",
    "remember": "Verifica las unidades antes de operar.",
    "examples": [
      {
        "id": "scipy/constants/definicion/1",
        "title": "Convertir kilovatios-hora a julios",
        "code": "from scipy import constants\nprint(2*constants.kilo*constants.hour)",
        "hint": "Dos kWh equivalen a dos mil vatios durante 3600 segundos.",
        "textOutput": "7200000.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/constants/constantes-fisicas",
    "remember": "No mezcles unidades de distintas escalas.",
    "examples": [
      {
        "id": "scipy/constants/constantes-fisicas/1",
        "title": "Consultar velocidad de la luz",
        "code": "from scipy import constants\nprint(constants.c)",
        "hint": "La constante se expresa en metros por segundo.",
        "textOutput": "299792458.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/constants/conversion-unidades",
    "remember": "Multiplica por el factor a SI.",
    "examples": [
      {
        "id": "scipy/constants/conversion-unidades/1",
        "title": "Convertir tres millas a metros",
        "code": "from scipy import constants\nprint(round(3*constants.mile, 3))",
        "hint": "El resultado está en metros.",
        "textOutput": "4828.032",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
