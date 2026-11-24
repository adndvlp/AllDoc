// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/archivos-e-intercambio-de-datos/definicion",
    "remember": "Usa formatos de NumPy para conservar forma y dtype; usa herramientas tabulares para CSV complejos.",
    "examples": [
      {
        "id": "numpy/archivos-e-intercambio-de-datos/definicion/1",
        "title": "Guardar y recuperar ventas en CSV sin crear archivos permanentes",
        "code": "from io import StringIO\nf = StringIO()\nnp.savetxt(f, ventas, delimiter=',', fmt='%d')\nf.seek(0)\nprint(np.loadtxt(f, delimiter=',', dtype=int))",
        "hint": "Usa formatos de NumPy para conservar forma y dtype; usa herramientas tabulares para CSV complejos.",
        "textOutput": "[[100 150 200 250]\n [150 200 250 350]\n [200 200 200 150]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/archivos-e-intercambio-de-datos/loadtxt-y-savetxt",
    "remember": "loadtxt no gestiona faltantes complejos; usa genfromtxt o pandas en esos casos.",
    "examples": [
      {
        "id": "numpy/archivos-e-intercambio-de-datos/loadtxt-y-savetxt/1",
        "title": "Guardar y recuperar ventas en CSV sin crear archivos permanentes",
        "code": "from io import StringIO\nf = StringIO()\nnp.savetxt(f, ventas, delimiter=',', fmt='%d')\nf.seek(0)\nprint(np.loadtxt(f, delimiter=',', dtype=int))",
        "hint": "loadtxt no gestiona faltantes complejos; usa genfromtxt o pandas en esos casos.",
        "textOutput": "[[100 150 200 250]\n [150 200 250 350]\n [200 200 200 150]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/archivos-e-intercambio-de-datos/genfromtxt",
    "remember": "Configura delimiter y skip_header según el archivo.",
    "examples": [
      {
        "id": "numpy/archivos-e-intercambio-de-datos/genfromtxt/1",
        "title": "Leer un CSV con un valor faltante",
        "code": "from io import StringIO\nf = StringIO(chr(10).join(['id,importe', '1,100', '2,', '3,300']))\nprint(np.genfromtxt(f, delimiter=',', skip_header=1))",
        "hint": "Configura delimiter y skip_header según el archivo.",
        "textOutput": "[[  1. 100.]\n [  2.  nan]\n [  3. 300.]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/archivos-e-intercambio-de-datos/save-y-load",
    "remember": "Evita allow_pickle=True con archivos de origen no confiable.",
    "examples": [
      {
        "id": "numpy/archivos-e-intercambio-de-datos/save-y-load/1",
        "title": "Guardar y recuperar un array binario",
        "code": "from io import BytesIO\nf = BytesIO()\nnp.save(f, ventas)\nf.seek(0)\na = np.load(f, allow_pickle=False)\nprint(np.array_equal(a, ventas), a.dtype)",
        "hint": "Evita allow_pickle=True con archivos de origen no confiable.",
        "textOutput": "True int64",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/archivos-e-intercambio-de-datos/savez-y-savez-compressed",
    "remember": "Usa un gestor de contexto al abrir NPZ para cerrar el archivo.",
    "examples": [
      {
        "id": "numpy/archivos-e-intercambio-de-datos/savez-y-savez-compressed/1",
        "title": "Guardar varios conjuntos en un archivo lógico",
        "code": "from io import BytesIO\nf = BytesIO()\nnp.savez_compressed(f, ventas=ventas, clientes=clientes)\nf.seek(0)\nwith np.load(f) as datos:\n    print(datos.files)\n    print(datos['clientes'])\nf2 = BytesIO()\nnp.savez(f2, ventas=ventas)\nf2.seek(0)\nwith np.load(f2) as datos:\n    print(datos['ventas'].shape)",
        "hint": "Usa un gestor de contexto al abrir NPZ para cerrar el archivo.",
        "textOutput": "['ventas', 'clientes']\n[1 2 1 3 2 3]\n(3, 4)",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/archivos-e-intercambio-de-datos/memmap",
    "remember": "Especifica dtype y shape correctos; mode='r' abre solo lectura. No elimina la necesidad de almacenamiento ni memoria de trabajo.",
    "examples": [
      {
        "id": "numpy/archivos-e-intercambio-de-datos/memmap/1",
        "title": "Crear y consultar un archivo mapeado temporal",
        "code": "from tempfile import TemporaryDirectory\nfrom pathlib import Path\nwith TemporaryDirectory() as d:\n    p = Path(d) / 'ventas.bin'\n    a = np.memmap(p, dtype='int64', mode='w+', shape=(3, 4))\n    a[:] = ventas\n    a.flush()\n    del a\n    b = np.memmap(p, dtype='int64', mode='r', shape=(3, 4))\n    print(b[1])\n    del b",
        "hint": "Especifica dtype y shape correctos; mode='r' abre solo lectura. No elimina la necesidad de almacenamiento ni memoria de trabajo. Ejecuta este ejemplo en Python local. El sistema de archivos del editor no admite este mapeo.",
        "textOutput": "[150 200 250 350]",
        "resultLabel": "Ver resultado en NumPy 2.3.5",
        "external": true
      }
    ]
  }
];
