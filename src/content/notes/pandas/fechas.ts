// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/fechas/definicion",
    "remember": "Convierte texto a datetime antes de usar dt.",
    "examples": [
      {
        "id": "pandas/fechas/definicion/1",
        "title": "Extraer año, mes y día de semana",
        "code": "pedidos.assign(anio=pedidos['fecha'].dt.year,mes=pedidos['fecha'].dt.month,dia=pedidos['fecha'].dt.day,dia_semana=pedidos['fecha'].dt.dayofweek)[['pedido_id','anio','mes','dia','dia_semana']].head(3)",
        "hint": "dayofweek empieza en lunes=0.",
        "textOutput": "   pedido_id  anio  mes  dia  dia_semana\n0        101  2026    2    1           6\n1        102  2026    2    1           6\n2        103  2026    2    2           0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/fechas/componentes-dt",
    "remember": "dayofweek empieza en lunes=0.",
    "examples": [
      {
        "id": "pandas/fechas/componentes-dt/1",
        "title": "Extraer año, mes y día de semana",
        "code": "pedidos.assign(anio=pedidos['fecha'].dt.year,mes=pedidos['fecha'].dt.month,dia=pedidos['fecha'].dt.day,dia_semana=pedidos['fecha'].dt.dayofweek)[['pedido_id','anio','mes','dia','dia_semana']].head(3)",
        "hint": "dayofweek empieza en lunes=0.",
        "textOutput": "   pedido_id  anio  mes  dia  dia_semana\n0        101  2026    2    1           6\n1        102  2026    2    1           6\n2        103  2026    2    2           0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/fechas/rangos-de-fechas",
    "remember": "Incluye inicio y excluye el inicio del periodo siguiente.",
    "examples": [
      {
        "id": "pandas/fechas/rangos-de-fechas/1",
        "title": "Seleccionar febrero de 2026",
        "code": "pedidos.loc[(pedidos['fecha']>=pd.Timestamp('2026-02-01')) & (pedidos['fecha']<pd.Timestamp('2026-03-01')),'pedido_id'].tolist()",
        "hint": "Incluye inicio y excluye el inicio del periodo siguiente.",
        "textOutput": "[101, 102, 103, 104, 105]",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/fechas/strftime",
    "remember": "strftime devuelve texto, no datetime.",
    "examples": [
      {
        "id": "pandas/fechas/strftime/1",
        "title": "Etiquetar pedidos por año y mes",
        "code": "pedidos['fecha'].dt.strftime('%Y-%m').tolist()",
        "hint": "strftime devuelve texto, no datetime.",
        "textOutput": "['2026-02', '2026-02', '2026-02', '2026-02', '2026-02', '2026-03', '2026-03']",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/fechas/timedelta-y-diferencias",
    "remember": "No restes cadenas para obtener días.",
    "examples": [
      {
        "id": "pandas/fechas/timedelta-y-diferencias/1",
        "title": "Calcular días desde alta hasta pedido",
        "code": "t = pedidos.merge(clientes[['cliente_id','alta']],on='cliente_id')\nt.assign(dias=(t['fecha']-t['alta']).dt.days)[['pedido_id','dias']].sort_values('pedido_id')",
        "hint": "No restes cadenas para obtener días.",
        "textOutput": "   pedido_id  dias\n0        101    31\n1        102    27\n2        103    32\n3        104    24\n4        105    29\n5        106    50\n6        107    60",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/fechas/dateoffset",
    "remember": "Un mes no siempre tiene 30 días.",
    "examples": [
      {
        "id": "pandas/fechas/dateoffset/1",
        "title": "Calcular renovación mensual",
        "code": "pd.Timestamp('2026-01-31') + pd.DateOffset(months=1)",
        "hint": "Un mes no siempre tiene 30 días.",
        "textOutput": "Timestamp('2026-02-28 00:00:00')",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/fechas/diferencia-en-horas",
    "remember": "dt.days devuelve días enteros, no horas totales.",
    "examples": [
      {
        "id": "pandas/fechas/diferencia-en-horas/1",
        "title": "Medir tiempo entre recepción y entrega",
        "code": "inicio = pd.Timestamp('2026-02-01 08:00')\nfin = pd.Timestamp('2026-02-02 10:30')\n(fin-inicio).total_seconds()/3600",
        "hint": "dt.days devuelve días enteros, no horas totales.",
        "textOutput": "26.5",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
