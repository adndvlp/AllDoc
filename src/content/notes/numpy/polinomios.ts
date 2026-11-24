// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/polinomios/definicion",
    "remember": "Polynomial ordena coeficientes de menor a mayor grado; polyfit clásico usa el orden inverso.",
    "examples": [
      {
        "id": "numpy/polinomios/definicion/1",
        "title": "Evaluar una función de costo lineal",
        "code": "from numpy.polynomial import Polynomial\np = Polynomial([100, 20])\nprint(p(np.array([0, 2, 5])))",
        "hint": "Polynomial ordena coeficientes de menor a mayor grado; polyfit clásico usa el orden inverso.",
        "textOutput": "[100. 140. 200.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/polinomios/polynomial-y-evaluacion",
    "remember": "Llamar al objeto evalúa el polinomio en los puntos indicados.",
    "examples": [
      {
        "id": "numpy/polinomios/polynomial-y-evaluacion/1",
        "title": "Evaluar una función de costo lineal",
        "code": "from numpy.polynomial import Polynomial\np = Polynomial([100, 20])\nprint(p(np.array([0, 2, 5])))",
        "hint": "Llamar al objeto evalúa el polinomio en los puntos indicados.",
        "textOutput": "[100. 140. 200.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/polinomios/polynomial-fit",
    "remember": "A mayor grado puede haber sobreajuste; no extrapoles sin validar.",
    "examples": [
      {
        "id": "numpy/polinomios/polynomial-fit/1",
        "title": "Ajustar una tendencia lineal de ventas",
        "code": "from numpy.polynomial import Polynomial\np = Polynomial.fit([1, 2, 3], [100, 200, 300], deg=1)\nprint(p(4).round(2))\nprint(p.convert().coef.round(2))",
        "hint": "A mayor grado puede haber sobreajuste; no extrapoles sin validar.",
        "textOutput": "400.0\n[  0. 100.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/polinomios/operaciones-y-derivadas",
    "remember": "deriv devuelve otro polinomio que representa el cambio instantáneo.",
    "examples": [
      {
        "id": "numpy/polinomios/operaciones-y-derivadas/1",
        "title": "Obtener costo marginal de una función cuadrática",
        "code": "from numpy.polynomial import Polynomial\np = Polynomial([100, 20, 2])\nprint(p.deriv().coef)\nprint(p.deriv()(3))",
        "hint": "deriv devuelve otro polinomio que representa el cambio instantáneo.",
        "textOutput": "[20.  4.]\n32.0",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
