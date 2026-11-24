// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/perfil-y-validacion-de-datos/definicion",
    "remember": "Una vista previa limpia no demuestra que toda la tabla esté bien.",
    "examples": [
      {
        "id": "power-query/perfil-y-validacion-de-datos/definicion/1",
        "title": "Activar herramientas de perfil",
        "code": "",
        "steps": [
          "Selecciona Pedidos",
          "En Vista activa Calidad de columna, Distribución de columna y Perfil de columna",
          "Selecciona canal"
        ],
        "external": true,
        "hint": "Los tres paneles describen la columna desde perspectivas distintas.",
        "textOutput": "7 filas: 6 canales válidos, 1 vacío por null, sin errores; dos valores no nulos distintos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/perfil-y-validacion-de-datos/calidad-de-columna",
    "remember": "Revisa las columnas que han pasado por conversiones.",
    "examples": [
      {
        "id": "power-query/perfil-y-validacion-de-datos/calidad-de-columna/1",
        "title": "Inspeccionar una conversión problemática",
        "code": "",
        "steps": [
          "Duplica Importacion",
          "Convierte importe a decimal usando configuración regional es-ES",
          "Activa Calidad de columna y selecciona importe"
        ],
        "external": true,
        "hint": "La conversión genera un error en N/D.",
        "textOutput": "2 válidos de 3, 1 error de 3, 0 vacíos (aprox. 67 %, 33 %, 0 %).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/perfil-y-validacion-de-datos/distribucion-de-columna",
    "remember": "Distinto cuenta categorías; único cuenta categorías con frecuencia 1.",
    "examples": [
      {
        "id": "power-query/perfil-y-validacion-de-datos/distribucion-de-columna/1",
        "title": "Inspeccionar estados de pedido",
        "code": "",
        "steps": [
          "Selecciona Pedidos",
          "Activa Distribución de columna en Vista",
          "Observa estado"
        ],
        "external": true,
        "hint": "Los indicadores distinguen categorías de ocurrencias únicas.",
        "textOutput": "3 valores distintos; 2 únicos (cancelado y pendiente); completado aparece 5 veces.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/perfil-y-validacion-de-datos/perfil-de-columna-y-alcance",
    "remember": "Cambia a todo el conjunto de datos si necesitas validar más allá de la muestra.",
    "note": "En orígenes grandes, perfilar todos los datos puede ser costoso.",
    "examples": [
      {
        "id": "power-query/perfil-y-validacion-de-datos/perfil-de-columna-y-alcance/1",
        "title": "Ver el rango de importes",
        "code": "",
        "steps": [
          "Selecciona Pedidos",
          "Activa Perfil de columna y selecciona importe",
          "En la barra inferior, cambia el perfilado a todo el conjunto de datos si está disponible"
        ],
        "external": true,
        "hint": "El perfil ahora usa todas las filas, no solo una muestra.",
        "textOutput": "7 filas, mínimo 50, máximo 300, promedio aprox. 147.1429.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/perfil-y-validacion-de-datos/reglas-de-calidad",
    "remember": "El tipo de datos no garantiza unicidad ni validez de negocio.",
    "examples": [
      {
        "id": "power-query/perfil-y-validacion-de-datos/reglas-de-calidad/1",
        "title": "Comprobar la clave de pedidos",
        "language": "powerquery",
        "code": "[filas=Table.RowCount(Pedidos), claves=List.Count(List.Distinct(Pedidos[id])), sin_clave=Table.RowCount(Table.SelectRows(Pedidos,each [id] = null))]",
        "hint": "Si filas y claves coinciden y no hay null, la clave es única y presente.",
        "textOutput": "[filas=7, claves=7, sin_clave=0].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/perfil-y-validacion-de-datos/conciliacion-antes-y-despues",
    "remember": "El total puede cambiar si la transformación pretende cambiarlo; documenta la razón.",
    "examples": [
      {
        "id": "power-query/perfil-y-validacion-de-datos/conciliacion-antes-y-despues/1",
        "title": "Validar que Merge no duplica pedidos",
        "language": "powerquery",
        "code": "let J = Table.NestedJoin(Pedidos,{\"cliente\"},Clientes,{\"cliente\"},\"c\",JoinKind.LeftOuter), E = Table.ExpandTableColumn(J,\"c\",{\"nombre\"}) in [antes=List.Sum(Pedidos[importe]), despues=List.Sum(E[importe]), filas=Table.RowCount(E)]",
        "hint": "Una clave de cliente única conserva el importe total.",
        "textOutput": "[antes=1030, despues=1030, filas=7].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
