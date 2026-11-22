// Salida de referencia: SQLite, negocio-relacional@1. Verificación WASM en tests/sql-first-block.test.ts.
export default {
  "sql/distinct/definicion/ejemplo-1": {
    "columns": [
      "categoria"
    ],
    "rows": [
      [
        "Accesorios"
      ],
      [
        "Almacenamiento"
      ],
      [
        "Audio"
      ],
      [
        "Pantallas"
      ]
    ]
  },
  "sql/distinct/columna/ejemplo-1": {
    "columns": [
      "categoria"
    ],
    "rows": [
      [
        "Accesorios"
      ],
      [
        "Almacenamiento"
      ],
      [
        "Audio"
      ],
      [
        "Pantallas"
      ]
    ]
  },
  "sql/distinct/varias-columnas/ejemplo-1": {
    "columns": [
      "categoria",
      "proveedor_id"
    ],
    "rows": [
      [
        "Accesorios",
        "NULL"
      ],
      [
        "Accesorios",
        "1"
      ],
      [
        "Accesorios",
        "2"
      ],
      [
        "Accesorios",
        "3"
      ],
      [
        "Accesorios",
        "4"
      ],
      [
        "Almacenamiento",
        "2"
      ],
      [
        "Almacenamiento",
        "3"
      ],
      [
        "Almacenamiento",
        "4"
      ],
      [
        "Audio",
        "NULL"
      ],
      [
        "Audio",
        "1"
      ],
      [
        "Audio",
        "4"
      ],
      [
        "Pantallas",
        "3"
      ]
    ]
  }
};
