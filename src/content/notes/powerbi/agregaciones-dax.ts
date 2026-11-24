// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/agregaciones-dax/definicion",
    "remember": "El mismo cálculo cambia según los filtros.",
    "examples": [
      {
        "id": "powerbi/agregaciones-dax/definicion/1",
        "title": "Sumar cantidades",
        "language": "dax",
        "code": "Unidades = SUM(Pedidos[Cantidad])",
        "hint": "",
        "textOutput": "12 unidades incluyendo cancelados; 11 si filtras completed.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/agregaciones-dax/sum-y-average",
    "remember": "AVERAGE(Precio) no equivale a ticket ni a precio ponderado.",
    "note": "Crea medidas independientes.",
    "examples": [
      {
        "id": "powerbi/agregaciones-dax/sum-y-average/1",
        "title": "Comparar precio y cantidad",
        "language": "dax",
        "code": "Precio medio = AVERAGE(Pedidos[Precio])\nUnidades = SUM(Pedidos[Cantidad])",
        "hint": "",
        "textOutput": "Precio medio 98.75; unidades 12.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/agregaciones-dax/min-y-max",
    "remember": "Los extremos también responden a filtros.",
    "examples": [
      {
        "id": "powerbi/agregaciones-dax/min-y-max/1",
        "title": "Obtener extremos de precio",
        "language": "dax",
        "code": "Precio mínimo = MIN(Pedidos[Precio])\nPrecio máximo = MAX(Pedidos[Precio])",
        "hint": "",
        "textOutput": "50 y 150 sin filtros.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/agregaciones-dax/count-counta-y-countrows",
    "remember": "Para contar pedidos usa COUNTROWS; para un campo nullable comprueba blancos.",
    "examples": [
      {
        "id": "powerbi/agregaciones-dax/count-counta-y-countrows/1",
        "title": "Contar pedidos enviados",
        "language": "dax",
        "code": "Enviados = COUNT(Pedidos[Envio])\nFilas pedidos = COUNTROWS(Pedidos)",
        "hint": "",
        "textOutput": "7 fechas no blancas; 8 filas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/agregaciones-dax/distinctcount-y-distinctcountnoblank",
    "remember": "No confundas pedidos con compradores distintos.",
    "examples": [
      {
        "id": "powerbi/agregaciones-dax/distinctcount-y-distinctcountnoblank/1",
        "title": "Contar compradores",
        "language": "dax",
        "code": "Compradores = DISTINCTCOUNT(Pedidos[ClienteID])\nPaíses conocidos = DISTINCTCOUNTNOBLANK(Clientes[Pais])",
        "hint": "",
        "textOutput": "3 compradores; 2 países conocidos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/agregaciones-dax/distinct-y-values",
    "remember": "Devuelven tablas, no un escalar.",
    "note": "Nueva tabla; VALUES daría aquí los mismos estados.",
    "examples": [
      {
        "id": "powerbi/agregaciones-dax/distinct-y-values/1",
        "title": "Listar estados únicos",
        "language": "dax",
        "code": "Estados = DISTINCT(Pedidos[Estado])",
        "hint": "",
        "textOutput": "Tabla calculada con completed y cancelled, sin orden garantizado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/agregaciones-dax/median-desviacion-y-percentiles",
    "remember": "La media puede cambiar mucho por valores extremos.",
    "note": "Crea cada medida por separado. STDEV.P mide dispersión si las ocho filas son toda la población; STDEV.S si son una muestra.",
    "examples": [
      {
        "id": "powerbi/agregaciones-dax/median-desviacion-y-percentiles/1",
        "title": "Medir distribución de precios",
        "language": "dax",
        "code": "Precio mediano = MEDIAN(Pedidos[Precio])\nPercentil 75 precio = PERCENTILE.INC(Pedidos[Precio], 0.75)",
        "hint": "",
        "textOutput": "Mediana 100; percentil 75 = 112.5.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
