// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/copias-y-asignacion/definicion",
    "remember": "Usa loc para modificar el objeto que realmente quieres cambiar.",
    "examples": [
      {
        "id": "pandas/copias-y-asignacion/definicion/1",
        "title": "Modificar un pedido sin alterar los datos base",
        "code": "t = pedidos.copy()\nt.loc[0,'monto'] = 999\nt.loc[0,'monto'], pedidos.loc[0,'monto']",
        "hint": "deep=True no copia recursivamente objetos Python anidados.",
        "textOutput": "(999, 100)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/copias-y-asignacion/copy",
    "remember": "deep=True no copia recursivamente objetos Python anidados.",
    "examples": [
      {
        "id": "pandas/copias-y-asignacion/copy/1",
        "title": "Modificar un pedido sin alterar los datos base",
        "code": "t = pedidos.copy()\nt.loc[0,'monto'] = 999\nt.loc[0,'monto'], pedidos.loc[0,'monto']",
        "hint": "deep=True no copia recursivamente objetos Python anidados.",
        "textOutput": "(999, 100)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/copias-y-asignacion/asignacion-encadenada",
    "remember": "Haz toda la selección y modificación en una llamada loc.",
    "examples": [
      {
        "id": "pandas/copias-y-asignacion/asignacion-encadenada/1",
        "title": "Actualizar únicamente cancelados en una copia",
        "code": "t = pedidos.copy()\nt.loc[t['estado']=='cancelado','monto'] = 0\nt[['pedido_id','monto']]",
        "hint": "Haz toda la selección y modificación en una llamada loc.",
        "textOutput": "   pedido_id  monto\n0        101    100\n1        102    200\n2        103      0\n3        104    200\n4        105      0\n5        106    300\n6        107    150",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/copias-y-asignacion/copy-on-write",
    "remember": "En pandas 2.2 es configurable; en pandas 3.0 es el comportamiento predeterminado.",
    "note": "En pandas 3.0 no es necesario activar mode.copy_on_write; la asignación encadenada no funciona para modificar el original.",
    "examples": [
      {
        "id": "pandas/copias-y-asignacion/copy-on-write/1",
        "title": "Comprobar aislamiento al modificar una Serie derivada",
        "code": "with pd.option_context('mode.copy_on_write',True):\n    t = pedidos.copy()\n    s = t['monto']\n    s.iloc[0] = 999\n    resultado = (s.iloc[0],t.loc[0,'monto'])\nresultado",
        "hint": "En pandas 2.2 es configurable; en pandas 3.0 es el comportamiento predeterminado.",
        "textOutput": "(999, 100)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
