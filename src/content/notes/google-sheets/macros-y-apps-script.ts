// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/macros-y-apps-script/definicion",
    "remember": "Prueba en una copia y revisa permisos antes de ejecutar.",
    "examples": [
      {
        "id": "google-sheets/macros-y-apps-script/definicion/1",
        "title": "Abrir el editor",
        "language": "text",
        "code": "",
        "hint": "En la copia del archivo abre Extensiones > Apps Script. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Se abre el proyecto de script asociado a la hoja.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/macros-y-apps-script/macros",
    "remember": "Distingue referencias relativas y absolutas durante la grabación.",
    "examples": [
      {
        "id": "google-sheets/macros-y-apps-script/macros/1",
        "title": "Grabar formato de encabezado",
        "language": "text",
        "code": "",
        "hint": "En copia de Ventas selecciona A1:K1; Extensiones > Macros > Grabar macro; aplica negrita; guarda con nombre Encabezado y ejecuta. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Al ejecutar se aplica negrita al rango registrado según modo de referencia.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/macros-y-apps-script/spreadsheetapp-y-rangos",
    "remember": "getValues devuelve una matriz bidimensional.",
    "examples": [
      {
        "id": "google-sheets/macros-y-apps-script/spreadsheetapp-y-rangos/1",
        "title": "Leer el primer importe",
        "language": "javascript",
        "code": "function leerImporte() { const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Ventas'); console.log(s.getRange('J2').getValue()); }",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Al ejecutar leerImporte desde editor asociado al archivo, el registro muestra 200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/macros-y-apps-script/escritura-por-lotes",
    "remember": "No sobrescribas datos de origen.",
    "examples": [
      {
        "id": "google-sheets/macros-y-apps-script/escritura-por-lotes/1",
        "title": "Escribir dos KPIs",
        "language": "javascript",
        "code": "function escribirKPIs() { const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Practica'); s.getRange('D1:E2').setValues([['Ingresos',2000],['Pedidos',6]]); }",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "D1:E2 contiene Ingresos,2000; Pedidos,6. Autoriza el script si se solicita.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/macros-y-apps-script/funciones-personalizadas",
    "remember": "No debe editar arbitrariamente otras celdas; pasa rangos como argumentos para recalcular.",
    "examples": [
      {
        "id": "google-sheets/macros-y-apps-script/funciones-personalizadas/1",
        "title": "Crear función de margen",
        "language": "javascript",
        "code": "function MARGEN_NETO(ingresos, costos) { return ingresos === 0 ? '' : (ingresos-costos)/ingresos; }",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Guarda el script y usa =MARGEN_NETO(2000,1140) en Practica; devuelve 0.43.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/macros-y-apps-script/triggers-simples",
    "remember": "onEdit responde a edición de usuario, no a cambios por fórmula o API.",
    "examples": [
      {
        "id": "google-sheets/macros-y-apps-script/triggers-simples/1",
        "title": "Registrar edición en una hoja",
        "language": "javascript",
        "code": "function onEdit(e) { if(e.range.getSheet().getName()==='Practica' && e.range.getA1Notation()==='B1') e.range.getSheet().getRange('C1').setValue('Editado'); }",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Guarda y edita manualmente B1 en Practica; C1 muestra Editado. No ejecutes onEdit manualmente sin evento.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/macros-y-apps-script/triggers-instalables",
    "remember": "Controla propietario, cuotas y evita crear duplicados.",
    "examples": [
      {
        "id": "google-sheets/macros-y-apps-script/triggers-instalables/1",
        "title": "Programar un reporte",
        "language": "text",
        "code": "",
        "hint": "Guarda escribirKPIs del ejemplo de escritura; en Apps Script > Activadores añade uno basado en tiempo para esa función. En copia de prueba verifica ejecuciones y elimina el activador al terminar. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "La función se ejecuta en el intervalo configurado y actualiza D1:E2 si cuenta con autorización.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/macros-y-apps-script/apis-externas-desde-script",
    "remember": "No incrustes credenciales en hojas o scripts compartidos.",
    "examples": [
      {
        "id": "google-sheets/macros-y-apps-script/apis-externas-desde-script/1",
        "title": "Comprobar respuesta HTTP",
        "language": "javascript",
        "code": "function consultar() { const r=UrlFetchApp.fetch('https://example.com/'); console.log(r.getResponseCode()); }",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Con acceso externo y servicio disponible, el registro muestra 200; puede variar por red o permisos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
