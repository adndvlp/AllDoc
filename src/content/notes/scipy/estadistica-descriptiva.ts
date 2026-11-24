// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/estadistica-descriptiva/definicion",
    "remember": "Describe primero los datos antes de inferir.",
    "examples": [
      {
        "id": "scipy/estadistica-descriptiva/definicion/1",
        "title": "Resumir importes de pedidos",
        "code": "r = stats.describe(ventas)\nprint(r.nobs, r.minmax, r.mean)",
        "hint": "El resultado incluye tamaño, mínimo, máximo y media.",
        "textOutput": "5 (np.float64(100.0), np.float64(220.0)) 140.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/estadistica-descriptiva/centro",
    "remember": "La mediana resiste mejor valores extremos.",
    "note": "Si hay empate, mode devuelve una sola moda.",
    "examples": [
      {
        "id": "scipy/estadistica-descriptiva/centro/1",
        "title": "Comparar medidas de centro",
        "code": "print(np.mean(ventas), np.median(ventas))\nr = stats.mode(ventas)\nprint(r.mode, r.count)",
        "hint": "mode devuelve también la frecuencia de la moda.",
        "textOutput": "140.0 120.0\n120.0 2",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/estadistica-descriptiva/dispersion",
    "remember": "ddof=1 usa divisor n-1; ddof=0 usa n.",
    "examples": [
      {
        "id": "scipy/estadistica-descriptiva/dispersion/1",
        "title": "Calcular dispersión muestral",
        "code": "print(round(np.var(ventas, ddof=1), 2))\nprint(round(np.std(ventas, ddof=1), 2))",
        "hint": "Se estima la dispersión a partir de una muestra.",
        "textOutput": "2200.0\n46.9",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/estadistica-descriptiva/gmean",
    "remember": "Promedia factores, no porcentajes directamente.",
    "examples": [
      {
        "id": "scipy/estadistica-descriptiva/gmean/1",
        "title": "Calcular crecimiento medio de dos periodos",
        "code": "factores = [1.10, 1.21]\nprint(round((stats.gmean(factores)-1)*100, 2))",
        "hint": "Se resta uno al factor medio para obtener el porcentaje.",
        "textOutput": "15.37",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/estadistica-descriptiva/hmean",
    "remember": "No uses media aritmética para tasas con numerador constante.",
    "examples": [
      {
        "id": "scipy/estadistica-descriptiva/hmean/1",
        "title": "Promediar productividad en lotes iguales",
        "code": "print(round(stats.hmean([10, 20]), 2))",
        "hint": "Dos lotes iguales procesados a distintas tasas.",
        "textOutput": "13.33",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/estadistica-descriptiva/sem",
    "remember": "SEM = desviación muestral / raíz de n.",
    "examples": [
      {
        "id": "scipy/estadistica-descriptiva/sem/1",
        "title": "Estimar incertidumbre de la media",
        "code": "print(round(stats.sem(ventas), 3))",
        "hint": "No es la dispersión de los pedidos individuales.",
        "textOutput": "20.976",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/estadistica-descriptiva/skew",
    "remember": "Positiva indica cola hacia valores altos.",
    "examples": [
      {
        "id": "scipy/estadistica-descriptiva/skew/1",
        "title": "Medir asimetría de importes",
        "code": "print(round(stats.skew(ventas, bias=False), 3))",
        "hint": "El importe 220 alarga la cola derecha.",
        "textOutput": "1.744",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/estadistica-descriptiva/kurtosis",
    "remember": "fisher=True compara con normal = 0.",
    "examples": [
      {
        "id": "scipy/estadistica-descriptiva/kurtosis/1",
        "title": "Calcular exceso de curtosis",
        "code": "print(round(stats.kurtosis(ventas, fisher=True, bias=False), 3))",
        "hint": "El valor es una estimación de exceso, no una prueba de normalidad.",
        "textOutput": "3.322",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/estadistica-descriptiva/moment",
    "remember": "El segundo momento central con divisor n es la varianza poblacional.",
    "examples": [
      {
        "id": "scipy/estadistica-descriptiva/moment/1",
        "title": "Calcular segundo momento",
        "code": "print(stats.moment(ventas, order=2))",
        "hint": "Se eleva al cuadrado la distancia de cada dato a la media.",
        "textOutput": "1760.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/estadistica-descriptiva/variation",
    "remember": "Tiene sentido en escalas de razón y con media positiva alejada de cero.",
    "examples": [
      {
        "id": "scipy/estadistica-descriptiva/variation/1",
        "title": "Medir variabilidad relativa",
        "code": "print(round(stats.variation(ventas, ddof=1)*100, 2))",
        "hint": "El resultado está en porcentaje.",
        "textOutput": "33.5",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
