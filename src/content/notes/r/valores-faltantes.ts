// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/valores-faltantes/definicion",
    "remember": "No uses `x == NA`; usa `is.na(x)`.",
    "examples": [
      {
        "id": "r/valores-faltantes/definicion/1",
        "title": "Detectar países faltantes",
        "language": "r",
        "code": "is.na(clientes$pais)",
        "hint": "La posición TRUE corresponde a Pedro.",
        "textOutput": "`c(FALSE, FALSE, FALSE, TRUE, FALSE)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/valores-faltantes/na-nan-e-inf",
    "remember": "`Inf` no es NA.",
    "examples": [
      {
        "id": "r/valores-faltantes/na-nan-e-inf/1",
        "title": "Distinguir resultados inválidos",
        "language": "r",
        "code": "x <- c(NA_real_, 0/0, 1/0, 5)\nis.finite(x)",
        "hint": "Solo 5 es finito.",
        "textOutput": "`c(FALSE, FALSE, FALSE, TRUE)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/valores-faltantes/eliminar-o-ignorar-na",
    "remember": "Ignorar NA cambia el denominador del cálculo.",
    "examples": [
      {
        "id": "r/valores-faltantes/eliminar-o-ignorar-na/1",
        "title": "Calcular una media disponible",
        "language": "r",
        "code": "mean(c(10, NA, 20), na.rm = TRUE)",
        "hint": "Se promedian solo 10 y 20.",
        "textOutput": "`15`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/valores-faltantes/null",
    "remember": "NULL no es lo mismo que NA ni que un vector vacío.",
    "examples": [
      {
        "id": "r/valores-faltantes/null/1",
        "title": "Comprobar ausencia",
        "language": "r",
        "code": "c(is.null(NULL), is.null(NA), is.null(numeric(0)))",
        "hint": "Solo el primer objeto es NULL.",
        "textOutput": "`c(TRUE, FALSE, FALSE)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
