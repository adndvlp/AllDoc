// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/texto/definicion",
    "remember": "Usa métodos str sobre una Series, no sobre todo el DataFrame.",
    "examples": [
      {
        "id": "pandas/texto/definicion/1",
        "title": "Limpiar espacios externos",
        "code": "leads['nombre_raw'].str.strip()",
        "hint": "strip no elimina espacios interiores.",
        "textOutput": "0     Ana\n1    LUIS\n2     ana\n3    None\n4     Eva",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/texto/strip-lstrip-y-rstrip",
    "remember": "strip no elimina espacios interiores.",
    "examples": [
      {
        "id": "pandas/texto/strip-lstrip-y-rstrip/1",
        "title": "Limpiar espacios externos",
        "code": "leads['nombre_raw'].str.strip()",
        "hint": "strip no elimina espacios interiores.",
        "textOutput": "0     Ana\n1    LUIS\n2     ana\n3    None\n4     Eva",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/texto/lower-upper-y-casefold",
    "remember": "Normaliza antes de deduplicar si el negocio lo permite.",
    "examples": [
      {
        "id": "pandas/texto/lower-upper-y-casefold/1",
        "title": "Homogeneizar nombres",
        "code": "leads['nombre_raw'].str.strip().str.lower()",
        "hint": "Normaliza antes de deduplicar si el negocio lo permite.",
        "textOutput": "0     ana\n1    luis\n2     ana\n3    None\n4     eva",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/texto/len-y-slicing",
    "remember": "El corte final se excluye.",
    "examples": [
      {
        "id": "pandas/texto/len-y-slicing/1",
        "title": "Extraer prefijo de productos",
        "code": "productos['producto'].str[:3].tolist()",
        "hint": "El corte final se excluye.",
        "textOutput": "['Mou', 'Tec', 'Mon', 'Sil']",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/texto/contains-startswith-y-endswith",
    "remember": "regex=False busca texto literal; na=False excluye ausentes.",
    "examples": [
      {
        "id": "pandas/texto/contains-startswith-y-endswith/1",
        "title": "Encontrar correos de Ana",
        "code": "leads.loc[leads['email'].str.contains('ana@',regex=False,na=False), 'lead_id'].tolist()",
        "hint": "regex=False busca texto literal; na=False excluye ausentes.",
        "textOutput": "[1, 3]",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/texto/replace",
    "remember": "str.replace no es lo mismo que reemplazar celdas completas.",
    "examples": [
      {
        "id": "pandas/texto/replace/1",
        "title": "Cambiar el dominio de los correos",
        "code": "leads['email'].str.replace('ejemplo.com','empresa.com',regex=False)",
        "hint": "str.replace no es lo mismo que reemplazar celdas completas.",
        "textOutput": "0     ana@empresa.com\n1    luis@empresa.com\n2     ana@empresa.com\n3                None\n4     eva@empresa.com",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/texto/split-y-extract",
    "remember": "expand=True devuelve columnas en split.",
    "examples": [
      {
        "id": "pandas/texto/split-y-extract/1",
        "title": "Separar usuario y dominio",
        "code": "leads['email'].str.split('@',expand=True).set_axis(['usuario','dominio'],axis=1)",
        "hint": "expand=True devuelve columnas en split.",
        "textOutput": "  usuario      dominio\n0     ana  ejemplo.com\n1    luis  ejemplo.com\n2     ana  ejemplo.com\n3    None         None\n4     eva  ejemplo.com",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/texto/expresiones-regulares",
    "remember": "Los paréntesis de captura determinan las columnas de extract.",
    "examples": [
      {
        "id": "pandas/texto/expresiones-regulares/1",
        "title": "Extraer usuario antes de arroba",
        "code": "leads['email'].str.extract(r'^([^@]+)@', expand=False)",
        "hint": "Los paréntesis de captura determinan las columnas de extract.",
        "textOutput": "0     ana\n1    luis\n2     ana\n3    None\n4     eva",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/texto/str-cat",
    "remember": "na_rep permite representar faltantes de forma explícita.",
    "examples": [
      {
        "id": "pandas/texto/str-cat/1",
        "title": "Concatenar nombres de productos",
        "code": "productos['producto'].str.cat(sep=', ')",
        "hint": "na_rep permite representar faltantes de forma explícita.",
        "textOutput": "Mouse, Teclado, Monitor, Silla",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/texto/str-upper",
    "remember": "La conversión no modifica la serie de origen.",
    "examples": [
      {
        "id": "pandas/texto/str-upper/1",
        "title": "Normalizar códigos de país",
        "code": "clientes['pais'].str.upper()",
        "hint": "La conversión no modifica la serie de origen.",
        "textOutput": "0      MX\n1      MX\n2      ES\n3    None\n4      ES",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/texto/str-len",
    "remember": "Los nulos no se convierten en longitud cero.",
    "examples": [
      {
        "id": "pandas/texto/str-len/1",
        "title": "Medir longitud de nombres",
        "code": "clientes['nombre'].str.len()",
        "hint": "Los nulos no se convierten en longitud cero.",
        "textOutput": "0    3\n1    4\n2    5\n3    5\n4    3",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/texto/str-startswith-y-str-endswith",
    "remember": "No interpretan comodines de SQL.",
    "examples": [
      {
        "id": "pandas/texto/str-startswith-y-str-endswith/1",
        "title": "Seleccionar correos del dominio de ejemplo",
        "code": "leads.loc[leads['email'].str.endswith('@ejemplo.com',na=False),'lead_id'].tolist()",
        "hint": "No interpretan comodines de SQL.",
        "textOutput": "[1, 2, 3, 5]",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
