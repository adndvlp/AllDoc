// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/modelo-de-datos-y-power-pivot/definicion",
    "remember": "Una tabla de hechos registra eventos y una dimensión describe entidades.",
    "note": "Power Pivot requiere una edición de Excel para Windows compatible; Mac y web no ofrecen la misma capacidad de autoría.",
    "examples": [
      {
        "id": "excel/modelo-de-datos-y-power-pivot/definicion/1",
        "title": "Crear modelo",
        "language": "text",
        "code": "",
        "hint": "En Excel Windows compatible, carga tSales y tCustomers al Modelo de datos; crea relación tSales[customer_id] → tCustomers[customer_id]. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Modelo con dos tablas y una relación muchos a uno.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/modelo-de-datos-y-power-pivot/claves-relaciones-y-cardinalidad",
    "remember": "El lado uno debe tener claves únicas.",
    "examples": [
      {
        "id": "excel/modelo-de-datos-y-power-pivot/claves-relaciones-y-cardinalidad/1",
        "title": "Relacionar productos",
        "language": "text",
        "code": "",
        "hint": "Añade tProducts al modelo; relaciona tSales[product_id] con tProducts[product_id]. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Cada pedido se vincula a uno de tres productos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/modelo-de-datos-y-power-pivot/esquema-estrella",
    "remember": "Conserva la granularidad del hecho y evita relaciones ambiguas.",
    "examples": [
      {
        "id": "excel/modelo-de-datos-y-power-pivot/esquema-estrella/1",
        "title": "Diseñar ventas",
        "language": "text",
        "code": "",
        "hint": "En vista de diagrama conecta tCustomers y tProducts con tSales mediante sus claves; no conectes directamente las dos dimensiones. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Dos relaciones 1:N hacia la tabla central de pedidos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/modelo-de-datos-y-power-pivot/tabla-calendario",
    "remember": "Usa fechas únicas, contiguas y con cobertura suficiente.",
    "examples": [
      {
        "id": "excel/modelo-de-datos-y-power-pivot/tabla-calendario/1",
        "title": "Crear calendario",
        "language": "text",
        "code": "",
        "hint": "En hoja Calendar escribe date en A1 y =DATE(2026,1,1) en A2; en A3 escribe =A2+1 y rellena hasta 31 de diciembre de 2026 (fila 366); añade year y month con YEAR/MONTH. Convierte en tCalendar, carga al modelo y relaciona date con tSales[order_date]. Marca como tabla de fechas si procede. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "365 fechas; todos los pedidos tienen una fecha relacionada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/modelo-de-datos-y-power-pivot/pivot-desde-el-modelo",
    "remember": "No es necesario unir físicamente todas las columnas en una hoja.",
    "examples": [
      {
        "id": "excel/modelo-de-datos-y-power-pivot/pivot-desde-el-modelo/1",
        "title": "Contar clientes compradores",
        "language": "text",
        "code": "",
        "hint": "Crea una pivot desde el modelo; tCustomers[country] en Filas y tSales[customer_id] en Valores como Recuento distinto, sin filtrar status. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Mexico 2, Spain 1, país vacío 1; total distinto 4. Eva no tiene pedido.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
