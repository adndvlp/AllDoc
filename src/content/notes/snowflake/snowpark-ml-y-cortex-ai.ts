// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/snowpark-ml-y-cortex-ai/definicion",
    "remember": "ML predictivo, generación de texto y recuperación de documentos resuelven tareas distintas.",
    "examples": [
      {
        "id": "snowflake/snowpark-ml-y-cortex-ai/definicion/1",
        "title": "Seleccionar enfoque por objetivo",
        "code": "",
        "steps": [
          "Predecir demanda a partir de históricos: evalúa Snowpark ML.",
          "Resumir comentarios de clientes: evalúa funciones Cortex AI.",
          "Consultar métricas en lenguaje natural: evalúa Cortex Analyst."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Una elección de servicio acorde al problema, sin ejecutar modelos ni generar costos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/snowpark-ml-y-cortex-ai/snowpark-ml-feature-store-y-model-registry",
    "remember": "Separa entrenamiento y evaluación, evita fuga de información y registra versiones de datos/modelo.",
    "note": "Requiere paquete snowflake-ml-python, datos adecuados y recursos/permisos.",
    "examples": [
      {
        "id": "snowflake/snowpark-ml-y-cortex-ai/snowpark-ml-feature-store-y-model-registry/1",
        "title": "Planificar predicción de demanda",
        "code": "",
        "steps": [
          "Prepara históricos de ventas suficientemente amplios, con corte temporal.",
          "Crea features de ventas pasadas sin usar información futura.",
          "Entrena y evalúa con un estimador compatible de snowflake-ml-python.",
          "Registra modelo y métricas; comprueba inferencia sobre un lote de prueba."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Versión del modelo y predicciones evaluables; el pequeño dataset compartido no alcanza para entrenar un modelo útil.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/snowpark-ml-y-cortex-ai/cortex-ai-functions",
    "remember": "Las salidas generativas no son deterministas y pueden ser incorrectas; mide calidad y consumo.",
    "note": "Requiere función disponible, acceso a Cortex y consumo autorizado; no envíes datos sensibles sin aprobación.",
    "examples": [
      {
        "id": "snowflake/snowpark-ml-y-cortex-ai/cortex-ai-functions/1",
        "title": "Clasificar un comentario sintético",
        "language": "sql",
        "code": "SELECT AI_CLASSIFY('El pedido llegó tarde', ARRAY_CONSTRUCT('Entrega','Pago','Producto')) AS LABEL;",
        "hint": "",
        "textOutput": "Objeto de clasificación que se espera asigne Entrega; la respuesta exacta depende del modelo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/snowpark-ml-y-cortex-ai/cortex-analyst",
    "remember": "Valida SQL y métricas; no confíes en una respuesta solo por estar redactada con seguridad.",
    "note": "Requiere Cortex Analyst y modelo/vista semántica configurados.",
    "examples": [
      {
        "id": "snowflake/snowpark-ml-y-cortex-ai/cortex-analyst/1",
        "title": "Consultar ventas de febrero",
        "code": "",
        "steps": [
          "Configura una semantic view de ventas validada.",
          "En la interfaz de pruebas de Analyst pregunta «¿Cuánto vendimos en febrero de 2026 en pedidos completados?».",
          "Inspecciona y ejecuta el SQL generado si es autorizado.",
          "Compara con la consulta mensual de Fechas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El resultado correcto es 600; cualquier resultado distinto requiere investigar la definición o SQL generado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/snowpark-ml-y-cortex-ai/cortex-search",
    "remember": "Una búsqueda recupera documentos; no verifica por sí sola que sus afirmaciones sean correctas.",
    "note": "Requiere servicio disponible y costos de indexación/consulta autorizados.",
    "examples": [
      {
        "id": "snowflake/snowpark-ml-y-cortex-ai/cortex-search/1",
        "title": "Buscar políticas de devolución",
        "code": "",
        "steps": [
          "Prepara una tabla sintética con ID, texto y categoría, incluyendo una política que permite devolución durante 30 días.",
          "Crea un servicio Cortex Search sobre el texto con warehouse y frescura autorizados.",
          "Busca «plazo de devolución» y revisa documentos recuperados."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La política de 30 días debería estar entre los resultados relevantes; el ranking puede variar.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
