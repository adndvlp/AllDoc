// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/aplicaciones-y-servicios-especializados/definicion",
    "remember": "No habilites servicios especializados solo porque forman parte del catálogo; evalúa requisitos y costos.",
    "examples": [
      {
        "id": "snowflake/aplicaciones-y-servicios-especializados/definicion/1",
        "title": "Elegir arquitectura para una aplicación",
        "code": "",
        "steps": [
          "Dashboard interno sencillo: Streamlit in Snowflake.",
          "Aplicación distribuida a cuentas consumidoras: Native Apps.",
          "Runtime con dependencias de sistema específicas: Snowpark Container Services."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Tres alternativas con distintos requisitos de empaquetado, permisos y operación.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/aplicaciones-y-servicios-especializados/native-apps",
    "remember": "El consumidor concede referencias o permisos necesarios; el paquete no debe asumir acceso a toda su cuenta.",
    "note": "Requiere configuración de Native Apps y entorno de distribución.",
    "examples": [
      {
        "id": "snowflake/aplicaciones-y-servicios-especializados/native-apps/1",
        "title": "Probar distribución de una app",
        "code": "",
        "steps": [
          "Crea un application package en cuenta de desarrollo.",
          "Define manifest, setup script y objetos de la aplicación.",
          "Instala una versión de prueba en una cuenta o entorno autorizado.",
          "Comprueba roles, permisos y actualización de versión."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Aplicación instalada con objetos y roles definidos; ninguna tabla del consumidor queda expuesta automáticamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/aplicaciones-y-servicios-especializados/snowpark-container-services",
    "remember": "Un compute pool no es un virtual warehouse; tiene su propio dimensionamiento y consumo.",
    "note": "Requiere permisos, imagen, configuración y región compatible.",
    "examples": [
      {
        "id": "snowflake/aplicaciones-y-servicios-especializados/snowpark-container-services/1",
        "title": "Probar un servicio de laboratorio",
        "code": "",
        "steps": [
          "Crea un image repository y publica una imagen de prueba autorizada.",
          "Configura compute pool y especificación del servicio con recursos mínimos.",
          "Ejecuta el servicio, revisa estado y logs.",
          "Suspende o elimina recursos al terminar."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Servicio en estado operativo o diagnóstico explícito de fallo; costo dependiente de recursos y duración.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/aplicaciones-y-servicios-especializados/ediciones-regiones-y-disponibilidad",
    "remember": "Comprueba requisitos vigentes y no supongas que una función disponible en otra cuenta también lo está en la tuya.",
    "examples": [
      {
        "id": "snowflake/aplicaciones-y-servicios-especializados/ediciones-regiones-y-disponibilidad/1",
        "title": "Evaluar una funcionalidad antes de adoptarla",
        "code": "",
        "steps": [
          "Consulta CURRENT_REGION() y la edición de la cuenta en su configuración autorizada.",
          "Compara los requisitos de la función en la documentación oficial.",
          "Verifica privilegios y costo en el laboratorio antes de usarla en producción."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Decisión explícita de disponibilidad y requisitos; sin asumir edición del usuario.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
