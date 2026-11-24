// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/seguridad-y-gobernanza/definicion",
    "remember": "Ocultar columnas u hojas no es seguridad.",
    "examples": [
      {
        "id": "tableau/seguridad-y-gobernanza/definicion/1",
        "title": "Revisar acceso",
        "code": "",
        "external": true,
        "hint": "En un proyecto de prueba revisa Permissions de un workbook.",
        "textOutput": "Se muestran capacidades permitidas o denegadas por usuario/grupo según reglas efectivas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/seguridad-y-gobernanza/roles-y-permisos",
    "remember": "Un permiso no supera las capacidades del rol y licencia.",
    "examples": [
      {
        "id": "tableau/seguridad-y-gobernanza/roles-y-permisos/1",
        "title": "Validar acceso",
        "code": "",
        "external": true,
        "hint": "Con un administrador configura grupo de lectura para un proyecto de prueba y verifica con una cuenta de prueba.",
        "textOutput": "La cuenta ve el contenido permitido sin poder editarlo si las capacidades efectivas lo impiden.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/seguridad-y-gobernanza/row-level-security",
    "remember": "No basta con ocultar un selector o un dashboard.",
    "note": "Asegura también acceso a fuentes, descargas y edición; no trates un filtro de hoja aislado como protección suficiente.",
    "examples": [
      {
        "id": "tableau/seguridad-y-gobernanza/row-level-security/1",
        "title": "Restringir región",
        "code": "",
        "steps": [
          "En entorno autorizado añade tabla de asignación Usuario-Region (ejemplo analista_norte → Norte) y configura una política o filtro de usuario basado en USERNAME() según el método del sitio",
          "prueba con esa cuenta."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La cuenta autorizada para Norte ve 700, no Sur.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/seguridad-y-gobernanza/certificacion-y-linaje",
    "remember": "Certificación no sustituye validación de métricas.",
    "examples": [
      {
        "id": "tableau/seguridad-y-gobernanza/certificacion-y-linaje/1",
        "title": "Identificar fuente autorizada",
        "code": "",
        "external": true,
        "hint": "En sitio habilitado busca fuente de ventas certificada y revisa propietario y dependencias.",
        "textOutput": "Se distingue la fuente aprobada de copias no certificadas; linaje depende de capacidades del sitio.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
