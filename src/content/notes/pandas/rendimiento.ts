// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/rendimiento/definicion",
    "remember": "Mide antes de optimizar; evita bucles fila a fila si existe una operación directa.",
    "examples": [
      {
        "id": "pandas/rendimiento/definicion/1",
        "title": "Multiplicar cantidades por precios",
        "code": "(detalle['cantidad']*detalle['precio_unitario']).head(4)",
        "hint": "La vectorización expresa el cálculo directamente; no garantiza rapidez en todos los casos.",
        "textOutput": "0     50\n1     50\n2    200\n3    150",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/rendimiento/vectorizacion",
    "remember": "La vectorización expresa el cálculo directamente; no garantiza rapidez en todos los casos.",
    "examples": [
      {
        "id": "pandas/rendimiento/vectorizacion/1",
        "title": "Multiplicar cantidades por precios",
        "code": "(detalle['cantidad']*detalle['precio_unitario']).head(4)",
        "hint": "La vectorización expresa el cálculo directamente; no garantiza rapidez en todos los casos.",
        "textOutput": "0     50\n1     50\n2    200\n3    150",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/rendimiento/iteracion-e-itertuples",
    "remember": "Evita modificar filas mientras iteras; itertuples suele ser preferible a iterrows.",
    "examples": [
      {
        "id": "pandas/rendimiento/iteracion-e-itertuples/1",
        "title": "Construir mensajes para dos pedidos",
        "code": "[f'{r.pedido_id}: {r.monto}' for r in pedidos.head(2).itertuples(index=False)]",
        "hint": "Evita modificar filas mientras iteras; itertuples suele ser preferible a iterrows.",
        "textOutput": "['101: 100', '102: 200']",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/rendimiento/memoria-y-tipos-eficientes",
    "remember": "Comprueba rango y precisión antes de reducir un tipo.",
    "note": "Los bytes concretos dependen del entorno.",
    "examples": [
      {
        "id": "pandas/rendimiento/memoria-y-tipos-eficientes/1",
        "title": "Medir memoria de una categoría repetida",
        "code": "s = pd.Series(['web','tienda']*500)\nint(s.memory_usage(deep=True)), int(s.astype('category').memory_usage(deep=True))",
        "hint": "Comprueba rango y precisión antes de reducir un tipo.",
        "textOutput": "(53632, 1347)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/rendimiento/chunksize",
    "remember": "Combina resultados parciales; no promedies medias sin ponderarlas.",
    "examples": [
      {
        "id": "pandas/rendimiento/chunksize/1",
        "title": "Sumar un CSV por bloques",
        "code": "bloques = pd.read_csv(StringIO('monto\\n100\\n200\\n50\\n150'),chunksize=2)\nsum(b['monto'].sum() for b in bloques)",
        "hint": "Combina resultados parciales; no promedies medias sin ponderarlas.",
        "textOutput": "500",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/rendimiento/lectura-selectiva",
    "remember": "usecols reduce datos cargados; dtype evita inferencias inadecuadas.",
    "examples": [
      {
        "id": "pandas/rendimiento/lectura-selectiva/1",
        "title": "Cargar únicamente el importe",
        "code": "pd.read_csv(StringIO('id,monto,canal\\n1,100,web\\n2,200,tienda'),usecols=['monto'],dtype={'monto':'int32'}).dtypes.astype(str)",
        "hint": "usecols reduce datos cargados; dtype evita inferencias inadecuadas.",
        "textOutput": "monto    int32",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/rendimiento/evitar-concatenacion-repetida",
    "remember": "Concatenar dentro de cada iteración puede copiar datos repetidamente.",
    "examples": [
      {
        "id": "pandas/rendimiento/evitar-concatenacion-repetida/1",
        "title": "Unir lotes diarios",
        "code": "lotes = [pedidos.iloc[:3],pedidos.iloc[3:]]\npd.concat(lotes,ignore_index=True).shape",
        "hint": "Concatenar dentro de cada iteración puede copiar datos repetidamente.",
        "textOutput": "(7, 6)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
