// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/definicion",
    "remember": "Elige estadístico según pregunta y población.",
    "examples": [
      {
        "id": "google-sheets/estadistica-descriptiva/definicion/1",
        "title": "Calcular mediana de importes",
        "language": "excel-formula",
        "code": "=MEDIAN(Ventas!J2:J9)",
        "hint": "",
        "textOutput": "300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/median-y-mode",
    "remember": "La mediana es menos sensible a extremos que la media.",
    "examples": [
      {
        "id": "google-sheets/estadistica-descriptiva/median-y-mode/1",
        "title": "Encontrar centro y moda",
        "language": "excel-formula",
        "code": "={MEDIAN(Ventas!J2:J9),MODE(Ventas!J2:J9)}",
        "hint": "",
        "textOutput": "300,300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/stdev-s-stdev-p-var-s-var-p",
    "remember": "S para muestra, P para población completa.",
    "examples": [
      {
        "id": "google-sheets/estadistica-descriptiva/stdev-s-stdev-p-var-s-var-p/1",
        "title": "Medir dispersión de una población",
        "language": "excel-formula",
        "code": "={STDEV.P(2,4,6),VAR.P(2,4,6)}",
        "hint": "",
        "textOutput": "1.63299 y 2.66667 aproximadamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/percentile-y-quartile",
    "remember": "Percentil 0.5 equivale a mediana.",
    "examples": [
      {
        "id": "google-sheets/estadistica-descriptiva/percentile-y-quartile/1",
        "title": "Calcular cuartiles",
        "language": "excel-formula",
        "code": "={QUARTILE({10;20;30;40;50},1),PERCENTILE({10;20;30;40;50},0.75)}",
        "hint": "",
        "textOutput": "20,40.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/rank-rank-eq-rank-avg",
    "remember": "El orden 0 clasifica de mayor a menor.",
    "examples": [
      {
        "id": "google-sheets/estadistica-descriptiva/rank-rank-eq-rank-avg/1",
        "title": "Comparar empates",
        "language": "excel-formula",
        "code": "={RANK.EQ(90,{100;90;90;80},0),RANK.AVG(90,{100;90;90;80},0)}",
        "hint": "",
        "textOutput": "2,2.5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/large-y-small",
    "remember": "k empieza en 1.",
    "examples": [
      {
        "id": "google-sheets/estadistica-descriptiva/large-y-small/1",
        "title": "Encontrar segundo mayor importe",
        "language": "excel-formula",
        "code": "=LARGE(Ventas!J2:J9,2)",
        "hint": "",
        "textOutput": "400.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/frequency",
    "remember": "Devuelve una fila más que el número de límites.",
    "examples": [
      {
        "id": "google-sheets/estadistica-descriptiva/frequency/1",
        "title": "Distribuir importes",
        "language": "excel-formula",
        "code": "=FREQUENCY(Ventas!J2:J9,{200;400})",
        "hint": "",
        "textOutput": "3,4,1 en columna: hasta 200, entre 200 y 400, más de 400.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/valores-atipicos-e-iqr",
    "remember": "Un dato atípico no es necesariamente erróneo.",
    "examples": [
      {
        "id": "google-sheets/estadistica-descriptiva/valores-atipicos-e-iqr/1",
        "title": "Calcular IQR",
        "language": "excel-formula",
        "code": "=QUARTILE({10;20;30;40;50},3)-QUARTILE({10;20;30;40;50},1)",
        "hint": "",
        "textOutput": "20.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/promedio-movil",
    "remember": "El periodo y orden deben estar definidos.",
    "examples": [
      {
        "id": "google-sheets/estadistica-descriptiva/promedio-movil/1",
        "title": "Calcular media móvil de tres días",
        "language": "text",
        "code": "",
        "hint": "En Practica B1:B5 escribe 10,20,30,40,50; en C3 escribe =AVERAGE(B1:B3) y copia hasta C5. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "C3:C5: 20,30,40.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
