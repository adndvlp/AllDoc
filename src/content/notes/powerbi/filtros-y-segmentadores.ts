// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/filtros-y-segmentadores/definicion",
    "remember": "Revisa el alcance de cada filtro.",
    "examples": [
      {
        "id": "powerbi/filtros-y-segmentadores/definicion/1",
        "title": "Filtrar por país",
        "code": "",
        "steps": [
          "Añade slicer Clientes[Pais] y tarjeta Ventas.",
          "Selecciona Espana."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Tarjeta 280.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/filtros-y-segmentadores/filtro-de-visual-pagina-e-informe",
    "remember": "El mismo campo puede aparecer en varios niveles.",
    "examples": [
      {
        "id": "powerbi/filtros-y-segmentadores/filtro-de-visual-pagina-e-informe/1",
        "title": "Limitar una sola tarjeta",
        "code": "",
        "steps": [
          "Crea dos tarjetas Ventas.",
          "En filtros de una tarjeta añade Categoria=Muebles."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Tarjeta filtrada 450; la otra 1100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/filtros-y-segmentadores/slicers-de-texto-fecha-y-rango",
    "remember": "Usa la dimensión Calendario para fechas.",
    "examples": [
      {
        "id": "powerbi/filtros-y-segmentadores/slicers-de-texto-fecha-y-rango/1",
        "title": "Seleccionar intervalo",
        "code": "",
        "steps": [
          "Añade segmentador Calendario[Date] tipo Entre.",
          "Elige 2026-01-01 a 2026-01-31."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ventas 200; pedidos total 3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/filtros-y-segmentadores/sincronizar-slicers",
    "remember": "Sincronizar y mostrar son opciones separadas.",
    "examples": [
      {
        "id": "powerbi/filtros-y-segmentadores/sincronizar-slicers/1",
        "title": "Compartir país entre páginas",
        "code": "",
        "steps": [
          "Duplica página Resumen.",
          "Vista > Sincronizar segmentadores, sincroniza Pais en ambas páginas.",
          "Selecciona Mexico."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ambas páginas muestran 820 en sus tarjetas Ventas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/filtros-y-segmentadores/interacciones-entre-visuales",
    "remember": "Comprueba interacción visual por visual.",
    "examples": [
      {
        "id": "powerbi/filtros-y-segmentadores/interacciones-entre-visuales/1",
        "title": "Mantener tarjeta global",
        "code": "",
        "steps": [
          "Crea barras por Categoria y tarjeta Ventas.",
          "Selecciona barras > Editar interacciones; desactiva efecto sobre tarjeta.",
          "Pulsa Muebles."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Tarjeta sigue en 1100; otras visualizaciones pueden filtrar según configuración.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/filtros-y-segmentadores/orden-y-top-n",
    "remember": "El orden del visual no es el orden de la tabla almacenada.",
    "examples": [
      {
        "id": "powerbi/filtros-y-segmentadores/orden-y-top-n/1",
        "title": "Ordenar meses y limitar clientes",
        "code": "",
        "steps": [
          "Ordena AñoMes cronológicamente por AñoMesN.",
          "En otro gráfico aplica Top N de 2 a Nombre por Ventas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Meses cronológicos; clientes Ana y Marta en el gráfico Top N.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
