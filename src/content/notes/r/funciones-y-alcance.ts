// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/funciones-y-alcance/definicion",
    "remember": "Define una vez y llama tantas veces como necesites.",
    "examples": [
      {
        "id": "r/funciones-y-alcance/definicion/1",
        "title": "Calcular un impuesto",
        "language": "r",
        "code": "con_impuesto <- function(monto) monto * 1.16\ncon_impuesto(100)",
        "hint": "El argumento se sustituye por 100.",
        "textOutput": "`116` (aprox.).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-y-alcance/argumentos-y-valores-por-defecto",
    "remember": "Nombra los argumentos cuando no sean evidentes.",
    "examples": [
      {
        "id": "r/funciones-y-alcance/argumentos-y-valores-por-defecto/1",
        "title": "Cambiar la tasa",
        "language": "r",
        "code": "neto <- function(monto, tasa = 0.1) monto * (1 - tasa)\nneto(200, tasa = 0.25)",
        "hint": "La llamada reemplaza la tasa por defecto.",
        "textOutput": "`150`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-y-alcance/return-y-funciones-anonimas",
    "remember": "El retorno temprano evita ejecutar lo restante.",
    "examples": [
      {
        "id": "r/funciones-y-alcance/return-y-funciones-anonimas/1",
        "title": "Controlar división por cero",
        "language": "r",
        "code": "ratio <- function(a, b) {\n  if (b == 0) return(NA_real_)\n  a / b\n}\nratio(5, 0)",
        "hint": "Se retorna antes de dividir.",
        "textOutput": "`NA_real_`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-y-alcance/environments-y-lexical-scoping",
    "remember": "Una closure conserva acceso a su entorno de creación.",
    "examples": [
      {
        "id": "r/funciones-y-alcance/environments-y-lexical-scoping/1",
        "title": "Crear una función con tasa fija",
        "language": "r",
        "code": "crear_tasa <- function(tasa) function(x) x * tasa\niva <- crear_tasa(0.16)\niva(100)",
        "hint": "La función interna conserva tasa.",
        "textOutput": "`16`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
