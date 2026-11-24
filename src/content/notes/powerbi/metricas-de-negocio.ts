// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/metricas-de-negocio/definicion",
    "remember": "Define numerador y denominador antes de visualizar.",
    "note": "Si el informe filtra Estado, decide si el denominador debe ignorarlo.",
    "examples": [
      {
        "id": "powerbi/metricas-de-negocio/definicion/1",
        "title": "Medir pedidos completados",
        "language": "dax",
        "code": "Tasa completados = DIVIDE([Pedidos completados], [Pedidos total])",
        "hint": "",
        "textOutput": "87.5% global sin filtro de Estado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/metricas-de-negocio/revenue-coste-y-margen",
    "remember": "Coste por unidad debe multiplicarse por cantidad de ventas completadas.",
    "note": "Crea medidas por separado; Costos son ficticios y constantes.",
    "examples": [
      {
        "id": "powerbi/metricas-de-negocio/revenue-coste-y-margen/1",
        "title": "Calcular margen bruto",
        "language": "dax",
        "code": "Costo ventas = CALCULATE(SUMX(Pedidos, Pedidos[Cantidad]*RELATED(Productos[Costo])), Pedidos[Estado] = \"completed\")\nMargen bruto = [Ventas] - [Costo ventas]\nMargen % = DIVIDE([Margen bruto], [Ventas])",
        "hint": "",
        "textOutput": "Coste 600, margen 500, margen 45.45%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/metricas-de-negocio/ticket-promedio-y-clientes-unicos",
    "remember": "Si cambia el grano a líneas, cuenta pedidos distintos.",
    "examples": [
      {
        "id": "powerbi/metricas-de-negocio/ticket-promedio-y-clientes-unicos/1",
        "title": "Medir compradores completados",
        "language": "dax",
        "code": "Compradores completados = CALCULATE(DISTINCTCOUNT(Pedidos[ClienteID]), Pedidos[Estado] = \"completed\")",
        "hint": "",
        "textOutput": "3 compradores; ticket global 157.14.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/metricas-de-negocio/objetivos-y-variacion",
    "remember": "No repitas metas mensuales por cada pedido.",
    "note": "Crea medidas separadas. Analiza metas solo al nivel temporal y dimensional que representan.",
    "examples": [
      {
        "id": "powerbi/metricas-de-negocio/objetivos-y-variacion/1",
        "title": "Medir cumplimiento mensual",
        "language": "dax",
        "code": "Cumplimiento = DIVIDE([Ventas], [Objetivo])\nBrecha = [Ventas] - [Objetivo]",
        "hint": "",
        "textOutput": "Enero 2026: 80%, -50; febrero: 120%, 100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/metricas-de-negocio/retencion-y-cohortes",
    "remember": "Define eventos, población inicial y ventana.",
    "note": "Requiere AñoMes; evalúa sin filtros adicionales. No equivale a retención por cohorte de primera compra.",
    "examples": [
      {
        "id": "powerbi/metricas-de-negocio/retencion-y-cohortes/1",
        "title": "Medir retención de enero a febrero de 2026",
        "language": "dax",
        "code": "Retención enero-febrero =\nVAR Ene = CALCULATETABLE(VALUES(Pedidos[ClienteID]), REMOVEFILTERS(Calendario), Calendario[AñoMes] = \"2026-01\", Pedidos[Estado] = \"completed\")\nVAR Feb = CALCULATETABLE(VALUES(Pedidos[ClienteID]), REMOVEFILTERS(Calendario), Calendario[AñoMes] = \"2026-02\", Pedidos[Estado] = \"completed\")\nRETURN DIVIDE(COUNTROWS(INTERSECT(Ene, Feb)), COUNTROWS(Ene))",
        "hint": "",
        "textOutput": "50%: Ana vuelve en febrero; Luis no.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/metricas-de-negocio/conciliacion-y-calidad-de-kpis",
    "remember": "Una gráfica correcta visualmente puede tener un cálculo incorrecto.",
    "examples": [
      {
        "id": "powerbi/metricas-de-negocio/conciliacion-y-calidad-de-kpis/1",
        "title": "Conciliar ventas",
        "code": "",
        "steps": [
          "En tabla de Pedidos muestra PedidoID, Cantidad y Precio; filtra completed.",
          "Compara la suma de productos Cantidad × Precio con la tarjeta Ventas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Siete pedidos y 1100; el cancelado de 50 queda excluido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/metricas-de-negocio/medidas-aditivas-y-semiaditivas",
    "remember": "Saldo de cierre no es suma de saldos diarios.",
    "note": "Crea Inventario como tabla calculada de ejemplo desconectada y luego la medida por separado. Para inventarios por producto con fechas distintas se requiere lógica por entidad.",
    "examples": [
      {
        "id": "powerbi/metricas-de-negocio/medidas-aditivas-y-semiaditivas/1",
        "title": "Obtener inventario al cierre",
        "language": "dax",
        "code": "Inventario = UNION(ROW(\"Fecha\", DATE(2026,1,31), \"Unidades\", 100), ROW(\"Fecha\", DATE(2026,2,28), \"Unidades\", 80))\nInventario cierre =\nVAR Ultima = MAX(Inventario[Fecha])\nRETURN CALCULATE(SUM(Inventario[Unidades]), Inventario[Fecha] = Ultima)",
        "hint": "",
        "textOutput": "En tarjeta sin filtro: 80, no 180; con filtro de enero por Inventario[Fecha]: 100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
