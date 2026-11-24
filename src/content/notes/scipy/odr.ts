// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/odr/definicion",
    "remember": "Si x también tiene error, considera un modelo que lo represente.",
    "note": "API de referencia SciPy 1.17.0; scipy.odr está deprecado desde esa versión. Para proyectos nuevos se recomienda la alternativa externa odrpack; se conserva aquí por el temario acordado.",
    "examples": [
      {
        "id": "scipy/odr/definicion/1",
        "title": "Ajustar recta con incertidumbre en ambos ejes",
        "code": "from scipy import odr\ndef recta(beta, x):\n    return beta[0]*x+beta[1]\ndatos = odr.RealData(publicidad, ingresos, sx=np.full(5,0.2), sy=np.full(5,0.5))\nr = odr.ODR(datos, odr.Model(recta), beta0=[2,0]).run()\nprint(np.round(r.beta, 3))",
        "hint": "Se declaran desviaciones conocidas en x e y.",
        "textOutput": "[2.138 0.587]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
