// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/definicion",
    "remember": "Usa asignaciones explícitas; evita modificar copias accidentales.",
    "examples": [
      {
        "id": "pandas/modificar-y-transformar-columnas/definicion/1",
        "title": "Calcular ingreso por línea",
        "code": "detalle.assign(ingreso=detalle['cantidad']*detalle['precio_unitario']).head(3)",
        "hint": "Las operaciones entre columnas son elemento a elemento.",
        "textOutput": "   pedido_id  producto_id  cantidad  precio_unitario  ingreso\n0        101           10         2               25       50\n1        101           20         1               50       50\n2        102           30         1              200      200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/crear-columna-y-assign",
    "remember": "Las operaciones entre columnas son elemento a elemento.",
    "examples": [
      {
        "id": "pandas/modificar-y-transformar-columnas/crear-columna-y-assign/1",
        "title": "Calcular ingreso por línea",
        "code": "detalle.assign(ingreso=detalle['cantidad']*detalle['precio_unitario']).head(3)",
        "hint": "Las operaciones entre columnas son elemento a elemento.",
        "textOutput": "   pedido_id  producto_id  cantidad  precio_unitario  ingreso\n0        101           10         2               25       50\n1        101           20         1               50       50\n2        102           30         1              200      200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/rename-y-set-axis",
    "remember": "Renombrar no convierte valores.",
    "examples": [
      {
        "id": "pandas/modificar-y-transformar-columnas/rename-y-set-axis/1",
        "title": "Cambiar nombres de columnas",
        "code": "clientes.rename(columns={'nombre':'cliente','pais':'mercado'})[['cliente','mercado']]",
        "hint": "Renombrar no convierte valores.",
        "textOutput": "  cliente mercado\n0     Ana      MX\n1    Luis      MX\n2   Marta      ES\n3   Pedro    None\n4     Eva      ES",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/drop",
    "remember": "Sin reasignación, el original permanece intacto.",
    "examples": [
      {
        "id": "pandas/modificar-y-transformar-columnas/drop/1",
        "title": "Quitar columna canal",
        "code": "pedidos.drop(columns='canal').head(2)",
        "hint": "Sin reasignación, el original permanece intacto.",
        "textOutput": "   pedido_id  cliente_id      fecha  monto      estado\n0        101           1 2026-02-01    100  completado\n1        102           2 2026-02-01    200  completado",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/insert",
    "remember": "Copia antes si quieres preservar el original.",
    "examples": [
      {
        "id": "pandas/modificar-y-transformar-columnas/insert/1",
        "title": "Insertar moneda en la posición 1",
        "code": "tabla = pedidos[['pedido_id','monto']].copy()\ntabla.insert(1,'moneda','MXN')\ntabla.head(2)",
        "hint": "Copia antes si quieres preservar el original.",
        "textOutput": "   pedido_id moneda  monto\n0        101    MXN    100\n1        102    MXN    200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/asignar-con-loc",
    "remember": "Usa una sola operación loc, no selección encadenada.",
    "examples": [
      {
        "id": "pandas/modificar-y-transformar-columnas/asignar-con-loc/1",
        "title": "Marcar pedidos grandes",
        "code": "tabla = pedidos.copy()\ntabla.loc[tabla['monto'] >= 200,'segmento'] = 'alto'\ntabla[['pedido_id','segmento']]",
        "hint": "Usa una sola operación loc, no selección encadenada.",
        "textOutput": "   pedido_id segmento\n0        101      NaN\n1        102     alto\n2        103      NaN\n3        104     alto\n4        105      NaN\n5        106     alto\n6        107      NaN",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/replace",
    "remember": "Un diccionario permite reemplazos múltiples.",
    "examples": [
      {
        "id": "pandas/modificar-y-transformar-columnas/replace/1",
        "title": "Traducir estados",
        "code": "pedidos['estado'].replace({'completado':'OK','cancelado':'NO'})",
        "hint": "Un diccionario permite reemplazos múltiples.",
        "textOutput": "0    OK\n1    OK\n2    NO\n3    OK\n4    NO\n5    OK\n6    OK",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/map",
    "remember": "Un valor sin clave en el diccionario se convierte en nulo.",
    "examples": [
      {
        "id": "pandas/modificar-y-transformar-columnas/map/1",
        "title": "Traducir países",
        "code": "clientes['pais'].map({'MX':'México','ES':'España'})",
        "hint": "Un valor sin clave en el diccionario se convierte en nulo.",
        "textOutput": "0    México\n1    México\n2    España\n3       NaN\n4    España",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/apply",
    "remember": "axis=1 recorre filas; prefiere operaciones vectorizadas si existen.",
    "examples": [
      {
        "id": "pandas/modificar-y-transformar-columnas/apply/1",
        "title": "Calcular ingresos con una función por fila",
        "code": "detalle.head(3).apply(lambda fila: fila['cantidad']*fila['precio_unitario'], axis=1)",
        "hint": "axis=1 recorre filas; prefiere operaciones vectorizadas si existen.",
        "textOutput": "0     50\n1     50\n2    200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/pipe",
    "remember": "La función debe devolver el objeto que necesita el siguiente paso.",
    "examples": [
      {
        "id": "pandas/modificar-y-transformar-columnas/pipe/1",
        "title": "Encadenar un filtro y selección",
        "code": "pedidos.pipe(lambda t: t[t['estado']=='completado'])[['pedido_id','monto']]",
        "hint": "La función debe devolver el objeto que necesita el siguiente paso.",
        "textOutput": "   pedido_id  monto\n0        101    100\n1        102    200\n3        104    200\n5        106    300\n6        107    150",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/update",
    "remember": "No agrega nuevas filas ni columnas.",
    "examples": [
      {
        "id": "pandas/modificar-y-transformar-columnas/update/1",
        "title": "Corregir un monto por identificador",
        "code": "tabla = pedidos.set_index('pedido_id')[['monto']].copy()\ntabla.update(pd.DataFrame({'monto':[110]},index=[101]))\ntabla.head(2)",
        "hint": "No agrega nuevas filas ni columnas.",
        "textOutput": "           monto\npedido_id       \n101          110\n102          200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
