// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/histogramas/definicion",
    "remember": "Las barras representan rangos de valores, no categorías arbitrarias.",
    "examples": [
      {
        "id": "seaborn/histogramas/definicion/1",
        "title": "Distribución de ingresos",
        "language": "python",
        "code": "sns.histplot(data=ventas, x=\"ingresos\", color=\"steelblue\")",
        "hint": "Cada barra resume las observaciones de un intervalo.",
        "textOutput": "Histograma de los 16 ingresos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/histogramas/bins-y-binwidth",
    "remember": "Cambiar el tamaño del intervalo puede cambiar el patrón aparente.",
    "examples": [
      {
        "id": "seaborn/histogramas/bins-y-binwidth/1",
        "title": "Usar intervalos de 50",
        "language": "python",
        "code": "sns.histplot(data=ventas, x=\"ingresos\", binwidth=50, color=\"steelblue\")",
        "hint": "Cada intervalo tiene una anchura de 50 unidades.",
        "textOutput": "Barras de frecuencia con intervalos uniformes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/histogramas/stat",
    "remember": "Densidad significa área total 1, no suma de alturas 1.",
    "examples": [
      {
        "id": "seaborn/histogramas/stat/1",
        "title": "Mostrar porcentajes",
        "language": "python",
        "code": "sns.histplot(data=ventas, x=\"ingresos\", bins=4, stat=\"percent\", color=\"steelblue\")",
        "hint": "La altura es el porcentaje de observaciones del intervalo.",
        "textOutput": "Las alturas de las cuatro barras suman 100 %.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/histogramas/histograma-con-kde",
    "remember": "La curva es una estimación y no un recuento exacto.",
    "examples": [
      {
        "id": "seaborn/histogramas/histograma-con-kde/1",
        "title": "Comparar barras y curva",
        "language": "python",
        "code": "sns.histplot(data=ventas, x=\"ingresos\", kde=True, color=\"steelblue\")",
        "hint": "Combina frecuencias y densidad suavizada a escala del histograma.",
        "textOutput": "Barras con una curva superpuesta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/histogramas/multiple",
    "remember": "`layer`, `stack`, `dodge` y `fill` expresan comparaciones distintas.",
    "examples": [
      {
        "id": "seaborn/histogramas/multiple/1",
        "title": "Comparar la composición de cada intervalo",
        "language": "python",
        "code": "sns.histplot(data=ventas, x=\"ingresos\", hue=\"canal\", bins=4, multiple=\"fill\")",
        "hint": "Cada intervalo no vacío se normaliza a una altura de 1.",
        "textOutput": "Barras apiladas que muestran proporción por canal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/histogramas/common-bins-y-common-norm",
    "remember": "Para comparar distribuciones relativas, usa bordes comunes y normalización por grupo.",
    "examples": [
      {
        "id": "seaborn/histogramas/common-bins-y-common-norm/1",
        "title": "Comparar distribuciones relativas",
        "language": "python",
        "code": "sns.histplot(data=ventas, x=\"ingresos\", hue=\"canal\", bins=4, stat=\"probability\", common_bins=True, common_norm=False)",
        "hint": "Cada canal se normaliza por separado.",
        "textOutput": "Las alturas de cada canal suman 1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/histogramas/histograma-acumulado",
    "remember": "La última barra incluye todas las observaciones del grupo.",
    "examples": [
      {
        "id": "seaborn/histogramas/histograma-acumulado/1",
        "title": "Obtener porcentaje acumulado",
        "language": "python",
        "code": "sns.histplot(data=ventas, x=\"ingresos\", stat=\"percent\", cumulative=True, bins=4, color=\"steelblue\")",
        "hint": "Cada barra incorpora las frecuencias anteriores.",
        "textOutput": "La última barra alcanza 100 %.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
