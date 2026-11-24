// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/edicion-y-pegado/definicion",
    "remember": "El pegado normal puede copiar también fórmulas y formatos.",
    "examples": [
      {
        "id": "excel/edicion-y-pegado/definicion/1",
        "title": "Copiar un valor",
        "language": "text",
        "code": "",
        "hint": "Copia Sales!A2 a Scratch!A1. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "A1 contiene 101.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/edicion-y-pegado/pegado-especial",
    "remember": "Pegar valores elimina la dependencia de la fórmula original.",
    "examples": [
      {
        "id": "excel/edicion-y-pegado/pegado-especial/1",
        "title": "Conservar un resultado",
        "language": "text",
        "code": "",
        "hint": "En Scratch!A1 escribe =2*100, copia A1 y pega solo valores en B1. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "B1 contiene 200 como constante.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/edicion-y-pegado/transponer",
    "remember": "Transponer con pegado especial crea una copia estática.",
    "examples": [
      {
        "id": "excel/edicion-y-pegado/transponer/1",
        "title": "Convertir encabezados en lista",
        "language": "text",
        "code": "",
        "hint": "Copia Sales!A1:C1 y pega transpuesto en Scratch!A1. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "A1:A3 contiene order_id, order_date, customer_id.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/edicion-y-pegado/autorrelleno-y-series",
    "remember": "Selecciona dos valores para establecer un incremento.",
    "examples": [
      {
        "id": "excel/edicion-y-pegado/autorrelleno-y-series/1",
        "title": "Numerar meses",
        "language": "text",
        "code": "",
        "hint": "Escribe 1 y 2 en Scratch!A1:A2, selecciona ambas y arrastra hasta A5. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "1, 2, 3, 4, 5.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/edicion-y-pegado/flash-fill",
    "remember": "El resultado es estático; revisa excepciones.",
    "examples": [
      {
        "id": "excel/edicion-y-pegado/flash-fill/1",
        "title": "Extraer usuario de correo",
        "language": "text",
        "code": "",
        "hint": "Copia Leads!B2:B6 a Scratch!A2:A6. Escribe ana en B2 y luis en B3; Datos > Relleno rápido sobre B2:B6. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "B2:B6 contiene ana, luis, ana, eva, ana si el patrón es reconocido.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/edicion-y-pegado/buscar-y-reemplazar",
    "remember": "Limita el alcance antes de reemplazar todo.",
    "examples": [
      {
        "id": "excel/edicion-y-pegado/buscar-y-reemplazar/1",
        "title": "Uniformar estado",
        "language": "text",
        "code": "",
        "hint": "En una copia de Sales selecciona G2:G9 y reemplaza cancelled por canceled. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Solo G4 cambia a canceled.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
