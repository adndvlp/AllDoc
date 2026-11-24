// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/fechas-y-tiempos/definicion",
    "remember": "Convierte el texto en fecha antes de aplicar funciones temporales.",
    "examples": [
      {
        "id": "power-query/fechas-y-tiempos/definicion/1",
        "title": "Obtener el mes de un pedido",
        "language": "powerquery",
        "code": "Date.Month(#date(2026,2,3))",
        "hint": "Date.Month devuelve el número del mes.",
        "textOutput": "2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/fechas-y-tiempos/ano-mes-trimestre-y-dia",
    "remember": "El mes por sí solo mezcla años distintos.",
    "examples": [
      {
        "id": "power-query/fechas-y-tiempos/ano-mes-trimestre-y-dia/1",
        "title": "Extraer componentes",
        "language": "powerquery",
        "code": "let F = #date(2026,2,3) in [anio=Date.Year(F), mes=Date.Month(F), trimestre=Date.QuarterOfYear(F), dia=Date.Day(F)]",
        "hint": "Se conservan los cuatro componentes en un registro.",
        "textOutput": "[anio=2026, mes=2, trimestre=1, dia=3].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/fechas-y-tiempos/inicio-y-fin-de-periodo",
    "remember": "Usar el inicio del mes como clave conserva año y mes juntos.",
    "examples": [
      {
        "id": "power-query/fechas-y-tiempos/inicio-y-fin-de-periodo/1",
        "title": "Crear periodo mensual",
        "language": "powerquery",
        "code": "Table.AddColumn(Pedidos, \"mes\", each Date.StartOfMonth([fecha]), type date)",
        "hint": "Cada fecha se convierte en el primer día de su mes.",
        "textOutput": "Ids 101–103: 2026-01-01; 104–107: 2026-02-01.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/fechas-y-tiempos/sumar-dias-y-meses",
    "remember": "Un mes no siempre contiene treinta días.",
    "examples": [
      {
        "id": "power-query/fechas-y-tiempos/sumar-dias-y-meses/1",
        "title": "Calcular vencimiento a 30 días",
        "language": "powerquery",
        "code": "Date.AddDays(#date(2026,1,5),30)",
        "hint": "Desplaza la fecha original treinta días.",
        "textOutput": "2026-02-04.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/fechas-y-tiempos/diferencia-de-fechas",
    "remember": "Resta fin menos inicio; TotalDays conserva fracciones.",
    "examples": [
      {
        "id": "power-query/fechas-y-tiempos/diferencia-de-fechas/1",
        "title": "Calcular días entre pedido y alta",
        "language": "powerquery",
        "code": "Duration.Days(#date(2026,1,5) - #date(2025,12,20))",
        "hint": "Se resta la fecha anterior a la posterior.",
        "textOutput": "16 días.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/fechas-y-tiempos/formatear-fechas",
    "remember": "Formatear no equivale a conservar una fecha como tipo date.",
    "examples": [
      {
        "id": "power-query/fechas-y-tiempos/formatear-fechas/1",
        "title": "Crear etiqueta año-mes",
        "language": "powerquery",
        "code": "Date.ToText(#date(2026,2,3), [Format=\"yyyy-MM\", Culture=\"es-MX\"])",
        "hint": "El resultado es texto, adecuado para una etiqueta.",
        "textOutput": "\"2026-02\".",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/fechas-y-tiempos/fecha-actual-y-zona-horaria",
    "remember": "En servicios en línea la hora local puede ser UTC; define la zona requerida.",
    "note": "Para pruebas reproducibles utiliza una fecha literal o parámetro.",
    "examples": [
      {
        "id": "power-query/fechas-y-tiempos/fecha-actual-y-zona-horaria/1",
        "title": "Crear una fecha de referencia UTC",
        "language": "powerquery",
        "code": "Date.From(DateTimeZone.FixedUtcNow())",
        "hint": "Devuelve la fecha UTC del instante, no una fecha fija del dataset.",
        "textOutput": "Fecha UTC del momento de evaluación.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/fechas-y-tiempos/calendario",
    "remember": "Usa un intervalo continuo con límites claros.",
    "examples": [
      {
        "id": "power-query/fechas-y-tiempos/calendario/1",
        "title": "Generar siete días consecutivos",
        "language": "powerquery",
        "code": "Table.FromList(List.Dates(#date(2026,1,1), 7, #duration(1,0,0,0)), Splitter.SplitByNothing(), {\"fecha\"})",
        "hint": "List.Dates empieza el día indicado y suma una duración diaria.",
        "textOutput": "7 filas del 1 al 7 de enero de 2026.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
