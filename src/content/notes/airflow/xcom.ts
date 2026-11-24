// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/xcom/definicion",
    "remember": "No uses XCom para mover DataFrames grandes ni archivos completos.",
    "examples": [
      {
        "id": "airflow/xcom/definicion/1",
        "title": "Pasar la cantidad de pedidos",
        "language": "python",
        "code": "@task\ndef contar():\n    return 5\n@task\ndef reportar(n):\n    print(f\"Pedidos: {n}\")\nreportar(contar())",
        "hint": "TaskFlow publica y recupera automáticamente el retorno.",
        "textOutput": "El log imprime Pedidos: 5.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/xcom/xcom-push-y-xcom-pull",
    "remember": "Las claves pertenecen a la tarea y ejecución correspondientes.",
    "examples": [
      {
        "id": "airflow/xcom/xcom-push-y-xcom-pull/1",
        "title": "Compartir un identificador de lote",
        "language": "python",
        "code": "@task\ndef producir():\n    get_current_context()[\"ti\"].xcom_push(key=\"lote\", value=\"2026-09-01\")\n@task\ndef consumir():\n    ti = get_current_context()[\"ti\"]\n    print(ti.xcom_pull(task_ids=\"producir\", key=\"lote\"))\nproducir() >> consumir()",
        "hint": "Declara también la dependencia al usar push/pull explícito.",
        "textOutput": "consumir imprime 2026-09-01.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/xcom/output-y-xcomarg",
    "remember": "Pasa la referencia, no intentes convertirla en valor durante parsing.",
    "examples": [
      {
        "id": "airflow/xcom/output-y-xcomarg/1",
        "title": "Combinar operator clásico y TaskFlow",
        "language": "python",
        "code": "def obtener():\n    return 4\na = PythonOperator(task_id=\"obtener\", python_callable=obtener)\n@task\ndef duplicar(n):\n    return n * 2\nduplicar(a.output)",
        "hint": "El vínculo entre tareas se crea por la referencia al retorno.",
        "textOutput": "duplicar retorna 8.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/xcom/almacenamiento-compartido",
    "remember": "Una ruta local solo funciona si el consumidor puede acceder al mismo archivo.",
    "examples": [
      {
        "id": "airflow/xcom/almacenamiento-compartido/1",
        "title": "Pasar la ruta de un reporte local",
        "language": "python",
        "code": "@task\ndef generar():\n    p = Path(\"/tmp/alldoc_airflow/reporte.txt\")\n    p.write_text(\"ventas=3000\")\n    return str(p)\n@task\ndef leer(ruta):\n    print(Path(ruta).read_text())\nleer(generar())",
        "hint": "En producción usa una clave por run en object storage y no una ruta fija compartida.",
        "textOutput": "Imprime ventas=3000 en el laboratorio local.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/xcom/object-storage-xcom-backend",
    "remember": "Configura el backend, la conexión y políticas de retención antes de enviar datos.",
    "note": "Requiere common-io, amazon, conexión mi_s3 y bucket real; sustituye nombres.",
    "examples": [
      {
        "id": "airflow/xcom/object-storage-xcom-backend/1",
        "title": "Configurar almacenamiento híbrido",
        "language": "text",
        "code": "AIRFLOW__CORE__XCOM_BACKEND=airflow.providers.common.io.xcom.backend.XComObjectStorageBackend\nAIRFLOW__COMMON_IO__XCOM_OBJECTSTORAGE_PATH=s3://mi_s3@bucket-de-prueba/xcom\nAIRFLOW__COMMON_IO__XCOM_OBJECTSTORAGE_THRESHOLD=1048576",
        "hint": "Son variables de configuración para los componentes, no código de una tarea.",
        "textOutput": "Los valores serializados mayores al umbral se almacenan externamente si el backend y el acceso funcionan.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/xcom/serializacion",
    "remember": "Prefiere listas, diccionarios y escalares.",
    "examples": [
      {
        "id": "airflow/xcom/serializacion/1",
        "title": "Retornar metadatos simples",
        "language": "python",
        "code": "@task\ndef meta():\n    return {\"filas\": 5, \"archivo\": \"orders.csv\"}\nmeta()",
        "hint": "Evita retornar conexiones abiertas, cursores o archivos.",
        "textOutput": "XCom contiene los metadatos del lote.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
