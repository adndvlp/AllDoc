// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/tablas-dinamicas/definicion",
    "remember": "Filas y columnas definen grupos; Valores define cálculos.",
    "examples": [
      {
        "id": "excel/tablas-dinamicas/definicion/1",
        "title": "Ventas por estado",
        "language": "text",
        "code": "",
        "hint": "Insertar > Tabla dinámica desde tSales; status en Filas y amount en Valores como Suma. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "cancelled=600, completed=1200, pending=300; total 2100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/tablas-dinamicas/filas-columnas-y-filtros",
    "remember": "Una dimensión puede mostrar varios niveles.",
    "examples": [
      {
        "id": "excel/tablas-dinamicas/filas-columnas-y-filtros/1",
        "title": "Cruzar estado y canal",
        "language": "text",
        "code": "",
        "hint": "Crea pivot de tSales con status en Filas, channel en Columnas, Suma de amount en Valores. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "completed: Online 800, Store 400; cancelled: Online 600; pending: Store 300; total 2100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/tablas-dinamicas/suma-recuento-y-promedio",
    "remember": "Comprueba si Excel eligió Suma o Recuento automáticamente.",
    "examples": [
      {
        "id": "excel/tablas-dinamicas/suma-recuento-y-promedio/1",
        "title": "Ticket por estado",
        "language": "text",
        "code": "",
        "hint": "status en Filas y amount en Valores, selecciona Promedio. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "cancelled 600; completed 200; pending 300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/tablas-dinamicas/agrupar-fechas",
    "remember": "Agrupa año y mes si hay varios años.",
    "examples": [
      {
        "id": "excel/tablas-dinamicas/agrupar-fechas/1",
        "title": "Ventas mensuales",
        "language": "text",
        "code": "",
        "hint": "order_date en Filas; agrupa por Años y Meses; status como filtro completed; Suma de amount. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Enero 500; febrero 700; total 1200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/tablas-dinamicas/mostrar-valores-como",
    "remember": "El porcentaje depende del contexto de la tabla dinámica.",
    "examples": [
      {
        "id": "excel/tablas-dinamicas/mostrar-valores-como/1",
        "title": "Participación por canal",
        "language": "text",
        "code": "",
        "hint": "channel en Filas, status filtrado completed, amount como Suma; Mostrar valores como % del total general. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Online 66.67%; Store 33.33%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/tablas-dinamicas/campos-y-elementos-calculados",
    "remember": "No uses un campo calculado para multiplicar cantidades por precios de distintas filas; calcula el importe en origen.",
    "note": "Para el Modelo de datos se usan medidas DAX, no campos calculados clásicos.",
    "examples": [
      {
        "id": "excel/tablas-dinamicas/campos-y-elementos-calculados/1",
        "title": "Comisión fija",
        "language": "text",
        "code": "",
        "hint": "En pivot clásica con status en Filas, crea campo calculado Commission con fórmula =amount*0.10. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Total 210; para completed 120.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/tablas-dinamicas/segmentadores-y-escala-de-tiempo",
    "remember": "Una segmentación solo controla las pivots conectadas.",
    "examples": [
      {
        "id": "excel/tablas-dinamicas/segmentadores-y-escala-de-tiempo/1",
        "title": "Filtrar canal",
        "language": "text",
        "code": "",
        "hint": "Inserta segmentador channel en la pivot de ventas por estado; pulsa Online. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "completed 800, cancelled 600; total visible 1400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/tablas-dinamicas/actualizar-y-cambiar-origen",
    "remember": "Una tabla fuente facilita incorporar filas; actualizar sigue siendo necesario cuando no hay actualización automática.",
    "examples": [
      {
        "id": "excel/tablas-dinamicas/actualizar-y-cambiar-origen/1",
        "title": "Agregar un registro",
        "language": "text",
        "code": "",
        "hint": "En copia de tSales añade 109, 2026-02-16, C5, P3, 1, 50, completed, Store, 50; actualiza la pivot de ventas por estado. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "completed 1250; total 2150.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/tablas-dinamicas/getpivotdata",
    "remember": "Es más resistente al movimiento de celdas que una referencia fija.",
    "examples": [
      {
        "id": "excel/tablas-dinamicas/getpivotdata/1",
        "title": "Extraer total completado",
        "language": "text",
        "code": "",
        "hint": "Crea en Scratch!A3 una pivot de status y Suma de amount. Escribe =GETPIVOTDATA(\"amount\",$A$3,\"status\",\"completed\") fuera de ella (si Excel asigna otro nombre al campo de datos, usa ese nombre). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "1200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
