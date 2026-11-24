// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/algebra-lineal/definicion",
    "remember": "Para resolver Ax=b, usa solve antes que calcular la inversa.",
    "examples": [
      {
        "id": "scipy/algebra-lineal/definicion/1",
        "title": "Resolver un sistema de costos",
        "code": "from scipy.linalg import solve\nprint(solve([[2,1],[1,1]], [8,5]))",
        "hint": "Se buscan dos cantidades que satisfacen ambas ecuaciones.",
        "textOutput": "[3. 2.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/algebra-lineal/solve",
    "remember": "La solución debe verificar A@x=b.",
    "examples": [
      {
        "id": "scipy/algebra-lineal/solve/1",
        "title": "Resolver y comprobar",
        "code": "from scipy.linalg import solve\nA = np.array([[2,1],[1,1]])\nb = np.array([8,5])\nx = solve(A,b)\nprint(x, A@x)",
        "hint": "El producto reconstruye b.",
        "textOutput": "[3. 2.] [8. 5.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/algebra-lineal/inv-det",
    "remember": "Determinante cero indica singularidad matemática; numéricamente no basta para medir condicionamiento.",
    "examples": [
      {
        "id": "scipy/algebra-lineal/inv-det/1",
        "title": "Calcular inversa y determinante",
        "code": "from scipy import linalg\nA = np.array([[2,0],[0,4]])\nprint(linalg.inv(A))\nprint(linalg.det(A))",
        "hint": "La inversa revierte la transformación lineal.",
        "textOutput": "[[0.5  0.  ]\n [0.   0.25]]\n8.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/algebra-lineal/eig",
    "remember": "A@v = lambda*v.",
    "examples": [
      {
        "id": "scipy/algebra-lineal/eig/1",
        "title": "Calcular autovalores",
        "code": "from scipy.linalg import eig\nw, v = eig([[2,0],[0,4]])\nprint(w.real)",
        "hint": "Los autovalores son factores de escala en las direcciones propias.",
        "textOutput": "[2. 4.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/algebra-lineal/svd",
    "remember": "Los valores singulares indican magnitud por componente.",
    "examples": [
      {
        "id": "scipy/algebra-lineal/svd/1",
        "title": "Obtener valores singulares",
        "code": "from scipy.linalg import svd\nu, s, vh = svd([[3,0],[0,1]], full_matrices=False)\nprint(s)",
        "hint": "Los valores se devuelven de mayor a menor.",
        "textOutput": "[3. 1.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/algebra-lineal/lstsq",
    "remember": "Minimiza la norma de Ax-b.",
    "examples": [
      {
        "id": "scipy/algebra-lineal/lstsq/1",
        "title": "Ajustar una recta a datos",
        "code": "from scipy.linalg import lstsq\nA = np.column_stack([publicidad, np.ones(5)])\ncoef, residuos, rango, s = lstsq(A, ingresos)\nprint(np.round(coef, 3))",
        "hint": "La primera columna de A multiplica pendiente y la segunda intercepto.",
        "textOutput": "[2.1 0.7]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
