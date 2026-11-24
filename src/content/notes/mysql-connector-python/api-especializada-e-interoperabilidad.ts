// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/definicion",
    "remember": "Prefiere connect, cursor y execute sobre detalles internos del protocolo.",
    "examples": [
      {
        "id": "mysql-connector-python/api-especializada-e-interoperabilidad/definicion/1",
        "title": "Consultar las clases disponibles",
        "language": "python",
        "code": "from mysql.connector import constants, conversion, errors, pooling\nprint(constants.FieldType.LONG, conversion.MySQLConverter.__name__)",
        "hint": "",
        "textOutput": "3 MySQLConverter.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/constantes",
    "remember": "Los tipos SQL y códigos del protocolo no son lo mismo que las clases Python.",
    "examples": [
      {
        "id": "mysql-connector-python/api-especializada-e-interoperabilidad/constantes/1",
        "title": "Traducir el código de tipo de una columna",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    from mysql.connector.constants import FieldType\n    cur.execute(\"SELECT customer_id FROM customers LIMIT 1\")\n    print(FieldType.get_info(cur.description[0][1]))",
        "hint": "",
        "textOutput": "LONG para la columna INT.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/metadatos-del-servidor",
    "remember": "Filtra por esquema; la visibilidad depende de permisos.",
    "examples": [
      {
        "id": "mysql-connector-python/api-especializada-e-interoperabilidad/metadatos-del-servidor/1",
        "title": "Consultar las tablas del laboratorio",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME IN ('customers','orders') ORDER BY TABLE_NAME\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[('customers',), ('orders',)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/query-attributes",
    "remember": "No son parámetros SQL y no deben contener secretos.",
    "note": "Requiere soporte de atributos en la versión del conector y del servidor.",
    "examples": [
      {
        "id": "mysql-connector-python/api-especializada-e-interoperabilidad/query-attributes/1",
        "title": "Etiquetar una consulta",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.add_attribute(\"report\", \"monthly\")\n    print(cur.get_attributes())\n    cur.execute(\"SELECT 1\")\n    print(cur.fetchall())\n    cur.clear_attributes()",
        "hint": "",
        "textOutput": "La colección incluye report=monthly y el SELECT devuelve [(1,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/comandos-de-bajo-nivel",
    "remember": "Son especializados; debes consumir los resultados y controlar el estado de conexión.",
    "examples": [
      {
        "id": "mysql-connector-python/api-especializada-e-interoperabilidad/comandos-de-bajo-nivel/1",
        "title": "Consultar con la API de bajo nivel",
        "language": "python",
        "code": "with abrir(use_pure=True) as cnx:\n    cnx.cmd_query(\"SELECT 1\")\n    rows, eof = cnx.get_rows()\n    print(rows)",
        "hint": "",
        "textOutput": "[(1,)] en la implementación Python pura.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/extension-c-y-modulos-internos",
    "remember": "No dependas de interfaces internas para una aplicación analítica normal.",
    "examples": [
      {
        "id": "mysql-connector-python/api-especializada-e-interoperabilidad/extension-c-y-modulos-internos/1",
        "title": "Detectar disponibilidad de la extensión",
        "language": "python",
        "code": "print(mysql.connector.HAVE_CEXT)",
        "hint": "",
        "textOutput": "True si la extensión C está instalada; False si no.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/opentelemetry",
    "remember": "Configura un proveedor/exportador para visualizar trazas; evita exportar secretos.",
    "note": "Instala mysql-connector-python[telemetry] y configura OpenTelemetry según la documentación oficial.",
    "examples": [
      {
        "id": "mysql-connector-python/api-especializada-e-interoperabilidad/opentelemetry/1",
        "title": "Instrumentar el conector",
        "language": "python",
        "code": "from mysql.connector.opentelemetry.instrumentation import MySQLInstrumentor\ninstrumentor = MySQLInstrumentor()\ninstrumentor.instrument()\ntry:\n    with abrir() as cnx, cnx.cursor() as cur:\n        cur.execute(\"SELECT 1\")\n        print(cur.fetchall())\nfinally:\n    instrumentor.uninstrument()",
        "hint": "",
        "textOutput": "[(1,)]; con proveedor y exportador configurados se generan trazas según la configuración.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/django",
    "remember": "Verifica la compatibilidad de las versiones de Django y del conector.",
    "note": "Requiere Django y un proyecto configurado; no ejecuta migraciones ni consultas por sí solo.",
    "examples": [
      {
        "id": "mysql-connector-python/api-especializada-e-interoperabilidad/django/1",
        "title": "Configurar el backend en settings.py",
        "language": "python",
        "code": "DATABASES = {\"default\": {\"ENGINE\":\"mysql.connector.django\", \"NAME\":CONFIG[\"database\"], \"USER\":CONFIG[\"user\"], \"PASSWORD\":CONFIG[\"password\"], \"HOST\":CONFIG[\"host\"], \"PORT\":CONFIG[\"port\"]}}",
        "hint": "",
        "textOutput": "Django usa Connector/Python como backend cuando el proyecto carga esta configuración.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/api-clasica-y-x-devapi",
    "remember": "No intercambies los imports ni los puertos de ambas interfaces.",
    "examples": [
      {
        "id": "mysql-connector-python/api-especializada-e-interoperabilidad/api-clasica-y-x-devapi/1",
        "title": "Comprobar el módulo clásico",
        "language": "python",
        "code": "print(mysql.connector.__name__)",
        "hint": "",
        "textOutput": "mysql.connector.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
