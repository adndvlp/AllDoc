// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/actualizacion-y-gateways/definicion",
    "remember": "Actualizar visual no siempre actualiza el modelo.",
    "note": "No aplica a una tabla introducida manualmente: usa CSV conectado; restaura el archivo de prueba.",
    "examples": [
      {
        "id": "powerbi/actualizacion-y-gateways/definicion/1",
        "title": "Actualizar un CSV",
        "code": "",
        "steps": [
          "En modelo de prueba que importa CSV externo añade una fila válida al archivo.",
          "En Desktop pulsa Actualizar.",
          "Compara recuento anterior y posterior."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Si el archivo tenía ocho pedidos y agregaste uno, la tarjeta Pedidos total pasa a nueve.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/actualizacion-y-gateways/scheduled-refresh",
    "remember": "Configura credenciales, gateway si aplica y horario.",
    "examples": [
      {
        "id": "powerbi/actualizacion-y-gateways/scheduled-refresh/1",
        "title": "Programar actualización",
        "code": "",
        "steps": [
          "En modelo publicado de prueba abre Configuración > Credenciales de origen y Actualización programada.",
          "Configura un horario autorizado.",
          "Revisa historial después de una ejecución real."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Aparece ejecución programada y su estado; no garantiza éxito hasta comprobar historial.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/actualizacion-y-gateways/gateway-local",
    "remember": "Servidor y base deben coincidir con la conexión del modelo.",
    "examples": [
      {
        "id": "powerbi/actualizacion-y-gateways/gateway-local/1",
        "title": "Vincular SQL Server local",
        "code": "",
        "steps": [
          "Con administrador autorizado instala/configura gateway estándar en máquina accesible al origen.",
          "Registra origen SQL Server con credenciales permitidas y asigna conexión al modelo."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El modelo muestra una conexión de gateway válida si red, credenciales y permisos son correctos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/actualizacion-y-gateways/historial-y-errores-de-actualizacion",
    "remember": "Investiga el mensaje antes de cambiar credenciales o pasos.",
    "examples": [
      {
        "id": "powerbi/actualizacion-y-gateways/historial-y-errores-de-actualizacion/1",
        "title": "Diagnosticar columna renombrada",
        "code": "",
        "steps": [
          "En copia local de un CSV conectado cambia encabezado Precio a PrecioNuevo; actualiza consulta que esperaba Precio.",
          "Revisa error y restaura encabezado."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La consulta dependiente de Precio puede fallar; al restaurar el esquema, vuelve a cargar si no hay otros errores.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/actualizacion-y-gateways/incremental-refresh",
    "remember": "Filtra >= RangeStart y < RangeEnd para evitar solapamientos.",
    "examples": [
      {
        "id": "powerbi/actualizacion-y-gateways/incremental-refresh/1",
        "title": "Configurar política temporal",
        "code": "",
        "steps": [
          "Usa tabla de prueba con FechaHora DateTime y origen plegable.",
          "Crea parámetros DateTime RangeStart/RangeEnd; filtra rango semiabierto.",
          "Configura política y publica en entorno compatible."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Después de actualización inicial en Service se crean particiones conforme a política; no es una ejecución comprobada aquí.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/actualizacion-y-gateways/automatic-page-refresh",
    "remember": "No sustituye actualización de datos Import.",
    "note": "Requiere origen/modo compatible y permisos de capacidad; no está disponible igual para todos los modelos.",
    "examples": [
      {
        "id": "powerbi/actualizacion-y-gateways/automatic-page-refresh/1",
        "title": "Configurar página en DirectQuery",
        "code": "",
        "steps": [
          "En informe de prueba conectado mediante DirectQuery selecciona página > Formato > Actualización de página.",
          "Configura intervalo permitido.",
          "Prueba cambios en origen."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Los visuales consultan de nuevo según intervalo y límites de capacidad.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
