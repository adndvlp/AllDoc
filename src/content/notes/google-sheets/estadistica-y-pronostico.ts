// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/definicion",
    "remember": "Correlación no demuestra causalidad.",
    "examples": [
      {
        "id": "google-sheets/estadistica-y-pronostico/definicion/1",
        "title": "Medir relación lineal",
        "language": "excel-formula",
        "code": "=CORREL({1;2;3},{2;4;6})",
        "hint": "",
        "textOutput": "1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/correl-y-covariance",
    "remember": "La covarianza depende de las unidades.",
    "examples": [
      {
        "id": "google-sheets/estadistica-y-pronostico/correl-y-covariance/1",
        "title": "Calcular covarianza poblacional",
        "language": "excel-formula",
        "code": "=COVARIANCE.P({1;2;3},{2;4;6})",
        "hint": "",
        "textOutput": "1.33333 aproximadamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/slope-intercept-rsq",
    "remember": "Primero pasa y, después x.",
    "examples": [
      {
        "id": "google-sheets/estadistica-y-pronostico/slope-intercept-rsq/1",
        "title": "Medir ajuste de una línea",
        "language": "excel-formula",
        "code": "={SLOPE({2;4;6},{1;2;3}),INTERCEPT({2;4;6},{1;2;3}),RSQ({2;4;6},{1;2;3})}",
        "hint": "",
        "textOutput": "2,0,1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/forecast-y-trend",
    "remember": "No garantizan valores futuros.",
    "examples": [
      {
        "id": "google-sheets/estadistica-y-pronostico/forecast-y-trend/1",
        "title": "Predecir el cuarto periodo",
        "language": "excel-formula",
        "code": "=FORECAST(4,{2;4;6},{1;2;3})",
        "hint": "",
        "textOutput": "8.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/linest",
    "remember": "La salida puede ocupar varias celdas.",
    "examples": [
      {
        "id": "google-sheets/estadistica-y-pronostico/linest/1",
        "title": "Estimar pendiente e intercepto",
        "language": "excel-formula",
        "code": "=LINEST({2;4;6},{1;2;3},TRUE,FALSE)",
        "hint": "",
        "textOutput": "Una fila con 2,0.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/t-test",
    "remember": "Tipo 1 pareada; 2 varianzas iguales; 3 varianzas desiguales.",
    "examples": [
      {
        "id": "google-sheets/estadistica-y-pronostico/t-test/1",
        "title": "Comparar dos grupos",
        "language": "excel-formula",
        "code": "=T.TEST({10;12;14},{10;12;14},2,2)",
        "hint": "",
        "textOutput": "1, con dos colas y varianzas iguales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/z-test",
    "remember": "Requiere supuestos adecuados sobre la muestra y desviación.",
    "examples": [
      {
        "id": "google-sheets/estadistica-y-pronostico/z-test/1",
        "title": "Evaluar media de referencia",
        "language": "excel-formula",
        "code": "=Z.TEST({8;10;12},10,2)",
        "hint": "",
        "textOutput": "0.5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/chisq-test",
    "remember": "Usa frecuencias esperadas positivas y grados de libertad apropiados.",
    "examples": [
      {
        "id": "google-sheets/estadistica-y-pronostico/chisq-test/1",
        "title": "Comparar tabla de frecuencias",
        "language": "excel-formula",
        "code": "=CHISQ.TEST({20,30;30,20},{25,25;25,25})",
        "hint": "",
        "textOutput": "Aproximadamente 0.0455.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/intervalos-de-confianza",
    "remember": "Suma y resta el margen a la media; no es una garantía de resultados individuales.",
    "examples": [
      {
        "id": "google-sheets/estadistica-y-pronostico/intervalos-de-confianza/1",
        "title": "Calcular margen normal",
        "language": "excel-formula",
        "code": "=CONFIDENCE.NORM(0.05,10,100)",
        "hint": "",
        "textOutput": "Aproximadamente 1.96.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
