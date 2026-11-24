// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/control-de-calidad-y-conciliacion/definicion",
    "remember": "Una fórmula sin error no garantiza un resultado correcto.",
    "examples": [
      {
        "id": "excel/control-de-calidad-y-conciliacion/definicion/1",
        "title": "Comprobar total",
        "language": "excel",
        "code": "=SUM(tSales[amount])-SUMPRODUCT(tSales[quantity],tSales[unit_price])",
        "hint": "Una fórmula sin error no garantiza un resultado correcto.",
        "textOutput": "0.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/control-de-calidad-y-conciliacion/unicidad-y-granularidad",
    "remember": "Verifica qué representa cada fila antes de contarla.",
    "note": "Excel moderno; alternativa clásica: columna COUNTIF y revisión de valores mayores a 1.",
    "examples": [
      {
        "id": "excel/control-de-calidad-y-conciliacion/unicidad-y-granularidad/1",
        "title": "Comprobar pedidos únicos",
        "language": "excel",
        "code": "=COUNTA(tSales[order_id])-ROWS(UNIQUE(tSales[order_id]))",
        "hint": "Verifica qué representa cada fila antes de contarla.",
        "textOutput": "0 duplicados de id, con los datos sin blancos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/control-de-calidad-y-conciliacion/integridad-referencial",
    "remember": "Una búsqueda no encontrada debe investigarse.",
    "examples": [
      {
        "id": "excel/control-de-calidad-y-conciliacion/integridad-referencial/1",
        "title": "Comprobar clientes",
        "language": "excel",
        "code": "=SUMPRODUCT(--(COUNTIF(tCustomers[customer_id],tSales[customer_id])=0))",
        "hint": "Una búsqueda no encontrada debe investigarse. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "0 pedidos con cliente desconocido.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/control-de-calidad-y-conciliacion/completitud-y-rangos",
    "remember": "Distingue ausencia de valor de valor inválido.",
    "examples": [
      {
        "id": "excel/control-de-calidad-y-conciliacion/completitud-y-rangos/1",
        "title": "Controlar países faltantes",
        "language": "excel",
        "code": "=COUNTBLANK(tCustomers[country])",
        "hint": "Distingue ausencia de valor de valor inválido.",
        "textOutput": "1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/control-de-calidad-y-conciliacion/cruces-y-conciliacion",
    "remember": "Usa la misma definición de métrica y periodo.",
    "examples": [
      {
        "id": "excel/control-de-calidad-y-conciliacion/cruces-y-conciliacion/1",
        "title": "Conciliar reporte",
        "language": "excel",
        "code": "=SUM(Targets!C2:C3)-SUMIF(tSales[status],\"completed\",tSales[amount])",
        "hint": "Usa la misma definición de métrica y periodo.",
        "textOutput": "0; los reales de Targets coinciden con ventas completadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/control-de-calidad-y-conciliacion/control-de-errores-y-excepciones",
    "remember": "No reemplaces todos los errores por cero automáticamente.",
    "note": "FILTER requiere Excel moderno; alternativa: columna COUNTIF en Customers y filtro de ceros.",
    "examples": [
      {
        "id": "excel/control-de-calidad-y-conciliacion/control-de-errores-y-excepciones/1",
        "title": "Encontrar clientes sin compras",
        "language": "excel",
        "code": "=FILTER(tCustomers[name],COUNTIF(tSales[customer_id],tCustomers[customer_id])=0,\"Ninguno\")",
        "hint": "No reemplaces todos los errores por cero automáticamente. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Eva.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
