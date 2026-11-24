// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/lod-expressions/definicion",
    "remember": "FIXED fija dimensiones; INCLUDE añade; EXCLUDE quita.",
    "examples": [
      {
        "id": "tableau/lod-expressions/definicion/1",
        "title": "Ventas de cada cliente",
        "language": "text",
        "code": "{ FIXED [ClienteID] : SUM([Ventas]) }; pon ClienteID en Rows y MIN del campo en Text.",
        "instructions": "Crea un campo calculado con esta expresión:",
        "hint": "",
        "textOutput": "C01 500, C02 900, C03 150, C04 200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/lod-expressions/fixed",
    "remember": "Los filtros de dimensión normales no modifican FIXED; contexto sí.",
    "examples": [
      {
        "id": "tableau/lod-expressions/fixed/1",
        "title": "Total de toda la fuente",
        "code": "",
        "steps": [
          "Fórmula { FIXED : SUM([Ventas]) }",
          "Region en Rows y MIN del campo en Text."
        ],
        "external": true,
        "hint": "",
        "textOutput": "1750 en cada región.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/lod-expressions/include",
    "remember": "Útil para calcular por entidad antes de promediar.",
    "examples": [
      {
        "id": "tableau/lod-expressions/include/1",
        "title": "Ticket promedio por región",
        "code": "",
        "steps": [
          "Crea { INCLUDE [Pedido] : SUM([Ventas]) }",
          "Region en Rows y AVG del campo en Text."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Norte ≈233.33 (tres pedidos), Sur 262.50 (cuatro).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/lod-expressions/exclude",
    "remember": "El resultado puede repetirse entre las marcas más detalladas.",
    "examples": [
      {
        "id": "tableau/lod-expressions/exclude/1",
        "title": "Total regional junto a categoría",
        "code": "",
        "steps": [
          "Region y Categoria en Rows",
          "{ EXCLUDE [Categoria] : SUM([Ventas]) } en Text."
        ],
        "external": true,
        "hint": "",
        "textOutput": "700 en las dos categorías de Norte y 1050 en las de Sur.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/lod-expressions/lod-y-filtros",
    "remember": "Decide si el denominador debe cambiar con el filtro.",
    "examples": [
      {
        "id": "tableau/lod-expressions/lod-y-filtros/1",
        "title": "Comparar denominador",
        "code": "",
        "steps": [
          "Crea SUM([Ventas])/MIN({ FIXED : SUM([Ventas]) })",
          "Region en Rows, filtra Norte",
          "luego añade filtro al contexto."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Sin contexto 40%; con contexto 100%.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/lod-expressions/elegir-lod-o-table-calculation",
    "remember": "Para valor previo usa LOOKUP; para total fijo por cliente usa FIXED.",
    "examples": [
      {
        "id": "tableau/lod-expressions/elegir-lod-o-table-calculation/1",
        "title": "Comparar enfoques",
        "code": "",
        "steps": [
          "Crea vista mensual y RUNNING_SUM(SUM([Ventas]))",
          "añade MIN({ FIXED : SUM([Ventas]) })."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Acumulado cambia 600,850,1750; total fijo es 1750 en cada marca.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
