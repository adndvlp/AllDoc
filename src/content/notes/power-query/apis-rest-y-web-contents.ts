// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/apis-rest-y-web-contents/definicion",
    "remember": "La descarga y el análisis de JSON son pasos distintos.",
    "examples": [
      {
        "id": "power-query/apis-rest-y-web-contents/definicion/1",
        "title": "Simular la respuesta JSON de una API",
        "language": "powerquery",
        "code": "let Respuesta = Text.ToBinary(\"{\"\"datos\"\":[{\"\"id\"\":1,\"\"importe\"\":100}]}\"), J = Json.Document(Respuesta) in Table.FromRecords(J[datos])",
        "hint": "Se usa una respuesta local reproducible en lugar de un servicio externo.",
        "textOutput": "Una fila (1,100). No se realizó una petición HTTP.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/apis-rest-y-web-contents/ruta-relativa-y-parametros-http",
    "remember": "Usa parámetros de URL en vez de concatenarlos sin codificación.",
    "note": "No se requiere una API para este ejemplo. En una petición real, verifica endpoint, autenticación y límites del proveedor.",
    "examples": [
      {
        "id": "power-query/apis-rest-y-web-contents/ruta-relativa-y-parametros-http/1",
        "title": "Preparar una URL de petición",
        "language": "powerquery",
        "code": "Uri.BuildQueryString([pagina=\"2\", limite=\"100\"])",
        "hint": "En una petición real se pueden pasar esos campos mediante Query=[pagina=\"2\", limite=\"100\"] a Web.Contents, junto con RelativePath.",
        "textOutput": "Texto de consulta equivalente a pagina=2&limite=100; el orden de parámetros no cambia su significado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/apis-rest-y-web-contents/autenticacion-y-credenciales",
    "remember": "No incrustes contraseñas, tokens o claves reales en código M ni en documentación.",
    "note": "El método exacto depende de la API; OAuth personalizado puede requerir un conector específico.",
    "examples": [
      {
        "id": "power-query/apis-rest-y-web-contents/autenticacion-y-credenciales/1",
        "title": "Configurar acceso a una API de prueba",
        "code": "",
        "steps": [
          "Usa una API HTTPS autorizada cuya documentación indique una clave en la URL",
          "Configura el conector Web y el método Web API si es compatible",
          "Cuando corresponda, usa ApiKeyName en Web.Contents para el nombre del parámetro, no para el secreto"
        ],
        "external": true,
        "hint": "La clave se configura en el almacén de credenciales.",
        "textOutput": "Una petición autorizada devuelve datos según el contrato de la API; sin credenciales válidas puede fallar.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/apis-rest-y-web-contents/paginacion",
    "remember": "No supongas que una primera respuesta contiene todos los registros.",
    "note": "Si el proveedor usa cursor o next link, cambia la condición de avance y fin; respeta límites de llamadas.",
    "examples": [
      {
        "id": "power-query/apis-rest-y-web-contents/paginacion/1",
        "title": "Combinar páginas simuladas",
        "language": "powerquery",
        "code": "let Paginas = {{[id=1],[id=2]},{[id=3]},{}}, Obtener = (n as number) => Paginas{n}, Lotes = List.Generate(()=>[n=0,lote=Obtener(0)], each not List.IsEmpty([lote]), each [n=[n]+1,lote=Obtener([n]+1)], each [lote]) in Table.FromRecords(List.Combine(Lotes))",
        "hint": "La última página vacía detiene la generación.",
        "textOutput": "3 filas, ids 1,2,3; no se llama a una API real.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/apis-rest-y-web-contents/errores-http-y-respuestas-inesperadas",
    "remember": "Una respuesta inválida no significa que el origen esté vacío.",
    "note": "En HTTP real, sigue el procedimiento de reintentos del proveedor; algunos estados son administrados por el motor y otros tienen restricciones de conector.",
    "examples": [
      {
        "id": "power-query/apis-rest-y-web-contents/errores-http-y-respuestas-inesperadas/1",
        "title": "Detectar un JSON con estructura inesperada",
        "language": "powerquery",
        "code": "let J = Json.Document(\"{\"\"error\"\":\"\"limite de tasa\"\"}\") in if Record.HasFields(J,\"datos\") then J[datos] else error \"Respuesta sin campo datos\"",
        "hint": "Se valida el contrato esperado antes de expandir.",
        "textOutput": "Error con el mensaje Respuesta sin campo datos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
