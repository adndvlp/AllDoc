// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/indices-y-alineacion/definicion",
    "remember": "Índice no significa posición ni clave primaria automáticamente.",
    "examples": [
      {
        "id": "pandas/indices-y-alineacion/definicion/1",
        "title": "Usar identificador y recuperarlo",
        "code": "clientes.set_index('cliente_id')[['nombre']].reset_index().head(2)",
        "hint": "drop=True descarta las etiquetas anteriores al restablecer.",
        "textOutput": "   cliente_id nombre\n0           1    Ana\n1           2   Luis",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/indices-y-alineacion/set-index-y-reset-index",
    "remember": "drop=True descarta las etiquetas anteriores al restablecer.",
    "examples": [
      {
        "id": "pandas/indices-y-alineacion/set-index-y-reset-index/1",
        "title": "Usar identificador y recuperarlo",
        "code": "clientes.set_index('cliente_id')[['nombre']].reset_index().head(2)",
        "hint": "drop=True descarta las etiquetas anteriores al restablecer.",
        "textOutput": "   cliente_id nombre\n0           1    Ana\n1           2   Luis",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/indices-y-alineacion/reindex",
    "remember": "No es lo mismo que seleccionar: puede crear posiciones nuevas.",
    "examples": [
      {
        "id": "pandas/indices-y-alineacion/reindex/1",
        "title": "Incluir un cliente inexistente",
        "code": "clientes.set_index('cliente_id')['nombre'].reindex([1,5,9])",
        "hint": "No es lo mismo que seleccionar: puede crear posiciones nuevas.",
        "textOutput": "cliente_id\n1    Ana\n5    Eva\n9    NaN",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/indices-y-alineacion/alineacion-automatica",
    "remember": "Etiquetas sin pareja producen nulos.",
    "examples": [
      {
        "id": "pandas/indices-y-alineacion/alineacion-automatica/1",
        "title": "Sumar dos series por canal",
        "code": "a = pd.Series({'web':100,'tienda':50})\nb = pd.Series({'tienda':20,'web':30})\na + b",
        "hint": "Etiquetas sin pareja producen nulos.",
        "textOutput": "tienda     70\nweb       130",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/indices-y-alineacion/align",
    "remember": "join='inner' conserva etiquetas comunes.",
    "examples": [
      {
        "id": "pandas/indices-y-alineacion/align/1",
        "title": "Conservar canales compartidos",
        "code": "a = pd.Series({'web':100,'tienda':50})\nb = pd.Series({'web':30,'app':20})\nx, y = a.align(b, join='inner')\nx + y",
        "hint": "join='inner' conserva etiquetas comunes.",
        "textOutput": "web    130",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/indices-y-alineacion/multiindex",
    "remember": "Permite seleccionar combinaciones de claves.",
    "examples": [
      {
        "id": "pandas/indices-y-alineacion/multiindex/1",
        "title": "Consultar nombre por país y cliente",
        "code": "tabla = clientes.set_index(['pais','cliente_id']).sort_index()\ntabla.loc[('MX',1),'nombre']",
        "hint": "Permite seleccionar combinaciones de claves.",
        "textOutput": "Ana",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
