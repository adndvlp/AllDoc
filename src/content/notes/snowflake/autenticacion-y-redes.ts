// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/autenticacion-y-redes/definicion",
    "remember": "No confundas iniciar sesión con tener permisos de consulta.",
    "examples": [
      {
        "id": "snowflake/autenticacion-y-redes/definicion/1",
        "title": "Validar una sesión autorizada",
        "language": "sql",
        "code": "SELECT CURRENT_USER(),CURRENT_ROLE(),CURRENT_ACCOUNT();",
        "hint": "",
        "textOutput": "Usuario, rol y cuenta reales de la conexión.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/autenticacion-y-redes/mfa-y-sso",
    "remember": "Sigue las políticas de la organización; no desactives MFA para automatizar scripts.",
    "examples": [
      {
        "id": "snowflake/autenticacion-y-redes/mfa-y-sso/1",
        "title": "Conectar con identidad corporativa",
        "code": "",
        "steps": [
          "Usa el acceso SSO configurado por tu organización.",
          "Completa los factores requeridos.",
          "Verifica CURRENT_USER() y CURRENT_ROLE()."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Sesión iniciada con identidad autorizada o error de autenticación controlado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/autenticacion-y-redes/oauth-y-key-pair-authentication",
    "remember": "Nunca incluyas claves privadas ni tokens en código o repositorios.",
    "examples": [
      {
        "id": "snowflake/autenticacion-y-redes/oauth-y-key-pair-authentication/1",
        "title": "Configurar una cuenta de servicio",
        "code": "",
        "steps": [
          "Un administrador configura un método no interactivo permitido (OAuth o key-pair).",
          "Almacena credenciales en un gestor de secretos.",
          "Ejecuta una consulta de prueba con un rol mínimo y valida rotación/revocación."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Conexión autorizada sin contraseñas incrustadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/autenticacion-y-redes/network-policies-y-conectividad-privada",
    "remember": "Prueba cambios con una vía administrativa de recuperación para evitar bloquear el acceso.",
    "examples": [
      {
        "id": "snowflake/autenticacion-y-redes/network-policies-y-conectividad-privada/1",
        "title": "Validar conectividad de un cliente autorizado",
        "code": "",
        "steps": [
          "Configura política de prueba y red privada según proveedor y edición.",
          "Prueba desde la red permitida y desde una red no permitida.",
          "Revisa el historial de accesos y errores."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Conexión admitida o bloqueada según política; no se cambia una cuenta real desde los apuntes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/autenticacion-y-redes/external-access-integrations-y-secrets",
    "remember": "Restringe destinos, roles y secretos; no concedas acceso general a Internet.",
    "examples": [
      {
        "id": "snowflake/autenticacion-y-redes/external-access-integrations-y-secrets/1",
        "title": "Autorizar una API de prueba",
        "code": "",
        "steps": [
          "Define una network rule de salida para el host permitido.",
          "Crea un secret si la API lo requiere y una external access integration.",
          "Asocia integración y secret a una UDF/procedimiento autorizado.",
          "Ejecuta una solicitud de prueba y verifica que otros destinos no estén permitidos."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Acceso a la API autorizada bajo la configuración; no se muestran credenciales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
