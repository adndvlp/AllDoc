// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/join-y-concat/definicion",
    "remember": "merge relaciona claves; concat agrega bloques.",
    "examples": [
      {
        "id": "pandas/join-y-concat/definicion/1",
        "title": "Añadir país por identificador",
        "code": "pedidos[['pedido_id','cliente_id']].join(clientes.set_index('cliente_id')['pais'],on='cliente_id').head(3)",
        "hint": "Asegura que los índices representen las mismas entidades.",
        "textOutput": "   pedido_id  cliente_id pais\n0        101           1   MX\n1        102           2   MX\n2        103           1   MX",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/join-y-concat/join",
    "remember": "Asegura que los índices representen las mismas entidades.",
    "examples": [
      {
        "id": "pandas/join-y-concat/join/1",
        "title": "Añadir país por identificador",
        "code": "pedidos[['pedido_id','cliente_id']].join(clientes.set_index('cliente_id')['pais'],on='cliente_id').head(3)",
        "hint": "Asegura que los índices representen las mismas entidades.",
        "textOutput": "   pedido_id  cliente_id pais\n0        101           1   MX\n1        102           2   MX\n2        103           1   MX",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/join-y-concat/concat-por-filas",
    "remember": "ignore_index=True crea un nuevo índice consecutivo.",
    "examples": [
      {
        "id": "pandas/join-y-concat/concat-por-filas/1",
        "title": "Unir dos lotes de pedidos",
        "code": "pd.concat([pedidos.head(2),pedidos.tail(1)],ignore_index=True)[['pedido_id','monto']]",
        "hint": "ignore_index=True crea un nuevo índice consecutivo.",
        "textOutput": "   pedido_id  monto\n0        101    100\n1        102    200\n2        107    150",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/join-y-concat/concat-por-columnas",
    "remember": "No equivale a unir por posición si los índices difieren.",
    "examples": [
      {
        "id": "pandas/join-y-concat/concat-por-columnas/1",
        "title": "Combinar dos series por etiqueta",
        "code": "pd.concat([pd.Series({'web':100},name='ventas'),pd.Series({'tienda':5,'web':2},name='pedidos')],axis=1)",
        "hint": "No equivale a unir por posición si los índices difieren.",
        "textOutput": "        ventas  pedidos\nweb      100.0        2\ntienda     NaN        5",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/join-y-concat/merge-ordered",
    "remember": "fill_method='ffill' puede propagar valores anteriores; úsalo con sentido de negocio.",
    "examples": [
      {
        "id": "pandas/join-y-concat/merge-ordered/1",
        "title": "Unir ventas y metas por fecha",
        "code": "a = pd.DataFrame({'dia':[1,3],'ventas':[100,300]})\nb = pd.DataFrame({'dia':[2,3],'meta':[150,250]})\npd.merge_ordered(a,b,on='dia')",
        "hint": "fill_method='ffill' puede propagar valores anteriores; úsalo con sentido de negocio.",
        "textOutput": "   dia  ventas   meta\n0    1   100.0    NaN\n1    2     NaN  150.0\n2    3   300.0  250.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/join-y-concat/merge-asof",
    "remember": "Las claves de unión deben estar ordenadas.",
    "examples": [
      {
        "id": "pandas/join-y-concat/merge-asof/1",
        "title": "Asignar el precio vigente a una venta",
        "code": "a = pd.DataFrame({'dia':[2,4],'venta':[100,200]})\nb = pd.DataFrame({'dia':[1,3],'tarifa':[10,12]})\npd.merge_asof(a,b,on='dia',direction='backward')",
        "hint": "Las claves de unión deben estar ordenadas.",
        "textOutput": "   dia  venta  tarifa\n0    2    100      10\n1    4    200      12",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
