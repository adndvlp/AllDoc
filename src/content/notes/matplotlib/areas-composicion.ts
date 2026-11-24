// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/areas-composicion/definicion",
    "remember": "El tipo de gráfica depende de qué relación quieres comunicar.",
    "examples": [
      {
        "id": "matplotlib/areas-composicion/definicion/1",
        "title": "Representar la participación regional",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.pie(ventas_region, labels=regiones, autopct='%1.1f%%')",
        "hint": "`pie()` normaliza los valores positivos por el total.",
        "textOutput": "Tres sectores de 44.4 %, 33.3 % y 22.2 % aproximadamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/areas-composicion/pie",
    "remember": "Evita usar sectores para porcentajes que no forman un total.",
    "examples": [
      {
        "id": "matplotlib/areas-composicion/pie/1",
        "title": "Mostrar participación de canales",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.pie([300, 240], labels=['Online', 'Tienda'], autopct='%.1f%%')",
        "hint": "Los dos valores suman 540.",
        "textOutput": "Sectores 55.6 % y 44.4 %.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/areas-composicion/fill-between",
    "remember": "Los límites deben corresponder a las mismas coordenadas x.",
    "examples": [
      {
        "id": "matplotlib/areas-composicion/fill-between/1",
        "title": "Mostrar un intervalo alrededor de ventas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas)\nax.fill_between(meses, ventas-10, ventas+10, alpha=.2)",
        "hint": "Los límites son 10 unidades por debajo y por encima.",
        "textOutput": "Línea de ventas con una banda de ancho vertical 20.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/areas-composicion/stackplot",
    "remember": "El borde superior representa el total de las series.",
    "examples": [
      {
        "id": "matplotlib/areas-composicion/stackplot/1",
        "title": "Mostrar ventas mensuales por canal",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.stackplot(meses, ventas*.6, ventas*.4, labels=['Online', 'Tienda'])\nax.legend()",
        "hint": "Los canales representan 60 % y 40 % de cada total.",
        "textOutput": "Dos áreas cuya suma sigue la serie ventas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/areas-composicion/errorbar",
    "remember": "Matplotlib no calcula por sí solo el intervalo estadístico.",
    "examples": [
      {
        "id": "matplotlib/areas-composicion/errorbar/1",
        "title": "Mostrar estimaciones con incertidumbre",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.errorbar(meses, ventas, yerr=10, fmt='o', capsize=4)",
        "hint": "`yerr=10` indica una amplitud de 10 en ambos sentidos.",
        "textOutput": "Seis puntos con barras verticales de ±10.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
