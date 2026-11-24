// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/inteligencia-temporal/definicion",
    "remember": "Filtra por Calendario, no por columnas de fecha de hechos en los ejemplos.",
    "examples": [
      {
        "id": "powerbi/inteligencia-temporal/definicion/1",
        "title": "Comparar meses",
        "code": "",
        "steps": [
          "Crea matriz Calendario[AñoMes] con Ventas.",
          "Filtra Año=2026 y excluye meses sin ventas si es necesario."
        ],
        "external": true,
        "hint": "",
        "textOutput": "2026-01: 200; 2026-02: 600.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/inteligencia-temporal/year-month-today-y-datediff",
    "remember": "DATEDIFF cuenta límites de la unidad indicada, no siempre duración exacta.",
    "note": "Nueva columna. TODAY() depende del día de evaluación y de la actualización cuando se usa en columnas.",
    "examples": [
      {
        "id": "powerbi/inteligencia-temporal/year-month-today-y-datediff/1",
        "title": "Calcular demora de envío",
        "language": "dax",
        "code": "Días envío = IF(ISBLANK(Pedidos[Envio]), BLANK(), DATEDIFF(Pedidos[Fecha], Pedidos[Envio], DAY))",
        "hint": "",
        "textOutput": "Pedido 4: 3; pedido 5: BLANK.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/inteligencia-temporal/dateadd-y-sameperiodlastyear",
    "remember": "Usa fechas continuas y calendario marcado para la forma clásica.",
    "note": "Crea cada medida por separado.",
    "examples": [
      {
        "id": "powerbi/inteligencia-temporal/dateadd-y-sameperiodlastyear/1",
        "title": "Comparar ventas de febrero",
        "language": "dax",
        "code": "Ventas mes anterior = CALCULATE([Ventas], DATEADD(Calendario[Date], -1, MONTH))\nVentas año anterior = CALCULATE([Ventas], SAMEPERIODLASTYEAR(Calendario[Date]))",
        "hint": "",
        "textOutput": "En febrero 2026: mes anterior 200, año anterior 200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/inteligencia-temporal/totalytd-datesytd-qtd-y-mtd",
    "remember": "Un acumulado se reinicia al comenzar su periodo.",
    "note": "Equivalente clásico: CALCULATE([Ventas], DATESYTD(Calendario[Date])); TOTALQTD y TOTALMTD cambian el inicio del periodo.",
    "examples": [
      {
        "id": "powerbi/inteligencia-temporal/totalytd-datesytd-qtd-y-mtd/1",
        "title": "Calcular ventas YTD",
        "language": "dax",
        "code": "Ventas YTD = TOTALYTD([Ventas], Calendario[Date])",
        "hint": "",
        "textOutput": "Enero 2026: 200; febrero 2026: 800.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/inteligencia-temporal/datesinperiod",
    "remember": "Ancla la ventana al último día visible, no necesariamente a hoy.",
    "examples": [
      {
        "id": "powerbi/inteligencia-temporal/datesinperiod/1",
        "title": "Ventas de últimos dos meses",
        "language": "dax",
        "code": "Ventas 2M = CALCULATE([Ventas], DATESINPERIOD(Calendario[Date], MAX(Calendario[Date]), -2, MONTH))",
        "hint": "",
        "textOutput": "Con febrero 2026 completo seleccionado: 800.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/inteligencia-temporal/crecimiento-mensual-e-interanual",
    "remember": "Sin base comparable devuelve blanco con DIVIDE.",
    "note": "Requiere la medida Ventas año anterior del grupo.",
    "examples": [
      {
        "id": "powerbi/inteligencia-temporal/crecimiento-mensual-e-interanual/1",
        "title": "Crecimiento interanual",
        "language": "dax",
        "code": "Crecimiento YoY = DIVIDE([Ventas] - [Ventas año anterior], [Ventas año anterior])",
        "hint": "",
        "textOutput": "Febrero 2026: 200%; enero 2026: 100%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/inteligencia-temporal/acumulado-sin-reinicio-anual",
    "remember": "Captura fecha límite antes de quitar filtros.",
    "examples": [
      {
        "id": "powerbi/inteligencia-temporal/acumulado-sin-reinicio-anual/1",
        "title": "Acumular ventas históricas",
        "language": "dax",
        "code": "Ventas acumuladas =\nVAR Corte = MAX(Calendario[Date])\nRETURN CALCULATE([Ventas], FILTER(ALL(Calendario), Calendario[Date] <= Corte))",
        "hint": "",
        "textOutput": "Enero 2026: 500; febrero 2026: 1100, incluyendo ventas de 2025.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
