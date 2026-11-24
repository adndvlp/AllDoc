// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/campos/definicion",
    "remember": "Rol analítico, tipo de dato y discreto/continuo son decisiones diferentes.",
    "examples": [
      {
        "id": "tableau/campos/definicion/1",
        "title": "Inspeccionar roles",
        "code": "",
        "external": true,
        "hint": "Abre ventas y localiza Region y Ventas.",
        "textOutput": "Region actúa como dimensión; Ventas como medida.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/campos/tipos-de-datos",
    "remember": "Un número que identifica una entidad puede ser una dimensión.",
    "examples": [
      {
        "id": "tableau/campos/tipos-de-datos/1",
        "title": "Cambiar tipo",
        "code": "",
        "external": true,
        "hint": "En Data Source cambia Fecha a Date si se detectó como texto.",
        "textOutput": "Fecha permite elegir años, meses y días.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/campos/dimensions-y-measures",
    "remember": "ClienteID identifica; Ventas se suma.",
    "examples": [
      {
        "id": "tableau/campos/dimensions-y-measures/1",
        "title": "Agrupar ventas",
        "code": "",
        "external": true,
        "hint": "Arrastra Region a Rows y Ventas a Text.",
        "textOutput": "Norte 700; Sur 1050.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/campos/discrete-y-continuous",
    "remember": "Azul no significa necesariamente dimensión.",
    "examples": [
      {
        "id": "tableau/campos/discrete-y-continuous/1",
        "title": "Cambiar una fecha",
        "code": "",
        "steps": [
          "Pon Fecha en Columns y selecciona Month discreto",
          "después Month continuo (date value)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Primero encabezados de mes; después eje temporal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/campos/measure-names-y-values",
    "remember": "Measure Names identifica la medida y Measure Values contiene sus valores.",
    "examples": [
      {
        "id": "tableau/campos/measure-names-y-values/1",
        "title": "Comparar ventas y costo",
        "code": "",
        "steps": [
          "Region en Rows, Measure Names en Columns, Measure Values en Text",
          "filtra Measure Names a Ventas y Costo."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Norte: 700 y 400; Sur: 1050 y 710.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/campos/count-de-tabla",
    "remember": "Contar líneas no equivale a contar pedidos.",
    "note": "Number of Records corresponde a modelos antiguos; no uses el campo Count generado dentro de otro cálculo.",
    "examples": [
      {
        "id": "tableau/campos/count-de-tabla/1",
        "title": "Contar registros",
        "code": "",
        "external": true,
        "hint": "Arrastra ventas(Count) a Text, en una fuente con ventas como única tabla.",
        "textOutput": "8 registros.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/campos/alias-y-propiedades",
    "remember": "Cambiar etiqueta no cambia el valor original.",
    "examples": [
      {
        "id": "tableau/campos/alias-y-propiedades/1",
        "title": "Renombrar etiqueta",
        "code": "",
        "steps": [
          "Clic derecho Region > Aliases y asigna Norte a Zona Norte",
          "crea una tabla regional."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Aparece Zona Norte con ventas 700.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/campos/carpetas-y-campos-ocultos",
    "remember": "Ocultar un campo no protege sus datos.",
    "examples": [
      {
        "id": "tableau/campos/carpetas-y-campos-ocultos/1",
        "title": "Organizar campos",
        "code": "",
        "steps": [
          "Crea carpeta Métricas y coloca Ventas y Costo",
          "oculta Entrega si no se usa en la hoja."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El panel queda organizado; las ventas no cambian.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
