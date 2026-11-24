// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/importacion-y-conexiones/definicion",
    "remember": "Comprueba tipos, encabezados, delimitador y codificación antes de cargar.",
    "examples": [
      {
        "id": "excel/importacion-y-conexiones/definicion/1",
        "title": "Importar CSV",
        "language": "text",
        "code": "",
        "hint": "Guarda un archivo UTF-8 llamado products.csv con encabezado product_id,product_name,category,price y las tres filas de Products separadas por coma. Datos > Desde texto/CSV; elige coma, UTF-8 y Cargar. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Tabla de 3 productos y 4 columnas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/importacion-y-conexiones/csv-txt-y-delimitadores",
    "remember": "Abrir directamente puede convertir fechas o códigos automáticamente.",
    "examples": [
      {
        "id": "excel/importacion-y-conexiones/csv-txt-y-delimitadores/1",
        "title": "Conservar código",
        "language": "text",
        "code": "",
        "hint": "Crea codes.csv con encabezado code,amount y una fila 00123,200. Importa mediante Desde texto/CSV > Transformar datos; establece code como Texto antes de que se convierta a número (elimina el paso de tipo automático si existe). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "00123 se conserva; amount es 200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/importacion-y-conexiones/otros-libros-y-carpetas",
    "remember": "Los encabezados y tipos deben ser consistentes.",
    "examples": [
      {
        "id": "excel/importacion-y-conexiones/otros-libros-y-carpetas/1",
        "title": "Leer catálogo",
        "language": "text",
        "code": "",
        "hint": "Guarda una copia del libro como catalog.xlsx; Datos > Obtener datos > Desde libro de Excel; selecciona tProducts y carga. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "3 productos y 4 columnas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/importacion-y-conexiones/bases-de-datos-y-odbc",
    "remember": "Selecciona solo los datos necesarios y no guardes contraseñas en celdas.",
    "note": "Requiere fuente real, controlador compatible y permisos; la lista de conectores depende de plataforma y edición.",
    "examples": [
      {
        "id": "excel/importacion-y-conexiones/bases-de-datos-y-odbc/1",
        "title": "Consultar catálogo",
        "language": "text",
        "code": "",
        "hint": "En una base de pruebas con tabla products equivalente a Products, configura el conector o DSN ODBC autorizado; selecciona products y carga sus cuatro campos. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Si la fuente tiene los tres registros compartidos, se obtienen tres filas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/importacion-y-conexiones/actualizar-y-administrar-conexiones",
    "remember": "Actualizar no es lo mismo que recalcular fórmulas.",
    "examples": [
      {
        "id": "excel/importacion-y-conexiones/actualizar-y-administrar-conexiones/1",
        "title": "Actualizar CSV",
        "language": "text",
        "code": "",
        "hint": "Importa el products.csv del primer ejemplo; agrega P4,Stand,Accessories,80 al archivo y guárdalo; en Excel usa Datos > Actualizar todo. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "La consulta importada devuelve cuatro filas si no hay un paso que las limite.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
