// Salida de referencia: SQLite WASM, negocio-relacional@1; semilla limpia por ejemplo.
export default {
  "sql/create-table/definicion/ejemplo-1": {
    "columns": [
      "id",
      "nombre"
    ],
    "rows": [
      [
        "1",
        "Compras"
      ]
    ]
  },
  "sql/create-table/tipos/ejemplo-1": {
    "columns": [
      "unidades",
      "precio",
      "nombre"
    ],
    "rows": [
      [
        "2",
        "19.5",
        "Cable"
      ]
    ]
  },
  "sql/create-table/if-not-exists/ejemplo-1": {
    "columns": [
      "id"
    ],
    "rows": [
      [
        "1"
      ]
    ]
  },
  "sql/create-table/primary-key/ejemplo-1": {
    "columns": [
      "id",
      "nombre"
    ],
    "rows": [
      [
        "101",
        "Compras"
      ]
    ]
  },
  "sql/create-table/primary-key/ejemplo-2": {
    "columns": [
      "id",
      "nombre"
    ],
    "rows": [
      [
        "1",
        "Compras"
      ]
    ]
  },
  "sql/create-table/not-null/ejemplo-1": {
    "columns": [
      "id",
      "nombre"
    ],
    "rows": [
      [
        "1",
        "Compras"
      ]
    ]
  },
  "sql/create-table/unique/ejemplo-1": {
    "columns": [
      "id",
      "correo"
    ],
    "rows": [
      [
        "1",
        "compras@empresa.test"
      ]
    ]
  },
  "sql/create-table/default/ejemplo-1": {
    "columns": [
      "id",
      "unidades"
    ],
    "rows": [
      [
        "1",
        "0"
      ]
    ]
  },
  "sql/create-table/check/ejemplo-1": {
    "columns": [
      "id",
      "unidades"
    ],
    "rows": [
      [
        "1",
        "0"
      ]
    ]
  },
  "sql/create-table/foreign-key/ejemplo-1": {
    "columns": [
      "id",
      "producto_id"
    ],
    "rows": [
      [
        "1",
        "1"
      ]
    ]
  },
  "sql/create-table/varias-foreign-key/ejemplo-1": {
    "columns": [
      "cliente_id",
      "producto_id"
    ],
    "rows": [
      [
        "1",
        "1"
      ]
    ]
  },
  "sql/create-table/on-delete-cascade/ejemplo-1": {
    "columns": [
      "hijas"
    ],
    "rows": [
      [
        "0"
      ]
    ]
  },
  "sql/create-table/on-delete-set-null/ejemplo-1": {
    "columns": [
      "id",
      "padre_id"
    ],
    "rows": [
      [
        "1",
        "NULL"
      ]
    ]
  }
};
