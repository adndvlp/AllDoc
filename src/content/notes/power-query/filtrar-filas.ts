// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/filtrar-filas/definicion",
    "remember": "El filtro evalúa una condición por fila.",
    "examples": [
      {
        "id": "power-query/filtrar-filas/definicion/1",
        "title": "Quedarse con completados",
        "language": "powerquery",
        "code": "Table.SelectRows(Pedidos, each [estado] = \"completado\")",
        "hint": "Usa la flecha de filtro del encabezado estado en la interfaz.",
        "textOutput": "5 filas, ids 101,102,104,105,107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/filtrar-filas/comparaciones-y-rangos",
    "remember": "Define si los extremos son inclusivos o exclusivos.",
    "examples": [
      {
        "id": "power-query/filtrar-filas/comparaciones-y-rangos/1",
        "title": "Filtrar importes de 100 a 200 inclusive",
        "language": "powerquery",
        "code": "Table.SelectRows(Pedidos, each [importe] >= 100 and [importe] <= 200)",
        "hint": "Ambos extremos están incluidos.",
        "textOutput": "Ids 101,102,104,105.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/filtrar-filas/and-or-y-not",
    "remember": "Usa paréntesis para agrupar condiciones.",
    "examples": [
      {
        "id": "power-query/filtrar-filas/and-or-y-not/1",
        "title": "Elegir pedidos válidos de importe alto",
        "language": "powerquery",
        "code": "Table.SelectRows(Pedidos, each ([estado] = \"completado\" or [estado] = \"pendiente\") and not ([importe] < 150))",
        "hint": "Se acepta el estado indicado y el importe mínimo.",
        "textOutput": "Ids 102,104,105,107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/filtrar-filas/lista-de-valores",
    "remember": "La lista indica qué valores aceptas.",
    "examples": [
      {
        "id": "power-query/filtrar-filas/lista-de-valores/1",
        "title": "Seleccionar pedidos de dos clientes",
        "language": "powerquery",
        "code": "Table.SelectRows(Pedidos, each List.Contains({1,3}, [cliente]))",
        "hint": "La pertenencia se comprueba por fila.",
        "textOutput": "Ids 101,102,105,106,107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/filtrar-filas/filtros-de-texto",
    "remember": "Especifica comparador si quieres ignorar mayúsculas y controla null.",
    "examples": [
      {
        "id": "power-query/filtrar-filas/filtros-de-texto/1",
        "title": "Buscar nombres con la letra a",
        "language": "powerquery",
        "code": "Table.SelectRows(Clientes, each Text.Contains([nombre], \"a\", Comparer.OrdinalIgnoreCase))",
        "hint": "El comparador ignora diferencias de caso.",
        "textOutput": "Ana y Marta (clientes 1 y 3).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
