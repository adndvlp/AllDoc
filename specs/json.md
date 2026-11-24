# json (Python)

**Clave** `json`

**Área** Análisis de datos (Python; ubicación propuesta en AllDoc).

**Resumen** Leer, escribir, validar y transformar datos JSON desde archivos, texto y APIs con Python.

**Alcance** Módulo estándar `json`, representación y tipos, lectura y escritura, parámetros de conversión, estructuras anidadas, errores, validación, precisión, JSONL, seguridad, extensibilidad e integración con APIs, CSV, Excel y pandas para análisis de datos. Las bibliotecas externas se distinguen del módulo estándar.

**Entorno** Python 3.11 o posterior. `json`, `pathlib`, `io`, `csv`, `datetime` y `decimal` pertenecen a la biblioteca estándar. Las fichas de integración indican dependencias externas: pandas 2.2+, requests 2.x, jsonschema 4.x y openpyxl 3.1+ (Excel). No se necesita internet salvo en las fichas de HTTP real. Los ejemplos de terminal requieren una consola.

## Datos compartidos

Ejecuta esta preparación en un directorio de práctica con permiso de escritura. Se crean archivos de ejemplo en `json_practica/`. Cada ejemplo Python parte de esta preparación limpia; si se modifican registros o archivos, vuelve a ejecutarla antes de otro ejemplo. `pedidos` tiene tres registros: id 101 y 102 completados, 103 cancelado; el cliente tiene un nombre y puede tener ciudad nula o ausente. Cada pedido contiene una lista de productos. `texto` es un documento JSON en memoria, no un diccionario. Los importes son ilustrativos.

```python
import json
from pathlib import Path

carpeta = Path("json_practica")
carpeta.mkdir(exist_ok=True)
pedidos = [
    {"id": 101, "cliente": {"nombre": "Ana", "ciudad": "México"},
     "monto": 120.5, "estado": "completed", "pagado": True,
     "items": [{"sku": "A1", "cantidad": 2}, {"sku": "B2", "cantidad": 1}]},
    {"id": 102, "cliente": {"nombre": "Luis", "ciudad": None},
     "monto": 80, "estado": "completed", "pagado": True,
     "items": [{"sku": "A1", "cantidad": 1}]},
    {"id": 103, "cliente": {"nombre": "Eva"},
     "monto": 50, "estado": "cancelled", "pagado": False,
     "items": []}
]
texto = json.dumps(pedidos, ensure_ascii=False)
ruta = carpeta / "pedidos.json"
ruta.write_text(texto, encoding="utf-8")
resumen = [{"id": p["id"], "monto": p["monto"]} for p in pedidos]
ruta_jsonl = carpeta / "pedidos.jsonl"
ruta_jsonl.write_text("".join(json.dumps(p) + "\n" for p in resumen), encoding="utf-8")
```

**Resultado esperado** `pedidos.json` contiene un arreglo de tres pedidos; `pedidos.jsonl` contiene tres líneas con un objeto cada una. Las variables quedan disponibles para las fichas.

## Formato JSON

**Clave** `formato-json`

### Definición

**Clave** `definicion`

**Definición** JSON es un formato textual para intercambiar datos estructurados. El módulo `json` convierte ese texto en objetos Python y viceversa.

**Búsqueda** qué es JSON, import json, datos semiestructurados

**Para recordar** JSON es texto; un `dict` es un objeto Python.

#### Distinguir texto de diccionario

```python
import json
valor = '{"id": 101}'
print(type(valor).__name__, type(json.loads(valor)).__name__)
```

`loads` interpreta el texto.

**Resultado esperado** `str dict`.

### Objetos y arreglos

**Clave** `objetos-y-arreglos`

**Definición** Un objeto JSON contiene pares clave-valor; un arreglo es una secuencia de valores. Pueden contenerse entre sí.

**Búsqueda** object, array, llaves, corchetes

**Para recordar** `{}` representa un objeto y `[]` un arreglo.

#### Representar un pedido

```json
{"id": 101, "items": [{"sku": "A1", "cantidad": 2}]}
```

El pedido tiene un arreglo de objetos de producto.

**Resultado esperado** Documento válido con dos claves y un item.

### Tipos JSON y Python

**Clave** `tipos`

**Definición** Los objetos se convierten en `dict`, los arreglos en `list`, las cadenas en `str`, los números enteros en `int` y los decimales en `float` por defecto; `true`, `false` y `null` se convierten en `True`, `False` y `None`.

**Búsqueda** null None, booleanos, number, conversiones

**Para recordar** Las palabras JSON se escriben en minúsculas; en Python no.

#### Identificar tipos

```python
v = json.loads('[{}, [], "Ana", 2, 2.5, true, false, null]')
print([type(x).__name__ for x in v])
```

Cada valor se convierte según su tipo.

**Resultado esperado** `['dict', 'list', 'str', 'int', 'float', 'bool', 'bool', 'NoneType']`.

### Sintaxis válida

**Clave** `sintaxis`

**Definición** JSON exige comillas dobles en claves y cadenas, sin comentarios ni comas finales. Un documento puede tener un valor escalar en la raíz.

**Búsqueda** comillas, trailing comma, comentarios, JSON válido

**Para recordar** No confundas la sintaxis de un literal Python con JSON.

#### Leer un escalar

```python
print(json.loads('42'))
print(json.loads('"MX"'))
```

No se requieren llaves en la raíz.

**Resultado esperado** Dos líneas: `42` y `MX`.

### Estructuras heterogéneas

**Clave** `heterogeneas`

**Definición** Un arreglo puede mezclar tipos y los objetos pueden tener campos diferentes; esto no garantiza una estructura tabular consistente.

**Búsqueda** JSON plano, anidado, heterogéneo

**Para recordar** Valida la estructura que necesita tu análisis.

#### Ver campos diferentes

```python
datos = json.loads('[{"id": 1}, {"id": 2, "monto": 10}, null]')
print([type(x).__name__ for x in datos])
```

El formato permite un nulo junto a objetos.

**Resultado esperado** `['dict', 'dict', 'NoneType']`.

## Deserialización

**Clave** `deserializacion`

### Definición

**Clave** `definicion`

**Definición** Deserializar convierte un documento JSON en valores Python para poder consultarlos o modificarlos.

**Búsqueda** decodificar, parsear, leer JSON

**Para recordar** `loads` recibe contenido; `load` recibe un archivo abierto.

#### Obtener registros

```python
datos = json.loads(texto)
print(len(datos), datos[0]["id"])
```

El arreglo pasa a ser una lista.

**Resultado esperado** `3 101`.

### json.loads()

**Clave** `loads`

**Definición** `json.loads(s)` interpreta un documento completo contenido en una cadena, bytes o bytearray.

**Búsqueda** loads, string JSON, parse

**Para recordar** No le pases la ruta de un archivo como si fuera su contenido.

#### Leer texto

```python
datos = json.loads('{"monto": 120.5}')
print(datos["monto"])
```

Se obtiene un diccionario.

**Resultado esperado** `120.5`.

### json.load()

**Clave** `load`

**Definición** `json.load(fp)` interpreta un documento completo desde un objeto de archivo legible.

**Búsqueda** load, abrir archivo JSON

**Para recordar** Primero abre el archivo en modo lectura.

#### Leer pedidos

```python
with open(ruta, "r", encoding="utf-8") as f:
    datos = json.load(f)
print(len(datos))
```

`with` cierra el archivo al salir del bloque.

**Resultado esperado** `3`.

### str, bytes y bytearray

**Clave** `tipos-de-entrada`

**Definición** `loads` admite texto y datos binarios codificados en UTF-8, UTF-16 o UTF-32.

**Búsqueda** bytes, bytearray, decode

**Para recordar** El texto ya decodificado no necesita `.decode()`.

#### Leer respuesta binaria

```python
s = '{"id": 101}'
for entrada in (s, s.encode("utf-8"), bytearray(s.encode("utf-8"))):
    print(json.loads(entrada)["id"])
```

