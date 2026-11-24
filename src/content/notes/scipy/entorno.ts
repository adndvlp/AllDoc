// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/entorno/definicion",
    "remember": "NumPy aporta arreglos; SciPy aporta algoritmos.",
    "examples": [
      {
        "id": "scipy/entorno/definicion/1",
        "title": "Importar estadística y obtener el promedio",
        "code": "from scipy import stats\nprint(round(stats.describe(ventas).mean, 2))",
        "hint": "`stats` es el submódulo de estadística.",
        "textOutput": "140.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/entorno/importacion",
    "remember": "Importa solo lo que necesitas.",
    "examples": [
      {
        "id": "scipy/entorno/importacion/1",
        "title": "Obtener el rango intercuartílico con importación directa",
        "code": "from scipy.stats import iqr\nprint(iqr(ventas))",
        "hint": "`iqr` queda disponible directamente.",
        "textOutput": "20.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/entorno/axis",
    "remember": "axis=0 reduce filas; axis=1 reduce columnas en 2D.",
    "examples": [
      {
        "id": "scipy/entorno/axis/1",
        "title": "Calcular la media por sucursal y por periodo",
        "code": "print(stats.describe(matriz, axis=1).mean)\nprint(stats.describe(matriz, axis=0).mean)",
        "hint": "El primer resultado resume cada fila y el segundo cada columna.",
        "textOutput": "[20. 50.]\n[25. 35. 45.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/entorno/nan-policy",
    "remember": "Omitir no equivale a reemplazar por cero.",
    "note": "No todas las funciones aceptan nan_policy; comprueba su firma.",
    "examples": [
      {
        "id": "scipy/entorno/nan-policy/1",
        "title": "Obtener el error estándar sin datos ausentes",
        "code": "print(round(stats.sem(ventas_nan, nan_policy='omit'), 3))",
        "hint": "Se analizan cuatro valores válidos.",
        "textOutput": "26.3",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/entorno/resultados",
    "remember": "Consulta atributos por nombre.",
    "examples": [
      {
        "id": "scipy/entorno/resultados/1",
        "title": "Leer tamaño y media del resumen",
        "code": "r = stats.describe(ventas)\nprint(r.nobs, r.mean)",
        "hint": "`nobs` es el número de observaciones.",
        "textOutput": "5 140.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/entorno/rng",
    "remember": "Crea un generador nuevo con la misma semilla para repetir.",
    "note": "En APIs recientes de remuestreo se usa rng; muchas distribuciones aún usan random_state.",
    "examples": [
      {
        "id": "scipy/entorno/rng/1",
        "title": "Repetir una muestra simulada",
        "code": "a = stats.norm.rvs(size=4, random_state=np.random.default_rng(42))\nb = stats.norm.rvs(size=4, random_state=np.random.default_rng(42))\nprint(np.array_equal(a, b))",
        "hint": "Los dos generadores comienzan en el mismo estado.",
        "textOutput": "True",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
