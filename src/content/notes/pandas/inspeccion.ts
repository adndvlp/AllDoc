// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/inspeccion/definicion",
    "remember": "Inspecciona antes de filtrar o convertir.",
    "examples": [
      {
        "id": "pandas/inspeccion/definicion/1",
        "title": "Ver los primeros dos pedidos",
        "code": "pedidos.head(2)",
        "hint": "head = inicio; tail = final.",
        "textOutput": "   pedido_id  cliente_id      fecha  monto      estado   canal\n0        101           1 2026-02-01    100  completado     web\n1        102           2 2026-02-01    200  completado  tienda",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/inspeccion/head-y-tail",
    "remember": "head = inicio; tail = final.",
    "examples": [
      {
        "id": "pandas/inspeccion/head-y-tail/1",
        "title": "Ver los primeros dos pedidos",
        "code": "pedidos.head(2)",
        "hint": "head = inicio; tail = final.",
        "textOutput": "   pedido_id  cliente_id      fecha  monto      estado   canal\n0        101           1 2026-02-01    100  completado     web\n1        102           2 2026-02-01    200  completado  tienda",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/inspeccion/sample",
    "remember": "Una muestra no garantiza representar todos los grupos.",
    "examples": [
      {
        "id": "pandas/inspeccion/sample/1",
        "title": "Tomar dos pedidos reproducibles",
        "code": "pedidos.sample(n=2, random_state=42)",
        "hint": "Una muestra no garantiza representar todos los grupos.",
        "textOutput": "   pedido_id  cliente_id      fecha  monto      estado   canal\n0        101           1 2026-02-01    100  completado     web\n1        102           2 2026-02-01    200  completado  tienda",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/inspeccion/shape-size-y-len",
    "remember": "No confundas celdas con registros.",
    "examples": [
      {
        "id": "pandas/inspeccion/shape-size-y-len/1",
        "title": "Contar dimensiones",
        "code": "pedidos.shape, pedidos.size, len(pedidos)",
        "hint": "No confundas celdas con registros.",
        "textOutput": "((7, 6), 42, 7)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/inspeccion/columns-y-dtypes",
    "remember": "Un número guardado como texto no se suma como número.",
    "examples": [
      {
        "id": "pandas/inspeccion/columns-y-dtypes/1",
        "title": "Revisar esquema",
        "code": "leads.dtypes.astype(str)",
        "hint": "Un número guardado como texto no se suma como número.",
        "textOutput": "lead_id           int64\nemail            object\nimporte_texto    object\nnombre_raw       object",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/inspeccion/info",
    "remember": "info() imprime y devuelve None.",
    "examples": [
      {
        "id": "pandas/inspeccion/info/1",
        "title": "Examinar calidad inicial",
        "code": "clientes.info(memory_usage=False)",
        "hint": "info() imprime y devuelve None.",
        "textOutput": "<class 'pandas.core.frame.DataFrame'>\nRangeIndex: 5 entries, 0 to 4\nData columns (total 4 columns):\n #   Column      Non-Null Count  Dtype         \n---  ------      --------------  -----         \n 0   cliente_id  5 non-null      int64         \n 1   nombre      5 non-null      object        \n 2   pais        4 non-null      object        \n 3   alta        5 non-null      datetime64[ns]\ndtypes: datetime64[ns](1), int64(1), object(2)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/inspeccion/describe",
    "remember": "count excluye nulos.",
    "examples": [
      {
        "id": "pandas/inspeccion/describe/1",
        "title": "Resumir montos",
        "code": "pedidos['monto'].describe().round(2)",
        "hint": "count excluye nulos.",
        "textOutput": "count      7.00\nmean     164.29\nstd       80.18\nmin       50.00\n25%      125.00\n50%      150.00\n75%      200.00\nmax      300.00",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/inspeccion/ultimas-filas",
    "remember": "No significa necesariamente las más recientes si la tabla no está ordenada por fecha.",
    "examples": [
      {
        "id": "pandas/inspeccion/ultimas-filas/1",
        "title": "Ver los dos últimos pedidos",
        "code": "pedidos.tail(2)[['pedido_id','monto']]",
        "hint": "No significa necesariamente las más recientes si la tabla no está ordenada por fecha.",
        "textOutput": "   pedido_id  monto\n5        106    300\n6        107    150",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
