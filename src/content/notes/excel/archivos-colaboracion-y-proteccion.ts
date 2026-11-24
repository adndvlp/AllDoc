// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/archivos-colaboracion-y-proteccion/definicion",
    "remember": "La protección de hoja evita ediciones accidentales, no reemplaza permisos de acceso.",
    "examples": [
      {
        "id": "excel/archivos-colaboracion-y-proteccion/definicion/1",
        "title": "Guardar libro",
        "language": "text",
        "code": "",
        "hint": "Archivo > Guardar como > Libro de Excel (.xlsx). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Se conserva el libro con múltiples hojas y fórmulas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/archivos-colaboracion-y-proteccion/xlsx-xlsm-y-csv",
    "remember": "No uses CSV como copia completa de un modelo.",
    "examples": [
      {
        "id": "excel/archivos-colaboracion-y-proteccion/xlsx-xlsm-y-csv/1",
        "title": "Exportar pedidos",
        "language": "text",
        "code": "",
        "hint": "Guarda una copia de Sales como CSV UTF-8; conserva el XLSX original. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Archivo de texto con encabezado y 8 filas; sin pivots, formatos ni otras hojas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/archivos-colaboracion-y-proteccion/proteccion-de-hoja-y-libro",
    "remember": "Bloqueada solo actúa cuando la hoja está protegida.",
    "examples": [
      {
        "id": "excel/archivos-colaboracion-y-proteccion/proteccion-de-hoja-y-libro/1",
        "title": "Proteger fórmulas",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1=10, B1 =A1*2; desbloquea A1 mediante Formato de celdas > Protección; protege hoja con B1 bloqueada. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "A1 se puede editar; B1 no se puede cambiar directamente mientras esté protegida.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/archivos-colaboracion-y-proteccion/coautoria-comentarios-e-historial",
    "remember": "Controla permisos de edición y lectura en el almacenamiento.",
    "note": "Requiere cuenta, almacenamiento y permisos compatibles. No publiques datos sensibles.",
    "examples": [
      {
        "id": "excel/archivos-colaboracion-y-proteccion/coautoria-comentarios-e-historial/1",
        "title": "Colaborar en copia",
        "language": "text",
        "code": "",
        "hint": "Guarda libro en OneDrive o SharePoint autorizado; comparte con permiso de lectura a un colaborador de prueba y añade un comentario a Sales!I2. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "La persona autorizada puede abrir el libro según el permiso; el comentario queda asociado a I2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/archivos-colaboracion-y-proteccion/vinculos-externos",
    "remember": "Mover la fuente puede romper vínculos; revisa antes de distribuir.",
    "examples": [
      {
        "id": "excel/archivos-colaboracion-y-proteccion/vinculos-externos/1",
        "title": "Crear y revisar vínculo",
        "language": "text",
        "code": "",
        "hint": "Guarda dos libros en la misma carpeta; en el segundo escribe una fórmula seleccionando Sales!I2 del primero; revisa Datos > Vínculos de libro o Editar vínculos según versión. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Resultado inicial 200; el vínculo apunta al primer libro.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
