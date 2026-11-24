// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/formatos-avanzados/definicion",
    "remember": "Haz una copia de libros complejos y verifica su contenido después de guardarlos.",
    "examples": [
      {
        "id": "openpyxl/formatos-avanzados/definicion/1",
        "title": "Consultar los metadatos iniciales",
        "language": "python",
        "code": "print(wb.properties.creator,wb.template)",
        "hint": "",
        "textOutput": "openpyxl False; libro normal, no plantilla.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formatos-avanzados/propiedades-documento",
    "remember": "No representan los datos de las hojas.",
    "examples": [
      {
        "id": "openpyxl/formatos-avanzados/propiedades-documento/1",
        "title": "Registrar autor y título",
        "language": "python",
        "code": "wb.properties.creator = 'Equipo de analisis'\nwb.properties.title = 'Ventas agosto'\nprint(wb.properties.title)",
        "hint": "",
        "textOutput": "Ventas agosto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formatos-avanzados/propiedades-personalizadas",
    "remember": "Disponible en openpyxl 3.1; elige el tipo adecuado.",
    "examples": [
      {
        "id": "openpyxl/formatos-avanzados/propiedades-personalizadas/1",
        "title": "Registrar el periodo del reporte",
        "language": "python",
        "code": "from openpyxl.packaging.custom import StringProperty\nwb.custom_doc_props.append(StringProperty(name='Periodo',value='2026-08'))\nprint(wb.custom_doc_props['Periodo'].value)",
        "hint": "",
        "textOutput": "2026-08.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formatos-avanzados/plantillas",
    "remember": "Para crear un xlsx a partir de una xltx, desactiva template antes de guardar.",
    "examples": [
      {
        "id": "openpyxl/formatos-avanzados/plantillas/1",
        "title": "Crear un libro desde una plantilla",
        "language": "python",
        "code": "wb.template = True\nwb.save('plantilla.xltx')\nlibro = load_workbook('plantilla.xltx')\nlibro.template = False\nlibro.save('reporte_desde_plantilla.xlsx')\nprint(load_workbook('reporte_desde_plantilla.xlsx').template)",
        "hint": "",
        "textOutput": "False; se crea un libro normal desde la plantilla.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formatos-avanzados/macros",
    "remember": "Requiere un archivo xlsm real aportado por el usuario; guarda como xlsm y verifica las macros en Excel.",
    "note": "Este ejemplo requiere el archivo indicado; no se incluye en los datos compartidos y no se ha ejecutado.",
    "examples": [
      {
        "id": "openpyxl/formatos-avanzados/macros/1",
        "title": "Actualizar una copia con macros",
        "language": "python",
        "code": "# Requiere plantilla_macros.xlsm existente\nlibro = load_workbook('plantilla_macros.xlsm',keep_vba=True)\nlibro.active['A1'] = 'Actualizado'\nlibro.save('reporte_macros.xlsm')",
        "hint": "",
        "textOutput": "Archivo nuevo con A1 actualizado y componentes VBA conservados en la medida admitida. Verificar macros y objetos en Excel.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formatos-avanzados/tablas-dinamicas",
    "remember": "Requiere un archivo real con tabla dinámica; _pivots es una interfaz interna y puede variar.",
    "note": "Este ejemplo requiere el archivo indicado; no se incluye en los datos compartidos y no se ha ejecutado.",
    "examples": [
      {
        "id": "openpyxl/formatos-avanzados/tablas-dinamicas/1",
        "title": "Solicitar actualización de una tabla dinámica",
        "language": "python",
        "code": "# Requiere reporte_pivot.xlsx con un pivot en la primera hoja\nlibro = load_workbook('reporte_pivot.xlsx')\npivot = libro.active._pivots[0]\npivot.cache.refreshOnLoad = True\nlibro.save('pivot_actualizado.xlsx')",
        "hint": "",
        "textOutput": "Se solicita refrescar la caché al abrir en Excel; Python no recalcula el pivot. Verificar que el origen sigue siendo válido.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formatos-avanzados/referencias-externas",
    "remember": "No resuelve ni actualiza archivos externos; no elimines vínculos inadvertidamente.",
    "examples": [
      {
        "id": "openpyxl/formatos-avanzados/referencias-externas/1",
        "title": "Cargar conservando vínculos externos",
        "language": "python",
        "code": "libro = load_workbook('ventas_base.xlsx',keep_links=True)\nprint(libro.sheetnames)",
        "hint": "",
        "textOutput": "['Ventas', 'Resumen']; con un libro vinculado, se solicita preservar la información externa admitida.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formatos-avanzados/ooxml",
    "remember": "Útil para diagnóstico; editar XML manualmente puede romper relaciones y contenido.",
    "examples": [
      {
        "id": "openpyxl/formatos-avanzados/ooxml/1",
        "title": "Inspeccionar partes de un archivo XLSX",
        "language": "python",
        "code": "from zipfile import ZipFile\nwith ZipFile('ventas_base.xlsx') as z:\n    print('xl/workbook.xml' in z.namelist())\n    print('xl/worksheets/sheet1.xml' in z.namelist())",
        "hint": "",
        "textOutput": "True; True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
