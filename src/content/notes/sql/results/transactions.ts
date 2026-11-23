// Salida de referencia: SQLite WASM, negocio-relacional@1; semilla limpia por ejemplo.
export default {
  "sql/transactions/definicion/ejemplo-1": {
    "columns": [
      "id",
      "saldo"
    ],
    "rows": [
      [
        "1",
        "10000"
      ]
    ]
  },
  "sql/transactions/definicion/ejemplo-2": {
    "columns": [
      "id",
      "saldo"
    ],
    "rows": [
      [
        "1",
        "9500"
      ],
      [
        "2",
        "11500"
      ]
    ]
  },
  "sql/transactions/begin/ejemplo-1": {
    "columns": [
      "id",
      "saldo"
    ],
    "rows": [
      [
        "1",
        "10100"
      ]
    ]
  },
  "sql/transactions/commit/ejemplo-1": {
    "columns": [
      "id",
      "saldo"
    ],
    "rows": [
      [
        "1",
        "10100"
      ]
    ]
  },
  "sql/transactions/rollback/ejemplo-1": {
    "columns": [
      "conservado"
    ],
    "rows": [
      [
        "1"
      ]
    ]
  },
  "sql/transactions/autocommit/ejemplo-1": {
    "columns": [
      "id",
      "saldo"
    ],
    "rows": [
      [
        "1",
        "10100"
      ]
    ]
  }
};
