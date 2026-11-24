// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/vectores/definicion",
    "remember": "`c()` combina elementos; un vector no es una lista heterogénea.",
    "examples": [
      {
        "id": "r/vectores/definicion/1",
        "title": "Crear importes",
        "language": "r",
        "code": "c(100, 200, 300)",
        "hint": "Los tres elementos son numéricos.",
        "textOutput": "`c(100, 200, 300)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/vectores/secuencias-y-repeticion",
    "remember": "`seq()` controla paso y longitud.",
    "examples": [
      {
        "id": "r/vectores/secuencias-y-repeticion/1",
        "title": "Generar semanas",
        "language": "r",
        "code": "seq(2, 8, by = 2)\nrep(c(\"A\", \"B\"), each = 2)",
        "hint": "`each` repite cada elemento.",
        "textOutput": "`c(2, 4, 6, 8)` y `c(\"A\", \"A\", \"B\", \"B\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/vectores/nombres-y-longitud",
    "remember": "El nombre no cambia la posición del elemento.",
    "examples": [
      {
        "id": "r/vectores/nombres-y-longitud/1",
        "title": "Etiquetar ventas",
        "language": "r",
        "code": "x <- c(MX = 300, ES = 100)\nlength(x)\nx[\"ES\"]",
        "hint": "El índice puede ser un nombre.",
        "textOutput": "Longitud 2 y vector nombrado `ES = 100`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/vectores/vectorizacion-y-reciclaje",
    "remember": "No confundas reciclaje con alineación por nombre.",
    "note": "Si las longitudes no son múltiplos, muchas operaciones base advierten; dplyr impone reglas más estrictas.",
    "examples": [
      {
        "id": "r/vectores/vectorizacion-y-reciclaje/1",
        "title": "Aplicar impuesto a varios importes",
        "language": "r",
        "code": "c(100, 200, 300) * 1.16",
        "hint": "El escalar se reutiliza para cada importe.",
        "textOutput": "`c(116, 232, 348)` (aprox.).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
