// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/tablas-dinamicas/definicion",
    "remember": "Cada origen necesita encabezados y granularidad consistente.",
    "examples": [
      {
        "id": "google-sheets/tablas-dinamicas/definicion/1",
        "title": "Resumir importe por estado",
        "language": "text",
        "code": "",
        "hint": "Selecciona Ventas!A1:K9; Insertar > Tabla dinámica > Nueva hoja; Filas: estado; Valores: importe, SUM. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "cancelled 400; completed 2000; total 2400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/tablas-dinamicas/filas-columnas-valores-filtros",
    "remember": "Cambiar un campo de SUM a COUNT cambia la métrica.",
    "examples": [
      {
        "id": "google-sheets/tablas-dinamicas/filas-columnas-valores-filtros/1",
        "title": "Cruzar estado y canal",
        "language": "text",
        "code": "",
        "hint": "Crea una tabla dinámica de Ventas; Filas: canal; Columnas: estado; Valores: SUM de importe. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "store: 300 cancelado,600 completado; web: 100 cancelado,1400 completado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/tablas-dinamicas/agrupar-fechas",
    "remember": "No mezcles meses de años distintos si interesa la serie temporal.",
    "examples": [
      {
        "id": "google-sheets/tablas-dinamicas/agrupar-fechas/1",
        "title": "Resumir meses",
        "language": "text",
        "code": "",
        "hint": "Crea tabla dinámica de Ventas con fecha en Filas e importe SUM en Valores; filtra estado completed; clic derecho sobre fecha y agrupa por año-mes. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Agosto 1100; septiembre 900.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/tablas-dinamicas/porcentajes-y-campos-calculados",
    "remember": "Una razón de sumas no es lo mismo que la media de razones.",
    "examples": [
      {
        "id": "google-sheets/tablas-dinamicas/porcentajes-y-campos-calculados/1",
        "title": "Mostrar porcentaje por estado",
        "language": "text",
        "code": "",
        "hint": "En tabla dinámica de importe por estado, configura Mostrar como > % del total general. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "completed 83.33%; cancelled 16.67% aproximadamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/tablas-dinamicas/getpivotdata",
    "remember": "La referencia debe apuntar a una celda de la tabla dinámica.",
    "examples": [
      {
        "id": "google-sheets/tablas-dinamicas/getpivotdata/1",
        "title": "Recuperar total completado",
        "language": "text",
        "code": "",
        "hint": "Crea la tabla dinámica de estado en una hoja llamada Resumen desde A1; en Practica usa =GETPIVOTDATA(\"SUM of importe\",Resumen!A1,\"estado\",\"completed\") ajustando el nombre del valor al encabezado exacto de tu tabla. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "2000.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/tablas-dinamicas/segmentadores",
    "remember": "No sustituyen filtros de fórmulas independientes.",
    "examples": [
      {
        "id": "google-sheets/tablas-dinamicas/segmentadores/1",
        "title": "Filtrar tablero por canal",
        "language": "text",
        "code": "",
        "hint": "En la hoja de la tabla dinámica, Datos > Añadir segmentación de datos; selecciona Ventas!A1:K9, columna canal; conserva web. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "El total visible del resumen por estado pasa a 1500.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
