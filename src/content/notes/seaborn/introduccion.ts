// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/introduccion/definicion",
    "remember": "Seaborn transforma datos en gráficos; Matplotlib permite ajustar el resultado.",
    "examples": [
      {
        "id": "seaborn/introduccion/definicion/1",
        "title": "Dibujar ventas frente a inversión",
        "language": "python",
        "code": "sns.scatterplot(data=ventas, x=\"inversion\", y=\"ingresos\")",
        "hint": "Cada fila se representa mediante un punto. La gráfica se muestra en Resultado.",
        "textOutput": "Un diagrama de dispersión de inversión e ingresos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/introduccion/importacion-y-version",
    "remember": "Importar la biblioteca no crea un gráfico.",
    "examples": [
      {
        "id": "seaborn/introduccion/importacion-y-version/1",
        "title": "Comprobar la versión",
        "language": "python",
        "code": "import seaborn as sns\nprint(sns.__version__)",
        "hint": "Consulta la versión instalada.",
        "textOutput": "`0.13.2` si se siguió el entorno propuesto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/introduccion/datasets-de-ejemplo",
    "remember": "No es el método para leer archivos propios; usa pandas para ellos.",
    "note": "Requiere conexión la primera vez; los demás ejemplos no dependen de internet.",
    "examples": [
      {
        "id": "seaborn/introduccion/datasets-de-ejemplo/1",
        "title": "Cargar propinas",
        "language": "python",
        "code": "tips = sns.load_dataset(\"tips\")\nprint(tips.columns.tolist())",
        "hint": "El dataset permite practicar con datos externos. Ejecuta este ejemplo en Python local con acceso a Internet.",
        "textOutput": "Columnas `total_bill`, `tip`, `sex`, `smoker`, `day`, `time` y `size`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/introduccion/figure-y-axes",
    "remember": "Un Axes no es lo mismo que un eje X o Y.",
    "examples": [
      {
        "id": "seaborn/introduccion/figure-y-axes/1",
        "title": "Crear un área de dibujo",
        "language": "python",
        "code": "fig, ax = plt.subplots(figsize=(6, 4))\nsns.scatterplot(data=ventas, x=\"inversion\", y=\"ingresos\", ax=ax)",
        "hint": "`ax` especifica el destino del gráfico.",
        "textOutput": "Una figura de 6 × 4 pulgadas con un gráfico.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/introduccion/axes-level-y-figure-level",
    "remember": "`scatterplot` acepta `ax`; `relplot` crea su propia figura.",
    "note": "No pases `ax` a funciones figure-level.",
    "examples": [
      {
        "id": "seaborn/introduccion/axes-level-y-figure-level/1",
        "title": "Comparar las interfaces",
        "language": "python",
        "code": "ax = sns.scatterplot(data=ventas, x=\"inversion\", y=\"ingresos\")\nplt.show()\ng = sns.relplot(data=ventas, x=\"inversion\", y=\"ingresos\")\nprint(type(ax).__name__, type(g).__name__)",
        "hint": "Las dos interfaces producen gráficos similares, pero se personalizan de forma distinta.",
        "textOutput": "`Axes FacetGrid`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
