// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/regresion/definicion",
    "remember": "Son útiles para explorar tendencias, no sustituyen un análisis inferencial completo.",
    "examples": [
      {
        "id": "seaborn/regresion/definicion/1",
        "title": "Estimar una tendencia lineal",
        "language": "python",
        "code": "sns.regplot(data=ventas, x=\"inversion\", y=\"ingresos\", ci=None)",
        "hint": "Ajusta una recta y conserva los puntos observados.",
        "textOutput": "Nube de puntos y recta de tendencia.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/regresion/regplot-y-ci",
    "remember": "En regresión se mantiene `ci`; no lo sustituyas por `errorbar`.",
    "examples": [
      {
        "id": "seaborn/regresion/regplot-y-ci/1",
        "title": "Mostrar incertidumbre del ajuste",
        "language": "python",
        "code": "sns.regplot(data=ventas, x=\"inversion\", y=\"ingresos\", ci=95, n_boot=500, seed=42)",
        "hint": "El intervalo se estima por bootstrap.",
        "textOutput": "Recta con banda de confianza del 95 %.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/regresion/regresion-polinomica",
    "remember": "Un grado mayor puede sobreajustar datos pequeños.",
    "examples": [
      {
        "id": "seaborn/regresion/regresion-polinomica/1",
        "title": "Ajustar una tendencia cuadrática",
        "language": "python",
        "code": "sns.regplot(data=ventas, x=\"inversion\", y=\"ingresos\", order=2, ci=None)",
        "hint": "El ajuste permite curvatura.",
        "textOutput": "Curva polinómica de grado 2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/regresion/logistic-lowess-y-robust",
    "remember": "Se usan por separado; requieren statsmodels.",
    "note": "No interpretes el desplazamiento visual de puntos como probabilidades reales.",
    "examples": [
      {
        "id": "seaborn/regresion/logistic-lowess-y-robust/1",
        "title": "Estimar la probabilidad de superar una meta",
        "language": "python",
        "code": "sns.regplot(data=ventas, x=\"inversion\", y=\"meta\", logistic=True, ci=None, y_jitter=.03)",
        "hint": "La respuesta vale 0 o 1; la curva estima probabilidad.",
        "textOutput": "Ajuste logístico entre 0 y 1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/regresion/suavizado-local-y-ajuste-robusto",
    "remember": "LOWESS y robust son modelos distintos; no combines sus opciones.",
    "examples": [
      {
        "id": "seaborn/regresion/suavizado-local-y-ajuste-robusto/1",
        "title": "Explorar una tendencia local",
        "language": "python",
        "code": "sns.regplot(data=ventas, x=\"inversion\", y=\"ingresos\", lowess=True, ci=None)",
        "hint": "Se ajusta localmente una curva a los datos.",
        "textOutput": "Curva suavizada junto a los puntos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/regresion/ajuste-robusto",
    "remember": "No significa que se eliminen automáticamente los datos atípicos.",
    "examples": [
      {
        "id": "seaborn/regresion/ajuste-robusto/1",
        "title": "Ajustar reduciendo influencia extrema",
        "language": "python",
        "code": "sns.regplot(data=ventas, x=\"inversion\", y=\"ingresos\", robust=True, ci=None)",
        "hint": "El ajuste da menos influencia a residuos grandes.",
        "textOutput": "Recta robusta sobre las observaciones.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/regresion/x-bins",
    "remember": "Los intervalos cambian la representación de puntos, no la regresión ajustada.",
    "examples": [
      {
        "id": "seaborn/regresion/x-bins/1",
        "title": "Resumir inversión en cuatro grupos",
        "language": "python",
        "code": "sns.regplot(data=ventas, x=\"inversion\", y=\"ingresos\", x_bins=4, ci=None)",
        "hint": "Los puntos visibles se resumen según los intervalos.",
        "textOutput": "Estimaciones agrupadas y línea de ajuste.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/regresion/lmplot",
    "remember": "Usa `hue`, `row` y `col` para separar ajustes.",
    "examples": [
      {
        "id": "seaborn/regresion/lmplot/1",
        "title": "Comparar tendencia por región",
        "language": "python",
        "code": "sns.lmplot(data=ventas, x=\"inversion\", y=\"ingresos\", col=\"region\", hue=\"canal\", ci=None)",
        "hint": "Se ajusta una recta por canal en cada región.",
        "textOutput": "Dos paneles con dos ajustes cada uno.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/regresion/residplot",
    "remember": "Patrones sistemáticos sugieren que el modelo no captura toda la estructura.",
    "examples": [
      {
        "id": "seaborn/regresion/residplot/1",
        "title": "Revisar errores del ajuste",
        "language": "python",
        "code": "sns.residplot(data=ventas, x=\"inversion\", y=\"ingresos\")",
        "hint": "Se examina si los residuos se distribuyen alrededor de cero.",
        "textOutput": "Puntos residuales y referencia horizontal en cero.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
