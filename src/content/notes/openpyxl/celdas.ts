// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/celdas/definicion",
    "remember": "La celda es el objeto; .value es el contenido.",
    "examples": [
      {
        "id": "openpyxl/celdas/definicion/1",
        "title": "Leer el producto de la primera venta",
        "language": "python",
        "code": "print(ws['B2'], ws['B2'].value)",
        "hint": "",
        "textOutput": "Objeto Cell de Ventas!B2 y el texto Laptop.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/celdas/acceso-a-celdas",
    "remember": "Los índices de Excel son base 1.",
    "examples": [
      {
        "id": "openpyxl/celdas/acceso-a-celdas/1",
        "title": "Leer las unidades de dos formas",
        "language": "python",
        "code": "print(ws['D2'].value, ws.cell(row=2, column=4).value)",
        "hint": "",
        "textOutput": "2 2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/celdas/escribir-valores",
    "remember": "Asignar None no elimina la fila ni necesariamente el estilo.",
    "examples": [
      {
        "id": "openpyxl/celdas/escribir-valores/1",
        "title": "Cambiar un producto y vaciar una región",
        "language": "python",
        "code": "ws['B2'] = 'Monitor'\nws['C3'].value = None\nprint(ws['B2'].value, ws['C3'].value)",
        "hint": "",
        "textOutput": "Monitor None.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/celdas/tipos-de-celdas",
    "remember": "Una cadena que empieza con = normalmente se interpreta como fórmula.",
    "examples": [
      {
        "id": "openpyxl/celdas/tipos-de-celdas/1",
        "title": "Identificar tipos de datos",
        "language": "python",
        "code": "ws['H2'] = '=D2*E2'\nws['I2'] = True\nprint([ws[x].data_type for x in ['A2','B2','F2','H2','I2']])",
        "hint": "",
        "textOutput": "['n', 's', 'd', 'f', 'b'].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/celdas/coordenadas-y-offset",
    "remember": "offset usa desplazamientos, no índices absolutos.",
    "examples": [
      {
        "id": "openpyxl/celdas/coordenadas-y-offset/1",
        "title": "Obtener la posición y la región vecina",
        "language": "python",
        "code": "c = ws['B2']\nprint(c.row, c.column, c.coordinate, c.offset(column=1).value)",
        "hint": "",
        "textOutput": "2 2 B2 Norte.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/celdas/propiedades-de-celda",
    "remember": "El formato también influye en la interpretación de fechas.",
    "examples": [
      {
        "id": "openpyxl/celdas/propiedades-de-celda/1",
        "title": "Comprobar fecha y estilo",
        "language": "python",
        "code": "print(ws['F2'].is_date, ws['B2'].has_style)",
        "hint": "",
        "textOutput": "True False.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/celdas/texto-literal",
    "remember": "No conviertas entradas externas en fórmulas involuntariamente.",
    "examples": [
      {
        "id": "openpyxl/celdas/texto-literal/1",
        "title": "Escribir texto que comienza con igual",
        "language": "python",
        "code": "ws['H2'] = '=entrada'\nws['H2'].data_type = 's'\nprint(ws['H2'].value, ws['H2'].data_type)",
        "hint": "",
        "textOutput": "=entrada s.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
