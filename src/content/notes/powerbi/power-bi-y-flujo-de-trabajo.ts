// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/power-bi-y-flujo-de-trabajo/definicion",
    "remember": "Obtener datos → transformar → modelar → visualizar → publicar.",
    "examples": [
      {
        "id": "powerbi/power-bi-y-flujo-de-trabajo/definicion/1",
        "title": "Crear un informe local",
        "code": "",
        "steps": [
          "Abre Desktop y carga Pedidos con Introducir datos.",
          "Añade una tabla visual con PedidoID y Estado.",
          "Guarda el archivo PBIX."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ocho filas de pedidos en un informe local; aún no está publicado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/power-bi-y-flujo-de-trabajo/vistas-de-desktop",
    "remember": "Cada vista resuelve una tarea diferente.",
    "examples": [
      {
        "id": "powerbi/power-bi-y-flujo-de-trabajo/vistas-de-desktop/1",
        "title": "Inspeccionar el modelo",
        "code": "",
        "steps": [
          "Abre vista Tabla y selecciona Clientes.",
          "Cambia a Modelo y localiza Clientes y Pedidos."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cuatro registros de clientes y una relación 1:* si ya preparaste el modelo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/power-bi-y-flujo-de-trabajo/pbix-y-modelo-semantico",
    "remember": "El informe consume el modelo; no es el modelo.",
    "examples": [
      {
        "id": "powerbi/power-bi-y-flujo-de-trabajo/pbix-y-modelo-semantico/1",
        "title": "Guardar un informe",
        "code": "",
        "steps": [
          "Archivo > Guardar como > Ventas.pbix.",
          "Cierra y reabre el archivo."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Conserva las páginas, consultas y modelo local según el modo de conexión.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/power-bi-y-flujo-de-trabajo/import-directquery-y-direct-lake",
    "remember": "Import necesita actualización; DirectQuery depende del origen; Direct Lake requiere Fabric.",
    "note": "Direct Lake tiene variantes y condiciones de fallback; no significa que nunca se requiera procesamiento ni que toda fuente sea compatible.",
    "examples": [
      {
        "id": "powerbi/power-bi-y-flujo-de-trabajo/import-directquery-y-direct-lake/1",
        "title": "Elegir modo para un CSV",
        "code": "",
        "steps": [
          "Conecta Pedidos.csv desde Obtener datos.",
          "Comprueba el modo en las propiedades de la tabla."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La tabla usa Import; un CSV no ofrece DirectQuery ni Direct Lake.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/power-bi-y-flujo-de-trabajo/conexion-a-modelo-compartido",
    "remember": "Reutiliza métricas corporativas antes de duplicarlas.",
    "note": "Requiere acceso al modelo del Service.",
    "examples": [
      {
        "id": "powerbi/power-bi-y-flujo-de-trabajo/conexion-a-modelo-compartido/1",
        "title": "Crear informe conectado",
        "code": "",
        "steps": [
          "En Desktop, Obtener datos > Modelos semánticos de Power BI.",
          "Selecciona un modelo de prueba publicado con permiso Build.",
          "Crea una tarjeta de Ventas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La tarjeta usa la medida del modelo publicado, si existe.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
