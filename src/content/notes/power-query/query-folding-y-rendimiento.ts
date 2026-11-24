// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/query-folding-y-rendimiento/definicion",
    "remember": "El mismo código puede plegarse con un origen y no con otro.",
    "note": "Las tablas literales #table no tienen servidor al que delegar; que Ver consulta nativa esté deshabilitado no demuestra por sí solo ausencia de plegado.",
    "examples": [
      {
        "id": "power-query/query-folding-y-rendimiento/definicion/1",
        "title": "Comprobar si un filtro se delega a SQL",
        "code": "",
        "steps": [
          "Conecta a una tabla SQL Server autorizada con columnas id e importe",
          "Aplica un filtro importe >= 100",
          "En el paso de filtro revisa Ver consulta nativa si está disponible"
        ],
        "external": true,
        "hint": "La posibilidad de delegar depende del conector y la expresión concreta.",
        "textOutput": "Si se pliega y el comando está disponible, se observa una consulta equivalente con el filtro en el origen.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/query-folding-y-rendimiento/plegado-completo-parcial-y-sin-plegado",
    "remember": "Comprueba los pasos y no supongas que todas las operaciones se ejecutan en SQL.",
    "examples": [
      {
        "id": "power-query/query-folding-y-rendimiento/plegado-completo-parcial-y-sin-plegado/1",
        "title": "Comparar dos pasos de una consulta",
        "code": "",
        "steps": [
          "Importa dbo.Ventas de SQL Server con ids 1 y 2 e importes 100 y 200",
          "Filtra importe >= 100",
          "Añade una columna personalizada y revisa Ver consulta nativa o diagnóstico en ambos pasos"
        ],
        "external": true,
        "hint": "Una operación compatible puede delegarse y otra procesarse en M.",
        "textOutput": "La salida conserva las dos filas; la evidencia de plegado puede diferir por paso y conector.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/query-folding-y-rendimiento/reducir-datos-temprano",
    "remember": "No cambies el orden si altera el significado del cálculo.",
    "examples": [
      {
        "id": "power-query/query-folding-y-rendimiento/reducir-datos-temprano/1",
        "title": "Preparar una salida pequeña",
        "language": "powerquery",
        "code": "let F = Table.SelectRows(Pedidos,each [estado] = \"completado\"), C = Table.SelectColumns(F,{\"cliente\",\"importe\"}) in C",
        "hint": "Se conservan solo datos necesarios antes de otras transformaciones.",
        "textOutput": "5 filas y 2 columnas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/query-folding-y-rendimiento/table-buffer",
    "remember": "No lo uses por defecto; mide antes y después. No es una caché persistente entre actualizaciones.",
    "examples": [
      {
        "id": "power-query/query-folding-y-rendimiento/table-buffer/1",
        "title": "Materializar una tabla pequeña",
        "language": "powerquery",
        "code": "Table.RowCount(Table.Buffer(Pedidos))",
        "hint": "Buffer no cambia el número de filas de esta tabla.",
        "textOutput": "7; no se afirma una mejora de rendimiento.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/query-folding-y-rendimiento/consulta-nativa",
    "remember": "Usa permisos de lectura y evita concatenar entradas no confiables; el plegado posterior depende del conector.",
    "examples": [
      {
        "id": "power-query/query-folding-y-rendimiento/consulta-nativa/1",
        "title": "Leer una consulta SQL de prueba",
        "code": "",
        "steps": [
          "En un SQL Server autorizado crea dbo.Ventas con las filas (1,100),(2,200)",
          "En Obtener datos > SQL Server > Opciones avanzadas indica SELECT id, importe FROM dbo.Ventas WHERE importe >= 200",
          "Confirma la consulta y revisa la salida"
        ],
        "external": true,
        "hint": "La condición se ejecuta en el servidor.",
        "textOutput": "Una fila (2,200), si los datos del servidor son los de prueba.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
