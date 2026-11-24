// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/duplicados-y-valores-unicos/definicion",
    "remember": "Define primero qué hace único un registro.",
    "examples": [
      {
        "id": "pandas/duplicados-y-valores-unicos/definicion/1",
        "title": "Contar países distintos",
        "code": "clientes['pais'].unique().tolist(), clientes['pais'].nunique(), clientes['pais'].nunique(dropna=False)",
        "hint": "Usa dropna=False si la ausencia debe contarse como categoría.",
        "textOutput": "(['MX', 'ES', None], 2, 3)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/duplicados-y-valores-unicos/unique-y-nunique",
    "remember": "Usa dropna=False si la ausencia debe contarse como categoría.",
    "examples": [
      {
        "id": "pandas/duplicados-y-valores-unicos/unique-y-nunique/1",
        "title": "Contar países distintos",
        "code": "clientes['pais'].unique().tolist(), clientes['pais'].nunique(), clientes['pais'].nunique(dropna=False)",
        "hint": "Usa dropna=False si la ausencia debe contarse como categoría.",
        "textOutput": "(['MX', 'ES', None], 2, 3)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/duplicados-y-valores-unicos/value-counts",
    "remember": "dropna=False incluye el grupo de ausentes.",
    "examples": [
      {
        "id": "pandas/duplicados-y-valores-unicos/value-counts/1",
        "title": "Contar pedidos por estado",
        "code": "pedidos['estado'].value_counts()",
        "hint": "dropna=False incluye el grupo de ausentes.",
        "textOutput": "estado\ncompletado    5\ncancelado     2",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/duplicados-y-valores-unicos/duplicated",
    "remember": "No confundir segunda aparición con todos los duplicados.",
    "examples": [
      {
        "id": "pandas/duplicados-y-valores-unicos/duplicated/1",
        "title": "Mostrar correos duplicados",
        "code": "leads.loc[leads.duplicated('email',keep=False), ['lead_id','email']]",
        "hint": "No confundir segunda aparición con todos los duplicados.",
        "textOutput": "   lead_id            email\n0        1  ana@ejemplo.com\n2        3  ana@ejemplo.com",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/duplicados-y-valores-unicos/drop-duplicates",
    "remember": "Ordena antes si debes conservar el registro más reciente.",
    "examples": [
      {
        "id": "pandas/duplicados-y-valores-unicos/drop-duplicates/1",
        "title": "Conservar un lead por correo",
        "code": "leads.drop_duplicates('email',keep='first')[['lead_id','email']]",
        "hint": "Ordena antes si debes conservar el registro más reciente.",
        "textOutput": "   lead_id             email\n0        1   ana@ejemplo.com\n1        2  luis@ejemplo.com\n3        4              None\n4        5   eva@ejemplo.com",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/duplicados-y-valores-unicos/duplicados-de-clave-compuesta",
    "remember": "Comprueba la clave al nivel de detalle correcto.",
    "examples": [
      {
        "id": "pandas/duplicados-y-valores-unicos/duplicados-de-clave-compuesta/1",
        "title": "Comprobar líneas duplicadas",
        "code": "detalle.duplicated(['pedido_id','producto_id']).sum()",
        "hint": "Comprueba la clave al nivel de detalle correcto.",
        "textOutput": "0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
