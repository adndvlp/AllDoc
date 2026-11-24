// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/ordenamiento-y-limites/definicion",
    "remember": "Ordenar no modifica el original salvo que se solicite.",
    "examples": [
      {
        "id": "pandas/ordenamiento-y-limites/definicion/1",
        "title": "Ordenar montos con desempate",
        "code": "pedidos.sort_values(['monto','pedido_id'], ascending=[False,True])[['pedido_id','monto']]",
        "hint": "ascending=False ordena de mayor a menor.",
        "textOutput": "   pedido_id  monto\n5        106    300\n1        102    200\n3        104    200\n2        103    150\n6        107    150\n0        101    100\n4        105     50",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/ordenamiento-y-limites/sort-values",
    "remember": "ascending=False ordena de mayor a menor.",
    "examples": [
      {
        "id": "pandas/ordenamiento-y-limites/sort-values/1",
        "title": "Ordenar montos con desempate",
        "code": "pedidos.sort_values(['monto','pedido_id'], ascending=[False,True])[['pedido_id','monto']]",
        "hint": "ascending=False ordena de mayor a menor.",
        "textOutput": "   pedido_id  monto\n5        106    300\n1        102    200\n3        104    200\n2        103    150\n6        107    150\n0        101    100\n4        105     50",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/ordenamiento-y-limites/sort-index",
    "remember": "El índice no tiene por qué coincidir con una columna de negocio.",
    "examples": [
      {
        "id": "pandas/ordenamiento-y-limites/sort-index/1",
        "title": "Ordenar etiquetas de forma descendente",
        "code": "serie.sort_index(ascending=False)",
        "hint": "El índice no tiene por qué coincidir con una columna de negocio.",
        "textOutput": "d    300.0\nc    200.0\nb      NaN\na    100.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/ordenamiento-y-limites/nlargest-y-nsmallest",
    "remember": "keep controla qué ocurre con los empates.",
    "examples": [
      {
        "id": "pandas/ordenamiento-y-limites/nlargest-y-nsmallest/1",
        "title": "Obtener los dos pedidos más caros",
        "code": "pedidos.nlargest(2,'monto',keep='first')[['pedido_id','monto']]",
        "hint": "keep controla qué ocurre con los empates.",
        "textOutput": "   pedido_id  monto\n5        106    300\n1        102    200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/ordenamiento-y-limites/head-tail-y-paginacion",
    "remember": "Ordena antes de pedir un top.",
    "examples": [
      {
        "id": "pandas/ordenamiento-y-limites/head-tail-y-paginacion/1",
        "title": "Obtener la segunda página de dos pedidos",
        "code": "pedidos.sort_values('pedido_id').iloc[2:4][['pedido_id','monto']]",
        "hint": "Ordena antes de pedir un top.",
        "textOutput": "   pedido_id  monto\n2        103    150\n3        104    200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/ordenamiento-y-limites/nsmallest",
    "remember": "keep='all' conserva todos los empates del límite.",
    "examples": [
      {
        "id": "pandas/ordenamiento-y-limites/nsmallest/1",
        "title": "Encontrar los dos pedidos más pequeños",
        "code": "pedidos.nsmallest(2,'monto')[['pedido_id','monto']]",
        "hint": "keep='all' conserva todos los empates del límite.",
        "textOutput": "   pedido_id  monto\n4        105     50\n0        101    100",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
