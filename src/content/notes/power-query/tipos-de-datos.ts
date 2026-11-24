// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/tipos-de-datos/definicion",
    "remember": "Asigna el tipo según el significado del dato, no solo su aspecto.",
    "examples": [
      {
        "id": "power-query/tipos-de-datos/definicion/1",
        "title": "Convertir identificadores de texto a enteros",
        "language": "powerquery",
        "code": "Table.TransformColumnTypes(Importacion, {{\"id\", Int64.Type}})",
        "hint": "En interfaz: icono de tipo en el encabezado > Número entero.",
        "textOutput": "id=1,2,3 como enteros; importe y fecha siguen siendo texto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/tipos-de-datos/texto-y-numeros",
    "remember": "Los códigos con ceros a la izquierda suelen ser texto; moneda fija evita ciertos problemas de precisión.",
    "examples": [
      {
        "id": "power-query/tipos-de-datos/texto-y-numeros/1",
        "title": "Conservar un código con ceros",
        "language": "powerquery",
        "code": "Text.From(\"0012\")",
        "hint": "No se convierte a entero.",
        "textOutput": "\"0012\".",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/tipos-de-datos/fecha-hora-y-duracion",
    "remember": "Una duración es un intervalo, no una fecha.",
    "examples": [
      {
        "id": "power-query/tipos-de-datos/fecha-hora-y-duracion/1",
        "title": "Crear una fecha con hora",
        "language": "powerquery",
        "code": "#datetime(2026, 2, 3, 14, 30, 0)",
        "hint": "Los últimos tres componentes son hora, minuto y segundo.",
        "textOutput": "3 de febrero de 2026, 14:30:00, sin zona horaria.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/tipos-de-datos/logical-y-nullable",
    "remember": "`null` no es false ni cero; `any` no fija un tipo específico.",
    "examples": [
      {
        "id": "power-query/tipos-de-datos/logical-y-nullable/1",
        "title": "Comprobar un indicador",
        "language": "powerquery",
        "code": "Value.Is(true, type logical)",
        "hint": "Value.Is comprueba compatibilidad con un tipo.",
        "textOutput": "true.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/tipos-de-datos/conversion-explicita",
    "remember": "Convertir un texto inválido produce error si no lo controlas.",
    "examples": [
      {
        "id": "power-query/tipos-de-datos/conversion-explicita/1",
        "title": "Convertir un importe de texto",
        "language": "powerquery",
        "code": "Number.FromText(\"150.50\", \"en-US\")",
        "hint": "La cultura especifica cómo interpretar los separadores.",
        "textOutput": "150.5 como número.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/tipos-de-datos/configuracion-regional",
    "remember": "No interpretes 1.234,50 como si usara formato estadounidense.",
    "note": "El error N/D se trata en el grupo Errores.",
    "examples": [
      {
        "id": "power-query/tipos-de-datos/configuracion-regional/1",
        "title": "Convertir importe y fecha españoles",
        "language": "powerquery",
        "code": "Table.TransformColumnTypes(Importacion, {{\"importe\", type number}, {\"fecha\", type date}}, \"es-ES\")",
        "hint": "En interfaz: Cambiar tipo > Usar configuración regional.",
        "textOutput": "Importe 1234.5, Error, 25; fechas 31/01, 01/02 y 02/02 de 2026.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
