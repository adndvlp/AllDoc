// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/interpolacion/definicion",
    "remember": "Interpolar dentro del rango; extrapolar exige supuestos adicionales.",
    "examples": [
      {
        "id": "scipy/interpolacion/definicion/1",
        "title": "Interpolar un precio entre dos fechas",
        "code": "from scipy.interpolate import PchipInterpolator\nf = PchipInterpolator([1,3,5], [10,20,30], extrapolate=False)\nprint(float(f(2)))",
        "hint": "El día 2 queda entre observaciones de los días 1 y 3.",
        "textOutput": "15.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/interpolacion/cubic-spline",
    "remember": "Una curva suave puede sobrepasar los datos.",
    "examples": [
      {
        "id": "scipy/interpolacion/cubic-spline/1",
        "title": "Interpolar una trayectoria cuadrática",
        "code": "from scipy.interpolate import CubicSpline\nf = CubicSpline([0,1,2,3], [0,1,4,9])\nprint(round(float(f(1.5)), 3))",
        "hint": "Se consulta entre dos puntos conocidos.",
        "textOutput": "2.25",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/interpolacion/pchip",
    "remember": "Evita oscilaciones innecesarias de otros splines.",
    "examples": [
      {
        "id": "scipy/interpolacion/pchip/1",
        "title": "Estimar valor intermedio de una tarifa",
        "code": "from scipy.interpolate import PchipInterpolator\nf = PchipInterpolator([0,1,2], [0,10,20])\nprint(float(f(0.5)))",
        "hint": "Los datos son lineales en este ejemplo.",
        "textOutput": "5.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/interpolacion/regular-grid",
    "remember": "Las dimensiones de values deben coincidir con los ejes.",
    "examples": [
      {
        "id": "scipy/interpolacion/regular-grid/1",
        "title": "Estimar demanda entre niveles de precio y publicidad",
        "code": "from scipy.interpolate import RegularGridInterpolator\nf = RegularGridInterpolator(([10,20],[1,2]), [[100,120],[80,100]])\nprint(f([[15,1.5]]))",
        "hint": "Se consulta la mitad de ambos ejes.",
        "textOutput": "[100.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
