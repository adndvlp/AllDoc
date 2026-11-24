// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/tipos-de-datos/definicion",
    "remember": "`typeof()` inspecciona almacenamiento; `class()` describe comportamiento.",
    "examples": [
      {
        "id": "r/tipos-de-datos/definicion/1",
        "title": "Inspeccionar un número",
        "language": "r",
        "code": "c(tipo = typeof(10), clase = class(10))",
        "hint": "Un literal decimal o entero sin `L` es double.",
        "textOutput": "`c(tipo = \"double\", clase = \"numeric\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/tipos-de-datos/numeric-e-integer",
    "remember": "`1L` y `1` pueden tener distinto tipo.",
    "examples": [
      {
        "id": "r/tipos-de-datos/numeric-e-integer/1",
        "title": "Distinguir almacenamiento",
        "language": "r",
        "code": "c(typeof(1L), typeof(1))",
        "hint": "El sufijo L fuerza entero.",
        "textOutput": "`c(\"integer\", \"double\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/tipos-de-datos/character-y-logical",
    "remember": "Las comillas convierten un literal en texto.",
    "examples": [
      {
        "id": "r/tipos-de-datos/character-y-logical/1",
        "title": "Comprobar el tipo de una condición",
        "language": "r",
        "code": "typeof(100 > 50)",
        "hint": "La comparación devuelve un lógico.",
        "textOutput": "`\"logical\"`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/tipos-de-datos/conversion-y-coercion",
    "remember": "Comprueba conversiones inválidas y pérdida de precisión.",
    "note": "Un texto no numérico produce NA y advertencia. Un factor requiere convertir sus etiquetas, no sus códigos.",
    "examples": [
      {
        "id": "r/tipos-de-datos/conversion-y-coercion/1",
        "title": "Convertir importes de texto",
        "language": "r",
        "code": "as.numeric(c(\"10\", \"20.5\"))",
        "hint": "El texto debe representar números válidos.",
        "textOutput": "`c(10, 20.5)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/tipos-de-datos/date-y-posixct",
    "remember": "No compares cadenas de fechas si necesitas aritmética temporal.",
    "examples": [
      {
        "id": "r/tipos-de-datos/date-y-posixct/1",
        "title": "Crear una fecha y una hora",
        "language": "r",
        "code": "as.Date(\"2026-03-01\")\nas.POSIXct(\"2026-03-01 12:00:00\", tz = \"UTC\")",
        "hint": "La zona es explícita.",
        "textOutput": "Fecha 2026-03-01 e instante 2026-03-01 12:00:00 UTC.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
