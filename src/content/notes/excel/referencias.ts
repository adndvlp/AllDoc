// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/referencias/definicion",
    "remember": "Al copiar una fórmula, las referencias relativas se desplazan.",
    "examples": [
      {
        "id": "excel/referencias/definicion/1",
        "title": "Leer un importe",
        "language": "excel",
        "code": "=Sales!I2",
        "hint": "Al copiar una fórmula, las referencias relativas se desplazan.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/referencias/relativas",
    "remember": "No lleva $.",
    "examples": [
      {
        "id": "excel/referencias/relativas/1",
        "title": "Calcular importes por fila",
        "language": "text",
        "code": "",
        "hint": "En copia de Sales escribe =E2*F2 en J2 y rellena hasta J3. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "J2=200; J3=300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/referencias/absolutas",
    "remember": "Fija la celda de parámetros compartidos.",
    "examples": [
      {
        "id": "excel/referencias/absolutas/1",
        "title": "Aplicar tasa fija",
        "language": "text",
        "code": "",
        "hint": "En Scratch, A1=10%, B2=200, B3=300; en C2 escribe =B2*$A$1 y copia a C3. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "20 y 30.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/referencias/mixtas",
    "remember": "Solo queda fija la parte precedida por $.",
    "examples": [
      {
        "id": "excel/referencias/mixtas/1",
        "title": "Combinar cantidades y precios",
        "language": "text",
        "code": "",
        "hint": "En Scratch B1=100, C1=300, A2=2, A3=3. Escribe =$A2*B$1 en B2 y copia a B2:C3. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Filas de resultados: 200, 600 y 300, 900.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/referencias/entre-hojas-y-libros",
    "remember": "Los vínculos externos dependen de la ubicación y disponibilidad del archivo.",
    "note": "Si la hoja contiene espacios, usa comillas simples, por ejemplo 'Sales 2026'!A2. Para otro libro, selecciónalo al construir la fórmula y revisa los vínculos.",
    "examples": [
      {
        "id": "excel/referencias/entre-hojas-y-libros/1",
        "title": "Leer un nombre",
        "language": "excel",
        "code": "=Customers!B2",
        "hint": "Los vínculos externos dependen de la ubicación y disponibilidad del archivo.",
        "textOutput": "Ana.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/referencias/referencias-3d",
    "remember": "Incluye todas las hojas entre los dos extremos.",
    "examples": [
      {
        "id": "excel/referencias/referencias-3d/1",
        "title": "Sumar meses",
        "language": "text",
        "code": "",
        "hint": "Crea Jan y Feb consecutivas con A1=500 y A1=700; en Scratch escribe =SUM(Jan:Feb!A1). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "1200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/referencias/rangos-con-nombre",
    "remember": "Define nombres significativos sin espacios.",
    "examples": [
      {
        "id": "excel/referencias/rangos-con-nombre/1",
        "title": "Nombrar importes",
        "language": "text",
        "code": "",
        "hint": "Selecciona Sales!I2:I9 y define el nombre Importes; en Scratch usa =SUM(Importes). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "2100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
