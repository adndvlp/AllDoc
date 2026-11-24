// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/metricas-de-negocio/definicion",
    "remember": "Define numerador, denominador y filtros antes de calcular.",
    "examples": [
      {
        "id": "excel/metricas-de-negocio/definicion/1",
        "title": "Ingresos reconocidos",
        "language": "excel",
        "code": "=SUMIFS(tSales[amount],tSales[status],\"completed\")",
        "hint": "Define numerador, denominador y filtros antes de calcular.",
        "textOutput": "1200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/metricas-de-negocio/volumen-y-ticket-promedio",
    "remember": "El denominador es el número de pedidos, no de líneas si existen varios productos por pedido.",
    "examples": [
      {
        "id": "excel/metricas-de-negocio/volumen-y-ticket-promedio/1",
        "title": "Ticket completado",
        "language": "excel",
        "code": "=SUMIF(tSales[status],\"completed\",tSales[amount])/COUNTIF(tSales[status],\"completed\")",
        "hint": "El denominador es el número de pedidos, no de líneas si existen varios productos por pedido.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/metricas-de-negocio/porcentaje-y-ratio",
    "remember": "No multipliques por 100 si vas a aplicar formato Porcentaje.",
    "examples": [
      {
        "id": "excel/metricas-de-negocio/porcentaje-y-ratio/1",
        "title": "Tasa de cancelación",
        "language": "excel",
        "code": "=COUNTIF(tSales[status],\"cancelled\")/COUNT(tSales[order_id])",
        "hint": "No multipliques por 100 si vas a aplicar formato Porcentaje.",
        "textOutput": "12.5% con formato Porcentaje.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/metricas-de-negocio/crecimiento-y-variacion",
    "remember": "Si la base es cero, la tasa no está definida.",
    "examples": [
      {
        "id": "excel/metricas-de-negocio/crecimiento-y-variacion/1",
        "title": "Crecimiento febrero",
        "language": "excel",
        "code": "=Targets!C3-Targets!C2\n=Targets!C3/Targets!C2-1",
        "hint": "Si la base es cero, la tasa no está definida.",
        "textOutput": "200 y 40%.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/metricas-de-negocio/cumplimiento-de-meta",
    "remember": "Aclara si un valor alto o bajo es deseable.",
    "examples": [
      {
        "id": "excel/metricas-de-negocio/cumplimiento-de-meta/1",
        "title": "Cumplimiento febrero",
        "language": "excel",
        "code": "=Targets!C3/Targets!B3\n=Targets!C3-Targets!B3",
        "hint": "Aclara si un valor alto o bajo es deseable.",
        "textOutput": "107.69% redondeado en pantalla; +50.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/metricas-de-negocio/clientes-unicos",
    "remember": "Excluye identificadores vacíos cuando sea necesario.",
    "note": "Requiere funciones dinámicas; si no hay coincidencias esta fórmula necesita tratamiento explícito del caso vacío.",
    "examples": [
      {
        "id": "excel/metricas-de-negocio/clientes-unicos/1",
        "title": "Clientes con pedidos completados",
        "language": "excel",
        "code": "=ROWS(UNIQUE(FILTER(tSales[customer_id],tSales[status]=\"completed\")))",
        "hint": "Excluye identificadores vacíos cuando sea necesario.",
        "textOutput": "3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/metricas-de-negocio/media-ponderada",
    "remember": "No promedies promedios sin sus ponderaciones.",
    "examples": [
      {
        "id": "excel/metricas-de-negocio/media-ponderada/1",
        "title": "Precio por unidad de todos los pedidos",
        "language": "excel",
        "code": "=SUMPRODUCT(tSales[quantity],tSales[unit_price])/SUM(tSales[quantity])",
        "hint": "No promedies promedios sin sus ponderaciones.",
        "textOutput": "123.5294 aproximadamente (2100/17).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/metricas-de-negocio/acumulado-y-comparacion-con-anterior",
    "remember": "Ordena y fija el inicio del rango antes de copiar.",
    "examples": [
      {
        "id": "excel/metricas-de-negocio/acumulado-y-comparacion-con-anterior/1",
        "title": "Acumular venta por mes",
        "language": "text",
        "code": "",
        "hint": "En Targets escribe =SUM($C$2:C2) en D2 y copia a D3; en E3 escribe =C3-C2. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "D2=500, D3=1200, E3=200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/metricas-de-negocio/conversion-y-retencion",
    "remember": "Usa la misma población y una definición de actividad consistente.",
    "examples": [
      {
        "id": "excel/metricas-de-negocio/conversion-y-retencion/1",
        "title": "Retención de enero a febrero",
        "language": "text",
        "code": "",
        "hint": "En Scratch A2:A3 registra C1,C2 (clientes con pedidos completados en enero); B2:B4 registra C3,C2,C1 (febrero); en C2 usa =COUNTIF($B$2:$B$4,A2)>0 y copia a C3; en D2 usa =COUNTIF(C2:C3,TRUE)/COUNTA(A2:A3). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "2 de 2 clientes de enero repiten: 100%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/metricas-de-negocio/margen-y-rentabilidad",
    "remember": "No uses precio de catálogo como coste sin confirmarlo.",
    "note": "Ejemplo con costes hipotéticos, no incluidos en Sales.",
    "examples": [
      {
        "id": "excel/metricas-de-negocio/margen-y-rentabilidad/1",
        "title": "Calcular margen",
        "language": "excel",
        "code": "=LET(ingreso,500,coste,350,(ingreso-coste)/ingreso)",
        "hint": "No uses precio de catálogo como coste sin confirmarlo.",
        "textOutput": "30%.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
