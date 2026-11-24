// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/texto/definicion",
    "remember": "Normaliza antes de comparar o combinar claves textuales.",
    "examples": [
      {
        "id": "power-query/texto/definicion/1",
        "title": "Limpiar mayúsculas y espacios de correos",
        "language": "powerquery",
        "code": "Table.TransformColumns(Leads, {{\"correo\", each Text.Lower(Text.Trim(_)), type nullable text}})",
        "hint": "La misma transformación se aplica a cada correo.",
        "textOutput": "Ids 1 y 2 pasan a ana@ejemplo.com; null y vacío se conservan.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/texto/trim-y-clean",
    "remember": "Trim no elimina espacios internos.",
    "examples": [
      {
        "id": "power-query/texto/trim-y-clean/1",
        "title": "Limpiar texto copiado",
        "language": "powerquery",
        "code": "Text.Trim(Text.Clean(\"  Ana#(tab)  \"))",
        "hint": "Clean elimina la tabulación; Trim elimina los espacios de los extremos.",
        "textOutput": "\"Ana\".",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/texto/mayusculas-minusculas-y-capitalizacion",
    "remember": "Normaliza identificadores de texto de manera coherente.",
    "examples": [
      {
        "id": "power-query/texto/mayusculas-minusculas-y-capitalizacion/1",
        "title": "Normalizar un país",
        "language": "powerquery",
        "code": "Text.Upper(\"México\", \"es-MX\")",
        "hint": "Se indica la cultura para el cambio de caso.",
        "textOutput": "\"MÉXICO\".",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/texto/reemplazar-texto",
    "remember": "No es lo mismo reemplazar una parte que una celda completa.",
    "examples": [
      {
        "id": "power-query/texto/reemplazar-texto/1",
        "title": "Cambiar el dominio de prueba",
        "language": "powerquery",
        "code": "Text.Replace(\"ana@viejo.com\", \"viejo.com\", \"nuevo.com\")",
        "hint": "Se sustituye únicamente el fragmento indicado.",
        "textOutput": "\"ana@nuevo.com\".",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/texto/longitud-y-extraccion",
    "remember": "La posición de Text.Middle empieza en cero.",
    "examples": [
      {
        "id": "power-query/texto/longitud-y-extraccion/1",
        "title": "Extraer el número del código",
        "language": "powerquery",
        "code": "Text.Middle(\"PED-101\", 4, 3)",
        "hint": "Comienza después de PED-.",
        "textOutput": "\"101\".",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/texto/delimitadores",
    "remember": "Útil si la longitud del segmento cambia.",
    "examples": [
      {
        "id": "power-query/texto/delimitadores/1",
        "title": "Extraer dominio de correo",
        "language": "powerquery",
        "code": "Text.AfterDelimiter(\"ana@ejemplo.com\", \"@\")",
        "hint": "El delimitador no se incluye en el resultado.",
        "textOutput": "\"ejemplo.com\".",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/texto/concatenacion",
    "remember": "Convierte números a texto antes de concatenarlos.",
    "examples": [
      {
        "id": "power-query/texto/concatenacion/1",
        "title": "Crear etiqueta de pedido",
        "language": "powerquery",
        "code": "\"PED-\" & Text.From(101)",
        "hint": "El número se convierte antes de unirlo.",
        "textOutput": "\"PED-101\".",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
