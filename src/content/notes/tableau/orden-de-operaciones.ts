// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/orden-de-operaciones/definicion",
    "remember": "Fuente/extract y contexto preceden a FIXED; dimensiones preceden a INCLUDE/EXCLUDE; medidas y cálculos de tabla van después.",
    "examples": [
      {
        "id": "tableau/orden-de-operaciones/definicion/1",
        "title": "Ver efecto de contexto",
        "code": "",
        "external": true,
        "hint": "En el ejemplo LOD de denominador global añade Region Norte a contexto.",
        "textOutput": "La participación pasa de 40% a 100%.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/orden-de-operaciones/top-n-frente-a-dimension",
    "remember": "Usa contexto para definir el universo del Top.",
    "examples": [
      {
        "id": "tableau/orden-de-operaciones/top-n-frente-a-dimension/1",
        "title": "Producto líder de Norte",
        "code": "",
        "steps": [
          "Aplica Top 1 global de Producto y Region Norte",
          "luego añade Region a contexto."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Sin contexto puede quedar vacío (Silla es líder global); con contexto aparece Teclado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/orden-de-operaciones/filtro-de-medida-frente-a-dimension",
    "remember": "Un límite de suma no filtra cada línea individual.",
    "examples": [
      {
        "id": "tableau/orden-de-operaciones/filtro-de-medida-frente-a-dimension/1",
        "title": "Comparar importes",
        "code": "",
        "steps": [
          "Region en Rows y Ventas en Text",
          "filtro SUM(Ventas)>=800",
          "en otra hoja filtra Ventas como All Values >=800."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Primera: Sur 1050; segunda: ninguna fila, máximo individual 600.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
