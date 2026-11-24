// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/errores/definicion",
    "remember": "Identifica la causa antes de eliminar o sustituir.",
    "examples": [
      {
        "id": "power-query/errores/definicion/1",
        "title": "Provocar una conversión inválida",
        "language": "powerquery",
        "code": "Number.FromText(\"N/D\", \"es-ES\")",
        "hint": "El texto no representa un número.",
        "textOutput": "Error de conversión, no null.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/errores/conservar-y-quitar-errores",
    "remember": "Aislar primero permite auditar cuántos registros se perderían.",
    "examples": [
      {
        "id": "power-query/errores/conservar-y-quitar-errores/1",
        "title": "Localizar el importe inválido",
        "language": "powerquery",
        "code": "let T = Table.TransformColumnTypes(Importacion, {{\"importe\", type number}}, \"es-ES\") in Table.SelectRowsWithErrors(T, {\"importe\"})",
        "hint": "Se comprueba solo la columna importe.",
        "textOutput": "Una fila: id textual \"2\", importe Error.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/errores/reemplazar-errores",
    "remember": "No confundas un dato inválido con un importe real de cero.",
    "examples": [
      {
        "id": "power-query/errores/reemplazar-errores/1",
        "title": "Convertir importes inválidos a null",
        "language": "powerquery",
        "code": "let T = Table.TransformColumnTypes(Importacion, {{\"importe\", type number}}, \"es-ES\") in Table.ReplaceErrorValues(T, {{\"importe\", null}})",
        "hint": "El reemplazo se aplica después de convertir.",
        "textOutput": "Importes 1234.5, null y 25.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/errores/try-otherwise",
    "remember": "Coloca try cerca de la operación que puede fallar.",
    "examples": [
      {
        "id": "power-query/errores/try-otherwise/1",
        "title": "Convertir un número de forma segura",
        "language": "powerquery",
        "code": "try Number.FromText(\"N/D\", \"es-ES\") otherwise null",
        "hint": "Se captura la conversión inválida.",
        "textOutput": "null.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/errores/registro-de-try",
    "remember": "Conservar el indicador de error ayuda a distinguirlo de un null de origen.",
    "examples": [
      {
        "id": "power-query/errores/registro-de-try/1",
        "title": "Detectar si hubo error",
        "language": "powerquery",
        "code": "(try Number.FromText(\"N/D\"))[HasError]",
        "hint": "No se pierde la posibilidad de inspeccionar el error.",
        "textOutput": "true.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
