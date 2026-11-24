// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/distribuciones/definicion",
    "remember": "Elige la distribución según el proceso, no solo por comodidad.",
    "examples": [
      {
        "id": "scipy/distribuciones/definicion/1",
        "title": "Consultar una normal estándar",
        "code": "print(stats.norm.cdf(0))",
        "hint": "La mitad de la normal estándar está por debajo de cero.",
        "textOutput": "0.5",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/distribuciones/norm",
    "remember": "scale es desviación, no varianza.",
    "examples": [
      {
        "id": "scipy/distribuciones/norm/1",
        "title": "Probabilidad de importe hasta 120",
        "code": "print(round(stats.norm.cdf(120, loc=100, scale=20), 4))",
        "hint": "Modelo ilustrativo con media 100 y desviación 20.",
        "textOutput": "0.8413",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/distribuciones/binom",
    "remember": "n es número de ensayos; p es probabilidad de éxito.",
    "examples": [
      {
        "id": "scipy/distribuciones/binom/1",
        "title": "Probabilidad de dos conversiones en cinco",
        "code": "print(round(stats.binom.pmf(2, n=5, p=0.2), 4))",
        "hint": "Se calcula la probabilidad de exactamente dos éxitos.",
        "textOutput": "0.2048",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/distribuciones/poisson",
    "remember": "mu representa eventos esperados por intervalo.",
    "examples": [
      {
        "id": "scipy/distribuciones/poisson/1",
        "title": "Probabilidad de cero incidencias",
        "code": "print(round(stats.poisson.pmf(0, mu=3), 4))",
        "hint": "Se supone una media de tres incidencias por periodo.",
        "textOutput": "0.0498",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/distribuciones/uniform",
    "remember": "El intervalo es loc hasta loc+scale.",
    "examples": [
      {
        "id": "scipy/distribuciones/uniform/1",
        "title": "Probabilidad de espera hasta 15 minutos",
        "code": "print(stats.uniform.cdf(15, loc=10, scale=20))",
        "hint": "El modelo abarca de 10 a 30 minutos.",
        "textOutput": "0.25",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/distribuciones/expon",
    "remember": "scale = 1/tasa.",
    "examples": [
      {
        "id": "scipy/distribuciones/expon/1",
        "title": "Probabilidad de esperar más de diez minutos",
        "code": "print(round(stats.expon.sf(10, scale=5), 4))",
        "hint": "La espera media es cinco minutos.",
        "textOutput": "0.1353",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/distribuciones/t",
    "remember": "Con df grande se aproxima a la normal.",
    "examples": [
      {
        "id": "scipy/distribuciones/t/1",
        "title": "Obtener valor crítico bilateral del 95%",
        "code": "print(round(stats.t.ppf(0.975, df=7), 4))",
        "hint": "Se deja 2.5% en cada cola.",
        "textOutput": "2.3646",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/distribuciones/chi2",
    "remember": "Su forma depende de df.",
    "examples": [
      {
        "id": "scipy/distribuciones/chi2/1",
        "title": "Obtener valor crítico superior",
        "code": "print(round(stats.chi2.ppf(0.95, df=2), 4))",
        "hint": "El 5% queda por encima del cuantil.",
        "textOutput": "5.9915",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/distribuciones/f",
    "remember": "Tiene grados de libertad de numerador y denominador.",
    "examples": [
      {
        "id": "scipy/distribuciones/f/1",
        "title": "Consultar un cuantil de F",
        "code": "print(round(stats.f.ppf(0.95, dfn=2, dfd=21), 4))",
        "hint": "Es un umbral de cola superior.",
        "textOutput": "3.4668",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/distribuciones/beta",
    "remember": "a y b son parámetros de forma positivos.",
    "examples": [
      {
        "id": "scipy/distribuciones/beta/1",
        "title": "Calcular media de una beta",
        "code": "print(stats.beta.mean(a=2, b=8))",
        "hint": "La media es a/(a+b).",
        "textOutput": "0.2",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
