// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/validacion-de-datos/definicion",
    "remember": "No sustituye una comprobación posterior de calidad, especialmente con pegados.",
    "examples": [
      {
        "id": "excel/validacion-de-datos/definicion/1",
        "title": "Restringir estado",
        "language": "text",
        "code": "",
        "hint": "En copia de Sales selecciona G2:G9, Datos > Validación > Lista; origen completed,cancelled,pending (usa separador local). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "La lista ofrece los tres estados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/validacion-de-datos/listas-desde-rangos",
    "remember": "Usa un catálogo en vez de repetir valores manualmente.",
    "examples": [
      {
        "id": "excel/validacion-de-datos/listas-desde-rangos/1",
        "title": "Elegir producto",
        "language": "text",
        "code": "",
        "hint": "Define el nombre ProductosID sobre Products!A2:A4; en Scratch A1 aplica validación Lista con origen =ProductosID. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "El desplegable ofrece P1, P2, P3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/validacion-de-datos/restricciones-numericas-y-fechas",
    "remember": "Activa alerta de error tipo Detener para bloquear entradas directas inválidas.",
    "examples": [
      {
        "id": "excel/validacion-de-datos/restricciones-numericas-y-fechas/1",
        "title": "Limitar cantidad",
        "language": "text",
        "code": "",
        "hint": "En copia de Sales E2:E9 valida Número entero entre 1 y 100; intenta escribir -1. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Excel rechaza la entrada directa con la alerta Detener activa.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/validacion-de-datos/validacion-personalizada",
    "remember": "Usa referencias relativas para evaluar cada celda.",
    "examples": [
      {
        "id": "excel/validacion-de-datos/validacion-personalizada/1",
        "title": "Evitar id duplicado",
        "language": "text",
        "code": "",
        "hint": "En copia de Sales selecciona A2:A9 con A2 activa; Validación > Personalizada: =COUNTIF($A$2:$A$9,A2)=1; activa Detener e intenta cambiar A3 a 101. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Se rechaza la duplicación introducida manualmente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
