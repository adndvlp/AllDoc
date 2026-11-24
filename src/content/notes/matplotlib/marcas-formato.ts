// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/marcas-formato/definicion",
    "remember": "No confundas cambiar el texto con cambiar los valores de los datos.",
    "examples": [
      {
        "id": "matplotlib/marcas-formato/definicion/1",
        "title": "Marcar tres referencias",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(regiones, ventas_region)\nax.set_yticks([0, 120, 240])",
        "hint": "Se fijan las marcas del eje y.",
        "textOutput": "Marcas en 0, 120 y 240.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/marcas-formato/ticks",
    "remember": "La cantidad de etiquetas debe coincidir con la de posiciones.",
    "examples": [
      {
        "id": "matplotlib/marcas-formato/ticks/1",
        "title": "Etiquetar trimestres",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([1,2,3], [120,150,210])\nax.set_xticks([1,2,3], ['T1','T2','T3'])\nax.set_yticks([100,150,200])",
        "hint": "Las posiciones siguen siendo numéricas.",
        "textOutput": "Tres marcas x etiquetadas T1, T2 y T3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/marcas-formato/ticklabels",
    "remember": "Fija primero las posiciones para que las etiquetas no queden desalineadas al cambiar la escala.",
    "examples": [
      {
        "id": "matplotlib/marcas-formato/ticklabels/1",
        "title": "Renombrar marcas fijas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([1,2,3], [10,20,30])\nax.set_xticks([1,2,3])\nax.set_xticklabels(['Ene','Feb','Mar'])\nax.set_yticks([10,20,30])\nax.set_yticklabels(['10 u','20 u','30 u'])",
        "hint": "Las etiquetas corresponden a posiciones fijas.",
        "textOutput": "Meses en x y unidades en y.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/marcas-formato/rotacion-tick-params",
    "remember": "Rotar etiquetas largas reduce colisiones.",
    "examples": [
      {
        "id": "matplotlib/marcas-formato/rotacion-tick-params/1",
        "title": "Rotar nombres de meses",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(meses, ventas)\nax.tick_params(axis='x', labelrotation=45, labelsize=9)\nfig.tight_layout()",
        "hint": "La rotación se aplica a las etiquetas del eje x.",
        "textOutput": "Etiquetas inclinadas 45 grados.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/marcas-formato/locators",
    "remember": "`nbins` limita intervalos, no garantiza un número exacto de etiquetas.",
    "examples": [
      {
        "id": "matplotlib/marcas-formato/locators/1",
        "title": "Mostrar intervalos de 50",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas)\nax.yaxis.set_major_locator(ticker.MultipleLocator(50))",
        "hint": "Las marcas principales son múltiplos de 50.",
        "textOutput": "Marcas como 100, 150, 200 según límites visibles.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/marcas-formato/locators/2",
        "title": "Reducir la cantidad de marcas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas)\nax.yaxis.set_major_locator(ticker.MaxNLocator(nbins=4))",
        "hint": "El localizador elige intervalos legibles.",
        "textOutput": "Hasta aproximadamente cuatro intervalos dentro de la escala.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/marcas-formato/auto-minor-locator",
    "remember": "Las marcas menores complementan las mayores.",
    "examples": [
      {
        "id": "matplotlib/marcas-formato/auto-minor-locator/1",
        "title": "Añadir subdivisiones",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([0,1,2], [0,50,100])\nax.yaxis.set_major_locator(ticker.MultipleLocator(50))\nax.yaxis.set_minor_locator(ticker.AutoMinorLocator(5))\nax.grid(which='minor', axis='y', alpha=.2)",
        "hint": "Divide cada intervalo principal de 50 en cinco partes.",
        "textOutput": "Marcas menores cada 10 unidades entre marcas principales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/marcas-formato/formato-numerico",
    "remember": "Los valores siguen siendo numéricos; solo cambia su presentación.",
    "examples": [
      {
        "id": "matplotlib/marcas-formato/formato-numerico/1",
        "title": "Mostrar pesos en las marcas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(regiones, ventas_region*1000)\nax.yaxis.set_major_formatter(ticker.FuncFormatter(lambda x, pos: f'${x:,.0f}'))",
        "hint": "La función recibe el valor y la posición de la marca.",
        "textOutput": "Etiquetas monetarias como $100,000.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/marcas-formato/formato-numerico/2",
        "title": "Mostrar unidades con una plantilla",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(regiones, ventas_region)\nax.yaxis.set_major_formatter(ticker.StrMethodFormatter('{x:.0f} mil'))",
        "hint": "La plantilla usa el valor `x`.",
        "textOutput": "Marcas como 100 mil y 200 mil.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/marcas-formato/percent-formatter",
    "remember": "Usa `xmax=1` para proporciones; `xmax=100` para valores de 0 a 100.",
    "examples": [
      {
        "id": "matplotlib/marcas-formato/percent-formatter/1",
        "title": "Formatear tasas de conversión",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, conversion)\nax.yaxis.set_major_formatter(ticker.PercentFormatter(xmax=1, decimals=0))",
        "hint": "Un valor de 0.12 se muestra como 12 %.",
        "textOutput": "Marcas del eje y en porcentaje.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/marcas-formato/formatters-adicionales",
    "remember": "Controla presentación, no redondea los datos almacenados.",
    "examples": [
      {
        "id": "matplotlib/marcas-formato/formatters-adicionales/1",
        "title": "Evitar offset y notación científica",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([1,2,3], [1000001,1000002,1000003])\nf = ticker.ScalarFormatter(useOffset=False)\nf.set_scientific(False)\nax.yaxis.set_major_formatter(f)",
        "hint": "Se desactivan ambas abreviaciones.",
        "textOutput": "Marcas con números completos.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/marcas-formato/formatters-adicionales/2",
        "title": "Mostrar un decimal",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, conversion)\nax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))",
        "hint": "La plantilla se aplica a cada marca.",
        "textOutput": "Etiquetas como 0.10 o 0.15.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
