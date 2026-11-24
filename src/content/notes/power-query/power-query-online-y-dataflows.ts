// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/power-query-online-y-dataflows/definicion",
    "remember": "El destino y la licencia dependen del producto; no es lo mismo que un archivo PBIX.",
    "note": "Requiere acceso real a Power BI, Fabric o Power Platform según el tipo de flujo.",
    "examples": [
      {
        "id": "power-query/power-query-online-y-dataflows/definicion/1",
        "title": "Crear un flujo de datos de prueba",
        "code": "",
        "steps": [
          "En un workspace con capacidad y permisos adecuados, crea un flujo de datos del tipo disponible",
          "Abre el editor Power Query Online",
          "Crea una consulta en blanco con #table({\"id\",\"importe\"},{{1,100},{2,200}})",
          "Configura la salida o destino exigido por el producto y publica"
        ],
        "external": true,
        "hint": "El flujo prepara la tabla en el servicio.",
        "textOutput": "2 filas en la salida configurada después de una ejecución correcta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/power-query-online-y-dataflows/destinos-y-reutilizacion",
    "remember": "Verifica dónde quedan los datos y qué consumidor tiene acceso.",
    "note": "Dataflow Gen1, Gen2 y Power Platform no tienen los mismos destinos ni requisitos.",
    "examples": [
      {
        "id": "power-query/power-query-online-y-dataflows/destinos-y-reutilizacion/1",
        "title": "Consumir una salida preparada",
        "code": "",
        "steps": [
          "Publica el flujo de prueba del ejemplo anterior",
          "En un consumidor autorizado conecta a la salida mediante el conector o destino correspondiente",
          "Selecciona la tabla preparada"
        ],
        "external": true,
        "hint": "El consumidor utiliza datos ya transformados.",
        "textOutput": "2 filas (1,100),(2,200) si el flujo se ejecutó correctamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
