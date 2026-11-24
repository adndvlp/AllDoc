// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/navegacion-y-detalle/definicion",
    "remember": "Drill down cambia nivel; drillthrough abre detalle filtrado.",
    "examples": [
      {
        "id": "powerbi/navegacion-y-detalle/definicion/1",
        "title": "Explorar jerarquía de productos",
        "code": "",
        "steps": [
          "Crea barras con jerarquía Categoria > Producto y Ventas.",
          "Activa drill down y selecciona Tecnologia."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se ven Mouse 220 y Teclado 430.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/navegacion-y-detalle/drill-down-drill-up-y-expandir",
    "remember": "Diferencia navegar rama de expandir todas.",
    "examples": [
      {
        "id": "powerbi/navegacion-y-detalle/drill-down-drill-up-y-expandir/1",
        "title": "Explorar categorías",
        "code": "",
        "steps": [
          "En jerarquía Categoria > Producto, baja a Tecnologia y vuelve arriba."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Detalle 220/430; al volver, categorias 650/450.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/navegacion-y-detalle/drillthrough",
    "remember": "El campo de origen debe corresponder al filtro de drillthrough.",
    "examples": [
      {
        "id": "powerbi/navegacion-y-detalle/drillthrough/1",
        "title": "Abrir detalle de cliente",
        "code": "",
        "steps": [
          "Crea página Detalle con Clientes[ClienteID] en filtros Drillthrough y tabla PedidoID, Fecha, Estado.",
          "En origen usa tabla de clientes con ClienteID y Ventas; clic derecho en cliente 1 > Drillthrough."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Detalle con pedidos 1, 3 y 6 de Ana; botón Atrás permite regresar.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/navegacion-y-detalle/tooltips-y-paginas-de-tooltip",
    "remember": "Incluye información auxiliar, no datos indispensables solo al pasar el cursor.",
    "examples": [
      {
        "id": "powerbi/navegacion-y-detalle/tooltips-y-paginas-de-tooltip/1",
        "title": "Mostrar ticket al pasar",
        "code": "",
        "steps": [
          "Crea página tamaño Tooltip y habilita uso como información sobre herramientas.",
          "Añade tarjeta Ticket.",
          "Asigna esa página al gráfico por Categoria."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Al pasar por Muebles, tooltip muestra ticket 225 (450 / 2).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/navegacion-y-detalle/bookmarks",
    "remember": "Si solo quieres controlar visibilidad, desactiva Datos en marcador.",
    "examples": [
      {
        "id": "powerbi/navegacion-y-detalle/bookmarks/1",
        "title": "Alternar resumen y detalle",
        "code": "",
        "steps": [
          "En panel Selección crea dos grupos de visuales, oculta uno.",
          "Agrega marcador Resumen; invierte visibilidad y agrega Detalle; desactiva Datos en ambos.",
          "Prueba los marcadores."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cambia la visibilidad sin restaurar selección de país.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/navegacion-y-detalle/botones-y-navegacion-de-paginas",
    "remember": "Prueba la acción en modo lectura; en edición puede requerir Ctrl+clic.",
    "examples": [
      {
        "id": "powerbi/navegacion-y-detalle/botones-y-navegacion-de-paginas/1",
        "title": "Crear menú de páginas",
        "code": "",
        "steps": [
          "Inserta Navegador de páginas para Resumen y Detalle.",
          "Prueba Ctrl+clic en Desktop."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La página activa cambia según el botón seleccionado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/navegacion-y-detalle/panel-seleccion-y-capas",
    "remember": "Los nombres claros facilitan mantener marcadores.",
    "examples": [
      {
        "id": "powerbi/navegacion-y-detalle/panel-seleccion-y-capas/1",
        "title": "Agrupar indicadores",
        "code": "",
        "steps": [
          "En panel Selección selecciona tarjetas de resumen y agrúpalas.",
          "Nombra el grupo Indicadores."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El grupo permite ocultar o mostrar ambas tarjetas conjuntamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
