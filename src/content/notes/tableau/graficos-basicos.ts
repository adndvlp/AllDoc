// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/graficos-basicos/definicion",
    "remember": "Primero define la métrica y la unidad de análisis.",
    "examples": [
      {
        "id": "tableau/graficos-basicos/definicion/1",
        "title": "Comparar regiones",
        "code": "",
        "external": true,
        "hint": "Region en Rows, SUM(Ventas) en Columns, Marks Bar.",
        "textOutput": "Dos barras 700 y 1050.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/graficos-basicos/barras-y-apiladas",
    "remember": "Una barra apilada dificulta comparar segmentos sin base común.",
    "examples": [
      {
        "id": "tableau/graficos-basicos/barras-y-apiladas/1",
        "title": "Ver composición regional",
        "code": "",
        "external": true,
        "hint": "Region en Rows, SUM(Ventas) en Columns, Categoria en Color.",
        "textOutput": "Norte: Tecnologia 500, Hogar 200; Sur: Tecnologia 50, Hogar 1000.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/graficos-basicos/lineas-y-areas",
    "remember": "Usa fechas continuas para una escala temporal.",
    "examples": [
      {
        "id": "tableau/graficos-basicos/lineas-y-areas/1",
        "title": "Ventas mensuales",
        "code": "",
        "external": true,
        "hint": "Mes venta continuo en Columns, SUM(Ventas) en Rows, Marks Line.",
        "textOutput": "600, 250 y 900 de enero a marzo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/graficos-basicos/dispersion",
    "remember": "Añade una dimensión a Detail para obtener varios puntos.",
    "examples": [
      {
        "id": "tableau/graficos-basicos/dispersion/1",
        "title": "Comparar costo y venta",
        "code": "",
        "external": true,
        "hint": "SUM(Costo) en Columns, SUM(Ventas) en Rows y Producto en Detail.",
        "textOutput": "Cuatro puntos: uno por producto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/graficos-basicos/tablas-y-crosstabs",
    "remember": "Úsala cuando importan cifras precisas.",
    "examples": [
      {
        "id": "tableau/graficos-basicos/tablas-y-crosstabs/1",
        "title": "Cruzar región y categoría",
        "code": "",
        "external": true,
        "hint": "Region en Rows, Categoria en Columns, SUM(Ventas) en Text.",
        "textOutput": "Norte: Hogar 200, Tecnologia 500; Sur: Hogar 1000, Tecnologia 50.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/graficos-basicos/heatmap-y-highlight-table",
    "remember": "Usa una escala coherente y no dependas solo del color.",
    "examples": [
      {
        "id": "tableau/graficos-basicos/heatmap-y-highlight-table/1",
        "title": "Resaltar ventas",
        "code": "",
        "steps": [
          "Region en Rows, Categoria en Columns, Marks Square",
          "Ventas en Color y Label."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Sur-Hogar (1000) es la celda de mayor intensidad en escala creciente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/graficos-basicos/treemap-y-pie",
    "remember": "Con muchas categorías las barras son más fáciles de comparar.",
    "examples": [
      {
        "id": "tableau/graficos-basicos/treemap-y-pie/1",
        "title": "Mostrar peso por categoría",
        "code": "",
        "steps": [
          "Categoria en Color, SUM(Ventas) en Size y Label",
          "elige Treemap en Show Me."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Hogar 1200 ocupa más área que Tecnologia 550.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/graficos-basicos/histogramas-y-box-plots",
    "remember": "Define qué representa cada observación antes de calcular distribución.",
    "examples": [
      {
        "id": "tableau/graficos-basicos/histogramas-y-box-plots/1",
        "title": "Histograma de ventas",
        "code": "",
        "external": true,
        "hint": "Crea bins de tamaño 200 y usa bin en Columns y COUNT(Linea) en Rows.",
        "textOutput": "Frecuencias 3, 4 y 1 para intervalos 0, 200 y 600 respectivamente; los intervalos vacíos pueden mostrarse aparte.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
