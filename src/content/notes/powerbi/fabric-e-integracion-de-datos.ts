// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/fabric-e-integracion-de-datos/definicion",
    "remember": "Power BI es una capa de análisis, no todo el ecosistema Fabric.",
    "examples": [
      {
        "id": "powerbi/fabric-e-integracion-de-datos/definicion/1",
        "title": "Elegir arquitectura",
        "code": "",
        "steps": [
          "Para un modelo con ventas en archivos Delta de Fabric, compara Import y Direct Lake en entorno de prueba autorizado."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Puedes elegir un modo compatible y evaluar actualización, rendimiento y permisos; no se presupone capacidad activa.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/fabric-e-integracion-de-datos/dataflows-y-dataflows-gen2",
    "remember": "Separa preparación compartida de cálculos del modelo.",
    "note": "Gen1 y Gen2 tienen diferencias de licencia, capacidad y destino; usa el tipo disponible.",
    "examples": [
      {
        "id": "powerbi/fabric-e-integracion-de-datos/dataflows-y-dataflows-gen2/1",
        "title": "Preparar productos reutilizables",
        "code": "",
        "steps": [
          "En workspace compatible crea dataflow de prueba, conecta Productos.csv desde un origen accesible al servicio.",
          "Tipa columnas y configura destino si Gen2.",
          "Ejecuta y conecta al resultado desde Desktop."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Tres productos en origen preparado si el flujo finaliza correctamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/fabric-e-integracion-de-datos/lakehouse-warehouse-y-direct-lake",
    "remember": "No es necesario copiar todos los datos a Import en escenarios Direct Lake compatibles.",
    "note": "Requiere Fabric y permisos/capacidad; comportamiento de Direct Lake depende de variante y configuración.",
    "examples": [
      {
        "id": "powerbi/fabric-e-integracion-de-datos/lakehouse-warehouse-y-direct-lake/1",
        "title": "Crear modelo desde Lakehouse",
        "code": "",
        "steps": [
          "En Fabric autorizado carga Pedidos como tabla Delta de un Lakehouse de prueba.",
          "Crea modelo semántico compatible en Direct Lake; añade dimensiones y relaciones equivalentes.",
          "Crea Importe."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Con datos completos y modelo equivalente, 1150 sin filtros; revisa modo efectivo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
