// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/definicion",
    "remember": "El callback debe ser breve y cumplir el contrato de retorno.",
    "examples": [
      {
        "id": "sqlite3/callbacks-y-control-de-ejecucion/definicion/1",
        "title": "Observar una sentencia",
        "language": "python",
        "code": "trazas = []\ncon.set_trace_callback(trazas.append)\ncon.execute(\"SELECT 1\").fetchone()\ncon.set_trace_callback(None)\nprint(trazas)",
        "hint": "La traza permite ver sentencias ejecutadas.",
        "textOutput": "`['SELECT 1']`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/set-trace-callback",
    "remember": "None desactiva el callback.",
    "examples": [
      {
        "id": "sqlite3/callbacks-y-control-de-ejecucion/set-trace-callback/1",
        "title": "Registrar una consulta parametrizada",
        "language": "python",
        "code": "con.set_trace_callback(print)\ncon.execute(\"SELECT nombre FROM clientes WHERE id = ?\", (1,)).fetchone()\ncon.set_trace_callback(None)",
        "hint": "Los parámetros pueden aparecer en el texto de la traza; evita registrar datos sensibles.",
        "textOutput": "Una traza de SELECT con el valor 1 incorporado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/set-progress-handler",
    "remember": "Un retorno distinto de cero interrumpe la operación.",
    "note": "El intervalo cuenta instrucciones internas, no filas ni segundos.",
    "examples": [
      {
        "id": "sqlite3/callbacks-y-control-de-ejecucion/set-progress-handler/1",
        "title": "Interrumpir una consulta de prueba",
        "language": "python",
        "code": "con.set_progress_handler(lambda: 1, 1)\ntry:\n    con.execute(\"SELECT COUNT(*) FROM pedidos\").fetchone()\nexcept sqlite3.DatabaseError as exc:\n    print(exc.sqlite_errorname)\nfinally:\n    con.set_progress_handler(None, 0)",
        "hint": "La interrupción evita que termine la consulta.",
        "textOutput": "`SQLITE_INTERRUPT`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/set-authorizer",
    "remember": "SQLITE_DENY rechaza la acción; no confíes solo en filtros de texto.",
    "note": "SQLITE_IGNORE tiene efectos específicos según la acción; por ejemplo puede devolver NULL para una lectura de columna.",
    "examples": [
      {
        "id": "sqlite3/callbacks-y-control-de-ejecucion/set-authorizer/1",
        "title": "Impedir borrados",
        "language": "python",
        "code": "def autorizar(accion, arg1, arg2, esquema, origen):\n    if accion == sqlite3.SQLITE_DELETE:\n        return sqlite3.SQLITE_DENY\n    return sqlite3.SQLITE_OK\ncon.set_authorizer(autorizar)\ntry:\n    con.execute(\"DELETE FROM contactos\")\nexcept sqlite3.DatabaseError as exc:\n    print(exc.sqlite_errorname)\nfinally:\n    con.set_authorizer(None)",
        "hint": "El callback deniega la acción antes de ejecutar el borrado.",
        "textOutput": "`SQLITE_AUTH`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/interrupt",
    "remember": "No cierres la conexión mientras otro hilo la interrumpe.",
    "note": "La cancelación depende del momento en que se solicita; comprueba que la consulta está activa antes de llamar a interrupt().",
    "examples": [
      {
        "id": "sqlite3/callbacks-y-control-de-ejecucion/interrupt/1",
        "title": "Interrumpir una consulta activa",
        "language": "python",
        "code": "import threading\ninicio = threading.Event()\nfin = threading.Event()\n\ndef pausa():\n    inicio.set()\n    fin.wait(2)\n    return 1\n\ndef cancelar():\n    if inicio.wait(2):\n        con.interrupt()\n    fin.set()\n\ncon.create_function(\"pausa\", 0, pausa)\nhilo = threading.Thread(target=cancelar)\nhilo.start()\ntry:\n    con.execute(\"SELECT pausa() FROM pedidos\").fetchall()\nexcept sqlite3.OperationalError as exc:\n    print(exc.sqlite_errorname)\nfinally:\n    hilo.join()",
        "hint": "La función de prueba sincroniza la consulta activa con el hilo que solicita la interrupción. Los tiempos máximos de espera evitan que el ejemplo quede bloqueado indefinidamente. Ejecútalo en Python local con soporte de hilos.",
        "textOutput": "`SQLITE_INTERRUPT` cuando se solicita la interrupción durante la consulta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/enable-callback-tracebacks",
    "remember": "Activa solo durante diagnóstico y vuelve a desactivar.",
    "examples": [
      {
        "id": "sqlite3/callbacks-y-control-de-ejecucion/enable-callback-tracebacks/1",
        "title": "Diagnosticar un fallo de función",
        "language": "python",
        "code": "sqlite3.enable_callback_tracebacks(True)\ntry:\n    con.create_function(\"fallo\", 0, lambda: 1 / 0)\n    con.execute(\"SELECT fallo()\").fetchone()\nexcept sqlite3.OperationalError:\n    print(\"Error de función\")\nfinally:\n    sqlite3.enable_callback_tracebacks(False)",
        "hint": "La excepción original del callback se notifica como excepción no capturada internamente, además del error SQL.",
        "textOutput": "Una traza de ZeroDivisionError en stderr y `Error de función` en stdout.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
