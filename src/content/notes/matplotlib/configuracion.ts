// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/configuracion/definicion",
    "remember": "Una configuración local evita que un ejemplo afecte a los demás.",
    "examples": [
      {
        "id": "matplotlib/configuracion/definicion/1",
        "title": "Aplicar un estilo solo dentro de un bloque",
        "language": "python",
        "code": "with plt.style.context('ggplot'):\n    fig, ax = plt.subplots()\n    ax.plot(meses,ventas)",
        "hint": "El contexto restaura la configuración al terminar.",
        "textOutput": "Figura con el estilo ggplot; la configuración posterior no se altera.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/configuracion/style-rcparams",
    "remember": "Usa `rc_context()` para contener los cambios cuando no quieres efectos globales.",
    "examples": [
      {
        "id": "matplotlib/configuracion/style-rcparams/1",
        "title": "Definir un grosor por defecto",
        "language": "python",
        "code": "with mpl.rc_context():\n    plt.style.use('ggplot')\n    mpl.rcParams['lines.linewidth'] = 3\n    fig, ax = plt.subplots()\n    linea, = ax.plot(meses,ventas)\n    print(linea.get_linewidth())",
        "hint": "La línea hereda la propiedad configurada.",
        "textOutput": "Salida `3.0`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/configuracion/estilos-reutilizables",
    "remember": "Una línea del archivo de estilo tiene la forma `clave: valor`.",
    "examples": [
      {
        "id": "matplotlib/configuracion/estilos-reutilizables/1",
        "title": "Crear y aplicar un archivo de estilo",
        "language": "python",
        "code": "ruta = salida/'reporte.mplstyle'\nruta.write_text('axes.grid: True\\nlines.linewidth: 2.5\\n',encoding='utf-8')\nwith plt.style.context(str(ruta)):\n    fig, ax = plt.subplots()\n    linea, = ax.plot(meses,ventas)\n    print(linea.get_linewidth())",
        "hint": "El archivo define dos propiedades reutilizables.",
        "textOutput": "Archivo de estilo, gráfica con cuadrícula y salida `2.5`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/configuracion/ciclo-de-propiedades",
    "remember": "Con `+` combinas ciclos de igual longitud elemento por elemento.",
    "examples": [
      {
        "id": "matplotlib/configuracion/ciclo-de-propiedades/1",
        "title": "Asignar estilos a dos series",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.set_prop_cycle(cycler(color=['navy','orange']) + cycler(linestyle=['-','--']))\nax.plot(meses,ventas)\nax.plot(meses,metas)",
        "hint": "La primera serie recibe azul marino y continua; la segunda naranja y discontinua.",
        "textOutput": "Dos líneas con los estilos definidos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/configuracion/fuentes-mathtext",
    "remember": "MathText no requiere una instalación de LaTeX para la sintaxis compatible.",
    "examples": [
      {
        "id": "matplotlib/configuracion/fuentes-mathtext/1",
        "title": "Usar una fuente disponible y una fórmula",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nfp = font_manager.FontProperties(family='DejaVu Sans')\nax.plot(meses,ventas)\nax.set_title(r'Ventas: $\\mu$',fontproperties=fp)",
        "hint": "MathText representa el símbolo griego mu.",
        "textOutput": "Título Ventas: μ en una fuente incluida con Matplotlib.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
