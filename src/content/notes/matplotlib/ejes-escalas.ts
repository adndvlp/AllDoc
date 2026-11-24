// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/ejes-escalas/definicion",
    "remember": "Modificar la escala no modifica el dataset.",
    "examples": [
      {
        "id": "matplotlib/ejes-escalas/definicion/1",
        "title": "Fijar un rango comparable",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(regiones, ventas_region)\nax.set_ylim(0, 300)",
        "hint": "Las barras comparten una escala de 0 a 300.",
        "textOutput": "Tres barras con base cero y máximo del eje en 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/ejes-escalas/limites",
    "remember": "Los datos fuera del intervalo siguen existiendo, pero quedan recortados visualmente.",
    "examples": [
      {
        "id": "matplotlib/ejes-escalas/limites/1",
        "title": "Acercar un intervalo de ventas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas)\nax.set_xlim(1, 4)\nax.set_ylim(100, 220)",
        "hint": "El eje categórico usa posiciones de 0 a 5.",
        "textOutput": "Se ve el tramo de febrero a mayo en el rango vertical indicado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/ejes-escalas/grid",
    "remember": "Una cuadrícula suave facilita leer magnitudes sin competir con los datos.",
    "examples": [
      {
        "id": "matplotlib/ejes-escalas/grid/1",
        "title": "Añadir referencias horizontales",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(regiones, ventas_region)\nax.set_axisbelow(True)\nax.grid(axis='y', alpha=.25)",
        "hint": "Solo se muestran guías del eje y, detrás de las barras.",
        "textOutput": "Líneas horizontales tenues.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/ejes-escalas/escalas",
    "remember": "Una escala logarítmica convencional requiere valores positivos para que se representen normalmente.",
    "examples": [
      {
        "id": "matplotlib/ejes-escalas/escalas/1",
        "title": "Comparar órdenes de magnitud",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([1, 2, 3], [10, 100, 1000], marker='o')\nax.set_yscale('log')",
        "hint": "Cada aumento por factor 10 ocupa la misma distancia vertical.",
        "textOutput": "Puntos en 10, 100 y 1000 equidistantes en y.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/ejes-escalas/symlog-logit",
    "remember": "No uses `logit` para valores iguales a 0 o 1.",
    "examples": [
      {
        "id": "matplotlib/ejes-escalas/symlog-logit/1",
        "title": "Representar ganancias y pérdidas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([-2,-1,0,1,2], [-100,-10,0,10,100], marker='o')\nax.set_yscale('symlog', linthresh=1)",
        "hint": "Cerca de cero la escala es lineal.",
        "textOutput": "Cinco puntos visibles a ambos lados de cero.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/ejes-escalas/symlog-logit/2",
        "title": "Mostrar probabilidades",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([1,2,3], [.01,.5,.99], marker='o')\nax.set_yscale('logit')",
        "hint": "La escala expande las regiones próximas a los extremos.",
        "textOutput": "Tres probabilidades válidas en una escala logit.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/ejes-escalas/invertir-ejes",
    "remember": "No equivale a ordenar los datos antes de dibujar.",
    "examples": [
      {
        "id": "matplotlib/ejes-escalas/invertir-ejes/1",
        "title": "Invertir el orden horizontal",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas)\nax.invert_xaxis()",
        "hint": "El eje x cambia de dirección.",
        "textOutput": "Junio a la izquierda y enero a la derecha.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/ejes-escalas/invertir-ejes/2",
        "title": "Mostrar la primera categoría arriba",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.barh(regiones, ventas_region)\nax.invert_yaxis()",
        "hint": "La primera posición pasa al borde superior.",
        "textOutput": "Norte arriba y Sur abajo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/ejes-escalas/margenes-autoescala",
    "remember": "Los márgenes son fracciones del rango de los datos.",
    "examples": [
      {
        "id": "matplotlib/ejes-escalas/margenes-autoescala/1",
        "title": "Dar espacio vertical",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([1,2,3], [10,20,30])\nax.margins(y=.2)\nprint(ax.get_ylim())",
        "hint": "El rango de y es 20 y el margen a cada lado es 4.",
        "textOutput": "Límites verticales `(6.0, 34.0)` aproximadamente.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/ejes-escalas/margenes-autoescala/2",
        "title": "Recuperar límites automáticos",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([1,2,3], [10,20,30])\nax.set_ylim(0,100)\nax.autoscale(enable=True, axis='y')",
        "hint": "Se vuelve a activar el ajuste de límites del eje y.",
        "textOutput": "El eje se ajusta cerca de 10 a 30.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/ejes-escalas/aspecto",
    "remember": "Una unidad por eje y un panel cuadrado son conceptos distintos.",
    "examples": [
      {
        "id": "matplotlib/ejes-escalas/aspecto/1",
        "title": "Dibujar unidades con la misma escala",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([0,1,1,0,0], [0,0,1,1,0])\nax.set_aspect('equal')",
        "hint": "Una unidad horizontal mide lo mismo que una vertical.",
        "textOutput": "Un cuadrado sin deformación.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/ejes-escalas/aspecto/2",
        "title": "Crear un panel cuadrado",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas)\nax.set_box_aspect(1)",
        "hint": "La forma física del panel es cuadrada.",
        "textOutput": "Un área de dibujo cuadrada, con escalas de datos independientes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/ejes-escalas/spines",
    "remember": "Ocultar bordes no elimina los datos ni los ejes.",
    "examples": [
      {
        "id": "matplotlib/ejes-escalas/spines/1",
        "title": "Simplificar el marco",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas)\nax.spines[['top','right']].set_visible(False)",
        "hint": "Solo se ocultan el borde superior y el derecho.",
        "textOutput": "Un panel con bordes inferior e izquierdo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
