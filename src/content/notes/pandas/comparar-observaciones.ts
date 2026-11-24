// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/comparar-observaciones/definicion",
    "remember": "Ordenar es imprescindible antes de comparar periodos.",
    "examples": [
      {
        "id": "pandas/comparar-observaciones/definicion/1",
        "title": "Ver venta anterior y siguiente",
        "code": "pd.DataFrame({'ventas':diario,'anterior':diario.shift(1),'siguiente':diario.shift(-1)})",
        "hint": "Sin freq desplaza valores, no etiquetas de fechas.",
        "textOutput": "            ventas  anterior  siguiente\n2026-02-01     100       NaN      200.0\n2026-02-02     200     100.0       50.0\n2026-02-03      50     200.0      150.0\n2026-02-04     150      50.0        NaN",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/comparar-observaciones/shift",
    "remember": "Sin freq desplaza valores, no etiquetas de fechas.",
    "examples": [
      {
        "id": "pandas/comparar-observaciones/shift/1",
        "title": "Ver venta anterior y siguiente",
        "code": "pd.DataFrame({'ventas':diario,'anterior':diario.shift(1),'siguiente':diario.shift(-1)})",
        "hint": "Sin freq desplaza valores, no etiquetas de fechas.",
        "textOutput": "            ventas  anterior  siguiente\n2026-02-01     100       NaN      200.0\n2026-02-02     200     100.0       50.0\n2026-02-03      50     200.0      150.0\n2026-02-04     150      50.0        NaN",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/comparar-observaciones/diff",
    "remember": "La primera diferencia carece de observación previa.",
    "examples": [
      {
        "id": "pandas/comparar-observaciones/diff/1",
        "title": "Medir cambio diario",
        "code": "diario.diff()",
        "hint": "La primera diferencia carece de observación previa.",
        "textOutput": "2026-02-01      NaN\n2026-02-02    100.0\n2026-02-03   -150.0\n2026-02-04    100.0\nFreq: D",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/comparar-observaciones/pct-change",
    "remember": "Multiplica por 100; fill_method=None evita rellenar faltantes.",
    "examples": [
      {
        "id": "pandas/comparar-observaciones/pct-change/1",
        "title": "Calcular variación porcentual",
        "code": "(diario.pct_change(fill_method=None)*100).round(2)",
        "hint": "Multiplica por 100; fill_method=None evita rellenar faltantes.",
        "textOutput": "2026-02-01      NaN\n2026-02-02    100.0\n2026-02-03    -75.0\n2026-02-04    200.0\nFreq: D",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/comparar-observaciones/comparaciones-por-grupo",
    "remember": "No compares pedidos de clientes diferentes.",
    "examples": [
      {
        "id": "pandas/comparar-observaciones/comparaciones-por-grupo/1",
        "title": "Obtener monto anterior por cliente",
        "code": "t = pedidos.sort_values(['fecha','pedido_id'])\nt.assign(anterior=t.groupby('cliente_id')['monto'].shift())[['cliente_id','pedido_id','monto','anterior']]",
        "hint": "No compares pedidos de clientes diferentes.",
        "textOutput": "   cliente_id  pedido_id  monto  anterior\n0           1        101    100       NaN\n1           2        102    200       NaN\n2           1        103    150     100.0\n3           3        104    200       NaN\n4           2        105     50     200.0\n5           3        106    300     200.0\n6           1        107    150     150.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