Las tres entradas representan lo mismo.

**Resultado esperado** Tres líneas con `101`.

## Serialización

**Clave** `serializacion`

### Definición

**Clave** `definicion`

**Definición** Serializar convierte objetos Python compatibles en texto JSON, para almacenarlos o intercambiarlos.

**Búsqueda** serializar, encoder, exportar

**Para recordar** `dumps` devuelve texto; `dump` escribe en un archivo.

#### Convertir un registro

```python
s = json.dumps({"id": 101, "pagado": True})
print(s)
```

El booleano se escribe con sintaxis JSON.

**Resultado esperado** `{"id": 101, "pagado": true}`.

### json.dumps()

**Clave** `dumps`

**Definición** `json.dumps(obj)` devuelve una cadena JSON. No crea un archivo.

**Búsqueda** dumps, dict a string

**Para recordar** Guarda el retorno si necesitas reutilizarlo.

#### Generar texto de un resumen

```python
s = json.dumps(resumen[0])
print(type(s).__name__, s)
```

El resumen tiene dos campos.

**Resultado esperado** `str {"id": 101, "monto": 120.5}`.

### json.dump()

**Clave** `dump`

**Definición** `json.dump(obj, fp)` escribe texto JSON en un archivo abierto para escritura y devuelve `None`.

**Búsqueda** dump, guardar archivo

**Para recordar** Usa un archivo de texto, no modo `wb`.

#### Exportar un resumen

```python
destino = carpeta / "resumen.json"
with open(destino, "w", encoding="utf-8") as f:
    json.dump(resumen, f)
print(len(json.loads(destino.read_text(encoding="utf-8"))))
```

Se puede leer el archivo que se acaba de escribir.

**Resultado esperado** `3`.

### Round-trip

**Clave** `round-trip`

**Definición** Un round-trip serializa y deserializa para comprobar si los valores se conservan. No todos los tipos Python tienen una representación idéntica en JSON.

**Búsqueda** ida y vuelta, conservar tipos

**Para recordar** Compara datos y tipos cuando sean importantes.

#### Comprobar un registro

```python
p = {"id": 101, "pagado": True, "monto": 120.5}
print(json.loads(json.dumps(p)) == p)
```

Estos tipos son compatibles en ambos sentidos.

**Resultado esperado** `True`.

## Archivos y codificación

**Clave** `archivos-y-codificacion`

### Definición

**Clave** `definicion`

**Definición** La apertura de archivos y su codificación determinan cómo se lee o escribe el documento; son operaciones de Python, no parámetros de `json.load`.

**Búsqueda** open, with, encoding, ruta

**Para recordar** Usa `with open(...)` y UTF-8 explícito.

#### Abrir y cerrar automáticamente

```python
with open(ruta, encoding="utf-8") as f:
    datos = json.load(f)
print(f.closed, len(datos))
```

El contexto administra el recurso.

**Resultado esperado** `True 3`.

### Modos r, w y a

**Clave** `modos`

**Definición** `r` lee; `w` crea o reemplaza; `a` añade al final sin borrar.

**Búsqueda** read write append, sobrescribir

**Para recordar** No uses `a` para añadir documentos a un arreglo JSON existente.

#### Reemplazar un archivo de práctica

```python
p = carpeta / "estado.json"
with open(p, "w", encoding="utf-8") as f:
    json.dump({"estado": "nuevo"}, f)
with open(p, "r", encoding="utf-8") as f:
    print(json.load(f))
```

`w` reemplaza el contenido anterior si existe.

**Resultado esperado** `{'estado': 'nuevo'}`.

### UTF-8 y BOM

**Clave** `utf-8-y-bom`

**Definición** UTF-8 es la codificación habitual de intercambio. Un BOM es una marca inicial que puede causar rechazo si queda dentro del texto leído.

**Búsqueda** encoding, BOM, utf-8-sig, caracteres especiales

**Para recordar** `utf-8-sig` elimina un BOM UTF-8 al decodificar.

#### Leer archivo con BOM conocido

```python
p = carpeta / "bom.json"
p.write_bytes(b"\xef\xbb\xbf" + '{"ciudad":"México"}'.encode("utf-8"))
with open(p, encoding="utf-8-sig") as f:
    print(json.load(f)["ciudad"])
```

Se retira la marca inicial antes de parsear.

**Resultado esperado** `México`.

### Modificar un documento

**Clave** `modificar-documento`

**Definición** Para modificar un arreglo JSON normal, lee el documento, actualiza el objeto Python y vuelve a serializarlo.

**Búsqueda** actualizar JSON, agregar registro, reescribir

**Para recordar** `dump` no inserta dentro de un arreglo existente.

#### Agregar un pedido a una copia

```python
p = carpeta / "copia.json"
datos = json.loads(texto)
datos.append({"id": 104})
with open(p, "w", encoding="utf-8") as f:
    json.dump(datos, f)
print(len(json.loads(p.read_text(encoding="utf-8"))))
```

El archivo original no se modifica.

**Resultado esperado** `4`.

### Múltiples llamadas a dump()

**Clave** `multiples-dump`

**Definición** JSON no delimita automáticamente documentos consecutivos. Dos llamadas a `dump` en el mismo archivo pueden producir contenido que no representa un documento válido.

**Búsqueda** Extra data, concatenar JSON, append

**Para recordar** Un documento JSON normal contiene un valor raíz.

#### Detectar dos documentos concatenados

```python
from io import StringIO
f = StringIO()
json.dump({"id": 1}, f)
json.dump({"id": 2}, f)
try:
    json.loads(f.getvalue())
except json.JSONDecodeError as e:
    print(e.msg)
```

Los objetos quedaron juntos sin un arreglo que los contenga.

**Resultado esperado** `Extra data`.

## Formato de salida

**Clave** `formato-de-salida`

### Definición

**Clave** `definicion`

**Definición** Los parámetros de `dump` y `dumps` permiten ajustar la representación textual sin cambiar la estructura de datos.

**Búsqueda** formatear, pretty print, compactar

**Para recordar** La presentación y el contenido son decisiones distintas.

#### Comparar dos representaciones

```python
obj = {"id": 101}
a = json.dumps(obj)
b = json.dumps(obj, indent=2)
print(a == b, json.loads(a) == json.loads(b))
```

Las cadenas difieren, los objetos no.

**Resultado esperado** `False True`.

### indent

**Clave** `indent`

**Definición** `indent` agrega sangría y saltos de línea; puede ser un entero o una cadena. `None` mantiene salida sin sangría.

**Búsqueda** indentación, pretty print

**Para recordar** Usa `indent=2` para lectura humana.

#### Formatear un pedido

```python
print(json.dumps({"id": 101}, indent=2))
```

El par se presenta en su propia línea.

**Resultado esperado** Tres líneas: `{`, dos espacios seguidos de `"id": 101`, y `}`.

### ensure_ascii

**Clave** `ensure-ascii`

**Definición** Con `ensure_ascii=True` (predeterminado) los caracteres no ASCII se escapan; con `False` se conservan visibles.

**Búsqueda** acentos, Unicode, escape

**Para recordar** No confundir escapes JSON con la codificación del archivo.

#### Conservar acentos

```python
obj = {"ciudad": "México"}
print(json.dumps(obj))
print(json.dumps(obj, ensure_ascii=False))
```

Ambos textos decodifican al mismo valor.

**Resultado esperado** `{"ciudad": "M\u00e9xico"}` y `{"ciudad": "México"}`.

### sort_keys

**Clave** `sort-keys`

**Definición** `sort_keys=True` ordena las claves de cada objeto al generar el JSON.

**Búsqueda** ordenar llaves, exportación estable

**Para recordar** No ordena los elementos de un arreglo.

#### Ordenar claves de un registro

```python
print(json.dumps({"monto": 80, "id": 102}, sort_keys=True))
```

