// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/conversion-de-tipos/definicion",
    "remember": "Convierte y verifica antes de calcular.",
    "examples": [
      {
        "id": "pandas/conversion-de-tipos/definicion/1",
        "title": "Conservar el identificador como texto",
        "code": "clientes['cliente_id'].astype('string').head(2)",
        "hint": "No confundir convertir a texto con formatear una fecha.",
        "textOutput": "0    1\n1    2",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/conversion-de-tipos/astype",
    "remember": "No confundir convertir a texto con formatear una fecha.",
    "examples": [
      {
        "id": "pandas/conversion-de-tipos/astype/1",
        "title": "Conservar el identificador como texto",
        "code": "clientes['cliente_id'].astype('string').head(2)",
        "hint": "No confundir convertir a texto con formatear una fecha.",
        "textOutput": "0    1\n1    2",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/conversion-de-tipos/to-numeric",
    "remember": "Conserva el original para auditar errores.",
    "examples": [
      {
        "id": "pandas/conversion-de-tipos/to-numeric/1",
        "title": "Convertir importes de leads",
        "code": "pd.to_numeric(leads['importe_texto'], errors='coerce')",
        "hint": "Conserva el original para auditar errores.",
        "textOutput": "0    100.0\n1    200.0\n2      NaN\n3      NaN\n4     50.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/conversion-de-tipos/to-datetime",
    "remember": "Un texto con aspecto de fecha no es necesariamente datetime.",
    "examples": [
      {
        "id": "pandas/conversion-de-tipos/to-datetime/1",
        "title": "Convertir fechas de entrada",
        "code": "pd.to_datetime(pd.Series(['01/02/2026','error']), format='%d/%m/%Y', errors='coerce')",
        "hint": "Un texto con aspecto de fecha no es necesariamente datetime.",
        "textOutput": "0   2026-02-01\n1          NaT",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/conversion-de-tipos/tipos-nullable",
    "remember": "Int64 con I mayúscula admite pd.NA.",
    "examples": [
      {
        "id": "pandas/conversion-de-tipos/tipos-nullable/1",
        "title": "Conservar enteros faltantes",
        "code": "pd.Series([1,None,3], dtype='Int64')",
        "hint": "Int64 con I mayúscula admite pd.NA.",
        "textOutput": "0       1\n1    <NA>\n2       3",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/conversion-de-tipos/convert-dtypes",
    "remember": "No convierte automáticamente todo texto numérico a números.",
    "examples": [
      {
        "id": "pandas/conversion-de-tipos/convert-dtypes/1",
        "title": "Inferir tipos anulables",
        "code": "leads.convert_dtypes().dtypes.astype(str)",
        "hint": "No convierte automáticamente todo texto numérico a números.",
        "textOutput": "lead_id           Int64\nemail            string\nimporte_texto    string\nnombre_raw       string",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
