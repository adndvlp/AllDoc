// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/mapas-de-calor/definicion",
    "remember": "La matriz puede contener correlaciones, totales o cualquier medida comparable.",
    "examples": [
      {
        "id": "seaborn/mapas-de-calor/definicion/1",
        "title": "Mostrar ingresos por región y canal",
        "language": "python",
        "code": "sns.heatmap(matriz, annot=True, fmt=\".0f\", cmap=\"Blues\")",
        "hint": "El color representa el total de cada combinación.",
        "textOutput": "Cuatro celdas etiquetadas: 520, 440, 600 y 520.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/mapas-de-calor/correlacion-con-corr",
    "remember": "Una correlación próxima a 0 no descarta una relación no lineal ni implica independencia.",
    "examples": [
      {
        "id": "seaborn/mapas-de-calor/correlacion-con-corr/1",
        "title": "Mostrar correlaciones de negocio",
        "language": "python",
        "code": "corr = ventas[[\"ingresos\", \"inversion\", \"pedidos\", \"satisfaccion\"]].corr()\nsns.heatmap(corr, annot=True, vmin=-1, vmax=1, cmap=\"vlag\", center=0)",
        "hint": "Los colores negativos y positivos se distinguen con una escala simétrica.",
        "textOutput": "Matriz 4 × 4, con unos en la diagonal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/mapas-de-calor/annot-y-fmt",
    "remember": "El formato cambia la presentación, no los valores originales.",
    "examples": [
      {
        "id": "seaborn/mapas-de-calor/annot-y-fmt/1",
        "title": "Anotar los totales sin decimales",
        "language": "python",
        "code": "sns.heatmap(matriz, annot=True, fmt=\".0f\")",
        "hint": "Cada celda muestra el total sin decimales.",
        "textOutput": "Matriz 2 × 2 con números enteros visibles.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/mapas-de-calor/cmap-center-vmin-y-vmax",
    "remember": "Para correlación conviene usar límites -1 y 1.",
    "examples": [
      {
        "id": "seaborn/mapas-de-calor/cmap-center-vmin-y-vmax/1",
        "title": "Usar colores comparables",
        "language": "python",
        "code": "sns.heatmap(matriz, cmap=\"crest\", vmin=0, vmax=700)",
        "hint": "Todas las celdas se colorean dentro de la misma escala.",
        "textOutput": "Barra de color desde 0 hasta 700.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/mapas-de-calor/mask",
    "remember": "Es útil para quitar la mitad redundante de una matriz simétrica.",
    "examples": [
      {
        "id": "seaborn/mapas-de-calor/mask/1",
        "title": "Mostrar solo media matriz",
        "language": "python",
        "code": "corr = ventas[[\"ingresos\", \"inversion\", \"pedidos\"]].corr()\nsns.heatmap(corr, mask=np.triu(np.ones_like(corr, dtype=bool), k=1), annot=True, cmap=\"vlag\", vmin=-1, vmax=1)",
        "hint": "Se oculta el triángulo superior por encima de la diagonal.",
        "textOutput": "Seis celdas visibles de las nueve originales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/mapas-de-calor/linewidths-square-y-colorbar",
    "remember": "La barra de color permite interpretar la magnitud de las celdas.",
    "examples": [
      {
        "id": "seaborn/mapas-de-calor/linewidths-square-y-colorbar/1",
        "title": "Ajustar la leyenda de colores",
        "language": "python",
        "code": "sns.heatmap(matriz, square=True, linewidths=.5, cbar=True, cbar_kws={\"label\":\"Ingresos\"})",
        "hint": "La barra de color recibe una etiqueta explícita.",
        "textOutput": "Cuatro celdas cuadradas con barra de color titulada Ingresos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/mapas-de-calor/clustermap",
    "remember": "Las distancias dependen de la escala de las variables; no es un gráfico de correlación por sí mismo.",
    "note": "Requiere SciPy y una matriz sin faltantes ni columnas de varianza cero.",
    "examples": [
      {
        "id": "seaborn/mapas-de-calor/clustermap/1",
        "title": "Agrupar sucursales por medidas",
        "language": "python",
        "code": "perfil = ventas.groupby(\"sucursal\")[[\"ingresos\", \"inversion\", \"pedidos\"]].mean()\nsns.clustermap(perfil, z_score=1, method=\"average\", metric=\"euclidean\", cmap=\"vlag\")",
        "hint": "Se estandarizan columnas y se calcula el agrupamiento jerárquico.",
        "textOutput": "Mapa de calor reordenado con dendrogramas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
