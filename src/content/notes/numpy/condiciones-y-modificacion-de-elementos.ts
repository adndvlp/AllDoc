// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/condiciones-y-modificacion-de-elementos/definicion",
    "remember": "Usa where o select para devolver valores; asignación con máscara para modificar.",
    "examples": [
      {
        "id": "numpy/condiciones-y-modificacion-de-elementos/definicion/1",
        "title": "Etiquetar pedidos según importe",
        "code": "print(np.where(importes >= 300, 'Alto', 'Normal'))",
        "hint": "Usa where o select para devolver valores; asignación con máscara para modificar.",
        "textOutput": "['Normal' 'Normal' 'Normal' 'Alto' 'Alto' 'Normal']",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/condiciones-y-modificacion-de-elementos/where",
    "remember": "Con un solo argumento where devuelve índices; con tres devuelve valores.",
    "examples": [
      {
        "id": "numpy/condiciones-y-modificacion-de-elementos/where/1",
        "title": "Etiquetar pedidos según importe",
        "code": "print(np.where(importes >= 300, 'Alto', 'Normal'))",
        "hint": "Con un solo argumento where devuelve índices; con tres devuelve valores.",
        "textOutput": "['Normal' 'Normal' 'Normal' 'Alto' 'Alto' 'Normal']",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/condiciones-y-modificacion-de-elementos/select",
    "remember": "Ordena reglas de más específica a más general; default cubre el resto.",
    "examples": [
      {
        "id": "numpy/condiciones-y-modificacion-de-elementos/select/1",
        "title": "Crear tres segmentos de tickets",
        "code": "print(np.select([importes >= 300, importes >= 150], ['Alto', 'Medio'], default='Bajo'))",
        "hint": "Ordena reglas de más específica a más general; default cubre el resto.",
        "textOutput": "['Bajo' 'Medio' 'Medio' 'Alto' 'Alto' 'Medio']",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/condiciones-y-modificacion-de-elementos/clip",
    "remember": "clip no elimina filas; sustituye los valores fuera de límites.",
    "examples": [
      {
        "id": "numpy/condiciones-y-modificacion-de-elementos/clip/1",
        "title": "Limitar descuentos permitidos",
        "code": "print(np.clip([-5, 10, 45, 80], 0, 50))",
        "hint": "clip no elimina filas; sustituye los valores fuera de límites.",
        "textOutput": "[ 0 10 45 50]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/condiciones-y-modificacion-de-elementos/asignacion-por-indices-y-mascaras",
    "remember": "Crea una copia si no quieres cambiar la fuente.",
    "examples": [
      {
        "id": "numpy/condiciones-y-modificacion-de-elementos/asignacion-por-indices-y-mascaras/1",
        "title": "Corregir importes bajos en una copia",
        "code": "a = importes.copy()\na[a < 150] = 150\nprint(a)",
        "hint": "Crea una copia si no quieres cambiar la fuente.",
        "textOutput": "[150 250 150 400 300 200]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/condiciones-y-modificacion-de-elementos/put-putmask-y-copyto",
    "remember": "putmask y copyto modifican el destino, no devuelven un array nuevo.",
    "examples": [
      {
        "id": "numpy/condiciones-y-modificacion-de-elementos/put-putmask-y-copyto/1",
        "title": "Aplicar ajustes puntuales",
        "code": "a = importes.copy()\nnp.put(a, [0], [99])\nnp.putmask(a, a < 150, 0)\nnp.copyto(a, 150, where=a == 0)\nprint(a)",
        "hint": "putmask y copyto modifican el destino, no devuelven un array nuevo.",
        "textOutput": "[150 250 150 400 300 200]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
