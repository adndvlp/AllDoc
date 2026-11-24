// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/rendimiento/definicion",
    "remember": "Mide antes de aumentar recursos o modificar límites.",
    "examples": [
      {
        "id": "airflow/rendimiento/definicion/1",
        "title": "Mover lectura de archivo a ejecución",
        "language": "python",
        "code": "@task\ndef leer():\n    return Path(\"/tmp/alldoc_airflow/orders.csv\").stat().st_size\nleer()",
        "hint": "La lectura no ocurre en cada importación del archivo DAG.",
        "textOutput": "Se devuelve el tamaño en bytes cuando corre la tarea.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/rendimiento/parsing-y-codigo-de-nivel-superior",
    "remember": "Evita llamadas HTTP, consultas SQL y Variable.get en nivel superior.",
    "examples": [
      {
        "id": "airflow/rendimiento/parsing-y-codigo-de-nivel-superior/1",
        "title": "Diferir la lectura de configuración",
        "language": "python",
        "code": "@task\ndef configurar():\n    return Variable.get(\"region\", default=\"MX\")\nconfigurar()",
        "hint": "Genera el grafo con configuración local ligera cuando sea posible.",
        "textOutput": "El acceso a la variable ocurre al ejecutar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/rendimiento/granularidad-y-paralelismo",
    "remember": "Elige una unidad de trabajo que permita reintentar sin repetir demasiado.",
    "examples": [
      {
        "id": "airflow/rendimiento/granularidad-y-paralelismo/1",
        "title": "Agrupar trabajo por lote",
        "language": "python",
        "code": "@task\ndef lote(ids):\n    return len(ids)\nlote.expand(ids=[[101,102],[103,104,105]])",
        "hint": "No metas datasets masivos en XCom; aquí solo hay cinco identificadores.",
        "textOutput": "Dos instancias retornan 2 y 3 en lugar de crear cinco tareas individuales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/rendimiento/optimizar-metadatos-y-dependencias",
    "remember": "No modifiques directamente tablas internas desde DAGs.",
    "examples": [
      {
        "id": "airflow/rendimiento/optimizar-metadatos-y-dependencias/1",
        "title": "Investigar scheduler lento",
        "code": "",
        "steps": [
          "Mide tiempo de parsing y retraso de scheduling.",
          "Comprueba conexiones y carga de la metadata DB.",
          "Revisa DAGs con miles de tareas o mapeos.",
          "Ajusta retención o límites siguiendo la guía oficial."
        ],
        "external": true,
        "hint": "La optimización concreta depende del entorno.",
        "textOutput": "Se identifica un cuello de botella medible antes de cambiar configuración.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
