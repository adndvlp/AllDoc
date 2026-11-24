// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/organizacion-y-parametros-de-consultas/definicion",
    "remember": "Separa staging de las tablas del modelo.",
    "examples": [
      {
        "id": "powerbi/organizacion-y-parametros-de-consultas/definicion/1",
        "title": "Crear una consulta de staging",
        "code": "",
        "steps": [
          "Duplica Sucios como StagingSucios.",
          "Desactiva Habilitar carga para esa copia."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La consulta permanece en el editor, sin una tabla adicional en el modelo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/organizacion-y-parametros-de-consultas/reference-y-duplicate",
    "remember": "Cambios en la consulta base afectan referencias, no copias independientes de sus pasos.",
    "examples": [
      {
        "id": "powerbi/organizacion-y-parametros-de-consultas/reference-y-duplicate/1",
        "title": "Comparar dependencia",
        "code": "",
        "steps": [
          "Crea referencia R y duplicado D de Sucios.",
          "En Sucios filtra Id=1.",
          "Inspecciona R y D antes de deshacer el cambio."
        ],
        "external": true,
        "hint": "",
        "textOutput": "R tiene una fila; D mantiene cinco.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/organizacion-y-parametros-de-consultas/parametros",
    "remember": "Centraliza rutas, fechas o límites reutilizados.",
    "examples": [
      {
        "id": "powerbi/organizacion-y-parametros-de-consultas/parametros/1",
        "title": "Filtrar por importe",
        "code": "",
        "steps": [
          "Crea parámetro decimal MinPrecio=100.",
          "En referencia de Pedidos crea una consulta en blanco y usa `Table.SelectRows(Pedidos, each [Precio] >= MinPrecio)` en Editor avanzado."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cinco pedidos: 1, 2, 6, 7, 8.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/organizacion-y-parametros-de-consultas/habilitar-carga-y-dependencias",
    "remember": "Una consulta sin carga puede seguir siendo necesaria.",
    "examples": [
      {
        "id": "powerbi/organizacion-y-parametros-de-consultas/habilitar-carga-y-dependencias/1",
        "title": "Conservar staging",
        "code": "",
        "steps": [
          "Crea R como referencia de Sucios y desactiva carga de Sucios.",
          "Abre Vista > Dependencias de consulta."
        ],
        "external": true,
        "hint": "",
        "textOutput": "R sigue dependiendo de Sucios.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/organizacion-y-parametros-de-consultas/query-folding",
    "remember": "No todo paso ni origen permite folding.",
    "note": "Requiere origen compatible; CSV no ejecuta SQL remoto.",
    "examples": [
      {
        "id": "powerbi/organizacion-y-parametros-de-consultas/query-folding/1",
        "title": "Comprobar filtro SQL",
        "code": "",
        "steps": [
          "Conecta una tabla de prueba a SQL Server.",
          "Aplica filtro Estado=completed.",
          "Revisa Ver consulta nativa si está disponible en el paso."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Puede aparecer una consulta SQL con filtro; un menú deshabilitado no demuestra por sí solo ausencia de folding.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/organizacion-y-parametros-de-consultas/query-diagnostics",
    "remember": "Mide antes de optimizar.",
    "examples": [
      {
        "id": "powerbi/organizacion-y-parametros-de-consultas/query-diagnostics/1",
        "title": "Medir transformación",
        "code": "",
        "steps": [
          "En Editor de Power Query abre Herramientas > Iniciar diagnóstico.",
          "Actualiza vista previa de una consulta.",
          "Detén diagnóstico."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Consultas de diagnóstico con eventos y duraciones, dependientes del entorno.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