`id` se escribe antes que `monto`.

**Resultado esperado** `{"id": 102, "monto": 80}`.

### separators

**Clave** `separators`

**Definición** `separators=(separador_de_elementos, separador_clave_valor)` controla el espacio alrededor de comas y dos puntos.

**Búsqueda** JSON compacto, separadores

**Para recordar** Usa `(",", ":")` para quitar espacios innecesarios.

#### Compactar un registro

```python
print(json.dumps({"id": 101, "monto": 120.5}, separators=(",", ":")))
```

El contenido sigue siendo JSON válido.

**Resultado esperado** `{"id":101,"monto":120.5}`.

## Navegación y transformación

**Clave** `navegacion`

### Definición

**Clave** `definicion`

**Definición** Después de deserializar, trabajas con listas y diccionarios normales de Python.

**Búsqueda** acceder JSON, nested JSON, extraer campos

**Para recordar** Primero interpreta el texto; después usa operaciones Python.

#### Extraer un nombre

```python
datos = json.loads(texto)
print(datos[0]["cliente"]["nombre"])
```

Primero el índice del pedido, después las claves.

**Resultado esperado** `Ana`.

### Acceso por clave e índice

**Clave** `clave-e-indice`

**Definición** Los diccionarios se consultan por clave y las listas por índice entero desde cero.

**Búsqueda** índice, clave, nested

**Para recordar** Sigue la estructura nivel por nivel.

#### Extraer un SKU

```python
print(pedidos[0]["items"][1]["sku"])
```

Se toma el segundo item del primer pedido.

**Resultado esperado** `B2`.

### get()

**Clave** `get`

**Definición** `dict.get(clave, alternativa)` devuelve el valor existente o la alternativa si la clave no existe.

**Búsqueda** get, clave opcional, default

**Para recordar** Si la clave existe con `None`, `get` devuelve `None`.

#### Consultar ciudad opcional

```python
print(pedidos[1]["cliente"].get("ciudad", "Sin dato"))
print(pedidos[2]["cliente"].get("ciudad", "Sin dato"))
```

El segundo pedido tiene ciudad nula y el tercero no tiene la clave.

**Resultado esperado** `None` y `Sin dato`.

### keys(), values() e items()

**Clave** `keys-values-items`

**Definición** Estas operaciones de `dict` permiten consultar claves, valores o pares clave-valor, respectivamente.

**Búsqueda** keys values items, recorrer diccionario

**Para recordar** `items()` proporciona clave y valor juntos.

#### Inspeccionar un resumen

```python
r = resumen[0]
print(list(r.keys()))
print(list(r.values()))
print(list(r.items()))
```

Se inspeccionan las tres vistas.

**Resultado esperado** `['id', 'monto']`, `[101, 120.5]` y `[('id', 101), ('monto', 120.5)]`.

### Iteración y filtrado

**Clave** `iteracion-y-filtrado`

**Definición** Un `for` recorre registros; una condición `if` permite conservar únicamente los que cumplen una regla.

**Búsqueda** for, if, filtrar registros

**Para recordar** Filtra después de convertir el documento.

#### Sumar pedidos completados

```python
total = 0
for p in pedidos:
    if p["estado"] == "completed":
        total += p["monto"]
print(total)
```

Se excluye el pedido cancelado.

**Resultado esperado** `200.5`.

### Comprensiones

**Clave** `comprensiones`

**Definición** Una comprensión crea una nueva lista o diccionario a partir de una iteración, con un filtro opcional.

**Búsqueda** list comprehension, dict comprehension, transformar

**Para recordar** Selecciona los campos que necesita tu análisis.

#### Extraer montos completados

```python
montos = [p["monto"] for p in pedidos if p["pagado"]]
print(montos)
```

La condición conserva solo registros pagados.

**Resultado esperado** `[120.5, 80]`.

### Agregar, actualizar y eliminar

**Clave** `modificaciones`

**Definición** Los objetos Python deserializados son modificables: asignación para agregar o actualizar, `pop` para retirar claves y `append` para añadir elementos.

**Búsqueda** editar dict, append, pop

**Para recordar** Modificar el objeto no cambia el archivo hasta escribirlo.

#### Actualizar una copia

```python
datos = json.loads(texto)
datos[0]["estado"] = "refunded"
datos[0]["moneda"] = "MXN"
datos[0].pop("pagado")
datos.append({"id": 104})
print(datos[0]["estado"], datos[0]["moneda"], len(datos))
```

Se actualiza la lista en memoria.

**Resultado esperado** `refunded MXN 4`.

### Aplanamiento manual

**Clave** `aplanamiento-manual`

**Definición** Aplanar es transformar campos anidados en columnas o generar una fila por elemento de un arreglo interno.

**Búsqueda** flatten, normalizar JSON, tabla

**Para recordar** Conserva el id padre para relacionar registros.

#### Crear una fila por item

```python
filas = [{"id": p["id"], **item}
         for p in pedidos for item in p["items"]]
print(filas)
```

Los pedidos sin items no generan filas.

**Resultado esperado** `[{'id': 101, 'sku': 'A1', 'cantidad': 2}, {'id': 101, 'sku': 'B2', 'cantidad': 1}, {'id': 102, 'sku': 'A1', 'cantidad': 1}]`.

## Errores y validación

**Clave** `errores-y-validacion`

### Definición

**Clave** `definicion`

**Definición** Un JSON puede ser sintácticamente válido y aun así tener datos incorrectos para el negocio. Separa errores de lectura, de sintaxis y de estructura.

**Búsqueda** validar JSON, try except, calidad

**Para recordar** Parsear correctamente no garantiza datos correctos.

#### Detectar estructura inesperada

```python
v = json.loads('{"monto": "80"}')
print(isinstance(v["monto"], (int, float)))
```

El monto es texto, no número.

**Resultado esperado** `False`.

### JSONDecodeError

**Clave** `json-decode-error`

**Definición** `json.JSONDecodeError` indica que el decodificador no pudo interpretar el documento. Es una subclase de `ValueError`.

**Búsqueda** JSON inválido, try except, error de sintaxis

**Para recordar** Captura la excepción específica cuando quieras manejar JSON inválido.

#### Detectar una coma final

```python
try:
    json.loads('{"id": 101,}')
except json.JSONDecodeError as e:
    print(type(e).__name__)
```

La coma final no es válida.

**Resultado esperado** `JSONDecodeError`.

### Posición del error

**Clave** `posicion-del-error`

**Definición** `JSONDecodeError` ofrece `msg`, `pos`, `lineno`, `colno` y `doc` para diagnosticar el texto. `pos` comienza en cero; línea y columna en uno.

**Búsqueda** lineno colno pos, localizar error

**Para recordar** Inspecciona línea y columna antes de corregir.

#### Localizar un valor faltante

```python
try:
    json.loads('{"id": }')
except json.JSONDecodeError as e:
    print(e.pos, e.lineno, e.colno)
```

El cierre aparece donde se esperaba un valor.

**Resultado esperado** `7 1 8`.

### FileNotFoundError y UnicodeDecodeError

**Clave** `errores-de-archivo`

**Definición** Un archivo inexistente o bytes incompatibles con la codificación pueden impedir la lectura antes de interpretar JSON.

**Búsqueda** archivo no existe, bytes inválidos, encoding

**Para recordar** Distingue un problema de archivo de uno de sintaxis.

#### Capturar errores de lectura

```python
try:
    with open(carpeta / "no_existe.json", encoding="utf-8") as f:
        json.load(f)
except FileNotFoundError:
    print("Archivo ausente")
try:
    json.loads(b'"\xff"')
except UnicodeDecodeError:
    print("Codificación inválida")
```

El primer archivo no debe existir; los bytes del segundo caso son inválidos en UTF-8.

**Resultado esperado** `Archivo ausente` y `Codificación inválida`, en líneas separadas.

### TypeError y KeyError

**Clave** `type-error-y-key-error`

