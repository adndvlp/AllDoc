// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/estilos/definicion",
    "remember": "Asigna objetos de estilo a cada celda; los estilos asignados se tratan como inmutables.",
    "examples": [
      {
        "id": "openpyxl/estilos/definicion/1",
        "title": "Dar formato a una cabecera",
        "language": "python",
        "code": "from openpyxl.styles import Font\nws['A1'].font = Font(bold=True)\nprint(ws['A1'].font.bold, ws['A1'].value)",
        "hint": "",
        "textOutput": "True ID.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/estilos/fuente",
    "remember": "El color puede expresarse en ARGB de ocho dígitos.",
    "examples": [
      {
        "id": "openpyxl/estilos/fuente/1",
        "title": "Poner una cabecera en negrita",
        "language": "python",
        "code": "from openpyxl.styles import Font\nws['A1'].font = Font(name='Calibri', size=12, bold=True, color='FFFFFFFF')\nprint(ws['A1'].font.bold, ws['A1'].font.color.rgb)",
        "hint": "",
        "textOutput": "True FFFFFFFF.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/estilos/rellenos",
    "remember": "Para fondo sólido especifica fill_type='solid'.",
    "examples": [
      {
        "id": "openpyxl/estilos/rellenos/1",
        "title": "Crear un fondo sólido y un degradado",
        "language": "python",
        "code": "from openpyxl.styles import PatternFill, GradientFill\nws['A1'].fill = PatternFill(fill_type='solid',fgColor='FF24527A')\nws['B1'].fill = GradientFill(stop=('FFFFFFFF','FFB7D5EB'))\nprint(ws['A1'].fill.fgColor.rgb, ws['B1'].fill.type)",
        "hint": "",
        "textOutput": "FF24527A linear.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/estilos/bordes",
    "remember": "Sin estilo de línea, un color por sí solo no dibuja el borde.",
    "examples": [
      {
        "id": "openpyxl/estilos/bordes/1",
        "title": "Dibujar un borde inferior",
        "language": "python",
        "code": "from openpyxl.styles import Border, Side\nws['A1'].border = Border(bottom=Side(style='thin',color='FF444444'))\nprint(ws['A1'].border.bottom.style)",
        "hint": "",
        "textOutput": "thin.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/estilos/alineacion",
    "remember": "wrap_text permite varias líneas; puede requerir ajustar la altura.",
    "examples": [
      {
        "id": "openpyxl/estilos/alineacion/1",
        "title": "Centrar y ajustar una cabecera",
        "language": "python",
        "code": "from openpyxl.styles import Alignment\nws['A1'].alignment = Alignment(horizontal='center',vertical='center',wrap_text=True)\nprint(ws['A1'].alignment.horizontal, ws['A1'].alignment.wrap_text)",
        "hint": "",
        "textOutput": "center True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/estilos/formato-numerico",
    "remember": "Un porcentaje almacenado como 0.25 se muestra como 25%, no multipliques por 100 antes de formatear.",
    "examples": [
      {
        "id": "openpyxl/estilos/formato-numerico/1",
        "title": "Mostrar moneda, fecha y porcentaje",
        "language": "python",
        "code": "ws['E2'].number_format = '\"$\"#,##0.00'\nws['F2'].number_format = 'yyyy-mm-dd'\nws['H2'] = 0.25\nws['H2'].number_format = '0.0%'\nprint(ws['E2'].value, ws['H2'].value)",
        "hint": "",
        "textOutput": "Valores 800 y 0.25; visualmente $800.00, 2026-08-01 y 25.0% según configuración regional.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/estilos/estilo-reutilizable",
    "remember": "Cambiar el NamedStyle después de asignarlo no modifica retroactivamente las celdas.",
    "examples": [
      {
        "id": "openpyxl/estilos/estilo-reutilizable/1",
        "title": "Aplicar un estilo a todas las cabeceras",
        "language": "python",
        "code": "from openpyxl.styles import NamedStyle, Font\nestilo = NamedStyle(name='encabezado',font=Font(bold=True))\nwb.add_named_style(estilo)\nfor c in ws[1]:\n    c.style = 'encabezado'\nprint(ws['G1'].font.bold)",
        "hint": "",
        "textOutput": "True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/estilos/copiar-estilos",
    "remember": "Copia los componentes necesarios; no confíes en propiedades privadas.",
    "examples": [
      {
        "id": "openpyxl/estilos/copiar-estilos/1",
        "title": "Reutilizar la tipografía de una cabecera",
        "language": "python",
        "code": "from copy import copy\nfrom openpyxl.styles import Font\nws['A1'].font = Font(bold=True,color='FF0000FF')\nws['B1'].font = copy(ws['A1'].font)\nprint(ws['B1'].font.bold)",
        "hint": "",
        "textOutput": "True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/estilos/colores",
    "remember": "Los colores de tema dependen del libro; no garantizan un RGB fijo.",
    "examples": [
      {
        "id": "openpyxl/estilos/colores/1",
        "title": "Comparar tres modos de especificar color",
        "language": "python",
        "code": "from openpyxl.styles import Font, Color\nws['A1'].font = Font(color=Color(rgb='FF112233'))\nws['B1'].font = Font(color=Color(theme=1,tint=0.2))\nws['C1'].font = Font(color=Color(indexed=10))\nprint(ws['A1'].font.color.type, ws['B1'].font.color.type, ws['C1'].font.color.type)",
        "hint": "",
        "textOutput": "rgb theme indexed.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
