# HTTPX

**Clave** `httpx`

**Área** Análisis de datos · Python (ubicación propuesta)

**Resumen** Cliente HTTP síncrono y asíncrono para consultar APIs, enviar datos y automatizar extracciones desde Python.

**Alcance** Fundamentos HTTP, peticiones, respuestas, clientes, errores, autenticación, seguridad, asincronía, streaming, configuración y transportes; patrones de consumo de APIs, extracción, ETL y pruebas. Incluye fundamentos y extensiones avanzadas; no presupone que todas sean requisitos de entrevistas junior.

**Entorno** Python 3.10+ y HTTPX 0.28.1 (versión de referencia). Instalación: `python -m pip install httpx==0.28.1`. Los ejemplos usan código Python; las dependencias complementarias se indican donde corresponda. Los ejemplos simulados no necesitan Internet. Los de infraestructura real identifican sus requisitos y no se ejecutan contra servicios externos.

## Datos compartidos

API ficticia de pedidos en `https://ventas.example`. Se utiliza `httpx.MockTransport` para devolver respuestas deterministas sin servidor real. Ejecuta la preparación una vez y cada ejemplo por separado en el mismo entorno; los ejemplos usan clientes independientes y el servidor de prueba no modifica los pedidos al recibir escrituras. La simulación no verifica TLS, proxies, tiempos reales, pooling ni protocolos de red; esos ejemplos requieren infraestructura real.

| id | cliente | importe | estado | fecha |
| --- | --- | ---: | --- | --- |
| 1 | Ana | 800 | completed | 2026-08-01 |
| 2 | Luis | 300 | cancelled | 2026-08-02 |
| 3 | Ana | 500 | completed | 2026-08-03 |
| 4 | Marta | 900 | completed | 2026-08-04 |

#### Preparar la API simulada

```python
import httpx
import json
import asyncio
from pathlib import Path
from tempfile import TemporaryDirectory

BASE = "https://ventas.example"
PEDIDOS = [
    {"id": 1, "cliente": "Ana", "importe": 800,
     "estado": "completed", "fecha": "2026-08-01"},
    {"id": 2, "cliente": "Luis", "importe": 300,
     "estado": "cancelled", "fecha": "2026-08-02"},
    {"id": 3, "cliente": "Ana", "importe": 500,
     "estado": "completed", "fecha": "2026-08-03"},
    {"id": 4, "cliente": "Marta", "importe": 900,
     "estado": "completed", "fecha": "2026-08-04"},
]


def handler(req):
    p = req.url.path
    q = req.url.params
    if p == "/pedidos" and req.method == "GET":
        filas = [x for x in PEDIDOS if
                 (not q.get("estado") or x["estado"] == q["estado"])
                 and x["fecha"] > q.get("desde", "")]
        n = int(q.get("limit", "2"))
        i = int(q.get("cursor", q.get("offset", "0")))
        if "page" in q:
            i = (int(q["page"]) - 1) * n
        siguiente = str(i+n) if i+n < len(filas) else None
        headers = {}
        if siguiente is not None:
            headers["Link"] = (f'<{BASE}/pedidos?offset={siguiente}&limit={n}>; rel="next"')
        return httpx.Response(200, json={"items": filas[i:i+n],
                              "next_cursor": siguiente, "total": len(filas)},
                              headers=headers)
    if p.startswith("/pedidos/") and req.method == "GET":
        fila = next((x for x in PEDIDOS if str(x["id"]) == p.rsplit("/",1)[-1]), None)
        return httpx.Response(200 if fila else 404, json=fila or {"error": "no encontrado"})
    if p == "/echo" or (p.startswith("/pedidos") and req.method != "GET"):
        if req.method == "HEAD":
            return httpx.Response(200, headers={"X-Total": "4"})
        if req.method == "OPTIONS":
            return httpx.Response(204, headers={"Allow": "GET, POST, OPTIONS"})
        if req.method == "DELETE":
            return httpx.Response(204)
        return httpx.Response(201 if req.method == "POST" else 200,
            json={"method": req.method, "params": list(q.multi_items()),
                  "authorization": req.headers.get("Authorization"),
                  "accept": req.headers.get("Accept"),
                  "cookie": req.headers.get("Cookie"),
                  "content_type": req.headers.get("Content-Type"),
                  "body": req.content.decode("utf-8", errors="replace")})
    if p == "/csv":
        return httpx.Response(200, content=b"id,importe\n1,800\n3,500\n",
                              headers={"Content-Type": "text/csv; charset=utf-8"})
    if p == "/ndjson":
        return httpx.Response(200, text='{"id":1}\n{"id":3}\n')
    if p == "/redirect":
        return httpx.Response(302, headers={"Location": "/pedidos/1"})
    if p == "/loop":
        return httpx.Response(302, headers={"Location": "/loop"})
    if p == "/login":
        return httpx.Response(200, json={"ok": True}, headers={"Set-Cookie": "session=demo; Path=/"})
    if p == "/private":
        ok = req.headers.get("Authorization") == "Bearer demo"
        return httpx.Response(200 if ok else 401, json={"ok": ok})
    if p == "/cache":
        h = {"ETag": '"v1"', "Last-Modified": "Sat, 01 Aug 2026 00:00:00 GMT"}
        if req.headers.get("If-None-Match") == h["ETag"] or (
            "If-None-Match" not in req.headers and req.headers.get("If-Modified-Since") == h["Last-Modified"]):
            return httpx.Response(304, headers=h)
        return httpx.Response(200, json={"total": 4}, headers=h)
    if p == "/graphql":
        return httpx.Response(200, json={"data": {"pedidos": [{"id": 1}]}})
    if p == "/malformado":
        return httpx.Response(200, text="no es JSON")
    if p == "/timeout":
        raise httpx.ReadTimeout("simulado", request=req)
    if p == "/conexion":
        raise httpx.ConnectError("simulado", request=req)
    if p.startswith("/status/"):
        estado = int(p.rsplit("/", 1)[-1])
        return httpx.Response(estado, headers={"Retry-After": "2"} if estado == 429 else {})
    return httpx.Response(404)


def demo(**kwargs):
    return httpx.Client(base_url=BASE, transport=httpx.MockTransport(handler), **kwargs)


def demo_async(**kwargs):
    return httpx.AsyncClient(base_url=BASE, transport=httpx.MockTransport(handler), **kwargs)

```

`demo()` y `demo_async()` son auxiliares de estos apuntes, no funciones de HTTPX. Los ejemplos con `httpx.get()` directamente usan una URL real cuando se indica. En un script asíncrono se usa `asyncio.run()`; en Jupyter con un bucle activo, ejecuta `await main()` en su lugar.

## Fundamentos HTTP

**Clave** `fundamentos-http`

### Definición

**Clave** `definicion`

**Definición** HTTP es el protocolo de intercambio entre un cliente y un servidor. HTTPX permite construir peticiones y leer respuestas en Python.

**Búsqueda** HTTPX, API, request, response, qué es

**Para recordar** El cliente solicita; el servidor responde.

#### Consultar un pedido

```python
with demo() as c:
    r = c.get("/pedidos/1")
    print(r.status_code, r.json()["importe"])
```

El cliente solicita; el servidor responde.

**Resultado esperado** `200 800`.

### Instalación e importación

**Clave** `instalacion-e-importacion`

**Definición** Instala HTTPX en el entorno de Python que ejecuta tu código e impórtalo como módulo.

**Búsqueda** pip, import, versión

**Para recordar** `httpx` es una dependencia externa, no parte de la biblioteca estándar.

#### Comprobar la instalación

```python
import httpx
print(httpx.__version__)
```

`httpx` es una dependencia externa, no parte de la biblioteca estándar.

**Resultado esperado** `0.28.1` en el entorno de referencia.

### Cliente, servidor y endpoint

**Clave** `cliente-servidor-y-endpoint`

**Definición** Un endpoint es una ruta que ofrece una operación de una API; la URL incluye el esquema, host y ruta.

**Búsqueda** REST, endpoint, URL, recurso

**Para recordar** La documentación de la API define qué rutas y métodos existen.

#### Identificar un recurso

```python
u = httpx.URL(BASE + "/pedidos/3")
print(u.scheme, u.host, u.path)
```

La documentación de la API define qué rutas y métodos existen.

**Resultado esperado** `https ventas.example /pedidos/3`.

### Métodos seguros e idempotentes

**Clave** `metodos-seguros-e-idempotentes`

**Definición** Un método seguro no solicita cambios de estado; uno idempotente tiene el mismo efecto pretendido si se repite. GET es seguro; PUT y DELETE son idempotentes por semántica HTTP, POST normalmente no.

**Búsqueda** GET, PUT, DELETE, idempotencia

**Para recordar** No reintentes escrituras automáticamente sin conocer el contrato.

#### Consultar dos veces

```python
with demo() as c:
    print(c.get("/pedidos/1").json() == c.get("/pedidos/1").json())
```

No reintentes escrituras automáticamente sin conocer el contrato.

**Resultado esperado** `True`; la consulta no cambia los datos de la simulación.

## Métodos HTTP

**Clave** `metodos-http`

### Definición

**Clave** `definicion`

**Definición** Los métodos indican qué operación deseas realizar sobre un recurso. HTTPX ofrece funciones directas (`httpx.get`, `httpx.post`, `httpx.put`, `httpx.patch`, `httpx.delete`, `httpx.head`, `httpx.options`, `httpx.request`) y métodos equivalentes de Client.

**Búsqueda** get, post, put, patch, delete, request

**Para recordar** El método y la URL identifican la operación.

#### Enviar una petición genérica

```python
with demo() as c:
    print(c.request("GET", "/pedidos/1").status_code)
```

El método y la URL identifican la operación.

**Resultado esperado** `200`.

### GET

**Clave** `get`

**Definición** GET solicita una representación del recurso, normalmente sin cuerpo.

**Búsqueda** httpx.get, obtener datos

**Para recordar** Usa `params` para filtros de consulta.

**Nota** Requiere Internet; el servicio puede cambiar. El mismo método existe en `Client`.

#### Consultar con la API directa

```python
r = httpx.get("https://example.com", timeout=10)
print(r.status_code)
```

Usa `params` para filtros de consulta.

**Resultado esperado** Normalmente `200` si el sitio está disponible.

### POST

**Clave** `post`

**Definición** POST envía datos para que el servidor los procese; a menudo crea un recurso.

**Búsqueda** httpx.post, crear, enviar

**Para recordar** Un 201 es habitual al crear, pero depende de la API.

#### Enviar un pedido

```python
with demo() as c:
    r = c.post("/pedidos", json={"importe": 100})
    print(r.status_code, r.json()["method"])
```

Un 201 es habitual al crear, pero depende de la API.

**Resultado esperado** `201 POST`; la simulación no persiste el pedido.

### PUT

**Clave** `put`

**Definición** PUT solicita crear o sustituir la representación del recurso identificado.

**Búsqueda** httpx.put, reemplazar

**Para recordar** Envía la representación completa cuando el contrato lo exige.

#### Reemplazar un pedido

```python
with demo() as c:
    print(c.put("/pedidos/1", json={"importe": 900, "estado": "completed"}).json()["method"])
```

Envía la representación completa cuando el contrato lo exige.

**Resultado esperado** `PUT`.

### PATCH

**Clave** `patch`

**Definición** PATCH solicita una modificación parcial según el formato que acepta el servidor.

**Búsqueda** httpx.patch, actualizar

**Para recordar** No asumas que todos los PATCH son idempotentes.

#### Cambiar un estado

```python
with demo() as c:
    print(c.patch("/pedidos/2", json={"estado": "completed"}).json()["body"])
```

No asumas que todos los PATCH son idempotentes.

**Resultado esperado** JSON con `estado: completed`.

### DELETE

**Clave** `delete`

**Definición** DELETE solicita eliminar la asociación del recurso con su URI.

**Búsqueda** httpx.delete, eliminar

**Para recordar** Una respuesta 204 no tiene cuerpo JSON.

#### Solicitar eliminación

```python
with demo() as c:
    r = c.delete("/pedidos/2")
    print(r.status_code, r.content)
```

Una respuesta 204 no tiene cuerpo JSON.

**Resultado esperado** `204 b''`.

### HEAD

**Clave** `head`

**Definición** HEAD solicita los encabezados que corresponderían a GET sin el cuerpo de respuesta.

**Búsqueda** httpx.head, metadatos

**Para recordar** No uses `.json()` en una respuesta HEAD vacía.

#### Consultar un total anunciado

```python
with demo() as c:
    r = c.head("/echo")
    print(r.headers["X-Total"], r.content)
```

No uses `.json()` en una respuesta HEAD vacía.

**Resultado esperado** `4 b''`.

### OPTIONS

**Clave** `options`

**Definición** OPTIONS solicita las opciones de comunicación disponibles para un recurso.

**Búsqueda** httpx.options, Allow

**Para recordar** El servidor puede anunciar métodos en `Allow`.

#### Consultar métodos permitidos

```python
with demo() as c:
    print(c.options("/echo").headers["Allow"])
```

El servidor puede anunciar métodos en `Allow`.

**Resultado esperado** `GET, POST, OPTIONS`.

### request()

**Clave** `request`

**Definición** `httpx.request()` y `client.request()` permiten seleccionar el método dinámicamente.

**Búsqueda** método variable, request

**Para recordar** Utiliza los atajos cuando el método es fijo.

#### Elegir el método en una variable

```python
metodo = "GET"
with demo() as c:
    print(c.request(metodo, "/pedidos/3").json()["id"])
```

Utiliza los atajos cuando el método es fijo.

**Resultado esperado** `3`.

## URL y parámetros

**Clave** `url-y-parametros`

### Definición

**Clave** `definicion`

**Definición** La ruta identifica el recurso y los parámetros de consulta ajustan la selección solicitada.

**Búsqueda** path, query, params, url

**Para recordar** No construyas manualmente cadenas con valores sin codificar.

#### Filtrar pedidos

```python
with demo() as c:
    r = c.get("/pedidos", params={"estado": "completed", "limit": 10})
    print([x["id"] for x in r.json()["items"]])
```

No construyas manualmente cadenas con valores sin codificar.

**Resultado esperado** `[1, 3, 4]`.