**Definición** `TypeError` puede indicar un objeto que el codificador no admite; `KeyError` indica que una clave buscada no existe en un diccionario.

**Búsqueda** error al serializar, clave faltante

**Para recordar** No confundas acceso a datos con serialización.

#### Distinguir dos errores

```python
try:
    json.dumps({"tags": {"a", "b"}})
except TypeError:
    print("Tipo incompatible")
try:
    print(pedidos[2]["cliente"]["ciudad"])
except KeyError:
    print("Clave ausente")
```

Un conjunto no se serializa directamente y Eva no tiene clave ciudad.

**Resultado esperado** `Tipo incompatible` y `Clave ausente`.

### null frente a clave inexistente

**Clave** `nulos-y-ausentes`

**Definición** Un campo con `null` existe y se convierte en `None`; un campo ausente no está en el diccionario.

**Búsqueda** missing, null, None, in

**Para recordar** Usa `in` para existencia y `is None` para nulos.

#### Distinguir ciudades

```python
for p in pedidos:
    c = p["cliente"]
    if "ciudad" not in c:
        estado = "ausente"
    elif c["ciudad"] is None:
        estado = "nula"
    else:
        estado = "presente"
    print(p["id"], estado)
```

Se distinguen los tres casos.

**Resultado esperado** `101 presente`, `102 nula`, `103 ausente`, en tres líneas.

### Campos obligatorios y tipos

**Clave** `validar-tipos`

**Definición** `isinstance` y pruebas de pertenencia permiten comprobar campos, tipos y reglas antes de analizar.

**Búsqueda** isinstance, validar registros, campos requeridos

**Para recordar** Comprueba que el registro sea un diccionario antes de acceder a sus claves.

#### Separar registros válidos

```python
datos = [{"id": 1, "monto": 50}, {"id": 2}, {"id": 3, "monto": "90"}]
validos = [p for p in datos if isinstance(p, dict)
           and "id" in p and type(p.get("monto")) in (int, float)]
print([p["id"] for p in validos])
```

La prueba de tipo exacto evita aceptar booleanos como enteros.

**Resultado esperado** `[1]`.

### Limpieza de tipos

**Clave** `limpieza-de-tipos`

**Definición** Los datos externos pueden representar un número como texto. Convierte de forma explícita y separa registros no convertibles.

**Búsqueda** limpieza, convertir string a número, registros incompletos

**Para recordar** No reemplaces datos inválidos por cero sin una regla de negocio.

#### Limpiar montos

```python
datos = [{"monto": "80.5"}, {"monto": "N/A"}, {"monto": None}]
for p in datos:
    try:
        print(float(p["monto"]))
    except (TypeError, ValueError):
        print("Revisar")
```

Solo el primer monto se convierte.

**Resultado esperado** `80.5`, `Revisar`, `Revisar`.

### Claves duplicadas

**Clave** `claves-duplicadas`

**Definición** El decodificador estándar conserva el último valor de una clave repetida en un mismo objeto. Esto puede ocultar datos.

**Búsqueda** duplicados, repeated keys, pérdida de datos

**Para recordar** Para detectar duplicados usa `object_pairs_hook` (grupo Decodificación personalizada).

#### Observar el último valor

```python
print(json.loads('{"monto": 80, "monto": 90}'))
```

La primera aparición se pierde al formar el diccionario.

**Resultado esperado** `{'monto': 90}`.

### JSON Schema

**Clave** `json-schema`

**Definición** JSON Schema describe requisitos de estructura y tipos; la biblioteca externa `jsonschema` puede comprobarlos.

**Búsqueda** schema, required, properties, validate

**Para recordar** Un esquema valida datos ya deserializados; no sustituye al parser.

**Nota** Requiere `pip install jsonschema`.

#### Validar monto y clave obligatoria

```python
from jsonschema import validate, ValidationError
esquema = {"type": "object", "required": ["monto"],
           "properties": {"monto": {"type": "number"}}}
for dato in ({"monto": 80}, {"monto": "80"}, {}):
    try:
        validate(dato, esquema)
        print("Válido")
    except ValidationError:
        print("Inválido")
```

La segunda entrada tiene un tipo incorrecto y la tercera carece del campo.

**Resultado esperado** `Válido`, `Inválido`, `Inválido`.

## Tipos especiales y compatibilidad

**Clave** `tipos-especiales`

### Definición

**Clave** `definicion`

**Definición** Algunos tipos Python no tienen equivalente JSON directo; otros cambian de representación. Decide cómo conservar significado antes de serializar.

**Búsqueda** tipo no serializable, compatibilidad

**Para recordar** JSON no conserva automáticamente clases ni tipos específicos de Python.

#### Convertir una tupla

```python
v = (101, 120.5)
print(type(json.loads(json.dumps(v))).__name__)
```

La tupla se escribe como arreglo.

**Resultado esperado** `list`.

### Tuplas y claves numéricas

**Clave** `tuplas-y-claves`

**Definición** Las tuplas se convierten en arreglos y las claves numéricas se convierten en cadenas; el round-trip puede cambiar el objeto.

**Búsqueda** tuple, int keys, round-trip

**Para recordar** Usa claves `str` cuando quieras conservarlas tal cual.

#### Comprobar cambios de tipos

```python
v = {101: ("Ana", 80)}
print(json.loads(json.dumps(v)))
```

La clave se convierte en texto y el valor en lista.

**Resultado esperado** `{'101': ['Ana', 80]}`.

### skipkeys

**Clave** `skipkeys`

**Definición** `skipkeys=True` omite claves no admitidas en vez de lanzar `TypeError`. Las claves admisibles incluyen `str`, `int`, `float`, `bool` y `None`.

**Búsqueda** skipkeys, claves incompatibles

**Para recordar** Omitir claves puede provocar pérdida silenciosa de datos.

#### Omitir una clave tupla

```python
obj = {("MX", 101): 80, "total": 80}
print(json.dumps(obj, skipkeys=True))
```

La clave tupla no se representa.

**Resultado esperado** `{"total": 80}`.

### default

**Clave** `default`

**Definición** `default` recibe objetos que no puede serializar el codificador estándar y debe devolver un valor compatible o lanzar `TypeError`.

**Búsqueda** default, serialización personalizada

**Para recordar** No uses `default=str` indiscriminadamente si necesitas preservar tipos.

#### Convertir conjuntos

```python
def convertir(obj):
    if isinstance(obj, set):
        return sorted(obj)
    raise TypeError("Tipo no soportado")
print(json.dumps({"canales": {"web", "app"}}, default=convertir))
```

El conjunto se representa mediante una lista ordenada.

**Resultado esperado** `{"canales": ["app", "web"]}`.

### datetime y date

**Clave** `datetime`

**Definición** Las fechas no se serializan directamente con `json`; ISO 8601 es una representación textual habitual.

**Búsqueda** datetime, date, isoformat, fechas

**Para recordar** La lectura posterior devuelve texto salvo que lo conviertas explícitamente.

#### Exportar y recuperar una fecha

```python
from datetime import date
s = json.dumps({"fecha": date(2026, 9, 14).isoformat()})
fecha = date.fromisoformat(json.loads(s)["fecha"])
print(s, fecha.year)
```

Se aplica una conversión explícita en ambos sentidos.

**Resultado esperado** `{"fecha": "2026-09-14"} 2026`.

### Decimal

**Clave** `decimal`

**Definición** `Decimal` permite representar importes decimales con precisión, pero no es serializable directamente. Puedes usar una cadena o unidades monetarias enteras según el contrato de intercambio.

**Búsqueda** Decimal, dinero, precisión

**Para recordar** Convertir a `float` puede perder precisión.

#### Preservar un importe como texto

```python
from decimal import Decimal
monto = Decimal("120.50")
s = json.dumps({"monto": str(monto)})
print(s, Decimal(json.loads(s)["monto"]))
```

El formato de intercambio define el importe como cadena.

