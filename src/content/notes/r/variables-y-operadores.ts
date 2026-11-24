// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/variables-y-operadores/definicion",
    "remember": "`<-` asigna; `==` compara.",
    "examples": [
      {
        "id": "r/variables-y-operadores/definicion/1",
        "title": "Guardar un importe",
        "language": "r",
        "code": "venta <- 100\nventa",
        "hint": "La última expresión recupera el objeto.",
        "textOutput": "`100`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/variables-y-operadores/asignacion-y-comentarios",
    "remember": "Prefiere `<-` para objetos y `=` para argumentos nombrados.",
    "examples": [
      {
        "id": "r/variables-y-operadores/asignacion-y-comentarios/1",
        "title": "Documentar un cálculo",
        "language": "r",
        "code": "# Importe antes de impuestos\nprecio <- 100\nprint(precio)",
        "hint": "El comentario no se ejecuta.",
        "textOutput": "`100`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/variables-y-operadores/operadores-aritmeticos",
    "remember": "Usa paréntesis para expresar prioridad.",
    "examples": [
      {
        "id": "r/variables-y-operadores/operadores-aritmeticos/1",
        "title": "Calcular cajas completas y sobrantes",
        "language": "r",
        "code": "c(cajas = 17 %/% 5, sobrantes = 17 %% 5)",
        "hint": "`%/%` y `%%` separan cociente y resto.",
        "textOutput": "`c(cajas = 3, sobrantes = 2)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/variables-y-operadores/comparaciones",
    "remember": "Comparar no modifica el objeto.",
    "examples": [
      {
        "id": "r/variables-y-operadores/comparaciones/1",
        "title": "Comprobar una meta",
        "language": "r",
        "code": "200 >= 150",
        "hint": "La meta se incluye por usar `>=`.",
        "textOutput": "`TRUE`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/variables-y-operadores/operadores-logicos",
    "remember": "Para filtrar vectores usa `&` y `|`; para condiciones escalares, `&&` y `||`.",
    "examples": [
      {
        "id": "r/variables-y-operadores/operadores-logicos/1",
        "title": "Evaluar un rango",
        "language": "r",
        "code": "x <- c(50, 100, 200)\nx >= 100 & x <= 150",
        "hint": "Las dos condiciones deben cumplirse.",
        "textOutput": "`c(FALSE, TRUE, FALSE)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
