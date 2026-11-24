// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/prep-salida/definicion",
    "remember": "Guardar el flujo no equivale a ejecutarlo.",
    "examples": [
      {
        "id": "tableau/prep-salida/definicion/1",
        "title": "Generar CSV limpio",
        "code": "",
        "external": true,
        "hint": "Desde la rama válida de leads añade Output local CSV y Run Flow.",
        "textOutput": "Archivo de tres filas si solo excluiste el correo ausente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-salida/archivos-de-flujo-y-salida",
    "remember": "El archivo del flujo describe transformaciones, no sustituye al resultado.",
    "examples": [
      {
        "id": "tableau/prep-salida/archivos-de-flujo-y-salida/1",
        "title": "Guardar flujo reutilizable",
        "code": "",
        "steps": [
          "En Prep Builder guarda el flujo y configura Output a .hyper",
          "ejecútalo y conecta Tableau Desktop al extract."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se puede analizar el resultado preparado en Desktop.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-salida/publicar-y-programar-flujos",
    "remember": "Programación y credenciales dependen del sitio y licencia.",
    "examples": [
      {
        "id": "tableau/prep-salida/publicar-y-programar-flujos/1",
        "title": "Programar actualización",
        "code": "",
        "steps": [
          "Publica un flujo con salida a fuente publicada en un entorno autorizado",
          "configura tarea programada si está habilitada."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El sitio muestra el flujo y su próxima ejecución configurada; no presupone que la ejecución haya ocurrido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
