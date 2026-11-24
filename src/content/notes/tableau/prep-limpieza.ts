// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/prep-limpieza/definicion",
    "remember": "No elimines registros sin definir la regla de negocio.",
    "examples": [
      {
        "id": "tableau/prep-limpieza/definicion/1",
        "title": "Normalizar origen",
        "code": "",
        "external": true,
        "hint": "En Clean Step de leads crea LOWER(TRIM([Origen])) como Origen limpio.",
        "textOutput": "web para L01, L02 y L04; tienda para L03.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-limpieza/tipos-renombrar-y-eliminar",
    "remember": "Renombrar no altera el contenido.",
    "examples": [
      {
        "id": "tableau/prep-limpieza/tipos-renombrar-y-eliminar/1",
        "title": "Preparar columnas",
        "code": "",
        "external": true,
        "hint": "En Clean Step renombra Origen a Canal y cambia Enero y Febrero a Number (whole).",
        "textOutput": "Columnas Canal, Enero y Febrero listas para análisis.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-limpieza/nulos-y-filtros",
    "remember": "Conserva una rama de errores si se necesita auditoría.",
    "examples": [
      {
        "id": "tableau/prep-limpieza/nulos-y-filtros/1",
        "title": "Excluir correo ausente",
        "code": "",
        "external": true,
        "hint": "En Clean Step, filtra Email para excluir Null (o texto vacío si fue importado así).",
        "textOutput": "Quedan L01, L02 y L03.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-limpieza/group-values",
    "remember": "Revisa coincidencias sugeridas antes de aceptarlas.",
    "examples": [
      {
        "id": "tableau/prep-limpieza/group-values/1",
        "title": "Unificar Web y web",
        "code": "",
        "external": true,
        "hint": "En Origen usa Group Values y agrupa Web y web como Web.",
        "textOutput": "L01, L02 y L04 quedan bajo Web.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-limpieza/deduplicar",
    "remember": "Distingue duplicado de entidad y duplicado exacto.",
    "note": "Sintaxis de Prep para ROW_NUMBER; no es la sintaxis de cálculo de tabla de Desktop.",
    "examples": [
      {
        "id": "tableau/prep-limpieza/deduplicar/1",
        "title": "Conservar primer registro de cada correo",
        "code": "",
        "steps": [
          "Filtra Email no nulo y crea cálculo { PARTITION [Email] : { ORDERBY [LeadID] ASC : ROW_NUMBER() } }",
          "filtra resultado a 1."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Quedan L01 y L03.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/prep-limpieza/split-y-calculos",
    "remember": "Revisa nulos y delimitadores ausentes.",
    "examples": [
      {
        "id": "tableau/prep-limpieza/split-y-calculos/1",
        "title": "Extraer dominio de email",
        "code": "",
        "external": true,
        "hint": "En Clean Step de leads crea SPLIT([Email],'@',2).",
        "textOutput": "L01: example.com; L04: NULL si Email se importó nulo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
