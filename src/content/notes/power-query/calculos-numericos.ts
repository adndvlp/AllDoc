// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/calculos-numericos/definicion",
    "remember": "Define unidades, precisión y tratamiento de valores ausentes.",
    "examples": [
      {
        "id": "power-query/calculos-numericos/definicion/1",
        "title": "Calcular el importe antes de impuesto",
        "language": "powerquery",
        "code": "116 / 1.16",
        "hint": "Se divide entre el factor del impuesto.",
        "textOutput": "100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/calculos-numericos/round-y-modos-de-redondeo",
    "remember": "El redondeo predeterminado usa empate al par; especifica un modo si el negocio exige otro.",
    "examples": [
      {
        "id": "power-query/calculos-numericos/round-y-modos-de-redondeo/1",
        "title": "Comparar dos modos de redondeo",
        "language": "powerquery",
        "code": "{Number.Round(2.5), Number.Round(2.5, 0, RoundingMode.AwayFromZero)}",
        "hint": "Ambas funciones redondean a entero.",
        "textOutput": "{2,3}.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/calculos-numericos/valor-absoluto-techo-y-piso",
    "remember": "RoundUp va hacia positivo y RoundDown hacia negativo.",
    "examples": [
      {
        "id": "power-query/calculos-numericos/valor-absoluto-techo-y-piso/1",
        "title": "Comparar ajustes",
        "language": "powerquery",
        "code": "{Number.Abs(-25), Number.RoundUp(2.1), Number.RoundDown(2.9)}",
        "hint": "Se ejecuta una función sobre cada número.",
        "textOutput": "{25,3,2}.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/calculos-numericos/division-y-porcentajes",
    "remember": "Comprueba el denominador: M puede devolver infinito o NaN al dividir por cero.",
    "examples": [
      {
        "id": "power-query/calculos-numericos/division-y-porcentajes/1",
        "title": "Calcular porcentaje protegido",
        "language": "powerquery",
        "code": "let Porcentaje = (parte as number, total as number) => if total = 0 then null else parte / total * 100 in {Porcentaje(5,7), Porcentaje(0,0)}",
        "hint": "La condición evita dividir por cero.",
        "textOutput": "{aprox. 71.4286, null}.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
