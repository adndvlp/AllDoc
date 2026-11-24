// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/seguridad-y-gobierno/definicion",
    "remember": "Ocultar una columna no equivale a protegerla.",
    "examples": [
      {
        "id": "powerbi/seguridad-y-gobierno/definicion/1",
        "title": "Probar acceso regional",
        "code": "",
        "steps": [
          "En copia del modelo crea rol Mexico con expresión `Clientes[Pais] = \"Mexico\"` en Clientes.",
          "Usa Ver como rol Mexico y abre tarjeta Ventas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "820 en vez de 1100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/seguridad-y-gobierno/rls-estatico",
    "remember": "Prueba con rol y como lector real en Service.",
    "examples": [
      {
        "id": "powerbi/seguridad-y-gobierno/rls-estatico/1",
        "title": "Crear rol regional",
        "code": "",
        "steps": [
          "Modelado > Administrar roles > Crear Espana.",
          "En Clientes usa filtro `Clientes[Pais] = \"Espana\"`.",
          "Ver como Espana."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ventas 280 y dos pedidos visibles.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/seguridad-y-gobierno/rls-dinamico",
    "remember": "No codifiques un rol por usuario si puedes mapear identidades.",
    "note": "Protege también la tabla Accesos (por ejemplo, RLS sobre su UPN); en Service asigna usuarios/grupos al rol y prueba con Viewer. RLS no restringe roles de workspace con permiso de edición, como Admin/Member/Contributor.",
    "examples": [
      {
        "id": "powerbi/seguridad-y-gobierno/rls-dinamico/1",
        "title": "Filtrar por usuario",
        "code": "",
        "steps": [
          "En copia con Accesos desconectada crea rol con filtro en Clientes: `Clientes[Pais] IN SELECTCOLUMNS(FILTER(Accesos, Accesos[UPN] = USERPRINCIPALNAME()), \"Pais\", Accesos[Pais])`.",
          "En Ver como, selecciona rol y Otro usuario ana@example.com."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ventas 820; con un usuario no mapeado, ninguna venta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/seguridad-y-gobierno/object-level-security",
    "remember": "Ocultar campos en modelo no proporciona seguridad.",
    "note": "Requiere entorno compatible y permisos; no es una opción equivalente a RLS en Desktop.",
    "examples": [
      {
        "id": "powerbi/seguridad-y-gobierno/object-level-security/1",
        "title": "Proteger coste",
        "code": "",
        "steps": [
          "En modelo de prueba compatible usa una herramienta de modelado que configure OLS; niega acceso a Productos[Costo] para un rol de lector.",
          "Prueba consulta de esa columna como lector."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El lector restringido no puede consultar el coste; medidas dependientes pueden fallar si requieren el objeto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/seguridad-y-gobierno/etiquetas-de-sensibilidad",
    "remember": "Clasificación no sustituye permisos ni RLS.",
    "examples": [
      {
        "id": "powerbi/seguridad-y-gobierno/etiquetas-de-sensibilidad/1",
        "title": "Clasificar informe",
        "code": "",
        "steps": [
          "En Service autorizado aplica una etiqueta de prueba permitida por la organización.",
          "Revisa la etiqueta en el informe y opciones de exportación."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El contenido queda clasificado según política; protección de exportaciones depende de formato y configuración.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
