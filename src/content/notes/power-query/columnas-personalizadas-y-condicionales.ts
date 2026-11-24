// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/columnas-personalizadas-y-condicionales/definicion",
    "remember": "La expresión `each` se evalúa con el registro de la fila.",
    "examples": [
      {
        "id": "power-query/columnas-personalizadas-y-condicionales/definicion/1",
        "title": "Calcular comisión del 5 %",
        "language": "powerquery",
        "code": "Table.AddColumn(Pedidos, \"comision\", each [importe] * 0.05, type number)",
        "hint": "Agregar columna > Columna personalizada; escribe [importe] * 0.05.",
        "textOutput": "7 filas; comisiones por id: 5,10,4,7.5,7.5,2.5,15.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/columnas-personalizadas-y-condicionales/if-then-else",
    "remember": "En M todo if requiere then y else.",
    "examples": [
      {
        "id": "power-query/columnas-personalizadas-y-condicionales/if-then-else/1",
        "title": "Marcar pedidos completados",
        "language": "powerquery",
        "code": "Table.AddColumn(Pedidos, \"valido\", each if [estado] = \"completado\" then 1 else 0, Int64.Type)",
        "hint": "El resultado es un indicador numérico.",
        "textOutput": "Ids 101,102,104,105,107 reciben 1; 103 y 106 reciben 0.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/columnas-personalizadas-y-condicionales/condiciones-encadenadas",
    "remember": "La primera condición verdadera determina el resultado.",
    "examples": [
      {
        "id": "power-query/columnas-personalizadas-y-condicionales/condiciones-encadenadas/1",
        "title": "Clasificar pedidos por importe",
        "language": "powerquery",
        "code": "Table.AddColumn(Pedidos, \"segmento\", each if [importe] >= 200 then \"Alto\" else if [importe] >= 100 then \"Medio\" else \"Bajo\", type text)",
        "hint": "Las condiciones se evalúan de mayor a menor umbral.",
        "textOutput": "Alto: 102,107; Medio: 101,104,105; Bajo: 103,106.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/columnas-personalizadas-y-condicionales/transformar-o-agregar",
    "remember": "Transformar una columna recibe su valor; agregar una columna recibe la fila.",
    "examples": [
      {
        "id": "power-query/columnas-personalizadas-y-condicionales/transformar-o-agregar/1",
        "title": "Redondear una columna existente",
        "language": "powerquery",
        "code": "Table.TransformColumns(#table({\"importe\"}, {{10.125},{12.126}}), {{\"importe\", each Number.Round(_,2), type number}})",
        "hint": "El campo importe se sustituye, no se duplica.",
        "textOutput": "Importes 10.12 y 12.13 (redondeo al par por defecto).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/columnas-personalizadas-y-condicionales/columna-a-partir-de-ejemplos",
    "remember": "Revisa la fórmula generada: los ejemplos no cubren todos los casos.",
    "note": "La inferencia varía; para verificarla agrega un correo con otro dominio y comprueba que cambie la salida.",
    "examples": [
      {
        "id": "power-query/columnas-personalizadas-y-condicionales/columna-a-partir-de-ejemplos/1",
        "title": "Extraer dominios desde ejemplos",
        "code": "",
        "steps": [
          "Crea una copia de Leads",
          "Filtra correo no nulo y no vacío y limpia espacios",
          "Agregar columna > Columna a partir de ejemplos > Desde selección, elige correo y escribe ejemplo.com para una fila",
          "Revisa la inferencia y confirma solo si extrae el texto después de @"
        ],
        "external": true,
        "hint": "Comprueba que la fórmula no sea simplemente una constante; si lo es, usa Text.AfterDelimiter.",
        "textOutput": "4 filas válidas con dominio ejemplo.com.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
