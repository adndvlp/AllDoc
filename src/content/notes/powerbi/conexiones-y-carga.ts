// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/conexiones-y-carga/definicion",
    "remember": "Transformar prepara; cargar incorpora al modelo.",
    "examples": [
      {
        "id": "powerbi/conexiones-y-carga/definicion/1",
        "title": "Importar clientes",
        "code": "",
        "steps": [
          "Inicio > Obtener datos > Texto/CSV.",
          "Selecciona Clientes.csv y revisa la vista previa.",
          "Pulsa Transformar datos; establece ClienteID como entero."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cuatro filas en Power Query.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/conexiones-y-carga/excel-y-csv",
    "remember": "Revisa encabezados y tipos, no confíes solo en la detección.",
    "examples": [
      {
        "id": "powerbi/conexiones-y-carga/excel-y-csv/1",
        "title": "Importar CSV de productos",
        "code": "",
        "steps": [
          "Obtén Productos.csv; selecciona delimitador coma y UTF-8.",
          "Verifica las cuatro columnas; carga."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Tres productos con sus costes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/conexiones-y-carga/bases-de-datos",
    "remember": "No todos los conectores ofrecen los mismos modos.",
    "note": "Requiere servidor y controlador cuando el conector lo solicite; consulta compatibilidad oficial.",
    "examples": [
      {
        "id": "powerbi/conexiones-y-carga/bases-de-datos/1",
        "title": "Conectar SQL Server",
        "code": "",
        "steps": [
          "Con una base de pruebas que contenga Pedidos, selecciona SQL Server.",
          "Introduce servidor, base y credenciales de solo lectura.",
          "Selecciona Import y la tabla Pedidos."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Vista previa de la tabla del servidor; si contiene los datos compartidos, ocho filas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/conexiones-y-carga/carpetas-y-combinar-archivos",
    "remember": "Mismo esquema y archivos válidos antes de combinar.",
    "examples": [
      {
        "id": "powerbi/conexiones-y-carga/carpetas-y-combinar-archivos/1",
        "title": "Consolidar dos meses",
        "code": "",
        "steps": [
          "Guarda los pedidos 3–5 en enero.csv y 6–8 en febrero.csv con mismos encabezados en una carpeta vacía.",
          "Obtener datos > Carpeta > Combinar y transformar.",
          "Verifica tipos y origen del archivo."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Seis pedidos de 2026.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/conexiones-y-carga/web-json-y-api",
    "remember": "Primero identifica estructura, autenticación y paginación.",
    "note": "Una API real requiere endpoint, credenciales y paginación según su contrato; no incrustes secretos en M.",
    "examples": [
      {
        "id": "powerbi/conexiones-y-carga/web-json-y-api/1",
        "title": "Expandir JSON local de prueba",
        "code": "",
        "steps": [
          "Crea una consulta en blanco, Editor avanzado, pega `let Fuente = Json.Document(\"[{\"\"id\"\":1,\"\"ventas\"\":100},{\"\"id\"\":2,\"\"ventas\"\":200}]\"), Tabla = Table.FromRecords(Fuente) in Tabla`."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dos filas con id y ventas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/conexiones-y-carga/credenciales-y-privacidad",
    "remember": "Un acceso local válido no garantiza acceso desde Service.",
    "examples": [
      {
        "id": "powerbi/conexiones-y-carga/credenciales-y-privacidad/1",
        "title": "Revisar credenciales",
        "code": "",
        "steps": [
          "Archivo > Opciones y configuración > Configuración de origen de datos.",
          "Selecciona el origen CSV de prueba y revisa permisos."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Puedes identificar el origen y sus permisos actuales; no cambia el modelo si cancelas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
