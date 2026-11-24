// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/categorias-y-discretizacion/definicion",
    "remember": "Define categorías y límites según el significado del dato.",
    "examples": [
      {
        "id": "pandas/categorias-y-discretizacion/definicion/1",
        "title": "Ordenar prioridades",
        "code": "s = pd.Series(pd.Categorical(['alta','baja','media'],categories=['baja','media','alta'],ordered=True))\ns.sort_values()",
        "hint": "El orden puede diferir del alfabético.",
        "textOutput": "1     baja\n2    media\n0     alta\nCategories (3, object): ['baja' < 'media' < 'alta']",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/categorias-y-discretizacion/categorical",
    "remember": "El orden puede diferir del alfabético.",
    "examples": [
      {
        "id": "pandas/categorias-y-discretizacion/categorical/1",
        "title": "Ordenar prioridades",
        "code": "s = pd.Series(pd.Categorical(['alta','baja','media'],categories=['baja','media','alta'],ordered=True))\ns.sort_values()",
        "hint": "El orden puede diferir del alfabético.",
        "textOutput": "1     baja\n2    media\n0     alta\nCategories (3, object): ['baja' < 'media' < 'alta']",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/categorias-y-discretizacion/cut",
    "remember": "right controla el extremo derecho incluido.",
    "examples": [
      {
        "id": "pandas/categorias-y-discretizacion/cut/1",
        "title": "Clasificar montos en intervalos",
        "code": "pd.cut(pedidos['monto'],bins=[0,100,200,300],labels=['bajo','medio','alto'],include_lowest=True)",
        "hint": "right controla el extremo derecho incluido.",
        "textOutput": "0     bajo\n1    medio\n2    medio\n3    medio\n4     bajo\n5     alto\n6    medio\nCategories (3, object): ['bajo' < 'medio' < 'alto']",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/categorias-y-discretizacion/qcut",
    "remember": "Empates pueden producir límites repetidos; duplicates='drop' reduce intervalos.",
    "examples": [
      {
        "id": "pandas/categorias-y-discretizacion/qcut/1",
        "title": "Dividir ventas por cuantiles",
        "code": "pd.qcut(pedidos['monto'],q=2,duplicates='drop').value_counts(sort=False)",
        "hint": "Empates pueden producir límites repetidos; duplicates='drop' reduce intervalos.",
        "textOutput": "monto\n(49.999, 150.0]    4\n(150.0, 300.0]     3",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/categorias-y-discretizacion/get-dummies",
    "remember": "dummy_na=True hace explícita una categoría de ausencia.",
    "examples": [
      {
        "id": "pandas/categorias-y-discretizacion/get-dummies/1",
        "title": "Codificar estados",
        "code": "pd.get_dummies(pedidos['estado'],prefix='estado',dtype=int).head(3)",
        "hint": "dummy_na=True hace explícita una categoría de ausencia.",
        "textOutput": "   estado_cancelado  estado_completado\n0                 0                  1\n1                 0                  1\n2                 1                  0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/categorias-y-discretizacion/factorize",
    "remember": "Por defecto -1 identifica ausentes; los códigos no representan magnitud.",
    "examples": [
      {
        "id": "pandas/categorias-y-discretizacion/factorize/1",
        "title": "Codificar países",
        "code": "codigos, etiquetas = pd.factorize(clientes['pais'])\ncodigos.tolist(), etiquetas.tolist()",
        "hint": "Por defecto -1 identifica ausentes; los códigos no representan magnitud.",
        "textOutput": "([0, 0, 1, -1, 1], ['MX', 'ES'])",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
