// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/definicion",
    "remember": "Define población, periodo, unidad y fórmula antes de reportar.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/definicion/1",
        "title": "Calcular ingresos realizados",
        "language": "excel-formula",
        "code": "=SUMIF(Ventas!H2:H9,\"completed\",Ventas!J2:J9)",
        "hint": "",
        "textOutput": "2000 MXN.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/ingresos-costos-y-utilidad",
    "remember": "No mezcles costos de cancelados con ingresos de completados.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/ingresos-costos-y-utilidad/1",
        "title": "Calcular utilidad bruta",
        "language": "excel-formula",
        "code": "=SUMIF(Ventas!H2:H9,\"completed\",Ventas!J2:J9)-SUMIF(Ventas!H2:H9,\"completed\",Ventas!K2:K9)",
        "hint": "",
        "textOutput": "860 MXN.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/margen-y-markup",
    "remember": "Son denominadores distintos.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/margen-y-markup/1",
        "title": "Calcular margen bruto",
        "language": "excel-formula",
        "code": "=(2000-1140)/2000",
        "hint": "",
        "textOutput": "43%, con formato porcentaje.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/ticket-promedio",
    "remember": "No divide entre unidades ni clientes.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/ticket-promedio/1",
        "title": "Calcular ticket de completados",
        "language": "excel-formula",
        "code": "=SUMIF(Ventas!H2:H9,\"completed\",Ventas!J2:J9)/COUNTIF(Ventas!H2:H9,\"completed\")",
        "hint": "",
        "textOutput": "333.3333 MXN aproximadamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/tasas-y-ratios",
    "remember": "IFERROR puede ocultar denominador cero; compruébalo explícitamente.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/tasas-y-ratios/1",
        "title": "Calcular tasa de pedidos completados",
        "language": "excel-formula",
        "code": "=COUNTIF(Ventas!H2:H9,\"completed\")/COUNTA(Ventas!A2:A9)",
        "hint": "",
        "textOutput": "75% con formato porcentaje; no es conversión de visitantes a compra.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/conversion-y-funnel",
    "remember": "Define unidad y orden; no divides registros de poblaciones diferentes.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/conversion-y-funnel/1",
        "title": "Calcular avance de visita a compra",
        "language": "excel-formula",
        "code": "=LET(visitas,1000,compras,50,compras/visitas)",
        "hint": "",
        "textOutput": "5%.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/crecimiento-mom-qoq-yoy",
    "remember": "La base debe ser comparable y no cero.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/crecimiento-mom-qoq-yoy/1",
        "title": "Medir cambio mensual de ingresos",
        "language": "excel-formula",
        "code": "=900/1100-1",
        "hint": "",
        "textOutput": "-18.18% aproximadamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/segmentacion",
    "remember": "Evita límites solapados o sin categoría.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/segmentacion/1",
        "title": "Clasificar importe de pedido",
        "language": "excel-formula",
        "code": "=IFS(Ventas!J4>=500,\"Alto\",Ventas!J4>=200,\"Medio\",TRUE,\"Bajo\")",
        "hint": "",
        "textOutput": "Alto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/retencion-y-churn",
    "remember": "No incluyas nuevos clientes en la base inicial.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/retencion-y-churn/1",
        "title": "Calcular retención de compradores de agosto",
        "language": "excel-formula",
        "code": "=LET(agosto,UNIQUE(FILTER(Ventas!C2:C9,Ventas!H2:H9=\"completed\",Ventas!B2:B9>=DATE(2026,8,1),Ventas!B2:B9<DATE(2026,9,1))),septiembre,UNIQUE(FILTER(Ventas!C2:C9,Ventas!H2:H9=\"completed\",Ventas!B2:B9>=DATE(2026,9,1),Ventas!B2:B9<DATE(2026,10,1))),AVERAGE(MAP(agosto,LAMBDA(id,N(ISNUMBER(MATCH(id,septiembre,0)))))))",
        "hint": "",
        "textOutput": "100%: los compradores 1 y 2 de agosto vuelven en septiembre; churn de esta cohorte 0%.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/cohortes",
    "remember": "Cohorte por alta no equivale a cohorte por primera compra.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/cohortes/1",
        "title": "Encontrar mes de primera compra de Ana",
        "language": "excel-formula",
        "code": "=TEXT(MINIFS(Ventas!B2:B9,Ventas!C2:C9,1,Ventas!H2:H9,\"completed\"),\"yyyy-mm\")",
        "hint": "",
        "textOutput": "2026-08.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/pareto",
    "remember": "No presupongas que el 20% produce exactamente el 80%.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/pareto/1",
        "title": "Medir concentración por cliente",
        "language": "text",
        "code": "",
        "hint": "En Practica B1:B3 escribe ingresos por cliente ordenados 1000,600,400; en C1 escribe =SUM($B$1:B1)/SUM($B$1:$B$3) y copia hasta C3; aplica porcentaje. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "50%,80%,100%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/presupuesto-y-variaciones",
    "remember": "Aclara si una desviación positiva es favorable según métrica.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/presupuesto-y-variaciones/1",
        "title": "Comparar ingresos contra presupuesto",
        "language": "excel-formula",
        "code": "={(2000-2200),(2000-2200)/2200}",
        "hint": "",
        "textOutput": "-200 MXN y -9.09% aproximadamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/escenarios-y-punto-de-equilibrio",
    "remember": "Mantén supuestos en celdas independientes.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/escenarios-y-punto-de-equilibrio/1",
        "title": "Calcular unidades para cubrir costo fijo",
        "language": "excel-formula",
        "code": "=ROUNDUP(1000/(100-60),0)",
        "hint": "",
        "textOutput": "25 unidades.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/metricas-de-negocio/kpis-y-dashboards",
    "remember": "Mantén el mismo criterio temporal en todas las tarjetas.",
    "examples": [
      {
        "id": "google-sheets/metricas-de-negocio/kpis-y-dashboards/1",
        "title": "Construir tablero mínimo",
        "language": "text",
        "code": "",
        "hint": "Crea hoja Dashboard con A1:B4: indicador/valor, ingresos/2000, pedidos/6, ticket/333.33; sustituye números por SUMIF, COUNTIF y división de las celdas de ingresos y pedidos; añade gráfico mensual del ejemplo de líneas. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Tres KPIs dinámicos y tendencia agosto 1100, septiembre 900.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