**Resultado esperado** `{"monto": "120.50"} 120.50`.

### Objetos personalizados

**Clave** `objetos-personalizados`

**Definición** Para serializar instancias de clases propias, define una representación compatible, por ejemplo mediante `dataclasses.asdict`.

**Búsqueda** class, dataclass, asdict

**Para recordar** JSON no reconstruye instancias automáticamente.

#### Convertir un pedido de una clase

```python
from dataclasses import dataclass, asdict
@dataclass
class Pedido:
    id: int
    monto: int
print(json.dumps(asdict(Pedido(101, 120))))
```

`asdict` prepara un diccionario antes de serializar.

**Resultado esperado** `{"id": 101, "monto": 120}`.

### allow_nan

**Clave** `allow-nan`

**Definición** Por defecto, Python permite escribir `NaN`, `Infinity` y `-Infinity`, aunque no son números JSON estándar. `allow_nan=False` rechaza esos valores.

**Búsqueda** NaN, infinito, JSON estricto

**Para recordar** Para intercambio interoperable, decide cómo tratar no finitos antes de exportar.

#### Rechazar un valor no finito

```python
try:
    json.dumps({"monto": float("nan")}, allow_nan=False)
except ValueError:
    print("Monto no finito")
```

El codificador rechaza el valor especial.

**Resultado esperado** `Monto no finito`.

### check_circular

**Clave** `check-circular`

**Definición** `check_circular=True` detecta ciclos en estructuras contenedoras durante la serialización. Desactivarlo puede provocar recursión excesiva.

**Búsqueda** ciclo, referencia circular, ValueError

**Para recordar** Representa relaciones cíclicas mediante identificadores, no referencias al mismo objeto.

#### Detectar un ciclo

```python
v = []
v.append(v)
try:
    json.dumps(v)
except ValueError as e:
    print(str(e))
```

La lista contiene una referencia a sí misma.

**Resultado esperado** `Circular reference detected`.

## Decodificación personalizada

**Clave** `decodificacion-personalizada`

### Definición

**Clave** `definicion`

**Definición** Los parámetros del decodificador permiten cambiar cómo se interpretan los números y objetos JSON. Se utilizan cuando el contrato de datos requiere un tratamiento especial.

**Búsqueda** hooks, parse_float, parser

**Para recordar** Los hooks actúan durante la deserialización, no después.

#### Decodificar dinero como Decimal

```python
from decimal import Decimal
v = json.loads('120.50', parse_float=Decimal)
print(type(v).__name__, v)
```

El número se interpreta directamente como decimal.

**Resultado esperado** `Decimal 120.50`.

### parse_float

**Clave** `parse-float`

**Definición** `parse_float` recibe el texto de cada número JSON con parte decimal o exponente. Por defecto se utiliza `float`.

**Búsqueda** parse_float, Decimal, decimales

**Para recordar** Usa `Decimal` cuando necesites aritmética decimal exacta.

#### Sumar importes sin aproximación binaria

```python
from decimal import Decimal
v = json.loads('[0.1, 0.2]', parse_float=Decimal)
print(sum(v))
```

Los valores son decimales desde el origen.

**Resultado esperado** `0.3`.

### parse_int

**Clave** `parse-int`

**Definición** `parse_int` recibe el texto de cada número entero JSON. Por defecto se utiliza `int`.

**Búsqueda** parse_int, enteros

**Para recordar** No afecta a números decimales ni a booleanos.

#### Convertir enteros en Decimal

```python
from decimal import Decimal
v = json.loads('{"id": 101, "monto": 80}', parse_int=Decimal)
print(type(v["id"]).__name__)
```

El identificador también cambia de tipo; úsalo solo si lo deseas.

**Resultado esperado** `Decimal`.

### parse_constant

**Clave** `parse-constant`

**Definición** `parse_constant` se invoca para los tokens no estándar `NaN`, `Infinity` y `-Infinity` aceptados por el decodificador de Python.

**Búsqueda** rechazar NaN, Infinity, strict JSON

**Para recordar** `allow_nan=False` controla escritura; `parse_constant` permite controlar lectura.

#### Rechazar constantes especiales

```python
def rechazar(valor):
    raise ValueError(valor)
try:
    json.loads('{"monto": NaN}', parse_constant=rechazar)
except ValueError as e:
    print(e)
```

La función impide que el token se convierta a float.

**Resultado esperado** `NaN`.

### object_hook

**Clave** `object-hook`

**Definición** `object_hook` recibe cada objeto JSON ya convertido en diccionario y su retorno lo reemplaza. No se invoca para arreglos como tales.

**Búsqueda** hook, transformar dict, deserializar objetos

**Para recordar** Los objetos anidados también pasan por el hook.

#### Normalizar el estado de un pedido

```python
def normalizar(d):
    if "estado" in d:
        d["estado"] = d["estado"].lower()
    return d
print(json.loads('{"estado":"COMPLETED"}', object_hook=normalizar))
```

Se normaliza el campo durante la lectura.

**Resultado esperado** `{'estado': 'completed'}`.

### object_pairs_hook

**Clave** `object-pairs-hook`

**Definición** `object_pairs_hook` recibe los pares de cada objeto antes de formar un diccionario. Tiene prioridad sobre `object_hook` si se proporcionan ambos.

**Búsqueda** duplicados, pares ordenados, hook

**Para recordar** Comprueba claves repetidas antes de perderlas.

#### Rechazar claves repetidas

```python
def sin_duplicados(pares):
    d = {}
    for clave, valor in pares:
        if clave in d:
            raise ValueError(f"Duplicada: {clave}")
        d[clave] = valor
    return d
try:
    json.loads('{"id": 1, "id": 2}', object_pairs_hook=sin_duplicados)
except ValueError as e:
    print(e)
```

La segunda aparición provoca un error.

**Resultado esperado** `Duplicada: id`.

### strict

**Clave** `strict`

**Definición** `strict=False` permite caracteres de control sin escapar dentro de cadenas JSON. No habilita comas finales ni comentarios.

**Búsqueda** strict False, control characters

**Para recordar** Mantén el valor predeterminado `True` salvo necesidad específica.

#### Leer un salto de línea literal

```python
s = '"A\nB"'
try:
    json.loads(s)
except json.JSONDecodeError:
    print("Rechazado")
print(repr(json.loads(s, strict=False)))
```

La cadena contiene un salto real sin escape JSON.

**Resultado esperado** `Rechazado` y luego `'A\nB'`.

## JSONEncoder y JSONDecoder

**Clave** `encoder-y-decoder`

### Definición

**Clave** `definicion`

**Definición** `JSONEncoder` y `JSONDecoder` son las clases que realizan la codificación y la decodificación. Se pueden instanciar o extender para personalizar el comportamiento.

**Búsqueda** encoder decoder, clases json

**Para recordar** Las funciones `dumps` y `loads` son la interfaz habitual.

#### Usar una instancia

```python
encoder = json.JSONEncoder()
decoder = json.JSONDecoder()
print(decoder.decode(encoder.encode({"id": 101})))
```

Se realiza la ida y vuelta con métodos de las clases.

**Resultado esperado** `{'id': 101}`.

### encode()

**Clave** `encode`

**Definición** `JSONEncoder.encode(obj)` devuelve el documento JSON como `str`, aplicando las opciones del codificador.

**Búsqueda** encode, JSONEncoder

**Para recordar** No confundir con `str.encode`, que convierte texto en bytes.

#### Codificar un monto

```python
encoder = json.JSONEncoder(separators=(",", ":"))
print(encoder.encode({"monto": 80}))
```

La instancia conserva la configuración compacta.

**Resultado esperado** `{"monto":80}`.

### decode()

**Clave** `decode`

**Definición** `JSONDecoder.decode(s)` convierte un documento completo en valores Python. En esta interfaz de clase, `s` es texto.

**Búsqueda** decode, JSONDecoder

**Para recordar** El documento completo debe ser válido.

