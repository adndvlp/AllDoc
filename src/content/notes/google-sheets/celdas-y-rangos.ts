// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/celdas-y-rangos/definicion",
    "remember": "La letra es columna y el número es fila.",
    "examples": [
      {
        "id": "google-sheets/celdas-y-rangos/definicion/1",
        "title": "Leer el primer importe",
        "language": "excel-formula",
        "code": "=Ventas!J2",
        "hint": "",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/celdas-y-rangos/rango-contiguo",
    "remember": "A2:A9 contiene ocho celdas.",
    "examples": [
      {
        "id": "google-sheets/celdas-y-rangos/rango-contiguo/1",
        "title": "Leer los dos primeros importes",
        "language": "excel-formula",
        "code": "=ARRAYFORMULA(Ventas!J2:J3)",
        "hint": "",
        "textOutput": "Una columna con 200 y 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/celdas-y-rangos/hojas-y-libros",
    "remember": "Usa comillas simples si el nombre de hoja contiene espacios.",
    "examples": [
      {
        "id": "google-sheets/celdas-y-rangos/hojas-y-libros/1",
        "title": "Leer el cliente del primer pedido",
        "language": "excel-formula",
        "code": "=Ventas!C2",
        "hint": "",
        "textOutput": "1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/celdas-y-rangos/seleccionar-y-editar",
    "remember": "Editar un valor cambia sus dependencias.",
    "examples": [
      {
        "id": "google-sheets/celdas-y-rangos/seleccionar-y-editar/1",
        "title": "Examinar un cálculo",
        "language": "text",
        "code": "",
        "hint": "En Ventas, escribe J2 en el cuadro de nombre y observa la barra de fórmulas. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Se selecciona J2; se ve =E2*F2 y el valor 200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/celdas-y-rangos/autorrelleno",
    "remember": "Arrastra el controlador de relleno.",
    "examples": [
      {
        "id": "google-sheets/celdas-y-rangos/autorrelleno/1",
        "title": "Calcular importes",
        "language": "text",
        "code": "",
        "hint": "En una copia de Ventas, borra J2:J9, escribe =E2*F2 en J2 y arrastra hasta J9. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "J2=200, J3=300 y J9=300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
