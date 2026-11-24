// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/prep-transformacion/definicion",
    "remember": "Comprueba conteos antes y después de cada cambio.",
    "examples": [
      {
        "id": "tableau/prep-transformacion/definicion/1",
        "title": "Resumir ventas regionales",
        "code": "",
        "steps": [
          "Conecta ventas, añade Aggregate Step",
          "Grouped Fields Region, Aggregated Fields SUM(Ventas)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dos filas: Norte 700, Sur 1050.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-transformacion/pivot-columnas-a-filas",
    "remember": "Sirve para meses que llegan como columnas.",
    "examples": [
      {
        "id": "tableau/prep-transformacion/pivot-columnas-a-filas/1",
        "title": "Transformar meses de leads",
        "code": "",
        "steps": [
          "Añade Pivot Step, Columns to Rows",
          "mueve Enero y Febrero al conjunto de pivot",
          "renombra Pivot1 Names a Mes y Pivot1 Values a Contactos."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ocho filas; L01 tiene Enero 2 y Febrero 3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-transformacion/pivot-filas-a-columnas",
    "remember": "Define cómo agregar si varias filas comparten clave.",
    "examples": [
      {
        "id": "tableau/prep-transformacion/pivot-filas-a-columnas/1",
        "title": "Reconstruir meses",
        "code": "",
        "steps": [
          "Desde salida del pivot anterior añade Pivot Step Rows to Columns",
          "Mes como campo de encabezados y Contactos con SUM",
          "conserva LeadID y demás identificadores."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cuatro registros, con columnas Enero y Febrero.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-transformacion/aggregate-step",
    "remember": "Después del paso ya no está disponible el detalle eliminado.",
    "examples": [
      {
        "id": "tableau/prep-transformacion/aggregate-step/1",
        "title": "Resumir por producto",
        "code": "",
        "external": true,
        "hint": "En ventas agrupa Producto y suma Ventas.",
        "textOutput": "Silla 900, Teclado 400, Lampara 300, Mouse 150.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-transformacion/join-step",
    "remember": "Revisa no coincidencias y multiplicación de filas.",
    "examples": [
      {
        "id": "tableau/prep-transformacion/join-step/1",
        "title": "Conservar clientes",
        "code": "",
        "external": true,
        "hint": "Combina clientes con ventas, Left Join con clientes a la izquierda por ClienteID.",
        "textOutput": "9 filas físicas, C05 sin ventas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-transformacion/union-step",
    "remember": "La unión no elimina duplicados.",
    "examples": [
      {
        "id": "tableau/prep-transformacion/union-step/1",
        "title": "Apilar ventas por periodo",
        "code": "",
        "steps": [
          "Separa ventas en enero-febrero y marzo",
          "conecta ambos archivos a Union Step."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ocho registros y suma 1750.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
