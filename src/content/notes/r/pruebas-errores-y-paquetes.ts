// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/pruebas-errores-y-paquetes/definicion",
    "remember": "No ocultes errores sin registrar su causa.",
    "examples": [
      {
        "id": "r/pruebas-errores-y-paquetes/definicion/1",
        "title": "Detectar una condición inválida",
        "language": "r",
        "code": "stopifnot(all(pedidos$monto >= 0))",
        "hint": "La aserción detiene una ejecución incorrecta.",
        "textOutput": "Sin error si todos los importes son no negativos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/pruebas-errores-y-paquetes/condiciones-y-trycatch",
    "remember": "Captura únicamente los errores que sepas tratar.",
    "examples": [
      {
        "id": "r/pruebas-errores-y-paquetes/condiciones-y-trycatch/1",
        "title": "Dar una alternativa ante un fallo conocido",
        "language": "r",
        "code": "tryCatch(stop(\"Dato inválido\"), error = function(e) NA_real_)",
        "hint": "El manejador devuelve un valor faltante.",
        "textOutput": "`NA_real_`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/pruebas-errores-y-paquetes/depuracion",
    "remember": "Reproduce primero el fallo con el mínimo código.",
    "examples": [
      {
        "id": "r/pruebas-errores-y-paquetes/depuracion/1",
        "title": "Inspeccionar la definición de una función",
        "language": "r",
        "code": "calcular <- function(x) sum(x)\nbody(calcular)",
        "hint": "Puedes revisar el cuerpo antes de iniciar depuración interactiva.",
        "textOutput": "Expresión `sum(x)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/pruebas-errores-y-paquetes/testthat",
    "remember": "Prueba casos normales, límites y valores faltantes.",
    "note": "Requiere testthat.",
    "examples": [
      {
        "id": "r/pruebas-errores-y-paquetes/testthat/1",
        "title": "Comprobar una función de descuento",
        "language": "r",
        "code": "descuento <- function(x) x * .9\ntestthat::test_that(\"descuento del 10%\", {\n  testthat::expect_equal(descuento(100), 90)\n})",
        "hint": "La expectativa compara el resultado con 90. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Prueba aprobada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/pruebas-errores-y-paquetes/desarrollo-de-paquetes",
    "remember": "Documenta funciones y declara dependencias; no dependas de paquetes adjuntados por casualidad.",
    "note": "Para crear y comprobar paquetes se usan usethis::create_package(), devtools::document() y devtools::check().",
    "examples": [
      {
        "id": "r/pruebas-errores-y-paquetes/desarrollo-de-paquetes/1",
        "title": "Consultar metadatos de un paquete instalado",
        "language": "r",
        "code": "packageDescription(\"dplyr\", fields = c(\"Package\", \"Version\"))",
        "hint": "DESCRIPTION declara metadatos.",
        "textOutput": "Nombre dplyr y versión instalada.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
