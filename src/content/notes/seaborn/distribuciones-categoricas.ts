// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/distribuciones-categoricas/definicion",
    "remember": "Usa cajas, violines o puntos para comparar dispersión y valores extremos.",
    "examples": [
      {
        "id": "seaborn/distribuciones-categoricas/definicion/1",
        "title": "Comparar ingresos entre canales",
        "language": "python",
        "code": "sns.boxplot(data=ventas, x=\"canal\", y=\"ingresos\")",
        "hint": "Cada caja resume los valores de un canal.",
        "textOutput": "Dos cajas con medianas y bigotes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/distribuciones-categoricas/boxplot",
    "remember": "Un punto fuera de los bigotes es un posible atípico, no un error confirmado.",
    "examples": [
      {
        "id": "seaborn/distribuciones-categoricas/boxplot/1",
        "title": "Ver mediana y dispersión",
        "language": "python",
        "code": "sns.boxplot(data=ventas, x=\"region\", y=\"ingresos\")",
        "hint": "Se compara el IQR y los posibles atípicos por región.",
        "textOutput": "Dos cajas, con medianas Norte 120 y Sur 140.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/distribuciones-categoricas/whis-showfliers-y-showmeans",
    "remember": "Ocultar atípicos no los elimina de los datos.",
    "examples": [
      {
        "id": "seaborn/distribuciones-categoricas/whis-showfliers-y-showmeans/1",
        "title": "Mostrar la media y mantener los atípicos",
        "language": "python",
        "code": "sns.boxplot(data=ventas, x=\"canal\", y=\"ingresos\", whis=1.5, showfliers=True, showmeans=True)",
        "hint": "Se añade un marcador para la media.",
        "textOutput": "Cajas con medianas y marcadores de media.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/distribuciones-categoricas/violinplot",
    "remember": "Con muestras pequeñas, la forma suavizada puede resultar engañosa.",
    "examples": [
      {
        "id": "seaborn/distribuciones-categoricas/violinplot/1",
        "title": "Comparar forma y cuartiles",
        "language": "python",
        "code": "sns.violinplot(data=ventas, x=\"canal\", y=\"ingresos\", inner=\"quart\", cut=0)",
        "hint": "El interior marca cuartiles y el contorno la densidad.",
        "textOutput": "Dos violines limitados al rango observado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/distribuciones-categoricas/stripplot",
    "remember": "El desplazamiento lateral evita superposición; no altera la medida numérica.",
    "examples": [
      {
        "id": "seaborn/distribuciones-categoricas/stripplot/1",
        "title": "Mostrar observaciones por región",
        "language": "python",
        "code": "sns.stripplot(data=ventas, x=\"region\", y=\"ingresos\", jitter=.15, alpha=.7)",
        "hint": "Se dispersan ligeramente los puntos sobre el eje categórico.",
        "textOutput": "Ocho puntos por región.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/distribuciones-categoricas/swarmplot",
    "remember": "Puede ser lento o no encontrar espacio cuando hay muchos puntos.",
    "examples": [
      {
        "id": "seaborn/distribuciones-categoricas/swarmplot/1",
        "title": "Ver observaciones separadas",
        "language": "python",
        "code": "sns.swarmplot(data=ventas, x=\"region\", y=\"ingresos\", size=5)",
        "hint": "Los puntos se distribuyen evitando solapamientos cuando hay espacio.",
        "textOutput": "Dos grupos de ocho observaciones.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/distribuciones-categoricas/boxenplot",
    "remember": "Es más informativo con conjuntos grandes que con muestras pequeñas.",
    "examples": [
      {
        "id": "seaborn/distribuciones-categoricas/boxenplot/1",
        "title": "Explorar una distribución amplia",
        "language": "python",
        "code": "sns.boxenplot(data=simulacion, x=\"canal\", y=\"ingresos\")",
        "hint": "Cada grupo contiene suficientes registros simulados para observar cuantiles adicionales.",
        "textOutput": "Dos conjuntos de cajas anidadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/distribuciones-categoricas/catplot",
    "remember": "Selecciona `kind` y luego configura facetas.",
    "examples": [
      {
        "id": "seaborn/distribuciones-categoricas/catplot/1",
        "title": "Comparar cajas por región",
        "language": "python",
        "code": "sns.catplot(data=ventas, x=\"canal\", y=\"ingresos\", col=\"region\", kind=\"box\")",
        "hint": "Cada región recibe un panel con sus dos canales.",
        "textOutput": "Dos paneles de boxplots.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
