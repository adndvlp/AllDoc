// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/colaboracion-y-auditoria/definicion",
    "remember": "Comparte el mínimo acceso necesario.",
    "examples": [
      {
        "id": "google-sheets/colaboracion-y-auditoria/definicion/1",
        "title": "Compartir para revisión",
        "language": "text",
        "code": "",
        "hint": "En una copia de práctica pulsa Compartir; invita a una cuenta de prueba como comentarista. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Puede comentar, no editar valores.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/colaboracion-y-auditoria/permisos-y-acceso-externo",
    "remember": "Evita enlaces públicos para datos sensibles.",
    "examples": [
      {
        "id": "google-sheets/colaboracion-y-auditoria/permisos-y-acceso-externo/1",
        "title": "Revisar acceso",
        "language": "text",
        "code": "",
        "hint": "Abre Compartir y comprueba que Acceso general sea Restringido. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Solo cuentas autorizadas tienen acceso, sujeto a políticas del dominio.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/colaboracion-y-auditoria/historial-de-versiones",
    "remember": "Nombra versiones antes de modificaciones importantes.",
    "examples": [
      {
        "id": "google-sheets/colaboracion-y-auditoria/historial-de-versiones/1",
        "title": "Guardar punto de control",
        "language": "text",
        "code": "",
        "hint": "Archivo > Historial de versiones > Asignar nombre a la versión actual; escribe Antes de limpieza. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Aparece una versión identificable para revisión.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/colaboracion-y-auditoria/comentarios-y-notas",
    "remember": "No sustituyen documentación de fórmulas críticas.",
    "examples": [
      {
        "id": "google-sheets/colaboracion-y-auditoria/comentarios-y-notas/1",
        "title": "Documentar una métrica",
        "language": "text",
        "code": "",
        "hint": "Añade una nota a Ventas!J1: cantidad por precio unitario. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Al pasar sobre el indicador de nota se muestra la explicación.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/colaboracion-y-auditoria/auditoria-de-formulas",
    "remember": "Verifica rangos y criterios antes de confiar en un KPI.",
    "examples": [
      {
        "id": "google-sheets/colaboracion-y-auditoria/auditoria-de-formulas/1",
        "title": "Revisar fórmula de costo",
        "language": "excel-formula",
        "code": "=FORMULATEXT(Ventas!K2)",
        "hint": "",
        "textOutput": "=E2*G2 como texto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