### Path parameters

**Clave** `path-parameters`

**Definición** Un valor en la ruta identifica un recurso particular; no es un argumento especial de HTTPX.

**Búsqueda** id, endpoint dinámico, f-string

**Para recordar** Valida identificadores y codifica segmentos de texto cuando haga falta.

#### Consultar por identificador

```python
pedido_id = 3
with demo() as c:
    print(c.get(f"/pedidos/{pedido_id}").json()["importe"])
```

Valida identificadores y codifica segmentos de texto cuando haga falta.

**Resultado esperado** `500`.

### params

**Clave** `params`

**Definición** `params` acepta pares clave-valor que HTTPX incorpora en la query de la URL.

**Búsqueda** query string, filtros, diccionario

**Para recordar** El servidor decide el significado de cada parámetro.

#### Enviar filtros y límite

```python
with demo() as c:
    r = c.get("/pedidos", params={"estado": "completed", "limit": 1})
    print(r.url)
```

El servidor decide el significado de cada parámetro.

**Resultado esperado** `https://ventas.example/pedidos?estado=completed&limit=1`.

### Parámetros repetidos

**Clave** `parametros-repetidos`

**Definición** Una lista de pares permite repetir el mismo nombre de parámetro.

**Búsqueda** multi_items, tags repetidos

**Para recordar** Un diccionario normal no conserva claves duplicadas.

#### Enviar dos etiquetas

```python
with demo() as c:
    r = c.get("/echo", params=[("tag", "a"), ("tag", "b")])
    print(r.json()["params"])
```

Un diccionario normal no conserva claves duplicadas.

**Resultado esperado** `[['tag', 'a'], ['tag', 'b']]`.

### URL y QueryParams

**Clave** `url-y-queryparams`

**Definición** `httpx.URL` y `httpx.QueryParams` representan URLs y parámetros como objetos. Sus operaciones de modificación devuelven nuevas instancias.

**Búsqueda** copy_with, merge, get_list

**Para recordar** No necesitas concatenar `?` ni `&` a mano.

#### Combinar parámetros y crear una URL

```python
q = httpx.QueryParams({"cliente": "Ana Pérez"})
u = httpx.URL(BASE + "/echo").copy_with(params=q)
print(u.params["cliente"])
print(str(u))
```

No necesitas concatenar `?` ni `&` a mano.

**Resultado esperado** `Ana Pérez` y URL con `cliente=Ana+P%C3%A9rez`.

## Encabezados HTTP

**Clave** `encabezados-http`

### Definición

**Clave** `definicion`

**Definición** Los headers son metadatos de una petición o respuesta, como el formato o las credenciales.

**Búsqueda** headers, encabezados, metadatos

**Para recordar** Los nombres de headers no distinguen mayúsculas.

#### Solicitar JSON

```python
with demo() as c:
    r = c.get("/echo", headers={"Accept": "application/json"})
    print(r.json()["accept"])
```

Los nombres de headers no distinguen mayúsculas.

**Resultado esperado** `application/json`.

### Accept y Content-Type

**Clave** `accept-y-content-type`

**Definición** Accept indica formatos que acepta el cliente; Content-Type describe el formato del cuerpo enviado o recibido.

**Búsqueda** negociación de contenido, MIME, media type

**Para recordar** Pedir JSON no garantiza que el servidor lo devuelva.

#### Enviar JSON y pedir JSON

```python
with demo() as c:
    r = c.post("/echo", json={"id": 1}, headers={"Accept": "application/json"})
    print(r.json()["accept"], r.json()["content_type"])
```

Pedir JSON no garantiza que el servidor lo devuelva.

**Resultado esperado** `application/json application/json`.

### httpx.Headers

**Clave** `httpx-headers`

**Definición** Es una colección de encabezados que permite recuperar valores repetidos.

**Búsqueda** get_list, multi_items, headers repetidos

**Para recordar** No dividas encabezados complejos por comas sin conocer su sintaxis.

#### Leer encabezados repetidos

```python
h = httpx.Headers([("X-Tag", "a"), ("X-Tag", "b")])
print(h.get_list("x-tag"))
```

No dividas encabezados complejos por comas sin conocer su sintaxis.

**Resultado esperado** `['a', 'b']`.

### Authorization

**Clave** `authorization`

**Definición** Este encabezado transporta credenciales según el esquema de autenticación.

**Búsqueda** Bearer, token, credenciales

**Para recordar** Nunca registres un token real en logs.

#### Enviar un token de prueba

```python
with demo() as c:
    r = c.get("/private", headers={"Authorization": "Bearer demo"})
    print(r.status_code)
```

Nunca registres un token real en logs.

**Resultado esperado** `200`.

## Cuerpo de la petición

**Clave** `cuerpo-de-la-peticion`

### Definición

**Clave** `definicion`

**Definición** El cuerpo contiene los datos enviados al servidor. HTTPX permite serializar JSON, formularios, bytes y archivos.

**Búsqueda** body, json, data, content, files

**Para recordar** Elige la opción según el formato exigido por la API.

#### Enviar un objeto JSON

```python
with demo() as c:
    r = c.post("/echo", json={"importe": 100})
    print(json.loads(r.json()["body"]))
```

Elige la opción según el formato exigido por la API.

**Resultado esperado** `{'importe': 100}`.

### json

**Clave** `json`

**Definición** Serializa un objeto Python compatible con JSON y asigna el Content-Type correspondiente.

**Búsqueda** diccionario, JSON, post

**Para recordar** Usa `json=`, no `data=` para un objeto JSON.

#### Enviar una lista de IDs

```python
with demo() as c:
    r = c.post("/echo", json={"ids": [1, 3]})
    print(json.loads(r.json()["body"]))
```

Usa `json=`, no `data=` para un objeto JSON.

**Resultado esperado** `{'ids': [1, 3]}`.

### data

**Clave** `data`

**Definición** Codifica campos de formulario, normalmente como application/x-www-form-urlencoded.

**Búsqueda** form, formulario, urlencoded

**Para recordar** No es lo mismo que JSON.

#### Enviar campos de formulario

```python
with demo() as c:
    r = c.post("/echo", data={"cliente": "Ana", "importe": "800"})
    print(r.json()["body"])
```

No es lo mismo que JSON.

**Resultado esperado** `cliente=Ana&importe=800`.

### content

**Clave** `content`

**Definición** Envía texto, bytes o un iterable de bytes como contenido directo.

**Búsqueda** bytes, XML, raw, texto

**Para recordar** Indica el Content-Type si el servidor lo requiere.

#### Enviar CSV como cuerpo

```python
with demo() as c:
    r = c.post("/echo", content=b"id,importe\n1,800", headers={"Content-Type": "text/csv"})
    print(r.json()["content_type"])
```

Indica el Content-Type si el servidor lo requiere.

**Resultado esperado** `text/csv`.

### files y multipart

**Clave** `files-y-multipart`

**Definición** `files` crea un cuerpo multipart para adjuntar archivos; puede combinarse con `data` para campos adicionales.

**Búsqueda** upload, multipart, filename

**Para recordar** Deja que HTTPX genere el boundary de multipart.

#### Adjuntar un CSV pequeño

```python
with demo() as c:
    r = c.post("/echo", files={"file": ("ventas.csv", b"id,importe\n1,800", "text/csv")}, data={"tipo": "ventas"})
    print(r.json()["content_type"].startswith("multipart/form-data"))
    print("ventas.csv" in r.json()["body"])
```

Deja que HTTPX genere el boundary de multipart.

**Resultado esperado** `True` y `True`.

## Response y contenido

**Clave** `response-y-contenido`

### Definición

**Clave** `definicion`

**Definición** Cada petición devuelve un objeto `httpx.Response` con estado, encabezados, contenido y metadatos.

**Búsqueda** response, respuesta, leer datos

**Para recordar** El contenido de una respuesta puede no ser JSON.

#### Leer una respuesta

```python
with demo() as c:
    r = c.get("/pedidos/1")
    print(r.status_code, r.json()["cliente"])
```

El contenido de una respuesta puede no ser JSON.

**Resultado esperado** `200 Ana`.

### status_code y reason_phrase

**Clave** `status-code-y-reason-phrase`

**Definición** El código numérico expresa el estado HTTP; la frase es una descripción auxiliar.

**Búsqueda** 200, 404, status, reason_phrase

**Para recordar** Decide por el código, no por la frase.

#### Consultar un recurso inexistente

```python
with demo() as c:
    r = c.get("/pedidos/99")
    print(r.status_code, r.reason_phrase)
```

Decide por el código, no por la frase.

**Resultado esperado** `404 Not Found`.

### json()

**Clave** `json`

**Definición** Interpreta el cuerpo como JSON y devuelve objetos Python.

**Búsqueda** response.json, dict, list

**Para recordar** No comprueba automáticamente que el estado sea exitoso.

#### Leer los registros de una página

```python
with demo() as c:
    r = c.get("/pedidos")
    r.raise_for_status()
    print([x["id"] for x in r.json()["items"]])
```

No comprueba automáticamente que el estado sea exitoso.

**Resultado esperado** `[1, 2]`.

### text y encoding

**Clave** `text-y-encoding`

**Definición** `text` decodifica bytes como texto; `encoding` indica o permite establecer la codificación antes de leerlo.

**Búsqueda** UTF-8, charset, texto, HTML

**Para recordar** Cambia la codificación antes de acceder a `.text`.

#### Leer un CSV como texto

```python
with demo() as c:
    r = c.get("/csv")
    print(r.encoding, r.text.splitlines()[0])
```

Cambia la codificación antes de acceder a `.text`.

**Resultado esperado** `utf-8 id,importe`.

### content

**Clave** `content`

**Definición** `content` devuelve el cuerpo en bytes después de decodificar la compresión HTTP.

**Búsqueda** binario, bytes, descarga

**Para recordar** Útil para escribir archivos binarios sin convertirlos a texto.

#### Inspeccionar bytes

```python
with demo() as c:
    r = c.get("/csv")
    print(type(r.content).__name__, r.content[:2])
```

Útil para escribir archivos binarios sin convertirlos a texto.

**Resultado esperado** `bytes b'id'`.

### headers

**Clave** `headers`

**Definición** La respuesta ofrece los encabezados enviados por el servidor.

**Búsqueda** response.headers, content-type

**Para recordar** Usa `.get()` si el encabezado puede faltar.

#### Consultar formato y campo opcional

```python
with demo() as c:
    r = c.get("/csv")
    print(r.headers.get("content-type"), r.headers.get("x-total"))
```

Usa `.get()` si el encabezado puede faltar.

**Resultado esperado** `text/csv; charset=utf-8 None`.

### url y request

**Clave** `url-y-request`

**Definición** `response.url` identifica la URL de la petición asociada y `response.request` permite inspeccionarla.

**Búsqueda** request.method, URL final

**Para recordar** Después de seguir redirecciones se refiere a la petición final.

#### Inspeccionar una petición

```python
with demo() as c:
    r = c.get("/pedidos/1")
    print(r.request.method, r.url.path)
```

Después de seguir redirecciones se refiere a la petición final.

**Resultado esperado** `GET /pedidos/1`.

### elapsed y http_version

**Clave** `elapsed-y-http-version`

**Definición** `elapsed` mide el tiempo hasta que se cierra la respuesta; `http_version` informa el protocolo de esa respuesta.

**Búsqueda** latencia, HTTP/2, tiempo

**Para recordar** En streaming lee elapsed después de cerrar; un mock no mide latencia de red.

#### Consultar metadatos temporales

```python
transport = httpx.MockTransport(lambda req: httpx.Response(200, stream=httpx.ByteStream(b"ok")))
with httpx.Client(transport=transport) as c:
    r = c.get(BASE)
    print(r.elapsed.total_seconds() >= 0, r.http_version)
```

En streaming lee elapsed después de cerrar; un mock no mide latencia de red.

**Resultado esperado** `True HTTP/1.1` en la simulación.

### links

**Clave** `links`

**Definición** `response.links` interpreta los enlaces del encabezado Link, útiles para paginación.

**Búsqueda** Link, rel next, pagination

**Para recordar** Consulta la existencia de `next` antes de continuar.

#### Leer el enlace siguiente

```python
with demo() as c:
    r = c.get("/pedidos")
    print(r.links["next"]["url"])
```

Consulta la existencia de `next` antes de continuar.

**Resultado esperado** `https://ventas.example/pedidos?offset=2&limit=2`.

### default_encoding

**Clave** `default-encoding`

**Definición** Configura la codificación de respaldo para respuestas de texto que no indican charset. Acepta un nombre de codificación o una función de detección.

**Búsqueda** default_encoding, latin-1, charset

**Para recordar** Un charset explícito de Content-Type tiene prioridad.

#### Leer texto sin charset declarado

```python
transport = httpx.MockTransport(lambda req: httpx.Response(200, content=bytes([99, 97, 102, 233])))
with httpx.Client(transport=transport, default_encoding="latin-1") as c:
    print(c.get(BASE).text)
```

Un charset explícito de Content-Type tiene prioridad.

**Resultado esperado** `café`.

## Estados HTTP y validación

**Clave** `estados-http-y-validacion`

### Definición

**Clave** `definicion`

**Definición** Los estados HTTP distinguen respuestas informativas, exitosas, redirecciones y errores.

**Búsqueda** status codes, 2xx, 4xx, 5xx

**Para recordar** Un estado 200 no garantiza datos válidos para tu análisis.

#### Identificar éxito y error

```python
with demo() as c:
    print(c.get("/status/200").is_success)
    print(c.get("/status/503").is_error)
```

Un estado 200 no garantiza datos válidos para tu análisis.

**Resultado esperado** `True` y `True`.

### Familias y httpx.codes

**Clave** `familias-y-httpx-codes`

**Definición** Los códigos 1xx informan, 2xx indican éxito, 3xx redirección u otro estado de esa familia, 4xx problemas del cliente y 5xx del servidor. `httpx.codes` da nombres a códigos comunes.

**Búsqueda** OK, NOT_FOUND, 429, 500, 401, 403

**Para recordar** 401 y 403 no significan necesariamente lo mismo: autenticación frente a autorización.

#### Comparar un código por nombre

```python
with demo() as c:
    r = c.get("/pedidos/99")
    print(r.status_code == httpx.codes.NOT_FOUND)
```

