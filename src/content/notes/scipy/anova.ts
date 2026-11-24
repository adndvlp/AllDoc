// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/anova/definicion",
    "remember": "ANOVA global primero; comparaciones específicas después según el diseño.",
    "examples": [
      {
        "id": "scipy/anova/definicion/1",
        "title": "Contrastar tres canales",
        "code": "r = stats.f_oneway(canal_a, canal_b, canal_c)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "ANOVA clásica presupone independencia, normalidad aproximada de residuos y varianzas iguales.",
        "textOutput": "8.6365 0.0018",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/anova/anova-welch",
    "remember": "equal_var=False cambia a Welch.",
    "note": "Disponible desde SciPy 1.16.",
    "examples": [
      {
        "id": "scipy/anova/anova-welch/1",
        "title": "Comparar tres canales con varianzas distintas",
        "code": "r = stats.f_oneway(canal_a, canal_b, canal_c, equal_var=False)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "El contraste adapta el cálculo a las varianzas de cada grupo.",
        "textOutput": "7.6657 0.0061",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/anova/tukey-hsd",
    "remember": "La matriz pvalue contiene un contraste por par.",
    "note": "Con equal_var=False usa Games-Howell en SciPy 1.17.",
    "examples": [
      {
        "id": "scipy/anova/tukey-hsd/1",
        "title": "Evaluar A contra C",
        "code": "r = stats.tukey_hsd(canal_a, canal_b, canal_c)\nprint(round(r.statistic[0, 2], 3), round(r.pvalue[0, 2], 4))",
        "hint": "Se lee la comparación de los grupos en posiciones 0 y 2.",
        "textOutput": "-37.75 0.0013",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/anova/dunnett",
    "remember": "Usa Dunnett si solo interesan comparaciones contra control.",
    "note": "Asume muestras independientes, normalidad y varianzas iguales.",
    "examples": [
      {
        "id": "scipy/anova/dunnett/1",
        "title": "Comparar B y C con A",
        "code": "r = stats.dunnett(canal_b, canal_c, control=canal_a, rng=np.random.default_rng(42))\nprint(np.round(r.pvalue, 4))",
        "hint": "Cada p-value corresponde a un tratamiento frente al control A.",
        "textOutput": "[0.1945 0.0009]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
