// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/combinar-tablas-y-conjuntos/definicion",
    "remember": "Usa join si necesitas alinear por clave, no por posición.",
    "examples": [
      {
        "id": "r/combinar-tablas-y-conjuntos/definicion/1",
        "title": "Apilar dos periodos",
        "language": "r",
        "code": "bind_rows(tibble::tibble(monto = 100), tibble::tibble(monto = 200))",
        "hint": "Las columnas coinciden por nombre.",
        "textOutput": "Dos filas con montos 100 y 200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/combinar-tablas-y-conjuntos/operaciones-de-conjuntos",
    "remember": "`setdiff(a,b)` no equivale a `setdiff(b,a)`.",
    "examples": [
      {
        "id": "r/combinar-tablas-y-conjuntos/operaciones-de-conjuntos/1",
        "title": "Encontrar códigos exclusivos",
        "language": "r",
        "code": "setdiff(c(\"MX\", \"ES\", \"MX\"), c(\"ES\", \"US\"))",
        "hint": "Se conservan valores de a ausentes de b.",
        "textOutput": "`\"MX\"`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
