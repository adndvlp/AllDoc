// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/conexiones/definicion",
    "remember": "La conexión determina disponibilidad y actualización de datos.",
    "examples": [
      {
        "id": "tableau/conexiones/definicion/1",
        "title": "Conectar CSV",
        "code": "",
        "steps": [
          "Connect > Text File > ventas.csv",
          "abre una hoja."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se pueden consultar las 13 columnas del archivo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/conexiones/excel-y-texto",
    "remember": "Verifica tipos, delimitadores y encabezados.",
    "examples": [
      {
        "id": "tableau/conexiones/excel-y-texto/1",
        "title": "Conectar una hoja",
        "code": "",
        "steps": [
          "Guarda el CSV como hoja Ventas de un Excel",
          "Connect > Microsoft Excel",
          "arrastra Ventas al lienzo."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ocho líneas, total 1750.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/conexiones/bases-de-datos-y-custom-sql",
    "remember": "Usa el dialecto del motor, no fórmulas de Tableau, dentro de Custom SQL.",
    "note": "Requiere conector compatible, tabla cargada y permisos; Tableau puede envolver la consulta.",
    "examples": [
      {
        "id": "tableau/conexiones/bases-de-datos-y-custom-sql/1",
        "title": "Leer solo pedidos completados",
        "code": "",
        "steps": [
          "Si cargaste ventas en una tabla SQL, conecta al servidor con el driver y credenciales",
          "elige New Custom SQL. Fórmula SQL: SELECT * FROM ventas WHERE Estado = 'Completado'"
        ],
        "external": true,
        "hint": "",
        "textOutput": "Siete líneas, ventas 1700.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/conexiones/live",
    "remember": "Live no garantiza actualización instantánea de cada pantalla.",
    "examples": [
      {
        "id": "tableau/conexiones/live/1",
        "title": "Consultar fuente SQL",
        "code": "",
        "steps": [
          "En la fuente SQL anterior selecciona Live",
          "cambia una fila en un entorno de prueba y refresca la vista."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Tras refrescar, se refleja el cambio confirmado en el servidor.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/conexiones/extract",
    "remember": "Un extract no incorpora automáticamente cambios de origen.",
    "examples": [
      {
        "id": "tableau/conexiones/extract/1",
        "title": "Crear extracción",
        "code": "",
        "external": true,
        "hint": "En Data Source elige Extract, abre una hoja y guarda el .hyper cuando lo solicite.",
        "textOutput": "La suma de ventas sigue siendo 1750; el archivo de extracción existe localmente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/conexiones/refresh-de-datos",
    "remember": "Full reemplaza los datos; incremental incorpora datos según su configuración y no equivale a detectar toda modificación.",
    "note": "Usa una copia; el incremental depende de conector, versión y clave o rango configurado.",
    "examples": [
      {
        "id": "tableau/conexiones/refresh-de-datos/1",
        "title": "Actualizar extract",
        "code": "",
        "external": true,
        "hint": "Crea una copia de ventas.csv, extrae sus datos, añade una línea válida de ventas 50 y ejecuta un full refresh.",
        "textOutput": "Ventas pasan de 1750 a 1800.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
