// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/personalizacion-e-interactividad-avanzada/definicion",
    "remember": "Mantén métricas y unidades claras cuando cambie la selección.",
    "examples": [
      {
        "id": "powerbi/personalizacion-e-interactividad-avanzada/definicion/1",
        "title": "Cambiar medida del gráfico",
        "code": "",
        "steps": [
          "Modelado > Nuevo parámetro > Campos.",
          "Selecciona Ventas y Pedidos completados; agrega slicer y usa el parámetro como valores de barras por Categoria."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Con Ventas: 650/450; con Pedidos completados: 5/2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/personalizacion-e-interactividad-avanzada/field-parameters",
    "remember": "No es lo mismo que un parámetro de Power Query.",
    "examples": [
      {
        "id": "powerbi/personalizacion-e-interactividad-avanzada/field-parameters/1",
        "title": "Alternar agrupación",
        "code": "",
        "steps": [
          "Crea parámetro de campos con Clientes[Pais] y Productos[Categoria].",
          "Úsalo como eje de barras con Ventas y agrega slicer."
        ],
        "external": true,
        "hint": "",
        "textOutput": "País muestra Mexico 820 y Espana 280; categoría muestra 650 y 450.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/personalizacion-e-interactividad-avanzada/what-if-y-titulos-dinamicos",
    "remember": "La simulación no modifica ventas reales.",
    "examples": [
      {
        "id": "powerbi/personalizacion-e-interactividad-avanzada/what-if-y-titulos-dinamicos/1",
        "title": "Mostrar título según selección",
        "code": "",
        "steps": [
          "Crea medida Título categoría del grupo Modificar el contexto de filtro.",
          "En título del gráfico, botón fx > Valor de campo > Título categoría.",
          "Selecciona Muebles."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Título Ventas - Muebles; la medida Ventas sigue calculándose normalmente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/personalizacion-e-interactividad-avanzada/personalizar-visuales",
    "remember": "No es permiso de edición del informe ni del modelo.",
    "note": "Requiere Service para comprobar experiencia de lector.",
    "examples": [
      {
        "id": "powerbi/personalizacion-e-interactividad-avanzada/personalizar-visuales/1",
        "title": "Permitir cambiar una vista",
        "code": "",
        "steps": [
          "Activa Personalizar visuales en configuración del informe y en un gráfico compatible.",
          "Publica y prueba como lector."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El lector puede cambiar opciones admitidas sin alterar el informe original para otros usuarios.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/personalizacion-e-interactividad-avanzada/diseno-movil",
    "remember": "Prioriza métricas y controles esenciales.",
    "examples": [
      {
        "id": "powerbi/personalizacion-e-interactividad-avanzada/diseno-movil/1",
        "title": "Diseñar versión de teléfono",
        "code": "",
        "steps": [
          "Vista > Diseño móvil; coloca tarjetas y gráfico de tendencia en columna vertical."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Vista móvil organizada de arriba a abajo; escritorio conserva su distribución.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
