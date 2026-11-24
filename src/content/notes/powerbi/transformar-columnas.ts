// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/transformar-columnas/definicion",
    "remember": "Transformar modifica una columna; agregar conserva la original.",
    "examples": [
      {
        "id": "powerbi/transformar-columnas/definicion/1",
        "title": "Crear importe de línea",
        "code": "",
        "steps": [
          "En referencia de Pedidos agrega columna personalizada ` [Cantidad] * [Precio] ` con nombre ImporteLinea y tipo decimal fijo."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Pedido 3: 120; pedido 6: 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/transformar-columnas/dividir-y-combinar-columnas",
    "remember": "Dividir y combinar columnas no es Merge Queries.",
    "examples": [
      {
        "id": "powerbi/transformar-columnas/dividir-y-combinar-columnas/1",
        "title": "Separar código y número",
        "code": "",
        "steps": [
          "En Sucios, divide Codigo por `-` en dos columnas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "MX-01 produce MX y 01; conserva 01 como texto para no perder el cero.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/transformar-columnas/extraer-texto-y-reemplazar",
    "remember": "Conserva texto original si necesitas auditar.",
    "examples": [
      {
        "id": "powerbi/transformar-columnas/extraer-texto-y-reemplazar/1",
        "title": "Extraer prefijo",
        "code": "",
        "steps": [
          "En Sucios agrega columna personalizada `Text.Start([Codigo], 2)` con nombre Prefijo."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Id 1: MX; Id 2: ES; Id 4: null.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/transformar-columnas/columna-condicional",
    "remember": "La primera condición verdadera determina el resultado.",
    "examples": [
      {
        "id": "powerbi/transformar-columnas/columna-condicional/1",
        "title": "Clasificar pedidos",
        "code": "",
        "steps": [
          "En referencia de Pedidos agrega columna condicional: si Cantidad >= 2, Multiple; si no, Simple."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Pedidos 2, 3 y 6 son Multiple; los demás Simple.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/transformar-columnas/columna-personalizada",
    "remember": "Usa `[Campo]` dentro de una expresión de fila.",
    "examples": [
      {
        "id": "powerbi/transformar-columnas/columna-personalizada/1",
        "title": "Calcular coste de envío fijo por unidad",
        "code": "",
        "steps": [
          "En referencia de Pedidos crea columna EnvioEstimado con `[Cantidad] * 5`."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Pedido 6: 15.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/transformar-columnas/columna-a-partir-de-ejemplos",
    "remember": "Revisa la expresión inferida y casos no mostrados.",
    "examples": [
      {
        "id": "powerbi/transformar-columnas/columna-a-partir-de-ejemplos/1",
        "title": "Derivar prefijo de país",
        "code": "",
        "steps": [
          "En Sucios selecciona Codigo > Agregar columna a partir de ejemplos > Desde selección.",
          "Introduce MX para MX-01 y ES para ES-02; revisa la propuesta."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La vista previa muestra los prefijos; acepta solo si también maneja MX-03 y null correctamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/transformar-columnas/fechas-en-power-query",
    "remember": "Una duración no es una fecha.",
    "examples": [
      {
        "id": "powerbi/transformar-columnas/fechas-en-power-query/1",
        "title": "Calcular días de envío",
        "code": "",
        "steps": [
          "En referencia de Pedidos agrega columna `if [Envio] = null then null else Duration.Days([Envio] - [Fecha])`."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Pedido 4: 3; pedido 5: null.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
