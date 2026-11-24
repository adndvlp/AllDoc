// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/agrupaciones/definicion",
    "remember": "Equivale conceptualmente a GROUP BY de SQL para agregaciones.",
    "examples": [
      {
        "id": "pandas/agrupaciones/definicion/1",
        "title": "Sumar montos por cliente y estado",
        "code": "pedidos.groupby(['cliente_id','estado'])['monto'].sum().reset_index(name='total')",
        "hint": "Cada combinación de claves forma un grupo.",
        "textOutput": "   cliente_id      estado  total\n0           1   cancelado    150\n1           1  completado    250\n2           2   cancelado     50\n3           2  completado    200\n4           3  completado    500",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agrupaciones/agrupar-por-una-o-varias-columnas",
    "remember": "Cada combinación de claves forma un grupo.",
    "examples": [
      {
        "id": "pandas/agrupaciones/agrupar-por-una-o-varias-columnas/1",
        "title": "Sumar montos por cliente y estado",
        "code": "pedidos.groupby(['cliente_id','estado'])['monto'].sum().reset_index(name='total')",
        "hint": "Cada combinación de claves forma un grupo.",
        "textOutput": "   cliente_id      estado  total\n0           1   cancelado    150\n1           1  completado    250\n2           2   cancelado     50\n3           2  completado    200\n4           3  completado    500",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agrupaciones/agg-con-nombres",
    "remember": "Cada par contiene columna y función.",
    "examples": [
      {
        "id": "pandas/agrupaciones/agg-con-nombres/1",
        "title": "Crear un resumen de clientes",
        "code": "pedidos.groupby('cliente_id',as_index=False).agg(total=('monto','sum'),pedidos=('pedido_id','size'),promedio=('monto','mean')).round(2)",
        "hint": "Cada par contiene columna y función.",
        "textOutput": "   cliente_id  total  pedidos  promedio\n0           1    400        3    133.33\n1           2    250        2    125.00\n2           3    500        2    250.00",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agrupaciones/size-count-y-nunique-por-grupo",
    "remember": "Elige el denominador correcto para la métrica.",
    "examples": [
      {
        "id": "pandas/agrupaciones/size-count-y-nunique-por-grupo/1",
        "title": "Contar canales por estado",
        "code": "pedidos.groupby('estado').agg(filas=('canal','size'),canales_presentes=('canal','count'),canales_distintos=('canal','nunique'))",
        "hint": "Elige el denominador correcto para la métrica.",
        "textOutput": "            filas  canales_presentes  canales_distintos\nestado                                                 \ncancelado       2                  2                  2\ncompletado      5                  4                  2",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agrupaciones/grupos-con-nulos",
    "remember": "No pierdas el grupo de datos desconocidos por accidente.",
    "examples": [
      {
        "id": "pandas/agrupaciones/grupos-con-nulos/1",
        "title": "Incluir canal desconocido",
        "code": "pedidos.groupby('canal',dropna=False)['monto'].sum()",
        "hint": "No pierdas el grupo de datos desconocidos por accidente.",
        "textOutput": "canal\ntienda    250\nweb       600\nNaN       300",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agrupaciones/filter-y-having",
    "remember": "filter devuelve filas originales, no una fila por grupo.",
    "examples": [
      {
        "id": "pandas/agrupaciones/filter-y-having/1",
        "title": "Conservar pedidos de clientes con al menos tres",
        "code": "pedidos.groupby('cliente_id').filter(lambda g: len(g)>=3)[['pedido_id','cliente_id']]",
        "hint": "filter devuelve filas originales, no una fila por grupo.",
        "textOutput": "   pedido_id  cliente_id\n0        101           1\n2        103           1\n6        107           1",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agrupaciones/transform",
    "remember": "transform conserva el número de filas.",
    "examples": [
      {
        "id": "pandas/agrupaciones/transform/1",
        "title": "Añadir total de cada cliente a sus pedidos",
        "code": "pedidos.assign(total_cliente=pedidos.groupby('cliente_id')['monto'].transform('sum'))[['pedido_id','cliente_id','total_cliente']]",
        "hint": "transform conserva el número de filas.",
        "textOutput": "   pedido_id  cliente_id  total_cliente\n0        101           1            400\n1        102           2            250\n2        103           1            400\n3        104           3            500\n4        105           2            250\n5        106           3            500\n6        107           1            400",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agrupaciones/first-last-y-nth",
    "remember": "Para una fila completa usa nth después de ordenar.",
    "examples": [
      {
        "id": "pandas/agrupaciones/first-last-y-nth/1",
        "title": "Obtener el primer pedido de cada cliente",
        "code": "pedidos.sort_values(['fecha','pedido_id']).groupby('cliente_id').nth(0)[['cliente_id','pedido_id','fecha']]",
        "hint": "Para una fila completa usa nth después de ordenar.",
        "textOutput": "   cliente_id  pedido_id      fecha\n0           1        101 2026-02-01\n1           2        102 2026-02-01\n3           3        104 2026-02-03",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agrupaciones/idxmin-e-idxmax",
    "remember": "Con empates eligen la primera ocurrencia.",
    "examples": [
      {
        "id": "pandas/agrupaciones/idxmin-e-idxmax/1",
        "title": "Recuperar el pedido más caro por cliente",
        "code": "idx = pedidos.groupby('cliente_id')['monto'].idxmax()\npedidos.loc[idx,['cliente_id','pedido_id','monto']]",
        "hint": "Con empates eligen la primera ocurrencia.",
        "textOutput": "   cliente_id  pedido_id  monto\n2           1        103    150\n1           2        102    200\n5           3        106    300",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agrupaciones/groupby-apply",
    "remember": "La salida puede cambiar de forma según la función.",
    "note": "En pandas 2.2 se desaconseja incluir las columnas de agrupación dentro de DataFrameGroupBy.apply; selecciona las columnas necesarias o usa include_groups=False donde corresponda.",
    "examples": [
      {
        "id": "pandas/agrupaciones/groupby-apply/1",
        "title": "Calcular amplitud de montos por cliente",
        "code": "pedidos.groupby('cliente_id')['monto'].apply(lambda s: s.max()-s.min())",
        "hint": "La salida puede cambiar de forma según la función.",
        "textOutput": "cliente_id\n1     50\n2    150\n3    100",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agrupaciones/filtrar-una-tabla-agregada",
    "remember": "Primero calcula la métrica; después filtra el resumen.",
    "examples": [
      {
        "id": "pandas/agrupaciones/filtrar-una-tabla-agregada/1",
        "title": "Mostrar clientes con gasto total superior a 400",
        "code": "t = pedidos.groupby('cliente_id',as_index=False)['monto'].sum()\nt.loc[t['monto']>400]",
        "hint": "Primero calcula la métrica; después filtra el resumen.",
        "textOutput": "   cliente_id  monto\n2           3    500",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agrupaciones/first-y-last",
    "remember": "Pueden seleccionar valores de distintas filas; usa nth si necesitas una fila completa.",
    "examples": [
      {
        "id": "pandas/agrupaciones/first-y-last/1",
        "title": "Comparar primer y último monto por cliente",
        "code": "pedidos.sort_values(['fecha','pedido_id']).groupby('cliente_id')['monto'].agg(['first','last'])",
        "hint": "Pueden seleccionar valores de distintas filas; usa nth si necesitas una fila completa.",
        "textOutput": "            first  last\ncliente_id             \n1             100   150\n2             200    50\n3             200   300",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
