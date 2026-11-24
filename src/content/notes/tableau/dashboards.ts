// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/dashboards/definicion",
    "remember": "Cada hoja debe aportar una decisión o contexto.",
    "examples": [
      {
        "id": "tableau/dashboards/definicion/1",
        "title": "Crear dashboard de ventas",
        "code": "",
        "steps": [
          "Crea hojas KPI ventas, barras por Region y línea mensual",
          "New Dashboard, arrastra las tres hojas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Una pantalla con 1750, comparación regional y tendencia mensual.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/dashboards/contenedores-y-layout",
    "remember": "Tiled facilita alineación y redimensionamiento.",
    "examples": [
      {
        "id": "tableau/dashboards/contenedores-y-layout/1",
        "title": "Alinear gráficos",
        "code": "",
        "steps": [
          "Añade contenedor vertical",
          "dentro coloca KPI y contenedor horizontal con barras y línea."
        ],
        "external": true,
        "hint": "",
        "textOutput": "KPI arriba, dos gráficos alineados abajo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/dashboards/size-y-dispositivo",
    "remember": "Comprueba que etiquetas y filtros no queden cortados.",
    "examples": [
      {
        "id": "tableau/dashboards/size-y-dispositivo/1",
        "title": "Previsualizar móvil",
        "code": "",
        "external": true,
        "hint": "En dashboard abre Device Preview y revisa o crea Phone layout.",
        "textOutput": "Se puede reorganizar la vista para una pantalla estrecha.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/dashboards/filtros-compartidos",
    "remember": "Comprueba todas las hojas afectadas.",
    "examples": [
      {
        "id": "tableau/dashboards/filtros-compartidos/1",
        "title": "Filtrar dashboard por región",
        "code": "",
        "steps": [
          "Muestra filtro Region en la hoja de barras",
          "Apply to Worksheets > All Using This Data Source."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Al seleccionar Norte, KPI pasa a 700 y la tendencia a 300,200,200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/dashboards/tooltips-y-viz-in-tooltip",
    "remember": "Evita información redundante y hojas pesadas.",
    "note": "No disponible para totales y grand totals desde 2023.3.",
    "examples": [
      {
        "id": "tableau/dashboards/tooltips-y-viz-in-tooltip/1",
        "title": "Ver productos al pasar por región",
        "code": "",
        "steps": [
          "Crea hoja detalle Producto con Ventas y hoja regional",
          "edita Tooltip de la regional e inserta la hoja detalle con filtro de todos los campos."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Al pasar sobre Norte se muestran productos de esa región.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/dashboards/diseno-y-accesibilidad",
    "remember": "No dependas solo del color para distinguir valores.",
    "examples": [
      {
        "id": "tableau/dashboards/diseno-y-accesibilidad/1",
        "title": "Mejorar lectura",
        "code": "",
        "external": true,
        "hint": "Añade títulos con unidad/periodo, etiquetas regionales, contraste suficiente y revisa texto alternativo de la vista cuando esté disponible.",
        "textOutput": "Se distinguen Norte y Sur incluso sin depender de colores.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/dashboards/stories",
    "remember": "Usa secuencia cuando el análisis requiere una narrativa.",
    "examples": [
      {
        "id": "tableau/dashboards/stories/1",
        "title": "Presentar resultados",
        "code": "",
        "steps": [
          "New Story",
          "añade dashboard general y otro punto que destaque marzo."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dos puntos navegables: panorama y detalle de marzo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
