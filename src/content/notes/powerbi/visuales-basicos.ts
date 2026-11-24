// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/visuales-basicos/definicion",
    "remember": "Barras para comparar; líneas para evolución.",
    "examples": [
      {
        "id": "powerbi/visuales-basicos/definicion/1",
        "title": "Comparar categorías",
        "code": "",
        "steps": [
          "Crea gráfico de barras agrupadas con Categoria en eje Y y Ventas en X.",
          "Ordena por Ventas descendente."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Tecnologia 650 primero; Muebles 450 segundo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/visuales-basicos/barras-y-columnas",
    "remember": "Ordena por métrica o por tiempo, según pregunta.",
    "examples": [
      {
        "id": "powerbi/visuales-basicos/barras-y-columnas/1",
        "title": "Comparar ventas por cliente",
        "code": "",
        "steps": [
          "Gráfico de columnas con Nombre en X y Ventas en Y; orden descendente."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ana 520, Marta 300, Luis 280; Diego sin barra.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/visuales-basicos/lineas-y-areas",
    "remember": "Usa eje temporal coherente y no conviertas ausencias en cero sin decisión.",
    "examples": [
      {
        "id": "powerbi/visuales-basicos/lineas-y-areas/1",
        "title": "Mostrar evolución de 2026",
        "code": "",
        "steps": [
          "Línea con AñoMes y Ventas; filtra 2026 y enero-febrero."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Puntos 200 y 600; tendencia ascendente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/visuales-basicos/apilados-y-100-apilados",
    "remember": "El 100% apilado oculta diferencias de tamaño absoluto.",
    "examples": [
      {
        "id": "powerbi/visuales-basicos/apilados-y-100-apilados/1",
        "title": "Comparar estados por cliente",
        "code": "",
        "steps": [
          "Crea columnas apiladas con Nombre, Pedidos total y Estado como leyenda.",
          "Cambia a 100% apiladas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Marta tiene 2 completed y 1 cancelled, proporciones 66.7% y 33.3%; Ana y Luis 100% completed.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/visuales-basicos/pie-y-donut",
    "remember": "Evita demasiadas porciones y categorías muy similares.",
    "examples": [
      {
        "id": "powerbi/visuales-basicos/pie-y-donut/1",
        "title": "Mostrar participación por categoría",
        "code": "",
        "steps": [
          "Donut con Categoria como leyenda y Ventas como valores.",
          "Activa etiquetas de porcentaje."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Tecnologia 59.09%, Muebles 40.91%.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/visuales-basicos/grafico-combinado",
    "remember": "Revisa escalas y no mezcles unidades sin aclaración.",
    "examples": [
      {
        "id": "powerbi/visuales-basicos/grafico-combinado/1",
        "title": "Comparar ventas y objetivo",
        "code": "",
        "steps": [
          "Filtra Año=2026 y enero-febrero.",
          "Crea gráfico combinado con AñoMes, Ventas como columnas y Objetivo como línea."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Enero 200 frente a 250; febrero 600 frente a 500.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
