// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/referencias/definicion",
    "remember": "El signo $ fija la parte que le sigue al copiar.",
    "examples": [
      {
        "id": "google-sheets/referencias/definicion/1",
        "title": "Calcular el doble del primer importe",
        "language": "excel-formula",
        "code": "=Ventas!J2*2",
        "hint": "",
        "textOutput": "400.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/referencias/relativas",
    "remember": "A1 se desplaza en filas y columnas.",
    "examples": [
      {
        "id": "google-sheets/referencias/relativas/1",
        "title": "Copiar una fórmula hacia abajo",
        "language": "text",
        "code": "",
        "hint": "En Practica A1 escribe =Ventas!J2 y copia a A2. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "A1=200; A2=300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/referencias/absolutas",
    "remember": "$A$1 no se mueve.",
    "examples": [
      {
        "id": "google-sheets/referencias/absolutas/1",
        "title": "Mantener un multiplicador fijo",
        "language": "text",
        "code": "",
        "hint": "En Practica B1 escribe 2; en A1 escribe =Ventas!J2*$B$1 y copia a A2. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "A1=400; A2=600.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/referencias/mixtas",
    "remember": "$A2 fija columna; A$2 fija fila.",
    "examples": [
      {
        "id": "google-sheets/referencias/mixtas/1",
        "title": "Copiar una tabla de multiplicación",
        "language": "text",
        "code": "",
        "hint": "En Practica A2:A3 escribe 2 y 3; B1:C1 escribe 10 y 20; en B2 escribe =$A2*B$1 y copia a B2:C3. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Filas: 20,40; 30,60.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/referencias/rangos-con-nombre",
    "remember": "El nombre sustituye la dirección.",
    "examples": [
      {
        "id": "google-sheets/referencias/rangos-con-nombre/1",
        "title": "Nombrar los importes",
        "language": "text",
        "code": "",
        "hint": "Datos > Rangos con nombre; asigna importes a Ventas!J2:J9. En Practica A1 escribe =SUM(importes). Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "2400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