401 y 403 no significan necesariamente lo mismo: autenticación frente a autorización.

**Resultado esperado** `True`.

### Propiedades is_*

**Clave** `propiedades-is`

**Definición** `is_informational`, `is_success`, `is_redirect`, `is_client_error`, `is_server_error` e `is_error` clasifican el código.

**Búsqueda** is_redirect, is_error, is_success

**Para recordar** `is_error` cubre 4xx y 5xx, no 3xx.

#### Clasificar estados

```python
for n in (101, 200, 302, 404, 503):
    r = httpx.Response(n)
    print(n, r.is_informational, r.is_success, r.is_redirect, r.is_client_error, r.is_server_error)
```

`is_error` cubre 4xx y 5xx, no 3xx.

**Resultado esperado** Cada fila tiene `True` en su familia correspondiente.

### raise_for_status()

**Clave** `raise-for-status`

**Definición** Lanza `HTTPStatusError` si la respuesta no es 2xx; requiere que la respuesta esté asociada con una petición.

**Búsqueda** validar respuesta, error HTTP

**Para recordar** En HTTPX también lanza ante 3xx no seguidos.

#### Detectar un 404

```python
with demo() as c:
    try:
        c.get("/pedidos/99").raise_for_status()
    except httpx.HTTPStatusError as e:
        print(e.response.status_code)
```

En HTTPX también lanza ante 3xx no seguidos.

**Resultado esperado** `404`.

### Respuestas vacías e inválidas

**Clave** `respuestas-vacias-e-invalidas`

**Definición** Comprueba el estado y el formato antes de interpretar el cuerpo.

**Búsqueda** 204, JSONDecodeError, respuesta vacía

**Para recordar** Un 204 válido no necesita JSON; un JSON inválido puede producir ValueError.

#### Controlar JSON inválido

```python
with demo() as c:
    r = c.get("/malformado").raise_for_status()
    try:
        print(r.json())
    except ValueError:
        print("JSON inválido")
```

Un 204 válido no necesita JSON; un JSON inválido puede producir ValueError.

**Resultado esperado** `JSON inválido`.

## Client y sesiones

**Clave** `client-y-sesiones`

### Definición

**Clave** `definicion`

**Definición** `httpx.Client` conserva configuración, cookies y conexiones entre peticiones.

**Búsqueda** cliente, sesión, pooling, Client

**Para recordar** Reutiliza un cliente durante una extracción.

#### Consultar dos recursos con el mismo cliente

```python
with demo() as c:
    print(c.get("/pedidos/1").status_code, c.get("/pedidos/3").status_code)
```

Reutiliza un cliente durante una extracción.

**Resultado esperado** `200 200`.

### Context manager y close()

**Clave** `context-manager-y-close`

**Definición** `with` cierra el cliente al terminar; si se crea manualmente, llama a `close()` en un `finally`.

**Búsqueda** with, cerrar, liberar recursos

**Para recordar** No reutilices un cliente cerrado.

#### Cerrar explícitamente

```python
c = demo()
try:
    print(c.get("/pedidos/1").status_code)
finally:
    c.close()
print(c.is_closed)
```

No reutilices un cliente cerrado.

**Resultado esperado** `200` y `True`.

### base_url

**Clave** `base-url`

**Definición** Permite resolver rutas relativas contra una URL base del cliente.

**Búsqueda** URL base, rutas relativas

**Para recordar** Evita repetir el mismo host en cada petición.

#### Configurar una URL base

```python
with httpx.Client(base_url=BASE, transport=httpx.MockTransport(handler)) as c:
    print(c.get("/pedidos/1").url)
```

Evita repetir el mismo host en cada petición.

**Resultado esperado** `https://ventas.example/pedidos/1`.

### Configuración compartida

**Clave** `configuracion-compartida`

**Definición** Headers, params, cookies y auth pueden definirse en el cliente; los ajustes por petición pueden completar o sustituir valores según el parámetro.

**Búsqueda** headers globales, merge, override

**Para recordar** Headers, params y cookies se combinan; auth por petición puede sustituir la del cliente.

#### Combinar parámetros de cliente y petición

```python
with demo(params={"limit": 5}, headers={"Accept": "application/json"}) as c:
    r = c.get("/echo", params={"estado": "completed"}, headers={"Accept": "text/csv"})
    print(r.url.params["limit"], r.json()["accept"])
```

Headers, params y cookies se combinan; auth por petición puede sustituir la del cliente.

**Resultado esperado** `5 text/csv`.

### Connection pooling y Limits

**Clave** `connection-pooling-y-limits`

**Definición** Un cliente real reutiliza conexiones. `Limits` ajusta conexiones totales, persistentes y caducidad de conexiones inactivas.

**Búsqueda** max_connections, max_keepalive_connections, keepalive_expiry

**Para recordar** Un mock no establece conexiones reales.

#### Configurar límites de un cliente real

```python
limites = httpx.Limits(max_connections=10, max_keepalive_connections=5, keepalive_expiry=30)
with httpx.Client(limits=limites) as c:
    print(c.is_closed)
```

Un mock no establece conexiones reales.

**Resultado esperado** `False` mientras está abierto; no se realizan peticiones.

## Cookies y sesiones HTTP

**Clave** `cookies-y-sesiones-http`

### Definición

**Clave** `definicion`

**Definición** Las cookies son valores que el servidor puede establecer y que el cliente devuelve cuando corresponden al dominio y ruta.

**Búsqueda** Cookie, Set-Cookie, sesión

**Para recordar** Usa un cliente para conservar cookies entre peticiones.

#### Mantener una sesión simulada

```python
with demo() as c:
    c.get("/login")
    print(c.get("/echo").json()["cookie"])
```

Usa un cliente para conservar cookies entre peticiones.

**Resultado esperado** `session=demo`.

### Cookies por petición y por cliente

**Clave** `cookies-por-peticion-y-por-cliente`

**Definición** `cookies` permite inicializar valores; un cliente conserva cookies de las respuestas.

**Búsqueda** cookies, client.cookies, response.cookies

**Para recordar** Prefiere configuración del cliente para evitar ambigüedad en sesiones.

#### Inicializar cookies y leer una nueva

```python
with demo(cookies={"region": "mx"}) as c:
    r = c.get("/login")
    print(r.cookies.get("session"), c.cookies.get("region"))
```

Prefiere configuración del cliente para evitar ambigüedad en sesiones.

**Resultado esperado** `demo mx`.

### httpx.Cookies

**Clave** `httpx-cookies`

**Definición** Permite gestionar valores con `set`, `get` y `delete`, teniendo en cuenta dominio y ruta.

**Búsqueda** cookie jar, CookieConflict, dominio, path

**Para recordar** Un mismo nombre puede existir para distintos dominios.

#### Guardar y borrar una cookie

```python
cookies = httpx.Cookies()
cookies.set("region", "mx", domain="ventas.example", path="/")
print(cookies.get("region", domain="ventas.example", path="/"))
cookies.delete("region", domain="ventas.example", path="/")
print(len(cookies))
```

Un mismo nombre puede existir para distintos dominios.

**Resultado esperado** `mx` y `0`.

## Redirecciones

**Clave** `redirecciones`

### Definición

**Clave** `definicion`

**Definición** Una redirección indica que el cliente debe consultar otra URL; HTTPX no las sigue por defecto.

**Búsqueda** 301, 302, 307, 308, redirect

**Para recordar** Valida el destino antes de enviar credenciales a otro host.

#### Leer Location

```python
with demo() as c:
    r = c.get("/redirect")
    print(r.status_code, r.headers["location"])
```

Valida el destino antes de enviar credenciales a otro host.

**Resultado esperado** `302 /pedidos/1`.

### follow_redirects y history

**Clave** `follow-redirects-y-history`

**Definición** Activa el seguimiento automático y consulta `history` para ver las respuestas intermedias.

**Búsqueda** seguir redirects, historial

**Para recordar** La URL de la última respuesta puede diferir de la inicial.

#### Seguir una redirección

```python
with demo(follow_redirects=True) as c:
    r = c.get("/redirect")
    print(r.status_code, [h.status_code for h in r.history], r.url.path)
```

La URL de la última respuesta puede diferir de la inicial.

**Resultado esperado** `200 [302] /pedidos/1`.

### next_request

**Clave** `next-request`

**Definición** Permite inspeccionar y enviar manualmente la petición que continuaría una redirección.

**Búsqueda** redirect manual, next_request

**Para recordar** Puede ser None cuando no hay redirección pendiente.

#### Seguir un salto manualmente

```python
with demo() as c:
    r = c.get("/redirect")
    if r.next_request is not None:
        print(c.send(r.next_request).json()["id"])
```

Puede ser None cuando no hay redirección pendiente.

**Resultado esperado** `1`.

### max_redirects

**Clave** `max-redirects`

**Definición** Limita los saltos automáticos; un exceso produce `TooManyRedirects`.

**Búsqueda** bucle redirect, TooManyRedirects

**Para recordar** Configura el límite en el cliente.

#### Detectar un bucle

```python
with demo(follow_redirects=True, max_redirects=2) as c:
    try:
        c.get("/loop")
    except httpx.TooManyRedirects:
        print("demasiados saltos")
```

Configura el límite en el cliente.

**Resultado esperado** `demasiados saltos`.

## Timeouts

**Clave** `timeouts`

### Definición

**Clave** `definicion`

**Definición** Un timeout limita cuánto se espera en una fase de la comunicación. HTTPX usa por defecto cinco segundos de inactividad de red, no un plazo total de ejecución.

**Búsqueda** timeout, espera, bloqueo

**Para recordar** Configura tiempos explícitos para extracciones.

#### Establecer tiempo de espera

```python
with demo(timeout=10) as c:
    print(c.timeout.read)
```

Configura tiempos explícitos para extracciones.

**Resultado esperado** `10`.

### Timeout por petición

**Clave** `timeout-por-peticion`

**Definición** `timeout` puede definirse al llamar una petición o como configuración del cliente.

**Búsqueda** timeout=, None

**Para recordar** `None` desactiva los timeouts; evita usarlo sin motivo.

#### Cambiar tiempo para una petición

```python
with demo(timeout=5) as c:
    r = c.get("/pedidos/1", timeout=20)
    print(r.request.extensions["timeout"]["read"])
```

`None` desactiva los timeouts; evita usarlo sin motivo.

**Resultado esperado** `20`.

### httpx.Timeout

**Clave** `httpx-timeout`

**Definición** Permite distinguir espera de conexión, lectura, escritura y adquisición de una conexión del pool.

**Búsqueda** connect, read, write, pool

**Para recordar** Cada límite controla una fase distinta.

#### Configurar los cuatro límites

```python
t = httpx.Timeout(connect=3, read=20, write=10, pool=2)
print(t.connect, t.read, t.write, t.pool)
```

Cada límite controla una fase distinta.

**Resultado esperado** `3 20 10 2`.

### Excepciones de timeout

**Clave** `excepciones-de-timeout`

**Definición** ConnectTimeout, ReadTimeout, WriteTimeout y PoolTimeout heredan de TimeoutException.

**Búsqueda** ConnectTimeout, ReadTimeout, WriteTimeout, PoolTimeout

**Para recordar** Atrapa la clase general si no necesitas distinguir fases.

#### Capturar un timeout simulado

```python
with demo() as c:
    try:
        c.get("/timeout")
    except httpx.TimeoutException as e:
        print(type(e).__name__)
```

Atrapa la clase general si no necesitas distinguir fases.

**Resultado esperado** `ReadTimeout`.

## Excepciones

**Clave** `excepciones`

### Definición

**Clave** `definicion`

**Definición** HTTPX distingue una respuesta HTTP no exitosa de una petición que no pudo completarse por problemas de transporte.

**Búsqueda** try, except, HTTPError, RequestError

**Para recordar** Un 404 es una respuesta; un fallo de conexión puede no tener respuesta.

#### Manejar ambos casos

```python
with demo() as c:
    for ruta in ("/status/404", "/conexion"):
        try:
            c.get(ruta).raise_for_status()
        except httpx.HTTPStatusError:
            print("estado")
        except httpx.RequestError:
            print("petición")
```

Un 404 es una respuesta; un fallo de conexión puede no tener respuesta.

**Resultado esperado** `estado` y `petición`.

### HTTPStatusError

**Clave** `httpstatuserror`

**Definición** Se genera al llamar `raise_for_status()` sobre una respuesta no 2xx. Incluye request y response.

**Búsqueda** e.response, e.request, status error

**Para recordar** No se genera automáticamente por un 404.

#### Inspeccionar un error HTTP

```python
with demo() as c:
    try:
        c.get("/status/403").raise_for_status()
    except httpx.HTTPStatusError as e:
        print(e.response.status_code, e.request.url.path)
```

No se genera automáticamente por un 404.

**Resultado esperado** `403 /status/403`.

### RequestError y HTTPError

**Clave** `requesterror-y-httperror`

**Definición** RequestError agrupa fallos de petición; HTTPError es la base común de RequestError y HTTPStatusError.

**Búsqueda** error general, captura, red

**Para recordar** Captura primero las excepciones específicas.

#### Capturar una conexión fallida

```python
with demo() as c:
    try:
        c.get("/conexion")
    except httpx.RequestError as e:
        print(type(e).__name__, e.request.url.path)
```

Captura primero las excepciones específicas.

**Resultado esperado** `ConnectError /conexion`.

### TransportError y NetworkError

**Clave** `transporterror-y-networkerror`

**Definición** TransportError agrupa fallos del transporte. NetworkError incluye ConnectError, ReadError, WriteError y CloseError.

**Búsqueda** network, conexión, escritura, lectura

**Para recordar** No asumas que todos los errores son transitorios.

#### Comprobar la jerarquía

```python
print(issubclass(httpx.ConnectError, httpx.NetworkError))
print(issubclass(httpx.NetworkError, httpx.TransportError))
```

No asumas que todos los errores son transitorios.

**Resultado esperado** `True` y `True`.

### Protocolo y otros errores

**Clave** `protocolo-y-otros-errores`

**Definición** ProtocolError agrupa LocalProtocolError y RemoteProtocolError; ProxyError y UnsupportedProtocol son errores de transporte; DecodingError y TooManyRedirects son RequestError.

