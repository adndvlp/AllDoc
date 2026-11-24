// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/validacion-y-control/definicion",
    "remember": "La validación no reemplaza controles de calidad posteriores.",
    "examples": [
      {
        "id": "google-sheets/validacion-y-control/definicion/1",
        "title": "Limitar estados aceptados",
        "language": "text",
        "code": "",
        "hint": "En copia de Ventas selecciona H2:H9; Datos > Validación de datos; desplegable completed y cancelled; selecciona rechazar entrada inválida. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Una entrada pending es rechazada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/validacion-y-control/listas-desplegables",
    "remember": "Usa una fuente maestra si las categorías cambian.",
    "examples": [
      {
        "id": "google-sheets/validacion-y-control/listas-desplegables/1",
        "title": "Crear lista de productos",
        "language": "text",
        "code": "",
        "hint": "En Practica B1 configura validación desplegable desde Productos!A2:A5. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "B1 permite P1, P2, P3 y P4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/validacion-y-control/checkboxes",
    "remember": "Por defecto casilla marcada TRUE y desmarcada FALSE.",
    "examples": [
      {
        "id": "google-sheets/validacion-y-control/checkboxes/1",
        "title": "Registrar aprobación",
        "language": "text",
        "code": "",
        "hint": "En Practica B1 usa Insertar > Casilla; márcala; en A1 escribe =IF(B1,\"Aprobado\",\"Pendiente\"). Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Aprobado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/validacion-y-control/validacion-personalizada",
    "remember": "La referencia debe partir de la primera celda del rango.",
    "examples": [
      {
        "id": "google-sheets/validacion-y-control/validacion-personalizada/1",
        "title": "Aceptar cantidad positiva",
        "language": "text",
        "code": "",
        "hint": "En copia de Ventas E2:E9 aplica validación fórmula personalizada =AND(ISNUMBER(E2),E2>0), rechazar entrada. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "0 o texto no se aceptan.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/validacion-y-control/proteccion-de-hojas-y-rangos",
    "remember": "No impide que usuarios autorizados vean o copien datos.",
    "examples": [
      {
        "id": "google-sheets/validacion-y-control/proteccion-de-hojas-y-rangos/1",
        "title": "Proteger importes calculados",
        "language": "text",
        "code": "",
        "hint": "Datos > Proteger hojas y rangos; selecciona Ventas!J2:K9; configura solo propietarios o usuarios autorizados. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Usuarios no autorizados no pueden editar esas celdas según permisos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
