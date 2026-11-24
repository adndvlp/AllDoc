// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/funciones-logicas/definicion",
    "remember": "Una condición devuelve TRUE o FALSE.",
    "examples": [
      {
        "id": "google-sheets/funciones-logicas/definicion/1",
        "title": "Clasificar un importe",
        "language": "excel-formula",
        "code": "=IF(Ventas!J4>=500,\"Alto\",\"Normal\")",
        "hint": "",
        "textOutput": "Alto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-logicas/if",
    "remember": "El tercer argumento es la alternativa.",
    "examples": [
      {
        "id": "google-sheets/funciones-logicas/if/1",
        "title": "Marcar pedido válido",
        "language": "excel-formula",
        "code": "=IF(Ventas!H5=\"completed\",\"Venta\",\"No venta\")",
        "hint": "",
        "textOutput": "No venta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-logicas/ifs",
    "remember": "Pon TRUE al final como caso general.",
    "examples": [
      {
        "id": "google-sheets/funciones-logicas/ifs/1",
        "title": "Clasificar importes en tres niveles",
        "language": "excel-formula",
        "code": "=IFS(Ventas!J2>=500,\"Alto\",Ventas!J2>=200,\"Medio\",TRUE,\"Bajo\")",
        "hint": "",
        "textOutput": "Medio.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-logicas/switch",
    "remember": "Útil para traducir códigos discretos.",
    "examples": [
      {
        "id": "google-sheets/funciones-logicas/switch/1",
        "title": "Traducir estado",
        "language": "excel-formula",
        "code": "=SWITCH(Ventas!H2,\"completed\",\"Realizado\",\"cancelled\",\"Cancelado\",\"Otro\")",
        "hint": "",
        "textOutput": "Realizado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-logicas/and-or-not-xor",
    "remember": "Combina condiciones antes de IF.",
    "examples": [
      {
        "id": "google-sheets/funciones-logicas/and-or-not-xor/1",
        "title": "Comprobar dos requisitos",
        "language": "excel-formula",
        "code": "=AND(Ventas!H2=\"completed\",Ventas!J2>=200)",
        "hint": "",
        "textOutput": "TRUE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-logicas/true-y-false",
    "remember": "TRUE() y FALSE() producen valores lógicos.",
    "examples": [
      {
        "id": "google-sheets/funciones-logicas/true-y-false/1",
        "title": "Invertir un booleano",
        "language": "excel-formula",
        "code": "=NOT(TRUE())",
        "hint": "",
        "textOutput": "FALSE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
