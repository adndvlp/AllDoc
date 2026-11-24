// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/probabilidad-y-muestreo/definicion",
    "remember": "El prefijo p calcula probabilidad acumulada; q hace la operación inversa.",
    "examples": [
      {
        "id": "r/probabilidad-y-muestreo/definicion/1",
        "title": "Calcular probabilidad normal acumulada",
        "language": "r",
        "code": "pnorm(0)",
        "hint": "La normal estándar es simétrica en cero.",
        "textOutput": "`0.5`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/probabilidad-y-muestreo/distribuciones-discretas",
    "remember": "Usa una distribución acorde al proceso generador.",
    "examples": [
      {
        "id": "r/probabilidad-y-muestreo/distribuciones-discretas/1",
        "title": "Probabilidad de dos conversiones en tres visitas",
        "language": "r",
        "code": "dbinom(2, size = 3, prob = 0.5)",
        "hint": "Calcula exactamente dos éxitos.",
        "textOutput": "`0.375`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/probabilidad-y-muestreo/muestreo-y-semillas",
    "remember": "Una semilla permite repetir una simulación con el mismo entorno y algoritmo.",
    "examples": [
      {
        "id": "r/probabilidad-y-muestreo/muestreo-y-semillas/1",
        "title": "Seleccionar dos clientes sin reemplazo",
        "language": "r",
        "code": "set.seed(42)\nx <- sample(clientes$id, size = 2, replace = FALSE)\nlength(unique(x))",
        "hint": "Se obtienen dos identificadores diferentes.",
        "textOutput": "`2`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/probabilidad-y-muestreo/bootstrap",
    "remember": "El esquema de remuestreo debe respetar la dependencia de los datos.",
    "examples": [
      {
        "id": "r/probabilidad-y-muestreo/bootstrap/1",
        "title": "Estimar variabilidad de una media",
        "language": "r",
        "code": "set.seed(42)\nx <- c(10, 20, 30, 40)\nmedias <- replicate(1000, mean(sample(x, replace = TRUE)))\nquantile(medias, c(.025, .975))",
        "hint": "Cada réplica tiene cuatro observaciones con reemplazo.",
        "textOutput": "Dos límites de un intervalo percentil empírico de las medias; dependen del remuestreo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
