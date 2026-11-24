// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/graficos/definicion",
    "remember": "El tipo de gráfico depende de la pregunta.",
    "examples": [
      {
        "id": "excel/graficos/definicion/1",
        "title": "Comparar metas",
        "language": "text",
        "code": "",
        "hint": "Selecciona Targets!A1:C3 e inserta columnas agrupadas. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Dos grupos de barras: enero 600/500 y febrero 650/700.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/graficos/barras-y-columnas",
    "remember": "Las barras horizontales facilitan leer nombres largos.",
    "examples": [
      {
        "id": "excel/graficos/barras-y-columnas/1",
        "title": "Comparar productos",
        "language": "text",
        "code": "",
        "hint": "En Scratch crea tabla de dos columnas product_name y price con Products!B2:B4 y D2:D4; inserta barras. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Mouse 100, Monitor 300, Cable 50.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/graficos/lineas",
    "remember": "Ordena periodos y usa intervalos coherentes.",
    "examples": [
      {
        "id": "excel/graficos/lineas/1",
        "title": "Mostrar ventas mensuales",
        "language": "text",
        "code": "",
        "hint": "Selecciona Targets!A1:A3 y C1:C3 como etiquetas y serie; inserta gráfico de líneas. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Dos puntos de actual: 500 y 700.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/graficos/dispersion",
    "remember": "No confundas eje de valores con categorías.",
    "examples": [
      {
        "id": "excel/graficos/dispersion/1",
        "title": "Precio frente a cantidad",
        "language": "text",
        "code": "",
        "hint": "Copia Sales!F2:F9 como X y E2:E9 como Y en dos columnas de Scratch; inserta Dispersión. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Ocho pares, algunos superpuestos, por ejemplo (100,2) y (300,1).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/graficos/circular-y-anillos",
    "remember": "Úsalos con pocas categorías que formen un total.",
    "examples": [
      {
        "id": "excel/graficos/circular-y-anillos/1",
        "title": "Participación por canal",
        "language": "text",
        "code": "",
        "hint": "En Scratch crea canal/venta: Online 800, Store 400; inserta gráfico circular. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Dos sectores 66.67% y 33.33%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/graficos/combinado-y-eje-secundario",
    "remember": "Etiqueta ambos ejes y no sugieras relaciones falsas.",
    "examples": [
      {
        "id": "excel/graficos/combinado-y-eje-secundario/1",
        "title": "Comparar venta y cumplimiento",
        "language": "text",
        "code": "",
        "hint": "En Scratch crea month/actual/rate con enero 500 y =500/600, febrero 700 y =700/650; inserta combinado columnas para actual y línea en eje secundario para rate. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Barras 500 y 700; línea 83.33% y 107.69%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/graficos/histograma-pareto-y-caja",
    "remember": "Un histograma usa intervalos, no una barra por fila.",
    "examples": [
      {
        "id": "excel/graficos/histograma-pareto-y-caja/1",
        "title": "Distribución de importes",
        "language": "text",
        "code": "",
        "hint": "Selecciona Sales!I2:I9; Insertar > Histograma; configura ancho de intervalo 200. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Barras de frecuencia según los límites que muestre Excel; las frecuencias suman 8.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/graficos/cascada",
    "remember": "Marca los valores inicial y final como totales.",
    "examples": [
      {
        "id": "excel/graficos/cascada/1",
        "title": "Explicar crecimiento",
        "language": "text",
        "code": "",
        "hint": "En Scratch crea etiquetas Jan, Change, Feb con valores 500, 200, 700; inserta cascada y marca Jan y Feb como totales. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "500 + 200 = 700, sin volver a acumular el total final.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/graficos/minigraficos",
    "remember": "Útiles como contexto, no sustituyen ejes de un gráfico detallado.",
    "examples": [
      {
        "id": "excel/graficos/minigraficos/1",
        "title": "Tendencia breve",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1:B1 introduce 500 y 700; Insertar > Minigráfico de línea con destino C1. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Línea ascendente en C1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/graficos/graficos-dinamicos",
    "remember": "Los filtros de la pivot determinan la serie visible.",
    "examples": [
      {
        "id": "excel/graficos/graficos-dinamicos/1",
        "title": "Visualizar estados",
        "language": "text",
        "code": "",
        "hint": "Selecciona pivot de ventas por estado e inserta gráfico dinámico de columnas. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Tres barras de 600, 1200 y 300; al filtrar completed permanece 1200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
