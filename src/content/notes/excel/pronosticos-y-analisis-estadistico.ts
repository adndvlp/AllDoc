// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/pronosticos-y-analisis-estadistico/definicion",
    "remember": "Un pronóstico depende de supuestos y calidad de datos.",
    "examples": [
      {
        "id": "excel/pronosticos-y-analisis-estadistico/definicion/1",
        "title": "Proyectar tendencia lineal",
        "language": "excel",
        "code": "=FORECAST.LINEAR(4,{10,20,30},{1,2,3})",
        "hint": "Un pronóstico depende de supuestos y calidad de datos.",
        "textOutput": "40.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/pronosticos-y-analisis-estadistico/forecast-linear-y-trend",
    "remember": "Extrapolar lejos de los datos aumenta el riesgo.",
    "examples": [
      {
        "id": "excel/pronosticos-y-analisis-estadistico/forecast-linear-y-trend/1",
        "title": "Proyectar ventas",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1:A3=1,2,3 y B1:B3=100,120,140; usa =FORECAST.LINEAR(4,B1:B3,A1:A3). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "160.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/pronosticos-y-analisis-estadistico/promedio-movil",
    "remember": "Indica tamaño de ventana y tratamiento de periodos iniciales.",
    "examples": [
      {
        "id": "excel/pronosticos-y-analisis-estadistico/promedio-movil/1",
        "title": "Media de tres meses",
        "language": "text",
        "code": "",
        "hint": "En Scratch B2:B5 introduce 100,120,140,180; en C4 escribe =AVERAGE(B2:B4) y copia a C5. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "120 y 146.6667 aproximadamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/pronosticos-y-analisis-estadistico/forecast-ets",
    "remember": "Usa una frecuencia temporal regular y suficiente historial; dos meses no bastan para validar estacionalidad.",
    "note": "Disponible en Excel de escritorio compatible; no asumir disponibilidad en web o móvil.",
    "examples": [
      {
        "id": "excel/pronosticos-y-analisis-estadistico/forecast-ets/1",
        "title": "Proyectar serie regular",
        "language": "text",
        "code": "",
        "hint": "En Scratch A2:A25 introduce fechas mensuales del 1 de enero de 2024 al 1 de diciembre de 2025; B2:B25=100 en cada mes. Usa =FORECAST.ETS(DATE(2026,1,1),B2:B25,A2:A25,1). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Alrededor de 100 para una serie constante.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/pronosticos-y-analisis-estadistico/analysis-toolpak-y-regresion",
    "remember": "Revisa residuos, supuestos y tamaño muestral, no solo R cuadrado.",
    "note": "En Windows activa el complemento desde Opciones; en Mac desde Herramientas > Complementos de Excel.",
    "examples": [
      {
        "id": "excel/pronosticos-y-analisis-estadistico/analysis-toolpak-y-regresion/1",
        "title": "Ajustar relación lineal",
        "language": "text",
        "code": "",
        "hint": "Activa Analysis ToolPak; Scratch A1=x, B1=y, A2:A5=1,2,3,4 y B2:B5=10,20,30,40. Datos > Análisis de datos > Regresión; X=A1:A5, Y=B1:B5, marca Rótulos. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Pendiente 10, intercepto aproximadamente 0, R²=1; ejemplo perfecto artificial.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/pronosticos-y-analisis-estadistico/pruebas-de-hipotesis",
    "remember": "El tipo de prueba depende del diseño; p-valor no mide tamaño del efecto.",
    "examples": [
      {
        "id": "excel/pronosticos-y-analisis-estadistico/pruebas-de-hipotesis/1",
        "title": "Comparar dos grupos",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1:A3=10,12,14 y B1:B3=20,22,24; usa =T.TEST(A1:A3,B1:B3,2,3). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "p-valor aproximadamente 0.0036 para prueba bilateral de Welch.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
