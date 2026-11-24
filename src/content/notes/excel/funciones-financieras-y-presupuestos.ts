// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/funciones-financieras-y-presupuestos/definicion",
    "remember": "Usa una misma periodicidad para tasas y flujos.",
    "examples": [
      {
        "id": "excel/funciones-financieras-y-presupuestos/definicion/1",
        "title": "Descontar un flujo",
        "language": "excel",
        "code": "=100/(1+10%)",
        "hint": "Usa una misma periodicidad para tasas y flujos.",
        "textOutput": "90.9091 aproximadamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-financieras-y-presupuestos/pmt",
    "remember": "Los signos indican entradas y salidas de efectivo.",
    "examples": [
      {
        "id": "excel/funciones-financieras-y-presupuestos/pmt/1",
        "title": "Calcular cuota",
        "language": "excel",
        "code": "=-PMT(12%/12,12,1200)",
        "hint": "Los signos indican entradas y salidas de efectivo.",
        "textOutput": "106.62 aproximadamente por mes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-financieras-y-presupuestos/npv-e-irr",
    "remember": "En NPV, el flujo inicial en t=0 se suma aparte.",
    "examples": [
      {
        "id": "excel/funciones-financieras-y-presupuestos/npv-e-irr/1",
        "title": "Evaluar inversión",
        "language": "excel",
        "code": "=-100+NPV(10%,120)\n=IRR({-100,120})",
        "hint": "En NPV, el flujo inicial en t=0 se suma aparte.",
        "textOutput": "9.0909 aproximadamente y 20%.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-financieras-y-presupuestos/xnpv-y-xirr",
    "remember": "El primer flujo representa la fecha base; incluye signos positivos y negativos.",
    "examples": [
      {
        "id": "excel/funciones-financieras-y-presupuestos/xnpv-y-xirr/1",
        "title": "Evaluar flujo fechado",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1:A2 introduce 1 de enero de 2025 y 1 de enero de 2026; B1:B2=-100,120; usa =XNPV(10%,B1:B2,A1:A2) y =XIRR(B1:B2,A1:A2). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "9.0909 aproximadamente y 20%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-financieras-y-presupuestos/presupuesto-y-forecast",
    "remember": "Distingue objetivos de proyecciones.",
    "examples": [
      {
        "id": "excel/funciones-financieras-y-presupuestos/presupuesto-y-forecast/1",
        "title": "Consolidar presupuesto",
        "language": "excel",
        "code": "=SUM(Targets!B2:B3)\n=SUM(Targets!C2:C3)-SUM(Targets!B2:B3)",
        "hint": "Distingue objetivos de proyecciones.",
        "textOutput": "Presupuesto 1250; desviación real -50.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
