// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/funciones-numericas/definicion",
    "remember": "Define el tratamiento de ceros y nulos antes de dividir.",
    "examples": [
      {
        "id": "pandas/funciones-numericas/definicion/1",
        "title": "Aplicar un descuento del 10 %",
        "code": "(productos['precio']*0.9).round(2)",
        "hint": "Una operación vectorizada evita un bucle manual.",
        "textOutput": "0     22.5\n1     45.0\n2    180.0\n3    108.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/funciones-numericas/aritmetica-y-broadcasting",
    "remember": "Una operación vectorizada evita un bucle manual.",
    "examples": [
      {
        "id": "pandas/funciones-numericas/aritmetica-y-broadcasting/1",
        "title": "Aplicar un descuento del 10 %",
        "code": "(productos['precio']*0.9).round(2)",
        "hint": "Una operación vectorizada evita un bucle manual.",
        "textOutput": "0     22.5\n1     45.0\n2    180.0\n3    108.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/funciones-numericas/round-y-abs",
    "remember": "El redondeo no sustituye un tipo decimal para contabilidad exacta.",
    "examples": [
      {
        "id": "pandas/funciones-numericas/round-y-abs/1",
        "title": "Redondear diferencias de precio",
        "code": "(productos['precio']-100).abs().round(2)",
        "hint": "El redondeo no sustituye un tipo decimal para contabilidad exacta.",
        "textOutput": "0     75\n1     50\n2    100\n3     20",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/funciones-numericas/division-segura",
    "remember": "Un ratio indefinido no equivale a cero.",
    "examples": [
      {
        "id": "pandas/funciones-numericas/division-segura/1",
        "title": "Calcular tasa de conversión",
        "code": "visitas = pd.Series([10,0,20])\ncompras = pd.Series([2,0,5])\n(compras / visitas.replace(0,np.nan)*100).round(2)",
        "hint": "Un ratio indefinido no equivale a cero.",
        "textOutput": "0    20.0\n1     NaN\n2    25.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/funciones-numericas/clip",
    "remember": "No borra filas; modifica extremos en el resultado.",
    "examples": [
      {
        "id": "pandas/funciones-numericas/clip/1",
        "title": "Limitar montos para un escenario",
        "code": "pedidos['monto'].clip(lower=100,upper=200)",
        "hint": "No borra filas; modifica extremos en el resultado.",
        "textOutput": "0    100\n1    200\n2    150\n3    200\n4    100\n5    200\n6    150",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
