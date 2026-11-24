// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/m-avanzado/definicion",
    "remember": "Usa técnicas avanzadas cuando simplifiquen la lógica; no por defecto.",
    "examples": [
      {
        "id": "power-query/m-avanzado/definicion/1",
        "title": "Evaluar solo el resultado necesario",
        "language": "powerquery",
        "code": "let NoUsado = error \"No necesario\", Total = 100 + 200 in Total",
        "hint": "El valor no referenciado no necesita evaluarse en este ejemplo.",
        "textOutput": "300, sin el error de NoUsado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/m-avanzado/funciones-de-orden-superior",
    "remember": "Pasa la función, no el resultado de invocarla, si la operación espera una función.",
    "examples": [
      {
        "id": "power-query/m-avanzado/funciones-de-orden-superior/1",
        "title": "Aplicar una función a tres números",
        "language": "powerquery",
        "code": "let Doble = (x as number) as number => 2*x in List.Transform({1,2,3},Doble)",
        "hint": "List.Transform invoca Doble para cada elemento.",
        "textOutput": "{2,4,6}.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/m-avanzado/list-accumulate",
    "remember": "Define un estado inicial coherente con lo que quieres devolver.",
    "examples": [
      {
        "id": "power-query/m-avanzado/list-accumulate/1",
        "title": "Sumar incrementos de saldo",
        "language": "powerquery",
        "code": "List.Accumulate({100,-20,50},0,(saldo,movimiento)=>saldo+movimiento)",
        "hint": "El saldo cambia con cada movimiento.",
        "textOutput": "130.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/m-avanzado/list-generate",
    "remember": "La condición debe permitir terminar la generación.",
    "examples": [
      {
        "id": "power-query/m-avanzado/list-generate/1",
        "title": "Generar tres meses",
        "language": "powerquery",
        "code": "List.Generate(()=>#date(2026,1,1), each _ < #date(2026,4,1), each Date.AddMonths(_,1))",
        "hint": "Avanza un mes hasta llegar al límite exclusivo.",
        "textOutput": "Fechas 2026-01-01, 2026-02-01 y 2026-03-01.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/m-avanzado/recursividad",
    "remember": "Incluye un caso base y evita recursión innecesaria sobre grandes volúmenes.",
    "examples": [
      {
        "id": "power-query/m-avanzado/recursividad/1",
        "title": "Sumar enteros hasta cuatro",
        "language": "powerquery",
        "code": "let F = (n as number) as number => if n <= 0 then 0 else n + @F(n-1) in F(4)",
        "hint": "El caso base detiene las llamadas en cero.",
        "textOutput": "10.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
