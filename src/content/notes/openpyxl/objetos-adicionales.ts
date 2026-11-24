// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/objetos-adicionales/definicion",
    "remember": "Estos elementos se guardan en el archivo; no son cálculos.",
    "examples": [
      {
        "id": "openpyxl/objetos-adicionales/definicion/1",
        "title": "Anotar un precio",
        "language": "python",
        "code": "from openpyxl.comments import Comment\nws['E2'].comment = Comment('Precio de lista','Analista')\nprint(ws['E2'].comment.text)",
        "hint": "",
        "textOutput": "Precio de lista.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/objetos-adicionales/insertar-imagen",
    "remember": "Requiere Pillow y un archivo válido; la imagen no es un gráfico editable.",
    "note": "Requiere instalar la biblioteca externa que se importa en el ejemplo.",
    "examples": [
      {
        "id": "openpyxl/objetos-adicionales/insertar-imagen/1",
        "title": "Insertar una imagen generada",
        "language": "python",
        "code": "from PIL import Image as PILImage\nfrom openpyxl.drawing.image import Image\nPILImage.new('RGB',(120,40),'#24527A').save('logo.png')\nimg = Image('logo.png')\nresumen.add_image(img,'D2')",
        "hint": "Para practicar este ejemplo, instala Pillow en tu entorno local.",
        "textOutput": "Rectángulo azul de 120 × 40 píxeles anclado en D2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/objetos-adicionales/comentarios",
    "remember": "No conserva todo el formato de comentarios complejos; no equivale a comentarios modernos con hilos.",
    "examples": [
      {
        "id": "openpyxl/objetos-adicionales/comentarios/1",
        "title": "Añadir y quitar una nota",
        "language": "python",
        "code": "from openpyxl.comments import Comment\nws['E2'].comment = Comment('Revisar descuento','Analista')\nprint(ws['E2'].comment.author)\nws['E2'].comment = None",
        "hint": "",
        "textOutput": "Analista; luego se elimina la anotación.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/objetos-adicionales/hipervinculos",
    "remember": "Un enlace no implica descargar ni abrir el destino desde Python.",
    "examples": [
      {
        "id": "openpyxl/objetos-adicionales/hipervinculos/1",
        "title": "Enlazar la documentación",
        "language": "python",
        "code": "ws['I1'] = 'Documentación'\nws['I1'].hyperlink = 'https://openpyxl.readthedocs.io/'\nws['I1'].style = 'Hyperlink'\nprint(ws['I1'].hyperlink.target)",
        "hint": "",
        "textOutput": "https://openpyxl.readthedocs.io/.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/objetos-adicionales/texto-enriquecido",
    "remember": "Usa load_workbook(rich_text=True) para conservar texto enriquecido existente.",
    "examples": [
      {
        "id": "openpyxl/objetos-adicionales/texto-enriquecido/1",
        "title": "Dar formato a una parte del texto",
        "language": "python",
        "code": "from openpyxl.cell.rich_text import CellRichText, TextBlock\nfrom openpyxl.cell.text import InlineFont\nws['I1'] = CellRichText('Estado: ',TextBlock(InlineFont(b=True,color='FF008000'),'OK'))\nwb.save('rich.xlsx')\nprint(str(load_workbook('rich.xlsx',rich_text=True)['Ventas']['I1'].value))",
        "hint": "",
        "textOutput": "Estado: OK; el fragmento OK conserva negrita y color verde.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
