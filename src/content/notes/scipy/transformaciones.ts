// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/transformaciones/definicion",
    "remember": "Una transformación no corrige por sí sola los supuestos de un modelo.",
    "examples": [
      {
        "id": "scipy/transformaciones/definicion/1",
        "title": "Contar pedidos por intervalo",
        "code": "r = stats.binned_statistic(ventas, ventas, statistic=\"count\", bins=[0, 150, 300])\nprint(r.statistic)",
        "hint": "Los intervalos no finales excluyen su extremo derecho.",
        "textOutput": "[4. 1.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/transformaciones/boxcox",
    "remember": "Requiere valores mayores que cero.",
    "examples": [
      {
        "id": "scipy/transformaciones/boxcox/1",
        "title": "Transformar importes positivos",
        "code": "y, lam = stats.boxcox(ventas)\nprint(np.round(y, 3), round(lam, 3))",
        "hint": "La función estima lambda y devuelve los datos transformados.",
        "textOutput": "[0.495 0.495 0.495 0.495 0.495] -2.019",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/transformaciones/yeojohnson",
    "remember": "Útil cuando Box-Cox no admite los datos.",
    "examples": [
      {
        "id": "scipy/transformaciones/yeojohnson/1",
        "title": "Transformar variaciones de ingresos",
        "code": "y, lam = stats.yeojohnson([-10, 0, 5, 10, 40])\nprint(np.round(y, 3), round(lam, 3))",
        "hint": "Se transforma cada variación conservando su orden.",
        "textOutput": "[-13.932   0.      3.999   7.282  23.245] 0.802",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/transformaciones/ecdf",
    "remember": "Cada observación aporta 1/n a la acumulada.",
    "examples": [
      {
        "id": "scipy/transformaciones/ecdf/1",
        "title": "Calcular fracción de pedidos hasta 120",
        "code": "r = stats.ecdf(ventas)\nprint(r.cdf.evaluate(120))",
        "hint": "Tres de cinco observaciones no superan 120.",
        "textOutput": "0.6",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/transformaciones/binned-statistic",
    "remember": "Los intervalos definen los grupos.",
    "examples": [
      {
        "id": "scipy/transformaciones/binned-statistic/1",
        "title": "Obtener importe medio por rango",
        "code": "r = stats.binned_statistic(ventas, ventas, statistic='mean', bins=[0, 150, 300])\nprint(r.statistic)",
        "hint": "Se calcula la media dentro de cada rango.",
        "textOutput": "[120. 220.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/transformaciones/entropy",
    "remember": "Más concentración implica menor entropía.",
    "examples": [
      {
        "id": "scipy/transformaciones/entropy/1",
        "title": "Comparar dos repartos de ventas",
        "code": "print(stats.entropy([50, 50], base=2))\nprint(round(stats.entropy([90, 10], base=2), 3))",
        "hint": "La función normaliza los conteos.",
        "textOutput": "1.0\n0.469",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/transformaciones/circmean",
    "remember": "23:00 y 01:00 están cerca de medianoche.",
    "examples": [
      {
        "id": "scipy/transformaciones/circmean/1",
        "title": "Promediar horas de actividad",
        "code": "h = stats.circmean([23, 1], high=24, low=0)\nprint(round(h % 24, 6) % 24)",
        "hint": "Se utiliza un ciclo de 24 horas.",
        "textOutput": "0.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
