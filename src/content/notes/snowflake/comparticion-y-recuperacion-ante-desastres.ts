// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/comparticion-y-recuperacion-ante-desastres/definicion",
    "remember": "Compartición y replicación resuelven problemas distintos: acceso frente a continuidad.",
    "examples": [
      {
        "id": "snowflake/comparticion-y-recuperacion-ante-desastres/definicion/1",
        "title": "Inspeccionar shares visibles",
        "language": "sql",
        "code": "SHOW SHARES;",
        "hint": "",
        "textOutput": "Listado de shares visibles o vacío según la cuenta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/comparticion-y-recuperacion-ante-desastres/secure-data-sharing-y-reader-accounts",
    "remember": "El consumidor normalmente aporta cómputo en su propia cuenta; los reader accounts generan costos para el proveedor.",
    "note": "Requiere dos cuentas o un reader account autorizado.",
    "examples": [
      {
        "id": "snowflake/comparticion-y-recuperacion-ante-desastres/secure-data-sharing-y-reader-accounts/1",
        "title": "Compartir un resumen autorizado",
        "code": "",
        "steps": [
          "Crea una secure view con importes agregados, sin datos personales.",
          "Configura un share, concede uso de contenedores y SELECT de la vista.",
          "Autoriza la cuenta consumidora de prueba.",
          "El consumidor crea una base desde el share y consulta el resumen."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Lectura del resumen permitido, sin acceso automático a tablas fuente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/comparticion-y-recuperacion-ante-desastres/marketplace-listings-y-auto-fulfillment",
    "remember": "Revisa visibilidad, contratos, regiones, replicación y costo antes de publicar.",
    "examples": [
      {
        "id": "snowflake/comparticion-y-recuperacion-ante-desastres/marketplace-listings-y-auto-fulfillment/1",
        "title": "Preparar una publicación privada",
        "code": "",
        "steps": [
          "Define un producto con datos sintéticos y documentación.",
          "Crea una listing privada para un consumidor autorizado.",
          "Revisa configuración de disponibilidad regional y auto-fulfillment.",
          "Valida el acceso desde la cuenta consumidora."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Listing privada visible al destinatario autorizado; no publicación pública automática.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/comparticion-y-recuperacion-ante-desastres/data-clean-rooms",
    "remember": "No es simplemente un share de filas sin restricciones.",
    "note": "Requiere servicio y cuentas compatibles.",
    "examples": [
      {
        "id": "snowflake/comparticion-y-recuperacion-ante-desastres/data-clean-rooms/1",
        "title": "Comparar audiencias sin exponer listas",
        "code": "",
        "steps": [
          "Dos participantes aportan datos sintéticos de audiencias autorizadas.",
          "Definen una plantilla de intersección y restricciones de privacidad.",
          "Ejecutan la plantilla y revisan el resultado permitido."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Conteo agregado de coincidencias, sujeto a reglas; no listas de identificadores sin autorización.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/comparticion-y-recuperacion-ante-desastres/replication-failover-y-disaster-recovery",
    "remember": "Replica no significa copia instantánea; practica failover y failback sin afectar producción.",
    "note": "Requiere administración, edición y regiones compatibles.",
    "examples": [
      {
        "id": "snowflake/comparticion-y-recuperacion-ante-desastres/replication-failover-y-disaster-recovery/1",
        "title": "Planificar una prueba de continuidad",
        "code": "",
        "steps": [
          "Define RPO/RTO y selecciona cuentas de origen/destino compatibles.",
          "Configura grupo de replicación o failover y refresco.",
          "Comprueba sincronización y realiza una promoción solo en un entorno aislado.",
          "Verifica accesos, datos y aplicaciones."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Medición de tiempo y pérdida efectiva respecto a los objetivos; no se presume conmutación automática.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
