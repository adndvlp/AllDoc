// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/optimizacion/definicion",
    "remember": "Define objetivo, variables, restricciones y verifica el resultado.",
    "examples": [
      {
        "id": "scipy/optimizacion/definicion/1",
        "title": "Minimizar un costo cuadrático",
        "code": "from scipy.optimize import minimize\nr = minimize(lambda x: (x[0]-4)**2+10, x0=[0])\nprint(r.success, np.round(r.x, 3), round(r.fun, 3))",
        "hint": "El costo mínimo ocurre cerca de x=4.",
        "textOutput": "True [4.] 10.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/optimizacion/minimize",
    "remember": "Un óptimo local no garantiza el global.",
    "examples": [
      {
        "id": "scipy/optimizacion/minimize/1",
        "title": "Optimizar nivel de inventario entre 0 y 3",
        "code": "from scipy.optimize import minimize\nr = minimize(lambda x: (x[0]-4)**2, x0=[0], bounds=[(0,3)])\nprint(r.success, np.round(r.x, 3))",
        "hint": "El límite superior impide llegar a cuatro.",
        "textOutput": "True [3.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/optimizacion/linprog",
    "remember": "Maximizar beneficio = minimizar su negativo.",
    "examples": [
      {
        "id": "scipy/optimizacion/linprog/1",
        "title": "Asignar recursos para maximizar beneficio",
        "code": "from scipy.optimize import linprog\nr = linprog([-3,-2], A_ub=[[1,1],[2,1]], b_ub=[4,6], bounds=[(0,None),(0,None)], method='highs')\nprint(r.success, np.round(r.x, 3), round(-r.fun, 3))",
        "hint": "Las variables son continuas; no obliga a cantidades enteras.",
        "textOutput": "True [2. 2.] 10.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/optimizacion/root",
    "remember": "Comprueba que el residuo sea cercano a cero.",
    "examples": [
      {
        "id": "scipy/optimizacion/root/1",
        "title": "Encontrar punto de equilibrio",
        "code": "from scipy.optimize import root\nr = root(lambda x: 30*x-120, x0=[1])\nprint(r.success, np.round(r.x, 3))",
        "hint": "El beneficio 30x-120 se hace cero con cuatro unidades.",
        "textOutput": "True [4.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/optimizacion/curve-fit",
    "remember": "Devuelve parámetros y covarianza estimada.",
    "examples": [
      {
        "id": "scipy/optimizacion/curve-fit/1",
        "title": "Ajustar modelo de respuesta cuadrática",
        "code": "from scipy.optimize import curve_fit\ndef modelo(x, a, b):\n    return a*x**2+b\np, cov = curve_fit(modelo, publicidad, [3,9,19,33,51])\nprint(np.round(p, 3))",
        "hint": "Se estima a y b de una curva definida previamente.",
        "textOutput": "[2. 1.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/optimizacion/least-squares",
    "remember": "La función objetivo debe devolver residuos, no su suma cuadrada.",
    "examples": [
      {
        "id": "scipy/optimizacion/least-squares/1",
        "title": "Ajustar recta con residuos explícitos",
        "code": "from scipy.optimize import least_squares\nr = least_squares(lambda p: p[0]*publicidad+p[1]-ingresos, x0=[0,0])\nprint(r.success, np.round(r.x, 3))",
        "hint": "Los dos parámetros corresponden a pendiente e intercepto.",
        "textOutput": "True [2.1 0.7]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
