// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/filter-sort-unique/definicion",
    "remember": "No alteran el rango fuente.",
    "examples": [
      {
        "id": "google-sheets/filter-sort-unique/definicion/1",
        "title": "Mostrar importes completados",
        "language": "excel-formula",
        "code": "=FILTER(Ventas!J2:J9,Ventas!H2:H9=\"completed\")",
        "hint": "",
        "textOutput": "200,300,600,300,400,200 en columna.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/filter-sort-unique/filter",
    "remember": "Las condiciones deben tener dimensiones compatibles; sin coincidencias devuelve #N/A.",
    "examples": [
      {
        "id": "google-sheets/filter-sort-unique/filter/1",
        "title": "Mostrar IDs de pedidos web completados",
        "language": "excel-formula",
        "code": "=FILTER(Ventas!A2:A9,Ventas!H2:H9=\"completed\",Ventas!I2:I9=\"web\")",
        "hint": "",
        "textOutput": "101,103,106,107.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/filter-sort-unique/sort",
    "remember": "TRUE ascendente, FALSE descendente.",
    "examples": [
      {
        "id": "google-sheets/filter-sort-unique/sort/1",
        "title": "Ordenar importes",
        "language": "excel-formula",
        "code": "=SORT(Ventas!J2:J9,1,FALSE)",
        "hint": "",
        "textOutput": "600,400,300,300,300,200,200,100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/filter-sort-unique/sortn",
    "remember": "Modo 0 devuelve como máximo n filas.",
    "examples": [
      {
        "id": "google-sheets/filter-sort-unique/sortn/1",
        "title": "Mostrar tres importes mayores",
        "language": "excel-formula",
        "code": "=SORTN(Ventas!J2:J9,3,0,1,FALSE)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "600,400,300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/filter-sort-unique/unique",
    "remember": "No altera el origen; elimina espacios inconsistentes antes si procede.",
    "examples": [
      {
        "id": "google-sheets/filter-sort-unique/unique/1",
        "title": "Listar estados únicos",
        "language": "excel-formula",
        "code": "=UNIQUE(Ventas!H2:H9)",
        "hint": "",
        "textOutput": "completed, cancelled en ese orden.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/filter-sort-unique/unique-exactamente-una-vez",
    "remember": "No equivale a quitar duplicados y conservar uno de cada.",
    "examples": [
      {
        "id": "google-sheets/filter-sort-unique/unique-exactamente-una-vez/1",
        "title": "Encontrar importes sin repetición",
        "language": "excel-formula",
        "code": "=UNIQUE(Ventas!J2:J9,FALSE,TRUE)",
        "hint": "",
        "textOutput": "600,100,400 en ese orden.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/filter-sort-unique/combinacion-de-funciones",
    "remember": "Lee las funciones anidadas desde el interior.",
    "examples": [
      {
        "id": "google-sheets/filter-sort-unique/combinacion-de-funciones/1",
        "title": "Listar IDs compradores completados únicos",
        "language": "excel-formula",
        "code": "=SORT(UNIQUE(FILTER(Ventas!C2:C9,Ventas!H2:H9=\"completed\")),1,TRUE)",
        "hint": "",
        "textOutput": "1,2,3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
