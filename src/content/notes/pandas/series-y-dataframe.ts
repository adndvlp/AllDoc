// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/series-y-dataframe/definicion",
    "remember": "Series = una dimensión; DataFrame = tabla.",
    "examples": [
      {
        "id": "pandas/series-y-dataframe/definicion/1",
        "title": "Crear una serie de ventas",
        "code": "pd.Series([100, 200], index=['web', 'tienda'], name='ventas')",
        "hint": "El índice etiqueta cada valor.",
        "textOutput": "web       100\ntienda    200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/series-y-dataframe/series",
    "remember": "El índice etiqueta cada valor.",
    "examples": [
      {
        "id": "pandas/series-y-dataframe/series/1",
        "title": "Crear una serie de ventas",
        "code": "pd.Series([100, 200], index=['web', 'tienda'], name='ventas')",
        "hint": "El índice etiqueta cada valor.",
        "textOutput": "web       100\ntienda    200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/series-y-dataframe/dataframe",
    "remember": "Las columnas del diccionario deben tener longitudes compatibles.",
    "examples": [
      {
        "id": "pandas/series-y-dataframe/dataframe/1",
        "title": "Crear una tabla de ventas",
        "code": "pd.DataFrame({'canal': ['web', 'tienda'], 'ventas': [100, 200]})",
        "hint": "Las columnas del diccionario deben tener longitudes compatibles.",
        "textOutput": "    canal  ventas\n0     web     100\n1  tienda     200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/series-y-dataframe/index",
    "remember": "Las etiquetas no tienen por qué ser únicas ni consecutivas.",
    "examples": [
      {
        "id": "pandas/series-y-dataframe/index/1",
        "title": "Consultar etiquetas de clientes",
        "code": "clientes.index.tolist()",
        "hint": "Las etiquetas no tienen por qué ser únicas ni consecutivas.",
        "textOutput": "[0, 1, 2, 3, 4]",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/series-y-dataframe/series-frente-a-dataframe",
    "remember": "Un corchete con texto devuelve una Series; una lista conserva la tabla.",
    "examples": [
      {
        "id": "pandas/series-y-dataframe/series-frente-a-dataframe/1",
        "title": "Comparar las dimensiones",
        "code": "type(clientes['nombre']).__name__, type(clientes[['nombre']]).__name__",
        "hint": "Un corchete con texto devuelve una Series; una lista conserva la tabla.",
        "textOutput": "('Series', 'DataFrame')",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
