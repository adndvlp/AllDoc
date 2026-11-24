// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/funciones-sql-personalizadas/definicion",
    "remember": "El registro pertenece a la conexión.",
    "examples": [
      {
        "id": "sqlite3/funciones-sql-personalizadas/definicion/1",
        "title": "Calcular un impuesto de ejemplo",
        "language": "python",
        "code": "con.create_function(\"impuesto\", 1, lambda monto: monto * 16 // 100)\nprint(con.execute(\"SELECT impuesto(monto) FROM pedidos WHERE id = 101\").fetchone())",
        "hint": "El cálculo usa centavos enteros y trunca fracciones de centavo para este ejemplo.",
        "textOutput": "`(1920,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/funciones-sql-personalizadas/create-function",
    "remember": "Una función escalar devuelve un valor por llamada.",
    "note": "No marques como determinista una función que dependa de tiempo, aleatoriedad o estado externo; requiere soporte del motor. Usa None como función para desregistrar.",
    "examples": [
      {
        "id": "sqlite3/funciones-sql-personalizadas/create-function/1",
        "title": "Normalizar texto",
        "language": "python",
        "code": "con.create_function(\"normalizar\", 1, lambda s: s.strip().lower() if s is not None else None, deterministic=True)\nprint(con.execute(\"SELECT normalizar(?)\", (\" ANA \",)).fetchone())",
        "hint": "deterministic indica que entradas iguales producen el mismo resultado.",
        "textOutput": "`('ana',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/funciones-sql-personalizadas/create-aggregate",
    "remember": "step acumula filas; finalize devuelve el resultado.",
    "examples": [
      {
        "id": "sqlite3/funciones-sql-personalizadas/create-aggregate/1",
        "title": "Sumar montos que superan 10000",
        "language": "python",
        "code": "class SumaAlta:\n    def __init__(self):\n        self.total = 0\n    def step(self, monto):\n        if monto is not None and monto > 10000:\n            self.total += monto\n    def finalize(self):\n        return self.total\ncon.create_aggregate(\"suma_alta\", 1, SumaAlta)\nprint(con.execute(\"SELECT suma_alta(monto) FROM pedidos\").fetchone())",
        "hint": "SQLite crea una instancia por grupo y llama step por fila.",
        "textOutput": "`(27000,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/funciones-sql-personalizadas/create-window-function",
    "remember": "inverse retira una fila que sale del marco; value devuelve el acumulado actual.",
    "note": "Python 3.11+ y SQLite 3.25+. El ejemplo supone montos no nulos.",
    "examples": [
      {
        "id": "sqlite3/funciones-sql-personalizadas/create-window-function/1",
        "title": "Calcular una suma móvil de dos pedidos",
        "language": "python",
        "code": "class SumaMovil:\n    def __init__(self):\n        self.total = 0\n    def step(self, valor):\n        self.total += valor\n    def inverse(self, valor):\n        self.total -= valor\n    def value(self):\n        return self.total\n    def finalize(self):\n        return self.total\ncon.create_window_function(\"suma_movil\", 1, SumaMovil)\nprint(con.execute(\"SELECT id, suma_movil(monto) OVER (ORDER BY id ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) FROM pedidos ORDER BY id\").fetchall())",
        "hint": "El marco incluye la fila actual y la anterior.",
        "textOutput": "`[(101, 12000), (102, 20000), (103, 23000), (104, 20000), (105, 13000)]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/funciones-sql-personalizadas/create-collation",
    "remember": "Devuelve negativo, cero o positivo según el orden.",
    "examples": [
      {
        "id": "sqlite3/funciones-sql-personalizadas/create-collation/1",
        "title": "Ordenar nombres en sentido inverso",
        "language": "python",
        "code": "def inversa(a, b):\n    return (b > a) - (b < a)\ncon.create_collation(\"INVERSA\", inversa)\nprint(con.execute(\"SELECT nombre FROM clientes ORDER BY nombre COLLATE INVERSA\").fetchall())",
        "hint": "La comparación invierte el orden lexicográfico; None desregistra la collation.",
        "textOutput": "`[('Marta',), ('Luis',), ('Diego',), ('Ana',)]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
