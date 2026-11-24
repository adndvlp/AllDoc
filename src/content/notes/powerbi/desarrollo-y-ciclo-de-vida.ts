// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/desarrollo-y-ciclo-de-vida/definicion",
    "remember": "Versiona definiciones y evita publicar cambios sin validación.",
    "examples": [
      {
        "id": "powerbi/desarrollo-y-ciclo-de-vida/definicion/1",
        "title": "Separar desarrollo y producción",
        "code": "",
        "steps": [
          "Crea espacios de prueba Dev y Test con acceso autorizado.",
          "Publica primero en Dev y verifica medidas con datos de prueba antes de desplegar."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El contenido de prueba se valida sin reemplazar directamente producción.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/desarrollo-y-ciclo-de-vida/pbip-y-git",
    "remember": "No subas credenciales ni datos privados al repositorio.",
    "note": "Revisa compatibilidad y limitaciones de PBIP de tu versión.",
    "examples": [
      {
        "id": "powerbi/desarrollo-y-ciclo-de-vida/pbip-y-git/1",
        "title": "Guardar proyecto",
        "code": "",
        "steps": [
          "En Desktop compatible guarda copia como Power BI Project (.pbip).",
          "Inspecciona carpetas de informe y modelo; añade al repositorio privado autorizado con exclusiones adecuadas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Archivos de definición versionables y un historial de cambios si haces commit.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/desarrollo-y-ciclo-de-vida/tmdl-xmla-y-tabular-editor",
    "remember": "Metadatos y datos son cosas distintas.",
    "note": "XMLA remoto y herramientas externas requieren capacidad, permisos y configuración compatibles.",
    "examples": [
      {
        "id": "powerbi/desarrollo-y-ciclo-de-vida/tmdl-xmla-y-tabular-editor/1",
        "title": "Inspeccionar definición de medida",
        "code": "",
        "steps": [
          "En Desktop compatible abre vista TMDL y arrastra tabla Pedidos o medida Ventas para generar definición.",
          "Inspecciona expresión sin aplicar cambios."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La definición muestra fórmula y propiedades de la medida; no cambia el resultado 1100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/desarrollo-y-ciclo-de-vida/deployment-pipelines",
    "remember": "Valida conexiones y medidas en cada etapa.",
    "examples": [
      {
        "id": "powerbi/desarrollo-y-ciclo-de-vida/deployment-pipelines/1",
        "title": "Desplegar a entorno de prueba",
        "code": "",
        "steps": [
          "En Fabric/Service compatible crea pipeline, asigna Dev y Test.",
          "Compara elementos y despliega solo informe/modelo de prueba.",
          "Revisa credenciales y reglas de origen."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Artefactos disponibles en Test tras despliegue exitoso; revisa que el modelo apunte a datos de prueba.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/desarrollo-y-ciclo-de-vida/rest-api-y-embedded",
    "remember": "Token, identidad y permisos deben corresponder al escenario.",
    "note": "Embedded requiere diseño de identidad, capacidad y licencias según escenario; no uses Publish to web para reemplazar autenticación.",
    "examples": [
      {
        "id": "powerbi/desarrollo-y-ciclo-de-vida/rest-api-y-embedded/1",
        "title": "Consultar workspaces autorizados",
        "code": "",
        "steps": [
          "En entorno de desarrollo autorizado obtiene token de Microsoft Entra con permisos necesarios.",
          "Realiza GET `https://api.powerbi.com/v1.0/myorg/groups` con Authorization Bearer del token.",
          "No publiques el token."
        ],
        "external": true,
        "hint": "",
        "textOutput": "JSON con `value` que lista workspaces accesibles o error de autorización si faltan permisos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
