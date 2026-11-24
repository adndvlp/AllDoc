// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/virtual-warehouses/definicion",
    "remember": "Suspenderlo no borra las tablas.",
    "examples": [
      {
        "id": "snowflake/virtual-warehouses/definicion/1",
        "title": "Consultar warehouses disponibles",
        "language": "sql",
        "code": "SHOW WAREHOUSES LIKE 'ALLDOC_WH';",
        "hint": "",
        "textOutput": "Una fila con tamaño, estado y parámetros del warehouse si tienes permisos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/virtual-warehouses/sizing-y-scale-up",
    "remember": "Un tamaño mayor no garantiza aceleración proporcional.",
    "note": "Requiere MODIFY y puede aumentar créditos mientras está activo.",
    "examples": [
      {
        "id": "snowflake/virtual-warehouses/sizing-y-scale-up/1",
        "title": "Cambiar tamaño en laboratorio",
        "language": "sql",
        "code": "ALTER WAREHOUSE ALLDOC_WH SET WAREHOUSE_SIZE='SMALL';\nALTER WAREHOUSE ALLDOC_WH SET WAREHOUSE_SIZE='XSMALL';",
        "hint": "",
        "textOutput": "El tamaño cambia a SMALL y vuelve a XSMALL.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/virtual-warehouses/auto-suspend-y-auto-resume",
    "remember": "Suspender frecuentemente reduce inactividad pero pierde caché local.",
    "examples": [
      {
        "id": "snowflake/virtual-warehouses/auto-suspend-y-auto-resume/1",
        "title": "Configurar inactividad",
        "language": "sql",
        "code": "ALTER WAREHOUSE ALLDOC_WH SET AUTO_SUSPEND=60 AUTO_RESUME=TRUE;",
        "hint": "",
        "textOutput": "Se solicita suspensión tras 60 segundos de inactividad y reanudación ante trabajo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/virtual-warehouses/scale-out-y-multi-cluster",
    "remember": "Scale up mejora capacidad por clúster; scale out atiende concurrencia.",
    "note": "Multi-cluster requiere edición compatible y puede consumir más créditos.",
    "examples": [
      {
        "id": "snowflake/virtual-warehouses/scale-out-y-multi-cluster/1",
        "title": "Planificar carga concurrente",
        "code": "",
        "steps": [
          "En un warehouse de prueba con edición compatible, fija MIN_CLUSTER_COUNT=1 y MAX_CLUSTER_COUNT=2.",
          "Revisa el historial de carga en horas de concurrencia.",
          "Devuelve el máximo a 1."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se habilita capacidad adicional si la política de escalamiento lo requiere.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/virtual-warehouses/suspender-y-reanudar",
    "remember": "Suspender es distinto de DROP.",
    "note": "No hacerlo sobre un warehouse compartido en uso.",
    "examples": [
      {
        "id": "snowflake/virtual-warehouses/suspender-y-reanudar/1",
        "title": "Detener cómputo tras una prueba",
        "language": "sql",
        "code": "ALTER WAREHOUSE ALLDOC_WH SUSPEND;\nSHOW WAREHOUSES LIKE 'ALLDOC_WH';",
        "hint": "",
        "textOutput": "Estado suspendido tras terminar operaciones activas; una consulta posterior puede reanudarlo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
