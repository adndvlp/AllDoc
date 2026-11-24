// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/testing/definicion",
    "remember": "Prueba primero la lógica aislada y luego el DAG completo.",
    "examples": [
      {
        "id": "airflow/testing/definicion/1",
        "title": "Detectar un error de importación",
        "language": "bash",
        "code": "airflow dags list-import-errors",
        "hint": "Si aparece un error, corrígelo antes de probar ejecuciones.",
        "textOutput": "Sin errores se muestra una lista vacía o mensaje equivalente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/testing/prueba-unitaria-y-pytest",
    "remember": "No conviertas cada prueba de lógica en un DAG Run.",
    "examples": [
      {
        "id": "airflow/testing/prueba-unitaria-y-pytest/1",
        "title": "Verificar ventas completadas",
        "language": "python",
        "code": "# test_ventas.py, archivo independiente\ndef sumar(filas):\n    return sum(r[\"amount\"] for r in filas if r[\"status\"] == \"completed\")\ndef test_sumar():\n    assert sumar([{\"amount\":100,\"status\":\"completed\"},{\"amount\":50,\"status\":\"cancelled\"}]) == 100",
        "hint": "Instala pytest en un entorno de pruebas y ejecuta el comando desde ese directorio.",
        "textOutput": "pytest test_ventas.py pasa una prueba.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/testing/mocking",
    "remember": "Prueba las decisiones de tu código, no el servicio simulado.",
    "examples": [
      {
        "id": "airflow/testing/mocking/1",
        "title": "Simular un cliente de datos",
        "language": "python",
        "code": "# test_cliente.py, archivo independiente\nfrom unittest.mock import Mock\ndef contar(cliente):\n    return len(cliente.obtener())\ndef test_contar():\n    cliente = Mock()\n    cliente.obtener.return_value = [101,102]\n    assert contar(cliente) == 2\n    cliente.obtener.assert_called_once()",
        "hint": "El mock reproduce una respuesta conocida.",
        "textOutput": "pytest test_cliente.py pasa una prueba sin conexión externa.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/testing/dagbag-e-importacion",
    "remember": "Prefiere interfaces públicas para pruebas que deban sobrevivir actualizaciones.",
    "examples": [
      {
        "id": "airflow/testing/dagbag-e-importacion/1",
        "title": "Comprobar que un DAG es visible",
        "language": "bash",
        "code": "airflow dags list\nairflow dags list-import-errors",
        "hint": "En Airflow 2.10 puedes usar DagBag.import_errors en pruebas de estructura; no lo trates como API pública estable de Airflow 3.",
        "textOutput": "El dag_id esperado figura en la lista y no hay errores de importación.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/testing/airflow-tasks-test",
    "remember": "No equivale a una ejecución orquestada completa.",
    "examples": [
      {
        "id": "airflow/testing/airflow-tasks-test/1",
        "title": "Probar una tarea aislada",
        "language": "bash",
        "code": "airflow tasks test ventas_manual inicio 2026-09-01",
        "hint": "Crea antes ventas_manual; usa una tarea sin XCom upstream ni escrituras peligrosas.",
        "textOutput": "Se ejecuta inicio y se muestran sus logs.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/testing/airflow-dags-test-y-dag-test",
    "remember": "Las tareas pueden tener efectos secundarios reales aunque estés probando.",
    "examples": [
      {
        "id": "airflow/testing/airflow-dags-test-y-dag-test/1",
        "title": "Probar un DAG completo",
        "language": "bash",
        "code": "airflow dags test ventas_manual 2026-09-01",
        "hint": "Para Python también existe demo.test() bajo if __name__ == \"__main__\" en el archivo de DAG.",
        "textOutput": "La tarea inicio termina success si el entorno está correcto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/testing/pruebas-de-integracion",
    "remember": "Utiliza recursos aislados de producción.",
    "examples": [
      {
        "id": "airflow/testing/pruebas-de-integracion/1",
        "title": "Probar una conexión PostgreSQL",
        "code": "",
        "steps": [
          "Crea una base de datos de laboratorio y registra ventas_pg.",
          "Ejecuta la ficha PostgresHook con SELECT 42.",
          "Comprueba el retorno y el estado."
        ],
        "external": true,
        "hint": "Si falla, revisa red, autenticación, provider y permisos.",
        "textOutput": "El retorno debe ser 42 y la instancia success.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
