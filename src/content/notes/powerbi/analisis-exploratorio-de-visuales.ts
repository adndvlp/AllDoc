// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/definicion",
    "remember": "Valida patrones con datos suficientes y contexto.",
    "examples": [
      {
        "id": "powerbi/analisis-exploratorio-de-visuales/definicion/1",
        "title": "Añadir línea de referencia",
        "code": "",
        "steps": [
          "En gráfico de columnas de Ventas por AñoMes, filtra enero-febrero 2026.",
          "Agrega línea constante de 500 en Analytics o formato equivalente."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Enero 200 queda debajo y febrero 600 por encima.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/agrupacion-y-binning",
    "remember": "Los intervalos modifican el nivel de detalle.",
    "examples": [
      {
        "id": "powerbi/analisis-exploratorio-de-visuales/agrupacion-y-binning/1",
        "title": "Agrupar precios en intervalos",
        "code": "",
        "steps": [
          "En Pedidos[Precio] crea grupo tipo Bin, tamaño 50.",
          "Tabla con el campo agrupado y Pedidos total."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Para intervalos alineados desde 50: [50,100) 3, [100,150) 3, [150,200) 2; revisa límites mostrados por la aplicación.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/clustering",
    "remember": "Un cluster no es automáticamente un segmento comercial válido.",
    "examples": [
      {
        "id": "powerbi/analisis-exploratorio-de-visuales/clustering/1",
        "title": "Explorar clusters",
        "code": "",
        "steps": [
          "Usa dispersión por PedidoID con Precio y Cantidad.",
          "Si está disponible, activa búsqueda automática de clústeres y revisa agrupaciones."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se crea o propone una agrupación de puntos; con ocho registros no se espera una segmentación estable.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/forecast-y-anomalias",
    "remember": "Requieren series suficientes y visuales compatibles.",
    "note": "No uses los cuatro meses de actividad del dataset compartido para inferir tendencias confiables.",
    "examples": [
      {
        "id": "powerbi/analisis-exploratorio-de-visuales/forecast-y-anomalias/1",
        "title": "Preparar serie para pronóstico",
        "code": "",
        "steps": [
          "Crea tabla calculada `Serie = ADDCOLUMNS(GENERATESERIES(0,23,1), \"Mes\", EDATE(DATE(2024,1,1),[Value]), \"VentasSimuladas\", 100 + 5*[Value] + IF(MOD([Value],6)=0,20,0))`; crea línea temporal continua de Mes y VentasSimuladas.",
          "En Analytics prueba Forecast o Anomalies si están habilitados."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se muestra proyección con intervalo o marcas de anomalía según serie; los valores concretos dependen de configuración y algoritmo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/error-bars-y-analyze",
    "remember": "Declara cómo se obtienen límites; Analyze no prueba causalidad.",
    "examples": [
      {
        "id": "powerbi/analisis-exploratorio-de-visuales/error-bars-y-analyze/1",
        "title": "Mostrar rango presupuestario",
        "code": "",
        "steps": [
          "Crea medidas `Límite bajo = [Objetivo]*0.9` y `Límite alto = [Objetivo]*1.1`.",
          "En columnas de Ventas por mes, configura barras de error con esas medidas si el visual lo permite."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Febrero: límites 450 y 550; son tolerancias de meta, no intervalos estadísticos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/copilot-y-narrativa",
    "remember": "Verifica cada cifra contra medidas y filtros.",
    "note": "Requiere configuración y capacidad elegibles; no compartas datos sensibles sin autorización.",
    "examples": [
      {
        "id": "powerbi/analisis-exploratorio-de-visuales/copilot-y-narrativa/1",
        "title": "Solicitar resumen de ventas",
        "code": "",
        "steps": [
          "En entorno habilitado, solicita una narrativa que compare enero y febrero de 2026 usando Ventas.",
          "Contrasta cada afirmación con matriz mensual."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Hechos a validar: 200 a 600, aumento de 400; el texto generado no tiene resultado determinista.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/copilot-para-paginas-y-modelos",
    "remember": "Revisa el modelo y las medidas antes de aceptar sugerencias.",
    "note": "Requiere capacidad elegible y permisos; no hay un diseño predeterminado.",
    "examples": [
      {
        "id": "powerbi/analisis-exploratorio-de-visuales/copilot-para-paginas-y-modelos/1",
        "title": "Proponer una página ejecutiva",
        "code": "",
        "steps": [
          "En un entorno elegible abre Copilot y solicita una página con ventas completadas, pedidos y evolución mensual.",
          "Comprueba campos y filtros y corrige visuales si procede."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Propuesta de página o sugerencias disponibles; la validación debe reconciliar 1100 y 7 sin filtros.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
