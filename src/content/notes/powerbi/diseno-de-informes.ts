// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/diseno-de-informes/definicion",
    "remember": "Define la pregunta antes de escoger visual.",
    "examples": [
      {
        "id": "powerbi/diseno-de-informes/definicion/1",
        "title": "Construir resumen ejecutivo",
        "code": "",
        "steps": [
          "Crea una página Resumen, agrega tarjeta Ventas, tarjeta Pedidos completados y barras por Categoria.",
          "Usa títulos que indiquen qué mide cada gráfico."
        ],
        "external": true,
        "hint": "",
        "textOutput": "1100 ventas, 7 pedidos completados y barras 650/450.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/diseno-de-informes/campos-y-agregacion-de-visuales",
    "remember": "Evita sumar identificadores.",
    "examples": [
      {
        "id": "powerbi/diseno-de-informes/campos-y-agregacion-de-visuales/1",
        "title": "Mostrar pedidos sin sumar ID",
        "code": "",
        "steps": [
          "Agrega tabla con PedidoID, Fecha y Estado.",
          "Si PedidoID se resume, selecciona No resumir."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ocho pedidos individuales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/diseno-de-informes/formato-y-temas",
    "remember": "Mantén significado de colores consistente.",
    "examples": [
      {
        "id": "powerbi/diseno-de-informes/formato-y-temas/1",
        "title": "Aplicar estilo al informe",
        "code": "",
        "steps": [
          "Vista > Temas, elige un tema integrado.",
          "Selecciona tarjeta Ventas y ajusta unidades de visualización a Ninguna."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La tarjeta muestra 1100, no 1.1 mil si eliges esa unidad; el tema cambia su aspecto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/diseno-de-informes/diseno-de-pagina-y-storytelling",
    "remember": "El contexto del dato importa tanto como su forma.",
    "examples": [
      {
        "id": "powerbi/diseno-de-informes/diseno-de-pagina-y-storytelling/1",
        "title": "Crear página de seguimiento",
        "code": "",
        "steps": [
          "Configura página 16:9.",
          "Coloca tarjetas arriba, tendencia mensual al centro y desglose por país debajo.",
          "Añade texto que indique que Ventas excluye cancelados."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Una página con resumen, evolución y detalle; la definición evita confundir 1100 con 1150.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/diseno-de-informes/accesibilidad",
    "remember": "No comuniques un estado únicamente mediante color.",
    "examples": [
      {
        "id": "powerbi/diseno-de-informes/accesibilidad/1",
        "title": "Hacer legible un gráfico",
        "code": "",
        "steps": [
          "Añade texto alternativo a barras por categoría; activa etiquetas; revisa contraste y orden de tabulación en panel Selección."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se distinguen nombres y valores 650/450 incluso sin interpretar colores.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
