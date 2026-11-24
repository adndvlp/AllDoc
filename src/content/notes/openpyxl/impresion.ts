// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/impresion/definicion",
    "remember": "El resultado final depende de Excel, la impresora y el papel.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/impresion/definicion/1",
        "title": "Limitar la impresión al rango de ventas",
        "language": "python",
        "code": "ws.print_area = 'A1:G6'\nprint(ws.print_area)",
        "hint": "",
        "textOutput": "Área Ventas!$A$1:$G$6.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/impresion/configurar-pagina",
    "remember": "Ajustar a una página de ancho no implica una sola página de alto.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/impresion/configurar-pagina/1",
        "title": "Ajustar el reporte a papel A4 horizontal",
        "language": "python",
        "code": "from openpyxl.worksheet.properties import PageSetupProperties\nws.sheet_properties.pageSetUpPr = PageSetupProperties(fitToPage=True)\nws.page_setup.orientation = 'landscape'\nws.page_setup.paperSize = ws.PAPERSIZE_A4\nws.page_setup.fitToWidth = 1\nws.page_setup.fitToHeight = 0\nprint(ws.page_setup.orientation,ws.page_setup.fitToWidth)",
        "hint": "",
        "textOutput": "landscape 1; A4 horizontal y ajuste a una página de ancho.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/impresion/area-y-titulos",
    "remember": "Los títulos repetidos no duplican celdas.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/impresion/area-y-titulos/1",
        "title": "Repetir cabeceras en páginas",
        "language": "python",
        "code": "ws.print_area = 'A1:G6'\nws.print_title_rows = '1:1'\nws.print_title_cols = 'A:A'\nprint(ws.print_title_rows,ws.print_title_cols)",
        "hint": "",
        "textOutput": "$1:$1 $A:$A; encabezados repetidos en impresión.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/impresion/margenes",
    "remember": "Los márgenes no cambian dimensiones de las celdas.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/impresion/margenes/1",
        "title": "Configurar márgenes",
        "language": "python",
        "code": "from openpyxl.worksheet.page import PageMargins\nws.page_margins = PageMargins(left=0.3,right=0.3,top=0.5,bottom=0.5)\nprint(ws.page_margins.left)",
        "hint": "",
        "textOutput": "0.3 pulgadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/impresion/encabezados-y-pies",
    "remember": "&P es página actual y &N total de páginas.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/impresion/encabezados-y-pies/1",
        "title": "Añadir título y numeración de páginas",
        "language": "python",
        "code": "ws.oddHeader.center.text = 'Reporte de ventas'\nws.oddFooter.right.text = 'Pagina &P de &N'\nprint(ws.oddHeader.center.text)",
        "hint": "",
        "textOutput": "Reporte de ventas; numeración al imprimir.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/impresion/saltos-de-pagina",
    "remember": "La aplicación de impresión puede ajustar los saltos según su configuración.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/impresion/saltos-de-pagina/1",
        "title": "Configurar un salto manual",
        "language": "python",
        "code": "from openpyxl.worksheet.pagebreak import Break\nws.row_breaks.append(Break(id=3))\nprint(ws.row_breaks.brk[0].id)",
        "hint": "",
        "textOutput": "3; salto manual asociado a la fila 3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
