// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/condicionales-y-control-de-flujo/definicion",
    "remember": "`if` no procesa un vector de condiciones elemento a elemento.",
    "examples": [
      {
        "id": "r/condicionales-y-control-de-flujo/definicion/1",
        "title": "Evaluar una meta de venta",
        "language": "r",
        "code": "venta <- 120\nif (venta >= 100) \"meta\" else \"pendiente\"",
        "hint": "Solo se ejecuta la rama elegida.",
        "textOutput": "`\"meta\"`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/condicionales-y-control-de-flujo/else-if-y-switch",
    "remember": "Evalúa primero las condiciones más específicas.",
    "examples": [
      {
        "id": "r/condicionales-y-control-de-flujo/else-if-y-switch/1",
        "title": "Elegir una tasa por país",
        "language": "r",
        "code": "pais <- \"MX\"\nswitch(pais, MX = 0.16, ES = 0.21, NA_real_)",
        "hint": "Se elige la alternativa MX.",
        "textOutput": "`0.16`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/condicionales-y-control-de-flujo/ifelse-y-if-else",
    "remember": "Usa una condición por fila para clasificar columnas.",
    "examples": [
      {
        "id": "r/condicionales-y-control-de-flujo/ifelse-y-if-else/1",
        "title": "Clasificar importes",
        "language": "r",
        "code": "dplyr::if_else(c(50, 200) >= 100, \"alto\", \"bajo\")",
        "hint": "Se evalúa cada importe.",
        "textOutput": "`c(\"bajo\", \"alto\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/condicionales-y-control-de-flujo/for-y-while",
    "remember": "Evita while sin condición de salida.",
    "examples": [
      {
        "id": "r/condicionales-y-control-de-flujo/for-y-while/1",
        "title": "Acumular tres ventas",
        "language": "r",
        "code": "total <- 0\nfor (x in c(100, 200, 50)) total <- total + x\ntotal",
        "hint": "Cada iteración actualiza el total.",
        "textOutput": "`350`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/condicionales-y-control-de-flujo/break-y-next",
    "remember": "`next` no termina todo el ciclo.",
    "examples": [
      {
        "id": "r/condicionales-y-control-de-flujo/break-y-next/1",
        "title": "Ignorar un importe inválido",
        "language": "r",
        "code": "total <- 0\nfor (x in c(10, -1, 20)) {\n  if (x < 0) next\n  total <- total + x\n}\ntotal",
        "hint": "Se omite el negativo.",
        "textOutput": "`30`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
