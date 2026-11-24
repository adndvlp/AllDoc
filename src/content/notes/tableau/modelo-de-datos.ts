// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/modelo-de-datos/definicion",
    "remember": "Antes de combinar, identifica qué representa cada fila.",
    "examples": [
      {
        "id": "tableau/modelo-de-datos/definicion/1",
        "title": "Relacionar ventas y clientes",
        "code": "",
        "steps": [
          "En Data Source añade conexión a clientes.csv y arrastra clientes junto a ventas en el lienzo lógico",
          "edita relación ClienteID = ClienteID."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dos tablas lógicas relacionadas por el identificador.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/modelo-de-datos/granularidad",
    "remember": "Pedido puede repetirse; Linea es única.",
    "examples": [
      {
        "id": "tableau/modelo-de-datos/granularidad/1",
        "title": "Comparar líneas y pedidos",
        "code": "",
        "external": true,
        "hint": "En ventas, crea COUNT([Linea]) y COUNTD([Pedido]) y muestra ambos.",
        "textOutput": "8 líneas y 7 pedidos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/modelo-de-datos/relationships",
    "remember": "No crea de antemano una tabla física plana.",
    "examples": [
      {
        "id": "tableau/modelo-de-datos/relationships/1",
        "title": "Ventas por país",
        "code": "",
        "steps": [
          "Relaciona ventas con clientes",
          "coloca Pais en Rows y SUM(Ventas) en Text."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Mexico 1400; Spain 150; United States 200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/modelo-de-datos/cardinalidad-e-integridad",
    "remember": "No declares All records match sin comprobarlo.",
    "examples": [
      {
        "id": "tableau/modelo-de-datos/cardinalidad-e-integridad/1",
        "title": "Configurar relación",
        "code": "",
        "steps": [
          "En Edit Relationship > Performance Options, ventas Many, clientes One",
          "conserva Some records match si no has validado ambos lados."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La configuración expresa 1:N; C05 no tiene venta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/modelo-de-datos/capas-logica-y-fisica",
    "remember": "Las relaciones y joins no son intercambiables.",
    "examples": [
      {
        "id": "tableau/modelo-de-datos/capas-logica-y-fisica/1",
        "title": "Abrir capa física",
        "code": "",
        "external": true,
        "hint": "En Data Source haz doble clic sobre ventas.",
        "textOutput": "Se abre un lienzo donde se pueden añadir tablas físicas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/modelo-de-datos/joins",
    "remember": "Un join puede repetir filas o excluir registros.",
    "examples": [
      {
        "id": "tableau/modelo-de-datos/joins/1",
        "title": "Conservar todos los clientes",
        "code": "",
        "external": true,
        "hint": "En una nueva fuente coloca clientes como tabla física izquierda y ventas como derecha, Left Join por ClienteID.",
        "textOutput": "9 filas físicas: 8 líneas de venta y una fila sin venta para C05.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/modelo-de-datos/tipos-de-join",
    "remember": "El lado se determina por la posición de las tablas.",
    "note": "Full outer depende del conector.",
    "examples": [
      {
        "id": "tableau/modelo-de-datos/tipos-de-join/1",
        "title": "Comparar inner con left",
        "code": "",
        "steps": [
          "Usa el join anterior",
          "cambia de Left a Inner y revisa la vista previa."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Pasa de 9 a 8 filas; desaparece C05.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/modelo-de-datos/duplicacion-por-join",
    "remember": "No sumes medidas repetidas de una tabla de mayor granularidad.",
    "note": "Conserva fuentes separadas o preagrega; verifica claves y tipos.",
    "examples": [
      {
        "id": "tableau/modelo-de-datos/duplicacion-por-join/1",
        "title": "Detectar metas repetidas",
        "code": "",
        "steps": [
          "Une ventas a metas por Region y mes de Fecha (crear cálculo de join con DATETRUNC si se admite)",
          "suma Meta."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La suma física es 2700, no la meta original 1800, porque se repite en líneas del mismo mes y región.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/modelo-de-datos/union",
    "remember": "Homologa nombres y tipos de columnas.",
    "examples": [
      {
        "id": "tableau/modelo-de-datos/union/1",
        "title": "Apilar meses",
        "code": "",
        "steps": [
          "Divide ventas.csv en dos CSV, enero-febrero y marzo, misma estructura",
          "usa New Union con ambos, si el conector lo admite."
        ],
        "external": true,
        "hint": "",
        "textOutput": "8 filas, ventas 1750; no se eliminan duplicados automáticamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/modelo-de-datos/data-blending",
    "remember": "La fuente primaria define la base de la vista.",
    "note": "Verifica enlace activo; no confundir con join físico.",
    "examples": [
      {
        "id": "tableau/modelo-de-datos/data-blending/1",
        "title": "Comparar metas regionales",
        "code": "",
        "steps": [
          "Conecta ventas y metas como fuentes distintas",
          "usa Region de ventas en Rows y activa enlace Region con metas",
          "agrega SUM(Ventas) y SUM(Meta) secundaria."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Norte 700 frente a 700; Sur 1050 frente a 1100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/modelo-de-datos/multi-fact-relationships",
    "remember": "Relaciona hechos mediante dimensiones comunes, no mediante una clave no única directa.",
    "note": "Requiere versión 2024.2+ y fuente compatible; configura el modelo según la documentación.",
    "examples": [
      {
        "id": "tableau/modelo-de-datos/multi-fact-relationships/1",
        "title": "Comparar hechos mensuales",
        "code": "",
        "steps": [
          "Crea dimensión de Region y Mes con las seis claves únicas de metas",
          "configura ventas y metas como tablas base y relaciónalas con dicha dimensión por región y mes."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Las seis combinaciones se pueden comparar sin sumar metas repetidas. Por ejemplo, Norte enero: ventas 300 y meta 250.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
