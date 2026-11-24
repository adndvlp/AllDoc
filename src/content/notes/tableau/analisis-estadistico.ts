// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/analisis-estadistico/definicion",
    "remember": "Un patrón visual no prueba causalidad.",
    "examples": [
      {
        "id": "tableau/analisis-estadistico/definicion/1",
        "title": "Comparar con media",
        "code": "",
        "steps": [
          "Region en Rows y Ventas en Columns",
          "añade Average Line para Table."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Referencia 875.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/analisis-estadistico/reference-lines-y-bands",
    "remember": "Indica si la referencia aplica a tabla, pane o celda.",
    "examples": [
      {
        "id": "tableau/analisis-estadistico/reference-lines-y-bands/1",
        "title": "Añadir objetivo regional fijo",
        "code": "",
        "steps": [
          "Vista de ventas por Region",
          "Analytics > Reference Line, valor constante 800, alcance Table."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Norte queda por debajo y Sur por encima.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/analisis-estadistico/trend-lines",
    "remember": "Revisa observaciones y supuestos, no solo R².",
    "examples": [
      {
        "id": "tableau/analisis-estadistico/trend-lines/1",
        "title": "Explorar costo y ventas",
        "code": "",
        "steps": [
          "SUM(Costo) Columns, SUM(Ventas) Rows, Producto Detail",
          "Analytics > Trend Line > Linear."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Línea ajustada a cuatro puntos; no permite inferir causalidad.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/analisis-estadistico/forecast",
    "remember": "Una serie corta no permite pronósticos fiables.",
    "note": "Los tres meses de ventas.csv no bastan; requiere datos históricos adicionales y vista compatible.",
    "examples": [
      {
        "id": "tableau/analisis-estadistico/forecast/1",
        "title": "Probar pronóstico",
        "code": "",
        "steps": [
          "Usa una serie mensual con al menos 24 meses de datos de prueba, un valor por mes",
          "coloca mes continuo en Columns y ventas en Rows",
          "Analysis > Forecast > Show Forecast."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Aparecen valores proyectados e intervalos si la serie cumple requisitos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/analisis-estadistico/clustering",
    "remember": "Los grupos dependen de variables y escala.",
    "examples": [
      {
        "id": "tableau/analisis-estadistico/clustering/1",
        "title": "Explorar grupos de productos",
        "code": "",
        "steps": [
          "En dispersión de Costo y Ventas por Producto, arrastra Cluster desde Analytics si está disponible",
          "prueba dos clusters."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se asignan colores de cluster a los puntos; el conjunto es demasiado pequeño para conclusiones sólidas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
