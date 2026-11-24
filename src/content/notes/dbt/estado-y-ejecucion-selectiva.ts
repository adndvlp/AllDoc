// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/definicion",
    "remember": "Guardar el estado fuera de target para evitar sobrescribirlo.",
    "examples": [
      {
        "id": "dbt/estado-y-ejecucion-selectiva/definicion/1",
        "title": "Conservar un estado inicial",
        "language": "bash",
        "code": "dbt build\nmkdir -p state\ncp target/manifest.json state/manifest.json",
        "hint": "Guardar el estado fuera de target para evitar sobrescribirlo.",
        "textOutput": "state/manifest.json conserva la definición base para comparaciones posteriores.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/state-modified-y-state-new",
    "remember": "Compara definiciones, no necesariamente cambios en filas de origen.",
    "examples": [
      {
        "id": "dbt/estado-y-ejecucion-selectiva/state-modified-y-state-new/1",
        "title": "Detectar cambios después de editar un modelo",
        "language": "bash",
        "code": "dbt ls --state state --select state:modified",
        "hint": "Compara definiciones, no necesariamente cambios en filas de origen.",
        "textOutput": "Lista nodos cuya definición relevante cambió; si se añade lab_example, state:new lo identifica.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/defer-y-state",
    "remember": "No apunta automáticamente todos los modelos a producción; requiere permisos y relaciones disponibles.",
    "note": "Para Slim CI real, conservar un manifest de producción y un target CI separado. --favor-state prioriza el estado para referencias elegibles.",
    "examples": [
      {
        "id": "dbt/estado-y-ejecucion-selectiva/defer-y-state/1",
        "title": "Construir únicamente cambios y sus descendientes",
        "language": "bash",
        "code": "dbt build --select state:modified+ --defer --state state",
        "hint": "No apunta automáticamente todos los modelos a producción; requiere permisos y relaciones disponibles.",
        "textOutput": "Los refs no seleccionados pueden resolverse a relaciones del estado; en laboratorio apunta al mismo entorno si el manifest proviene de dev.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/dbt-clone",
    "remember": "No asumir zero-copy en PostgreSQL ni clonar sobre producción.",
    "note": "Definir ci como copia del perfil dev con schema dbt_ci; usar manifest de una relación existente.",
    "examples": [
      {
        "id": "dbt/estado-y-ejecucion-selectiva/dbt-clone/1",
        "title": "Clonar un mart a un entorno aislado",
        "language": "bash",
        "code": "dbt clone --select customer_revenue --state state --target ci",
        "hint": "No asumir zero-copy en PostgreSQL ni clonar sobre producción.",
        "textOutput": "Si existe target ci distinto y el adaptador admite la operación, aparece una relación en el esquema CI basada en la del estado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/result-error-y-result-fail",
    "remember": "result:fail suele corresponder a tests; result:error a errores de ejecución.",
    "examples": [
      {
        "id": "dbt/estado-y-ejecucion-selectiva/result-error-y-result-fail/1",
        "title": "Listar errores de ejecución anteriores",
        "language": "bash",
        "code": "mkdir -p failed_state\ncp target/run_results.json failed_state/\ndbt ls --state failed_state --select result:error",
        "hint": "result:fail suele corresponder a tests; result:error a errores de ejecución.",
        "textOutput": "Lista nodos en error del artefacto guardado; si no hubo errores, lista vacía.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/state-aware-orchestration-y-dbt-state",
    "remember": "No es lo mismo que state:modified con un manifest local; disponibilidad y comportamiento dependen de producto y versión.",
    "examples": [
      {
        "id": "dbt/estado-y-ejecucion-selectiva/state-aware-orchestration-y-dbt-state/1",
        "title": "Evaluar una ejecución",
        "language": "text",
        "code": "Habilitar State en entorno compatible → declarar frescura/inputs → ejecutar job → inspeccionar decisiones por nodo",
        "hint": "En entornos compatibles, el motor puede evaluar cambios de lógica y frescura a nivel de nodo para decidir reutilizar, clonar o reconstruir.",
        "textOutput": "Un nodo sin cambios puede reutilizarse; un nodo con entrada o lógica modificada puede reconstruirse. No se garantiza un ahorro concreto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
