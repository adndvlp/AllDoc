// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/valores-nulos/definicion",
    "remember": "Usa isna(), no igualdad con NaN.",
    "examples": [
      {
        "id": "pandas/valores-nulos/definicion/1",
        "title": "Detectar clientes sin país",
        "code": "clientes.loc[clientes['pais'].isna(), ['cliente_id','nombre']]",
        "hint": "No cuentan ceros ni cadenas vacías como nulos por defecto.",
        "textOutput": "   cliente_id nombre\n3           4  Pedro",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/valores-nulos/isna-y-notna",
    "remember": "No cuentan ceros ni cadenas vacías como nulos por defecto.",
    "examples": [
      {
        "id": "pandas/valores-nulos/isna-y-notna/1",
        "title": "Detectar clientes sin país",
        "code": "clientes.loc[clientes['pais'].isna(), ['cliente_id','nombre']]",
        "hint": "No cuentan ceros ni cadenas vacías como nulos por defecto.",
        "textOutput": "   cliente_id nombre\n3           4  Pedro",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/valores-nulos/conteo-de-faltantes",
    "remember": "Cuenta por columna antes de limpiar.",
    "examples": [
      {
        "id": "pandas/valores-nulos/conteo-de-faltantes/1",
        "title": "Medir faltantes en clientes",
        "code": "clientes.isna().sum()",
        "hint": "Cuenta por columna antes de limpiar.",
        "textOutput": "cliente_id    0\nnombre        0\npais          1\nalta          0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/valores-nulos/dropna",
    "remember": "No elimines una fila solo porque otra columna opcional está vacía.",
    "examples": [
      {
        "id": "pandas/valores-nulos/dropna/1",
        "title": "Conservar clientes con país",
        "code": "clientes.dropna(subset=['pais'])[['cliente_id','pais']]",
        "hint": "No elimines una fila solo porque otra columna opcional está vacía.",
        "textOutput": "   cliente_id pais\n0           1   MX\n1           2   MX\n2           3   ES\n4           5   ES",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/valores-nulos/fillna",
    "remember": "Un cero solo es correcto si ausencia significa cero.",
    "examples": [
      {
        "id": "pandas/valores-nulos/fillna/1",
        "title": "Etiquetar país desconocido",
        "code": "clientes['pais'].fillna('Desconocido')",
        "hint": "Un cero solo es correcto si ausencia significa cero.",
        "textOutput": "0             MX\n1             MX\n2             ES\n3    Desconocido\n4             ES",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/valores-nulos/ffill-y-bfill",
    "remember": "Ordena temporalmente antes de propagar.",
    "examples": [
      {
        "id": "pandas/valores-nulos/ffill-y-bfill/1",
        "title": "Rellenar un hueco de ventas",
        "code": "serie.ffill(), serie.bfill()",
        "hint": "Ordena temporalmente antes de propagar.",
        "textOutput": "1)\na    100.0\nb    100.0\nc    200.0\nd    300.0\n\n2)\na    100.0\nb    200.0\nc    200.0\nd    300.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/valores-nulos/interpolate",
    "remember": "No debe confundirse un valor estimado con una medición.",
    "examples": [
      {
        "id": "pandas/valores-nulos/interpolate/1",
        "title": "Interpolar un punto entre 100 y 200",
        "code": "serie.interpolate()",
        "hint": "No debe confundirse un valor estimado con una medición.",
        "textOutput": "a    100.0\nb    150.0\nc    200.0\nd    300.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/valores-nulos/none-nan-na-y-nat",
    "remember": "isna reconoce los cuatro.",
    "examples": [
      {
        "id": "pandas/valores-nulos/none-nan-na-y-nat/1",
        "title": "Comprobar marcadores de ausencia",
        "code": "pd.Series([None,np.nan,pd.NA,pd.NaT],dtype='object').isna().tolist()",
        "hint": "isna reconoce los cuatro.",
        "textOutput": "[True, True, True, True]",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/valores-nulos/combine-first",
    "remember": "Puede incorporar etiquetas nuevas.",
    "examples": [
      {
        "id": "pandas/valores-nulos/combine-first/1",
        "title": "Completar países desde una segunda fuente",
        "code": "a = clientes.set_index('cliente_id')['pais']\nb = pd.Series({4:'AR',6:'CL'})\na.combine_first(b)",
        "hint": "Puede incorporar etiquetas nuevas.",
        "textOutput": "1    MX\n2    MX\n3    ES\n4    AR\n5    ES\n6    CL",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/valores-nulos/notna",
    "remember": "Es la operación complementaria de isna.",
    "examples": [
      {
        "id": "pandas/valores-nulos/notna/1",
        "title": "Seleccionar clientes con país conocido",
        "code": "clientes.loc[clientes['pais'].notna(),['cliente_id','pais']]",
        "hint": "Es la operación complementaria de isna.",
        "textOutput": "   cliente_id pais\n0           1   MX\n1           2   MX\n2           3   ES\n4           5   ES",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
