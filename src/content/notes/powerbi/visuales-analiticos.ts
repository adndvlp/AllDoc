// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/visuales-analiticos/definicion",
    "remember": "Un patrón visual no demuestra causalidad.",
    "examples": [
      {
        "id": "powerbi/visuales-analiticos/definicion/1",
        "title": "Explorar contribución por categoría",
        "code": "",
        "steps": [
          "Agrega Decomposition Tree, Analizar Ventas, Explicar por Categoria y Nombre.",
          "Expande Categoria."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Raíz 1100; ramas Tecnologia 650 y Muebles 450.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/visuales-analiticos/scatter-y-burbujas",
    "remember": "Incluye una entidad en detalles para evitar un único punto agregado.",
    "examples": [
      {
        "id": "powerbi/visuales-analiticos/scatter-y-burbujas/1",
        "title": "Comparar precio y cantidad por pedido",
        "code": "",
        "steps": [
          "Crea Scatter con Precio en X, Cantidad en Y y PedidoID como detalle o campo Valores no resumido según versión."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ocho entidades; pedidos 7 y 8 pueden solaparse (150,1).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/visuales-analiticos/waterfall",
    "remember": "Útil para explicar variaciones, no sustituye reconciliación.",
    "examples": [
      {
        "id": "powerbi/visuales-analiticos/waterfall/1",
        "title": "Explicar brecha de meta",
        "code": "",
        "steps": [
          "Waterfall con AñoMes y Brecha; filtra enero-febrero 2026, orden cronológico."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Contribuciones -50 y +100; acumulado final +50.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/visuales-analiticos/mapas-y-azure-maps",
    "remember": "Añade país o coordenadas para resolver ciudades ambiguas.",
    "note": "Azure Maps requiere configuración del tenant, conectividad y disponibilidad regional; revisa privacidad de datos enviados al mapa.",
    "examples": [
      {
        "id": "powerbi/visuales-analiticos/mapas-y-azure-maps/1",
        "title": "Mostrar ventas por ciudad",
        "code": "",
        "steps": [
          "Configura Ciudad como categoría Ciudad y Pais como País o región.",
          "Crea Azure Maps con ubicación Ciudad y contexto de país, tamaño Ventas; excluye ciudades vacías."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se representan Ciudad de Mexico 520, Guadalajara 300 y Madrid 280 si el geocodificador reconoce las etiquetas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/visuales-analiticos/key-influencers-y-decomposition-tree",
    "remember": "Una asociación no es causa; una muestra pequeña no soporta inferencias fiables.",
    "examples": [
      {
        "id": "powerbi/visuales-analiticos/key-influencers-y-decomposition-tree/1",
        "title": "Desglosar ventas por país",
        "code": "",
        "steps": [
          "Crea Decomposition Tree de Ventas y explica por Pais y Categoria.",
          "Expande Pais y luego Mexico por Categoria."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Mexico 820; Tecnologia 370 y Muebles 450. Key Influencers requeriría más datos para análisis útil.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/visuales-analiticos/small-multiples",
    "remember": "Usa escalas coherentes para comparar paneles.",
    "examples": [
      {
        "id": "powerbi/visuales-analiticos/small-multiples/1",
        "title": "Comparar tendencia por categoría",
        "code": "",
        "steps": [
          "Gráfico de líneas con AñoMes y Ventas; Categoria en Small multiples; filtra enero-febrero 2026."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Tecnologia 200 y 150; Muebles sin ventas en enero y 450 en febrero.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
