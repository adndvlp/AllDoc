// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/definicion",
    "remember": "Define qué significa ausencia antes de sustituirla.",
    "note": "Nueva columna en Pedidos.",
    "examples": [
      {
        "id": "powerbi/operadores-condiciones-y-blancos/definicion/1",
        "title": "Clasificar estado",
        "language": "dax",
        "code": "Estado legible = IF(Pedidos[Estado] = \"completed\", \"Completado\", \"Otro\")",
        "hint": "",
        "textOutput": "Pedido 5: Otro; los demás Completado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/and-or-not-e-in",
    "remember": "Usa paréntesis para hacer explícita la precedencia.",
    "note": "Nueva columna.",
    "examples": [
      {
        "id": "powerbi/operadores-condiciones-y-blancos/and-or-not-e-in/1",
        "title": "Marcar pedidos grandes completados",
        "language": "dax",
        "code": "Grande completado = Pedidos[Cantidad] >= 2 && Pedidos[Estado] = \"completed\"",
        "hint": "",
        "textOutput": "TRUE para pedidos 2, 3 y 6; FALSE para el resto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/if-y-switch",
    "remember": "Coloca primero la condición más restrictiva.",
    "note": "Nueva columna.",
    "examples": [
      {
        "id": "powerbi/operadores-condiciones-y-blancos/if-y-switch/1",
        "title": "Clasificar ticket por importe",
        "language": "dax",
        "code": "Segmento pedido =\nSWITCH(TRUE(), Pedidos[Cantidad]*Pedidos[Precio]>=200,\"Alto\", Pedidos[Cantidad]*Pedidos[Precio]>=100,\"Medio\",\"Bajo\")",
        "hint": "",
        "textOutput": "Pedido 6 Alto; pedido 3 Medio; pedido 5 Bajo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/blank-isblank-y-coalesce",
    "remember": "Un blanco puede señalar que no hay actividad; cero implica otra interpretación.",
    "examples": [
      {
        "id": "powerbi/operadores-condiciones-y-blancos/blank-isblank-y-coalesce/1",
        "title": "Mostrar clientes sin ventas como cero",
        "language": "dax",
        "code": "Ventas con cero = COALESCE([Ventas], 0)",
        "hint": "",
        "textOutput": "En una tabla con nombre, Diego muestra 0 en vez de blanco.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/divide",
    "remember": "Usa DIVIDE para ratios de negocio.",
    "examples": [
      {
        "id": "powerbi/operadores-condiciones-y-blancos/divide/1",
        "title": "Calcular ticket seguro",
        "language": "dax",
        "code": "Ticket = DIVIDE([Ventas], [Pedidos completados])",
        "hint": "",
        "textOutput": "Global 157.14; Diego BLANK.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/round-abs-y-formato",
    "remember": "No uses FORMAT para una medida que debe seguir siendo numérica.",
    "examples": [
      {
        "id": "powerbi/operadores-condiciones-y-blancos/round-abs-y-formato/1",
        "title": "Redondear ticket",
        "language": "dax",
        "code": "Ticket redondeado = ROUND([Ticket], 2)",
        "hint": "",
        "textOutput": "157.14 como número; no texto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/funciones-de-texto-y-conversion",
    "remember": "FORMAT devuelve texto; VALUE convierte texto numérico a número.",
    "note": "Nueva columna en Pedidos. Para limpiar texto al cargar suele convenir Power Query.",
    "examples": [
      {
        "id": "powerbi/operadores-condiciones-y-blancos/funciones-de-texto-y-conversion/1",
        "title": "Crear identificador legible",
        "language": "dax",
        "code": "Etiqueta pedido = \"P-\" & FORMAT(Pedidos[PedidoID], \"000\")",
        "hint": "",
        "textOutput": "PedidoID 3: P-003.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
