// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/avisos-y-notificaciones/definicion",
    "remember": "NOTIFY no es una cola persistente ni una tabla.",
    "examples": [
      {
        "id": "psycopg/avisos-y-notificaciones/definicion/1",
        "title": "Recibir un aviso de la sesión",
        "language": "python",
        "code": "def aviso(diag):\n    print(diag.message_primary)\nconn.add_notice_handler(aviso)\ntry:\n    cur.execute(\"DO $$ BEGIN RAISE NOTICE 'Carga lista'; END $$\")\nfinally:\n    conn.remove_notice_handler(aviso)",
        "hint": "NOTIFY no es una cola persistente ni una tabla.",
        "textOutput": "`Carga lista`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/avisos-y-notificaciones/add-notice-handler-y-remove-notice-handler",
    "remember": "No conservar el objeto diagnóstico para usarlo después del callback.",
    "examples": [
      {
        "id": "psycopg/avisos-y-notificaciones/add-notice-handler-y-remove-notice-handler/1",
        "title": "Registrar la severidad de un aviso",
        "language": "python",
        "code": "mensajes = []\ndef aviso(diag):\n    mensajes.append((diag.severity_nonlocalized, diag.message_primary))\nconn.add_notice_handler(aviso)\ntry:\n    cur.execute(\"DO $$ BEGIN RAISE NOTICE 'OK'; END $$\")\nfinally:\n    conn.remove_notice_handler(aviso)\nprint(mensajes)",
        "hint": "No conservar el objeto diagnóstico para usarlo después del callback.",
        "textOutput": "`[('NOTICE', 'OK')]` con la configuración usual de mensajes del cliente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/avisos-y-notificaciones/listen-notify-y-notifies",
    "remember": "Usar una conexión dedicada en autocommit para escuchar sin demoras de commit.",
    "note": "`evento.pid` identifica el backend emisor. Los canales son sensibles a las reglas de identificadores PostgreSQL; usa uno de prueba sin tráfico ajeno.",
    "examples": [
      {
        "id": "psycopg/avisos-y-notificaciones/listen-notify-y-notifies/1",
        "title": "Enviar y recibir un evento",
        "language": "python",
        "code": "with psycopg.connect(DSN, autocommit=True) as receptor, psycopg.connect(DSN, autocommit=True) as emisor:\n    receptor.execute(\"LISTEN ventas_demo\")\n    emisor.execute(\"SELECT pg_notify(%s,%s)\", (\"ventas_demo\",\"nuevo\"))\n    for evento in receptor.notifies(timeout=3, stop_after=1):\n        print(evento.channel, evento.payload)\n    receptor.execute(\"UNLISTEN ventas_demo\")",
        "hint": "Usar una conexión dedicada en autocommit para escuchar sin demoras de commit.",
        "textOutput": "`ventas_demo nuevo` si la notificación llega dentro del límite.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/avisos-y-notificaciones/add-notify-handler-y-remove-notify-handler",
    "remember": "No mezclar handlers y generador notifies en la misma conexión sin revisar la versión.",
    "note": "Para una escucha dedicada con espera explícita, usar notifies().",
    "examples": [
      {
        "id": "psycopg/avisos-y-notificaciones/add-notify-handler-y-remove-notify-handler/1",
        "title": "Procesar notificaciones en una conexión activa",
        "language": "python",
        "code": "with psycopg.connect(DSN, autocommit=True) as c:\n    eventos = []\n    def recibir(n):\n        eventos.append(n.payload)\n    c.add_notify_handler(recibir)\n    c.execute(\"LISTEN ventas_demo_handler\")\n    c.execute(\"SELECT pg_notify('ventas_demo_handler','listo')\")\n    c.execute(\"SELECT 1\")\n    c.remove_notify_handler(recibir)\n    print(eventos)",
        "hint": "No mezclar handlers y generador notifies en la misma conexión sin revisar la versión.",
        "textOutput": "Normalmente `['listo']` al procesarse los mensajes; la entrega es asíncrona.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
