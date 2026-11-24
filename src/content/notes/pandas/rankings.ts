// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/rankings/definicion",
    "remember": "Orden y método de empate son decisiones separadas.",
    "examples": [
      {
        "id": "pandas/rankings/definicion/1",
        "title": "Comparar RANK y DENSE_RANK",
        "code": "s = pd.Series([300,200,200,150])\npd.DataFrame({'monto':s,'rank':s.rank(method='min',ascending=False),'dense':s.rank(method='dense',ascending=False)})",
        "hint": "ascending=False otorga rango 1 al mayor valor.",
        "textOutput": "   monto  rank  dense\n0    300   1.0    1.0\n1    200   2.0    2.0\n2    200   2.0    2.0\n3    150   4.0    3.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/rankings/rank-min-y-dense",
    "remember": "ascending=False otorga rango 1 al mayor valor.",
    "examples": [
      {
        "id": "pandas/rankings/rank-min-y-dense/1",
        "title": "Comparar RANK y DENSE_RANK",
        "code": "s = pd.Series([300,200,200,150])\npd.DataFrame({'monto':s,'rank':s.rank(method='min',ascending=False),'dense':s.rank(method='dense',ascending=False)})",
        "hint": "ascending=False otorga rango 1 al mayor valor.",
        "textOutput": "   monto  rank  dense\n0    300   1.0    1.0\n1    200   2.0    2.0\n2    200   2.0    2.0\n3    150   4.0    3.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/rankings/rank-first-y-average",
    "remember": "Ordena antes para garantizar un desempate reproducible.",
    "examples": [
      {
        "id": "pandas/rankings/rank-first-y-average/1",
        "title": "Comparar reglas de empate",
        "code": "s = pd.Series([300,200,200,150])\npd.DataFrame({'monto':s,'first':s.rank(method='first',ascending=False),'average':s.rank(method='average',ascending=False)})",
        "hint": "Ordena antes para garantizar un desempate reproducible.",
        "textOutput": "   monto  first  average\n0    300    1.0      1.0\n1    200    2.0      2.5\n2    200    3.0      2.5\n3    150    4.0      4.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/rankings/rank-por-grupo",
    "remember": "Equivale a una ventana con PARTITION BY.",
    "examples": [
      {
        "id": "pandas/rankings/rank-por-grupo/1",
        "title": "Rankear monto por cliente",
        "code": "pedidos.assign(rango=pedidos.groupby('cliente_id')['monto'].rank(method='min',ascending=False))[['cliente_id','pedido_id','rango']]",
        "hint": "Equivale a una ventana con PARTITION BY.",
        "textOutput": "   cliente_id  pedido_id  rango\n0           1        101    3.0\n1           2        102    1.0\n2           1        103    1.0\n3           3        104    2.0\n4           2        105    2.0\n5           3        106    1.0\n6           1        107    1.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
