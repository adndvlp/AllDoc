// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/stages-y-formatos-de-archivos/definicion",
    "remember": "Interno: almacenamiento de Snowflake; externo: bucket o contenedor cloud autorizado.",
    "examples": [
      {
        "id": "snowflake/stages-y-formatos-de-archivos/definicion/1",
        "title": "Preparar un stage de laboratorio",
        "language": "sql",
        "code": "CREATE STAGE IF NOT EXISTS DEMO_STAGE;\nSHOW STAGES LIKE 'DEMO_STAGE';",
        "hint": "",
        "textOutput": "Stage interno nombrado visible en PRACTICE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/stages-y-formatos-de-archivos/user-table-y-named-stage",
    "remember": "Cada tipo tiene permisos y usos distintos; el named stage puede reutilizarse entre tablas.",
    "note": "Crea DEMO_STAGE con la ficha Definición.",
    "examples": [
      {
        "id": "snowflake/stages-y-formatos-de-archivos/user-table-y-named-stage/1",
        "title": "Listar archivos de stages",
        "language": "sql",
        "code": "LIST @~;\nLIST @%ORDERS;\nLIST @DEMO_STAGE;",
        "hint": "",
        "textOutput": "Listado de archivos existentes en cada ubicación; vacío si no hay archivos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/stages-y-formatos-de-archivos/external-stage-y-storage-integration",
    "remember": "Restringe ubicaciones y configura confianza IAM con el proveedor.",
    "note": "Necesita infraestructura externa.",
    "examples": [
      {
        "id": "snowflake/stages-y-formatos-de-archivos/external-stage-y-storage-integration/1",
        "title": "Conectar un bucket de pruebas",
        "code": "",
        "steps": [
          "Un administrador crea la storage integration para el proveedor y prefijo permitido.",
          "Configura la confianza y permisos cloud según DESCRIBE INTEGRATION.",
          "Crea un external stage con URL y STORAGE_INTEGRATION.",
          "Ejecuta LIST sobre el stage."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Archivos del prefijo autorizado; los demás quedan fuera de alcance.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/stages-y-formatos-de-archivos/file-format-para-csv",
    "remember": "SKIP_HEADER omite encabezados; EMPTY_FIELD_AS_NULL convierte campos vacíos a NULL.",
    "examples": [
      {
        "id": "snowflake/stages-y-formatos-de-archivos/file-format-para-csv/1",
        "title": "Definir el formato del CSV compartido",
        "language": "sql",
        "code": "CREATE OR REPLACE FILE FORMAT DEMO_CSV TYPE=CSV SKIP_HEADER=1 FIELD_OPTIONALLY_ENCLOSED_BY='\"' EMPTY_FIELD_AS_NULL=TRUE;",
        "hint": "",
        "textOutput": "Formato nombrado listo para ventas.csv.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/stages-y-formatos-de-archivos/json-parquet-avro-orc-y-xml",
    "remember": "No uses opciones CSV para formatos binarios.",
    "examples": [
      {
        "id": "snowflake/stages-y-formatos-de-archivos/json-parquet-avro-orc-y-xml/1",
        "title": "Crear formatos para dos fuentes",
        "language": "sql",
        "code": "CREATE OR REPLACE FILE FORMAT DEMO_JSON TYPE=JSON;\nCREATE OR REPLACE FILE FORMAT DEMO_PARQUET TYPE=PARQUET;",
        "hint": "",
        "textOutput": "Dos formatos registrados; AVRO, ORC y XML también tienen tipos de formato propios.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/stages-y-formatos-de-archivos/put-get-list-y-remove",
    "remember": "PUT/GET requieren un cliente que los soporte y acceso al sistema de archivos local.",
    "note": "Conserva el archivo hasta completar los ejemplos COPY. En Snowsight también se puede cargar desde la interfaz si está habilitada.",
    "examples": [
      {
        "id": "snowflake/stages-y-formatos-de-archivos/put-get-list-y-remove/1",
        "title": "Subir el CSV y comprobarlo",
        "code": "",
        "steps": [
          "Crea DEMO_STAGE.",
          "En Snowflake CLI o un cliente compatible, ajusta la ruta y ejecuta PUT file:///ruta/ventas.csv @DEMO_STAGE AUTO_COMPRESS=FALSE OVERWRITE=TRUE;",
          "Ejecuta LIST @DEMO_STAGE;",
          "Para descargar, utiliza GET @DEMO_STAGE/ventas.csv file:///ruta/salida/;",
          "REMOVE @DEMO_STAGE/ventas.csv elimina el archivo cuando termines las fichas de carga."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El listado muestra ventas.csv después de PUT; GET crea una copia local; REMOVE lo retira.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
