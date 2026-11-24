// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/rankings-y-comparaciones/definicion",
    "remember": "Define el conjunto y tratamiento de empates.",
    "note": "Para que Diego no muestre posición, añade IF(ISBLANK([Ventas]), BLANK(), …); en el total también puedes ocultar ranking con ISINSCOPE.",
    "examples": [
      {
        "id": "powerbi/rankings-y-comparaciones/definicion/1",
        "title": "Ordenar clientes por ventas",
        "language": "dax",
        "code": "Ranking cliente = RANKX(FILTER(ALL(Clientes[Nombre]), NOT ISBLANK([Ventas])), [Ventas], , DESC, DENSE)",
        "hint": "",
        "textOutput": "En tabla por nombre sin Diego: Ana 1, Marta 2, Luis 3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/rankings-y-comparaciones/rankx-y-empates",
    "remember": "El conjunto evaluado define quién compite.",
    "note": "Nueva columna de Pedidos; ejemplo de orden por precio unitario, no importe.",
    "examples": [
      {
        "id": "powerbi/rankings-y-comparaciones/rankx-y-empates/1",
        "title": "Comparar empates de importes",
        "language": "dax",
        "code": "Rank precio = RANKX(ALL(Pedidos), Pedidos[Precio], Pedidos[Precio], DESC, DENSE)",
        "hint": "",
        "textOutput": "Pedidos 7 y 8: rango 1 (150); precio 100: rango 2. Con SKIP sería rango 3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/rankings-y-comparaciones/top-n-visual-vs-ranking",
    "remember": "Top N no obliga a crear medida de ranking.",
    "examples": [
      {
        "id": "powerbi/rankings-y-comparaciones/top-n-visual-vs-ranking/1",
        "title": "Mostrar dos clientes principales",
        "code": "",
        "steps": [
          "Crea barras Nombre y Ventas.",
          "En filtros del visual, Nombre > Top N > 2 por Ventas > Aplicar filtro."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ana 520 y Marta 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
