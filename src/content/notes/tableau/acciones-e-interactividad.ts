// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/acciones-e-interactividad/definicion",
    "remember": "Define origen, destino, disparador y limpieza de selección.",
    "examples": [
      {
        "id": "tableau/acciones-e-interactividad/definicion/1",
        "title": "Filtrar por selección",
        "code": "",
        "steps": [
          "En dashboard de barras y línea marca barras como Use as Filter",
          "pulsa Norte."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La línea muestra ventas de Norte.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/acciones-e-interactividad/filter-actions",
    "remember": "Configura qué sucede al limpiar la selección.",
    "examples": [
      {
        "id": "tableau/acciones-e-interactividad/filter-actions/1",
        "title": "Filtrar por categoría",
        "code": "",
        "steps": [
          "Dashboard > Actions > Add Action > Filter",
          "origen vista de categoría, destino línea mensual, Select, clearing Show all values."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Al elegir Hogar aparecen 300,200,700 por mes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/acciones-e-interactividad/highlight-actions",
    "remember": "No cambia la población como un filtro.",
    "examples": [
      {
        "id": "tableau/acciones-e-interactividad/highlight-actions/1",
        "title": "Resaltar región",
        "code": "",
        "steps": [
          "Usa dos hojas con Region presente",
          "Add Action > Highlight y selecciona Norte."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Norte destaca y Sur permanece visible.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/acciones-e-interactividad/url-actions",
    "remember": "No envíes datos sensibles en la URL.",
    "examples": [
      {
        "id": "tableau/acciones-e-interactividad/url-actions/1",
        "title": "Abrir documentación",
        "code": "",
        "steps": [
          "Dashboard > Actions > Add Action > Go to URL",
          "URL https://help.tableau.com/",
          "Run on Menu."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Al seleccionar una marca se ofrece un enlace a la ayuda.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/acciones-e-interactividad/parameter-actions",
    "remember": "El parámetro debe ser compatible con el campo de origen.",
    "examples": [
      {
        "id": "tableau/acciones-e-interactividad/parameter-actions/1",
        "title": "Elegir umbral con una marca",
        "code": "",
        "steps": [
          "Crea parámetro numérico Umbral y una hoja por Linea con Ventas",
          "Add Action > Change Parameter, fuente Ventas con agregación SUM, Select."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Seleccionar línea 3 establece Umbral en 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/acciones-e-interactividad/set-actions",
    "remember": "Un set puede aceptar múltiples miembros.",
    "examples": [
      {
        "id": "tableau/acciones-e-interactividad/set-actions/1",
        "title": "Seleccionar productos",
        "code": "",
        "steps": [
          "Crea set de Producto",
          "usa Add Action > Change Set Values con hoja Producto y Assign values to set."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Seleccionar Silla deja Silla como miembro In.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/acciones-e-interactividad/navegacion-y-drill-through",
    "remember": "Navegar y filtrar son acciones distintas.",
    "examples": [
      {
        "id": "tableau/acciones-e-interactividad/navegacion-y-drill-through/1",
        "title": "Abrir detalle",
        "code": "",
        "steps": [
          "Crea dashboard Resumen y Detalle",
          "añade Navigation object a Resumen con destino Detalle."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El botón abre Detalle; añade Filter Action aparte si necesitas transferir filtros.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/acciones-e-interactividad/dynamic-zone-visibility",
    "remember": "La visibilidad de una zona no es seguridad.",
    "note": "Requiere Tableau 2022.3+ y campo compatible.",
    "examples": [
      {
        "id": "tableau/acciones-e-interactividad/dynamic-zone-visibility/1",
        "title": "Mostrar gráfico opcional",
        "code": "",
        "steps": [
          "Crea parámetro booleano Mostrar detalle",
          "selecciona contenedor de detalle y en Layout activa Control visibility using value, elige parámetro."
        ],
        "external": true,
        "hint": "",
        "textOutput": "True muestra la zona; False la oculta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
