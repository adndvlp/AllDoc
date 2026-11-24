// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/acumulados-y-secuencias/definicion",
    "remember": "Ordena primero cuando el cálculo tenga sentido cronológico.",
    "examples": [
      {
        "id": "pandas/acumulados-y-secuencias/definicion/1",
        "title": "Acumular pedidos completados",
        "code": "t = pedidos.query(\"estado == 'completado'\").sort_values(['fecha','pedido_id'])\nt.assign(acumulado=t['monto'].cumsum())[['pedido_id','monto','acumulado']]",
        "hint": "No ordena automáticamente las filas.",
        "textOutput": "   pedido_id  monto  acumulado\n0        101    100        100\n1        102    200        300\n3        104    200        500\n5        106    300        800\n6        107    150        950",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/acumulados-y-secuencias/cumsum",
    "remember": "No ordena automáticamente las filas.",
    "examples": [
      {
        "id": "pandas/acumulados-y-secuencias/cumsum/1",
        "title": "Acumular pedidos completados",
        "code": "t = pedidos.query(\"estado == 'completado'\").sort_values(['fecha','pedido_id'])\nt.assign(acumulado=t['monto'].cumsum())[['pedido_id','monto','acumulado']]",
        "hint": "No ordena automáticamente las filas.",
        "textOutput": "   pedido_id  monto  acumulado\n0        101    100        100\n1        102    200        300\n3        104    200        500\n5        106    300        800\n6        107    150        950",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/acumulados-y-secuencias/cumcount",
    "remember": "Suma uno para imitar ROW_NUMBER de SQL.",
    "examples": [
      {
        "id": "pandas/acumulados-y-secuencias/cumcount/1",
        "title": "Numerar pedidos por cliente",
        "code": "t = pedidos.sort_values(['fecha','pedido_id'])\nt.assign(numero=t.groupby('cliente_id').cumcount()+1)[['cliente_id','pedido_id','numero']]",
        "hint": "Suma uno para imitar ROW_NUMBER de SQL.",
        "textOutput": "   cliente_id  pedido_id  numero\n0           1        101       1\n1           2        102       1\n2           1        103       2\n3           3        104       1\n4           2        105       2\n5           3        106       2\n6           1        107       3",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/acumulados-y-secuencias/cummin-y-cummax",
    "remember": "No equivalen al mínimo o máximo de toda la serie.",
    "examples": [
      {
        "id": "pandas/acumulados-y-secuencias/cummin-y-cummax/1",
        "title": "Registrar récords diarios",
        "code": "pd.DataFrame({'ventas':diario,'minimo':diario.cummin(),'maximo':diario.cummax()})",
        "hint": "No equivalen al mínimo o máximo de toda la serie.",
        "textOutput": "            ventas  minimo  maximo\n2026-02-01     100     100     100\n2026-02-02     200     100     200\n2026-02-03      50      50     200\n2026-02-04     150      50     200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/acumulados-y-secuencias/cumprod",
    "remember": "Para acumular rendimientos, multiplica factores 1+tasa.",
    "examples": [
      {
        "id": "pandas/acumulados-y-secuencias/cumprod/1",
        "title": "Calcular crecimiento compuesto",
        "code": "(1+pd.Series([0.1,-0.1,0.2])).cumprod().round(3)",
        "hint": "Para acumular rendimientos, multiplica factores 1+tasa.",
        "textOutput": "0    1.100\n1    0.990\n2    1.188",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/acumulados-y-secuencias/acumulado-por-grupo",
    "remember": "Ordena por fecha y desempate antes de acumular.",
    "examples": [
      {
        "id": "pandas/acumulados-y-secuencias/acumulado-por-grupo/1",
        "title": "Acumular gasto por cliente",
        "code": "t = pedidos.sort_values(['fecha','pedido_id'])\nt.assign(acumulado=t.groupby('cliente_id')['monto'].cumsum())[['cliente_id','pedido_id','acumulado']]",
        "hint": "Ordena por fecha y desempate antes de acumular.",
        "textOutput": "   cliente_id  pedido_id  acumulado\n0           1        101        100\n1           2        102        200\n2           1        103        250\n3           3        104        200\n4           2        105        250\n5           3        106        500\n6           1        107        400",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
