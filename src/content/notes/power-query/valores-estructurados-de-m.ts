// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/valores-estructurados-de-m/definicion",
    "remember": "Las estructuras se pueden anidar y transformar.",
    "examples": [
      {
        "id": "power-query/valores-estructurados-de-m/definicion/1",
        "title": "Crear una fila de pedido",
        "language": "powerquery",
        "code": "[id=101, importe=100]",
        "hint": "El registro tiene dos campos nombrados.",
        "textOutput": "[id=101, importe=100].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/valores-estructurados-de-m/list",
    "remember": "`{0}` obtiene el primer elemento.",
    "examples": [
      {
        "id": "power-query/valores-estructurados-de-m/list/1",
        "title": "Leer el segundo importe",
        "language": "powerquery",
        "code": "{100, 200, 150}{1}",
        "hint": "El índice 1 es el segundo valor.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/valores-estructurados-de-m/record",
    "remember": "Accede al campo por su nombre, no por posición.",
    "examples": [
      {
        "id": "power-query/valores-estructurados-de-m/record/1",
        "title": "Leer el nombre del cliente",
        "language": "powerquery",
        "code": "[cliente=1, nombre=\"Ana\"][nombre]",
        "hint": "El segundo par de corchetes selecciona el campo.",
        "textOutput": "\"Ana\".",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/valores-estructurados-de-m/table",
    "remember": "`#table` recibe nombres o tipo de tabla y una lista de filas.",
    "examples": [
      {
        "id": "power-query/valores-estructurados-de-m/table/1",
        "title": "Construir dos pedidos",
        "language": "powerquery",
        "code": "#table({\"id\",\"importe\"}, {{1,100},{2,200}})",
        "hint": "Cada lista interna representa una fila.",
        "textOutput": "Columnas id e importe; (1,100), (2,200).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/valores-estructurados-de-m/acceso-a-columnas-y-filas",
    "remember": "Distingue devolver una tabla, una lista y un valor.",
    "examples": [
      {
        "id": "power-query/valores-estructurados-de-m/acceso-a-columnas-y-filas/1",
        "title": "Leer el importe de la primera fila",
        "language": "powerquery",
        "code": "Pedidos{0}[importe]",
        "hint": "Primero selecciona la fila y después su campo.",
        "textOutput": "100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/valores-estructurados-de-m/conversion-entre-estructuras",
    "remember": "Una lista de registros con campos comunes puede convertirse en tabla.",
    "examples": [
      {
        "id": "power-query/valores-estructurados-de-m/conversion-entre-estructuras/1",
        "title": "Convertir registros en tabla",
        "language": "powerquery",
        "code": "Table.FromRecords({[id=1, importe=100], [id=2, importe=200]})",
        "hint": "Cada registro se transforma en una fila.",
        "textOutput": "2 filas, columnas id e importe.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
