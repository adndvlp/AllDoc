// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/rangos/definicion",
    "remember": "El rango rectangular A1:B2 incluye los extremos.",
    "examples": [
      {
        "id": "openpyxl/rangos/definicion/1",
        "title": "Leer el rectángulo A1:B2",
        "language": "python",
        "code": "print([[c.value for c in fila] for fila in ws['A1:B2']])",
        "hint": "",
        "textOutput": "[['ID', 'Producto'], [101, 'Laptop']].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/rangos/rows-y-columns",
    "remember": "En modo normal ambos son iterables; read_only no ofrece iteración por columnas.",
    "examples": [
      {
        "id": "openpyxl/rangos/rows-y-columns/1",
        "title": "Leer la cabecera y los identificadores",
        "language": "python",
        "code": "print([c.value for c in next(ws.rows)])\nprint([c.value for c in next(ws.columns)])",
        "hint": "",
        "textOutput": "['ID', 'Producto', 'Region', 'Unidades', 'Precio', 'Fecha', 'Estado'] y ['ID', 101, 102, 103, 104, 105].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/rangos/iter-rows",
    "remember": "min_row=2 evita la cabecera.",
    "examples": [
      {
        "id": "openpyxl/rangos/iter-rows/1",
        "title": "Recorrer las dos primeras ventas",
        "language": "python",
        "code": "for fila in ws.iter_rows(min_row=2,max_row=3,min_col=1,max_col=2):\n    print([c.value for c in fila])",
        "hint": "",
        "textOutput": "[101, 'Laptop']; [102, 'Mouse'].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/rangos/iter-cols",
    "remember": "El resultado externo agrupa por columna.",
    "examples": [
      {
        "id": "openpyxl/rangos/iter-cols/1",
        "title": "Leer unidades y precios por columna",
        "language": "python",
        "code": "for col in ws.iter_cols(min_row=2,max_row=3,min_col=4,max_col=5,values_only=True):\n    print(col)",
        "hint": "",
        "textOutput": " (2, 5); (800, 20).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/rangos/solo-valores",
    "remember": "No uses .value cuando ya recibes valores.",
    "examples": [
      {
        "id": "openpyxl/rangos/solo-valores/1",
        "title": "Extraer tuplas de valores",
        "language": "python",
        "code": "print(next(ws.iter_rows(min_row=2,max_row=2,values_only=True))[:3])\nprint(next(ws.values)[:3])",
        "hint": "",
        "textOutput": "(101, 'Laptop', 'Norte'); ('ID', 'Producto', 'Region').",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/rangos/dimensiones",
    "remember": "Una celda vacía creada o formateada puede ampliar las dimensiones; no son un conteo de registros útiles.",
    "examples": [
      {
        "id": "openpyxl/rangos/dimensiones/1",
        "title": "Consultar los límites de Ventas",
        "language": "python",
        "code": "print(ws.min_row, ws.max_row, ws.min_column, ws.max_column)\nprint(ws.dimensions, ws.calculate_dimension())",
        "hint": "",
        "textOutput": "1 6 1 7; A1:G6 A1:G6.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
