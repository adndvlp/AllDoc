// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/informes-paginados/definicion",
    "remember": "Usa reporte interactivo para exploración y paginado para detalle imprimible.",
    "note": "Report Builder es herramienta externa para Windows; publicar/consumir en Service requiere permisos y licencias aplicables.",
    "examples": [
      {
        "id": "powerbi/informes-paginados/definicion/1",
        "title": "Diseñar listado de pedidos",
        "code": "",
        "steps": [
          "En Power BI Report Builder compatible conecta origen o modelo autorizado.",
          "Crea dataset que devuelva PedidoID, Fecha, Estado y una tabla Tablix.",
          "Previsualiza y exporta a PDF si tienes permiso."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Listado de ocho pedidos si el dataset corresponde al modelo compartido sin filtros; el formato controla saltos de página.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/informes-paginados/parametros-y-diseno-de-impresion",
    "remember": "Comprueba tamaño de página antes de exportar.",
    "examples": [
      {
        "id": "powerbi/informes-paginados/parametros-y-diseno-de-impresion/1",
        "title": "Filtrar listado por estado",
        "code": "",
        "steps": [
          "En Report Builder añade parámetro Estado con valores completed y cancelled.",
          "Vincula a un filtro de dataset o Tablix sobre Estado.",
          "Previsualiza con completed."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Siete filas, una por pedido completado, si se usa el dataset compartido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
