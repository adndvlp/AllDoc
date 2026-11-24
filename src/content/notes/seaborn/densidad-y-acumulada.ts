// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/densidad-y-acumulada/definicion",
    "remember": "KDE suaviza; ECDF no necesita intervalos ni suavizado.",
    "examples": [
      {
        "id": "seaborn/densidad-y-acumulada/definicion/1",
        "title": "Comparar formas de distribución",
        "language": "python",
        "code": "sns.kdeplot(data=ventas, x=\"ingresos\", hue=\"canal\")",
        "hint": "Una curva por canal resume su distribución estimada.",
        "textOutput": "Dos curvas de densidad.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/densidad-y-acumulada/kdeplot-y-bw-adjust",
    "remember": "Menor ancho conserva más detalle; mayor ancho suaviza más.",
    "examples": [
      {
        "id": "seaborn/densidad-y-acumulada/kdeplot-y-bw-adjust/1",
        "title": "Comparar con una curva más suave",
        "language": "python",
        "code": "sns.kdeplot(data=ventas, x=\"ingresos\", bw_method=\"scott\", bw_adjust=1.5, color=\"steelblue\")",
        "hint": "Se usa el ancho de banda de Scott multiplicado por 1.5.",
        "textOutput": "Curva de densidad más suavizada que con el ajuste 1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/densidad-y-acumulada/cut-y-clip",
    "remember": "Recortar una KDE no corrige automáticamente el sesgo cerca de una frontera.",
    "examples": [
      {
        "id": "seaborn/densidad-y-acumulada/cut-y-clip/1",
        "title": "Evitar densidades dibujadas bajo cero",
        "language": "python",
        "code": "sns.kdeplot(data=ventas, x=\"ingresos\", cut=0, clip=(0, None), color=\"steelblue\")",
        "hint": "Restringe el dominio de dibujo a los valores observados y no negativos.",
        "textOutput": "Curva sin prolongación fuera del rango observado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/densidad-y-acumulada/kde-bivariada-y-levels",
    "remember": "Los contornos representan regiones de densidad, no líneas de regresión.",
    "examples": [
      {
        "id": "seaborn/densidad-y-acumulada/kde-bivariada-y-levels/1",
        "title": "Visualizar concentración conjunta",
        "language": "python",
        "code": "sns.kdeplot(data=ventas, x=\"inversion\", y=\"ingresos\", levels=5, fill=True, color=\"steelblue\")",
        "hint": "Se estima densidad conjunta de las dos variables.",
        "textOutput": "Regiones de color con distintos niveles de densidad.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/densidad-y-acumulada/ecdfplot",
    "remember": "En una ECDF de proporciones, el último escalón llega a 1.",
    "examples": [
      {
        "id": "seaborn/densidad-y-acumulada/ecdfplot/1",
        "title": "Ver la proporción de ingresos hasta cada monto",
        "language": "python",
        "code": "sns.ecdfplot(data=ventas, x=\"ingresos\")",
        "hint": "Cada salto corresponde a observaciones del mismo valor.",
        "textOutput": "Curva escalonada desde 0 hasta 1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/densidad-y-acumulada/rugplot",
    "remember": "Permite ver los datos reales debajo de una estimación suavizada.",
    "examples": [
      {
        "id": "seaborn/densidad-y-acumulada/rugplot/1",
        "title": "Mostrar los ingresos individuales",
        "language": "python",
        "code": "sns.kdeplot(data=ventas, x=\"ingresos\", color=\"steelblue\")\nsns.rugplot(data=ventas, x=\"ingresos\", color=\"steelblue\")",
        "hint": "Las marcas muestran las ubicaciones observadas.",
        "textOutput": "Curva KDE con marcas sobre el eje horizontal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/densidad-y-acumulada/displot",
    "remember": "`kind` selecciona la distribución; `col` o `row` crea paneles.",
    "examples": [
      {
        "id": "seaborn/densidad-y-acumulada/displot/1",
        "title": "Comparar distribuciones por región",
        "language": "python",
        "code": "sns.displot(data=ventas, x=\"ingresos\", col=\"region\", kind=\"hist\", bins=4)",
        "hint": "Se genera un histograma separado por región.",
        "textOutput": "Dos paneles con cuatro intervalos comunes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
