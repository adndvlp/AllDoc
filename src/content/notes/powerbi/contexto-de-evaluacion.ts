// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/contexto-de-evaluacion/definicion",
    "remember": "Contexto de fila no es lo mismo que filtrar toda la tabla.",
    "examples": [
      {
        "id": "powerbi/contexto-de-evaluacion/definicion/1",
        "title": "Observar contexto de filtro",
        "code": "",
        "steps": [
          "Pon Ventas en tarjeta.",
          "Añade segmentador Clientes[Pais], selecciona Mexico."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La medida cambia de 1100 a 820 sin alterar las filas almacenadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/contexto-de-evaluacion/row-context",
    "remember": "Un contexto de fila por sí solo no filtra un SUM sobre toda la tabla.",
    "note": "Nueva columna de Pedidos.",
    "examples": [
      {
        "id": "powerbi/contexto-de-evaluacion/row-context/1",
        "title": "Multiplicar campos de la fila",
        "language": "dax",
        "code": "ImporteFila = Pedidos[Cantidad] * Pedidos[Precio]",
        "hint": "",
        "textOutput": "Pedido 2 devuelve 200; pedido 4 devuelve 80.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/contexto-de-evaluacion/filter-context",
    "remember": "Una medida se evalúa por cada celda del visual.",
    "examples": [
      {
        "id": "powerbi/contexto-de-evaluacion/filter-context/1",
        "title": "Ventas por cliente",
        "code": "",
        "steps": [
          "Tabla visual con Clientes[Nombre] y Ventas.",
          "Activa Mostrar elementos sin datos si quieres ver Diego."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ana 520, Luis 280, Marta 300; Diego en blanco si se muestra.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/contexto-de-evaluacion/context-transition",
    "remember": "Una agregación directa en columna no se limita por sí sola a la fila.",
    "note": "Crea cada columna por separado; es un ejemplo didáctico, no sustituye una medida dinámica.",
    "examples": [
      {
        "id": "powerbi/contexto-de-evaluacion/context-transition/1",
        "title": "Comparar dos columnas de Clientes",
        "language": "dax",
        "code": "Sin transición = SUM(Pedidos[Cantidad])\nCon transición = CALCULATE(SUM(Pedidos[Cantidad]))",
        "hint": "",
        "textOutput": "Sin transición: 12 en cada cliente. Con transición: Ana 6, Luis 3, Marta 3, Diego BLANK.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/contexto-de-evaluacion/totales-y-contexto",
    "remember": "Un promedio global no es suma de promedios.",
    "examples": [
      {
        "id": "powerbi/contexto-de-evaluacion/totales-y-contexto/1",
        "title": "Revisar ticket total",
        "code": "",
        "steps": [
          "En matriz usa Clientes[Nombre], Ventas y Ticket."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Tickets Ana 173.33, Luis 140, Marta 150; total 157.14, no 463.33.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
