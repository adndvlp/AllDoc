// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/definicion",
    "remember": "Publicar no equivale a dar acceso a todos.",
    "note": "Requiere cuenta organizacional y permisos/licencia apropiados.",
    "examples": [
      {
        "id": "powerbi/power-bi-service-y-publicacion/definicion/1",
        "title": "Publicar informe de prueba",
        "code": "",
        "steps": [
          "Inicia sesión en Desktop.",
          "Inicio > Publicar y elige un workspace de prueba donde tengas permiso.",
          "Abre informe en Service."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se crean o actualizan informe y modelo semántico, según conexión y artefactos existentes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/workspaces-y-roles",
    "remember": "Asigna mínimo privilegio.",
    "examples": [
      {
        "id": "powerbi/power-bi-service-y-publicacion/workspaces-y-roles/1",
        "title": "Separar autores y lectores",
        "code": "",
        "steps": [
          "En workspace de prueba abre Administrar acceso.",
          "Asigna a un usuario autorizado rol Viewer y a un autor Contributor.",
          "Revisa acceso como cada perfil."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Viewer puede consumir contenido permitido; Contributor puede editar contenido del workspace dentro de sus permisos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/reportes-y-dashboards",
    "remember": "Dashboard no es sinónimo de cualquier página visual.",
    "examples": [
      {
        "id": "powerbi/power-bi-service-y-publicacion/reportes-y-dashboards/1",
        "title": "Anclar una tarjeta",
        "code": "",
        "steps": [
          "Abre informe publicado en Service; ancla visual de Ventas a un dashboard nuevo, si admite anclaje."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dashboard con mosaico de Ventas; al abrirlo se navega al contenido según configuración.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/apps-y-audiencias",
    "remember": "Una app organiza consumo, no concede automáticamente todos los permisos del workspace.",
    "examples": [
      {
        "id": "powerbi/power-bi-service-y-publicacion/apps-y-audiencias/1",
        "title": "Publicar app de prueba",
        "code": "",
        "steps": [
          "En workspace autorizado crea o actualiza app, incluye Resumen y configura audiencia de prueba.",
          "Abre app como lector autorizado."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El lector ve el contenido asignado a su audiencia.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/compartir-y-permisos-build",
    "remember": "Leer informe no implica permiso para construir informes nuevos.",
    "examples": [
      {
        "id": "powerbi/power-bi-service-y-publicacion/compartir-y-permisos-build/1",
        "title": "Revisar acceso al modelo",
        "code": "",
        "steps": [
          "En Service abre Administrar permisos del modelo publicado.",
          "Comprueba que un lector de prueba tenga solo acceso necesario y concede Build solo si se autoriza autoservicio."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Los permisos muestran quién puede consumir o construir contenido, según configuración.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/licencias-y-capacidades",
    "remember": "Verifica licencia del autor, lector y capacidad del workspace.",
    "note": "No asumas que cualquier capacidad Fabric permite lectores gratuitos; consulta la documentación oficial de SKU y licencias.",
    "examples": [
      {
        "id": "powerbi/power-bi-service-y-publicacion/licencias-y-capacidades/1",
        "title": "Determinar distribución",
        "code": "",
        "steps": [
          "En Service inspecciona licencia del usuario y tipo de capacidad del workspace.",
          "Contrasta con tabla oficial de licencias antes de compartir."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Puedes determinar si el lector necesita Pro/PPU o si la capacidad permite consumo sin Pro, conforme a condiciones vigentes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/suscripciones-y-alertas",
    "remember": "No son lo mismo que actualizar el modelo.",
    "examples": [
      {
        "id": "powerbi/power-bi-service-y-publicacion/suscripciones-y-alertas/1",
        "title": "Configurar aviso de prueba",
        "code": "",
        "steps": [
          "En informe publicado usa Suscribirse si está habilitado; programa envío de prueba a tu propia cuenta.",
          "Para alertas, revisa mosaicos compatibles o alertas de Fabric según entorno."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Queda configurada una suscripción y, si está disponible, una regla de alerta; entrega depende de permisos y configuración.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/exportar-y-compartir-fuera-del-informe",
    "remember": "Nunca uses Publish to web para información privada.",
    "examples": [
      {
        "id": "powerbi/power-bi-service-y-publicacion/exportar-y-compartir-fuera-del-informe/1",
        "title": "Exportar detalle autorizado",
        "code": "",
        "steps": [
          "En un visual de prueba abre Más opciones > Exportar datos.",
          "Selecciona datos resumidos si está disponible y revisa archivo."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El archivo refleja datos permitidos y filtros aplicados; no necesariamente incluye cada fila del modelo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/endorsement-y-metricas-de-uso",
    "remember": "Certificar requiere autoridad y proceso de calidad.",
    "examples": [
      {
        "id": "powerbi/power-bi-service-y-publicacion/endorsement-y-metricas-de-uso/1",
        "title": "Revisar adopción",
        "code": "",
        "steps": [
          "Abre métricas de uso de un informe publicado con permisos adecuados.",
          "Inspecciona vistas y usuarios según periodo disponible."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Aparecen métricas registradas si el servicio las tiene; no se supone un número de visitas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
