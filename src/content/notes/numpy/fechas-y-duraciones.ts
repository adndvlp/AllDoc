// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/fechas-y-duraciones/definicion",
    "remember": "No confundas meses o años calendarios con una cantidad fija de días.",
    "examples": [
      {
        "id": "numpy/fechas-y-duraciones/definicion/1",
        "title": "Convertir fechas a meses",
        "code": "print(fechas)\nprint(fechas.astype('datetime64[M]'))",
        "hint": "No confundas meses o años calendarios con una cantidad fija de días.",
        "textOutput": "['2026-01-05' '2026-01-12' '2026-02-03' '2026-02-10' '2026-03-02'\n '2026-03-09']\n['2026-01' '2026-01' '2026-02' '2026-02' '2026-03' '2026-03']",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/fechas-y-duraciones/datetime64-y-unidades",
    "remember": "Las fechas NumPy no almacenan zonas horarias como una fecha consciente de zona.",
    "examples": [
      {
        "id": "numpy/fechas-y-duraciones/datetime64-y-unidades/1",
        "title": "Convertir fechas a meses",
        "code": "print(fechas)\nprint(fechas.astype('datetime64[M]'))",
        "hint": "Las fechas NumPy no almacenan zonas horarias como una fecha consciente de zona.",
        "textOutput": "['2026-01-05' '2026-01-12' '2026-02-03' '2026-02-10' '2026-03-02'\n '2026-03-09']\n['2026-01' '2026-01' '2026-02' '2026-02' '2026-03' '2026-03']",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/fechas-y-duraciones/timedelta64-y-diferencias",
    "remember": "Divide una duración en días entre np.timedelta64(1, 'D') para obtener su magnitud.",
    "examples": [
      {
        "id": "numpy/fechas-y-duraciones/timedelta64-y-diferencias/1",
        "title": "Calcular días entre pedidos",
        "code": "print(np.diff(fechas))\nprint((fechas - fechas[0]) / np.timedelta64(1, 'D'))\nprint(fechas[0] + np.timedelta64(7, 'D'))",
        "hint": "Divide una duración en días entre np.timedelta64(1, 'D') para obtener su magnitud.",
        "textOutput": "[ 7 22  7 20  7]\n[ 0.  7. 29. 36. 56. 63.]\n2026-01-12",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/fechas-y-duraciones/nat-e-isnat",
    "remember": "Usa isnat, no una comparación con NaT mediante ==.",
    "examples": [
      {
        "id": "numpy/fechas-y-duraciones/nat-e-isnat/1",
        "title": "Detectar fechas ausentes",
        "code": "d = np.array(['2026-01-01', 'NaT'], dtype='datetime64[D]')\nprint(np.isnat(d))",
        "hint": "Usa isnat, no una comparación con NaT mediante ==.",
        "textOutput": "[False  True]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/fechas-y-duraciones/agrupacion-por-periodo",
    "remember": "La conversión conserva año y mes, evitando mezclar enero de distintos años.",
    "examples": [
      {
        "id": "numpy/fechas-y-duraciones/agrupacion-por-periodo/1",
        "title": "Contar pedidos por mes",
        "code": "print(np.unique(fechas.astype('datetime64[M]'), return_counts=True))",
        "hint": "La conversión conserva año y mes, evitando mezclar enero de distintos años.",
        "textOutput": "(array(['2026-01', '2026-02', '2026-03'], dtype='datetime64[M]'), array([2, 2, 2]))",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/fechas-y-duraciones/is-busday-y-busday-count",
    "remember": "Por defecto solo lunes a viernes; configura holidays para excluir festivos.",
    "examples": [
      {
        "id": "numpy/fechas-y-duraciones/is-busday-y-busday-count/1",
        "title": "Contar días hábiles de un periodo",
        "code": "print(np.is_busday(np.array(['2026-06-01', '2026-06-06'], dtype='datetime64[D]')))\nprint(np.busday_count('2026-06-01', '2026-06-08'))",
        "hint": "Por defecto solo lunes a viernes; configura holidays para excluir festivos.",
        "textOutput": "[ True False]\n5",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/fechas-y-duraciones/busday-offset-y-calendarios",
    "remember": "roll controla cómo ajustar una fecha no laborable antes del desplazamiento.",
    "examples": [
      {
        "id": "numpy/fechas-y-duraciones/busday-offset-y-calendarios/1",
        "title": "Calcular el siguiente día hábil con un festivo",
        "code": "cal = np.busdaycalendar(holidays=['2026-06-01'])\nprint(np.busday_offset('2026-05-29', 1, busdaycal=cal))",
        "hint": "roll controla cómo ajustar una fecha no laborable antes del desplazamiento.",
        "textOutput": "2026-06-02",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
