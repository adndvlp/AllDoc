// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/interactividad/definicion",
    "remember": "Un backend de exportación no ofrece necesariamente una ventana interactiva.",
    "examples": [
      {
        "id": "matplotlib/interactividad/definicion/1",
        "title": "Consultar el backend activo",
        "language": "python",
        "code": "print(mpl.get_backend())",
        "hint": "El backend depende del entorno de ejecución.",
        "textOutput": "Nombre del backend, por ejemplo `Agg` en un entorno sin pantalla.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/interactividad/backends",
    "remember": "Selecciona el backend antes de importar pyplot cuando sea necesario; no lo cambies en mitad de una sesión sin considerar sus efectos.",
    "examples": [
      {
        "id": "matplotlib/interactividad/backends/1",
        "title": "Renderizar sin interfaz gráfica",
        "language": "python",
        "code": "# Ejecutar en un proceso nuevo, antes de importar pyplot.\nimport matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\nfrom pathlib import Path\nsalida = Path('salidas_matplotlib')\nsalida.mkdir(exist_ok=True)\nfig, ax = plt.subplots()\nax.plot([1,2],[3,4])\nfig.savefig(salida/'sin-pantalla.png')",
        "hint": "Agg permite generar archivos sin abrir una ventana.",
        "textOutput": "Archivo PNG generado sin interfaz gráfica.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/interactividad/eventos-callbacks",
    "remember": "Comprueba `event.inaxes` antes de usar coordenadas de datos.",
    "examples": [
      {
        "id": "matplotlib/interactividad/eventos-callbacks/1",
        "title": "Responder a un clic en la gráfica",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses,ventas)\ndef al_clic(event):\n    if event.inaxes is ax:\n        print(event.xdata,event.ydata)\ncid = fig.canvas.mpl_connect('button_press_event',al_clic)",
        "hint": "`cid` permite desconectar luego el callback con `mpl_disconnect(cid)`. Ejecuta este ejemplo en Python local o Jupyter con un backend interactivo.",
        "textOutput": "Con un backend interactivo, un clic dentro del panel imprime sus coordenadas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/interactividad/widgets",
    "remember": "Conserva referencias a los widgets mientras estén en uso; requieren interacción compatible.",
    "examples": [
      {
        "id": "matplotlib/interactividad/widgets/1",
        "title": "Ajustar un multiplicador de ventas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nfig.subplots_adjust(bottom=.25)\nlinea, = ax.plot(meses,ventas)\nax.set_ylim(0,450)\ncontrol = Slider(fig.add_axes([.2,.1,.6,.04]),'Factor',.5,2,valinit=1)\ndef actualizar(v):\n    linea.set_ydata(ventas*v)\n    fig.canvas.draw_idle()\ncontrol.on_changed(actualizar)",
        "hint": "El deslizador cambia los valores y solicita redibujar. Ejecuta este ejemplo en Python local o Jupyter con un backend interactivo.",
        "textOutput": "Al moverlo a 2, la línea pasa a valores entre 240 y 420.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      },
      {
        "id": "matplotlib/interactividad/widgets/2",
        "title": "Restablecer una gráfica con un botón",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nfig.subplots_adjust(bottom=.25)\nlinea, = ax.plot(meses,metas)\nboton = Button(fig.add_axes([.7,.08,.2,.08]),'Ventas')\ndef cambiar(event):\n    linea.set_ydata(ventas)\n    ax.relim()\n    ax.autoscale_view()\n    fig.canvas.draw_idle()\nboton.on_clicked(cambiar)",
        "hint": "El callback reemplaza la serie de metas por ventas. Ejecuta este ejemplo en Python local o Jupyter con un backend interactivo.",
        "textOutput": "Al hacer clic, se muestra la serie de ventas reales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/interactividad/func-animation",
    "remember": "Conserva la referencia `ani`; para guardar GIF puedes usar PillowWriter con Pillow instalado.",
    "examples": [
      {
        "id": "matplotlib/interactividad/func-animation/1",
        "title": "Animar la evolución de ventas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nlinea, = ax.plot([],[],marker='o')\nax.set_xlim(0,5)\nax.set_ylim(0,250)\nax.set_xticks(range(6),meses)\ndef actualizar(i):\n    linea.set_data(np.arange(i+1),ventas[:i+1])\n    return linea,\nani = FuncAnimation(fig,actualizar,frames=6,interval=300,repeat=False)\nani.save(salida/'ventas.gif',writer='pillow',fps=3)",
        "hint": "Cada frame agrega un mes al gráfico.",
        "textOutput": "Un GIF de seis frames lógicos que termina en junio con 210.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
