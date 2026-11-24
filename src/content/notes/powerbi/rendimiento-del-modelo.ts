// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/definicion",
    "remember": "Mide el cuello de botella antes de cambiar el modelo.",
    "examples": [
      {
        "id": "powerbi/rendimiento-del-modelo/definicion/1",
        "title": "Medir visuales",
        "code": "",
        "steps": [
          "Desktop > Optimizar o Vista > Analizador de rendimiento.",
          "Inicia grabación y actualiza visuales.",
          "Expande tiempos del gráfico por categoría."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se desglosan tiempos de consulta DAX, representación y otros; valores dependen del equipo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/vertipaq-y-cardinalidad",
    "remember": "Reduce columnas y cardinalidad sin perder significado.",
    "examples": [
      {
        "id": "powerbi/rendimiento-del-modelo/vertipaq-y-cardinalidad/1",
        "title": "Reducir datos no utilizados",
        "code": "",
        "steps": [
          "En copia del modelo elimina una columna de texto de alta cardinalidad no usada, verificando dependencias.",
          "Compara tamaño guardado y memoria con herramienta compatible."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El tamaño puede reducirse; no se promete una reducción medible con ocho filas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/formula-engine-y-storage-engine",
    "remember": "No toda fórmula lenta se arregla con el mismo cambio.",
    "note": "DAX Studio es externo; requiere instalación y permiso de conexión.",
    "examples": [
      {
        "id": "powerbi/rendimiento-del-modelo/formula-engine-y-storage-engine/1",
        "title": "Examinar tiempos",
        "code": "",
        "steps": [
          "Conecta DAX Studio al PBIX abierto.",
          "Activa Server Timings y ejecuta `EVALUATE SUMMARIZECOLUMNS(Productos[Categoria], \"Ventas\", [Ventas])`."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dos resultados 650/450 y tiempos según caché/equipo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/dax-query-view-y-performance-analyzer",
    "remember": "Consulta DAX permite inspeccionar resultados sin modificar visuales.",
    "examples": [
      {
        "id": "powerbi/rendimiento-del-modelo/dax-query-view-y-performance-analyzer/1",
        "title": "Inspeccionar consulta de un visual",
        "code": "",
        "steps": [
          "Graba gráfico de categorías en Analizador de rendimiento.",
          "Copia consulta DAX del visual y ejecútala en Query View."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Devuelve datos usados por el visual, incluyendo ventas por categoría y posibles campos auxiliares.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/optimizacion-de-consultas-y-medidas",
    "remember": "Compara resultados y tiempos, no solo longitud de fórmula.",
    "examples": [
      {
        "id": "powerbi/rendimiento-del-modelo/optimizacion-de-consultas-y-medidas/1",
        "title": "Comparar dos medidas",
        "code": "",
        "steps": [
          "Crea `Ventas A = CALCULATE([Importe], Pedidos[Estado]=\"completed\")` y `Ventas B = CALCULATE([Importe], FILTER(ALL(Pedidos[Estado]), Pedidos[Estado]=\"completed\"))`.",
          "Compara sin filtros y por país; mide tiempos."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ambas dan 1100 global, 820 Mexico y 280 Espana; el tiempo no está predeterminado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/tablas-de-agregacion-y-modelos-compuestos",
    "remember": "Agregación y detalle deben conservar semántica compatible.",
    "note": "No es automático: requiere origen, columnas y mapeo compatibles. Inspecciona la consulta real.",
    "examples": [
      {
        "id": "powerbi/rendimiento-del-modelo/tablas-de-agregacion-y-modelos-compuestos/1",
        "title": "Diseñar agregado mensual",
        "code": "",
        "steps": [
          "En modelo de prueba DirectQuery crea tabla agregada Import por mes y categoría con suma de importe completado.",
          "Configura Administrar agregaciones y verifica consulta por mes/categoría."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Con configuración válida, el motor puede usar agregado; enero 2026 Tecnologia 200 y febrero Muebles 450.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/tablas-hibridas-y-particiones",
    "remember": "Equilibra actualidad y rendimiento con requisitos de capacidad.",
    "examples": [
      {
        "id": "powerbi/rendimiento-del-modelo/tablas-hibridas-y-particiones/1",
        "title": "Diseñar histórico y reciente",
        "code": "",
        "steps": [
          "En modelo compatible configura actualización incremental con opción de datos en tiempo real si disponible.",
          "Revisa particiones tras publicar y actualizar."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Histórico en Import y segmento reciente DirectQuery si se cumplen requisitos; el detalle depende de política.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/reducir-filas-y-granularidad",
    "remember": "Conserva el detalle cuando lo necesiten KPIs o drillthrough.",
    "examples": [
      {
        "id": "powerbi/rendimiento-del-modelo/reducir-filas-y-granularidad/1",
        "title": "Comparar detalle y resumen mensual",
        "code": "",
        "steps": [
          "En copia de Pedidos de Power Query, calcula ImporteLinea, filtra completed, agrega AñoMes y agrupa por mes sumando ImporteLinea.",
          "Compara número de filas y total con modelo de detalle."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cuatro filas mensuales: 100, 200, 200 y 600; total 1100. Se pierde detalle de clientes/pedidos si no se conserva en otra tabla.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