**Búsqueda** ProtocolError, ProxyError, DecodingError, UnsupportedProtocol

**Para recordar** Registra la clase para distinguir una mala petición de un fallo remoto.

#### Identificar clases de error

```python
for cls in (httpx.RemoteProtocolError, httpx.ProxyError, httpx.DecodingError):
    print(cls.__name__, issubclass(cls, httpx.RequestError))
```

Registra la clase para distinguir una mala petición de un fallo remoto.

**Resultado esperado** Las tres clases imprimen `True`.

### InvalidURL y CookieConflict

**Clave** `invalidurl-y-cookieconflict`

**Definición** Son excepciones específicas de URL y cookies, fuera de HTTPError.

**Búsqueda** URL inválida, conflicto cookie

**Para recordar** No supongas que `except HTTPError` cubre todas las excepciones de HTTPX.

#### Detectar una URL con puerto inválido

```python
try:
    httpx.URL("https://example.com:no-numero")
except httpx.InvalidURL:
    print("URL inválida")
```

No supongas que `except HTTPError` cubre todas las excepciones de HTTPX.

**Resultado esperado** `URL inválida`.

### StreamError

**Clave** `streamerror`

**Definición** Agrupa errores de uso de streams: StreamConsumed, StreamClosed, ResponseNotRead y RequestNotRead.

**Búsqueda** stream error, response not read

**Para recordar** Lee el cuerpo dentro del contexto de streaming cuando lo necesites.

#### Consultar la jerarquía

```python
print(issubclass(httpx.ResponseNotRead, httpx.StreamError))
```

Lee el cuerpo dentro del contexto de streaming cuando lo necesites.

**Resultado esperado** `True`.

## Autenticación

**Clave** `autenticacion`

### Definición

**Clave** `definicion`

**Definición** La autenticación identifica al cliente frente a un servicio. HTTPX permite headers y mecanismos integrados mediante `auth`.

**Búsqueda** credenciales, api key, bearer, auth

**Para recordar** Utiliza HTTPS para enviar secretos reales.

#### Probar acceso autorizado

```python
with demo() as c:
    print(c.get("/private").status_code)
    print(c.get("/private", headers={"Authorization": "Bearer demo"}).status_code)
```

Utiliza HTTPS para enviar secretos reales.

**Resultado esperado** `401` y `200`.

### API Key

**Clave** `api-key`

**Definición** La API puede pedir una clave en un header o parámetro definido por su contrato. No existe un parámetro universal de API key en HTTPX.

**Búsqueda** X-API-Key, clave, token

**Para recordar** Prefiere headers cuando la API lo permita, para no exponer secretos en URLs.

#### Adjuntar una clave ficticia

```python
with demo() as c:
    r = c.get("/echo", headers={"X-API-Key": "clave-demo"})
    print(r.request.headers["X-API-Key"])
```

Prefiere headers cuando la API lo permita, para no exponer secretos en URLs.

**Resultado esperado** `clave-demo`; no es una credencial real.

### Bearer Token

**Clave** `bearer-token`

**Definición** Un token Bearer se envía normalmente como `Authorization: Bearer TOKEN`.

**Búsqueda** Bearer, access token

**Para recordar** No confundas token de acceso con token de renovación.

#### Configurar un token compartido

```python
with demo(headers={"Authorization": "Bearer demo"}) as c:
    print(c.get("/private").status_code)
```

No confundas token de acceso con token de renovación.

**Resultado esperado** `200`.

### BasicAuth

**Clave** `basicauth`

**Definición** HTTPX acepta `auth=(usuario, contraseña)` o `httpx.BasicAuth`. Basic codifica las credenciales, no las cifra.

**Búsqueda** basic authentication, auth tuple

**Para recordar** Usa TLS en servicios reales.

#### Comprobar el esquema Basic

```python
with demo(auth=httpx.BasicAuth("usuario", "demo")) as c:
    r = c.get("/echo")
    print(r.request.headers["Authorization"].split()[0])
```

Usa TLS en servicios reales.

**Resultado esperado** `Basic`.

### DigestAuth

**Clave** `digestauth`

**Definición** Digest responde a un desafío de autenticación del servidor; no requiere construir manualmente el header de respuesta al desafío.

**Búsqueda** DigestAuth, WWW-Authenticate, 401

**Para recordar** Digest no reemplaza HTTPS ni protege todo el cuerpo.

#### Responder a un desafío simulado

```python
def digest_handler(req):
    if req.headers.get("Authorization", "").startswith("Digest "):
        return httpx.Response(200)
    return httpx.Response(401, headers={"WWW-Authenticate": 'Digest realm="demo", nonce="abc", algorithm=MD5, qop="auth"'})
with httpx.Client(transport=httpx.MockTransport(digest_handler), auth=httpx.DigestAuth("user", "demo")) as c:
    print(c.get(BASE).status_code)
```

Digest no reemplaza HTTPS ni protege todo el cuerpo.

**Resultado esperado** `200`; el mock solo comprueba el esquema, no valida credenciales.

### NetRCAuth

**Clave** `netrcauth`

**Definición** Lee credenciales desde un archivo netrc, mediante la biblioteca estándar de Python.

**Búsqueda** netrc, machine, login, password

**Para recordar** Protege el archivo y no lo subas al repositorio.

#### Usar un netrc temporal

```python
with TemporaryDirectory() as tmp:
    p = Path(tmp) / "netrc"
    p.write_text("machine ventas.example login demo password ficticia\n")
    p.chmod(0o600)
    with demo(auth=httpx.NetRCAuth(file=str(p))) as c:
        print(c.get("/echo").request.headers["Authorization"].split()[0])
```

Protege el archivo y no lo subas al repositorio.

**Resultado esperado** `Basic`.

### Variables de entorno

**Clave** `variables-de-entorno`

**Definición** Lee credenciales de configuración externa en lugar de incluirlas en el código fuente.

**Búsqueda** os.environ, secreto, API_TOKEN

**Para recordar** En producción usa un gestor de secretos o variables configuradas fuera del script.

#### Leer un token del entorno de prueba

```python
import os
from unittest.mock import patch
with patch.dict(os.environ, {"API_TOKEN": "demo"}):
    with demo(headers={"Authorization": f"Bearer {os.environ['API_TOKEN']}"}) as c:
        print(c.get("/private").status_code)
```

En producción usa un gestor de secretos o variables configuradas fuera del script.

**Resultado esperado** `200`; el token ficticio se elimina del entorno al salir del contexto.

### OAuth 2.0 y renovación

**Clave** `oauth-2-0-y-renovacion`

**Definición** OAuth 2.0 define flujos para obtener tokens de acceso. HTTPX transporta solicitudes y tokens, pero no implementa por sí solo todo el flujo OAuth.

**Búsqueda** OAuth, refresh token, token endpoint, Authlib

**Para recordar** El proveedor determina el flujo, caducidad y parámetros; no renueves indefinidamente ante un 401.

**Nota** En una integración real registra la aplicación, autentica el cliente y sigue el contrato del proveedor. Para renovación usa el flujo autorizado, si ofrece refresh token.

#### Usar un token ya obtenido

```python
def token_provider(req):
    return httpx.Response(200, json={"access_token": "demo", "token_type": "Bearer"})
with httpx.Client(transport=httpx.MockTransport(token_provider)) as auth_client:
    token = auth_client.post(BASE + "/token", data={"grant_type": "client_credentials"}).json()["access_token"]
with demo(headers={"Authorization": f"Bearer {token}"}) as c:
    print(c.get("/private").status_code)
```

El proveedor determina el flujo, caducidad y parámetros; no renueves indefinidamente ante un 401.

**Resultado esperado** `200`; el proveedor simulado no realiza OAuth real.

### Autenticación personalizada

**Clave** `autenticacion-personalizada`

**Definición** Subclasifica `httpx.Auth` y define `auth_flow` para modificar o encadenar peticiones.

**Búsqueda** custom auth, sync_auth_flow, async_auth_flow

**Para recordar** Para autenticación con I/O específico usa los flujos sync/async correspondientes.

#### Añadir un header desde Auth

```python
class DemoAuth(httpx.Auth):
    def auth_flow(self, request):
        request.headers["Authorization"] = "Bearer demo"
        yield request
with demo(auth=DemoAuth()) as c:
    print(c.get("/private").status_code)
```

Para autenticación con I/O específico usa los flujos sync/async correspondientes.

**Resultado esperado** `200`.

## HTTPS y configuración del entorno

**Clave** `https-y-configuracion-del-entorno`

### Definición

**Clave** `definicion`

**Definición** HTTPS usa TLS para proteger la comunicación y autenticar el servidor con certificados. HTTPX verifica certificados de forma predeterminada.

**Búsqueda** HTTPS, TLS, SSL, certificados

**Para recordar** No desactives verify para resolver errores de certificados en producción.

#### Construir un cliente con verificación

```python
with httpx.Client(verify=True) as c:
    print(c.is_closed)
```

No desactives verify para resolver errores de certificados en producción.

**Resultado esperado** `False`; el cliente está abierto, sin establecer una conexión.

### SSLContext y CA personalizada

**Clave** `sslcontext-y-ca-personalizada`

**Definición** `verify` acepta un `ssl.SSLContext` para elegir autoridades de confianza o configurar TLS.

**Búsqueda** ssl.create_default_context, cafile, certificados CA

**Para recordar** Una CA personalizada debe ser de confianza para tu organización.

#### Crear un contexto TLS

```python
import ssl
ctx = ssl.create_default_context()
with httpx.Client(verify=ctx) as c:
    print(ctx.check_hostname)
```

Una CA personalizada debe ser de confianza para tu organización.

**Resultado esperado** `True`.

### Certificados de cliente

**Clave** `certificados-de-cliente`

**Definición** En TLS mutuo el cliente también presenta un certificado y su clave. Usa un contexto SSL con `load_cert_chain`.

**Búsqueda** mTLS, client cert, load_cert_chain

**Para recordar** Requiere certificados reales; evita el argumento cert obsoleto en 0.28.

**Nota** Requiere CA, certificado, clave y URL reales. No se ejecuta en el mock.

#### Configurar TLS mutuo

```python
import ssl
ctx = ssl.create_default_context(cafile="ca.pem")
ctx.load_cert_chain("cliente.pem", "cliente.key")
with httpx.Client(verify=ctx) as c:
    r = c.get("https://api.example")
```

Requiere certificados reales; evita el argumento cert obsoleto en 0.28.

**Resultado esperado** Con archivos y servidor válidos, el cliente puede autenticarse por TLS; el estado depende del servicio.

### trust_env

**Clave** `trust-env`

**Definición** HTTPX usa por defecto variables de entorno de proxies y certificados. `trust_env=False` desactiva esa configuración implícita.

**Búsqueda** entorno, trust_env, configuración proxy

**Para recordar** Útil para aislar pruebas de configuración externa.

#### Ignorar configuración del entorno

```python
with httpx.Client(trust_env=False) as c:
    print(c.trust_env)
```

Útil para aislar pruebas de configuración externa.

**Resultado esperado** `False`.

### SSL_CERT_FILE y SSL_CERT_DIR

**Clave** `ssl-cert-file-y-ssl-cert-dir`

**Definición** Permiten señalar un archivo de CA o un directorio preparado para OpenSSL cuando se confía en el entorno.

**Búsqueda** SSL_CERT_FILE, SSL_CERT_DIR, CA bundle

**Para recordar** No configures rutas inventadas en un entorno de producción.

**Nota** certifi es una dependencia de HTTPX. SSL_CERT_DIR requiere un directorio con enlaces hash de OpenSSL.

#### Configurar un archivo CA temporalmente

```python
import os, ssl
from unittest.mock import patch
import certifi
with patch.dict(os.environ, {"SSL_CERT_FILE": certifi.where()}):
    with httpx.Client(trust_env=True) as c:
        print(os.path.isfile(os.environ["SSL_CERT_FILE"]))
```

No configures rutas inventadas en un entorno de producción.

**Resultado esperado** `True`; solo se configura el cliente.

## Proxies y protocolos

**Clave** `proxies-y-protocolos`

### Definición

**Clave** `definicion`

**Definición** Un proxy intermedia las conexiones entre cliente y destino. HTTPX admite configuración explícita o desde el entorno.

**Búsqueda** proxy, forward, tunnel, SOCKS

**Para recordar** Usa únicamente proxies autorizados y de confianza.

#### Configurar un proxy HTTP

```python
with httpx.Client(proxy="http://proxy.example:8080") as c:
    print(c.is_closed)
```

Usa únicamente proxies autorizados y de confianza.

**Resultado esperado** `False`; no se intenta conectar al proxy.

### HTTP_PROXY, HTTPS_PROXY, ALL_PROXY y NO_PROXY

**Clave** `http-proxy-https-proxy-all-proxy-y-no-proxy`

**Definición** Las primeras tres variables definen proxies para esquemas concretos o para todos; NO_PROXY excluye destinos.

**Búsqueda** proxy entorno, bypass, NO_PROXY

**Para recordar** Los valores solo se aplican cuando `trust_env=True`.

#### Declarar configuración temporal

```python
import os
from unittest.mock import patch
with patch.dict(os.environ, {"HTTP_PROXY": "http://proxy.example:8080", "HTTPS_PROXY": "http://proxy.example:8080", "ALL_PROXY": "http://proxy.example:8080", "NO_PROXY": "localhost,127.0.0.1"}):
    with httpx.Client() as c:
        print(os.environ["NO_PROXY"])
```

Los valores solo se aplican cuando `trust_env=True`.

**Resultado esperado** `localhost,127.0.0.1`; no se abre conexión.

### SOCKS

**Clave** `socks`

**Definición** HTTPX admite proxy SOCKS con la dependencia opcional correspondiente.

**Búsqueda** SOCKS5, socksio, httpx[socks]

**Para recordar** Instala `python -m pip install "httpx[socks]==0.28.1"`.

**Nota** Requiere el extra socks; una petición real requiere un proxy activo.

#### Configurar un proxy SOCKS

```python
with httpx.Client(proxy="socks5://localhost:1080") as c:
    print(c.is_closed)
```

Instala `python -m pip install "httpx[socks]==0.28.1"`.

