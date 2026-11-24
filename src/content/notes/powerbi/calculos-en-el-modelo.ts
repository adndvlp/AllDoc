// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/definicion",
    "remember": "Medida dinámica; columna por fila; tabla como conjunto de filas.",
    "examples": [
      {
        "id": "powerbi/calculos-en-el-modelo/definicion/1",
        "title": "Crear una medida",
        "language": "dax",
        "code": "Pedidos total = COUNTROWS(Pedidos)",
        "hint": "",
        "textOutput": "Tarjeta con 8; con filtro Mexico, 6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/medidas-explicitas-e-implicitas",
    "remember": "Usa medidas explícitas para definiciones reutilizables.",
    "examples": [
      {
        "id": "powerbi/calculos-en-el-modelo/medidas-explicitas-e-implicitas/1",
        "title": "Comparar cantidades",
        "code": "",
        "steps": [
          "Arrastra Pedidos[Cantidad] a una tarjeta y selecciona Suma.",
          "Crea otra tarjeta con medida `Unidades = SUM(Pedidos[Cantidad])`."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ambas muestran 12 sin filtros; la medida puede reutilizarse en otras fórmulas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/columnas-calculadas",
    "remember": "Útil para clasificación o atributo por fila, no para totales dinámicos.",
    "note": "Nueva columna en Pedidos.",
    "examples": [
      {
        "id": "powerbi/calculos-en-el-modelo/columnas-calculadas/1",
        "title": "Crear importe por pedido",
        "language": "dax",
        "code": "ImporteLinea = Pedidos[Cantidad] * Pedidos[Precio]",
        "hint": "",
        "textOutput": "Pedido 3: 120; pedido 6: 300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/tablas-calculadas",
    "remember": "Nueva tabla, no Nueva medida.",
    "note": "Consulta de demostración; no conectar esta tabla al modelo principal.",
    "examples": [
      {
        "id": "powerbi/calculos-en-el-modelo/tablas-calculadas/1",
        "title": "Materializar pedidos completados",
        "language": "dax",
        "code": "Completados = FILTER(Pedidos, Pedidos[Estado] = \"completed\")",
        "hint": "",
        "textOutput": "Siete filas; no cambia al elegir un país en un segmentador.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/dax-frente-a-power-query",
    "remember": "Prepara atributos estables en origen o M; usa medidas para análisis dinámico.",
    "examples": [
      {
        "id": "powerbi/calculos-en-el-modelo/dax-frente-a-power-query/1",
        "title": "Comparar un atributo y una métrica",
        "code": "",
        "steps": [
          "En Power Query de referencia agrega `[Cantidad] * [Precio]`.",
          "En el modelo usa Ventas en una tarjeta y filtra Mexico."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La columna calcula importes por fila; la tarjeta cambia de 1100 a 820.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/sintaxis-y-variables-var-return",
    "remember": "Una variable se evalúa en su contexto de definición.",
    "examples": [
      {
        "id": "powerbi/calculos-en-el-modelo/sintaxis-y-variables-var-return/1",
        "title": "Calcular ticket con variables",
        "language": "dax",
        "code": "Ticket variable =\nVAR Total = [Ventas]\nVAR N = [Pedidos completados]\nRETURN DIVIDE(Total, N)",
        "hint": "",
        "textOutput": "157.14 con formato de dos decimales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/quick-measures",
    "remember": "Lee la fórmula generada antes de reutilizarla.",
    "examples": [
      {
        "id": "powerbi/calculos-en-el-modelo/quick-measures/1",
        "title": "Calcular una diferencia sin escribir toda la fórmula",
        "code": "",
        "steps": [
          "Inicio o Modelado > Medida rápida; elige Diferencia en operaciones matemáticas, si está disponible.",
          "Configura Ventas y Objetivo como valores y acepta.",
          "Filtra febrero 2026."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La diferencia es 100; la medida generada puede inspeccionarse y editarse.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
