// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/validacion-de-datos/definicion",
    "remember": "Una consulta que ejecuta no necesariamente produce resultados correctos.",
    "examples": [
      {
        "id": "pandas/validacion-de-datos/definicion/1",
        "title": "Validar la clave de pedidos",
        "code": "pedidos['pedido_id'].is_unique, pedidos['pedido_id'].notna().all(), pd.api.types.is_numeric_dtype(pedidos['monto'])",
        "hint": "is_unique comprueba etiquetas o valores únicos.",
        "textOutput": "(True, True, True)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/validacion-de-datos/validar-esquema-y-claves",
    "remember": "is_unique comprueba etiquetas o valores únicos.",
    "examples": [
      {
        "id": "pandas/validacion-de-datos/validar-esquema-y-claves/1",
        "title": "Validar la clave de pedidos",
        "code": "pedidos['pedido_id'].is_unique, pedidos['pedido_id'].notna().all(), pd.api.types.is_numeric_dtype(pedidos['monto'])",
        "hint": "is_unique comprueba etiquetas o valores únicos.",
        "textOutput": "(True, True, True)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/validacion-de-datos/integridad-referencial",
    "remember": "Una clave sin referencia puede desaparecer en un inner merge.",
    "examples": [
      {
        "id": "pandas/validacion-de-datos/integridad-referencial/1",
        "title": "Detectar pedidos sin cliente válido",
        "code": "pedidos.loc[~pedidos['cliente_id'].isin(clientes['cliente_id']), 'pedido_id'].tolist()",
        "hint": "Una clave sin referencia puede desaparecer en un inner merge.",
        "textOutput": "[]",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/validacion-de-datos/conciliar-totales",
    "remember": "No sumes el monto de pedido después de multiplicar sus filas por detalle.",
    "examples": [
      {
        "id": "pandas/validacion-de-datos/conciliar-totales/1",
        "title": "Verificar monto contra líneas",
        "code": "t = detalle.assign(ingreso=detalle['cantidad']*detalle['precio_unitario']).groupby('pedido_id')['ingreso'].sum()\npedidos.set_index('pedido_id')['monto'].eq(t).all()",
        "hint": "No sumes el monto de pedido después de multiplicar sus filas por detalle.",
        "textOutput": "True",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/validacion-de-datos/equals-y-compare",
    "remember": "equals considera faltantes en la misma posición iguales.",
    "examples": [
      {
        "id": "pandas/validacion-de-datos/equals-y-compare/1",
        "title": "Localizar cambio de precio",
        "code": "a = productos[['precio']].copy()\nb = a.copy()\nb.loc[0,'precio'] = 30\na.compare(b)",
        "hint": "equals considera faltantes en la misma posición iguales.",
        "textOutput": "  precio      \n    self other\n0   25.0  30.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/validacion-de-datos/assert-frame-equal",
    "remember": "Útil para pruebas automáticas de transformaciones.",
    "examples": [
      {
        "id": "pandas/validacion-de-datos/assert-frame-equal/1",
        "title": "Validar una selección esperada",
        "code": "a = pedidos[['pedido_id','monto']].head(2)\nb = pd.DataFrame({'pedido_id':[101,102],'monto':[100,200]})\npd.testing.assert_frame_equal(a,b)\n'Validación superada'",
        "hint": "Útil para pruebas automáticas de transformaciones.",
        "textOutput": "Validación superada",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/validacion-de-datos/equals",
    "remember": "No equivale a comparar celda por celda con ==.",
    "examples": [
      {
        "id": "pandas/validacion-de-datos/equals/1",
        "title": "Comprobar que una copia no cambió",
        "code": "pedidos.equals(pedidos.copy())",
        "hint": "No equivale a comparar celda por celda con ==.",
        "textOutput": "True",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