**Resultado esperado** `False` si está instalada la dependencia; no se conecta aún.

### mounts

**Clave** `mounts`

**Definición** Permite seleccionar transportes por esquema o patrón de URL.

**Búsqueda** mounts, routing, proxy por host

**Para recordar** Cada transporte maneja el tráfico asignado.

#### Simular una ruta con transporte específico

```python
with httpx.Client(mounts={"https://ventas.example": httpx.MockTransport(handler)}) as c:
    print(c.get(BASE + "/pedidos/1").status_code)
```

Cada transporte maneja el tráfico asignado.

**Resultado esperado** `200`.

### HTTP/1.1 y HTTP/2

**Clave** `http-1-1-y-http-2`

**Definición** HTTPX admite HTTP/1.1 y puede habilitar HTTP/2 con `http2=True`; la versión efectiva depende del servidor y la negociación.

**Búsqueda** http2, h2, http_version

**Para recordar** Instala `python -m pip install "httpx[http2]==0.28.1"`.

**Nota** Requiere Internet y el extra http2.

#### Consultar el protocolo negociado

```python
with httpx.Client(http2=True) as c:
    r = c.get("https://www.python-httpx.org/")
    print(r.http_version)
```

Instala `python -m pip install "httpx[http2]==0.28.1"`.

**Resultado esperado** `HTTP/2` si se negocia; de lo contrario, puede ser HTTP/1.1.

### Compresión y dependencias opcionales

**Clave** `compresion-y-dependencias-opcionales`

**Definición** HTTPX decodifica formatos HTTP de compresión admitidos; Brotli y Zstandard requieren extras opcionales.

**Búsqueda** gzip, deflate, brotli, zstd, httpx[brotli], httpx[zstd]

**Para recordar** `iter_raw()` no aplica la decodificación de Content-Encoding.

#### Decodificar gzip

```python
import gzip
r = httpx.Response(200, content=gzip.compress(b"ventas"), headers={"Content-Encoding": "gzip"})
print(r.content)
```

`iter_raw()` no aplica la decodificación de Content-Encoding.

**Resultado esperado** `b'ventas'`.

## Streaming y archivos

**Clave** `streaming-y-archivos`

### Definición

**Clave** `definicion`

**Definición** El streaming procesa el cuerpo progresivamente, sin necesitar cargarlo completo en memoria.

**Búsqueda** stream, descargar archivo, chunks

**Para recordar** Mantén abierta la respuesta mientras consumes el stream.

#### Leer un CSV en bloques

```python
with demo() as c:
    with c.stream("GET", "/csv") as r:
        r.raise_for_status()
        print(b"".join(r.iter_bytes()).decode().splitlines())
```

Mantén abierta la respuesta mientras consumes el stream.

**Resultado esperado** `['id,importe', '1,800', '3,500']`; join se usa aquí solo por el tamaño pequeño del ejemplo.

### httpx.stream() y client.stream()

**Clave** `httpx-stream-y-client-stream`

**Definición** Son context managers de respuestas en streaming; la forma directa crea su propio cliente.

**Búsqueda** httpx.stream, client.stream

**Para recordar** En una extracción repetida usa el cliente.

**Nota** Requiere Internet.

#### Descargar desde una URL real

```python
with httpx.stream("GET", "https://example.com", timeout=10) as r:
    r.raise_for_status()
    print(next(r.iter_bytes())[:20])
```

En una extracción repetida usa el cliente.

**Resultado esperado** Primeros bytes de la respuesta, variables según el servidor.

### iter_bytes() y descarga

**Clave** `iter-bytes-y-descarga`

**Definición** Itera bytes decodificados y permite escribir cada bloque en disco.

**Búsqueda** chunk_size, descarga grande, wb

**Para recordar** No uses `.content` antes de leer un stream.

#### Guardar un CSV sin acumularlo

```python
with TemporaryDirectory() as tmp:
    p = Path(tmp) / "ventas.csv"
    with demo() as c, c.stream("GET", "/csv") as r, p.open("wb") as f:
        r.raise_for_status()
        for bloque in r.iter_bytes(chunk_size=8):
            f.write(bloque)
    print(p.read_text().splitlines()[-1])
```

No uses `.content` antes de leer un stream.

**Resultado esperado** `3,500`.

### iter_text() e iter_lines()

**Clave** `iter-text-e-iter-lines`

**Definición** `iter_text` produce texto por bloques; `iter_lines` devuelve líneas de texto sin sus terminadores.

**Búsqueda** texto streaming, NDJSON, líneas

**Para recordar** Un bloque de texto no equivale necesariamente a una línea.

#### Procesar JSON por línea

```python
with demo() as c, c.stream("GET", "/ndjson") as r:
    print([json.loads(linea)["id"] for linea in r.iter_lines()])
```

Un bloque de texto no equivale necesariamente a una línea.

**Resultado esperado** `[1, 3]`.

### iter_raw()

**Clave** `iter-raw`

**Definición** Produce bytes sin decodificar Content-Encoding. No equivale a capturar todos los bytes del protocolo de red.

**Búsqueda** raw, gzip, bytes originales

**Para recordar** Úsalo si necesitas conservar el cuerpo comprimido.

#### Leer contenido crudo de un stream

```python
class Bloques(httpx.SyncByteStream):
    def __iter__(self):
        yield b"abc"
        yield b"def"
with httpx.Client(transport=httpx.MockTransport(lambda req: httpx.Response(200, stream=Bloques()))) as c:
    with c.stream("GET", BASE) as r:
        print(list(r.iter_raw()))
```

Úsalo si necesitas conservar el cuerpo comprimido.

**Resultado esperado** `[b'abc', b'def']`.

### read() y cierre

**Clave** `read-y-cierre`

**Definición** `read()` consume y almacena el cuerpo; tras leerlo puedes consultar content o text. `close()` cierra una respuesta síncrona.

**Búsqueda** response.read, close, ResponseNotRead

**Para recordar** No uses read si quieres mantener bajo el uso de memoria.

#### Leer completamente un stream pequeño

```python
with demo() as c, c.stream("GET", "/csv") as r:
    r.read()
    print(r.text.splitlines()[0])
```

No uses read si quieres mantener bajo el uso de memoria.

**Resultado esperado** `id,importe`.

### num_bytes_downloaded

**Clave** `num-bytes-downloaded`

**Definición** Cuenta los bytes del cuerpo recibidos mientras se consume el stream; puede diferir del tamaño descomprimido.

**Búsqueda** progreso, Content-Length, descarga

**Para recordar** Content-Length puede no existir; no asumas porcentaje disponible.

#### Consultar avance de descarga

```python
class Bloques(httpx.SyncByteStream):
    def __iter__(self):
        yield b"abc"
        yield b"def"
with httpx.Client(transport=httpx.MockTransport(lambda req: httpx.Response(200, stream=Bloques()))) as c:
    with c.stream("GET", BASE) as r:
        for _ in r.iter_bytes():
            print(r.num_bytes_downloaded)
```

Content-Length puede no existir; no asumas porcentaje disponible.

**Resultado esperado** `3` y `6`.

### Subir archivos desde disco

**Clave** `subir-archivos-desde-disco`

**Definición** Abre el archivo en modo binario y mantenlo abierto durante la petición multipart.

**Búsqueda** upload, open rb, files

**Para recordar** El contexto cierra el archivo incluso si la petición falla.

#### Subir un CSV temporal

```python
with TemporaryDirectory() as tmp:
    p = Path(tmp) / "ventas.csv"
    p.write_text("id,importe\n1,800\n")
    with demo() as c, p.open("rb") as f:
        r = c.post("/echo", files={"file": (p.name, f, "text/csv")})
        print(p.name in r.json()["body"])
```

El contexto cierra el archivo incluso si la petición falla.

**Resultado esperado** `True`.

### iter_text()

**Clave** `iter-text`

**Definición** Lee el cuerpo de un stream como bloques de texto decodificado.

**Búsqueda** iter_text, texto, bloques

**Para recordar** Usa iter_lines si necesitas registros delimitados por salto de línea.

#### Leer bloques de texto

```python
with demo() as c, c.stream("GET", "/csv") as r:
    print("".join(r.iter_text()).splitlines()[0])
```

Usa iter_lines si necesitas registros delimitados por salto de línea.

**Resultado esperado** `id,importe`.

## Programación asíncrona

**Clave** `programacion-asincrona`

### Definición

**Clave** `definicion`

**Definición** AsyncClient permite esperar operaciones de red sin bloquear el bucle de eventos. La concurrencia ayuda cuando hay varias esperas de I/O.

**Búsqueda** async, await, asyncio, concurrencia

**Para recordar** No hace más rápidos automáticamente los cálculos intensivos de CPU.

#### Consultar un pedido de forma asíncrona

```python
async def main():
    async with demo_async() as c:
        r = await c.get("/pedidos/1")
        print(r.json()["importe"])
asyncio.run(main())
```

No hace más rápidos automáticamente los cálculos intensivos de CPU.

**Resultado esperado** `800`.

### AsyncClient, async with y aclose()

**Clave** `asyncclient-async-with-y-aclose`

**Definición** Usa `async with` para liberar el cliente o llama a `await c.aclose()` en finally.

**Búsqueda** cliente asíncrono, cerrar

**Para recordar** Reutiliza el cliente; evita crear uno por petición en un bucle.

#### Cerrar un cliente explícitamente

```python
async def main():
    c = demo_async()
    try:
        print((await c.get("/pedidos/1")).status_code)
    finally:
        await c.aclose()
    print(c.is_closed)
asyncio.run(main())
```

Reutiliza el cliente; evita crear uno por petición en un bucle.

**Resultado esperado** `200` y `True`.

### asyncio.gather()

**Clave** `asyncio-gather`

**Definición** Ejecuta varias corutinas concurrentemente y devuelve sus resultados en el orden de los argumentos.

**Búsqueda** gather, múltiples peticiones

**Para recordar** El orden de finalización puede ser distinto del orden de resultados.

#### Obtener tres pedidos

```python
async def main():
    async with demo_async() as c:
        rs = await asyncio.gather(*(c.get(f"/pedidos/{i}") for i in (1, 3, 4)))
        print([r.json()["id"] for r in rs])
asyncio.run(main())
```

El orden de finalización puede ser distinto del orden de resultados.

**Resultado esperado** `[1, 3, 4]`.

### Semaphore

**Clave** `semaphore`

**Definición** Limita cuántas tareas pueden acceder simultáneamente a una sección; no impone por sí mismo una tasa de peticiones por segundo.

**Búsqueda** asyncio.Semaphore, concurrencia, límites

**Para recordar** Comparte el semáforo y el cliente entre tareas.

#### Limitar consultas simultáneas

```python
async def main():
    sem = asyncio.Semaphore(2)
    async with demo_async() as c:
        async def obtener(i):
            async with sem:
                return (await c.get(f"/pedidos/{i}")).json()["id"]
        print(await asyncio.gather(*(obtener(i) for i in (1, 2, 3, 4))))
asyncio.run(main())
```

Comparte el semáforo y el cliente entre tareas.

**Resultado esperado** `[1, 2, 3, 4]`; como máximo dos tareas entran a la sección protegida.

### Cancelación y plazo total

**Clave** `cancelacion-y-plazo-total`

**Definición** Una tarea asíncrona puede cancelarse; `asyncio.wait_for` limita el tiempo total esperado de una operación y solicita cancelación al vencer.

**Búsqueda** cancel, wait_for, TimeoutError

**Para recordar** No confundas este plazo con los timeouts por fase de HTTPX.

#### Cancelar una espera simulada

```python
async def main():
    try:
        await asyncio.wait_for(asyncio.sleep(1), timeout=0.01)
    except asyncio.TimeoutError:
        print("plazo agotado")
asyncio.run(main())
```

No confundas este plazo con los timeouts por fase de HTTPX.

**Resultado esperado** `plazo agotado`.

### AnyIO y Trio

**Clave** `anyio-y-trio`

**Definición** HTTPX AsyncClient puede funcionar en backends asyncio y Trio; AnyIO facilita código compatible con ambos.

**Búsqueda** anyio.run, trio.run, backend

**Para recordar** Trio requiere instalar `trio`; no mezcles primitivas asyncio con un backend Trio.

#### Ejecutar mediante AnyIO

```python
import anyio
async def main():
    async with demo_async() as c:
        print((await c.get("/pedidos/1")).status_code)
anyio.run(main)
```

Trio requiere instalar `trio`; no mezcles primitivas asyncio con un backend Trio.

**Resultado esperado** `200`.

## Streaming asíncrono

**Clave** `streaming-asincrono`

### Definición

**Clave** `definicion`

**Definición** Los métodos de streaming asíncronos entregan bloques con `async for` y mantienen abierta la respuesta con `async with`.

**Búsqueda** async stream, aiter, descargar async

**Para recordar** No olvides cerrar las respuestas si usas streaming manual.

#### Leer líneas asíncronamente

```python
async def main():
    async with demo_async() as c, c.stream("GET", "/ndjson") as r:
        async for linea in r.aiter_lines():
            print(json.loads(linea)["id"])
asyncio.run(main())
```

No olvides cerrar las respuestas si usas streaming manual.

**Resultado esperado** `1` y `3`.

### aiter_bytes(), aiter_text() y aiter_lines()

**Clave** `aiter-bytes-aiter-text-y-aiter-lines`

**Definición** Son las variantes asíncronas de los iteradores de bytes, texto y líneas.

**Búsqueda** async for, chunks, bytes, texto

**Para recordar** Elige el iterador según el formato del recurso.

#### Contar bytes de un CSV

```python
async def main():
    async with demo_async() as c, c.stream("GET", "/csv") as r:
        total = 0
        async for bloque in r.aiter_bytes():
            total += len(bloque)
        print(total)
asyncio.run(main())
```

Elige el iterador según el formato del recurso.

**Resultado esperado** `23` bytes.

### aiter_raw()

**Clave** `aiter-raw`

**Definición** Itera los bytes del cuerpo sin decodificar compresión HTTP.

**Búsqueda** raw async, compresión

**Para recordar** El stream debe estar abierto y no consumido.

#### Leer bloques crudos

