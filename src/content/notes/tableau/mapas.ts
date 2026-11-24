// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/mapas/definicion",
    "remember": "Region Norte/Sur no es un país geocodificable por sí solo.",
    "examples": [
      {
        "id": "tableau/mapas/definicion/1",
        "title": "Ventas por país",
        "code": "",
        "steps": [
          "Relaciona clientes y ventas",
          "asigna Geographic Role > Country/Region a Pais",
          "doble clic en Pais y arrastra SUM(Ventas) a Size."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Marcas para Mexico, Spain y United States.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/mapas/roles-geograficos-y-ubicaciones",
    "remember": "Añade contexto de país para ciudades ambiguas.",
    "examples": [
      {
        "id": "tableau/mapas/roles-geograficos-y-ubicaciones/1",
        "title": "Corregir rol",
        "code": "",
        "steps": [
          "En fuente clientes asigna Country/Region a Pais y abre mapa",
          "revisa indicador de ubicaciones desconocidas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Los tres países del dataset son reconocibles.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/mapas/mapas-de-simbolos-y-rellenos",
    "remember": "No uses área geográfica como sustituto de valor.",
    "examples": [
      {
        "id": "tableau/mapas/mapas-de-simbolos-y-rellenos/1",
        "title": "Mapa relleno",
        "code": "",
        "steps": [
          "Usa Pais con fuente relacionada y elige Filled Map en Show Me",
          "Ventas en Color."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Mexico tiene el mayor valor: 1400.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
