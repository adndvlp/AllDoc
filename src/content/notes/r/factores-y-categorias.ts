// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/factores-y-categorias/definicion",
    "remember": "Los niveles no son los valores numéricos de las etiquetas.",
    "examples": [
      {
        "id": "r/factores-y-categorias/definicion/1",
        "title": "Crear categorías de estado",
        "language": "r",
        "code": "factor(c(\"bajo\", \"alto\", \"bajo\"), levels = c(\"bajo\", \"alto\"))",
        "hint": "`levels` fija el catálogo.",
        "textOutput": "Tres valores con niveles bajo y alto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/factores-y-categorias/factores-ordenados",
    "remember": "Ordena por significado, no alfabéticamente.",
    "examples": [
      {
        "id": "r/factores-y-categorias/factores-ordenados/1",
        "title": "Definir niveles de satisfacción",
        "language": "r",
        "code": "x <- ordered(c(\"alto\", \"bajo\"), levels = c(\"bajo\", \"medio\", \"alto\"))\nx[1] > x[2]",
        "hint": "Alto supera a bajo según los niveles.",
        "textOutput": "`TRUE`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/factores-y-categorias/forcats",
    "remember": "Cambia niveles sin modificar el resto de los datos.",
    "note": "Requiere forcats.",
    "examples": [
      {
        "id": "r/factores-y-categorias/forcats/1",
        "title": "Colocar una categoría primero",
        "language": "r",
        "code": "forcats::fct_relevel(factor(c(\"MX\", \"ES\")), \"MX\") |> levels()",
        "hint": "`fct_relevel()` modifica el orden de niveles.",
        "textOutput": "`c(\"MX\", \"ES\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
