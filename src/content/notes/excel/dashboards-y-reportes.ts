// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/dashboards-y-reportes/definicion",
    "remember": "Define objetivo, periodo, población y fuente antes del diseño.",
    "examples": [
      {
        "id": "excel/dashboards-y-reportes/definicion/1",
        "title": "Resumen comercial",
        "language": "text",
        "code": "",
        "hint": "Crea hoja Report con tres celdas: ventas =SUMIF(tSales[status],\"completed\",tSales[amount]), pedidos =COUNTIF(tSales[status],\"completed\"), ticket =ventas/pedidos usando las referencias de esas dos celdas. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "1200, 6, 200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dashboards-y-reportes/tarjetas-kpi-y-metas",
    "remember": "No confundas ventas totales con ventas completadas.",
    "examples": [
      {
        "id": "excel/dashboards-y-reportes/tarjetas-kpi-y-metas/1",
        "title": "Tarjeta de febrero",
        "language": "text",
        "code": "",
        "hint": "En Report enlaza Targets!C3, Targets!B3 y una fórmula =Targets!C3/Targets!B3-1; aplica porcentaje a la variación. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Actual 700, meta 650, desviación relativa +7.69%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dashboards-y-reportes/interactividad",
    "remember": "Conecta cada segmentador solo a reportes compatibles.",
    "examples": [
      {
        "id": "excel/dashboards-y-reportes/interactividad/1",
        "title": "Controlar dos pivots",
        "language": "text",
        "code": "",
        "hint": "Crea dos pivots desde el mismo origen compatible tSales: ventas por estado y ventas por producto. Inserta segmentador channel y usa Conexiones de informe para ambas; selecciona Online. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Ambas pivots reflejan los cinco pedidos Online; total general 1400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dashboards-y-reportes/diseno-y-actualizacion",
    "remember": "Una fecha de recálculo con NOW no certifica que el origen se actualizó.",
    "examples": [
      {
        "id": "excel/dashboards-y-reportes/diseno-y-actualizacion/1",
        "title": "Actualizar reporte",
        "language": "text",
        "code": "",
        "hint": "En copia del libro, añade pedido 109 completado por 50 y actualiza consultas/pivots del reporte antes de registrar manualmente la fecha de actualización. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Ventas completadas 1250 y 7 pedidos; las visualizaciones deben coincidir con estos totales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
