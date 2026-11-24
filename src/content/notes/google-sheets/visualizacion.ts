// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/visualizacion/definicion",
    "remember": "Elige tipo según pregunta, no solo estética.",
    "examples": [
      {
        "id": "google-sheets/visualizacion/definicion/1",
        "title": "Comparar ventas por canal",
        "language": "text",
        "code": "",
        "hint": "Crea una tabla dinámica de canal con SUM de importe; selecciona las filas store y web sin total; Insertar > Gráfico > Columnas. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Dos columnas: store 900, web 1500.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/visualizacion/barras-y-columnas",
    "remember": "Ordena categorías si facilita lectura.",
    "examples": [
      {
        "id": "google-sheets/visualizacion/barras-y-columnas/1",
        "title": "Comparar estados",
        "language": "text",
        "code": "",
        "hint": "Selecciona los dos estados y sus totales de la tabla dinámica; inserta gráfico de barras. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "completed 2000 y cancelled 400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/visualizacion/lineas",
    "remember": "Conserva el orden cronológico.",
    "examples": [
      {
        "id": "google-sheets/visualizacion/lineas/1",
        "title": "Mostrar tendencia mensual",
        "language": "text",
        "code": "",
        "hint": "Selecciona la tabla mensual de completados (agosto 1100, septiembre 900) e inserta gráfico de líneas. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "La línea baja de 1100 a 900.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/visualizacion/dispersion-e-histogramas",
    "remember": "No confundas correlación con causalidad.",
    "examples": [
      {
        "id": "google-sheets/visualizacion/dispersion-e-histogramas/1",
        "title": "Ver distribución de importes",
        "language": "text",
        "code": "",
        "hint": "Selecciona Ventas!J1:J9; Insertar > Gráfico > Histograma. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "8 observaciones distribuidas en intervalos automáticos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/visualizacion/graficos-combinados-y-ejes",
    "remember": "Etiqueta cada eje para evitar lecturas engañosas.",
    "examples": [
      {
        "id": "google-sheets/visualizacion/graficos-combinados-y-ejes/1",
        "title": "Comparar ventas y pedidos",
        "language": "text",
        "code": "",
        "hint": "En Practica crea tabla Mes,Ingresos,Pedidos con Ago,1100,3 y Sep,900,3; selecciona e inserta gráfico combinado; asigna pedidos al eje derecho. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Columnas de ingresos y línea de 3 pedidos en ambos meses.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/visualizacion/sparkline",
    "remember": "Útil para tendencias en filas de indicadores.",
    "examples": [
      {
        "id": "google-sheets/visualizacion/sparkline/1",
        "title": "Mostrar mini tendencia",
        "language": "excel-formula",
        "code": "=SPARKLINE({1100,900},{\"charttype\",\"line\"})",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Una minilínea descendente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/visualizacion/formato-condicional",
    "remember": "Las referencias relativas se evalúan desde la primera celda del rango.",
    "examples": [
      {
        "id": "google-sheets/visualizacion/formato-condicional/1",
        "title": "Resaltar pedidos cancelados",
        "language": "text",
        "code": "",
        "hint": "En copia de Ventas aplica formato condicional a A2:K9 con fórmula personalizada =$H2=\"cancelled\". Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Filas de pedidos 104 y 108 resaltadas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/visualizacion/escalas-de-color",
    "remember": "Los extremos dependen del rango seleccionado.",
    "examples": [
      {
        "id": "google-sheets/visualizacion/escalas-de-color/1",
        "title": "Resaltar importes altos",
        "language": "text",
        "code": "",
        "hint": "Selecciona Ventas!J2:J9 y aplica escala de color desde formato condicional. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "600 recibe el color de máximo; 100 el de mínimo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
