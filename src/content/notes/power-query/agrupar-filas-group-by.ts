// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/agrupar-filas-group-by/definicion",
    "remember": "La clave define la granularidad de la salida.",
    "examples": [
      {
        "id": "power-query/agrupar-filas-group-by/definicion/1",
        "title": "Sumar importe por cliente",
        "language": "powerquery",
        "code": "Table.Group(Pedidos, {\"cliente\"}, {{\"total\", each List.Sum([importe]), type number}})",
        "hint": "Inicio > Agrupar por; elige cliente y Suma de importe.",
        "textOutput": "3 filas (cliente,total): (1,600),(2,230),(3,200).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/agrupar-filas-group-by/varias-agregaciones",
    "remember": "Cada función recibe las filas del grupo.",
    "examples": [
      {
        "id": "power-query/agrupar-filas-group-by/varias-agregaciones/1",
        "title": "Calcular ventas y pedidos por cliente",
        "language": "powerquery",
        "code": "Table.Group(Pedidos, {\"cliente\"}, {{\"total\", each List.Sum([importe]), type number}, {\"pedidos\", each Table.RowCount(_), Int64.Type}})",
        "hint": "En Agrupar por, modo Avanzado, añade ambas agregaciones.",
        "textOutput": "(1,600,3),(2,230,2),(3,200,2).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/agrupar-filas-group-by/varias-claves",
    "remember": "Más claves pueden producir más filas.",
    "examples": [
      {
        "id": "power-query/agrupar-filas-group-by/varias-claves/1",
        "title": "Obtener importe por cliente y estado",
        "language": "powerquery",
        "code": "Table.Group(Pedidos, {\"cliente\",\"estado\"}, {{\"total\", each List.Sum([importe]), type number}})",
        "hint": "Se incluyen cliente y estado en la clave.",
        "textOutput": "(1,completado,600),(2,cancelado,80),(2,completado,150),(3,completado,150),(3,pendiente,50).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/agrupar-filas-group-by/filtros-antes-y-despues",
    "remember": "El orden de las operaciones cambia el significado.",
    "examples": [
      {
        "id": "power-query/agrupar-filas-group-by/filtros-antes-y-despues/1",
        "title": "Buscar clientes con más de 200 en completados",
        "language": "powerquery",
        "code": "let F = Table.SelectRows(Pedidos, each [estado] = \"completado\"), G = Table.Group(F, {\"cliente\"}, {{\"total\", each List.Sum([importe]), type number}}) in Table.SelectRows(G, each [total] > 200)",
        "hint": "Se filtran estados antes y totales después.",
        "textOutput": "Una fila (1,600).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/agrupar-filas-group-by/all-rows",
    "remember": "Agrupa sin perder el acceso a los registros originales.",
    "examples": [
      {
        "id": "power-query/agrupar-filas-group-by/all-rows/1",
        "title": "Conservar el detalle por cliente",
        "language": "powerquery",
        "code": "Table.Group(Pedidos, {\"cliente\"}, {{\"detalle\", each _, type table}})",
        "hint": "En Agrupar por, operación Todas las filas.",
        "textOutput": "3 filas, con tablas anidadas de 3,2,2 registros para clientes 1,2,3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
