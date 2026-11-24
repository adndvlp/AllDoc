// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/tasks-y-orquestacion/definicion",
    "remember": "Una task nueva se crea suspendida; actívala solo si quieres consumo programado.",
    "examples": [
      {
        "id": "snowflake/tasks-y-orquestacion/definicion/1",
        "title": "Crear una tarea manual de prueba",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_TASK_OUT(RUN_AT TIMESTAMP_LTZ);\nCREATE OR REPLACE TASK DEMO_TASK WAREHOUSE=ALLDOC_WH AS INSERT INTO DEMO_TASK_OUT VALUES(CURRENT_TIMESTAMP());\nSHOW TASKS LIKE 'DEMO_TASK';",
        "hint": "",
        "textOutput": "Task registrada en estado suspendido, tabla vacía.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/tasks-y-orquestacion/schedule-cron-y-ejecucion-manual",
    "remember": "La ejecución es asíncrona; revisa historial antes de esperar resultados.",
    "note": "Requiere la task de Definición y privilegios de ejecución.",
    "examples": [
      {
        "id": "snowflake/tasks-y-orquestacion/schedule-cron-y-ejecucion-manual/1",
        "title": "Probar la tarea creada",
        "language": "sql",
        "code": "EXECUTE TASK DEMO_TASK;\nSELECT * FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(TASK_NAME=>'DEMO_TASK',RESULT_LIMIT=>10));",
        "hint": "",
        "textOutput": "Tras completar con éxito, historial SUCCEEDED y una fila nueva en DEMO_TASK_OUT.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/tasks-y-orquestacion/triggered-tasks-y-system-stream-has-data",
    "remember": "La condición puede dar falsos positivos; el DML debe tolerar lotes vacíos.",
    "note": "Activar solo en laboratorio y suspender al terminar.",
    "examples": [
      {
        "id": "snowflake/tasks-y-orquestacion/triggered-tasks-y-system-stream-has-data/1",
        "title": "Vincular el stream append-only a una tarea",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_CDC(ID NUMBER);\nCREATE OR REPLACE STREAM DEMO_STREAM ON TABLE DEMO_CDC APPEND_ONLY=TRUE;\nCREATE OR REPLACE TABLE DEMO_CDC_OUT(ID NUMBER);\nCREATE OR REPLACE TASK DEMO_TRIGGER WAREHOUSE=ALLDOC_WH WHEN SYSTEM$STREAM_HAS_DATA('DEMO_STREAM') AS INSERT INTO DEMO_CDC_OUT SELECT ID FROM DEMO_STREAM;",
        "hint": "",
        "textOutput": "Task suspendida y preparada; al reanudarla e insertar un ID en DEMO_CDC, puede consumirlo y guardarlo en DEMO_CDC_OUT.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/tasks-y-orquestacion/task-graphs-y-dependencias",
    "remember": "Las dependencias evitan transformar antes de cargar; habilita hijos antes de la raíz.",
    "examples": [
      {
        "id": "snowflake/tasks-y-orquestacion/task-graphs-y-dependencias/1",
        "title": "Encadenar carga y control",
        "language": "sql",
        "code": "CREATE OR REPLACE TASK DEMO_ROOT WAREHOUSE=ALLDOC_WH AS SELECT 1;\nCREATE OR REPLACE TASK DEMO_CHILD WAREHOUSE=ALLDOC_WH AFTER DEMO_ROOT AS SELECT 2;\nSHOW TASKS;",
        "hint": "",
        "textOutput": "Dos tasks suspendidas, con DEMO_CHILD dependiente de DEMO_ROOT.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/tasks-y-orquestacion/serverless-errores-y-limpieza",
    "remember": "Serverless no usa el presupuesto del warehouse como si fuera el mismo recurso.",
    "note": "Para una task serverless omite WAREHOUSE al crearla y configura permisos/recursos según el caso; consulta historial antes de borrar.",
    "examples": [
      {
        "id": "snowflake/tasks-y-orquestacion/serverless-errores-y-limpieza/1",
        "title": "Detener una tarea de prueba",
        "language": "sql",
        "code": "ALTER TASK DEMO_TASK SUSPEND;\nDROP TASK IF EXISTS DEMO_TASK;",
        "hint": "",
        "textOutput": "Se detiene la programación y se elimina la task; no borra DEMO_TASK_OUT.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
