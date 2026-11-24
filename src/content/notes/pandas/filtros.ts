// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/filtros/definicion",
    "remember": "La máscara tiene un True o False por fila.",
    "examples": [
      {
        "id": "pandas/filtros/definicion/1",
        "title": "Seleccionar pedidos de más de 200",
        "code": "pedidos.loc[pedidos['monto'] > 200, ['pedido_id','monto']]",
        "hint": "En Python igualdad se escribe ==, no =.",
        "textOutput": "   pedido_id  monto\n5        106    300",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/filtros/comparaciones",
    "remember": "En Python igualdad se escribe ==, no =.",
    "examples": [
      {
        "id": "pandas/filtros/comparaciones/1",
        "title": "Seleccionar pedidos de más de 200",
        "code": "pedidos.loc[pedidos['monto'] > 200, ['pedido_id','monto']]",
        "hint": "En Python igualdad se escribe ==, no =.",
        "textOutput": "   pedido_id  monto\n5        106    300",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/filtros/and-or-y-not",
    "remember": "and y or de Python no combinan Series elemento por elemento.",
    "examples": [
      {
        "id": "pandas/filtros/and-or-y-not/1",
        "title": "Filtrar ventas grandes o canceladas",
        "code": "pedidos.loc[((pedidos['monto'] >= 200) & (pedidos['estado'] == 'completado')) | (pedidos['estado'] == 'cancelado'), ['pedido_id','monto','estado']]",
        "hint": "and y or de Python no combinan Series elemento por elemento.",
        "textOutput": "   pedido_id  monto      estado\n1        102    200  completado\n2        103    150   cancelado\n3        104    200  completado\n4        105     50   cancelado\n5        106    300  completado",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/filtros/negar-una-condicion",
    "remember": "No completar una condición no implica que un dato faltante sea un valor conocido.",
    "examples": [
      {
        "id": "pandas/filtros/negar-una-condicion/1",
        "title": "Excluir pedidos cancelados",
        "code": "pedidos.loc[~(pedidos['estado'] == 'cancelado'), 'pedido_id'].tolist()",
        "hint": "No completar una condición no implica que un dato faltante sea un valor conocido.",
        "textOutput": "[101, 102, 104, 106, 107]",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/filtros/isin",
    "remember": "Equivale a IN de SQL para valores no nulos.",
    "examples": [
      {
        "id": "pandas/filtros/isin/1",
        "title": "Seleccionar pedidos de dos clientes",
        "code": "pedidos.loc[pedidos['cliente_id'].isin([1,3]), 'pedido_id'].tolist()",
        "hint": "Equivale a IN de SQL para valores no nulos.",
        "textOutput": "[101, 103, 104, 106, 107]",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/filtros/between",
    "remember": "inclusive='both' incluye ambos extremos.",
    "examples": [
      {
        "id": "pandas/filtros/between/1",
        "title": "Filtrar montos entre 100 y 200",
        "code": "pedidos.loc[pedidos['monto'].between(100,200), 'monto'].tolist()",
        "hint": "inclusive='both' incluye ambos extremos.",
        "textOutput": "[100, 200, 150, 200, 150]",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/filtros/query",
    "remember": "No ejecutes expresiones recibidas de usuarios sin validar.",
    "examples": [
      {
        "id": "pandas/filtros/query/1",
        "title": "Aplicar un límite variable",
        "code": "limite = 150\npedidos.query('monto > @limite')[['pedido_id','monto']]",
        "hint": "No ejecutes expresiones recibidas de usuarios sin validar.",
        "textOutput": "   pedido_id  monto\n1        102    200\n3        104    200\n5        106    300",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
