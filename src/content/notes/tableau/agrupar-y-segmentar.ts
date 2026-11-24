// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/agrupar-y-segmentar/definicion",
    "remember": "Un grupo crea categorías; un set define pertenencia.",
    "examples": [
      {
        "id": "tableau/agrupar-y-segmentar/definicion/1",
        "title": "Crear grupo",
        "code": "",
        "steps": [
          "Selecciona Mouse y Teclado y usa Group",
          "nombra Accesorios."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Accesorios agrupa ventas 550.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/agrupar-y-segmentar/groups",
    "remember": "El grupo modifica cómo se agrupan marcas, no las filas originales.",
    "examples": [
      {
        "id": "tableau/agrupar-y-segmentar/groups/1",
        "title": "Unir regiones",
        "code": "",
        "external": true,
        "hint": "Crea Group de Region con Norte y Sur como Nacional.",
        "textOutput": "Una categoría con 1750.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/agrupar-y-segmentar/sets",
    "remember": "La pertenencia es distinta de filtrar filas.",
    "examples": [
      {
        "id": "tableau/agrupar-y-segmentar/sets/1",
        "title": "Crear set Top 2",
        "code": "",
        "steps": [
          "Producto > Create > Set > Top 2 by SUM(Ventas)",
          "arrastra set y ventas a Text en una vista con set en Rows."
        ],
        "external": true,
        "hint": "",
        "textOutput": "In 1300 (Silla y Teclado), Out 450.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/agrupar-y-segmentar/bins",
    "remember": "El bin representa el límite inferior.",
    "examples": [
      {
        "id": "tableau/agrupar-y-segmentar/bins/1",
        "title": "Agrupar importes por 200",
        "code": "",
        "steps": [
          "Ventas > Create > Bins, tamaño 200",
          "coloca bin en Rows y COUNT(Linea) en Text."
        ],
        "external": true,
        "hint": "",
        "textOutput": "0: 3; 200: 4; 600: 1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/agrupar-y-segmentar/jerarquias",
    "remember": "La jerarquía no crea relaciones entre tablas.",
    "examples": [
      {
        "id": "tableau/agrupar-y-segmentar/jerarquias/1",
        "title": "Explorar categoría y producto",
        "code": "",
        "steps": [
          "Crea jerarquía con Categoria sobre Producto",
          "arrastra Categoria a Rows y pulsa +."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se muestran productos dentro de cada categoría.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
