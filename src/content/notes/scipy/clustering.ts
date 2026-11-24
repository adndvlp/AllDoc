// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/clustering/definicion",
    "remember": "Valida que los grupos sean útiles, no solo que existan.",
    "examples": [
      {
        "id": "scipy/clustering/definicion/1",
        "title": "Formar grupos jerárquicos de clientes",
        "code": "from scipy.cluster.hierarchy import linkage, fcluster\nx = [[0,0],[0,1],[10,10],[10,11]]\nz = linkage(x, method=\"ward\")\nprint(fcluster(z, t=2, criterion=\"maxclust\"))",
        "hint": "Los clientes cercanos se agrupan; los identificadores son arbitrarios.",
        "textOutput": "[1 1 2 2]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/clustering/linkage",
    "remember": "Ward utiliza distancia euclidiana y minimiza aumento de dispersión interna.",
    "examples": [
      {
        "id": "scipy/clustering/linkage/1",
        "title": "Observar alturas de fusiones",
        "code": "from scipy.cluster.hierarchy import linkage\nz = linkage([[0,0],[0,1],[10,10],[10,11]], method='ward')\nprint(np.round(z[:,2], 3))",
        "hint": "Las últimas fusiones unen grupos más distantes.",
        "textOutput": "[ 1.  1. 20.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/clustering/dendrogram",
    "remember": "La altura ayuda a elegir un corte, no garantiza grupos reales.",
    "examples": [
      {
        "id": "scipy/clustering/dendrogram/1",
        "title": "Obtener orden de hojas sin dibujar",
        "code": "from scipy.cluster.hierarchy import linkage, dendrogram\nz = linkage([[0,0],[0,1],[10,10],[10,11]], method='ward')\nr = dendrogram(z, no_plot=True)\nprint(r['leaves'])",
        "hint": "Para graficar usa dendrogram(z) con Matplotlib instalado.",
        "textOutput": "[0, 1, 2, 3]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/clustering/fcluster",
    "remember": "Las etiquetas no tienen orden de calidad.",
    "examples": [
      {
        "id": "scipy/clustering/fcluster/1",
        "title": "Cortar por distancia",
        "code": "from scipy.cluster.hierarchy import linkage, fcluster\nz = linkage([[0,0],[0,1],[10,10],[10,11]], method='ward')\nprint(fcluster(z, t=2, criterion='distance'))",
        "hint": "Se separan las dos zonas de puntos.",
        "textOutput": "[1 1 2 2]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/clustering/kmeans",
    "remember": "Escala datos y comprueba estabilidad del resultado.",
    "examples": [
      {
        "id": "scipy/clustering/kmeans/1",
        "title": "Obtener centroides y asignaciones",
        "code": "from scipy.cluster.vq import kmeans, vq\nx = np.array([[0.,0.],[0.,1.],[10.,10.],[10.,11.]])\ncentros, dist = kmeans(x, np.array([[0.,0.],[10.,10.]]))\nprint(centros)\nprint(vq(x, centros)[0])",
        "hint": "Se inicializa con dos centroides para reproducibilidad.",
        "textOutput": "[[ 0.   0.5]\n [10.  10.5]]\n[0 0 1 1]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
