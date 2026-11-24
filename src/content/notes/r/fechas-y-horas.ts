// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/fechas-y-horas/definicion",
    "remember": "Convierte texto a fecha antes de comparar intervalos.",
    "examples": [
      {
        "id": "r/fechas-y-horas/definicion/1",
        "title": "Convertir formato día mes año",
        "language": "r",
        "code": "as.Date(\"15/03/2026\", format = \"%d/%m/%Y\")",
        "hint": "El formato describe el texto de entrada.",
        "textOutput": "2026-03-15.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/fechas-y-horas/parsear-y-extraer-componentes",
    "remember": "El orden de ymd y dmy describe el formato.",
    "note": "Requiere lubridate.",
    "examples": [
      {
        "id": "r/fechas-y-horas/parsear-y-extraer-componentes/1",
        "title": "Extraer meses",
        "language": "r",
        "code": "lubridate::month(pedidos$fecha)",
        "hint": "Devuelve número de mes.",
        "textOutput": "`c(3, 3, 3, 4, 4, 4)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/fechas-y-horas/agrupar-por-periodos",
    "remember": "Conserva el año al agrupar varios años.",
    "examples": [
      {
        "id": "r/fechas-y-horas/agrupar-por-periodos/1",
        "title": "Obtener inicio de mes",
        "language": "r",
        "code": "lubridate::floor_date(pedidos$fecha, \"month\")",
        "hint": "Se conserva la clase Date.",
        "textOutput": "Tres fechas 2026-03-01 y tres 2026-04-01.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/fechas-y-horas/diferencias-e-intervalos",
    "remember": "Declara las unidades del resultado.",
    "examples": [
      {
        "id": "r/fechas-y-horas/diferencias-e-intervalos/1",
        "title": "Calcular días transcurridos",
        "language": "r",
        "code": "as.numeric(difftime(as.Date(\"2026-03-10\"), as.Date(\"2026-03-01\"), units = \"days\"))",
        "hint": "Se fija la unidad días.",
        "textOutput": "`9`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/fechas-y-horas/sumar-fechas-y-zonas-horarias",
    "remember": "Un mes no equivale siempre a 30 días.",
    "note": "Requiere lubridate; para instantes especifica tz.",
    "examples": [
      {
        "id": "r/fechas-y-horas/sumar-fechas-y-zonas-horarias/1",
        "title": "Sumar un mes al fin de enero",
        "language": "r",
        "code": "lubridate::add_with_rollback(as.Date(\"2026-01-31\"), lubridate::period(months = 1))",
        "hint": "Se ajusta al último día válido.",
        "textOutput": "2026-02-28.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
