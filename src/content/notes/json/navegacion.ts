// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/navegacion/definicion",
    "remember": "Primero interpreta el texto; después usa operaciones Python.",
    "examples": [
      {
        "id": "json/navegacion/definicion/1",
        "title": "Extraer un nombre",
        "language": "python",
        "code": "datos = json.loads(texto)\nprint(datos[0][\"cliente\"][\"nombre\"])",
        "hint": "Primero el índice del pedido, después las claves.",
        "textOutput": "`Ana`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/navegacion/clave-e-indice",
    "remember": "Sigue la estructura nivel por nivel.",
    "examples": [
      {
        "id": "json/navegacion/clave-e-indice/1",
        "title": "Extraer un SKU",
        "language": "python",
        "code": "print(pedidos[0][\"items\"][1][\"sku\"])",
        "hint": "Se toma el segundo item del primer pedido.",
        "textOutput": "`B2`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/navegacion/get",
    "remember": "Si la clave existe con `None`, `get` devuelve `None`.",
    "examples": [
      {
        "id": "json/navegacion/get/1",
        "title": "Consultar ciudad opcional",
        "language": "python",
        "code": "print(pedidos[1][\"cliente\"].get(\"ciudad\", \"Sin dato\"))\nprint(pedidos[2][\"cliente\"].get(\"ciudad\", \"Sin dato\"))",
        "hint": "El segundo pedido tiene ciudad nula y el tercero no tiene la clave.",
        "textOutput": "`None` y `Sin dato`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/navegacion/keys-values-items",
    "remember": "`items()` proporciona clave y valor juntos.",
    "examples": [
      {
        "id": "json/navegacion/keys-values-items/1",
        "title": "Inspeccionar un resumen",
        "language": "python",
        "code": "r = resumen[0]\nprint(list(r.keys()))\nprint(list(r.values()))\nprint(list(r.items()))",
        "hint": "Se inspeccionan las tres vistas.",
        "textOutput": "`['id', 'monto']`, `[101, 120.5]` y `[('id', 101), ('monto', 120.5)]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/navegacion/iteracion-y-filtrado",
    "remember": "Filtra después de convertir el documento.",
    "examples": [
      {
        "id": "json/navegacion/iteracion-y-filtrado/1",
        "title": "Sumar pedidos completados",
        "language": "python",
        "code": "total = 0\nfor p in pedidos:\n    if p[\"estado\"] == \"completed\":\n        total += p[\"monto\"]\nprint(total)",
        "hint": "Se excluye el pedido cancelado.",
        "textOutput": "`200.5`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/navegacion/comprensiones",
    "remember": "Selecciona los campos que necesita tu análisis.",
    "examples": [
      {
        "id": "json/navegacion/comprensiones/1",
        "title": "Extraer montos completados",
        "language": "python",
        "code": "montos = [p[\"monto\"] for p in pedidos if p[\"pagado\"]]\nprint(montos)",
        "hint": "La condición conserva solo registros pagados.",
        "textOutput": "`[120.5, 80]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/navegacion/modificaciones",
    "remember": "Modificar el objeto no cambia el archivo hasta escribirlo.",
    "examples": [
      {
        "id": "json/navegacion/modificaciones/1",
        "title": "Actualizar una copia",
        "language": "python",
        "code": "datos = json.loads(texto)\ndatos[0][\"estado\"] = \"refunded\"\ndatos[0][\"moneda\"] = \"MXN\"\ndatos[0].pop(\"pagado\")\ndatos.append({\"id\": 104})\nprint(datos[0][\"estado\"], datos[0][\"moneda\"], len(datos))",
        "hint": "Se actualiza la lista en memoria.",
        "textOutput": "`refunded MXN 4`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/navegacion/aplanamiento-manual",
    "remember": "Conserva el id padre para relacionar registros.",
    "examples": [
      {
        "id": "json/navegacion/aplanamiento-manual/1",
        "title": "Crear una fila por item",
        "language": "python",
        "code": "filas = [{\"id\": p[\"id\"], **item}\n         for p in pedidos for item in p[\"items\"]]\nprint(filas)",
        "hint": "Los pedidos sin items no generan filas.",
        "textOutput": "`[{'id': 101, 'sku': 'A1', 'cantidad': 2}, {'id': 101, 'sku': 'B2', 'cantidad': 1}, {'id': 102, 'sku': 'A1', 'cantidad': 1}]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
