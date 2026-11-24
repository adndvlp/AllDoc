// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/graficos-con-varias-medidas/definicion",
    "remember": "No compares escalas distintas como si fueran iguales.",
    "examples": [
      {
        "id": "tableau/graficos-con-varias-medidas/definicion/1",
        "title": "Mostrar ventas y costo",
        "code": "",
        "steps": [
          "Region en Rows",
          "usa Measure Names en Columns y Measure Values en Text",
          "conserva Ventas y Costo."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dos columnas de medidas por región: Norte 700 y 400; Sur 1050 y 710.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/graficos-con-varias-medidas/combined-axis",
    "remember": "Conviene cuando tienen unidades compatibles.",
    "examples": [
      {
        "id": "tableau/graficos-con-varias-medidas/combined-axis/1",
        "title": "Comparar ventas y costo por mes",
        "code": "",
        "steps": [
          "Mes venta en Columns",
          "arrastra Ventas a Rows y Costo al eje existente",
          "usa Measure Names en Color."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dos series en un eje monetario común.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/graficos-con-varias-medidas/dual-axis-y-sincronizacion",
    "remember": "No sincronices unidades incompatibles solo por estética.",
    "examples": [
      {
        "id": "tableau/graficos-con-varias-medidas/dual-axis-y-sincronizacion/1",
        "title": "Barras y línea",
        "code": "",
        "steps": [
          "Mes venta en Columns, Ventas y Costo en Rows",
          "Dual Axis, Synchronize Axis",
          "Marks de ventas Bar y costo Line."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Barras y línea sobre escala monetaria común, marzo ventas 900 y costo 590.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/graficos-con-varias-medidas/totales-y-subtotales",
    "remember": "El total de un promedio o ratio no es necesariamente la suma de celdas.",
    "examples": [
      {
        "id": "tableau/graficos-con-varias-medidas/totales-y-subtotales/1",
        "title": "Mostrar total regional",
        "code": "",
        "steps": [
          "Region en Rows, Ventas en Text",
          "Analysis > Totals > Show Column Grand Totals."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Total 1750 bajo las dos regiones.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/graficos-con-varias-medidas/kpi-y-formato",
    "remember": "Incluye unidad y periodo.",
    "examples": [
      {
        "id": "tableau/graficos-con-varias-medidas/kpi-y-formato/1",
        "title": "Tarjeta ventas",
        "code": "",
        "steps": [
          "Sin dimensiones, arrastra SUM(Ventas) a Text",
          "aumenta tamaño y titula Ventas totales."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Una cifra 1750 con unidad monetaria.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
