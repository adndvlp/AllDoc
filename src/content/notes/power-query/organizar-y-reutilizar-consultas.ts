// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/organizar-y-reutilizar-consultas/definicion",
    "remember": "Una consulta intermedia puede alimentar varias salidas sin cargarla como tabla final.",
    "examples": [
      {
        "id": "power-query/organizar-y-reutilizar-consultas/definicion/1",
        "title": "Crear una salida a partir de Pedidos",
        "language": "powerquery",
        "code": "Table.SelectRows(Pedidos, each [estado] = \"completado\")",
        "hint": "Crea una nueva consulta llamada PedidosValidos; su referencia sigue usando Pedidos.",
        "textOutput": "5 filas de pedidos completados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/organizar-y-reutilizar-consultas/duplicate-y-reference",
    "remember": "Reference depende de la consulta original; Duplicate no depende de ella automáticamente.",
    "note": "Referenciar no garantiza una única lectura física del origen durante la actualización.",
    "examples": [
      {
        "id": "power-query/organizar-y-reutilizar-consultas/duplicate-y-reference/1",
        "title": "Comparar dos consultas derivadas",
        "code": "",
        "steps": [
          "Crea una consulta BasePrueba con el literal #table({\"id\"},{{1},{2}})",
          "Clic derecho > Duplicar y Referencia para crear dos derivadas",
          "Edita BasePrueba y agrega una tercera fila {3}"
        ],
        "external": true,
        "hint": "La referencia cambia junto a BasePrueba; la copia mantiene sus pasos previos.",
        "textOutput": "Referencia: 3 filas; duplicado: 2 filas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/organizar-y-reutilizar-consultas/grupos-y-dependencias",
    "remember": "Usa nombres descriptivos como origen, limpieza y salida.",
    "examples": [
      {
        "id": "power-query/organizar-y-reutilizar-consultas/grupos-y-dependencias/1",
        "title": "Separar consultas de origen y salida",
        "code": "",
        "steps": [
          "Crea grupos Origen y Reportes",
          "Coloca Pedidos en Origen y PedidosValidos en Reportes",
          "Abre Vista > Dependencias de consulta en Power BI Desktop"
        ],
        "external": true,
        "hint": "La organización visual no cambia la lógica de datos.",
        "textOutput": "Se observa la dependencia Pedidos → PedidosValidos; cada grupo contiene la consulta correspondiente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
