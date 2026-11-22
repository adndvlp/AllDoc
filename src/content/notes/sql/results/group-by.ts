// Salida de referencia: SQLite WASM, negocio-relacional@1; semilla limpia por ejemplo.
export default {
  "sql/group-by/definicion/ejemplo-1": {
    "columns": [
      "categoria",
      "total"
    ],
    "rows": [
      [
        "Accesorios",
        "9"
      ],
      [
        "Almacenamiento",
        "3"
      ],
      [
        "Audio",
        "4"
      ],
      [
        "Pantallas",
        "2"
      ]
    ]
  },
  "sql/group-by/varias-columnas/ejemplo-1": {
    "columns": [
      "categoria",
      "activo",
      "total"
    ],
    "rows": [
      [
        "Accesorios",
        "1",
        "9"
      ],
      [
        "Almacenamiento",
        "1",
        "3"
      ],
      [
        "Audio",
        "0",
        "1"
      ],
      [
        "Audio",
        "1",
        "3"
      ],
      [
        "Pantallas",
        "1",
        "2"
      ]
    ]
  },
  "sql/group-by/having/ejemplo-1": {
    "columns": [
      "categoria",
      "total"
    ],
    "rows": [
      [
        "Accesorios",
        "9"
      ],
      [
        "Almacenamiento",
        "3"
      ],
      [
        "Audio",
        "4"
      ]
    ]
  },
  "sql/group-by/where-y-having/ejemplo-1": {
    "columns": [
      "categoria",
      "total"
    ],
    "rows": [
      [
        "Accesorios",
        "9"
      ],
      [
        "Almacenamiento",
        "3"
      ],
      [
        "Audio",
        "3"
      ]
    ]
  }
};
