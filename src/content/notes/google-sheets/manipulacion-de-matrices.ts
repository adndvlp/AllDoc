// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/manipulacion-de-matrices/definicion",
    "remember": "Comprueba orientación y dimensiones.",
    "examples": [
      {
        "id": "google-sheets/manipulacion-de-matrices/definicion/1",
        "title": "Apilar dos listas",
        "language": "excel-formula",
        "code": "=VSTACK({1;2},{3;4})",
        "hint": "",
        "textOutput": "1,2,3,4 en columna.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/manipulacion-de-matrices/vstack-y-hstack",
    "remember": "Alinea columnas o filas para evitar rellenos #N/A.",
    "examples": [
      {
        "id": "google-sheets/manipulacion-de-matrices/vstack-y-hstack/1",
        "title": "Unir dos columnas",
        "language": "excel-formula",
        "code": "=HSTACK({1;2},{\"Ana\";\"Luis\"})",
        "hint": "",
        "textOutput": "Filas: 1,Ana; 2,Luis.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/manipulacion-de-matrices/tocol-torow-flatten",
    "remember": "El orden de recorrido afecta el resultado.",
    "examples": [
      {
        "id": "google-sheets/manipulacion-de-matrices/tocol-torow-flatten/1",
        "title": "Aplanar matriz por filas",
        "language": "excel-formula",
        "code": "=TOCOL({1,2;3,4})",
        "hint": "",
        "textOutput": "1,2,3,4 en columna.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/manipulacion-de-matrices/choosecols-y-chooserows",
    "remember": "Los índices negativos cuentan desde el final.",
    "examples": [
      {
        "id": "google-sheets/manipulacion-de-matrices/choosecols-y-chooserows/1",
        "title": "Elegir ID y precio",
        "language": "excel-formula",
        "code": "=CHOOSECOLS(Productos!A2:D5,1,4)",
        "hint": "",
        "textOutput": "P1,100; P2,300; P3,200; P4,500.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/manipulacion-de-matrices/array-constrain",
    "remember": "No ordena ni aplica condiciones.",
    "examples": [
      {
        "id": "google-sheets/manipulacion-de-matrices/array-constrain/1",
        "title": "Mostrar dos filas de productos",
        "language": "excel-formula",
        "code": "=ARRAY_CONSTRAIN(Productos!A2:D5,2,2)",
        "hint": "",
        "textOutput": "P1,Mouse; P2,Monitor.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/manipulacion-de-matrices/wraprows-y-wrapcols",
    "remember": "Especifica relleno cuando no completa el bloque.",
    "examples": [
      {
        "id": "google-sheets/manipulacion-de-matrices/wraprows-y-wrapcols/1",
        "title": "Dividir una serie en filas de dos",
        "language": "excel-formula",
        "code": "=WRAPROWS({1;2;3;4;5},2,0)",
        "hint": "",
        "textOutput": "1,2; 3,4; 5,0.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