#### Recuperar un importe

```python
decoder = json.JSONDecoder()
print(decoder.decode('{"monto": 80}')["monto"])
```

El diccionario devuelto permite acceder por clave.

**Resultado esperado** `80`.

### iterencode()

**Clave** `iterencode`

**Definición** `JSONEncoder.iterencode(obj)` genera fragmentos de texto para escribir o transmitir el documento progresivamente. Los fragmentos no son registros independientes.

**Búsqueda** streaming, fragmentos, iterencode

**Para recordar** Reduce la necesidad de construir una única cadena grande, pero el objeto fuente sigue en memoria.

#### Unir fragmentos

```python
encoder = json.JSONEncoder()
fragmentos = encoder.iterencode(resumen)
s = "".join(fragmentos)
print(json.loads(s) == resumen)
```

Los fragmentos concatenados forman un documento.

**Resultado esperado** `True`.

### raw_decode()

**Clave** `raw-decode`

**Definición** `JSONDecoder.raw_decode(s)` devuelve el valor inicial y el índice donde termina ese valor. Puede dejar texto posterior sin consumir.

**Búsqueda** raw_decode, Extra data, parse parcial

**Para recordar** Empieza en el índice de un valor; no omite automáticamente espacios iniciales.

#### Leer un objeto al inicio de un texto

```python
v, fin = json.JSONDecoder().raw_decode('{"id":1} resto')
print(v, fin)
```

El sufijo no se interpreta.

**Resultado esperado** `{'id': 1} 8`.

### cls con JSONEncoder

**Clave** `cls-encoder`

**Definición** El parámetro `cls` permite usar una subclase de `JSONEncoder` que personalice `default`.

**Búsqueda** cls, custom encoder, herencia

**Para recordar** Llama a `super().default(obj)` si no reconoces el tipo.

#### Serializar fechas automáticamente

```python
from datetime import date
class EncoderFecha(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, date):
            return obj.isoformat()
        return super().default(obj)
print(json.dumps({"fecha": date(2026, 9, 14)}, cls=EncoderFecha))
```

La clase define la conversión de fechas.

**Resultado esperado** `{"fecha": "2026-09-14"}`.

### cls con JSONDecoder

**Clave** `cls-decoder`

**Definición** El parámetro `cls` permite usar una subclase de `JSONDecoder` con una configuración propia.

**Búsqueda** cls, custom decoder

**Para recordar** Mantén los argumentos compatibles con la clase base.

#### Crear un decodificador decimal

```python
from decimal import Decimal
class DecoderDinero(json.JSONDecoder):
    def __init__(self, **kwargs):
        kwargs.setdefault("parse_float", Decimal)
        super().__init__(**kwargs)
v = json.loads('12.50', cls=DecoderDinero)
print(type(v).__name__, v)
```

La subclase establece un tratamiento decimal predeterminado.

**Resultado esperado** `Decimal 12.50`.

## JSON Lines y documentos grandes

**Clave** `jsonl-y-documentos-grandes`

### Definición

**Clave** `definicion`

**Definición** JSON Lines (JSONL) almacena un valor JSON válido por línea, normalmente un registro. Permite procesar archivos sin cargar todos los registros a la vez.

**Búsqueda** jsonl, ndjson, archivos grandes

**Para recordar** No es un arreglo JSON normal; cada línea se interpreta por separado.

#### Leer la primera línea

```python
with open(ruta_jsonl, encoding="utf-8") as f:
    print(json.loads(next(f)))
```

La primera línea es un documento independiente.

**Resultado esperado** `{'id': 101, 'monto': 120.5}`.

### Leer línea por línea

**Clave** `lectura-lineas`

**Definición** Recorre un archivo JSONL con `for` y deserializa cada línea. El archivo no necesita cargarse entero en memoria.

**Búsqueda** streaming, leer ndjson, for line

**Para recordar** Una línea vacía no es un valor JSON válido; define si la rechazas o la omites.

#### Sumar montos incrementalmente

```python
total = 0
with open(ruta_jsonl, encoding="utf-8") as f:
    for linea in f:
        total += json.loads(linea)["monto"]
print(total)
```

Solo se mantiene el acumulador y el registro actual.

**Resultado esperado** `250.5`.

### Escribir y añadir registros

**Clave** `escritura-jsonl`

**Definición** Para escribir JSONL, serializa cada registro sin sangría y agrega un salto de línea. El modo `a` permite añadir registros al final.

**Búsqueda** append, jsonl, ndjson, dump por línea

**Para recordar** Un documento por línea; no uses `indent` en JSONL.

#### Añadir un registro a una copia

```python
p = carpeta / "copia.jsonl"
p.write_text(ruta_jsonl.read_text(encoding="utf-8"), encoding="utf-8")
with open(p, "a", encoding="utf-8") as f:
    f.write(json.dumps({"id": 104, "monto": 10}) + "\n")
print(len(p.read_text(encoding="utf-8").splitlines()))
```

El archivo original permanece intacto.

**Resultado esperado** `4`.

### Memoria y procesamiento incremental

**Clave** `memoria`

**Definición** `json.load` interpreta un documento completo y construye su estructura en memoria. JSONL permite consumir registros uno a uno; para arreglos JSON enormes se necesita un parser incremental externo o cambiar de formato.

**Búsqueda** memoria, archivo grande, streaming, generador

**Para recordar** `iterencode` sirve para escribir, no para leer un arreglo incrementalmente.

#### Crear un iterador de montos

```python
with open(ruta_jsonl, encoding="utf-8") as f:
    montos = (json.loads(linea)["monto"] for linea in f)
    print(max(montos))
```

El generador se consume mientras el archivo sigue abierto.

**Resultado esperado** `120.5`.

### Errores por registro

**Clave** `errores-jsonl`

**Definición** Puedes identificar la línea que falla y decidir si detener el procesamiento o registrar el error.

**Búsqueda** JSONL inválido, enumerate, registros defectuosos

**Para recordar** No omitas errores silenciosamente.

#### Identificar líneas inválidas

```python
from io import StringIO
f = StringIO('{"id":1}\nno-json\n{"id":3}\n')
for numero, linea in enumerate(f, start=1):
    try:
        print(json.loads(linea)["id"])
    except json.JSONDecodeError:
        print(f"Error en línea {numero}")
```

Los registros válidos se procesan y el error se reporta.

**Resultado esperado** `1`, `Error en línea 2`, `3`.

## Seguridad y validación en terminal

**Clave** `seguridad-y-terminal`

### Definición

**Clave** `definicion`

**Definición** El módulo analiza datos, no código, pero documentos no confiables pueden consumir memoria y CPU en exceso. Limita recursos y valida el contenido.

**Búsqueda** seguridad, JSON externo, límites

**Para recordar** No uses `eval` para interpretar JSON.

#### Interpretar datos sin evaluar código

```python
try:
    json.loads('1 + 2')
except json.JSONDecodeError:
    print("No es JSON")
```

Una expresión Python no se ejecuta como JSON.

**Resultado esperado** `No es JSON`.

### Limitar tamaño y profundidad

**Clave** `limites`

**Definición** Limita los bytes antes de parsear; considera límites de profundidad, número de registros y tamaños de campos. El módulo no ofrece un parámetro general `max_depth`.

**Búsqueda** límite de bytes, RecursionError, DoS

**Para recordar** Un límite de tamaño ayuda, pero no reemplaza otros controles de recursos.

#### Rechazar un archivo demasiado grande

```python
limite = 100
with open(ruta, "rb") as f:
    contenido = f.read(limite + 1)
if len(contenido) > limite:
    print("Excede el límite")
else:
    print(json.loads(contenido))
```

No se lee más del límite más un byte.

**Resultado esperado** `Excede el límite`.

### python -m json.tool

**Clave** `json-tool`

**Definición** `python -m json.tool` permite revisar sintaxis y formatear un documento desde terminal sin escribir un script.

