// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/privacidad-y-data-privacy-firewall/definicion",
    "remember": "Privacidad no sustituye permisos del origen ni seguridad de filas.",
    "examples": [
      {
        "id": "power-query/privacidad-y-data-privacy-firewall/definicion/1",
        "title": "Revisar privacidad de un archivo",
        "code": "",
        "steps": [
          "Conecta un archivo ficticio con identificadores de clientes",
          "Abre Configuración de origen de datos > Editar permisos",
          "Selecciona el nivel adecuado según política de datos, por ejemplo Privado"
        ],
        "external": true,
        "hint": "El nivel indica cómo puede combinarse el origen con otros.",
        "textOutput": "El origen queda configurado con el nivel elegido en el producto compatible.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/privacidad-y-data-privacy-firewall/public-organizational-y-private",
    "remember": "Clasifica por sensibilidad real, no por comodidad de actualización.",
    "examples": [
      {
        "id": "power-query/privacidad-y-data-privacy-firewall/public-organizational-y-private/1",
        "title": "Clasificar dos fuentes de prueba",
        "code": "",
        "steps": [
          "Crea una fuente de precios públicos y otra fuente con datos internos ficticios",
          "Revisa sus permisos y niveles de privacidad por separado"
        ],
        "external": true,
        "hint": "Asigna el nivel de acuerdo con la clasificación de la organización.",
        "textOutput": "La fuente pública se puede marcar Pública; la fuente interna se marca Organizacional o Privada según su sensibilidad y política.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/privacidad-y-data-privacy-firewall/formula-firewall",
    "remember": "No ignores privacidad para corregir un fallo de diseño o credenciales.",
    "note": "No se afirma que todo error de firewall tenga una única solución; algunas capacidades varían por producto.",
    "examples": [
      {
        "id": "power-query/privacidad-y-data-privacy-firewall/formula-firewall/1",
        "title": "Diagnosticar una combinación bloqueada",
        "code": "",
        "steps": [
          "Si una consulta de prueba combina un archivo privado y una consulta Web autorizada, revisa los niveles de ambos orígenes",
          "Inspecciona si valores privados se usan como parámetros de la petición Web",
          "Separa la extracción y combinación según las reglas del entorno y repite la prueba"
        ],
        "external": true,
        "hint": "El objetivo es evitar que datos privados se envíen a otro origen sin autorización.",
        "textOutput": "La consulta se mantiene bloqueada si la combinación no es válida; solo debe funcionar cuando respete las reglas de privacidad.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
