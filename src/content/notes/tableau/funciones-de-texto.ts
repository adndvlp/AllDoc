// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/funciones-de-texto/definicion",
    "remember": "Las funciones modifican el resultado del cálculo, no el CSV.",
    "examples": [
      {
        "id": "tableau/funciones-de-texto/definicion/1",
        "title": "Normalizar categoría",
        "language": "text",
        "code": "UPPER([Categoria])",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 1: TECNOLOGIA.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/funciones-de-texto/upper-lower-y-trim",
    "remember": "TRIM no elimina espacios internos.",
    "examples": [
      {
        "id": "tableau/funciones-de-texto/upper-lower-y-trim/1",
        "title": "Limpiar origen",
        "code": "",
        "steps": [
          "Conecta leads.csv",
          "crea LOWER(TRIM([Origen]))",
          "muestra por LeadID."
        ],
        "external": true,
        "hint": "",
        "textOutput": "L01 y L02: web; L03: tienda.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/funciones-de-texto/left-right-y-mid",
    "remember": "La longitud se mide en caracteres.",
    "examples": [
      {
        "id": "tableau/funciones-de-texto/left-right-y-mid/1",
        "title": "Extraer número de pedido",
        "language": "text",
        "code": "RIGHT([Pedido],2)",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 1: 01.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/funciones-de-texto/contains-startswith-y-endswith",
    "remember": "Devuelven booleanos; normaliza el caso si importa.",
    "examples": [
      {
        "id": "tableau/funciones-de-texto/contains-startswith-y-endswith/1",
        "title": "Detectar producto",
        "language": "text",
        "code": "CONTAINS(LOWER([Producto]),'tec')",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 2: True; linea 1: False.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/funciones-de-texto/split-y-replace",
    "remember": "SPLIT depende del conector y posición.",
    "note": "Si SPLIT no está disponible usa un extract compatible.",
    "examples": [
      {
        "id": "tableau/funciones-de-texto/split-y-replace/1",
        "title": "Extraer dominio",
        "code": "",
        "external": true,
        "hint": "En leads.csv crea SPLIT([Email],'@',2) y muestra por LeadID.",
        "textOutput": "L01: example.com; L04: NULL.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/funciones-de-texto/len-y-concatenacion",
    "remember": "Convierte números a texto con STR antes de concatenar.",
    "examples": [
      {
        "id": "tableau/funciones-de-texto/len-y-concatenacion/1",
        "title": "Crear etiqueta",
        "language": "text",
        "code": "[Pedido]+'-'+STR([Linea])",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 1: P01-1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
