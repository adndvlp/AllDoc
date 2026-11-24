// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/dashboards-y-aplicaciones/definicion",
    "remember": "Los resultados reactivos se recalculan cuando cambian sus dependencias.",
    "note": "Requiere shiny; ejecutar la última llamada abre un servicio local.",
    "examples": [
      {
        "id": "r/dashboards-y-aplicaciones/definicion/1",
        "title": "Crear una aplicación mínima",
        "language": "r",
        "code": "ui <- shiny::fluidPage(shiny::numericInput(\"monto\", \"Monto\", 100), shiny::textOutput(\"total\"))\nserver <- function(input, output) {\n  output$total <- shiny::renderText(input$monto * 2)\n}\napp <- shiny::shinyApp(ui, server)\n# shiny::runApp(app)",
        "hint": "renderText depende de input$monto. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Al ejecutar la app, la entrada 100 muestra 200; al cambiarla a 150 muestra 300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/dashboards-y-aplicaciones/reactivos-y-salidas",
    "remember": "Invoca un valor reactivo como función dentro del contexto reactivo.",
    "examples": [
      {
        "id": "r/dashboards-y-aplicaciones/reactivos-y-salidas/1",
        "title": "Definir una salida de tabla filtrada",
        "language": "r",
        "code": "ui <- shiny::fluidPage(shiny::numericInput(\"minimo\", \"Mínimo\", 200), shiny::tableOutput(\"tabla\"))\nserver <- function(input, output) {\n  datos <- shiny::reactive(pedidos |> filter(monto >= input$minimo))\n  output$tabla <- shiny::renderTable(datos())\n}\napp <- shiny::shinyApp(ui, server)",
        "hint": "El filtro depende de una entrada. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Al iniciar app con runApp, aparecen pedidos 102 y 103; al variar mínimo cambia la tabla.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/dashboards-y-aplicaciones/dashboards-de-reportes",
    "remember": "Un dashboard estático no necesita un servidor Shiny; uno reactivo puede necesitarlo.",
    "note": "El layout requiere un documento Quarto con format dashboard o flexdashboard instalado; no se crea el dashboard completo con este código.",
    "examples": [
      {
        "id": "r/dashboards-y-aplicaciones/dashboards-de-reportes/1",
        "title": "Preparar un indicador para un dashboard",
        "language": "r",
        "code": "tibble::tibble(indicador = \"Ingresos completados\", valor = sum(pedidos$monto[pedidos$estado == \"completado\"]))",
        "hint": "Este resultado puede alimentar una tarjeta o tabla del dashboard.",
        "textOutput": "Una fila con indicador Ingresos completados y valor 750.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
