// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/metricas-de-negocio/definicion",
    "remember": "Define población, periodo, unidad de análisis y denominador.",
    "examples": [
      {
        "id": "pandas/metricas-de-negocio/definicion/1",
        "title": "Calcular porcentaje completado",
        "code": "round(pedidos['estado'].eq('completado').mean()*100,2)",
        "hint": "La media de booleanos representa una proporción si no hay ausentes.",
        "textOutput": "71.43",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/metricas-de-negocio/tasa-y-porcentaje",
    "remember": "La media de booleanos representa una proporción si no hay ausentes.",
    "examples": [
      {
        "id": "pandas/metricas-de-negocio/tasa-y-porcentaje/1",
        "title": "Calcular porcentaje completado",
        "code": "round(pedidos['estado'].eq('completado').mean()*100,2)",
        "hint": "La media de booleanos representa una proporción si no hay ausentes.",
        "textOutput": "71.43",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/metricas-de-negocio/ticket-promedio-y-cliente-unico",
    "remember": "Cuenta identificadores distintos cuando el nivel de detalle sea inferior al pedido.",
    "examples": [
      {
        "id": "pandas/metricas-de-negocio/ticket-promedio-y-cliente-unico/1",
        "title": "Medir ticket de pedidos completados",
        "code": "t = pedidos.query(\"estado == 'completado'\")\nt['monto'].sum(), t['pedido_id'].nunique(), round(t['monto'].mean(),2)",
        "hint": "Cuenta identificadores distintos cuando el nivel de detalle sea inferior al pedido.",
        "textOutput": "(950, 5, 190.0)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/metricas-de-negocio/cuotas-por-grupo",
    "remember": "No confundas cuota con tasa de crecimiento.",
    "examples": [
      {
        "id": "pandas/metricas-de-negocio/cuotas-por-grupo/1",
        "title": "Calcular participación de cada pedido en gasto del cliente",
        "code": "t = pedidos.assign(cuota=pedidos['monto']/pedidos.groupby('cliente_id')['monto'].transform('sum'))\nt[['pedido_id','cliente_id','cuota']].round(3)",
        "hint": "No confundas cuota con tasa de crecimiento.",
        "textOutput": "   pedido_id  cliente_id  cuota\n0        101           1  0.250\n1        102           2  0.800\n2        103           1  0.375\n3        104           3  0.400\n4        105           2  0.200\n5        106           3  0.600\n6        107           1  0.375",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/metricas-de-negocio/variacion-entre-meses",
    "remember": "Una ausencia de mes no equivale automáticamente a cero ventas.",
    "examples": [
      {
        "id": "pandas/metricas-de-negocio/variacion-entre-meses/1",
        "title": "Comparar ventas completadas mensuales",
        "code": "t = pedidos.query(\"estado == 'completado'\").set_index('fecha')['monto'].resample('MS').sum()\npd.DataFrame({'ventas':t,'variacion_pct':(t.pct_change(fill_method=None)*100).round(2)})",
        "hint": "Una ausencia de mes no equivale automáticamente a cero ventas.",
        "textOutput": "            ventas  variacion_pct\nfecha                            \n2026-02-01     500            NaN\n2026-03-01     450          -10.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
