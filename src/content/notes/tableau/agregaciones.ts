// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/agregaciones/definicion",
    "remember": "Sin dimensiones se obtiene normalmente una marca agregada.",
    "examples": [
      {
        "id": "tableau/agregaciones/definicion/1",
        "title": "Sumar ventas",
        "language": "text",
        "code": "SUM([Ventas])",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo en Text (Marks):",
        "hint": "",
        "textOutput": "1750.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/agregaciones/sum-y-avg",
    "remember": "AVG de líneas no es el ticket promedio por pedido.",
    "examples": [
      {
        "id": "tableau/agregaciones/sum-y-avg/1",
        "title": "Promedio de línea",
        "language": "text",
        "code": "AVG([Ventas])",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo en Text (Marks):",
        "hint": "",
        "textOutput": "218.75.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/agregaciones/count-y-countd",
    "remember": "Para pedidos usa COUNTD si hay varias líneas por pedido.",
    "examples": [
      {
        "id": "tableau/agregaciones/count-y-countd/1",
        "title": "Contar pedidos",
        "language": "text",
        "code": "COUNTD([Pedido])",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo en Text (Marks):",
        "hint": "",
        "textOutput": "7; COUNT([Pedido]) devuelve 8.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/agregaciones/min-y-max",
    "remember": "Se pueden aplicar a números y fechas.",
    "examples": [
      {
        "id": "tableau/agregaciones/min-y-max/1",
        "title": "Obtener máximos regionales",
        "code": "",
        "steps": [
          "Region en Rows",
          "fórmula MAX([Ventas]) en Text."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Norte 200, Sur 600.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/agregaciones/median-y-dispersion",
    "remember": "La mediana es menos sensible a valores extremos que AVG.",
    "note": "Disponibilidad según conector; usa extract si la función no está soportada.",
    "examples": [
      {
        "id": "tableau/agregaciones/median-y-dispersion/1",
        "title": "Mediana de ventas",
        "language": "text",
        "code": "MEDIAN([Ventas])",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo en Text (Marks):",
        "hint": "",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/agregaciones/attr",
    "remember": "El asterisco no significa NULL.",
    "examples": [
      {
        "id": "tableau/agregaciones/attr/1",
        "title": "Comprobar categorías",
        "code": "",
        "external": true,
        "hint": "Coloca Region en Rows y ATTR([Categoria]) en Text.",
        "textOutput": "Norte y Sur muestran * porque cada región contiene más de una categoría.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/agregaciones/desagregar-medidas",
    "remember": "Desagregar permite inspeccionar puntos individuales.",
    "examples": [
      {
        "id": "tableau/agregaciones/desagregar-medidas/1",
        "title": "Ver pares de valores por línea",
        "code": "",
        "external": true,
        "hint": "Pon Ventas en Columns, Costo en Rows y desmarca Analysis > Aggregate Measures.",
        "textOutput": "Ocho marcas de datos, aunque algunos puntos se superponen.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
