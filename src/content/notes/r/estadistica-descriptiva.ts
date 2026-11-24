// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/estadistica-descriptiva/definicion",
    "remember": "La media por sí sola no describe toda la distribución.",
    "examples": [
      {
        "id": "r/estadistica-descriptiva/definicion/1",
        "title": "Obtener resumen de importes",
        "language": "r",
        "code": "summary(pedidos$monto)",
        "hint": "summary reúne varias medidas.",
        "textOutput": "Mínimo 50, Q1 100, mediana 125, media 150, Q3 187.5, máximo 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/estadistica-descriptiva/media-mediana-y-moda",
    "remember": "`mode()` en R no calcula moda estadística.",
    "note": "Con varios modos esta expresión devuelve solo el primero.",
    "examples": [
      {
        "id": "r/estadistica-descriptiva/media-mediana-y-moda/1",
        "title": "Encontrar el importe más frecuente",
        "language": "r",
        "code": "names(which.max(table(pedidos$monto)))",
        "hint": "table cuenta frecuencias y which.max localiza la mayor.",
        "textOutput": "`\"100\"`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/estadistica-descriptiva/varianza-y-desviacion-estandar",
    "remember": "La desviación estándar está en las unidades originales.",
    "examples": [
      {
        "id": "r/estadistica-descriptiva/varianza-y-desviacion-estandar/1",
        "title": "Calcular dispersión de tres ventas",
        "language": "r",
        "code": "c(varianza = var(c(10, 20, 30)), sd = sd(c(10, 20, 30)))",
        "hint": "Los valores están separados de la media por 10, 0 y 10.",
        "textOutput": "varianza 100, desviación 10.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/estadistica-descriptiva/cuantiles-y-percentiles",
    "remember": "Indica el método de cuantiles si comparas con otros sistemas.",
    "examples": [
      {
        "id": "r/estadistica-descriptiva/cuantiles-y-percentiles/1",
        "title": "Calcular percentiles",
        "language": "r",
        "code": "quantile(c(10, 20, 30, 40, 50), c(.25, .5, .75))",
        "hint": "Se usa el método por defecto de R.",
        "textOutput": "25%=20, 50%=30, 75%=40.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/estadistica-descriptiva/frecuencias-y-proporciones",
    "remember": "Incluye NA explícitamente si debe pertenecer al denominador.",
    "examples": [
      {
        "id": "r/estadistica-descriptiva/frecuencias-y-proporciones/1",
        "title": "Calcular distribución de estados",
        "language": "r",
        "code": "round(prop.table(table(pedidos$estado)), 3)",
        "hint": "Las proporciones suman aproximadamente uno.",
        "textOutput": "cancelado=0.167; completado=0.833.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/estadistica-descriptiva/correlacion-y-covarianza",
    "remember": "Correlación no implica causalidad.",
    "examples": [
      {
        "id": "r/estadistica-descriptiva/correlacion-y-covarianza/1",
        "title": "Medir asociación lineal",
        "language": "r",
        "code": "cor(c(1, 2, 3), c(10, 20, 30))",
        "hint": "Ambos vectores crecen proporcionalmente.",
        "textOutput": "`1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
