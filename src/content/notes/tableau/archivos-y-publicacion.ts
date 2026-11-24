// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/archivos-y-publicacion/definicion",
    "remember": "Publicar no siempre significa hacer público.",
    "examples": [
      {
        "id": "tableau/archivos-y-publicacion/definicion/1",
        "title": "Guardar análisis",
        "code": "",
        "steps": [
          "File > Save As",
          "guarda un workbook de ventas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Existe un archivo .twb o .twbx según formato elegido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/archivos-y-publicacion/twb-twbx-tds-tdsx",
    "remember": "Un paquete puede contener datos; revísalo antes de compartir.",
    "examples": [
      {
        "id": "tableau/archivos-y-publicacion/twb-twbx-tds-tdsx/1",
        "title": "Empaquetar práctica",
        "code": "",
        "steps": [
          "Guarda el workbook local de ventas como Tableau Packaged Workbook (.twbx)",
          "ábrelo en entorno compatible."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Hojas y recursos locales empaquetados están disponibles sin buscar el CSV original, si se incluyó.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/archivos-y-publicacion/tableau-public",
    "remember": "Usa exclusivamente datos que puedan ser públicos.",
    "examples": [
      {
        "id": "tableau/archivos-y-publicacion/tableau-public/1",
        "title": "Publicar práctica",
        "code": "",
        "external": true,
        "hint": "Con datos sintéticos y cuenta Public, usa la opción de guardar/publicar a Tableau Public.",
        "textOutput": "Una visualización publicada accesible según las condiciones de Public; no subas datos reales confidenciales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/archivos-y-publicacion/tableau-cloud-y-server",
    "remember": "La edición, descarga y consulta dependen de licencia, rol y permisos.",
    "examples": [
      {
        "id": "tableau/archivos-y-publicacion/tableau-cloud-y-server/1",
        "title": "Publicar workbook",
        "code": "",
        "steps": [
          "En Desktop inicia sesión en un sitio autorizado",
          "Server > Publish Workbook",
          "elige proyecto y nombre."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Workbook disponible en el proyecto si la publicación se completa.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/archivos-y-publicacion/fuentes-publicadas",
    "remember": "Actualizar fuente compartida puede afectar varios análisis.",
    "examples": [
      {
        "id": "tableau/archivos-y-publicacion/fuentes-publicadas/1",
        "title": "Reutilizar fuente",
        "code": "",
        "external": true,
        "hint": "Publica la fuente de ventas en un proyecto de prueba y conecta un workbook nuevo a ella.",
        "textOutput": "La nueva hoja puede mostrar total 1750 sin reconstruir el modelo local.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/archivos-y-publicacion/refresh-programado-y-bridge",
    "remember": "Revisa credenciales, conectividad y estado de última ejecución.",
    "examples": [
      {
        "id": "tableau/archivos-y-publicacion/refresh-programado-y-bridge/1",
        "title": "Configurar refresco",
        "code": "",
        "steps": [
          "Publica una extracción compatible y define un schedule autorizado",
          "si la red privada lo requiere, configura Bridge con el administrador."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Aparece una tarea de actualización; valida su historial tras ejecutarse.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/archivos-y-publicacion/suscripciones-y-alertas",
    "remember": "Requieren sitio, permisos y soporte de la vista.",
    "examples": [
      {
        "id": "tableau/archivos-y-publicacion/suscripciones-y-alertas/1",
        "title": "Crear alerta",
        "code": "",
        "external": true,
        "hint": "En una vista publicada compatible con eje continuo de ventas, configura alerta sobre un umbral de 1000 si está disponible.",
        "textOutput": "La alerta queda configurada; el envío depende de evaluación y permisos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