**Búsqueda** CLI, validar, pretty print

**Para recordar** La validación del parser no comprueba reglas del negocio ni todos los requisitos de JSON estricto.

**Nota** En Python 3.14+ también se admite `python -m json`. Usa `python3` si ese es el nombre de tu intérprete.

#### Formatear un archivo

```bash
python -m json.tool json_practica/pedidos.json
```

Usa la ruta creada en Datos compartidos desde el mismo directorio.

**Resultado esperado** El arreglo de tres pedidos aparece formateado en la terminal.

### Opciones de json.tool

**Clave** `opciones-json-tool`

**Definición** La interfaz de terminal permite ordenar claves, conservar Unicode, compactar y procesar JSONL mediante opciones de línea de comandos.

**Búsqueda** sort-keys, no-ensure-ascii, json-lines, compact

**Para recordar** Consulta `--help` para las opciones disponibles en tu versión.

#### Formatear registros JSONL

```bash
python -m json.tool --json-lines --compact json_practica/pedidos.jsonl
```

Cada línea se valida y se emite compactada.

**Resultado esperado** Tres líneas: `{"id":101,"monto":120.5}`, `{"id":102,"monto":80}`, `{"id":103,"monto":50}`.

## APIs HTTP

**Clave** `apis-http`

### Definición

**Clave** `definicion`

**Definición** Muchas APIs entregan documentos JSON como respuestas HTTP. La biblioteca externa `requests` permite pedirlos y convertirlos en objetos Python.

**Búsqueda** API, HTTP, requests, response.json

**Para recordar** Revisa estado HTTP y formato de respuesta antes de confiar en los datos.

**Nota** Requiere `pip install requests`. Las respuestas simuladas usan `_content` solo para preparar la demostración.

#### Simular una respuesta JSON

```python
from requests import Response
r = Response()
r.status_code = 200
r._content = b'{"total":3}'
print(r.json()["total"])
```

La respuesta simulada permite practicar sin internet.

**Resultado esperado** `3`.

### requests.get()

**Clave** `requests-get`

**Definición** `requests.get(url, params=..., timeout=...)` realiza una petición HTTP GET. `params` configura parámetros de consulta; `timeout` limita esperas de conexión y lectura.

**Búsqueda** GET, query params, timeout, status_code

**Para recordar** Una respuesta HTTP no garantiza éxito ni formato JSON.

**Nota** Requiere requests e internet. Endpoint externo; ejemplo no ejecutado en la revisión.

#### Consultar un endpoint de prueba

```python
import requests
r = requests.get("https://httpbin.org/get", params={"page": 1}, timeout=10)
r.raise_for_status()
print(r.json()["args"]["page"])
```

El servicio de prueba devuelve los parámetros recibidos.

**Resultado esperado** `1` como texto, si el servicio está disponible.

### response.json() y errores HTTP

**Clave** `response-json`

**Definición** `response.json()` deserializa el cuerpo. Puede fallar si el cuerpo no es JSON, y puede devolver JSON aun cuando el estado HTTP indique un error.

**Búsqueda** response.json, raise_for_status, HTTPError, JSONDecodeError

**Para recordar** `raise_for_status()` antes de procesar una respuesta de éxito esperada.

**Nota** `requests.exceptions.JSONDecodeError` identifica respuestas no interpretables como JSON.

#### Distinguir estado y contenido

```python
from requests import Response, exceptions
r = Response()
r.status_code = 404
r._content = b'{"error":"Not found"}'
print(r.json()["error"])
try:
    r.raise_for_status()
except exceptions.HTTPError:
    print("Error HTTP")
```

El cuerpo es JSON válido, aunque la solicitud falló.

**Resultado esperado** `Not found` y `Error HTTP`.

### Extraer registros y metadatos

**Clave** `registros-y-metadatos`

**Definición** Una API puede devolver un objeto envolvente con registros en una clave y metadatos como total o página en otras.

**Búsqueda** data, results, metadata, nested API

**Para recordar** Inspecciona el contrato antes de asumir que la raíz es una lista.

#### Separar datos y total

```python
respuesta = json.loads('{"data":[{"id":101}],"meta":{"total":3}}')
print(respuesta["data"], respuesta["meta"]["total"])
```

`data` contiene la página, no todos los registros necesariamente.

**Resultado esperado** `[{'id': 101}] 3`.

### Paginación

**Clave** `paginacion`

**Definición** Una API paginada divide registros en respuestas. El indicador de página siguiente puede ser una URL, un número o un cursor.

**Búsqueda** pagination, next, cursor, API

**Para recordar** Sigue el contrato, controla errores y limita el número de páginas.

**Nota** En una API real, establece timeout, verifica códigos HTTP y evita ciclos de cursores.

#### Recorrer páginas simuladas

```python
paginas = {
    1: '{"data":[{"id":101},{"id":102}],"next":2}',
    2: '{"data":[{"id":103}],"next":null}'
}
pagina = 1
registros = []
while pagina is not None:
    r = json.loads(paginas[pagina])
    registros.extend(r["data"])
    pagina = r["next"]
print([r["id"] for r in registros])
```

Se simula una API con dos páginas; no se necesita red.

**Resultado esperado** `[101, 102, 103]`.

## Pandas y JSON

**Clave** `pandas-y-json`

### Definición

**Clave** `definicion`

**Definición** Pandas permite representar registros JSON como DataFrames y exportarlos. `json` sigue siendo útil para inspeccionar o transformar estructuras antes de tabularlas.

**Búsqueda** pandas, dataframe, json a tabla

**Para recordar** Una fila por entidad requiere elegir qué nivel de anidamiento tabular.

**Nota** Requiere `pip install pandas`. Las fichas de este grupo usan esa dependencia.

#### Crear un DataFrame de registros planos

```python
import pandas as pd
df = pd.DataFrame(resumen)
print(df.to_dict(orient="records"))
```

Cada pedido se convierte en una fila.

**Resultado esperado** Tres registros: `(id, monto)` = `(101, 120.5)`, `(102, 80.0)`, `(103, 50.0)`.

### pd.read_json()

**Clave** `read-json`

**Definición** `pd.read_json` importa documentos JSON según la orientación de sus datos. Para arreglos de registros planos usa `orient="records"`.

**Búsqueda** read_json, importar JSON, orient

**Para recordar** Usa una ruta de archivo o `StringIO` para texto literal.

#### Leer registros de una cadena

```python
import pandas as pd
from io import StringIO
df = pd.read_json(StringIO(json.dumps(resumen)), orient="records")
print(list(df.columns), len(df))
```

StringIO presenta el texto como archivo legible.

**Resultado esperado** `['id', 'monto'] 3`.

### pd.json_normalize()

**Clave** `json-normalize`

**Definición** `pd.json_normalize` convierte objetos anidados en columnas, usando por defecto un punto para separar niveles de claves.

**Búsqueda** json_normalize, flatten, datos anidados

**Para recordar** Los arreglos internos requieren elegir si se expanden a filas.

#### Aplanar el cliente

```python
import pandas as pd
df = pd.json_normalize(pedidos)
print(df[["id", "cliente.nombre"]].to_dict(orient="records"))
```

El nombre anidado se convierte en una columna.

**Resultado esperado** Tres filas: `(101, Ana)`, `(102, Luis)`, `(103, Eva)`; columnas `id` y `cliente.nombre`.

### record_path y meta

**Clave** `record-path-y-meta`

**Definición** `record_path` indica qué lista anidada se convierte en filas; `meta` conserva campos del objeto padre.

**Búsqueda** record_path, meta, expandir items

**Para recordar** Cada item genera una fila; pedidos sin items no generan filas.

#### Crear una tabla de productos por pedido

```python
import pandas as pd
df = pd.json_normalize(pedidos, record_path="items", meta=["id"])
print(df[["id", "sku", "cantidad"]].to_dict(orient="records"))
```

Se conserva el id del pedido junto con cada producto.

