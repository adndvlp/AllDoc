// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/connections-hooks/definicion",
    "remember": "El DAG usa conn_id y el hook obtiene las credenciales durante la ejecución.",
    "examples": [
      {
        "id": "airflow/connections-hooks/definicion/1",
        "title": "Consultar una conexión sin revelar contraseña",
        "language": "python",
        "code": "@task\ndef verificar():\n    conn = Connection.get(\"ventas_pg\")\n    print(conn.conn_type)\nverificar()",
        "hint": "Crea ventas_pg con el tipo Postgres antes de ejecutar. No imprimas el objeto completo.",
        "textOutput": "Imprime postgres si existe la conexión de ejemplo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/connections-hooks/crear-una-conexion",
    "remember": "No guardes credenciales reales en los archivos DAG.",
    "note": "Requiere PostgreSQL y provider postgres.",
    "examples": [
      {
        "id": "airflow/connections-hooks/crear-una-conexion/1",
        "title": "Configurar PostgreSQL de laboratorio",
        "code": "",
        "steps": [
          "En Admin → Connections, añade ventas_pg.",
          "Tipo Postgres, host y puerto de tu instancia, base, usuario y contraseña de prueba.",
          "Guarda y ejecuta la consulta de prueba del grupo Operators."
        ],
        "external": true,
        "hint": "La forma exacta de la UI depende del auth manager.",
        "textOutput": "La tarea conecta si la red y los permisos son correctos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/connections-hooks/postgreshook",
    "remember": "Crea el hook dentro de la tarea.",
    "note": "Requiere provider postgres.",
    "examples": [
      {
        "id": "airflow/connections-hooks/postgreshook/1",
        "title": "Recuperar un escalar",
        "language": "python",
        "code": "@task\ndef consultar():\n    from airflow.providers.postgres.hooks.postgres import PostgresHook\n    return PostgresHook(postgres_conn_id=\"ventas_pg\").get_first(\"SELECT 42\")[0]\nconsultar()",
        "hint": "get_first recupera la primera fila.",
        "textOutput": "Retorna 42 si la conexión está configurada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/connections-hooks/airflow-conn",
    "remember": "El identificador se escribe en mayúsculas en el nombre de la variable.",
    "note": "No uses credenciales reales en el historial de shell.",
    "examples": [
      {
        "id": "airflow/connections-hooks/airflow-conn/1",
        "title": "Definir una conexión local de prueba",
        "language": "bash",
        "code": "export AIRFLOW_CONN_LOCAL_FS='{\"conn_type\":\"fs\",\"extra\":{\"path\":\"/tmp/alldoc_airflow\"}}'",
        "hint": "Define la variable antes de arrancar los procesos que la necesitan.",
        "textOutput": "FileSensor con fs_conn_id=local_fs puede resolver esa ruta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/connections-hooks/secrets-backends",
    "remember": "El DAG conserva el conn_id aunque cambie el lugar donde vive el secreto.",
    "note": "Requiere un gestor de secretos real.",
    "examples": [
      {
        "id": "airflow/connections-hooks/secrets-backends/1",
        "title": "Migrar una conexión a un gestor de secretos",
        "code": "",
        "steps": [
          "Instala el provider del gestor.",
          "Configura [secrets] backend y backend_kwargs según su documentación.",
          "Registra ventas_pg bajo la ruta definida por el backend.",
          "Ejecuta SELECT 42 mediante PostgresHook."
        ],
        "external": true,
        "hint": "Valida los permisos y la precedencia de resolución en el entorno.",
        "textOutput": "La tarea funciona sin una contraseña escrita en el DAG.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