```python
class Bloques(httpx.AsyncByteStream):
    async def __aiter__(self):
        yield b"abc"
async def main():
    async with httpx.AsyncClient(transport=httpx.MockTransport(lambda req: httpx.Response(200, stream=Bloques()))) as c:
        async with c.stream("GET", BASE) as r:
            print([b async for b in r.aiter_raw()])
asyncio.run(main())
```

El stream debe estar abierto y no consumido.

**Resultado esperado** `[b'abc']`.

### aread() y aclose()

**Clave** `aread-y-aclose`

**Definición** `aread` lee el cuerpo completo; `aclose` libera el stream. Con `send(stream=True)` debes garantizar el cierre manual.

**Búsqueda** send stream=True, cierre async

**Para recordar** Prefiere `async with` si no necesitas administrar manualmente el ciclo de vida.

#### Leer una respuesta manualmente

```python
async def main():
    async with demo_async() as c:
        r = await c.send(c.build_request("GET", "/csv"), stream=True)
        try:
            await r.aread()
            print(r.text.splitlines()[0])
        finally:
            await r.aclose()
asyncio.run(main())
```

Prefiere `async with` si no necesitas administrar manualmente el ciclo de vida.

**Resultado esperado** `id,importe`.

### aiter_text()

**Clave** `aiter-text`

**Definición** Itera texto decodificado de una respuesta asíncrona.

**Búsqueda** aiter_text, async for, texto

**Para recordar** Consume el stream dentro del contexto asíncrono.

#### Leer texto de un CSV

```python
async def main():
    async with demo_async() as c, c.stream("GET", "/csv") as r:
        async for bloque in r.aiter_text():
            print(bloque.splitlines()[0])
asyncio.run(main())
```

Consume el stream dentro del contexto asíncrono.

**Resultado esperado** `id,importe` con el mock.

## Paginación

**Clave** `paginacion`

### Definición

**Clave** `definicion`

**Definición** Una API paginada devuelve una parte de los registros en cada respuesta. Debes solicitar las páginas restantes según el contrato del servicio.

**Búsqueda** pagination, page, cursor, offset, next

**Para recordar** Una primera página exitosa no significa que la extracción esté completa.

#### Inspeccionar primera página

```python
with demo() as c:
    datos = c.get("/pedidos").json()
    print(len(datos["items"]), datos["total"], datos["next_cursor"])
```

Una primera página exitosa no significa que la extracción esté completa.

**Resultado esperado** `2 4 2`.

### Páginas numeradas

**Clave** `paginas-numeradas`

**Definición** Envía page y el tamaño definido por la API. Detén el bucle según los metadatos o la regla de terminación documentada.

**Búsqueda** page, limit, page size

**Para recordar** El índice inicial puede ser cero o uno.

#### Recuperar todas las páginas

```python
filas = []
with demo() as c:
    page = 1
    while True:
        d = c.get("/pedidos", params={"page": page, "limit": 2}).raise_for_status().json()
        filas.extend(d["items"])
        if d["next_cursor"] is None:
            break
        page += 1
print([x["id"] for x in filas])
```

El índice inicial puede ser cero o uno.

**Resultado esperado** `[1, 2, 3, 4]`.

### Offset y limit

**Clave** `offset-y-limit`

**Definición** Offset señala cuántos registros omitir y limit el máximo que se solicita.

**Búsqueda** offset, limit, desplazamiento

**Para recordar** Los cambios de datos durante la paginación pueden producir omisiones o duplicados.

#### Avanzar de dos en dos

```python
filas = []
with demo() as c:
    offset = 0
    while True:
        d = c.get("/pedidos", params={"offset": offset, "limit": 2}).raise_for_status().json()
        filas.extend(d["items"])
        if d["next_cursor"] is None:
            break
        offset += len(d["items"])
print(len(filas))
```

Los cambios de datos durante la paginación pueden producir omisiones o duplicados.

**Resultado esperado** `4`.

### Cursor

**Clave** `cursor`

**Definición** El cursor es un token que el servidor entrega para continuar; trátalo como opaco, aunque parezca un número.

**Búsqueda** next_cursor, cursor pagination

**Para recordar** No fabriques ni incrementes el cursor.

#### Recorrer usando el cursor devuelto

```python
filas, cursor = [], None
with demo() as c:
    while True:
        params = {"cursor": cursor} if cursor is not None else {}
        d = c.get("/pedidos", params=params).raise_for_status().json()
        filas.extend(d["items"])
        cursor = d["next_cursor"]
        if cursor is None:
            break
print([x["id"] for x in filas])
```

No fabriques ni incrementes el cursor.

**Resultado esperado** `[1, 2, 3, 4]`.

### Enlaces next

**Clave** `enlaces-next`

**Definición** Algunas APIs entregan la URL de la próxima página en Link o en el JSON.

**Búsqueda** response.links, rel=next

**Para recordar** Valida host y esquema de enlaces antes de reenviar credenciales; limita páginas para evitar ciclos.

#### Seguir enlaces de paginación

```python
filas = []
url = BASE + "/pedidos"
with demo() as c:
    while url:
        assert httpx.URL(url).host == "ventas.example" and httpx.URL(url).scheme == "https"
        r = c.get(url).raise_for_status()
        filas.extend(r.json()["items"])
        url = r.links.get("next", {}).get("url")
print(len(filas))
```

Valida host y esquema de enlaces antes de reenviar credenciales; limita páginas para evitar ciclos.

**Resultado esperado** `4`.

## Límites y reintentos

**Clave** `limites-y-reintentos`

### Definición

**Clave** `definicion`

**Definición** Los servicios pueden limitar el ritmo de consultas o fallar temporalmente. Reintenta solo operaciones adecuadas, con límite y pausas.

**Búsqueda** retry, rate limit, 429, 503, backoff

**Para recordar** No confundas límite de concurrencia con peticiones por segundo.

#### Detectar un límite de API

```python
with demo() as c:
    r = c.get("/status/429")
    print(r.status_code, r.headers.get("Retry-After"))
```

No confundas límite de concurrencia con peticiones por segundo.

**Resultado esperado** `429 2`.

### Retry-After

**Clave** `retry-after`

**Definición** El servidor puede indicar una espera en segundos o una fecha HTTP. Interpreta el formato y respeta el límite antes de volver a consultar.

**Búsqueda** 429, 503, Retry-After, fecha HTTP

**Para recordar** No conviertas ciegamente todo Retry-After a entero.

#### Interpretar una espera en segundos

```python
with demo() as c:
    r = c.get("/status/429")
    espera = int(r.headers["Retry-After"])
    print(espera)
```

No conviertas ciegamente todo Retry-After a entero.

**Resultado esperado** `2`; solo calcula la espera, no realiza otro intento.

### Retries del transporte

**Clave** `retries-del-transporte`

**Definición** `HTTPTransport(retries=n)` reintenta ConnectError y ConnectTimeout en el transporte real. No reintenta por sí mismo 429 ni 503.

**Búsqueda** HTTPTransport retries, conexión

**Para recordar** Para otros fallos necesitas una política explícita.

#### Configurar dos reintentos de conexión

```python
with httpx.Client(transport=httpx.HTTPTransport(retries=2)) as c:
    print(c.is_closed)
```

Para otros fallos necesitas una política explícita.

**Resultado esperado** `False`; la política queda configurada sin conexión real.

### Backoff exponencial y jitter

**Clave** `backoff-exponencial-y-jitter`

**Definición** El backoff aumenta las pausas tras fallos; el jitter agrega variación para reducir reintentos simultáneos de múltiples clientes.

**Búsqueda** backoff, jitter, random, reintentos

**Para recordar** Limita intentos y tiempo total; Retry-After tiene prioridad si aplica.

#### Calcular pausas de ejemplo

```python
import random
rng = random.Random(0)
print([round(min(30, 2 ** i) + rng.uniform(0, 0.5), 2) for i in range(3)])
```

Limita intentos y tiempo total; Retry-After tiene prioridad si aplica.

**Resultado esperado** `[1.42, 2.38, 4.21]` segundos; no se duerme en este ejemplo.

### Reintentar una consulta

**Clave** `reintentar-una-consulta`

**Definición** Repite una consulta ante estados transitorios definidos por la política. Para POST verifica idempotencia o usa una clave de idempotencia si la API la admite.

**Búsqueda** retry loop, 503, GET, intentos

**Para recordar** No reintentes 401/403/404 indiscriminadamente.

#### Simular recuperación tras un 503

```python
respuestas = iter([503, 200])
with httpx.Client(transport=httpx.MockTransport(lambda req: httpx.Response(next(respuestas)))) as c:
    for intento in range(3):
        r = c.get(BASE)
        if r.status_code not in (429, 502, 503, 504):
            break
        # En producción, espera según Retry-After o backoff.
    print(r.raise_for_status().status_code)
```

No reintentes 401/403/404 indiscriminadamente.

**Resultado esperado** `200` en el segundo intento; la espera está omitida solo para la prueba.

### Control de ritmo

**Clave** `control-de-ritmo`

**Definición** Limita la frecuencia de inicio de peticiones según el contrato de la API, incluso si las conexiones son rápidas.

**Búsqueda** rate limiter, requests por segundo, sleep

**Para recordar** En código concurrente usa un limitador compartido.

#### Separar consultas en el tiempo

```python
import time
with demo() as c:
    for i in (1, 3):
        print(c.get(f"/pedidos/{i}").status_code)
        time.sleep(0.01)
```

En código concurrente usa un limitador compartido.

**Resultado esperado** `200` y `200`; el intervalo es ilustrativo, no un límite de una API real.

### Retry-After como fecha

**Clave** `retry-after-como-fecha`

**Definición** Cuando Retry-After es una fecha HTTP, calcula los segundos restantes respecto a la hora actual UTC.

**Búsqueda** Retry-After fecha, parsedate_to_datetime, UTC

**Para recordar** Si la fecha ya pasó, usa cero; aplica también los límites de la política de reintentos.

#### Calcular una espera con reloj fijo

```python
from email.utils import parsedate_to_datetime
from datetime import datetime, timezone
ahora = datetime(2026, 8, 1, tzinfo=timezone.utc)
fecha = parsedate_to_datetime("Sat, 01 Aug 2026 00:00:05 GMT")
print(max(0, (fecha - ahora).total_seconds()))
```

Si la fecha ya pasó, usa cero; aplica también los límites de la política de reintentos.

**Resultado esperado** `5.0` segundos.

## Datos de API y validación

**Clave** `datos-de-api-y-validacion`

### Definición

**Clave** `definicion`

**Definición** El formato del cuerpo y la estructura de los registros dependen de la API. HTTPX transporta datos; Python y otras bibliotecas los interpretan.

**Búsqueda** JSON, XML, HTML, CSV, esquema

**Para recordar** Comprueba el contrato y el estado antes de transformar.

#### Extraer un campo JSON anidado

```python
with demo() as c:
    d = c.get("/pedidos").raise_for_status().json()
    print(d["items"][0]["cliente"])
```

Comprueba el contrato y el estado antes de transformar.

**Resultado esperado** `Ana`.

### JSON anidado y módulo json

**Clave** `json-anidado-y-modulo-json`

**Definición** `.json()` interpreta el cuerpo HTTP; `json.dumps` y `json.loads` serializan e interpretan texto JSON fuera de la petición.

**Búsqueda** listas, diccionarios, dumps, loads

**Para recordar** No confundas un diccionario Python con texto JSON.

#### Serializar una respuesta para guardarla

```python
with demo() as c:
    d = c.get("/pedidos/1").json()
    texto = json.dumps(d, ensure_ascii=False)
    print(json.loads(texto)["id"])
```

No confundas un diccionario Python con texto JSON.

**Resultado esperado** `1`.

### Validación de estructura

**Clave** `validacion-de-estructura`

**Definición** Comprueba que el resultado tenga los campos y tipos requeridos antes de usarlo.

**Búsqueda** schema, validación, missing fields, Pydantic

**Para recordar** Un 200 no garantiza que existan los campos esperados.

#### Validar una página de pedidos

```python
with demo() as c:
    d = c.get("/pedidos").raise_for_status().json()
    if not isinstance(d, dict) or not isinstance(d.get("items"), list):
        raise ValueError("esquema inesperado")
    for fila in d["items"]:
        if not isinstance(fila, dict) or not isinstance(fila.get("id"), int):
            raise ValueError("id inválido")
    print("válido")
```

Un 200 no garantiza que existan los campos esperados.

**Resultado esperado** `válido`.

### CSV, XML y HTML

**Clave** `csv-xml-y-html`

**Definición** Selecciona el parser según el formato real: csv, ElementTree o una biblioteca HTML. HTTPX no analiza automáticamente estos formatos.

**Búsqueda** csv.DictReader, XML, HTML, BeautifulSoup

**Para recordar** No uses response.json() para un CSV.

#### Interpretar CSV devuelto por una API

```python
import csv, io
with demo() as c:
    r = c.get("/csv").raise_for_status()
    filas = list(csv.DictReader(io.StringIO(r.text)))
    print(filas[0])
```

No uses response.json() para un CSV.

**Resultado esperado** `{'id': '1', 'importe': '800'}`.

### REST y GraphQL

**Clave** `rest-y-graphql`

**Definición** REST suele exponer recursos mediante rutas y métodos; GraphQL recibe una consulta que selecciona campos según su esquema.

**Búsqueda** REST, GraphQL, query, variables

**Para recordar** GraphQL puede devolver HTTP 200 con una lista `errors`.

#### Consultar un campo GraphQL

```python
with demo() as c:
    r = c.post("/graphql", json={"query": "{ pedidos { id } }"}).raise_for_status()
    d = r.json()
    if d.get("errors"):
        raise ValueError(d["errors"])
    print(d["data"]["pedidos"])
```

GraphQL puede devolver HTTP 200 con una lista `errors`.

**Resultado esperado** `[{'id': 1}]`; el servidor simulado no ejecuta GraphQL.

### Interpretar XML

**Clave** `interpretar-xml`

**Definición** ElementTree interpreta documentos XML y permite seleccionar elementos.

**Búsqueda** XML, ElementTree, findtext

**Para recordar** Para XML no confiable considera un parser endurecido, como defusedxml, según el origen.

#### Leer importe de una respuesta XML simulada

