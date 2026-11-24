// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/obtener-datos-y-conectores/definicion",
    "remember": "Primero eliges el origen y luego la entidad.",
    "examples": [
      {
        "id": "power-query/obtener-datos-y-conectores/definicion/1",
        "title": "Importar una tabla del libro",
        "code": "",
        "steps": [
          "Crea una tabla de Excel con encabezados id e importe y las filas 1/100 y 2/200",
          "Usa Datos > Desde tabla o rango"
        ],
        "external": true,
        "hint": "En Excel, la tabla del libro pasa a una consulta.",
        "textOutput": "2 filas con id e importe.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/obtener-datos-y-conectores/excel",
    "remember": "Una tabla de Excel definida es más estable que un rango de posiciones.",
    "note": "Requiere el archivo local; en Mac revisa la matriz de conectores de Excel.",
    "examples": [
      {
        "id": "power-query/obtener-datos-y-conectores/excel/1",
        "title": "Leer la tabla Ventas del archivo",
        "code": "",
        "steps": [
          "Crea ventas.xlsx con una tabla llamada Ventas: id e importe, filas 1/100 y 2/200",
          "En Power Query elige Excel Workbook y selecciona Ventas en el Navegador",
          "Pulsa Transformar datos"
        ],
        "external": true,
        "hint": "Selecciona la tabla, no una hoja distinta.",
        "textOutput": "2 filas con id e importe.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/obtener-datos-y-conectores/csv-y-txt",
    "remember": "Comprueba delimitador y codificación antes de asignar tipos.",
    "examples": [
      {
        "id": "power-query/obtener-datos-y-conectores/csv-y-txt/1",
        "title": "Leer texto separado por punto y coma",
        "language": "powerquery",
        "code": "Csv.Document(\"id;importe#(lf)1;100#(lf)2;200\", [Delimiter=\";\", Encoding=65001])",
        "hint": "Se interpreta el texto literal como contenido CSV, no como ruta.",
        "textOutput": "Column1 y Column2: (id,importe), (1,100), (2,200), todavía como texto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/obtener-datos-y-conectores/sql",
    "remember": "Usa el conector del motor correcto y permisos de lectura.",
    "note": "Requiere servidor, conexión y credenciales reales. MySQL y PostgreSQL usan conectores distintos; disponibilidad según producto.",
    "examples": [
      {
        "id": "power-query/obtener-datos-y-conectores/sql/1",
        "title": "Importar una tabla de SQL Server",
        "code": "",
        "steps": [
          "Con una base de prueba que tenga dbo.Ventas(id, importe) y filas (1,100),(2,200), elige SQL Server",
          "Especifica servidor y base autorizados",
          "Selecciona dbo.Ventas en Navegador y transforma"
        ],
        "external": true,
        "hint": "No necesitas escribir una consulta SQL para navegar una tabla.",
        "textOutput": "2 filas si la tabla contiene solo los datos de prueba.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/obtener-datos-y-conectores/json-y-xml",
    "remember": "Una estructura anidada puede necesitar más de una expansión.",
    "examples": [
      {
        "id": "power-query/obtener-datos-y-conectores/json-y-xml/1",
        "title": "Leer un documento JSON pequeño",
        "language": "powerquery",
        "code": "Json.Document(\"[{\"\"id\"\":1},{\"\"id\"\":2}]\")",
        "hint": "Las comillas dobles internas se escapan duplicándolas en M.",
        "textOutput": "Lista de 2 registros: [id=1] y [id=2].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/obtener-datos-y-conectores/web-y-sharepoint",
    "remember": "Elige el tipo de recurso y no confundas una lista con una carpeta.",
    "note": "Requiere acceso a SharePoint; no se necesita para los demás ejemplos.",
    "examples": [
      {
        "id": "power-query/obtener-datos-y-conectores/web-y-sharepoint/1",
        "title": "Conectar una lista de SharePoint",
        "code": "",
        "steps": [
          "En un sitio autorizado crea una lista Ventas con dos elementos A y B",
          "Elige SharePoint Online List y proporciona la URL del sitio",
          "Autentícate y selecciona Ventas"
        ],
        "external": true,
        "hint": "El conector navega las listas del sitio.",
        "textOutput": "2 elementos A y B, más las columnas de sistema de SharePoint.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
