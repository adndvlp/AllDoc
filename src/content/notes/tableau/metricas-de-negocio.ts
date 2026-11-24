// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/metricas-de-negocio/definicion",
    "remember": "El mismo nombre puede significar cosas distintas según el alcance.",
    "examples": [
      {
        "id": "tableau/metricas-de-negocio/definicion/1",
        "title": "Ventas completadas",
        "code": "",
        "external": true,
        "hint": "Fórmula agregada SUM(IF [Estado]='Completado' THEN [Ventas] ELSE 0 END).",
        "textOutput": "1700.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/metricas-de-negocio/beneficio-y-margen",
    "remember": "Usa ratio de sumas para margen global ponderado.",
    "examples": [
      {
        "id": "tableau/metricas-de-negocio/beneficio-y-margen/1",
        "title": "Calcular margen",
        "code": "",
        "steps": [
          "Crea Beneficio y Margen según Datos compartidos",
          "ambos en Text con Measure Values."
        ],
        "external": true,
        "hint": "",
        "textOutput": "640 de beneficio y 36.57% de margen.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/metricas-de-negocio/ticket-y-compradores",
    "remember": "No uses AVG(Ventas) si la tabla tiene líneas de pedido.",
    "examples": [
      {
        "id": "tableau/metricas-de-negocio/ticket-y-compradores/1",
        "title": "Calcular ticket completado",
        "code": "",
        "steps": [
          "Filtra Estado Completado",
          "crea SUM([Ventas])/COUNTD([Pedido]) y COUNTD([ClienteID])."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ticket 283.33; cuatro compradores.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/metricas-de-negocio/tasa-de-cancelacion",
    "remember": "Numerador y denominador deben usar la misma entidad.",
    "examples": [
      {
        "id": "tableau/metricas-de-negocio/tasa-de-cancelacion/1",
        "title": "Medir cancelaciones",
        "code": "",
        "steps": [
          "Fórmula agregada COUNTD(IF [Estado]='Cancelado' THEN [Pedido] END)/COUNTD([Pedido])",
          "formato Percentage."
        ],
        "external": true,
        "hint": "",
        "textOutput": "14.29% (1 de 7).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/metricas-de-negocio/mom-yoy-y-acumulados",
    "remember": "No calcules YoY con el mes anterior.",
    "examples": [
      {
        "id": "tableau/metricas-de-negocio/mom-yoy-y-acumulados/1",
        "title": "Crecimiento MoM",
        "code": "",
        "steps": [
          "Vista mensual ascendente",
          "SUM([Ventas])/LOOKUP(SUM([Ventas]),-1)-1 con Table (Down)",
          "formato Percentage."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Febrero -58.33%; marzo 260%; enero NULL. El dataset no tiene año previo para YoY.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/metricas-de-negocio/periodos-a-la-fecha",
    "remember": "Usa fecha de corte explícita para reproducir.",
    "examples": [
      {
        "id": "tableau/metricas-de-negocio/periodos-a-la-fecha/1",
        "title": "Calcular MTD al 10 de marzo",
        "code": "",
        "external": true,
        "hint": "Fórmula agregada SUM(IF [Fecha]>=DATETRUNC('month',#2025-03-10#) AND [Fecha]<=#2025-03-10# THEN [Ventas] ELSE 0 END).",
        "textOutput": "800.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/metricas-de-negocio/metas-y-variacion",
    "remember": "Compara metas y ventas a la misma granularidad.",
    "note": "El nombre de fuente debe coincidir; usa referencias que ofrece el editor.",
    "examples": [
      {
        "id": "tableau/metricas-de-negocio/metas-y-variacion/1",
        "title": "Comparar por región",
        "code": "",
        "steps": [
          "Usa blending por Region según ficha Data blending",
          "crea SUM([Ventas])/SUM([metas].[Meta]) con referencia secundaria insertada desde el editor."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Norte 100%; Sur 95.45%.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/metricas-de-negocio/cohortes",
    "remember": "Define si el evento exige pedido completado.",
    "examples": [
      {
        "id": "tableau/metricas-de-negocio/cohortes/1",
        "title": "Cohorte primera compra",
        "code": "",
        "steps": [
          "Crea { FIXED [ClienteID] : MIN(IF [Estado]='Completado' THEN [Fecha] END) }",
          "trunca resultado a mes y cuenta compradores por cohorte."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Enero: C01 y C02; marzo: C03 y C04.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/metricas-de-negocio/retencion",
    "remember": "El denominador es el tamaño inicial de la cohorte, no los compradores del periodo posterior.",
    "examples": [
      {
        "id": "tableau/metricas-de-negocio/retencion/1",
        "title": "Retención de enero en febrero",
        "code": "",
        "steps": [
          "Filtra completados",
          "usa cohorte de primera compra y Mes venta para una tabla COUNTD(ClienteID). Para cohorte enero compara febrero con enero."
        ],
        "external": true,
        "hint": "",
        "textOutput": "1 de 2 clientes vuelve en febrero: 50%.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/metricas-de-negocio/conversion-y-funnels",
    "remember": "La conversión de pedidos no es conversión de visitas.",
    "examples": [
      {
        "id": "tableau/metricas-de-negocio/conversion-y-funnels/1",
        "title": "Medir finalización de pedidos",
        "code": "",
        "external": true,
        "hint": "Usa COUNTD([Pedido]) como pedidos registrados y COUNTD(IF [Estado]='Completado' THEN [Pedido] END) como completados.",
        "textOutput": "7 registrados, 6 completados, tasa 85.71%; no hay datos de visitas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
