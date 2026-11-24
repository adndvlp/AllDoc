// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/google-sheets-api-y-python/definicion",
    "remember": "El ID del archivo no sustituye autenticación ni permiso de acceso.",
    "examples": [
      {
        "id": "google-sheets/google-sheets-api-y-python/definicion/1",
        "title": "Identificar archivo",
        "language": "text",
        "code": "",
        "hint": "Abre un archivo de prueba y copia la parte de su URL entre /d/ y /edit; úsala como spreadsheetId en una solicitud autorizada. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Se identifica el archivo, no se concede acceso automáticamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/google-sheets-api-y-python/autenticacion-y-oauth",
    "remember": "Usa scopes mínimos y guarda credenciales fuera del repositorio.",
    "examples": [
      {
        "id": "google-sheets/google-sheets-api-y-python/autenticacion-y-oauth/1",
        "title": "Preparar acceso de lectura",
        "language": "text",
        "code": "",
        "hint": "En proyecto Google Cloud habilita Sheets API; configura OAuth según quickstart oficial con scope spreadsheets.readonly; autoriza cuenta con acceso al archivo de prueba. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "La aplicación obtiene credenciales para leer archivos permitidos; no escribir con ese scope.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/google-sheets-api-y-python/lectura-y-escritura-de-valores",
    "remember": "RAW no interpreta fórmulas; USER_ENTERED aplica interpretación de entrada.",
    "examples": [
      {
        "id": "google-sheets/google-sheets-api-y-python/lectura-y-escritura-de-valores/1",
        "title": "Leer dos columnas",
        "language": "python",
        "code": "resultado = service.spreadsheets().values().get(spreadsheetId=sheet_id, range='Productos!A2:B3').execute()\nprint(resultado['values'])",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Con service autenticado y sheet_id del archivo de esta guía: [['P1','Mouse'],['P2','Monitor']].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/google-sheets-api-y-python/peticiones-por-lotes",
    "remember": "Agrupa solicitudes y revisa alcance para evitar modificaciones parciales no deseadas.",
    "examples": [
      {
        "id": "google-sheets/google-sheets-api-y-python/peticiones-por-lotes/1",
        "title": "Escribir un valor sin fórmula",
        "language": "python",
        "code": "service.spreadsheets().values().batchUpdate(spreadsheetId=sheet_id, body={'valueInputOption':'RAW','data':[{'range':'Practica!F1','values':[[2000]]}]}).execute()",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "F1 contiene 2000. Requiere scope de escritura y permiso de edición.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/google-sheets-api-y-python/cuotas-y-reintentos",
    "remember": "No reintentes escrituras no idempotentes a ciegas.",
    "examples": [
      {
        "id": "google-sheets/google-sheets-api-y-python/cuotas-y-reintentos/1",
        "title": "Identificar saturación",
        "language": "text",
        "code": "",
        "hint": "En los registros de una aplicación revisa errores HTTP 429; reduce frecuencia, agrupa lecturas y usa backoff según documentación de cuotas. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Se distingue un límite de uso de un error de permisos; no provoques tráfico excesivo para probarlo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/google-sheets-api-y-python/gspread-y-pandas",
    "remember": "Son bibliotecas externas; instala y configura autenticación antes de usar.",
    "examples": [
      {
        "id": "google-sheets/google-sheets-api-y-python/gspread-y-pandas/1",
        "title": "Leer productos con Python",
        "language": "python",
        "code": "import gspread\nimport pandas as pd\ngc = gspread.service_account(filename='credenciales.json')\nws = gc.open_by_key(sheet_id).worksheet('Productos')\ndf = pd.DataFrame(ws.get_all_records())\nprint(df[['id','precio']].to_string(index=False))",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Cuatro filas: P1 100, P2 300, P3 200, P4 500. Requiere pip install gspread pandas, credenciales válidas y archivo compartido con la cuenta de servicio.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
