// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/funciones-de-base-de-datos/definicion",
    "remember": "El rango de criterios incluye encabezados iguales a los de la tabla.",
    "examples": [
      {
        "id": "google-sheets/funciones-de-base-de-datos/definicion/1",
        "title": "Sumar pedidos válidos",
        "language": "excel-formula",
        "code": "=DSUM(Ventas!A1:K9,\"importe\",{\"estado\";\"completed\"})",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "2000.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-de-base-de-datos/dsum-y-daverage",
    "remember": "Campo puede indicarse por encabezado o índice.",
    "examples": [
      {
        "id": "google-sheets/funciones-de-base-de-datos/dsum-y-daverage/1",
        "title": "Promediar completados",
        "language": "excel-formula",
        "code": "=DAVERAGE(Ventas!A1:K9,\"importe\",{\"estado\";\"completed\"})",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "333.3333 aproximadamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-de-base-de-datos/dcount-y-dcounta",
    "remember": "El campo contado debe corresponder al dato esperado.",
    "examples": [
      {
        "id": "google-sheets/funciones-de-base-de-datos/dcount-y-dcounta/1",
        "title": "Contar IDs completados",
        "language": "excel-formula",
        "code": "=DCOUNT(Ventas!A1:K9,\"id\",{\"estado\";\"completed\"})",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-de-base-de-datos/dmin-y-dmax",
    "remember": "No identifican automáticamente la fila asociada.",
    "examples": [
      {
        "id": "google-sheets/funciones-de-base-de-datos/dmin-y-dmax/1",
        "title": "Buscar máximo completado",
        "language": "excel-formula",
        "code": "=DMAX(Ventas!A1:K9,\"importe\",{\"estado\";\"completed\"})",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "600.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-de-base-de-datos/dget",
    "remember": "Si hay cero o varias coincidencias devuelve error.",
    "examples": [
      {
        "id": "google-sheets/funciones-de-base-de-datos/dget/1",
        "title": "Leer importe de pedido único",
        "language": "excel-formula",
        "code": "=DGET(Ventas!A1:K9,\"importe\",{\"id\";103})",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "600.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-de-base-de-datos/criterios-and-y-or",
    "remember": "Repite encabezados si necesitas dos condiciones para el mismo campo.",
    "examples": [
      {
        "id": "google-sheets/funciones-de-base-de-datos/criterios-and-y-or/1",
        "title": "Sumar pedidos completados web",
        "language": "excel-formula",
        "code": "=DSUM(Ventas!A1:K9,\"importe\",{\"estado\",\"canal\";\"completed\",\"web\"})",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "1400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
