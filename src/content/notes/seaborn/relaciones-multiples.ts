// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/relaciones-multiples/definicion",
    "remember": "`jointplot` estudia dos variables; `pairplot` explora varias.",
    "examples": [
      {
        "id": "seaborn/relaciones-multiples/definicion/1",
        "title": "Explorar dos medidas",
        "language": "python",
        "code": "sns.jointplot(data=ventas, x=\"inversion\", y=\"ingresos\")",
        "hint": "Los paneles marginales muestran cada distribución por separado.",
        "textOutput": "Dispersión central e histogramas marginales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/relaciones-multiples/jointplot",
    "remember": "`kind` cambia el gráfico central y sus marginales según la opción.",
    "examples": [
      {
        "id": "seaborn/relaciones-multiples/jointplot/1",
        "title": "Mostrar densidad conjunta",
        "language": "python",
        "code": "sns.jointplot(data=ventas, x=\"inversion\", y=\"ingresos\", kind=\"kde\", fill=True)",
        "hint": "Se estima dónde se concentran ambos valores.",
        "textOutput": "Contornos de densidad y curvas marginales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/relaciones-multiples/pairplot",
    "remember": "Selecciona `vars` para evitar una cuadrícula enorme.",
    "examples": [
      {
        "id": "seaborn/relaciones-multiples/pairplot/1",
        "title": "Explorar tres indicadores",
        "language": "python",
        "code": "sns.pairplot(ventas, vars=[\"ingresos\", \"inversion\", \"pedidos\"], hue=\"canal\", diag_kind=\"hist\")",
        "hint": "Las relaciones se separan por canal.",
        "textOutput": "Cuadrícula 3 × 3 con histogramas en la diagonal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/relaciones-multiples/corner-y-diag-kind",
    "remember": "Sirve para ahorrar espacio sin perder relaciones únicas.",
    "examples": [
      {
        "id": "seaborn/relaciones-multiples/corner-y-diag-kind/1",
        "title": "Mostrar solo combinaciones necesarias",
        "language": "python",
        "code": "sns.pairplot(ventas, vars=[\"ingresos\", \"inversion\", \"pedidos\"], corner=True, diag_kind=\"hist\", diag_kws={\"color\":\"steelblue\"})",
        "hint": "Se muestran la diagonal y la parte inferior.",
        "textOutput": "Seis paneles visibles.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