```python
import xml.etree.ElementTree as ET
r = httpx.Response(200, content=b"<pedido><importe>800</importe></pedido>")
print(int(ET.fromstring(r.content).findtext("importe")))
```

Para XML no confiable considera un parser endurecido, como defusedxml, según el origen.

**Resultado esperado** `800`.

### Interpretar HTML

**Clave** `interpretar-html`

**Definición** Un parser HTML extrae elementos de páginas; HTTPX solo recupera el documento.

**Búsqueda** HTML, BeautifulSoup, select_one

**Para recordar** Para scraping revisa permisos, condiciones de uso y límites del sitio.

**Nota** Requiere `python -m pip install beautifulsoup4`.

#### Extraer un importe de HTML simulado

```python
from bs4 import BeautifulSoup
r = httpx.Response(200, text='<p class="importe">800</p>')
soup = BeautifulSoup(r.text, "html.parser")
print(soup.select_one(".importe").get_text())
```

Para scraping revisa permisos, condiciones de uso y límites del sitio.

**Resultado esperado** `800`.

## Extracción y ETL

**Clave** `extraccion-y-etl`

### Definición

**Clave** `definicion`

**Definición** ETL significa extraer, transformar y cargar datos. HTTPX se encarga principalmente de la extracción y del envío de resultados cuando la API lo requiere.

**Búsqueda** ETL, automatización, datos, pipeline

**Para recordar** Separa la lógica HTTP de la transformación.

#### Calcular importe de pedidos completados

```python
with demo() as c:
    d = c.get("/pedidos", params={"estado": "completed", "limit": 10}).raise_for_status().json()
    print(sum(x["importe"] for x in d["items"]))
```

Separa la lógica HTTP de la transformación.

**Resultado esperado** `2200`.

### Extracción incremental

**Clave** `extraccion-incremental`

**Definición** Recupera registros nuevos o modificados usando un marcador de fecha, ID o cursor que admita la API.

**Búsqueda** incremental, watermark, desde

**Para recordar** La API de prueba usa fecha estrictamente mayor; en producción contempla empates y cambios tardíos.

#### Extraer pedidos posteriores a una fecha

```python
with demo() as c:
    d = c.get("/pedidos", params={"desde": "2026-08-02", "limit": 10}).json()
    print([x["id"] for x in d["items"]])
```

La API de prueba usa fecha estrictamente mayor; en producción contempla empates y cambios tardíos.

**Resultado esperado** `[3, 4]`.

### Eliminar duplicados

**Clave** `eliminar-duplicados`

**Definición** Al combinar páginas o reintentos, identifica registros por una clave estable y aplica una regla de actualización.

**Búsqueda** deduplicación, id, dict, idempotencia

**Para recordar** No elimines registros distintos solo porque tengan el mismo importe.

#### Unificar dos lotes superpuestos

```python
lote = PEDIDOS[:2] + PEDIDOS[1:]
unicos = {x["id"]: x for x in lote}
print(sorted(unicos))
```

No elimines registros distintos solo porque tengan el mismo importe.

**Resultado esperado** `[1, 2, 3, 4]`.

### Checkpoint y recuperación

**Clave** `checkpoint-y-recuperacion`

**Definición** Persiste el cursor o marcador después de guardar cada lote correctamente. Una carga idempotente permite reanudar sin duplicar registros.

**Búsqueda** checkpoint, reanudar, cursor, recuperación

**Para recordar** No avances el checkpoint antes de confirmar la escritura del lote.

#### Guardar un marcador de progreso

```python
with TemporaryDirectory() as tmp:
    p = Path(tmp) / "checkpoint.json"
    with demo() as c:
        d = c.get("/pedidos").raise_for_status().json()
        (Path(tmp) / "lote.json").write_text(json.dumps(d["items"]))
        p.write_text(json.dumps({"cursor": d["next_cursor"]}))
        cursor = json.loads(p.read_text())["cursor"]
        print(c.get("/pedidos", params={"cursor": cursor}).json()["items"][0]["id"])
```

No avances el checkpoint antes de confirmar la escritura del lote.

**Resultado esperado** `3`; ejemplo local de reanudación, no una transacción atómica entre archivos.

### Pandas y json_normalize

**Clave** `pandas-y-json-normalize`

**Definición** Convierte registros JSON en un DataFrame para limpiar, agregar y analizar datos tabulares.

**Búsqueda** pandas, DataFrame, json_normalize

**Para recordar** Requiere `python -m pip install pandas`.

#### Crear una tabla de pedidos

```python
import pandas as pd
with demo() as c:
    d = c.get("/pedidos", params={"limit": 10}).json()
df = pd.json_normalize(d["items"])
print(df.shape, df["importe"].sum())
```

Requiere `python -m pip install pandas`.

**Resultado esperado** `(4, 5) 2500`.

### Exportación CSV y JSON

**Clave** `exportacion-csv-y-json`

**Definición** Guarda los registros en un formato que pueda utilizar otra herramienta.

**Búsqueda** to_csv, json.dump, UTF-8

**Para recordar** Los archivos JSON y CSV tienen representaciones distintas de datos anidados y nulos.

#### Guardar datos en dos formatos

```python
import csv
with TemporaryDirectory() as tmp:
    p = Path(tmp)
    (p / "pedidos.json").write_text(json.dumps(PEDIDOS), encoding="utf-8")
    with (p / "pedidos.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=PEDIDOS[0].keys())
        w.writeheader()
        w.writerows(PEDIDOS)
    print(len((p / "pedidos.csv").read_text().splitlines()))
```

Los archivos JSON y CSV tienen representaciones distintas de datos anidados y nulos.

**Resultado esperado** `5` líneas: encabezado y cuatro registros.

### Exportación Excel

**Clave** `exportacion-excel`

**Definición** Utiliza pandas con un motor Excel para guardar un DataFrame como hoja de cálculo.

**Búsqueda** to_excel, openpyxl, xlsx

**Para recordar** Requiere pandas y openpyxl.

#### Crear una hoja de pedidos

```python
import pandas as pd
with TemporaryDirectory() as tmp:
    p = Path(tmp) / "pedidos.xlsx"
    pd.DataFrame(PEDIDOS).to_excel(p, index=False, engine="openpyxl")
    print(pd.read_excel(p).shape)
```

Requiere pandas y openpyxl.

**Resultado esperado** `(4, 5)`.

### Carga SQL

**Clave** `carga-sql`

**Definición** Usa un driver o biblioteca de base de datos para guardar los registros extraídos. HTTPX no reemplaza al cliente SQL.

**Búsqueda** sqlite3, INSERT, upsert, SQL, ETL

**Para recordar** Usa parámetros SQL y una clave única para prevenir duplicados.

#### Cargar pedidos en SQLite de memoria

```python
import sqlite3
from contextlib import closing
with closing(sqlite3.connect(":memory:")) as db, db:
    db.execute("CREATE TABLE pedidos (id INTEGER PRIMARY KEY, importe INTEGER)")
    db.executemany("INSERT INTO pedidos VALUES (?, ?)", [(x["id"], x["importe"]) for x in PEDIDOS])
    print(db.execute("SELECT SUM(importe) FROM pedidos").fetchone()[0])
```

Usa parámetros SQL y una clave única para prevenir duplicados.

**Resultado esperado** `2500`.

### Caché condicional: ETag y Last-Modified

**Clave** `cache-condicional-etag-y-last-modified`

**Definición** Un servidor puede devolver 304 si la representación no cambió. Guarda la respuesta anterior y envía su validador en la siguiente consulta.

**Búsqueda** ETag, If-None-Match, Last-Modified, If-Modified-Since

**Para recordar** HTTPX no mantiene una caché HTTP automática; maneja 304 antes de raise_for_status.

#### Reutilizar una respuesta sin cambios

```python
with demo() as c:
    anterior = c.get("/cache").raise_for_status()
    r = c.get("/cache", headers={"If-None-Match": anterior.headers["ETag"]})
    datos = anterior.json() if r.status_code == 304 else r.raise_for_status().json()
    print(r.status_code, datos["total"])
```

HTTPX no mantiene una caché HTTP automática; maneja 304 antes de raise_for_status.

**Resultado esperado** `304 4`.

## Request y Response explícitos

**Clave** `request-y-response-explicitos`

### Definición

**Clave** `definicion`

**Definición** `Request` representa una petición preparada y `Response` una respuesta. Son útiles para inspección, pruebas y transportes.

**Búsqueda** httpx.Request, httpx.Response, objetos

**Para recordar** Crear Request no realiza ninguna llamada de red.

#### Construir una petición sin enviarla

```python
req = httpx.Request("GET", BASE + "/pedidos/1")
print(req.method, req.url.path)
```

Crear Request no realiza ninguna llamada de red.

**Resultado esperado** `GET /pedidos/1`.

### build_request()

**Clave** `build-request`

**Definición** Construye una petición aplicando la URL base y configuración compartida del cliente.

**Búsqueda** client.build_request, preparar request

**Para recordar** Es preferible a Request directo si necesitas heredar los ajustes del cliente.

#### Preparar una consulta con filtro

```python
with demo(params={"limit": 2}) as c:
    req = c.build_request("GET", "/pedidos", params={"estado": "completed"})
    print(req.url.params["limit"], req.url.params["estado"])
```

Es preferible a Request directo si necesitas heredar los ajustes del cliente.

**Resultado esperado** `2 completed`.

### send()

**Clave** `send`

**Definición** Envía una petición ya construida; no vuelve a combinar todos los ajustes como build_request.

**Búsqueda** client.send, stream, request preparado

**Para recordar** Para enviar manualmente con streaming, cierra la respuesta.

#### Enviar una petición preparada

```python
with demo() as c:
    req = c.build_request("GET", "/pedidos/1")
    r = c.send(req)
    print(r.json()["id"])
```

Para enviar manualmente con streaming, cierra la respuesta.

**Resultado esperado** `1`.

### Response construida

**Clave** `response-construida`

**Definición** `httpx.Response` permite crear una respuesta artificial con estado, headers y contenido.

**Búsqueda** Response, mock, status, json

**Para recordar** Asocia una Request si necesitas usar raise_for_status o response.request.

#### Construir una respuesta de prueba

```python
req = httpx.Request("GET", BASE)
r = httpx.Response(200, json={"total": 4}, request=req)
print(r.raise_for_status().json())
```

Asocia una Request si necesitas usar raise_for_status o response.request.

**Resultado esperado** `{'total': 4}`.

## Event hooks y diagnóstico

**Clave** `event-hooks-y-diagnostico`

### Definición

**Clave** `definicion`

**Definición** Los event hooks ejecutan funciones en etapas de la petición y la respuesta. Sirven para métricas, registro y validaciones compartidas.

**Búsqueda** event_hooks, request, response, logging

**Para recordar** No registres cuerpos o credenciales sin necesidad.

#### Registrar estados de respuesta

```python
def registrar(r):
    print(r.status_code)
with demo(event_hooks={"response": [registrar]}) as c:
    c.get("/pedidos/1")
```

No registres cuerpos o credenciales sin necesidad.

**Resultado esperado** `200`.

### Hook request

**Clave** `hook-request`

**Definición** El hook request se ejecuta antes de enviar la petición; recibe un Request.

**Búsqueda** event_hooks request, modificar header

**Para recordar** Evita exponer información sensible en trazas.

#### Agregar un encabezado de identificación

```python
def preparar(req):
    req.headers["X-App"] = "analisis"
with demo(event_hooks={"request": [preparar]}) as c:
    print(c.get("/echo").request.headers["X-App"])
```

Evita exponer información sensible en trazas.

**Resultado esperado** `analisis`.

### Hook response

**Clave** `hook-response`

**Definición** Se ejecuta al recibir la respuesta, antes de leer automáticamente el cuerpo. Puede centralizar raise_for_status.

**Búsqueda** event_hooks response, validación

**Para recordar** Si necesitas el cuerpo en el hook llama a read o aread según el cliente.

#### Validar todas las respuestas

```python
def validar(r):
    r.raise_for_status()
with demo(event_hooks={"response": [validar]}) as c:
    try:
        c.get("/status/404")
    except httpx.HTTPStatusError:
        print("error detectado")
```

Si necesitas el cuerpo en el hook llama a read o aread según el cliente.

**Resultado esperado** `error detectado`.

### Hooks asíncronos

**Clave** `hooks-asincronos`

**Definición** AsyncClient requiere funciones hook asíncronas.

**Búsqueda** async hook, event_hooks

**Para recordar** Usa await r.aread() si el hook necesita cargar el cuerpo.

#### Registrar un estado asíncronamente

```python
async def registrar(r):
    print(r.status_code)
async def main():
    async with demo_async(event_hooks={"response": [registrar]}) as c:
        await c.get("/pedidos/1")
asyncio.run(main())
```

Usa await r.aread() si el hook necesita cargar el cuerpo.

**Resultado esperado** `200`.

### Logging y monitoreo

**Clave** `logging-y-monitoreo`

**Definición** Usa logging para registrar fallos, estados, latencia y progreso; HTTPX y httpcore también emiten logs diagnósticos.

**Búsqueda** logging, debugging, httpcore, métricas

**Para recordar** Registra rutas sin query sensible y evita Authorization, cookies y tokens.

#### Registrar un error con contexto limitado

```python
import logging, sys
logger = logging.getLogger("extraccion")
logger.handlers.clear()
logger.addHandler(logging.StreamHandler(sys.stdout))
logger.setLevel(logging.WARNING)
logger.propagate = False
with demo() as c:
    try:
        c.get("/status/503").raise_for_status()
    except httpx.HTTPStatusError as e:
        logger.warning("estado=%s ruta=%s", e.response.status_code, e.request.url.path)
```

Registra rutas sin query sensible y evita Authorization, cookies y tokens.

**Resultado esperado** Registro de advertencia con `estado=503 ruta=/status/503`; formato depende de logging.

## Transportes

**Clave** `transportes`

### Definición

**Clave** `definicion`

**Definición** Un transporte ejecuta la petición a bajo nivel y devuelve una respuesta. HTTPX permite sustituirlo para pruebas o configuraciones especiales.

**Búsqueda** transport, HTTPTransport, MockTransport

**Para recordar** El cliente define la interfaz de alto nivel; el transporte ejecuta la comunicación.

