// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/tablas-matrices-e-indicadores/definicion",
    "remember": "El total de una medida se recalcula según su contexto.",
    "examples": [
      {
        "id": "powerbi/tablas-matrices-e-indicadores/definicion/1",
        "title": "Mostrar resumen por país",
        "code": "",
        "steps": [
          "Crea tabla con Clientes[Pais], Ventas y Pedidos completados."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Mexico 820 y 5; Espana 280 y 2; total 1100 y 7.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/tablas-matrices-e-indicadores/table-y-matrix",
    "remember": "Elige Matrix para cruces entre dimensiones.",
    "examples": [
      {
        "id": "powerbi/tablas-matrices-e-indicadores/table-y-matrix/1",
        "title": "Cruzar país y categoría",
        "code": "",
        "steps": [
          "Matriz: filas Pais, columnas Categoria, valores Ventas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Mexico: Tecnologia 370, Muebles 450; Espana: Tecnologia 280, Muebles BLANK.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/tablas-matrices-e-indicadores/card",
    "remember": "Acompaña la cifra con unidad y definición.",
    "examples": [
      {
        "id": "powerbi/tablas-matrices-e-indicadores/card/1",
        "title": "Mostrar ventas",
        "code": "",
        "steps": [
          "Agrega tarjeta con Ventas, título Ventas completadas.",
          "Fija unidades de visualización a ninguna."
        ],
        "external": true,
        "hint": "",
        "textOutput": "1100 sin filtros.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/tablas-matrices-e-indicadores/kpi-y-gauge",
    "remember": "No confundas valor del último periodo con total histórico.",
    "examples": [
      {
        "id": "powerbi/tablas-matrices-e-indicadores/kpi-y-gauge/1",
        "title": "Mostrar cumplimiento de febrero",
        "code": "",
        "steps": [
          "Filtra febrero 2026.",
          "Agrega Gauge con Ventas, Target Objetivo, mínimo 0 y máximo fijo 750."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Valor 600, objetivo 500, por encima de la meta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/tablas-matrices-e-indicadores/formato-condicional",
    "remember": "Define umbrales con significado de negocio.",
    "note": "Requiere medida Brecha del grupo Métricas de negocio; conserva signos y etiquetas para accesibilidad.",
    "examples": [
      {
        "id": "powerbi/tablas-matrices-e-indicadores/formato-condicional/1",
        "title": "Resaltar metas incumplidas",
        "code": "",
        "steps": [
          "Matriz AñoMes, Ventas y Brecha; filtra enero-febrero 2026.",
          "Formato condicional de Brecha por reglas: negativo rojo, no negativo verde."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Enero -50 resaltado como incumplido; febrero 100 como cumplido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/tablas-matrices-e-indicadores/kpi-con-tendencia-temporal",
    "remember": "Comprueba que el eje esté ordenado y que el último periodo tenga datos.",
    "examples": [
      {
        "id": "powerbi/tablas-matrices-e-indicadores/kpi-con-tendencia-temporal/1",
        "title": "Mostrar el último mes con actividad",
        "code": "",
        "steps": [
          "Filtra enero-febrero 2026.",
          "Inserta visual KPI, Indicador Ventas, Eje de tendencia Calendario[AñoMes], Objetivo medida Objetivo; orden cronológico."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Último mes febrero: 600 frente a objetivo 500; el indicador no muestra 800 de ambos meses.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
