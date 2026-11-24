// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/condicionales/definicion",
    "remember": "Define condiciones y qué ocurre cuando ninguna se cumple.",
    "examples": [
      {
        "id": "pandas/condicionales/definicion/1",
        "title": "Clasificar pedidos altos y bajos",
        "code": "pedidos.assign(segmento=np.where(pedidos['monto']>=200,'alto','bajo'))[['pedido_id','segmento']]",
        "hint": "Es NumPy; devuelve un arreglo por posición.",
        "textOutput": "   pedido_id segmento\n0        101     bajo\n1        102     alto\n2        103     bajo\n3        104     alto\n4        105     bajo\n5        106     alto\n6        107     bajo",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/condicionales/np-where",
    "remember": "Es NumPy; devuelve un arreglo por posición.",
    "examples": [
      {
        "id": "pandas/condicionales/np-where/1",
        "title": "Clasificar pedidos altos y bajos",
        "code": "pedidos.assign(segmento=np.where(pedidos['monto']>=200,'alto','bajo'))[['pedido_id','segmento']]",
        "hint": "Es NumPy; devuelve un arreglo por posición.",
        "textOutput": "   pedido_id segmento\n0        101     bajo\n1        102     alto\n2        103     bajo\n3        104     alto\n4        105     bajo\n5        106     alto\n6        107     bajo",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/condicionales/np-select",
    "remember": "Coloca los umbrales más restrictivos primero.",
    "examples": [
      {
        "id": "pandas/condicionales/np-select/1",
        "title": "Crear tres segmentos de importe",
        "code": "condiciones = [pedidos['monto']>=200,pedidos['monto']>=100]\npedidos.assign(segmento=np.select(condiciones,['alto','medio'],default='bajo'))[['pedido_id','segmento']]",
        "hint": "Coloca los umbrales más restrictivos primero.",
        "textOutput": "   pedido_id segmento\n0        101    medio\n1        102     alto\n2        103    medio\n3        104     alto\n4        105     bajo\n5        106     alto\n6        107    medio",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/condicionales/where-y-mask",
    "remember": "where y mask son operaciones inversas para una misma condición.",
    "examples": [
      {
        "id": "pandas/condicionales/where-y-mask/1",
        "title": "Poner a cero los importes cancelados",
        "code": "pedidos['monto'].where(pedidos['estado']=='completado',0)",
        "hint": "where y mask son operaciones inversas para una misma condición.",
        "textOutput": "0    100\n1    200\n2      0\n3    200\n4      0\n5    300\n6    150",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/condicionales/mask",
    "remember": "Es la inversa de where para una máscara booleana sin nulos.",
    "examples": [
      {
        "id": "pandas/condicionales/mask/1",
        "title": "Sustituir montos cancelados por cero",
        "code": "pedidos['monto'].mask(pedidos['estado']=='cancelado',0)",
        "hint": "Es la inversa de where para una máscara booleana sin nulos.",
        "textOutput": "0    100\n1    200\n2      0\n3    200\n4      0\n5    300\n6    150",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
