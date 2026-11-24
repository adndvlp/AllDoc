// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/definicion",
    "remember": "Elige una forma que conserve el nivel de detalle.",
    "examples": [
      {
        "id": "pandas/reestructuracion-de-tablas/definicion/1",
        "title": "Convertir metas en columnas",
        "code": "t = pd.DataFrame({'mes':['feb','feb','mar'],'canal':['web','tienda','web'],'meta':[100,200,300]})\nt.pivot(index='mes',columns='canal',values='meta')",
        "hint": "Si hay duplicados, usa pivot_table con una agregación.",
        "textOutput": "canal  tienda    web\nmes                 \nfeb     200.0  100.0\nmar       NaN  300.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/pivot",
    "remember": "Si hay duplicados, usa pivot_table con una agregación.",
    "examples": [
      {
        "id": "pandas/reestructuracion-de-tablas/pivot/1",
        "title": "Convertir metas en columnas",
        "code": "t = pd.DataFrame({'mes':['feb','feb','mar'],'canal':['web','tienda','web'],'meta':[100,200,300]})\nt.pivot(index='mes',columns='canal',values='meta')",
        "hint": "Si hay duplicados, usa pivot_table con una agregación.",
        "textOutput": "canal  tienda    web\nmes                 \nfeb     200.0  100.0\nmar       NaN  300.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/pivot-table",
    "remember": "La agregación predeterminada es mean; especifica sum para ingresos.",
    "examples": [
      {
        "id": "pandas/reestructuracion-de-tablas/pivot-table/1",
        "title": "Calcular ventas por cliente y estado",
        "code": "pedidos.pivot_table(index='cliente_id',columns='estado',values='monto',aggfunc='sum',fill_value=0)",
        "hint": "La agregación predeterminada es mean; especifica sum para ingresos.",
        "textOutput": "estado      cancelado  completado\ncliente_id                       \n1                 150         250\n2                  50         200\n3                   0         500",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/crosstab",
    "remember": "normalize permite convertir conteos en proporciones.",
    "examples": [
      {
        "id": "pandas/reestructuracion-de-tablas/crosstab/1",
        "title": "Contar pedidos por cliente y estado",
        "code": "pd.crosstab(pedidos['cliente_id'],pedidos['estado'])",
        "hint": "normalize permite convertir conteos en proporciones.",
        "textOutput": "estado      cancelado  completado\ncliente_id                       \n1                   1           2\n2                   1           1\n3                   0           2",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/melt",
    "remember": "id_vars identifica; value_vars indica columnas a transformar.",
    "examples": [
      {
        "id": "pandas/reestructuracion-de-tablas/melt/1",
        "title": "Pasar presupuesto a formato largo",
        "code": "t = pd.DataFrame({'canal':['web','tienda'],'feb':[100,200],'mar':[150,250]})\nt.melt(id_vars='canal',var_name='mes',value_name='presupuesto')",
        "hint": "id_vars identifica; value_vars indica columnas a transformar.",
        "textOutput": "    canal  mes  presupuesto\n0     web  feb          100\n1  tienda  feb          200\n2     web  mar          150\n3  tienda  mar          250",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/stack-y-unstack",
    "remember": "stack pasa columnas a filas; unstack hace lo inverso.",
    "examples": [
      {
        "id": "pandas/reestructuracion-de-tablas/stack-y-unstack/1",
        "title": "Convertir ventas agrupadas en matriz",
        "code": "pedidos.groupby(['cliente_id','estado'])['monto'].sum().unstack(fill_value=0)",
        "hint": "stack pasa columnas a filas; unstack hace lo inverso.",
        "textOutput": "estado      cancelado  completado\ncliente_id                       \n1                 150         250\n2                  50         200\n3                   0         500",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/explode",
    "remember": "Las otras columnas y el índice original pueden repetirse.",
    "examples": [
      {
        "id": "pandas/reestructuracion-de-tablas/explode/1",
        "title": "Separar etiquetas de campañas",
        "code": "pd.DataFrame({'campana':['A','B'],'etiquetas':[['web','email'],['tienda']]}).explode('etiquetas',ignore_index=True)",
        "hint": "Las otras columnas y el índice original pueden repetirse.",
        "textOutput": "  campana etiquetas\n0       A       web\n1       A     email\n2       B    tienda",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/transponer",
    "remember": "Si se mezclan tipos, pueden cambiar los tipos resultantes.",
    "examples": [
      {
        "id": "pandas/reestructuracion-de-tablas/transponer/1",
        "title": "Transponer precios",
        "code": "productos.set_index('producto')['precio'].head(2).to_frame().T",
        "hint": "Si se mezclan tipos, pueden cambiar los tipos resultantes.",
        "textOutput": "producto  Mouse  Teclado\nprecio       25       50",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/stack",
    "remember": "future_stack=True en pandas 2.2 usa la implementación nueva, predeterminada en pandas 3.0.",
    "examples": [
      {
        "id": "pandas/reestructuracion-de-tablas/stack/1",
        "title": "Pasar una matriz a una serie con dos niveles",
        "code": "t = pd.DataFrame({'web':[10,20],'tienda':[30,40]},index=['feb','mar'])\nt.stack(future_stack=True)",
        "hint": "future_stack=True en pandas 2.2 usa la implementación nueva, predeterminada en pandas 3.0.",
        "textOutput": "feb  web       10\n     tienda    30\nmar  web       20\n     tienda    40",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
