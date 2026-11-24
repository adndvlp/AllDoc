// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/carga-actualizacion-y-credenciales/definicion",
    "remember": "Editar la consulta no equivale a cargarla ni a editar el origen.",
    "examples": [
      {
        "id": "power-query/carga-actualizacion-y-credenciales/definicion/1",
        "title": "Cargar una consulta de pedidos",
        "code": "",
        "steps": [
          "En Power BI Desktop selecciona Pedidos y confirma que la carga esté habilitada",
          "Inicio > Cerrar y aplicar",
          "Abre la vista de tabla o modelo"
        ],
        "external": true,
        "hint": "En Excel, Cerrar y cargar permite enviar resultados a una hoja u otros destinos compatibles.",
        "textOutput": "La tabla cargada tiene 7 filas y 6 columnas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/carga-actualizacion-y-credenciales/carga-de-consultas-auxiliares",
    "remember": "Deshabilitar la carga no elimina sus dependencias.",
    "examples": [
      {
        "id": "power-query/carga-actualizacion-y-credenciales/carga-de-consultas-auxiliares/1",
        "title": "Cargar solo la salida filtrada",
        "code": "",
        "steps": [
          "Crea PedidosValidos como referencia de Pedidos y filtra completado",
          "En Power BI Desktop desactiva Habilitar carga para Pedidos y mantenla para PedidosValidos",
          "Cierra y aplica"
        ],
        "external": true,
        "hint": "En Excel puede usarse Solo crear conexión para consultas auxiliares, según versión.",
        "textOutput": "PedidosValidos aparece cargada con 5 filas; Pedidos sigue disponible como consulta auxiliar.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/carga-actualizacion-y-credenciales/actualizar-vista-previa-o-destino",
    "remember": "La vista previa y los datos cargados pueden estar en estados diferentes.",
    "examples": [
      {
        "id": "power-query/carga-actualizacion-y-credenciales/actualizar-vista-previa-o-destino/1",
        "title": "Comprobar cambios de origen",
        "code": "",
        "steps": [
          "Crea una consulta de prueba con #table({\"id\"},{{1},{2}}) y cárgala",
          "Edita el origen literal para incluir {3}",
          "Observa la vista previa y aplica o carga los cambios"
        ],
        "external": true,
        "hint": "En una fuente externa, modificar el archivo y actualizar produce un efecto equivalente.",
        "textOutput": "Vista previa: 3 filas; después de aplicar, destino: 3 filas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/carga-actualizacion-y-credenciales/configuracion-del-origen",
    "remember": "No compartas secretos ni borres permisos sin entender qué consultas los usan.",
    "examples": [
      {
        "id": "power-query/carga-actualizacion-y-credenciales/configuracion-del-origen/1",
        "title": "Revisar un origen local",
        "code": "",
        "steps": [
          "Importa ventas.xlsx del ejemplo de Excel",
          "Abre Configuración de origen de datos",
          "Selecciona ese origen y revisa ruta y permisos"
        ],
        "external": true,
        "hint": "Al mover el archivo, cambia la referencia al origen y prueba de nuevo.",
        "textOutput": "La consulta usa la ruta configurada y muestra dos filas si el archivo existe y tiene los datos de prueba.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/carga-actualizacion-y-credenciales/gateway-y-actualizacion-programada",
    "remember": "Publicar un informe no garantiza que el servicio pueda leer el origen.",
    "examples": [
      {
        "id": "power-query/carga-actualizacion-y-credenciales/gateway-y-actualizacion-programada/1",
        "title": "Configurar una actualización de SQL local",
        "code": "",
        "steps": [
          "Publica un modelo de prueba con datos de un SQL Server local autorizado",
          "En la configuración del modelo semántico asigna un gateway y credenciales válidas",
          "Ejecuta Actualizar ahora y revisa el historial antes de programar horarios"
        ],
        "external": true,
        "hint": "Requiere gateway accesible, permisos y configuración del servicio.",
        "textOutput": "La actualización de prueba figura como correcta y refleja los datos vigentes si todos los requisitos se cumplen.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