#### Crear un transporte simulado

```python
with httpx.Client(transport=httpx.MockTransport(handler)) as c:
    print(c.get(BASE + "/pedidos/1").status_code)
```

El cliente define la interfaz de alto nivel; el transporte ejecuta la comunicación.

**Resultado esperado** `200`.

### HTTPTransport y AsyncHTTPTransport

**Clave** `httptransport-y-asynchttptransport`

**Definición** Son transportes de red síncrono y asíncrono; permiten configurar parámetros de bajo nivel como retries y local_address.

**Búsqueda** HTTPTransport, AsyncHTTPTransport, retries, local_address

**Para recordar** Configura verify, límites y proxy en el transporte si lo construyes explícitamente.

#### Crear un transporte asíncrono real

```python
async def main():
    async with httpx.AsyncClient(transport=httpx.AsyncHTTPTransport(retries=1)) as c:
        print(c.is_closed)
asyncio.run(main())
```

Configura verify, límites y proxy en el transporte si lo construyes explícitamente.

**Resultado esperado** `False`; no se establece una conexión.

### Unix Domain Sockets

**Clave** `unix-domain-sockets`

**Definición** `uds` permite conectar a un servicio local mediante un socket Unix en lugar de TCP.

**Búsqueda** uds, socket Unix, transporte

**Para recordar** Requiere un servicio HTTP escuchando en ese socket.

#### Configurar un socket local

```python
with httpx.Client(transport=httpx.HTTPTransport(uds="/tmp/ventas.sock")) as c:
    print(c.is_closed)
```

Requiere un servicio HTTP escuchando en ese socket.

**Resultado esperado** `False`; para hacer una petición debe existir el socket.

### WSGITransport

**Clave** `wsgitransport`

**Definición** Conecta un cliente síncrono directamente a una aplicación WSGI de Python, sin servidor de red.

**Búsqueda** WSGI, Flask, pruebas

**Para recordar** Úsalo para aplicaciones WSGI, no ASGI.

#### Consultar una aplicación WSGI mínima

```python
def app(environ, start_response):
    start_response("200 OK", [("Content-Type", "text/plain")])
    return [b"ventas"]
with httpx.Client(transport=httpx.WSGITransport(app=app), base_url="http://test") as c:
    print(c.get("/").text)
```

Úsalo para aplicaciones WSGI, no ASGI.

**Resultado esperado** `ventas`.

### ASGITransport

**Clave** `asgitransport`

**Definición** Conecta AsyncClient a una aplicación ASGI sin servidor de red.

**Búsqueda** ASGI, FastAPI, Starlette, pruebas

**Para recordar** HTTPX no ejecuta por sí solo los eventos lifespan de ASGI.

#### Consultar una aplicación ASGI mínima

```python
async def app(scope, receive, send):
    await send({"type": "http.response.start", "status": 200, "headers": []})
    await send({"type": "http.response.body", "body": b"ventas"})
async def main():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as c:
        print((await c.get("/")).text)
asyncio.run(main())
```

HTTPX no ejecuta por sí solo los eventos lifespan de ASGI.

**Resultado esperado** `ventas`.

### Transportes personalizados

**Clave** `transportes-personalizados`

**Definición** Subclasifica BaseTransport o AsyncBaseTransport para implementar `handle_request` o `handle_async_request`.

**Búsqueda** BaseTransport, AsyncBaseTransport, custom transport

**Para recordar** Si delegas a otro transporte, implementa su cierre también.

#### Devolver una respuesta fija

```python
class Fijo(httpx.BaseTransport):
    def handle_request(self, request):
        return httpx.Response(200, json={"ok": True})
with httpx.Client(transport=Fijo()) as c:
    print(c.get(BASE).json())
```

Si delegas a otro transporte, implementa su cierre también.

**Resultado esperado** `{'ok': True}`.

## Extensiones de bajo nivel

**Clave** `extensiones-de-bajo-nivel`

### Definición

**Clave** `definicion`

**Definición** Las extensiones son diccionarios de datos auxiliares asociados con peticiones y respuestas. Su interpretación depende del transporte.

**Búsqueda** extensions, httpcore, trace, low level

**Para recordar** Prefiere la API de alto nivel cuando exista.

#### Inspeccionar extensiones de petición

```python
with demo(timeout=7) as c:
    req = c.build_request("GET", "/pedidos/1")
    print(req.extensions["timeout"]["connect"])
```

Prefiere la API de alto nivel cuando exista.

**Resultado esperado** `7`.

### request.extensions y response.extensions

**Clave** `request-extensions-y-response-extensions`

**Definición** Permiten acceder a información de bajo nivel como timeout, versión HTTP y metadatos específicos del transporte.

**Búsqueda** http_version, reason_phrase, network_stream

**Para recordar** No todas las claves están presentes en todos los transportes.

#### Crear una respuesta con metadato de protocolo

```python
r = httpx.Response(200, extensions={"http_version": b"HTTP/2"})
print(r.http_version)
```

No todas las claves están presentes en todos los transportes.

**Resultado esperado** `HTTP/2`; metadato simulado, no negociación real.

### Tracing

**Clave** `tracing`

**Definición** La extensión trace permite observar eventos internos de httpcore cuando el transporte lo soporta.

**Búsqueda** trace, httpcore events, debug red

**Para recordar** Los eventos pueden variar; el callback asíncrono debe ser async.

**Nota** Requiere Internet; MockTransport no genera estos eventos.

#### Registrar eventos de una conexión real

```python
def trace(name, info):
    print(name)
with httpx.Client() as c:
    req = c.build_request("GET", "https://example.com", extensions={"trace": trace})
    c.send(req)
```

Los eventos pueden variar; el callback asíncrono debe ser async.

**Resultado esperado** Nombres de eventos de red y protocolo; dependen de la conexión.

## Pruebas de integraciones HTTP

**Clave** `pruebas-de-integraciones-http`

### Definición

**Clave** `definicion`

**Definición** Las pruebas con respuestas simuladas comprueban cómo el código procesa datos y errores sin depender de un servicio externo.

**Búsqueda** testing, mocks, pytest, assertions

**Para recordar** Prueba casos exitosos, fallos y respuestas incompletas.

#### Comprobar una extracción

```python
with demo() as c:
    r = c.get("/pedidos/1").raise_for_status()
    assert r.json()["importe"] == 800
print("OK")
```

Prueba casos exitosos, fallos y respuestas incompletas.

**Resultado esperado** `OK`.

### MockTransport

**Clave** `mocktransport`

**Definición** Recibe una función que transforma Request en Response, o que lanza errores de prueba.

**Búsqueda** mock handler, response falsa, offline

**Para recordar** No simula automáticamente toda la semántica de red.

#### Simular un error de servidor

```python
def responder(req):
    assert req.method == "GET"
    return httpx.Response(503, json={"error": "temporal"})
with httpx.Client(transport=httpx.MockTransport(responder)) as c:
    print(c.get(BASE).status_code)
```

No simula automáticamente toda la semántica de red.

**Resultado esperado** `503`.

### RESPX

**Clave** `respx`

**Definición** Biblioteca externa para interceptar peticiones HTTPX y verificar rutas y llamadas mediante mocks.

**Búsqueda** respx, mock routes, testing

**Para recordar** Instala una versión compatible de `respx`.

**Nota** Requiere `python -m pip install respx`.

#### Simular una ruta con RESPX

```python
import respx
with respx.mock:
    ruta = respx.get(BASE + "/pedidos/1").mock(return_value=httpx.Response(200, json={"id": 1}))
    print(httpx.get(BASE + "/pedidos/1").json(), ruta.called)
```

Instala una versión compatible de `respx`.

**Resultado esperado** `{'id': 1} True`.

### pytest-httpx

**Clave** `pytest-httpx`

**Definición** Plugin de pytest que proporciona la fixture `httpx_mock` para registrar respuestas y comprobar peticiones.

**Búsqueda** pytest, httpx_mock, fixture

**Para recordar** Instala versiones compatibles y ejecuta la prueba con pytest.

**Nota** Requiere `pytest` y `pytest-httpx`, guardar el ejemplo como `test_pedido.py` con `import httpx` al inicio.

#### Probar una consulta aislada

```python
def test_pedido(httpx_mock):
    httpx_mock.add_response(url="https://ventas.example/pedidos/1", json={"id": 1})
    r = httpx.get("https://ventas.example/pedidos/1")
    assert r.json()["id"] == 1
```

Instala versiones compatibles y ejecuta la prueba con pytest.

**Resultado esperado** Una prueba aprobada al ejecutar `pytest` sobre el archivo de prueba.

## Compatibilidad con Requests

**Clave** `compatibilidad-con-requests`

### Definición

**Clave** `definicion`

**Definición** HTTPX y Requests comparten muchas convenciones, pero difieren en opciones, excepciones y soporte asíncrono.

**Búsqueda** requests vs httpx, migración

**Para recordar** No reemplaces el import sin revisar el comportamiento.

#### Migrar una consulta con parámetros

```python
with demo() as c:
    print(c.get("/pedidos", params={"limit": 1}).json()["items"][0]["id"])
```

No reemplaces el import sin revisar el comportamiento.

**Resultado esperado** `1`.

### Diferencias de configuración

**Clave** `diferencias-de-configuracion`

**Definición** HTTPX no sigue redirecciones por defecto, tiene timeouts predeterminados y usa `proxy` para un proxy único; Requests usa otras opciones.

**Búsqueda** allow_redirects, follow_redirects, proxies, timeout

**Para recordar** En HTTPX 0.28 se eliminó `proxies`; usa `proxy` o `mounts`.

#### Configurar comportamiento explícito

```python
with demo(follow_redirects=True, timeout=10) as c:
    print(c.get("/redirect").status_code)
```

En HTTPX 0.28 se eliminó `proxies`; usa `proxy` o `mounts`.

**Resultado esperado** `200`.

### Diferencias de excepciones y sesiones

**Clave** `diferencias-de-excepciones-y-sesiones`

**Definición** HTTPX usa `HTTPError`, `RequestError` y `HTTPStatusError`; Client corresponde funcionalmente a Session de Requests. HTTPX ofrece AsyncClient nativo.

**Búsqueda** Session, Client, RequestException, AsyncClient

**Para recordar** Revisa los bloques except durante una migración.

#### Manejar una respuesta no exitosa

```python
with demo() as c:
    try:
        c.get("/status/404").raise_for_status()
    except httpx.HTTPError:
        print("error HTTP")
```

Revisa los bloques except durante una migración.

**Resultado esperado** `error HTTP`.

## Fuentes

Documentación oficial para la versión de referencia y conceptos complementarios. Las fichas son explicaciones y ejemplos originales, no una transcripción de la documentación.

- [HTTPX QuickStart](https://www.python-httpx.org/quickstart/) — métodos, parámetros, respuestas, estados, formularios, archivos, cookies, streaming.
- [HTTPX Developer Interface](https://www.python-httpx.org/api/) — firmas y clases públicas, propiedades y métodos.
- [HTTPX Clients](https://www.python-httpx.org/advanced/clients/) — configuración compartida, pooling y construcción de peticiones.
- [HTTPX Timeouts](https://www.python-httpx.org/advanced/timeouts/) — tiempos de conexión, lectura, escritura y pool.
- [HTTPX Exceptions](https://www.python-httpx.org/exceptions/) — jerarquía de excepciones.
- [HTTPX Resource Limits](https://www.python-httpx.org/advanced/resource-limits/) — límites de conexiones.
- [HTTPX Authentication](https://www.python-httpx.org/advanced/authentication/) — Basic, Digest, NetRC y Auth personalizado.
- [HTTPX SSL](https://www.python-httpx.org/advanced/ssl/) — verificación y SSLContext.
- [HTTPX Proxies](https://www.python-httpx.org/advanced/proxies/) — proxy, SOCKS y rutas.
- [HTTPX Environment Variables](https://www.python-httpx.org/environment_variables/) — proxies y certificados del entorno.
- [HTTPX HTTP/2](https://www.python-httpx.org/http2/) — habilitación y negociación del protocolo.
- [HTTPX Async Support](https://www.python-httpx.org/async/) — AsyncClient, streaming y backends.
- [HTTPX Event Hooks](https://www.python-httpx.org/advanced/event-hooks/) — callbacks síncronos y asíncronos.
- [HTTPX Logging](https://www.python-httpx.org/logging/) — registros HTTPX y httpcore.
- [HTTPX Transports](https://www.python-httpx.org/advanced/transports/) — transporte de red, pruebas, WSGI, ASGI y transportes personalizados.
- [HTTPX Extensions](https://www.python-httpx.org/advanced/extensions/) — extensiones y trace.
- [HTTPX Requests Compatibility](https://www.python-httpx.org/compatibility/) — diferencias con Requests.
- [HTTPX 0.28.1](https://pypi.org/project/httpx/0.28.1/) — versión utilizada y extras de instalación.
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) — métodos, idempotencia, estados, encabezados, validadores y Retry-After.
- [RFC 6585](https://www.rfc-editor.org/rfc/rfc6585.html) — código 429.
- [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288.html) — enlaces HTTP.
- [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html) y [RFC 6750](https://www.rfc-editor.org/rfc/rfc6750.html) — OAuth 2.0 y Bearer.
- [GraphQL: respuesta](https://graphql.org/learn/response/) — estructura data y errors.
- [Python asyncio](https://docs.python.org/3/library/asyncio.html) — corutinas, gather, timeouts y semáforos.
- [Python json](https://docs.python.org/3/library/json.html), [csv](https://docs.python.org/3/library/csv.html), [sqlite3](https://docs.python.org/3/library/sqlite3.html) — transformación y almacenamiento.
- [pandas json_normalize](https://pandas.pydata.org/docs/reference/api/pandas.json_normalize.html) y [to_excel](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_excel.html) — análisis tabular y exportación.
- [RESPX](https://lundberg.github.io/respx/) y [pytest-httpx](https://colin-b.github.io/pytest_httpx/) — pruebas con bibliotecas externas.

Los patrones de paginación, rate limit, reintentos de aplicación, deduplicación, checkpoints y ETL son diseños ilustrativos; el contrato de cada servicio determina sus parámetros y garantías.
