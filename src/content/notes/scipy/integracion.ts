// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/integracion/definicion",
    "remember": "Distingue integrar una función de integrar datos muestreados.",
    "examples": [
      {
        "id": "scipy/integracion/definicion/1",
        "title": "Integrar una tasa de ingresos",
        "code": "from scipy.integrate import quad\nr, error = quad(lambda t: 2*t, 0, 3)\nprint(round(r, 3))",
        "hint": "El ingreso acumulado es el área bajo la tasa instantánea.",
        "textOutput": "9.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/integracion/quad",
    "remember": "La segunda salida es estimación del error de integración.",
    "examples": [
      {
        "id": "scipy/integracion/quad/1",
        "title": "Integrar demanda instantánea",
        "code": "from scipy.integrate import quad\nr, err = quad(lambda x: x**2, 0, 3)\nprint(round(r, 3))",
        "hint": "La integral definida vale nueve.",
        "textOutput": "9.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/integracion/trapezoid",
    "remember": "Proporciona x para intervalos irregulares.",
    "examples": [
      {
        "id": "scipy/integracion/trapezoid/1",
        "title": "Acumular una tasa medida en tres instantes",
        "code": "from scipy.integrate import trapezoid\nprint(trapezoid([10,20,30], x=[0,1,3]))",
        "hint": "Las anchuras de los intervalos son uno y dos.",
        "textOutput": "65.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/integracion/solve-ivp",
    "remember": "Define derivada, tiempo e inicial.",
    "examples": [
      {
        "id": "scipy/integracion/solve-ivp/1",
        "title": "Simular crecimiento continuo del 10%",
        "code": "from scipy.integrate import solve_ivp\nr = solve_ivp(lambda t,y: 0.1*y, (0,2), [100], t_eval=[0,1,2], rtol=1e-9, atol=1e-9)\nprint(np.round(r.y[0], 2))",
        "hint": "El modelo aproxima 100*exp(0.1*t).",
        "textOutput": "[100.   110.52 122.14]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
