// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/integraciones/definicion",
    "remember": "No son requisitos universales junior; requieren entornos adicionales.",
    "examples": [
      {
        "id": "tableau/integraciones/definicion/1",
        "title": "Identificar integración",
        "code": "",
        "external": true,
        "hint": "Revisa la opción Analytics Extension Connection en Desktop si está disponible.",
        "textOutput": "Se pueden configurar servicios compatibles; no se ejecuta código externo por defecto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/integraciones/python-y-r",
    "remember": "Requiere servicio autorizado y una salida compatible con las marcas.",
    "note": "No envíes datos privados a un servicio externo no autorizado.",
    "examples": [
      {
        "id": "tableau/integraciones/python-y-r/1",
        "title": "Probar servicio",
        "code": "",
        "steps": [
          "Con TabPy ya configurado en un entorno de prueba, crea SCRIPT_REAL('return _arg1', SUM([Ventas]))",
          "usa vista regional con Compute Using adecuado."
        ],
        "external": true,
        "hint": "",
        "textOutput": "700 y 1050 si el servicio devuelve la entrada sin cambios.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/integraciones/rest-api-y-automatizacion",
    "remember": "La API no reemplaza las reglas de permisos.",
    "examples": [
      {
        "id": "tableau/integraciones/rest-api-y-automatizacion/1",
        "title": "Consultar workbooks",
        "code": "",
        "external": true,
        "hint": "En un sitio de pruebas autentícate por método permitido y usa la operación Query Workbooks de la REST API para ese sitio.",
        "textOutput": "Respuesta estructurada con workbooks accesibles a la cuenta, no todos necesariamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/integraciones/embedded-analytics-y-extensiones",
    "remember": "Una vista embebida conserva sus requisitos de autenticación.",
    "examples": [
      {
        "id": "tableau/integraciones/embedded-analytics-y-extensiones/1",
        "title": "Integrar vista",
        "code": "",
        "external": true,
        "hint": "Con workbook publicado y permiso de embedding, usa el código de inserción generado por Share en una aplicación de prueba.",
        "textOutput": "La vista se muestra en la aplicación para usuarios autorizados.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