**Resultado esperado** Tres filas: `(101, A1, 2)`, `(101, B2, 1)`, `(102, A1, 1)`; columnas `id`, `sku`, `cantidad`.

### Nulos al tabular

**Clave** `nulos-pandas`

**Definición** Pandas puede representar campos nulos y ausentes como valores faltantes. Si debes distinguirlos, registra la presencia de la clave antes de convertir a tabla.

**Búsqueda** NaN, NA, missing, isna

**Para recordar** No asumas que `None` y una clave ausente se conservan como categorías distintas.

#### Detectar faltantes de ciudad

```python
import pandas as pd
df = pd.json_normalize(pedidos)
print(df["cliente.ciudad"].isna().tolist())
```

Ana tiene ciudad y los otros dos registros carecen de valor útil.

**Resultado esperado** `[False, True, True]`.

### df.to_json() y orient

**Clave** `to-json`

**Definición** `DataFrame.to_json` genera texto o escribe un archivo. `orient` controla la estructura: `records` produce un arreglo de filas; otras orientaciones, como `split`, guardan información separada de columnas e índice.

**Búsqueda** to_json, records, split, exportar

**Para recordar** Usa `orient="records"` para una lista de objetos; no conserva el índice por defecto en esa orientación.

**Nota** `force_ascii` en pandas cumple una función similar a `ensure_ascii` en json; para fechas puede usarse `date_format="iso"`.

#### Exportar filas

```python
import pandas as pd
df = pd.DataFrame(resumen)
s = df.to_json(orient="records", force_ascii=False)
print(json.loads(s)[0])
```

El primer registro contiene los dos campos de la tabla.

**Resultado esperado** `{'id': 101, 'monto': 120.5}`.

### JSONL con pandas

**Clave** `pandas-jsonl`

**Definición** Pandas lee y escribe JSONL con `lines=True`; al escribir usa `orient="records"`. `chunksize` permite iterar por bloques.

**Búsqueda** read_json lines, chunksize, ndjson

**Para recordar** La lectura por bloques necesita `lines=True`.

#### Procesar bloques de dos registros

```python
import pandas as pd
for bloque in pd.read_json(ruta_jsonl, lines=True, chunksize=2):
    print(len(bloque))
```

El archivo tiene tres registros.

**Resultado esperado** Dos líneas: `2` y `1`.

## Conversión entre formatos

**Clave** `conversion-de-formatos`

### Definición

**Clave** `definicion`

**Definición** JSON puede intercambiarse con CSV, Excel y formatos tabulares. Al convertir, selecciona el nivel de filas y las columnas necesarias.

**Búsqueda** JSON a CSV, Excel, exportar, convertir

**Para recordar** Una tabla plana no conserva automáticamente toda la jerarquía JSON.

#### Preparar filas planas

```python
filas = [{"id": p["id"], "nombre": p["cliente"]["nombre"]} for p in pedidos]
print(filas[0])
```

Se extraen únicamente dos campos por pedido.

**Resultado esperado** `{'id': 101, 'nombre': 'Ana'}`.

### JSON a CSV

**Clave** `json-a-csv`

**Definición** `csv.DictWriter` convierte diccionarios planos en filas delimitadas. Declara las columnas para obtener una salida consistente.

**Búsqueda** DictWriter, writeheader, JSON CSV

**Para recordar** CSV no guarda tipos ni objetos anidados de manera nativa.

#### Exportar montos a CSV

```python
import csv
p = carpeta / "resumen.csv"
with open(p, "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["id", "monto"])
    w.writeheader()
    w.writerows(resumen)
print(p.read_text(encoding="utf-8"))
```

El encabezado y tres filas se escriben sin conservar tipos explícitos.

**Resultado esperado** Líneas `id,monto`, `101,120.5`, `102,80`, `103,50`.

### CSV a JSON

**Clave** `csv-a-json`

**Definición** `csv.DictReader` lee cada fila como diccionario de cadenas. Convierte los campos numéricos explícitamente antes de serializar.

**Búsqueda** DictReader, tipos CSV, CSV JSON

**Para recordar** Sin conversiones, los números se exportan como cadenas.

#### Convertir un CSV de ejemplo

```python
import csv
from io import StringIO
f = StringIO("id,monto\n101,120.5\n102,80\n")
filas = [{"id": int(r["id"]), "monto": float(r["monto"])}
         for r in csv.DictReader(f)]
print(json.dumps(filas))
```

Se recuperan tipos numéricos antes de escribir JSON.

**Resultado esperado** `[{"id": 101, "monto": 120.5}, {"id": 102, "monto": 80.0}]`.

### JSON a Excel

**Clave** `json-a-excel`

**Definición** Un DataFrame plano se puede guardar en una hoja Excel mediante `to_excel`. Las entidades anidadas pueden ir en hojas separadas.

**Búsqueda** Excel, xlsx, to_excel, openpyxl

**Para recordar** Usa `index=False` si el índice no forma parte de tus datos.

**Nota** Requiere `pip install pandas openpyxl`.

#### Exportar resumen a Excel

```python
import pandas as pd
p = carpeta / "resumen.xlsx"
pd.DataFrame(resumen).to_excel(p, index=False, engine="openpyxl")
print(pd.read_excel(p, engine="openpyxl").shape)
```

Se escribe una hoja con dos columnas y tres filas de datos.

**Resultado esperado** `(3, 2)`.

### Excel a JSON

**Clave** `excel-a-json`

**Definición** Lee una hoja con pandas y exporta sus filas con `to_json(orient="records")`. Los nulos y fechas requieren una política de conversión.

**Búsqueda** read_excel, xlsx a JSON, records

**Para recordar** Escoge explícitamente formato de fechas y columnas de salida.

**Nota** Requiere pandas y openpyxl.

#### Convertir una hoja de práctica

```python
import pandas as pd
p = carpeta / "entrada.xlsx"
pd.DataFrame(resumen).to_excel(p, index=False, engine="openpyxl")
df = pd.read_excel(p, engine="openpyxl")
s = df.to_json(orient="records", date_format="iso")
print(len(json.loads(s)))
```

El ejemplo crea su propia hoja de entrada.

**Resultado esperado** `3`.

## Fuentes

- [Python 3.11 — json](https://docs.python.org/3.11/library/json.html): funciones, clases, parámetros, excepciones, CLI y comportamiento del decodificador.
- [Python — open](https://docs.python.org/3/library/functions.html#open): modos de apertura y codificación.
- [Python — tipos integrados](https://docs.python.org/3/library/stdtypes.html): diccionarios, listas y operaciones de acceso.
- [Python — csv](https://docs.python.org/3/library/csv.html): DictReader y DictWriter.
- [Python — decimal](https://docs.python.org/3/library/decimal.html): precisión decimal.
- [Python — datetime](https://docs.python.org/3/library/datetime.html): fechas ISO.
- [RFC 8259 — JSON](https://www.rfc-editor.org/rfc/rfc8259): sintaxis, interoperabilidad, codificación y números.
- [JSON Lines](https://jsonlines.org/): UTF-8, valor por línea y terminador de línea.
- [jsonschema — validación](https://python-jsonschema.readthedocs.io/en/stable/validate/): validate y ValidationError.
- [Requests — Quickstart](https://requests.readthedocs.io/en/latest/user/quickstart/): GET, params, JSON, códigos HTTP y timeout.
- [pandas — read_json](https://pandas.pydata.org/docs/reference/api/pandas.read_json.html): orientaciones, líneas y bloques.
- [pandas — json_normalize](https://pandas.pydata.org/docs/reference/api/pandas.json_normalize.html): campos anidados, record_path y meta.
- [pandas — DataFrame.to_json](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_json.html): exportación, fechas, orientaciones y JSONL.
- [pandas — read_excel](https://pandas.pydata.org/docs/reference/api/pandas.read_excel.html) y [DataFrame.to_excel](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_excel.html): conversión de hojas de cálculo.
