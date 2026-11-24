// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/definicion",
    "remember": "Comprueba permisos, actualización, formatos y origen.",
    "examples": [
      {
        "id": "google-sheets/importacion-y-fuentes-externas/definicion/1",
        "title": "Importar un CSV local",
        "language": "text",
        "code": "",
        "hint": "Crea un archivo CSV con dos líneas: id,importe y 101,200; Archivo > Importar > Subir > Insertar nueva hoja. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Dos columnas y una fila de datos 101,200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/csv-tsv-xlsx",
    "remember": "Verifica separadores, codificación, fechas y fórmulas después de importar.",
    "examples": [
      {
        "id": "google-sheets/importacion-y-fuentes-externas/csv-tsv-xlsx/1",
        "title": "Exportar una hoja",
        "language": "text",
        "code": "",
        "hint": "Abre Ventas; Archivo > Descargar > Valores separados por comas (hoja actual). Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "CSV con encabezados y ocho pedidos; no conserva fórmulas editables ni formato.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/importrange",
    "remember": "La primera conexión exige permitir acceso; evita cadenas de importaciones.",
    "examples": [
      {
        "id": "google-sheets/importacion-y-fuentes-externas/importrange/1",
        "title": "Traer dos registros",
        "language": "text",
        "code": "",
        "hint": "Crea otro archivo con una hoja Datos que tenga A1:B3: id,importe; 101,200; 102,300. En Practica escribe =IMPORTRANGE(\"ID_O_URL_REAL\",\"Datos!A1:B3\") sustituyendo el ID o URL y permite acceso. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Encabezados y dos registros del archivo remoto cuando se conceda acceso.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/importdata",
    "remember": "No funciona con archivos locales ni con cualquier autenticación privada.",
    "examples": [
      {
        "id": "google-sheets/importacion-y-fuentes-externas/importdata/1",
        "title": "Leer CSV publicado",
        "language": "excel-formula",
        "code": "=IMPORTDATA(\"https://example.com/datos.csv\")",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Si sustituyes la URL ilustrativa por una URL pública que sirva id,importe seguido de 101,200, aparecerán esas dos filas. La URL de ejemplo no es una fuente de datos real.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/importhtml",
    "remember": "Las páginas renderizadas solo por JavaScript pueden no funcionar.",
    "examples": [
      {
        "id": "google-sheets/importacion-y-fuentes-externas/importhtml/1",
        "title": "Extraer primera tabla",
        "language": "excel-formula",
        "code": "=IMPORTHTML(\"https://example.com/tabla\",\"table\",1)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Con una URL real accesible que contenga una tabla HTML con encabezado Producto y fila Mouse, devuelve ambas filas; la URL es ilustrativa.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/importxml",
    "remember": "Depende de estructura y acceso al documento.",
    "examples": [
      {
        "id": "google-sheets/importacion-y-fuentes-externas/importxml/1",
        "title": "Extraer encabezados",
        "language": "excel-formula",
        "code": "=IMPORTXML(\"https://example.com/\",\"//h1\")",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Si la página de ejemplo está accesible y conserva su encabezado habitual, devuelve Example Domain; el resultado externo puede cambiar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/importfeed",
    "remember": "La fuente debe ser accesible y compatible.",
    "examples": [
      {
        "id": "google-sheets/importacion-y-fuentes-externas/importfeed/1",
        "title": "Leer títulos de noticias",
        "language": "excel-formula",
        "code": "=IMPORTFEED(\"https://example.com/feed\",\"items title\",FALSE,3)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Con una URL real RSS/Atom devuelve hasta tres títulos; el endpoint mostrado es ilustrativo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/googlefinance",
    "remember": "Cobertura y retraso varían; no sirve como fuente garantizada de cotizaciones en tiempo real.",
    "examples": [
      {
        "id": "google-sheets/importacion-y-fuentes-externas/googlefinance/1",
        "title": "Consultar precio de referencia",
        "language": "excel-formula",
        "code": "=GOOGLEFINANCE(\"NASDAQ:GOOG\",\"price\")",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Un precio numérico en la moneda de cotización si el servicio dispone del símbolo; valor dinámico.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/google-forms",
    "remember": "Mantén intacta la hoja de respuestas y analiza en otra.",
    "examples": [
      {
        "id": "google-sheets/importacion-y-fuentes-externas/google-forms/1",
        "title": "Registrar una respuesta",
        "language": "text",
        "code": "",
        "hint": "Crea un formulario de prueba con pregunta Canal; en Respuestas vincula una hoja y envía web. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Nueva fila con marca de tiempo y web.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/connected-sheets-y-bigquery",
    "remember": "Requiere edición compatible, permisos de BigQuery y puede generar costos.",
    "examples": [
      {
        "id": "google-sheets/importacion-y-fuentes-externas/connected-sheets-y-bigquery/1",
        "title": "Analizar tabla de BigQuery",
        "language": "text",
        "code": "",
        "hint": "En un proyecto autorizado crea o usa una tabla de prueba con canal e importe; Datos > Conectores de datos > Conectar a BigQuery; selecciona tabla y crea resumen por canal. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "La hoja conectada permite calcular totales según los registros de esa tabla; la consulta se ejecuta en el servicio.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/looker-studio",
    "remember": "Mantén encabezados únicos y tipos consistentes.",
    "examples": [
      {
        "id": "google-sheets/importacion-y-fuentes-externas/looker-studio/1",
        "title": "Conectar ventas a reporte",
        "language": "text",
        "code": "",
        "hint": "En Looker Studio crea una fuente de datos Google Sheets; selecciona archivo, hoja Ventas, rango A1:K9; añade tabla canal con SUM de importe. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "store 900 y web 1500, si se incluyen todos los estados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
