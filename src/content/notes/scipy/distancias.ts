// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/distancias/definicion",
    "remember": "Escala variables si una unidad domina la distancia.",
    "examples": [
      {
        "id": "scipy/distancias/definicion/1",
        "title": "Medir diferencia euclidiana entre dos perfiles",
        "code": "from scipy.spatial.distance import euclidean\nprint(euclidean([0,0],[3,4]))",
        "hint": "La distancia es la raíz de la suma de diferencias cuadradas.",
        "textOutput": "5.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/distancias/metricas",
    "remember": "Elige según significado de las dimensiones.",
    "examples": [
      {
        "id": "scipy/distancias/metricas/1",
        "title": "Comparar dos métricas",
        "code": "from scipy.spatial.distance import euclidean, cityblock\nprint(euclidean([0,0],[3,4]), cityblock([0,0],[3,4]))",
        "hint": "La primera mide línea recta y la segunda suma desplazamientos.",
        "textOutput": "5.0 7",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/distancias/cosine",
    "remember": "Vectores proporcionales positivos tienen distancia cero.",
    "examples": [
      {
        "id": "scipy/distancias/cosine/1",
        "title": "Comparar patrones de consumo",
        "code": "from scipy.spatial.distance import cosine\nprint(round(cosine([1,2],[2,4]), 6))",
        "hint": "Los patrones tienen la misma dirección.",
        "textOutput": "0.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/distancias/cdist-pdist",
    "remember": "pdist devuelve un vector condensado.",
    "examples": [
      {
        "id": "scipy/distancias/cdist-pdist/1",
        "title": "Calcular distancias entre perfiles",
        "code": "from scipy.spatial.distance import cdist, pdist\nx = [[0,0],[3,4],[0,4]]\nprint(cdist(x, [[0,0]]).ravel())\nprint(pdist(x))",
        "hint": "La segunda salida representa pares (0,1), (0,2), (1,2).",
        "textOutput": "[0. 5. 4.]\n[5. 4. 3.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/distancias/kdtree",
    "remember": "query devuelve distancia e índice.",
    "examples": [
      {
        "id": "scipy/distancias/kdtree/1",
        "title": "Buscar tienda más cercana",
        "code": "from scipy.spatial import KDTree\ntree = KDTree([[0,0],[3,4],[10,10]])\nd, i = tree.query([2,3])\nprint(round(d, 3), i)",
        "hint": "El índice identifica la segunda tienda.",
        "textOutput": "1.414 1",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
