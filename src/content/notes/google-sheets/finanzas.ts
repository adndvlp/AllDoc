// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/finanzas/definicion",
    "remember": "Mantén periodos de tasa y pagos compatibles; ingresos y pagos tienen signos opuestos.",
    "examples": [
      {
        "id": "google-sheets/finanzas/definicion/1",
        "title": "Calcular valor futuro",
        "language": "excel-formula",
        "code": "=FV(0.1,1,0,-1000)",
        "hint": "",
        "textOutput": "1100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/finanzas/pv-fv-pmt",
    "remember": "Las tasas deben corresponder al periodo de pago.",
    "examples": [
      {
        "id": "google-sheets/finanzas/pv-fv-pmt/1",
        "title": "Calcular mensualidad sin interés",
        "language": "excel-formula",
        "code": "=PMT(0,12,1200)",
        "hint": "",
        "textOutput": "-100, salida mensual.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/finanzas/rate",
    "remember": "Puede requerir una estimación inicial y no siempre converge.",
    "examples": [
      {
        "id": "google-sheets/finanzas/rate/1",
        "title": "Obtener tasa de un periodo",
        "language": "excel-formula",
        "code": "=RATE(1,0,-1000,1100)",
        "hint": "",
        "textOutput": "10% aproximadamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/finanzas/npv-e-irr",
    "remember": "En NPV suma por separado inversión inicial en tiempo cero.",
    "examples": [
      {
        "id": "google-sheets/finanzas/npv-e-irr/1",
        "title": "Calcular VPN de un proyecto",
        "language": "excel-formula",
        "code": "=-1000+NPV(0.1,1100)",
        "hint": "",
        "textOutput": "0, salvo redondeo numérico.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/finanzas/xnpv-y-xirr",
    "remember": "Incluye inversión inicial y fechas reales.",
    "examples": [
      {
        "id": "google-sheets/finanzas/xnpv-y-xirr/1",
        "title": "Calcular TIR anual con fechas",
        "language": "excel-formula",
        "code": "=XIRR({-1000;1100},{DATE(2025,1,1);DATE(2026,1,1)})",
        "hint": "",
        "textOutput": "10% aproximadamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/finanzas/roi-y-depreciacion",
    "remember": "ROI simple no ajusta por tiempo.",
    "examples": [
      {
        "id": "google-sheets/finanzas/roi-y-depreciacion/1",
        "title": "Calcular depreciación anual",
        "language": "excel-formula",
        "code": "=SLN(1000,100,3)",
        "hint": "",
        "textOutput": "300 por año.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/finanzas/sensibilidad-y-goal-seek",
    "remember": "Goal Seek y Solver requieren complementos y permisos; no son fórmulas nativas.",
    "examples": [
      {
        "id": "google-sheets/finanzas/sensibilidad-y-goal-seek/1",
        "title": "Encontrar precio objetivo",
        "language": "text",
        "code": "",
        "hint": "En Practica B1=40 (unidades), B2=100 (precio), B3 =B1*B2; instala Goal Seek desde Marketplace si autorizado; fija B3 en 5000 cambiando B2. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Precio objetivo 125; ingreso 5000. Sin complemento, calcula =5000/40.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
