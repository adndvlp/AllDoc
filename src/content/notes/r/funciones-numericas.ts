// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/funciones-numericas/definicion",
    "remember": "Redondea al presentar resultados si necesitas preservar precisión durante el cálculo.",
    "examples": [
      {
        "id": "r/funciones-numericas/definicion/1",
        "title": "Redondear un ratio",
        "language": "r",
        "code": "round(2 / 3, 2)",
        "hint": "El segundo argumento indica decimales.",
        "textOutput": "`0.67`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-numericas/round-floor-y-ceiling",
    "remember": "floor y ceiling no redondean al entero más cercano.",
    "examples": [
      {
        "id": "r/funciones-numericas/round-floor-y-ceiling/1",
        "title": "Calcular paquetes necesarios",
        "language": "r",
        "code": "ceiling(17 / 5)",
        "hint": "Se requieren cuatro paquetes completos para contener 17 unidades.",
        "textOutput": "`4`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-numericas/abs-log-y-sqrt",
    "remember": "Verifica dominio antes de aplicar log o sqrt.",
    "examples": [
      {
        "id": "r/funciones-numericas/abs-log-y-sqrt/1",
        "title": "Medir desviación de una meta",
        "language": "r",
        "code": "abs(c(90, 110) - 100)",
        "hint": "Se ignora el signo de la diferencia.",
        "textOutput": "`c(10, 10)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-numericas/division-y-porcentajes",
    "remember": "Protege el denominador antes de interpretar el resultado.",
    "examples": [
      {
        "id": "r/funciones-numericas/division-y-porcentajes/1",
        "title": "Calcular tasa de cumplimiento",
        "language": "r",
        "code": "100 * mean(pedidos$estado == \"completado\")",
        "hint": "TRUE aporta 1 y FALSE aporta 0.",
        "textOutput": "`83.33333` aproximadamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
