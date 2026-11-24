// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/ufuncs-y-operaciones-avanzadas/definicion",
    "remember": "No toda función np es una ufunc; sus métodos y argumentos pueden diferir.",
    "examples": [
      {
        "id": "numpy/ufuncs-y-operaciones-avanzadas/definicion/1",
        "title": "Calcular importes totales y acumulados",
        "code": "print(np.add.reduce(importes))\nprint(np.add.accumulate(importes))",
        "hint": "reduce entrega un único total; accumulate mantiene un valor parcial por cada posición.",
        "textOutput": "1400\n[ 100  350  500  900 1200 1400]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ufuncs-y-operaciones-avanzadas/reduce-y-accumulate",
    "remember": "add.reduce equivale a una suma; add.accumulate a una suma acumulada.",
    "examples": [
      {
        "id": "numpy/ufuncs-y-operaciones-avanzadas/reduce-y-accumulate/1",
        "title": "Calcular importes totales y acumulados",
        "code": "print(np.add.reduce(importes))\nprint(np.add.accumulate(importes))",
        "hint": "reduce entrega un único total; accumulate mantiene un valor parcial por cada posición.",
        "textOutput": "1400\n[ 100  350  500  900 1200 1400]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ufuncs-y-operaciones-avanzadas/outer",
    "remember": "En vectores, el resultado tiene una fila por valor del primero y una columna por valor del segundo.",
    "examples": [
      {
        "id": "numpy/ufuncs-y-operaciones-avanzadas/outer/1",
        "title": "Simular ingresos con todos los precios y volúmenes",
        "code": "print(np.multiply.outer([10, 20], [100, 200, 300]))",
        "hint": "En vectores, el resultado tiene una fila por valor del primero y una columna por valor del segundo.",
        "textOutput": "[[1000 2000 3000]\n [2000 4000 6000]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ufuncs-y-operaciones-avanzadas/at",
    "remember": "a[idx] += valores puede no acumular índices repetidos como esperas; add.at sí lo hace.",
    "examples": [
      {
        "id": "numpy/ufuncs-y-operaciones-avanzadas/at/1",
        "title": "Acumular importes por código de sucursal",
        "code": "a = np.zeros(3)\nnp.add.at(a, codigos, importes)\nprint(a)",
        "hint": "a[idx] += valores puede no acumular índices repetidos como esperas; add.at sí lo hace.",
        "textOutput": "[250. 550. 600.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ufuncs-y-operaciones-avanzadas/where-y-out-en-ufuncs",
    "remember": "Si where es falso, out conserva sus valores; inicialízalo antes de usar la máscara.",
    "examples": [
      {
        "id": "numpy/ufuncs-y-operaciones-avanzadas/where-y-out-en-ufuncs/1",
        "title": "Dividir evitando divisiones entre cero",
        "code": "a = np.array([100, 200, 300])\nb = np.array([2, 0, 3])\nout = np.full(3, np.nan)\nnp.divide(a, b, out=out, where=b != 0)\nprint(out)",
        "hint": "Si where es falso, out conserva sus valores; inicialízalo antes de usar la máscara.",
        "textOutput": "[ 50.  nan 100.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ufuncs-y-operaciones-avanzadas/apply-along-axis",
    "remember": "Suele ser menos eficiente que una reducción vectorizada nativa; úsala para lógica específica.",
    "examples": [
      {
        "id": "numpy/ufuncs-y-operaciones-avanzadas/apply-along-axis/1",
        "title": "Obtener amplitud de ventas por sucursal",
        "code": "print(np.apply_along_axis(np.ptp, 1, ventas))",
        "hint": "Suele ser menos eficiente que una reducción vectorizada nativa; úsala para lógica específica.",
        "textOutput": "[150 200  50]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
