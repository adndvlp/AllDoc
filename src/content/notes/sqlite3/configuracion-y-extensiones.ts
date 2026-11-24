// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/configuracion-y-extensiones/definicion",
    "remember": "Comprueba soporte antes de depender de una opción.",
    "examples": [
      {
        "id": "sqlite3/configuracion-y-extensiones/definicion/1",
        "title": "Consultar límite de variables",
        "language": "python",
        "code": "print(con.getlimit(sqlite3.SQLITE_LIMIT_VARIABLE_NUMBER) > 0)",
        "hint": "El número exacto depende de la compilación y configuración.",
        "textOutput": "`True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/configuracion-y-extensiones/getlimit-y-setlimit",
    "remember": "setlimit devuelve el límite anterior y respeta el máximo de compilación.",
    "note": "Python 3.11+.",
    "examples": [
      {
        "id": "sqlite3/configuracion-y-extensiones/getlimit-y-setlimit/1",
        "title": "Limitar parámetros de una consulta",
        "language": "python",
        "code": "anterior = con.setlimit(sqlite3.SQLITE_LIMIT_VARIABLE_NUMBER, 10)\nprint(con.getlimit(sqlite3.SQLITE_LIMIT_VARIABLE_NUMBER))\ncon.setlimit(sqlite3.SQLITE_LIMIT_VARIABLE_NUMBER, anterior)",
        "hint": "El límite se aplica a esa conexión.",
        "textOutput": "`10` en compilaciones que permiten al menos diez variables.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/configuracion-y-extensiones/getconfig-y-setconfig",
    "remember": "Las constantes disponibles dependen de SQLite.",
    "note": "Python 3.12+; requiere la constante en la compilación.",
    "examples": [
      {
        "id": "sqlite3/configuracion-y-extensiones/getconfig-y-setconfig/1",
        "title": "Activar comprobación de claves foráneas",
        "language": "python",
        "code": "if hasattr(sqlite3, \"SQLITE_DBCONFIG_ENABLE_FKEY\"):\n    con.setconfig(sqlite3.SQLITE_DBCONFIG_ENABLE_FKEY, True)\n    print(con.getconfig(sqlite3.SQLITE_DBCONFIG_ENABLE_FKEY))",
        "hint": "Es una alternativa de API a configurar ciertas opciones del motor.",
        "textOutput": "`True` si la opción está disponible.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/configuracion-y-extensiones/extensiones-cargables",
    "remember": "Mantén la carga deshabilitada salvo para una biblioteca confiable.",
    "note": "No todas las compilaciones incluyen esta capacidad. Desde Python 3.12, load_extension admite entrypoint para especificar el símbolo de inicialización.",
    "examples": [
      {
        "id": "sqlite3/configuracion-y-extensiones/extensiones-cargables/1",
        "title": "Comprobar la capacidad sin cargar bibliotecas",
        "language": "python",
        "code": "try:\n    con.enable_load_extension(False)\n    print(\"Carga deshabilitada\")\nexcept (AttributeError, sqlite3.NotSupportedError, sqlite3.OperationalError):\n    print(\"Función no disponible\")",
        "hint": "Para cargar una biblioteca verificada se habilita temporalmente, se usa con.load_extension(ruta) y se deshabilita en finally.",
        "textOutput": "`Carga deshabilitada` si se soporta; de lo contrario `Función no disponible`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/configuracion-y-extensiones/factory-de-conexion-y-cursor",
    "remember": "La clase debe ser compatible con la interfaz esperada.",
    "examples": [
      {
        "id": "sqlite3/configuracion-y-extensiones/factory-de-conexion-y-cursor/1",
        "title": "Crear una conexión con método auxiliar",
        "language": "python",
        "code": "class Conexion(sqlite3.Connection):\n    def escalar(self, sql):\n        return self.execute(sql).fetchone()[0]\nwith closing(sqlite3.connect(\":memory:\", factory=Conexion)) as db:\n    print(db.escalar(\"SELECT 7\"))",
        "hint": "También puedes pasar una subclase de Cursor a con.cursor(factory=...).",
        "textOutput": "`7`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
