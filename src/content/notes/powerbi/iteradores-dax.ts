// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/iteradores-dax/definicion",
    "remember": "SUM suma una columna; SUMX calcula una expresión por fila.",
    "examples": [
      {
        "id": "powerbi/iteradores-dax/definicion/1",
        "title": "Calcular importe sin columna auxiliar",
        "language": "dax",
        "code": "Importe = SUMX(Pedidos, Pedidos[Cantidad] * Pedidos[Precio])",
        "hint": "",
        "textOutput": "1150 sin filtros.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/iteradores-dax/sumx",
    "remember": "Multiplica por fila antes de sumar.",
    "examples": [
      {
        "id": "powerbi/iteradores-dax/sumx/1",
        "title": "Calcular ventas de líneas",
        "language": "dax",
        "code": "Importe alternativo = SUMX(Pedidos, Pedidos[Cantidad] * Pedidos[Precio])",
        "hint": "",
        "textOutput": "1150; no equivale a SUM(Cantidad)*SUM(Precio).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/iteradores-dax/averagex",
    "remember": "Define la tabla que representa las unidades del promedio.",
    "examples": [
      {
        "id": "powerbi/iteradores-dax/averagex/1",
        "title": "Promedio por pedido incluyendo cancelados",
        "language": "dax",
        "code": "Importe medio = AVERAGEX(Pedidos, Pedidos[Cantidad]*Pedidos[Precio])",
        "hint": "",
        "textOutput": "143.75.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/iteradores-dax/minx-maxx-y-countx",
    "remember": "Elige la función X cuando no existe una columna directa.",
    "note": "Crea las medidas por separado; COUNTX(Pedidos, Pedidos[Envio]) devolvería 7.",
    "examples": [
      {
        "id": "powerbi/iteradores-dax/minx-maxx-y-countx/1",
        "title": "Obtener importes extremos",
        "language": "dax",
        "code": "Menor importe = MINX(Pedidos, Pedidos[Cantidad]*Pedidos[Precio])\nMayor importe = MAXX(Pedidos, Pedidos[Cantidad]*Pedidos[Precio])",
        "hint": "",
        "textOutput": "50 y 300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
