// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/definicion",
    "remember": "Usa permisos mínimos y valida identidad en conexiones remotas.",
    "examples": [
      {
        "id": "mysql-connector-python/seguridad-y-transporte/definicion/1",
        "title": "Consultar si la sesión usa cifrado",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SHOW SESSION STATUS LIKE 'Ssl_cipher'\")\n    print(cur.fetchone()[1])",
        "hint": "",
        "textOutput": "Nombre del cifrado si TLS está activo; cadena vacía si no.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/tls-y-certificados",
    "remember": "No desactives la validación en producción.",
    "note": "Host y archivo ilustrativos: reemplázalos por los de tu laboratorio TLS. Para autenticación mutua añade ssl_cert y ssl_key según el servidor.",
    "examples": [
      {
        "id": "mysql-connector-python/seguridad-y-transporte/tls-y-certificados/1",
        "title": "Abrir una conexión TLS verificada",
        "language": "python",
        "code": "with abrir(host=\"mysql.lab.example\", ssl_ca=\"ca.pem\", ssl_verify_cert=True, ssl_verify_identity=True, tls_versions=[\"TLSv1.2\",\"TLSv1.3\"]) as cnx:\n    print(cnx.connected)",
        "hint": "",
        "textOutput": "True si el host y certificado son válidos; error si la validación falla.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/auth-plugin-y-autenticacion",
    "remember": "No fuerces un plugin antiguo; la disponibilidad depende de servidor, plataforma y edición.",
    "note": "MFA usa password1, password2 y password3 según factores; LDAP, Kerberos y OpenID Connect requieren configuración empresarial específica.",
    "examples": [
      {
        "id": "mysql-connector-python/seguridad-y-transporte/auth-plugin-y-autenticacion/1",
        "title": "Conectar con autenticación SHA-2",
        "language": "python",
        "code": "with abrir(auth_plugin=\"caching_sha2_password\") as cnx:\n    print(cnx.connected)",
        "hint": "",
        "textOutput": "True si la cuenta y el servidor admiten el plugin.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/privilegios-minimos",
    "remember": "Una cuenta de reportes no necesita DROP ni permisos administrativos.",
    "examples": [
      {
        "id": "mysql-connector-python/seguridad-y-transporte/privilegios-minimos/1",
        "title": "Consultar permisos de la cuenta",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SHOW GRANTS FOR CURRENT_USER()\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "Lista de concesiones de la cuenta; depende del servidor.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/tcp-socket-y-compresion",
    "remember": "Un socket requiere servidor local y ruta válida; comprimir no equivale a cifrar.",
    "examples": [
      {
        "id": "mysql-connector-python/seguridad-y-transporte/tcp-socket-y-compresion/1",
        "title": "Solicitar compresión",
        "language": "python",
        "code": "with abrir(compress=True) as cnx:\n    with cnx.cursor() as cur:\n        cur.execute(\"SHOW SESSION STATUS LIKE 'Compression'\")\n        print(cur.fetchall())",
        "hint": "",
        "textOutput": "Estado de compresión negociado con el servidor.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/atributos-y-flags",
    "remember": "No uses atributos para enviar secretos.",
    "examples": [
      {
        "id": "mysql-connector-python/seguridad-y-transporte/atributos-y-flags/1",
        "title": "Etiquetar una conexión",
        "language": "python",
        "code": "from mysql.connector.constants import ClientFlag\nwith abrir(conn_attrs={\"application\":\"alldoc\"}, client_flags=[ClientFlag.FOUND_ROWS]) as cnx:\n    print(cnx.connected)",
        "hint": "",
        "textOutput": "True si la conexión se establece. FOUND_ROWS cambia el significado de filas afectadas de UPDATE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
