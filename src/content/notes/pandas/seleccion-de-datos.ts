// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/seleccion-de-datos/definicion",
    "remember": "loc = etiqueta; iloc = posición.",
    "examples": [
      {
        "id": "pandas/seleccion-de-datos/definicion/1",
        "title": "Mostrar identificador y monto",
        "code": "pedidos[['pedido_id','monto']].head(3)",
        "hint": "Usa dobles corchetes para una lista de columnas.",
        "textOutput": "   pedido_id  monto\n0        101    100\n1        102    200\n2        103    150",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/seleccion-de-datos/columnas",
    "remember": "Usa dobles corchetes para una lista de columnas.",
    "examples": [
      {
        "id": "pandas/seleccion-de-datos/columnas/1",
        "title": "Mostrar identificador y monto",
        "code": "pedidos[['pedido_id','monto']].head(3)",
        "hint": "Usa dobles corchetes para una lista de columnas.",
        "textOutput": "   pedido_id  monto\n0        101    100\n1        102    200\n2        103    150",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/seleccion-de-datos/loc",
    "remember": "loc[filas, columnas].",
    "examples": [
      {
        "id": "pandas/seleccion-de-datos/loc/1",
        "title": "Elegir las etiquetas 0 a 2",
        "code": "pedidos.loc[0:2, ['pedido_id','monto']]",
        "hint": "loc[filas, columnas].",
        "textOutput": "   pedido_id  monto\n0        101    100\n1        102    200\n2        103    150",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/seleccion-de-datos/iloc",
    "remember": "iloc[0:2] devuelve dos filas.",
    "examples": [
      {
        "id": "pandas/seleccion-de-datos/iloc/1",
        "title": "Elegir las dos primeras filas y columnas",
        "code": "pedidos.iloc[0:2, 0:2]",
        "hint": "iloc[0:2] devuelve dos filas.",
        "textOutput": "   pedido_id  cliente_id\n0        101           1\n1        102           2",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/seleccion-de-datos/at-e-iat",
    "remember": "Para valores escalares, no para rangos.",
    "examples": [
      {
        "id": "pandas/seleccion-de-datos/at-e-iat/1",
        "title": "Consultar un monto puntual",
        "code": "pedidos.at[0,'monto'], pedidos.iat[0,3]",
        "hint": "Para valores escalares, no para rangos.",
        "textOutput": "(100, 100)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
