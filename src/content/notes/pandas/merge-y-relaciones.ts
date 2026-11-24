// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/merge-y-relaciones/definicion",
    "remember": "La cardinalidad de las claves determina cuántas filas resultan.",
    "examples": [
      {
        "id": "pandas/merge-y-relaciones/definicion/1",
        "title": "Traer nombres a pedidos",
        "code": "pedidos.merge(clientes[['cliente_id','nombre']],on='cliente_id',how='inner')[['pedido_id','nombre']]",
        "hint": "Una fila puede coincidir con varias del otro lado.",
        "textOutput": "   pedido_id nombre\n0        101    Ana\n1        102   Luis\n2        103    Ana\n3        104  Marta\n4        105   Luis\n5        106  Marta\n6        107    Ana",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/merge-y-relaciones/inner-y-on",
    "remember": "Una fila puede coincidir con varias del otro lado.",
    "examples": [
      {
        "id": "pandas/merge-y-relaciones/inner-y-on/1",
        "title": "Traer nombres a pedidos",
        "code": "pedidos.merge(clientes[['cliente_id','nombre']],on='cliente_id',how='inner')[['pedido_id','nombre']]",
        "hint": "Una fila puede coincidir con varias del otro lado.",
        "textOutput": "   pedido_id nombre\n0        101    Ana\n1        102   Luis\n2        103    Ana\n3        104  Marta\n4        105   Luis\n5        106  Marta\n6        107    Ana",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/merge-y-relaciones/left-y-right",
    "remember": "Los campos del lado sin coincidencia quedan nulos.",
    "examples": [
      {
        "id": "pandas/merge-y-relaciones/left-y-right/1",
        "title": "Mostrar clientes con o sin pedido",
        "code": "clientes[['cliente_id','nombre']].merge(pedidos[['cliente_id','pedido_id']],on='cliente_id',how='left',sort=False)",
        "hint": "Los campos del lado sin coincidencia quedan nulos.",
        "textOutput": "   cliente_id nombre  pedido_id\n0           1    Ana      101.0\n1           1    Ana      103.0\n2           1    Ana      107.0\n3           2   Luis      102.0\n4           2   Luis      105.0\n5           3  Marta      104.0\n6           3  Marta      106.0\n7           4  Pedro        NaN\n8           5    Eva        NaN",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/merge-y-relaciones/outer-y-cross",
    "remember": "Un producto cartesiano multiplica el número de filas.",
    "examples": [
      {
        "id": "pandas/merge-y-relaciones/outer-y-cross/1",
        "title": "Combinar todos los canales y países",
        "code": "pd.DataFrame({'canal':['web','tienda']}).merge(pd.DataFrame({'pais':['MX','ES']}),how='cross')",
        "hint": "Un producto cartesiano multiplica el número de filas.",
        "textOutput": "    canal pais\n0     web   MX\n1     web   ES\n2  tienda   MX\n3  tienda   ES",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/merge-y-relaciones/left-on-right-on-y-suffixes",
    "remember": "Indica las claves explícitamente para evitar uniones accidentales.",
    "examples": [
      {
        "id": "pandas/merge-y-relaciones/left-on-right-on-y-suffixes/1",
        "title": "Unir claves con nombres distintos",
        "code": "c = clientes[['cliente_id','nombre']].rename(columns={'cliente_id':'id'})\npedidos[['pedido_id','cliente_id']].merge(c,left_on='cliente_id',right_on='id').head(3)",
        "hint": "Indica las claves explícitamente para evitar uniones accidentales.",
        "textOutput": "   pedido_id  cliente_id  id nombre\n0        101           1   1    Ana\n1        102           2   2   Luis\n2        103           1   1    Ana",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/merge-y-relaciones/validate-y-cardinalidad",
    "remember": "Una unión m:m puede multiplicar importes sin que sea un error de sintaxis.",
    "examples": [
      {
        "id": "pandas/merge-y-relaciones/validate-y-cardinalidad/1",
        "title": "Validar muchos pedidos para un cliente",
        "code": "pedidos.merge(clientes,on='cliente_id',validate='many_to_one').shape",
        "hint": "Una unión m:m puede multiplicar importes sin que sea un error de sintaxis.",
        "textOutput": "(7, 9)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/merge-y-relaciones/indicator-y-anti-join",
    "remember": "left_only identifica filas exclusivas de la izquierda.",
    "examples": [
      {
        "id": "pandas/merge-y-relaciones/indicator-y-anti-join/1",
        "title": "Detectar clientes sin pedidos",
        "code": "t = clientes[['cliente_id','nombre']].merge(pedidos[['cliente_id']].drop_duplicates(),on='cliente_id',how='left',indicator=True)\nt.loc[t['_merge']=='left_only',['cliente_id','nombre']]",
        "hint": "left_only identifica filas exclusivas de la izquierda.",
        "textOutput": "   cliente_id nombre\n3           4  Pedro\n4           5    Eva",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/merge-y-relaciones/claves-nulas-en-merge",
    "remember": "Filtra claves nulas antes de unir si no representan una relación válida.",
    "examples": [
      {
        "id": "pandas/merge-y-relaciones/claves-nulas-en-merge/1",
        "title": "Observar coincidencia de dos claves ausentes",
        "code": "pd.DataFrame({'id':[1,None]}).merge(pd.DataFrame({'id':[None,2]}),on='id')",
        "hint": "Filtra claves nulas antes de unir si no representan una relación válida.",
        "textOutput": "   id\n0 NaN",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/merge-y-relaciones/union-de-varias-tablas",
    "remember": "Comprueba el nivel de detalle antes de sumar.",
    "examples": [
      {
        "id": "pandas/merge-y-relaciones/union-de-varias-tablas/1",
        "title": "Obtener ingreso por categoría",
        "code": "t = detalle.merge(pedidos[['pedido_id','estado']],on='pedido_id',validate='many_to_one').merge(productos[['producto_id','categoria']],on='producto_id',validate='many_to_one')\nt = t[t['estado']=='completado'].assign(ingreso=lambda x:x['cantidad']*x['precio_unitario'])\nt.groupby('categoria')['ingreso'].sum()",
        "hint": "Comprueba el nivel de detalle antes de sumar.",
        "textOutput": "categoria\nTec    950",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/merge-y-relaciones/right-join",
    "remember": "Equivale a invertir los objetos de un left merge.",
    "examples": [
      {
        "id": "pandas/merge-y-relaciones/right-join/1",
        "title": "Conservar todos los clientes del lado derecho",
        "code": "pedidos[['cliente_id','pedido_id']].merge(clientes[['cliente_id','nombre']],on='cliente_id',how='right')",
        "hint": "Equivale a invertir los objetos de un left merge.",
        "textOutput": "   cliente_id  pedido_id nombre\n0           1      101.0    Ana\n1           1      103.0    Ana\n2           1      107.0    Ana\n3           2      102.0   Luis\n4           2      105.0   Luis\n5           3      104.0  Marta\n6           3      106.0  Marta\n7           4        NaN  Pedro\n8           5        NaN    Eva",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/merge-y-relaciones/full-outer-join",
    "remember": "No elimina claves exclusivas de un origen.",
    "examples": [
      {
        "id": "pandas/merge-y-relaciones/full-outer-join/1",
        "title": "Comparar catálogos de dos fuentes",
        "code": "a = pd.DataFrame({'id':[1,2],'precio':[10,20]})\nb = pd.DataFrame({'id':[2,3],'stock':[5,8]})\na.merge(b,on='id',how='outer',indicator=True)",
        "hint": "No elimina claves exclusivas de un origen.",
        "textOutput": "   id  precio  stock      _merge\n0   1    10.0    NaN   left_only\n1   2    20.0    5.0        both\n2   3     NaN    8.0  right_only",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/merge-y-relaciones/sufijos-y-columnas-homonimas",
    "remember": "Elige nombres que identifiquen su fuente.",
    "examples": [
      {
        "id": "pandas/merge-y-relaciones/sufijos-y-columnas-homonimas/1",
        "title": "Comparar precios históricos y actuales",
        "code": "a = pd.DataFrame({'id':[1,2],'precio':[10,20]})\nb = pd.DataFrame({'id':[1,2],'precio':[12,18]})\na.merge(b,on='id',suffixes=('_anterior','_actual'))",
        "hint": "Elige nombres que identifiquen su fuente.",
        "textOutput": "   id  precio_anterior  precio_actual\n0   1               10             12\n1   2               20             18",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
