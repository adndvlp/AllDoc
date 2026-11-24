// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/lenguaje-m/definicion",
    "remember": "Cada paso puede usar el resultado de otro paso.",
    "examples": [
      {
        "id": "power-query/lenguaje-m/definicion/1",
        "title": "Calcular un valor",
        "language": "powerquery",
        "code": "100 + 50",
        "hint": "Una consulta no tiene que devolver una tabla.",
        "textOutput": "150.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/lenguaje-m/let-e-in",
    "remember": "Las definiciones se separan por comas; `in` devuelve una expresión.",
    "examples": [
      {
        "id": "power-query/lenguaje-m/let-e-in/1",
        "title": "Obtener el importe con descuento",
        "language": "powerquery",
        "code": "let\n    Precio = 200,\n    Descuento = 0.1,\n    Neto = Precio * (1 - Descuento)\nin\n    Neto",
        "hint": "Neto depende de Precio y Descuento.",
        "textOutput": "180.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/lenguaje-m/identificadores-y-comentarios",
    "remember": "M distingue mayúsculas; referencia el nombre exacto.",
    "examples": [
      {
        "id": "power-query/lenguaje-m/identificadores-y-comentarios/1",
        "title": "Nombrar un paso con espacios",
        "language": "powerquery",
        "code": "let\n    #\"Importe neto\" = 100 - 10 // Descuento aplicado\nin\n    #\"Importe neto\"",
        "hint": "Las comillas del identificador no crean un texto.",
        "textOutput": "90.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/lenguaje-m/operadores",
    "remember": "En M `=` compara; no uses `==`.",
    "examples": [
      {
        "id": "power-query/lenguaje-m/operadores/1",
        "title": "Comprobar un importe",
        "language": "powerquery",
        "code": "(150 >= 100) and not (150 = 200)",
        "hint": "Los paréntesis hacen explícitas las condiciones.",
        "textOutput": "true.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/lenguaje-m/funciones-y-each",
    "remember": "`each [importe]` equivale a `(_) => _[importe]` cuando el argumento es un registro.",
    "examples": [
      {
        "id": "power-query/lenguaje-m/funciones-y-each/1",
        "title": "Duplicar un importe",
        "language": "powerquery",
        "code": "let Doble = (x as number) as number => x * 2 in Doble(50)",
        "hint": "El tipo del argumento es number y el resultado también.",
        "textOutput": "100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
