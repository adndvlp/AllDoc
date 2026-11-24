// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/definicion",
    "remember": "El tipo de filtro cambia cuándo se aplica.",
    "examples": [
      {
        "id": "tableau/filtros-y-ordenamiento/definicion/1",
        "title": "Mostrar pedidos completados",
        "code": "",
        "steps": [
          "Arrastra Estado a Filters y selecciona Completado",
          "Ventas en Text."
        ],
        "external": true,
        "hint": "",
        "textOutput": "1700.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/filtros-de-dimension",
    "remember": "Un filtro de dimensión actúa sobre miembros antes de agregados de medida.",
    "examples": [
      {
        "id": "tableau/filtros-y-ordenamiento/filtros-de-dimension/1",
        "title": "Filtrar zona",
        "code": "",
        "steps": [
          "Region en Filters > Norte",
          "Ventas en Text."
        ],
        "external": true,
        "hint": "",
        "textOutput": "700.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/filtros-de-medida",
    "remember": "Filtrar SUM(Ventas) no es filtrar cada fila de Ventas.",
    "examples": [
      {
        "id": "tableau/filtros-y-ordenamiento/filtros-de-medida/1",
        "title": "Filtrar regiones por total",
        "code": "",
        "steps": [
          "Region en Rows, SUM(Ventas) en Text",
          "agrega Ventas a Filters como SUM y fija mínimo 800."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Solo Sur 1050.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/filtros-de-fecha",
    "remember": "Un filtro relativo usa una fecha de referencia que puede cambiar.",
    "examples": [
      {
        "id": "tableau/filtros-y-ordenamiento/filtros-de-fecha/1",
        "title": "Seleccionar febrero y marzo",
        "code": "",
        "steps": [
          "Fecha en Filters > Range of dates",
          "2025-02-01 a 2025-03-31."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ventas 1150.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/top-n-y-contexto",
    "remember": "Añade Region al contexto para obtener un top dentro de esa región.",
    "examples": [
      {
        "id": "tableau/filtros-y-ordenamiento/top-n-y-contexto/1",
        "title": "Producto líder en Norte",
        "code": "",
        "steps": [
          "Filtra Region Norte y Add to Context",
          "Producto > Filters > Top > Top 1 by SUM(Ventas)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Teclado 400; sin contexto el top global podría excluirlo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/filtros-de-fuente-y-extract",
    "remember": "No equivalen a ocultar marcas en una hoja.",
    "examples": [
      {
        "id": "tableau/filtros-y-ordenamiento/filtros-de-fuente-y-extract/1",
        "title": "Crear fuente completada",
        "code": "",
        "external": true,
        "hint": "En una copia de la fuente añade Data Source Filter Estado Completado.",
        "textOutput": "Todas sus hojas muestran como máximo 1700 en ventas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/show-filter-y-alcance",
    "remember": "Comprueba a qué hojas afecta el control.",
    "examples": [
      {
        "id": "tableau/filtros-y-ordenamiento/show-filter-y-alcance/1",
        "title": "Compartir selector regional",
        "code": "",
        "steps": [
          "Crea dos hojas de ventas",
          "muestra Region con Show Filter y Apply to Worksheets > All Using This Data Source."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Norte reduce ambas hojas a datos de esa región.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/ordenamiento",
    "remember": "Ordenar no elimina registros.",
    "examples": [
      {
        "id": "tableau/filtros-y-ordenamiento/ordenamiento/1",
        "title": "Ordenar productos",
        "code": "",
        "steps": [
          "Producto en Rows, SUM(Ventas) en Columns",
          "Sort descendente por SUM(Ventas)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Silla 900, Teclado 400, Lampara 300, Mouse 150.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
