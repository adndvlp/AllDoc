# Requests

**Clave** `requests`

**Área** Python / Análisis de datos (ubicación propuesta en AllDoc)

**Resumen** Realiza peticiones HTTP síncronas, consume APIs y extrae datos para análisis.

**Alcance** Fundamentos de HTTP, métodos, parámetros, respuestas, autenticación, errores, sesiones, paginación, reintentos, archivos, seguridad, transporte, pruebas y patrones de extracción. Se distinguen las funciones de Requests de las técnicas de HTTP, Python y bibliotecas complementarias.

**Entorno** Python 3.10+, Requests 2.x y urllib3 2.x (`python -m pip install "requests>=2.32,<3" "urllib3>=2.2,<3"`). Los ejemplos de pandas requieren `pandas` y los de Excel también `openpyxl`. Requests es síncrono; no proporciona un cliente async nativo.

## Datos compartidos

Para practicar sin claves reales, internet ni cambios en una API externa, usa este servidor HTTP local. Es una simulación educativa, no una API de producción. Guarda el bloque como `api_demo.py` y ejecútalo en otra terminal con `python api_demo.py`. Escucha únicamente en `127.0.0.1:8765`. Los ejemplos no modifican los datos originales: las escrituras devuelven un eco. `/flaky` falla una vez por clave de consulta hasta reiniciar el servidor. Si repites una prueba de reintentos, reinícialo o cambia la clave. Detén el servidor con Ctrl+C.

```python
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit, parse_qs
import json, time, gzip, base64

ORDERS = [
    {"id": 101, "customer": {"id": 1, "country": "MX"}, "amount": 800, "status": "completed", "updated_at": "2026-08-01"},
    {"id": 102, "customer": {"id": 1, "country": "MX"}, "amount": 300, "status": "cancelled", "updated_at": "2026-08-02"},
    {"id": 103, "customer": {"id": 2, "country": "ES"}, "amount": 1200, "status": "completed", "updated_at": "2026-08-03"},
    {"id": 104, "customer": {"id": 3, "country": None}, "amount": 450, "status": "completed", "updated_at": "2026-08-04"},
]
CSV = b"id,amount\n101,800\n102,300\n"
seen = set()

class API(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def reply(self, data=None, code=200, kind="application/json", headers=None):
        body = b"" if data is None else (data if isinstance(data, bytes) else json.dumps(data).encode())
        self.send_response(code)
        self.send_header("Content-Type", kind)
        self.send_header("Content-Length", str(len(body)))
        for k, v in (headers or {}).items():
            self.send_header(k, v)
        self.end_headers()
        if self.command != "HEAD" and body:
            try:
                self.wfile.write(body)
            except (BrokenPipeError, ConnectionResetError):
                pass

    def do_GET(self):
        u = urlsplit(self.path)
        p, q = u.path, parse_qs(u.query)
        if p == "/orders":
            rows = [r for r in ORDERS if r["status"] in q.get("status", [r["status"]]) and r["updated_at"] >= q.get("since", [""])[0]]
            size = max(1, int(q.get("limit", q.get("per_page", [2]))[0]))
            offset = int(q.get("offset", q.get("cursor", [(int(q.get("page", [1])[0])-1)*size]))[0])
            end = offset + size
            from urllib.parse import urlencode
            nxt = {**q, "offset": [str(end)], "limit": [str(size)]}
            link = "/orders?" + urlencode(nxt, doseq=True) if end < len(rows) else None
            headers = {"Link": f'<{link}>; rel="next"'} if link else {}
            self.reply({"data": rows[offset:end], "total": len(rows), "next": link,
                        "next_cursor": str(end) if end < len(rows) else None}, headers=headers)
        elif p.startswith("/orders/"):
            row = next((r for r in ORDERS if str(r["id"]) == p.split("/")[-1]), None)
            self.reply(row or {"error": "not found"}, 200 if row else 404)
        elif p == "/echo":
            self.reply({"query": q, "headers": dict(self.headers), "method": self.command})
        elif p == "/private":
            valid = (self.headers.get("Authorization") in ("Bearer demo-token", "Basic " + base64.b64encode(b"demo:secret").decode()) or self.headers.get("X-API-Key") == "demo-key")
            self.reply({"access": valid}, 200 if valid else 401)
        elif p == "/login":
            self.reply({"login": True}, headers={"Set-Cookie": "sid=demo; Path=/; HttpOnly"})
        elif p == "/cookie":
            self.reply({"cookie": self.headers.get("Cookie", "")})
        elif p == "/redirect":
            self.reply(code=302, headers={"Location": "/orders/101"})
        elif p == "/loop":
            self.reply(code=302, headers={"Location": "/loop"})
        elif p == "/slow":
            time.sleep(0.3)
            self.reply({"ok": True})
        elif p == "/flaky":
            key = q.get("key", ["default"])[0]
            first = key not in seen
            seen.add(key)
            self.reply({"ok": not first}, 503 if first else 200)
        elif p.startswith("/status/"):
            code = int(p.split("/")[-1])
            self.reply(None if code in (204, 304) else {"status": code}, code, headers={"Retry-After": "0"} if code == 429 else {})
        elif p == "/csv":
            self.reply(CSV, kind="text/csv; charset=utf-8", headers={"Content-Disposition": 'attachment; filename="orders.csv"'})
        elif p == "/text":
            self.reply("México".encode(), kind="text/plain; charset=utf-8")
        elif p == "/gzip":
            self.reply(gzip.compress(b"ventas"), kind="text/plain", headers={"Content-Encoding": "gzip"})
        elif p == "/lines":
            self.reply(b'{"id":101}\n{"id":102}\n', kind="application/x-ndjson")
        elif p == "/versioned":
            tag, modified = '"v1"', "Sat, 01 Aug 2026 00:00:00 GMT"
            inm = self.headers.get("If-None-Match")
            unchanged = inm == tag or (inm is None and self.headers.get("If-Modified-Since") == modified)
            self.reply(None if unchanged else {"version": 1}, 304 if unchanged else 200, headers={"ETag": tag, "Last-Modified": modified})
        else:
            self.reply({"error": "not found"}, 404)

    do_HEAD = do_GET

    def do_OPTIONS(self):
        self.reply(code=204, headers={"Allow": "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS"})

    def write_echo(self):
        raw = self.rfile.read(int(self.headers.get("Content-Length", "0")))
        kind = self.headers.get("Content-Type", "")
        data = json.loads(raw) if "application/json" in kind and raw else raw.decode("utf-8", errors="replace")
        self.reply({"method": self.command, "body": data, "content_type": kind}, 201 if self.command == "POST" else 200)

    do_POST = do_PUT = do_PATCH = do_DELETE = write_echo

ThreadingHTTPServer(("127.0.0.1", 8765), API).serve_forever()
```

En el editor de práctica ejecuta esta preparación antes de cualquier ejemplo (o inclúyela al comienzo de cada sesión):

```python
import requests
BASE = "http://127.0.0.1:8765"
```

Los ejemplos son independientes salvo indicación expresa. Todos los endpoints son simulados; los códigos y resultados son esperados para esta implementación. El servidor no implementa HTTPS, OAuth, Digest, proxies ni GraphQL reales: sus fichas usan preparación sin envío, configuración o un entorno externo explícito. No expongas este servidor fuera de tu equipo. Si AllDoc ejecuta Python en un entorno aislado sin red local, los ejemplos HTTP requieren un intérprete local o un transporte simulado; los ejemplos de preparación y mocks no necesitan servidor.

Datos de pedidos: 101 (cliente 1, MX, 800, completed), 102 (cliente 1, MX, 300, cancelled), 103 (cliente 2, ES, 1200, completed), 104 (cliente 3, país nulo, 450, completed). `/orders` devuelve dos registros por defecto; `limit=10` devuelve los cuatro. Las fechas `updated_at` son del 1 al 4 de agosto de 2026, respectivamente.

## HTTP y APIs

**Clave** `http-y-apis`

### Definición

**Clave** `definicion`

**Definición** HTTP permite a un cliente pedir recursos a un servidor. Requests construye la petición y devuelve un objeto Response.

**Búsqueda** HTTP, API, request, response, consumir API

**Para recordar** La petición y la respuesta son objetos distintos.

#### Consultar un pedido

```python
r = requests.get(BASE + "/orders/101", timeout=5)
print(r.status_code, r.json()["amount"])
```

La petición y la respuesta son objetos distintos.

**Resultado esperado** 200 800.

### Endpoint y ruta

**Clave** `endpoint`

**Definición** Un endpoint combina una ruta y un método para acceder a una operación. Un identificador en la ruta selecciona un recurso.

**Búsqueda** endpoint, path parameter, URL

**Para recordar** El ID va en la ruta cuando la API lo define así.

#### Consultar el pedido 103

```python
order_id = 103
r = requests.get(f"{BASE}/orders/{order_id}", timeout=5)
print(r.json()["id"])
```

El ID va en la ruta cuando la API lo define así.

**Resultado esperado** 103.

### REST y recursos

**Clave** `rest`

**Definición** REST organiza recursos y operaciones mediante una interfaz uniforme. JSON es frecuente, pero no es requisito de REST.

**Búsqueda** REST, recurso, colección

**Para recordar** Colección y recurso individual pueden tener rutas distintas.

#### Consultar una colección y un recurso

```python
a = requests.get(BASE + "/orders", timeout=5)
b = requests.get(BASE + "/orders/101", timeout=5)
print(a.json()["total"], b.json()["id"])
```

Colección y recurso individual pueden tener rutas distintas.

**Resultado esperado** 4 101.

### HTTPS y TLS

**Clave** `https`

**Definición** HTTPS añade cifrado y autenticación del servidor mediante TLS. Requests verifica certificados por defecto.

**Búsqueda** HTTPS, SSL, TLS

**Para recordar** No uses verify=False para solucionar fallos de certificados.

**Nota** El servidor local usa HTTP; la verificación real necesita un servidor HTTPS.

#### Preparar una URL HTTPS

```python
p = requests.Request("GET", "https://example.com").prepare()
print(p.url.startswith("https://"))
```

No uses verify=False para solucionar fallos de certificados.

**Resultado esperado** True; no se envía tráfico.

### Headers y body

**Clave** `headers-body`

**Definición** Los encabezados describen el mensaje; el body contiene los datos. Pueden existir en peticiones y respuestas.

**Búsqueda** cabeceras, cuerpo, content type

**Para recordar** El tipo de contenido ayuda a interpretar el body.

#### Ver el tipo y tamaño de un CSV

```python
r = requests.get(BASE + "/csv", timeout=5)
print(r.headers["Content-Type"], len(r.content))
```

El tipo de contenido ayuda a interpretar el body.

**Resultado esperado** text/csv; charset=utf-8 y 26 bytes.

## Métodos HTTP

**Clave** `metodos-http`

### Definición

**Clave** `definicion`

**Definición** Los métodos expresan la intención de la petición. GET consulta y POST suele enviar datos para crear o procesar.

**Búsqueda** get post put patch delete

**Para recordar** La API decide qué métodos acepta.

#### Consultar un registro

```python
r = requests.get(BASE + "/orders/101", timeout=5)
print(r.json()["id"])
```

La API decide qué métodos acepta.

**Resultado esperado** 101.

### GET

**Clave** `get`

**Definición** Recupera la representación de un recurso.

**Búsqueda** get, método HTTP

**Para recordar** Consulta la documentación del endpoint antes de elegir el método.

#### Enviar GET

```python
r = requests.get(BASE + "/orders/101", timeout=5)
print(r.status_code)
```

Consulta la documentación del endpoint antes de elegir el método.

**Resultado esperado** 200.

### POST

**Clave** `post`

**Definición** Envía datos para crear un recurso o ejecutar una operación.

**Búsqueda** post, método HTTP

**Para recordar** Consulta la documentación del endpoint antes de elegir el método.

#### Enviar POST

```python
r = requests.post(BASE + "/orders/101", json={'amount': 500}, timeout=5)
print(r.status_code)
```

Consulta la documentación del endpoint antes de elegir el método.

**Resultado esperado** 201. La API demo no modifica registros.

### PUT

**Clave** `put`

**Definición** Solicita reemplazar el estado del recurso según el contrato de la API.

**Búsqueda** put, método HTTP

**Para recordar** Consulta la documentación del endpoint antes de elegir el método.

#### Enviar PUT

```python
r = requests.put(BASE + "/orders/101", json={'amount': 500, 'status': 'completed'}, timeout=5)
print(r.status_code)
```

Consulta la documentación del endpoint antes de elegir el método.

**Resultado esperado** 200. La API demo no modifica registros.

### PATCH

**Clave** `patch`

**Definición** Solicita aplicar cambios parciales al recurso.

**Búsqueda** patch, método HTTP

**Para recordar** Consulta la documentación del endpoint antes de elegir el método.

#### Enviar PATCH

```python
r = requests.patch(BASE + "/orders/101", json={'status': 'completed'}, timeout=5)
print(r.status_code)
```

Consulta la documentación del endpoint antes de elegir el método.

**Resultado esperado** 200. La API demo no modifica registros.

### DELETE

**Clave** `delete`

**Definición** Solicita eliminar un recurso.

**Búsqueda** delete, método HTTP

**Para recordar** Consulta la documentación del endpoint antes de elegir el método.

#### Enviar DELETE

```python
r = requests.delete(BASE + "/orders/101", timeout=5)
print(r.status_code)
```

Consulta la documentación del endpoint antes de elegir el método.

**Resultado esperado** 200. La API demo no modifica registros.

### HEAD

**Clave** `head`

**Definición** Solicita los encabezados que corresponderían a GET sin recibir el cuerpo.

**Búsqueda** head, tamaño archivo

**Para recordar** HEAD no descarga el body.

#### Consultar metadatos de un CSV

```python
r = requests.head(BASE + "/csv", timeout=5)
print(r.status_code, len(r.content))
```

HEAD no descarga el body.

**Resultado esperado** 200 0.

### OPTIONS

**Clave** `options`

**Definición** Consulta las opciones de comunicación del recurso; puede informar métodos permitidos.

**Búsqueda** options, Allow

**Para recordar** No todos los servidores publican la misma información.

#### Consultar métodos permitidos

```python
r = requests.options(BASE + "/orders", timeout=5)
print(r.headers["Allow"])
```

No todos los servidores publican la misma información.

**Resultado esperado** GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS.

### request()

**Clave** `request`

**Definición** Permite elegir el método mediante una cadena.

**Búsqueda** requests.request, método dinámico

**Para recordar** Útil si el método se determina por configuración.

#### Ejecutar GET dinámicamente

```python
r = requests.request("GET", BASE + "/orders/101", timeout=5)
print(r.status_code)
```

Útil si el método se determina por configuración.

**Resultado esperado** 200.

### Idempotencia

**Clave** `idempotencia`

**Definición** Una operación idempotente tiene el mismo efecto previsto al repetirse. GET, PUT y DELETE son idempotentes por semántica HTTP; POST y PATCH no necesariamente.

**Búsqueda** idempotencia, retry, duplicados

**Para recordar** No repitas escrituras sin conocer el contrato de la API.

**Nota** La clave solo funciona si el servidor implementa esa garantía; la demo no lo hace.

#### Preparar una clave de idempotencia

```python
p = requests.Request("POST", BASE + "/orders", json={"amount": 500}, headers={"Idempotency-Key": "demo-101"}).prepare()
print(p.headers["Idempotency-Key"])
```

No repitas escrituras sin conocer el contrato de la API.

**Resultado esperado** demo-101; no se envía.

## Parámetros y URL

**Clave** `parametros`

### Definición

**Clave** `definicion`

**Definición** params añade parámetros de consulta a la URL sin construirla manualmente.

**Búsqueda** params, query string, filtros

**Para recordar** La API define los nombres y valores admitidos.

#### Filtrar pedidos

```python
r = requests.get(BASE + "/orders", params={"status": "completed", "limit": 10}, timeout=5)
print(r.json()["total"])
```

La API define los nombres y valores admitidos.

**Resultado esperado** 3.

### params

**Clave** `params`

**Definición** Un diccionario o lista de tuplas permite enviar filtros y otros parámetros de consulta.

**Búsqueda** query params, limit

**Para recordar** No confundas params con el body.

#### Limitar la respuesta a un pedido

```python
r = requests.get(BASE + "/orders", params={"limit": 1}, timeout=5)
print(len(r.json()["data"]))
```

No confundas params con el body.

**Resultado esperado** 1.

### Valores repetidos y None

**Clave** `listas-none`

**Definición** Una lista genera un parámetro repetido por cada elemento. Los valores None en un diccionario params se omiten.

**Búsqueda** params lista, None, multivalor

**Para recordar** None no se envía como texto null.

#### Enviar filtros repetidos

```python
r = requests.get(BASE + "/echo", params={"status": ["completed", "cancelled"], "unused": None}, timeout=5)
print(r.json()["query"])
```

None no se envía como texto null.

**Resultado esperado** {'status': ['completed', 'cancelled']}.

### URL encoding

**Clave** `url-encoding`

**Definición** Requests codifica los caracteres especiales al preparar parámetros.

**Búsqueda** encoding, espacios, acentos

**Para recordar** Pasa el texto original en params.

#### Enviar una búsqueda con espacios

```python
r = requests.get(BASE + "/echo", params={"q": "México & ventas"}, timeout=5)
print(r.json()["query"]["q"][0])
```

Pasa el texto original en params.

**Resultado esperado** México & ventas.

## Encabezados y formatos de envío

**Clave** `encabezados-y-body`

### Definición

**Clave** `definicion`

**Definición** headers configura los metadatos HTTP y json, data o files configuran el contenido enviado.

**Búsqueda** headers, body, payload

**Para recordar** El formato debe coincidir con el contrato del servidor.

#### Enviar JSON

```python
r = requests.post(BASE + "/orders", json={"amount": 500}, timeout=5)
print(r.json()["body"])
```

El formato debe coincidir con el contrato del servidor.

**Resultado esperado** {'amount': 500}.

### headers

**Clave** `headers`

**Definición** Recibe un diccionario de encabezados. Los nombres HTTP no distinguen mayúsculas.

**Búsqueda** headers, X-Client

**Para recordar** No incluyas secretos en encabezados de depuración.

#### Identificar la aplicación

```python
r = requests.get(BASE + "/echo", headers={"X-Client": "analyst"}, timeout=5)
print(r.json()["headers"]["X-Client"])
```

No incluyas secretos en encabezados de depuración.

**Resultado esperado** analyst.

### Accept y Content-Type

**Clave** `accept-content-type`

**Definición** Accept expresa formatos de respuesta deseados; Content-Type describe el cuerpo realmente enviado o recibido.

**Búsqueda** accept, content type, JSON

**Para recordar** Accept no obliga al servidor a devolver el formato.

#### Pedir y enviar JSON

```python
r = requests.post(BASE + "/orders", headers={"Accept": "application/json"}, json={"amount": 500}, timeout=5)
print(r.request.headers["Accept"], r.request.headers["Content-Type"])
```

Accept no obliga al servidor a devolver el formato.

**Resultado esperado** application/json application/json.

### User-Agent y Accept-Encoding

**Clave** `user-agent-accept-encoding`

**Definición** User-Agent identifica el cliente y Accept-Encoding anuncia compresiones aceptadas. Requests establece valores predeterminados.

**Búsqueda** user agent, gzip, headers

**Para recordar** No suplantes clientes para eludir restricciones.

#### Identificar el cliente de análisis

```python
r = requests.get(BASE + "/echo", headers={"User-Agent": "AnalystDemo/1.0"}, timeout=5)
print(r.request.headers["User-Agent"], "Accept-Encoding" in r.request.headers)
```

No suplantes clientes para eludir restricciones.

**Resultado esperado** AnalystDemo/1.0 True.

### json

**Clave** `json`

**Definición** Serializa automáticamente objetos Python a JSON y establece Content-Type si no se fijó.

**Búsqueda** json payload, post dict

**Para recordar** Usa json= para objetos JSON, no data= con un diccionario.

#### Enviar importe y estado

```python
r = requests.post(BASE + "/orders", json={"amount": 500, "status": "completed"}, timeout=5)
print(r.json()["body"]["amount"])
```

Usa json= para objetos JSON, no data= con un diccionario.

**Resultado esperado** 500.

### data: formulario

**Clave** `data-form`

**Definición** data con diccionario se codifica como formulario URL-encoded.

**Búsqueda** data, formulario, urlencoded

**Para recordar** No es lo mismo que JSON.

#### Enviar un formulario

```python
r = requests.post(BASE + "/echo", data={"country": "MX", "amount": 500}, timeout=5)
print(r.json()["body"])
```

No es lo mismo que JSON.

**Resultado esperado** country=MX&amount=500.

### data: texto y bytes

**Clave** `data-raw`

**Definición** data también permite enviar un cuerpo ya construido. Si corresponde, establece su tipo de contenido.

**Búsqueda** raw body, bytes, XML

**Para recordar** No mezcles json con data o files en la misma petición.

#### Enviar XML como bytes

```python
r = requests.post(BASE + "/echo", data=b"<order>101</order>", headers={"Content-Type": "application/xml"}, timeout=5)
print(r.json()["body"])
```

No mezcles json con data o files en la misma petición.

**Resultado esperado** <order>101</order>.

### files y multipart

**Clave** `files`

**Definición** files construye un cuerpo multipart/form-data para enviar archivos y campos.

**Búsqueda** upload, multipart, files

**Para recordar** Deja que Requests genere Content-Type con su boundary.

#### Enviar un CSV y un campo

```python
r = requests.post(BASE + "/echo", files={"file": ("orders.csv", b"id,amount\n101,800\n", "text/csv")}, data={"source": "demo"}, timeout=5)
print(r.json()["content_type"].startswith("multipart/form-data"))
```

Deja que Requests genere Content-Type con su boundary.

**Resultado esperado** True.

## Response y contenido

**Clave** `response`

### Definición

**Clave** `definicion`

**Definición** Response contiene código, encabezados y cuerpo devueltos por el servidor. No es directamente un diccionario.

**Búsqueda** response, respuesta, r

**Para recordar** Inspecciona el estado antes de usar los datos.

#### Leer estado y JSON

```python
r = requests.get(BASE + "/orders/101", timeout=5)
r.raise_for_status()
print(r.json()["amount"])
```

Inspecciona el estado antes de usar los datos.

**Resultado esperado** 800.

### status_code, reason y ok

**Clave** `status-code`

**Definición** status_code es el número HTTP, reason su texto y ok indica código inferior a 400.

**Búsqueda** status code, reason, ok

**Para recordar** ok no significa necesariamente 200 ni confirma éxito de negocio.

#### Inspeccionar un 404

```python
r = requests.get(BASE + "/orders/999", timeout=5)
print(r.status_code, r.reason, r.ok)
```

ok no significa necesariamente 200 ni confirma éxito de negocio.

**Resultado esperado** 404 Not Found False.

### json()

**Clave** `json`

**Definición** Convierte un cuerpo JSON a objetos Python. Puede producir una excepción aunque el código sea 200.

**Búsqueda** response.json, parsear JSON

**Para recordar** Decodificar JSON no equivale a comprobar éxito HTTP.

#### Leer una propiedad anidada

```python
r = requests.get(BASE + "/orders/101", timeout=5)
print(r.json()["customer"]["country"])
```

Decodificar JSON no equivale a comprobar éxito HTTP.

**Resultado esperado** MX.

### text y encoding

**Clave** `text-encoding`

**Definición** text decodifica el cuerpo como str usando encoding, inferido de encabezados o estimado. apparent_encoding ofrece una estimación.

**Búsqueda** texto, Unicode, charset

**Para recordar** Ajusta encoding si conoces la codificación real.

#### Leer caracteres acentuados

```python
r = requests.get(BASE + "/text", timeout=5)
r.encoding = "utf-8"
print(r.text, r.encoding)
```

Ajusta encoding si conoces la codificación real.

**Resultado esperado** México utf-8.

### content

**Clave** `content`

**Definición** content devuelve el cuerpo como bytes, apropiado para archivos y datos binarios.

**Búsqueda** bytes, binario, response.content

**Para recordar** No decodifiques un Excel o una imagen como texto.

#### Inspeccionar bytes de CSV

```python
r = requests.get(BASE + "/csv", timeout=5)
print(r.content[:9])
```

No decodifiques un Excel o una imagen como texto.

**Resultado esperado** b'id,amount'.

### headers

**Clave** `headers`

**Definición** response.headers permite consultar metadatos recibidos sin distinguir mayúsculas.

**Búsqueda** response headers, content length

**Para recordar** Usa get si un encabezado podría faltar.

#### Leer el tipo de contenido

```python
r = requests.get(BASE + "/csv", timeout=5)
print(r.headers.get("content-type"))
```

Usa get si un encabezado podría faltar.

**Resultado esperado** text/csv; charset=utf-8.

### url, request y elapsed

**Clave** `url-request-elapsed`

**Definición** url contiene la dirección final, request la petición preparada enviada y elapsed mide hasta recibir y analizar encabezados.

**Búsqueda** URL final, tiempo respuesta, prepared request

**Para recordar** elapsed no mide necesariamente la descarga completa.

#### Inspeccionar la petición

```python
r = requests.get(BASE + "/orders/101", timeout=5)
print(r.url, r.request.method, r.elapsed.total_seconds() >= 0)
```

elapsed no mide necesariamente la descarga completa.

**Resultado esperado** http://127.0.0.1:8765/orders/101 GET True.

### links

**Clave** `links`

**Definición** links interpreta el encabezado Link como relaciones de enlaces.

**Búsqueda** Link header, next, paginación

**Para recordar** La API puede devolver enlaces relativos.

#### Obtener el enlace siguiente

```python
r = requests.get(BASE + "/orders", timeout=5)
print(r.links["next"]["url"])
```

La API puede devolver enlaces relativos.

**Resultado esperado** Una ruta /orders?offset=2&limit=2.

### cookies

**Clave** `cookies`

**Definición** response.cookies contiene las cookies establecidas por esa respuesta.

**Búsqueda** response.cookies, cookie jar

**Para recordar** Una sesión conserva cookies entre peticiones.

#### Leer una cookie de respuesta

```python
r = requests.get(BASE + "/login", timeout=5)
print(r.cookies.get("sid"))
```

Una sesión conserva cookies entre peticiones.

**Resultado esperado** demo.

### Compresión

**Clave** `compresion`

**Definición** Requests descomprime gzip y deflate en content; Brotli se admite si está instalada una biblioteca compatible.

**Búsqueda** gzip deflate brotli, content encoding

**Para recordar** content no contiene necesariamente los bytes comprimidos originales.

#### Leer contenido comprimido

```python
r = requests.get(BASE + "/gzip", timeout=5)
print(r.headers["Content-Encoding"], r.content)
```

content no contiene necesariamente los bytes comprimidos originales.

**Resultado esperado** gzip b'ventas'.

## Códigos de estado y redirecciones

**Clave** `estados-y-redirecciones`

### Definición

**Clave** `definicion`

**Definición** Los códigos HTTP clasifican resultados: 1xx informativos, 2xx éxito, 3xx redirección, 4xx error de cliente y 5xx error de servidor.

**Búsqueda** HTTP status, 2xx 4xx 5xx

**Para recordar** El significado específico depende del código y de la API.

#### Clasificar un resultado

```python
r = requests.get(BASE + "/orders/101", timeout=5)
print(r.status_code // 100)
```

El significado específico depende del código y de la API.

**Resultado esperado** 2.

### 200, 201, 202 y 204

**Clave** `exito`

**Definición** 200 indica éxito, 201 creación, 202 aceptación sin completar necesariamente y 204 éxito sin cuerpo.

**Búsqueda** 200 201 202 204, no content

**Para recordar** No llames json() sobre un 204 vacío.

#### Comprobar una respuesta sin contenido

```python
r = requests.get(BASE + "/status/204", timeout=5)
print(r.status_code, r.content == b"")
```

No llames json() sobre un 204 vacío.

**Resultado esperado** 204 True.

### 400, 401, 403, 404, 405, 408, 409 y 422

**Clave** `errores-cliente`

**Definición** 400 petición incorrecta; 401 credenciales; 403 acceso denegado; 404 no encontrado; 405 método no permitido; 408 espera del servidor agotada; 409 conflicto; 422 contenido no procesable.

**Búsqueda** errores API, 400 401 403 404 405 408 409 422

**Para recordar** Corrige la causa antes de reintentar un error de cliente.

#### Distinguir acceso de ausencia

```python
for code in (401, 403, 404):
    r = requests.get(f"{BASE}/status/{code}", timeout=5)
    print(r.status_code, r.ok)
```

Corrige la causa antes de reintentar un error de cliente.

**Resultado esperado** 401 False; 403 False; 404 False (una línea cada uno).

### 429 y Retry-After

**Clave** `rate-limit-status`

**Definición** 429 indica demasiadas peticiones. Retry-After puede indicar segundos o una fecha HTTP para volver a intentar.

**Búsqueda** 429, rate limit, retry after

**Para recordar** No reintentes inmediatamente de forma ilimitada.

#### Leer espera indicada

```python
r = requests.get(BASE + "/status/429", timeout=5)
print(r.status_code, r.headers.get("Retry-After"))
```

No reintentes inmediatamente de forma ilimitada.

**Resultado esperado** 429 0.

### 500, 502, 503 y 504

**Clave** `errores-servidor`

**Definición** 500 error interno; 502 respuesta inválida de upstream; 503 no disponible; 504 espera agotada en gateway.

**Búsqueda** 500 502 503 504, servidor

**Para recordar** Solo algunos fallos son transitorios.

#### Detectar un fallo de servidor

```python
r = requests.get(BASE + "/status/503", timeout=5)
print(r.status_code, r.ok)
```

Solo algunos fallos son transitorios.

**Resultado esperado** 503 False.

### 301, 302, 303, 307, 308

**Clave** `redirecciones`

**Definición** 301 y 308 son permanentes; 302 y 307 temporales; 303 orienta a consultar otro recurso. 307 y 308 preservan método y cuerpo.

**Búsqueda** redirect, Location, 301 302 303 307 308

**Para recordar** Requests sigue redirecciones por defecto excepto HEAD.

#### Seguir una redirección

```python
r = requests.get(BASE + "/redirect", timeout=5)
print(r.status_code, r.url.endswith("/orders/101"))
```

Requests sigue redirecciones por defecto excepto HEAD.

**Resultado esperado** 200 True.

### allow_redirects, history e is_redirect

**Clave** `control-redirecciones`

**Definición** allow_redirects=False devuelve la redirección sin seguirla; history conserva las respuestas previas. is_redirect indica una redirección con Location.

**Búsqueda** history, redirect false, is_permanent_redirect

**Para recordar** El 302 inicial y el 200 final son respuestas distintas.

#### Comparar redirección y destino

```python
a = requests.get(BASE + "/redirect", allow_redirects=False, timeout=5)
b = requests.get(BASE + "/redirect", timeout=5)
print(a.is_redirect, a.is_permanent_redirect, [x.status_code for x in b.history])
```

El 302 inicial y el 200 final son respuestas distintas.

**Resultado esperado** True False [302].

### 304 y caché condicional

**Clave** `not-modified`

**Definición** 304 indica que la representación almacenada sigue vigente ante una petición condicional.

**Búsqueda** 304, cache, ETag

**Para recordar** Un 304 no trae la representación nueva.

#### Consultar si cambió un recurso

```python
r = requests.get(BASE + "/versioned", headers={"If-None-Match": '"v1"'}, timeout=5)
print(r.status_code, len(r.content))
```

Un 304 no trae la representación nueva.

**Resultado esperado** 304 0.

## Errores y timeout

**Clave** `errores-y-timeout`

### Definición

**Clave** `definicion`

**Definición** Requests distingue fallos de transporte de respuestas HTTP con error. raise_for_status() convierte códigos 4xx y 5xx en HTTPError.

**Búsqueda** excepciones, errores HTTP

**Para recordar** Una respuesta 404 no lanza automáticamente una excepción.

#### Capturar un error HTTP

```python
try:
    r = requests.get(BASE + "/orders/999", timeout=5)
    r.raise_for_status()
except requests.exceptions.HTTPError as e:
    print(e.response.status_code)
```

Una respuesta 404 no lanza automáticamente una excepción.

**Resultado esperado** 404.

### timeout

**Clave** `timeout`

**Definición** Limita tiempos de conexión y de espera de datos. No es un límite total de duración y Requests no impone uno por defecto.

**Búsqueda** timeout, espera

**Para recordar** Especifica timeout en cada petición.

#### Interrumpir una respuesta lenta

```python
try:
    requests.get(BASE + "/slow", timeout=0.05)
except requests.exceptions.Timeout:
    print("Tiempo agotado")
```

Especifica timeout en cada petición.

**Resultado esperado** Tiempo agotado.

### ConnectTimeout y ReadTimeout

**Clave** `timeout-tuple`

**Definición** Una tupla (connect, read) configura ambos tiempos. ConnectTimeout indica fallo al conectar y ReadTimeout espera de datos agotada.

**Búsqueda** connect timeout, read timeout

**Para recordar** Durante streaming algunos fallos de lectura aparecen como ConnectionError.

#### Separar los límites

```python
try:
    requests.get(BASE + "/slow", timeout=(2, 0.05))
except requests.exceptions.ReadTimeout:
    print("Lectura lenta")
```

Durante streaming algunos fallos de lectura aparecen como ConnectionError.

**Resultado esperado** Lectura lenta.

### raise_for_status y HTTPError

**Clave** `http-error`

**Definición** raise_for_status no devuelve los datos: lanza HTTPError si la respuesta es 4xx o 5xx.

**Búsqueda** raise for status, HTTPError

**Para recordar** Llama al método antes de procesar los datos.

#### Rechazar un error del servidor

```python
try:
    r = requests.get(BASE + "/status/503", timeout=5)
    r.raise_for_status()
except requests.exceptions.HTTPError as e:
    print(e.response.status_code)
```

Llama al método antes de procesar los datos.

**Resultado esperado** 503.

### ConnectionError

**Clave** `connection-error`

**Definición** Representa problemas de conexión, por ejemplo conexión rechazada o resolución fallida.

**Búsqueda** connection error, red

**Para recordar** Distingue fallo de red de respuesta HTTP.

**Nota** Mock: prueba sin tráfico real.

#### Simular una conexión rechazada

```python
from unittest.mock import patch
with patch("requests.get", side_effect=requests.exceptions.ConnectionError):
    try:
        requests.get(BASE, timeout=5)
    except requests.exceptions.ConnectionError:
        print("Sin conexión")
```

Distingue fallo de red de respuesta HTTP.

**Resultado esperado** Sin conexión.

### JSONDecodeError

**Clave** `json-decode-error`

**Definición** Se produce cuando el cuerpo no se puede interpretar como JSON.

**Búsqueda** JSON inválido, respuesta vacía

**Para recordar** Un 200 también puede traer texto o HTML.

#### Capturar un formato incorrecto

```python
r = requests.get(BASE + "/text", timeout=5)
try:
    r.json()
except requests.exceptions.JSONDecodeError:
    print("No es JSON")
```

Un 200 también puede traer texto o HTML.

**Resultado esperado** No es JSON.

### TooManyRedirects

**Clave** `too-many-redirects`

**Definición** Se lanza cuando una petición supera el máximo de redirecciones.

**Búsqueda** redirect loop, max_redirects

**Para recordar** Configura el límite en Session.max_redirects.

#### Detener un ciclo de redirecciones

```python
with requests.Session() as s:
    s.max_redirects = 2
    try:
        s.get(BASE + "/loop", timeout=5)
    except requests.exceptions.TooManyRedirects:
        print("Ciclo detectado")
```

Configura el límite en Session.max_redirects.

**Resultado esperado** Ciclo detectado.

### SSLError, ProxyError e InvalidURL

**Clave** `otros-errores`

**Definición** SSLError y ProxyError identifican problemas TLS y de proxy; InvalidURL indica una URL no válida.

**Búsqueda** SSL error, proxy error, invalid URL

**Para recordar** No desactives seguridad para silenciar el error.

#### Probar el manejo de URL inválida

```python
try:
    requests.get("http://", timeout=5)
except requests.exceptions.InvalidURL:
    print("URL inválida")
```

No desactives seguridad para silenciar el error.

**Resultado esperado** URL inválida.

### RequestException y finally

**Clave** `request-exception`

**Definición** RequestException es la base de las excepciones propias de Requests. Captura primero los tipos específicos. finally se ejecuta al salir del bloque.

**Búsqueda** try except finally, excepción general

**Para recordar** No ocultes errores ni devuelvas datos vacíos como si fueran correctos.

#### Manejar un fallo sin perder la causa

```python
try:
    r = requests.get(BASE + "/status/500", timeout=5)
    r.raise_for_status()
except requests.exceptions.RequestException as e:
    print(type(e).__name__)
finally:
    print("Fin")
```

No ocultes errores ni devuelvas datos vacíos como si fueran correctos.

**Resultado esperado** HTTPError y Fin, en líneas separadas.

## Autenticación y credenciales

**Clave** `autenticacion`

### Definición

**Clave** `definicion`

**Definición** La autenticación acredita quién realiza la petición. La API especifica si necesita una clave, usuario o token.

**Búsqueda** auth, token, API key

**Para recordar** No envíes credenciales reales a servicios de prueba.

#### Consultar un recurso protegido

```python
r = requests.get(BASE + "/private", headers={"X-API-Key": "demo-key"}, timeout=5)
print(r.json()["access"])
```

No envíes credenciales reales a servicios de prueba.

**Resultado esperado** True.

### API Key

**Clave** `api-key`

**Definición** Una clave de API puede viajar en un encabezado o parámetro según el contrato. Prefiere encabezados cuando estén disponibles.

**Búsqueda** X-API-Key, clave API

**Para recordar** Una clave en URL puede terminar en logs.

#### Enviar una clave de prueba

```python
r = requests.get(BASE + "/private", headers={"X-API-Key": "demo-key"}, timeout=5)
print(r.status_code)
```

Una clave en URL puede terminar en logs.

**Resultado esperado** 200.

### Bearer Token

**Clave** `bearer`

**Definición** El encabezado Authorization: Bearer transporta un token de acceso.

**Búsqueda** authorization bearer token

**Para recordar** No registres ni publiques tokens.

#### Autenticar con un token

```python
r = requests.get(BASE + "/private", headers={"Authorization": "Bearer demo-token"}, timeout=5)
print(r.status_code)
```

No registres ni publiques tokens.

**Resultado esperado** 200.

### Basic Auth y HTTPBasicAuth

**Clave** `basic-auth`

**Definición** Basic Auth transmite usuario y contraseña codificados en base64. Requests acepta una tupla o HTTPBasicAuth.

**Búsqueda** auth tuple, basic auth

**Para recordar** Base64 no cifra; requiere HTTPS en producción.

#### Acceder con usuario y contraseña

```python
from requests.auth import HTTPBasicAuth
r = requests.get(BASE + "/private", auth=HTTPBasicAuth("demo", "secret"), timeout=5)
print(r.status_code)
```

Base64 no cifra; requiere HTTPS en producción.

**Resultado esperado** 200. auth=("demo", "secret") es equivalente en este caso.

### HTTPDigestAuth

**Clave** `digest-auth`

**Definición** Digest usa un reto del servidor para construir la autenticación. Requests dispone de HTTPDigestAuth.

**Búsqueda** digest, auth challenge

**Para recordar** Requiere un servidor compatible; no es Basic Auth.

**Nota** La demo no implementa el reto Digest.

#### Configurar autenticación Digest

```python
from requests.auth import HTTPDigestAuth
auth = HTTPDigestAuth("demo", "secret")
print(type(auth).__name__)
```

Requiere un servidor compatible; no es Basic Auth.

**Resultado esperado** HTTPDigestAuth; no hay envío.

### OAuth 2.0 y refresh token

**Clave** `oauth`

**Definición** OAuth 2.0 permite obtener tokens de acceso según un flujo autorizado. Requests puede enviarlos, pero no gestiona por sí solo todo el flujo.

**Búsqueda** OAuth2, access token, refresh token

**Para recordar** Renueva el token siguiendo el proveedor; no inventes endpoints ni scopes.

**Nota** Para flujos reales consulta la documentación del proveedor y, si procede, requests-oauthlib.

#### Preparar el uso de un access token

```python
token = "demo-token"
r = requests.get(BASE + "/private", headers={"Authorization": f"Bearer {token}"}, timeout=5)
print(r.status_code)
```

Renueva el token siguiendo el proveedor; no inventes endpoints ni scopes.

**Resultado esperado** 200; solo se simula el uso del token, no su emisión ni renovación.

### Variables de entorno

**Clave** `variables-entorno`

**Definición** Las variables de entorno permiten mantener claves fuera del código fuente.

**Búsqueda** os.environ, secretos

**Para recordar** No imprimas los secretos ni los guardes en Git.

#### Leer una clave configurada

```python
import os
from unittest.mock import patch
with patch.dict(os.environ, {"ORDERS_API_KEY": "demo-key"}):
    key = os.environ["ORDERS_API_KEY"]
    r = requests.get(BASE + "/private", headers={"X-API-Key": key}, timeout=5)
    print(r.status_code)
```

No imprimas los secretos ni los guardes en Git.

**Resultado esperado** 200. El valor ficticio se configura solo dentro del bloque.

### Autenticación personalizada y AuthBase

**Clave** `auth-base`

**Definición** Una subclase de AuthBase modifica la petición preparada para implementar un esquema de autenticación.

**Búsqueda** custom auth, AuthBase

**Para recordar** Usa esquemas oficiales y no implementes criptografía improvisada.

#### Añadir automáticamente una clave

```python
class ApiKey(requests.auth.AuthBase):
    def __call__(self, request):
        request.headers["X-API-Key"] = "demo-key"
        return request
r = requests.get(BASE + "/private", auth=ApiKey(), timeout=5)
print(r.status_code)
```

Usa esquemas oficiales y no implementes criptografía improvisada.

**Resultado esperado** 200.

## Cookies y sesiones

**Clave** `sesiones`

### Definición

**Clave** `definicion`

**Definición** Session conserva configuración y cookies entre peticiones, y reutiliza conexiones HTTP cuando es posible.

**Búsqueda** Session, sesión, connection pooling

**Para recordar** Usa with para cerrar la sesión al terminar.

#### Conservar una cookie entre peticiones

```python
with requests.Session() as s:
    s.get(BASE + "/login", timeout=5)
    r = s.get(BASE + "/cookie", timeout=5)
    print(r.json()["cookie"])
```

Usa with para cerrar la sesión al terminar.

**Resultado esperado** sid=demo.

### cookies y RequestsCookieJar

**Clave** `cookie-jar`

**Definición** cookies permite enviar cookies; RequestsCookieJar conserva nombre, valor y restricciones de dominio y ruta.

**Búsqueda** cookies, cookiejar

**Para recordar** Una cookie de sesión puede ser una credencial.

#### Enviar una cookie manualmente

```python
jar = requests.cookies.RequestsCookieJar()
jar.set("sid", "demo", domain="127.0.0.1", path="/")
r = requests.get(BASE + "/cookie", cookies=jar, timeout=5)
print(r.json()["cookie"])
```

Una cookie de sesión puede ser una credencial.

**Resultado esperado** sid=demo.

### Session.headers y Session.auth

**Clave** `configuracion-sesion`

**Definición** Los encabezados y autenticación de Session se aplican a sus peticiones; las opciones por llamada pueden reemplazarlos.

**Búsqueda** session headers, session auth

**Para recordar** Evita compartir una sesión con credenciales entre dominios no relacionados.

#### Reutilizar autenticación

```python
with requests.Session() as s:
    s.auth = ("demo", "secret")
    s.headers.update({"X-Client": "analyst"})
    print(s.get(BASE + "/private", timeout=5).status_code)
```

Evita compartir una sesión con credenciales entre dominios no relacionados.

**Resultado esperado** 200.

### Session.params y métodos

**Clave** `session-params`

**Definición** Session permite configurar parámetros predeterminados y usar get, post, put y demás métodos.

**Búsqueda** session params, session.post

**Para recordar** No existe un timeout predeterminado configurable simplemente asignando s.timeout.

#### Reutilizar el tamaño de página

```python
with requests.Session() as s:
    s.params = {"limit": 1}
    print(len(s.get(BASE + "/orders", timeout=5).json()["data"]))
```

No existe un timeout predeterminado configurable simplemente asignando s.timeout.

**Resultado esperado** 1.

### Connection pooling y keep-alive

**Clave** `pooling`

**Definición** La sesión puede reutilizar conexiones persistentes al mismo host, reduciendo el coste de abrir nuevas conexiones.

**Búsqueda** pool, keep alive

**Para recordar** Consume el cuerpo o cierra la respuesta para liberar recursos.

#### Consultar dos pedidos en una sesión

```python
with requests.Session() as s:
    for i in (101, 102):
        print(s.get(f"{BASE}/orders/{i}", timeout=5).json()["id"])
```

Consume el cuerpo o cierra la respuesta para liberar recursos.

**Resultado esperado** 101 y 102. La reutilización efectiva depende del servidor y transporte.

### close y context manager

**Clave** `close`

**Definición** Session.close libera sus adaptadores y pools. El bloque with lo ejecuta al salir, incluso ante excepciones.

**Búsqueda** session.close, with

**Para recordar** Cierra también las respuestas en streaming.

#### Cerrar automáticamente la sesión

```python
with requests.Session() as s:
    r = s.get(BASE + "/orders/101", timeout=5)
print(r.json()["id"])
```

Cierra también las respuestas en streaming.

**Resultado esperado** 101; la respuesta ya descargada sigue disponible.

## Paginación

**Clave** `paginacion`

### Definición

**Clave** `definicion`

**Definición** Una API paginada devuelve solo una parte de los registros por petición. Hay que recorrer las páginas hasta cumplir la condición final.

**Búsqueda** pagination, next, offset, cursor

**Para recordar** No confundas el número de registros recibidos con el total.

#### Comparar tamaño y total

```python
r = requests.get(BASE + "/orders", timeout=5).json()
print(len(r["data"]), r["total"])
```

No confundas el número de registros recibidos con el total.

**Resultado esperado** 2 4.

### Page y per_page

**Clave** `page`

**Definición** La paginación por página incrementa un número y usa un tamaño de página definido por la API.

**Búsqueda** page, per_page, páginas

**Para recordar** Empieza en 0 o 1 según el contrato.

#### Recorrer todas las páginas

```python
rows = []
for page in range(1, 10):
    r = requests.get(BASE + "/orders", params={"page": page, "per_page": 2}, timeout=5)
    r.raise_for_status()
    payload = r.json()
    rows.extend(payload["data"])
    if not payload["next"]:
        break
else:
    raise RuntimeError("Límite de páginas")
print([x["id"] for x in rows])
```

Empieza en 0 o 1 según el contrato.

**Resultado esperado** [101, 102, 103, 104].

### Limit y offset

**Clave** `offset`

**Definición** limit controla el tamaño y offset cuántos registros saltar. El servidor debe ofrecer un orden estable.

**Búsqueda** limit offset, desplazamiento

**Para recordar** Las inserciones concurrentes pueden provocar omisiones o duplicados.

#### Avanzar por desplazamiento

```python
rows = []
for offset in range(0, 20, 2):
    r = requests.get(BASE + "/orders", params={"limit": 2, "offset": offset}, timeout=5)
    r.raise_for_status()
    payload = r.json()
    rows.extend(payload["data"])
    if not payload["next"]:
        break
else:
    raise RuntimeError("Límite de páginas")
print(len(rows))
```

Las inserciones concurrentes pueden provocar omisiones o duplicados.

**Resultado esperado** 4.

### Cursor

**Clave** `cursor`

**Definición** Un cursor identifica la posición siguiente según el servidor. Puede ser un token opaco, no un número que deba incrementarse.

**Búsqueda** cursor-based, next_cursor

**Para recordar** Reenvía el cursor recibido sin modificarlo.

#### Avanzar mediante cursor

```python
cursor = None
rows = []
for _ in range(10):
    r = requests.get(BASE + "/orders", params={"limit": 2, "cursor": cursor}, timeout=5)
    r.raise_for_status()
    payload = r.json()
    rows.extend(payload["data"])
    cursor = payload["next_cursor"]
    if cursor is None:
        break
else:
    raise RuntimeError("Límite de páginas")
print(len(rows))
```

Reenvía el cursor recibido sin modificarlo.

**Resultado esperado** 4.

### Next URL y Link

**Clave** `next-url`

**Definición** Algunas APIs entregan la ruta siguiente en el JSON o en el encabezado Link. urljoin resuelve rutas relativas.

**Búsqueda** next URL, response.links

**Para recordar** Valida el destino antes de reenviar credenciales.

#### Seguir enlaces del encabezado

```python
from urllib.parse import urljoin, urlsplit
url = BASE + "/orders"
rows = []
for _ in range(10):
    r = requests.get(url, timeout=5)
    r.raise_for_status()
    rows.extend(r.json()["data"])
    nxt = r.links.get("next", {}).get("url")
    if not nxt:
        break
    url = urljoin(r.url, nxt)
    if urlsplit(url).netloc != urlsplit(BASE).netloc or urlsplit(url).scheme != urlsplit(BASE).scheme:
        raise ValueError("Destino inesperado")
else:
    raise RuntimeError("Límite de páginas")
print(len(rows))
```

Valida el destino antes de reenviar credenciales.

**Resultado esperado** 4.

### Terminación y deduplicación

**Clave** `terminacion`

**Definición** La extracción debe detectar el final y limitar ciclos; deduplicar por ID evita repetir registros, pero no recupera los omitidos.

**Búsqueda** stop condition, duplicados, ciclos

**Para recordar** Un límite alcanzado sin terminar debe informarse como fallo o extracción parcial.

#### Eliminar un registro repetido

```python
r = requests.get(BASE + "/orders", params={"limit": 10}, timeout=5)
r.raise_for_status()
rows = r.json()["data"]
unique = {x["id"]: x for x in rows + rows[:1]}
print(len(unique))
```

Un límite alcanzado sin terminar debe informarse como fallo o extracción parcial.

**Resultado esperado** 4 registros únicos de 5 entradas.

## Reintentos y rate limits

**Clave** `reintentos`

### Definición

**Clave** `definicion`

**Definición** Un reintento repite una petición tras un fallo transitorio. El límite de peticiones exige controlar frecuencia, esperas y número de intentos.

**Búsqueda** retry, rate limiting, API quota

**Para recordar** No reintentes cualquier error ni indefinidamente.

#### Recuperarse de un 503 con un reintento

```python
r = requests.get(BASE + "/flaky", params={"key": "manual"}, timeout=5)
if r.status_code == 503:
    r = requests.get(BASE + "/flaky", params={"key": "manual"}, timeout=5)
r.raise_for_status()
print(r.status_code)
```

No reintentes cualquier error ni indefinidamente.

**Resultado esperado** 200; en un servidor recién iniciado el primer intento devuelve 503.

### Retry-After y sleep

**Clave** `retry-after`

**Definición** Retry-After expresa una espera en segundos o una fecha HTTP. time.sleep permite pausar antes de repetir.

**Búsqueda** 429, sleep, HTTP date

**Para recordar** Si la espera excede el presupuesto, detén o pospón la tarea.

**Nota** En producción contempla fechas HTTP con email.utils.parsedate_to_datetime.

#### Interpretar la espera de la demo

```python
import time
r = requests.get(BASE + "/status/429", timeout=5)
wait = int(r.headers["Retry-After"])
time.sleep(wait)
print(wait)
```

Si la espera excede el presupuesto, detén o pospón la tarea.

**Resultado esperado** 0 segundos; el ejemplo no repite el endpoint que siempre devuelve 429.

### HTTPAdapter y urllib3.Retry

**Clave** `http-adapter`

**Definición** HTTPAdapter configura el transporte de una sesión. Retry, de urllib3, define las condiciones de reintento automático.

**Búsqueda** adapter, mount, urllib3 Retry

**Para recordar** Requests no reintenta códigos HTTP de forma predeterminada.

#### Recuperar un GET transitorio

```python
from requests.adapters import HTTPAdapter
from urllib3.util import Retry
retry = Retry(total=2, status_forcelist=[503], allowed_methods={"GET"})
with requests.Session() as s:
    s.mount(BASE, HTTPAdapter(max_retries=retry))
    r = s.get(BASE + "/flaky", params={"key": "adapter"}, timeout=5)
    r.raise_for_status()
    print(r.status_code)
```

Requests no reintenta códigos HTTP de forma predeterminada.

**Resultado esperado** 200; el adaptador repite el primer 503 si la clave es nueva.

### total, connect, read y status

**Clave** `retry-budgets`

**Definición** Retry permite límites globales y por tipo de fallo. El límite total restringe el conjunto de reintentos.

**Búsqueda** retry total connect read status other

**Para recordar** total=2 permite hasta dos reintentos además del intento inicial.

#### Configurar presupuestos

```python
from urllib3.util import Retry
retry = Retry(total=3, connect=2, read=1, status=2, other=0)
print(retry.total, retry.connect, retry.read, retry.status)
```

total=2 permite hasta dos reintentos además del intento inicial.

**Resultado esperado** 3 2 1 2. Solo se configura el objeto.

### allowed_methods y status_forcelist

**Clave** `retry-conditions`

**Definición** allowed_methods limita métodos que pueden reintentarse según el tipo de fallo; status_forcelist indica códigos HTTP elegidos.

**Búsqueda** retry GET, status forcelist

**Para recordar** Una escritura puede haberse aplicado aunque el cliente no reciba respuesta.

#### Seleccionar métodos y estados

```python
from urllib3.util import Retry
retry = Retry(total=3, allowed_methods={"GET", "HEAD"}, status_forcelist=[429, 502, 503, 504])
print("POST" in retry.allowed_methods, 503 in retry.status_forcelist)
```

Una escritura puede haberse aplicado aunque el cliente no reciba respuesta.

**Resultado esperado** False True.

### Backoff y jitter

**Clave** `backoff`

**Definición** El backoff exponencial aumenta la espera tras fallos consecutivos; jitter introduce variación para evitar reintentos simultáneos.

**Búsqueda** backoff_factor, backoff_max, backoff_jitter

**Para recordar** Acota la espera y los intentos.

#### Configurar esperas progresivas

```python
from urllib3.util import Retry
retry = Retry(total=3, backoff_factor=0.5, backoff_max=8, backoff_jitter=0.2, respect_retry_after_header=True)
print(retry.backoff_factor, retry.backoff_max)
```

Acota la espera y los intentos.

**Resultado esperado** 0.5 8. No se ejecuta ninguna espera.

### Agotamiento de reintentos

**Clave** `retry-exhausted`

**Definición** Cuando se agotan reintentos por estado HTTP, el adaptador puede lanzar RetryError; con raise_on_status=False entrega la última respuesta.

**Búsqueda** RetryError, raise_on_status

**Para recordar** Comprueba siempre el estado final.

#### Obtener el último 503

```python
from requests.adapters import HTTPAdapter
from urllib3.util import Retry
with requests.Session() as s:
    retry = Retry(total=1, status_forcelist=[503], raise_on_status=False)
    s.mount(BASE, HTTPAdapter(max_retries=retry))
    r = s.get(BASE + "/status/503", timeout=5)
    print(r.status_code)
```

Comprueba siempre el estado final.

**Resultado esperado** 503 después de dos intentos.

## Archivos y streaming

**Clave** `archivos-y-streaming`

### Definición

**Clave** `definicion`

**Definición** Requests descarga el cuerpo completo por defecto. stream=True permite consumirlo progresivamente y controlar el uso de memoria.

**Búsqueda** stream, download, archivos

**Para recordar** Cierra una respuesta de streaming aunque no consumas todo.

#### Descargar por fragmentos

```python
with requests.get(BASE + "/csv", stream=True, timeout=5) as r:
    r.raise_for_status()
    data = b"".join(r.iter_content(chunk_size=8))
print(data.decode().splitlines()[0])
```

Cierra una respuesta de streaming aunque no consumas todo.

**Resultado esperado** id,amount. Para archivos grandes escribe los fragmentos en disco en vez de unirlos.

### Guardar bytes en disco

**Clave** `guardar-archivo`

**Definición** content contiene bytes que pueden guardarse con write_bytes o open en modo wb.

**Búsqueda** descargar CSV Excel PDF, wb

**Para recordar** Comprueba el estado antes de escribir; el nombre local lo eliges tú.

#### Guardar un CSV en una carpeta temporal

```python
from pathlib import Path
from tempfile import TemporaryDirectory
r = requests.get(BASE + "/csv", timeout=5)
r.raise_for_status()
with TemporaryDirectory() as folder:
    path = Path(folder) / "orders.csv"
    path.write_bytes(r.content)
    print(path.read_text().splitlines()[0])
```

Comprueba el estado antes de escribir; el nombre local lo eliges tú.

**Resultado esperado** id,amount; el archivo temporal se elimina al salir.

### iter_content y chunk_size

**Clave** `iter-content`

**Definición** iter_content produce fragmentos de bytes; chunk_size indica el tamaño de lectura solicitado, no garantiza que cada fragmento tenga ese tamaño.

**Búsqueda** chunks, streaming, memoria

**Para recordar** Usa with y escribe cada fragmento no vacío.

#### Guardar por bloques

```python
from tempfile import TemporaryFile
with requests.get(BASE + "/csv", stream=True, timeout=5) as r, TemporaryFile() as f:
    r.raise_for_status()
    for chunk in r.iter_content(chunk_size=8):
        if chunk:
            f.write(chunk)
    print(f.tell())
```

Usa with y escribe cada fragmento no vacío.

**Resultado esperado** 26 bytes.

### iter_lines y decode_unicode

**Clave** `iter-lines`

**Definición** iter_lines separa líneas del flujo. decode_unicode=True devuelve texto si está definida una codificación.

**Búsqueda** NDJSON, streaming API, líneas

**Para recordar** No invoques iter_lines varias veces sobre el mismo flujo.

#### Procesar registros NDJSON

```python
import json
with requests.get(BASE + "/lines", stream=True, timeout=5) as r:
    r.raise_for_status()
    r.encoding = "utf-8"
    for line in r.iter_lines(decode_unicode=True):
        if line:
            print(json.loads(line)["id"])
```

No invoques iter_lines varias veces sobre el mismo flujo.

**Resultado esperado** 101 y 102, en líneas separadas.

### raw y close

**Clave** `raw`

**Definición** raw expone el objeto de transporte subyacente; para leer bytes originales usa stream=True y evita la decodificación automática.

**Búsqueda** response.raw, response.close

**Para recordar** No mezcles lecturas del mismo flujo sin comprender su posición.

#### Leer cabecera gzip original

```python
with requests.get(BASE + "/gzip", stream=True, timeout=5) as r:
    r.raise_for_status()
    print(r.raw.read(2).hex())
```

No mezcles lecturas del mismo flujo sin comprender su posición.

**Resultado esperado** 1f8b, firma gzip.

### Content-Length y Content-Disposition

**Clave** `metadatos-archivo`

**Definición** Content-Length indica longitud declarada del mensaje si existe; Content-Disposition puede sugerir un nombre de archivo.

**Búsqueda** tamaño, filename, attachment

**Para recordar** No confíes en rutas o nombres proporcionados por un servidor.

#### Consultar metadatos sin descargar

```python
r = requests.head(BASE + "/csv", timeout=5)
print(r.headers["Content-Disposition"], len(r.content))
```

No confíes en rutas o nombres proporcionados por un servidor.

**Resultado esperado** attachment; filename="orders.csv" y 0 bytes de cuerpo.

### Streaming de subida

**Clave** `stream-upload`

**Definición** data acepta un archivo abierto para transmitirlo sin cargar todo su contenido. Un iterador sin longitud conocida puede usar transferencia chunked.

**Búsqueda** upload stream, chunked transfer

**Para recordar** Abre archivos en modo binario; el servidor debe aceptar el formato.

**Nota** La demo admite Content-Length, no transferencias de subida chunked. Para multipart streaming suele usarse requests-toolbelt.

#### Enviar un flujo de longitud conocida

```python
from tempfile import TemporaryFile
with TemporaryFile() as f:
    f.write(b"id,amount\n101,800\n")
    f.seek(0)
    r = requests.post(BASE + "/echo", data=f, headers={"Content-Type": "text/csv"}, timeout=5)
    print(r.json()["body"].splitlines()[0])
```

Abre archivos en modo binario; el servidor debe aceptar el formato.

**Resultado esperado** id,amount.

## Peticiones preparadas y transporte

**Clave** `transporte`

### Definición

**Clave** `definicion`

**Definición** Request describe una petición; PreparedRequest contiene su representación lista para enviar. Session.send ejecuta esa petición preparada.

**Búsqueda** Request, PreparedRequest, send

**Para recordar** Preparar no equivale a enviar.

#### Inspeccionar una petición sin tráfico

```python
p = requests.Request("GET", BASE + "/orders", params={"limit": 1}).prepare()
print(p.method, p.url)
```

Preparar no equivale a enviar.

**Resultado esperado** GET http://127.0.0.1:8765/orders?limit=1.

### Session.prepare_request y send

**Clave** `prepare-send`

**Definición** prepare_request incorpora los ajustes de la sesión. send transmite el objeto preparado.

**Búsqueda** session.prepare_request, session.send

**Para recordar** Para flujo preparado manualmente incorpora también la configuración del entorno si corresponde.

#### Enviar una petición preparada

```python
with requests.Session() as s:
    req = requests.Request("GET", BASE + "/orders/101")
    p = s.prepare_request(req)
    settings = s.merge_environment_settings(p.url, {}, None, None, None)
    r = s.send(p, timeout=5, **settings)
    print(r.json()["id"])
```

Para flujo preparado manualmente incorpora también la configuración del entorno si corresponde.

**Resultado esperado** 101.

### mount y tamaño del pool

**Clave** `mount-pool`

**Definición** mount selecciona un adaptador por prefijo de URL. pool_connections controla pools conservados, pool_maxsize conexiones conservadas por pool, pool_block la espera cuando se agotan.

**Búsqueda** mount, pool_connections, pool_maxsize, pool_block

**Para recordar** pool_maxsize no limita conexiones simultáneas si pool_block=False.

#### Configurar un pool

```python
from requests.adapters import HTTPAdapter
with requests.Session() as s:
    adapter = HTTPAdapter(pool_connections=4, pool_maxsize=8, pool_block=True)
    s.mount(BASE, adapter)
    print(s.get_adapter(BASE + "/orders") is adapter)
```

pool_maxsize no limita conexiones simultáneas si pool_block=False.

**Resultado esperado** True.

### Event hooks

**Clave** `hooks`

**Definición** Un hook response ejecuta una función al recibir la respuesta. Puede inspeccionarla o transformarla.

**Búsqueda** hooks, response hook

**Para recordar** Evita registrar cuerpos o encabezados sensibles.

#### Registrar códigos recibidos

```python
def report(r, *args, **kwargs):
    print(r.status_code)
with requests.Session() as s:
    s.hooks["response"].append(report)
    s.get(BASE + "/orders/101", timeout=5)
```

Evita registrar cuerpos o encabezados sensibles.

**Resultado esperado** 200.

## Seguridad y entorno

**Clave** `seguridad-entorno`

### Definición

**Clave** `definicion`

**Definición** Requests puede usar certificados, proxies y credenciales configurados por el entorno. Estas opciones afectan cómo se establece la conexión.

**Búsqueda** TLS, verify, proxy, trust_env

**Para recordar** Mantén la verificación TLS activada en producción.

#### Consultar la configuración segura

```python
with requests.Session() as s:
    print(s.verify, s.trust_env)
```

Mantén la verificación TLS activada en producción.

**Resultado esperado** True True.

### verify, CA bundles y certifi

**Clave** `verify`

**Definición** verify=True valida certificados y nombre del servidor en HTTPS; verify también acepta la ruta de un bundle de autoridades de confianza.

**Búsqueda** verify, certifi, CA bundle

**Para recordar** verify=False desactiva la validación y permite ataques de intermediario.

**Nota** REQUESTS_CA_BUNDLE puede seleccionar otro bundle; CURL_CA_BUNDLE es alternativa cuando corresponde.

#### Consultar el bundle predeterminado

```python
from pathlib import Path
print(Path(requests.certs.where()).is_file())
```

verify=False desactiva la validación y permite ataques de intermediario.

**Resultado esperado** True en una instalación normal; no se realiza una conexión TLS.

### cert y mTLS

**Clave** `cert`

**Definición** cert permite indicar un certificado de cliente y, si corresponde, una clave privada para autenticación mutua TLS.

**Búsqueda** cert, mTLS, client certificate

**Para recordar** cert autentica al cliente; verify verifica al servidor.

**Nota** Para enviar realmente se requieren archivos válidos y un servidor HTTPS compatible. Requests no admite claves privadas cifradas en este parámetro.

#### Configurar rutas de certificados

```python
with requests.Session() as s:
    s.cert = ("cliente.pem", "cliente-key.pem")
    print(s.cert)
```

cert autentica al cliente; verify verifica al servidor.

**Resultado esperado** ('cliente.pem', 'cliente-key.pem'); solo configuración.

### proxies y variables del entorno

**Clave** `proxies`

**Definición** proxies permite configurar intermediarios por esquema. HTTP_PROXY, HTTPS_PROXY, ALL_PROXY y NO_PROXY pueden influir en la selección.

**Búsqueda** proxy, HTTP_PROXY, NO_PROXY

**Para recordar** No envíes secretos a proxies no confiables.

**Nota** Para usarlo debe existir un proxy autorizado en esa dirección. Las variables de entorno pueden prevalecer sobre Session.proxies.

#### Preparar una configuración de proxy

```python
proxies = {"https": "http://127.0.0.1:3128"}
with requests.Session() as s:
    s.proxies.update(proxies)
    print(s.proxies["https"])
```

No envíes secretos a proxies no confiables.

**Resultado esperado** http://127.0.0.1:3128; no se realiza una petición.

### trust_env y .netrc

**Clave** `trust-env`

**Definición** trust_env controla el uso de configuraciones del entorno, incluidos proxies, certificados CA de entorno y autenticación netrc.

**Búsqueda** trust_env, netrc, configuración externa

**Para recordar** Desactivarlo cambia más que el proxy; hazlo solo de forma deliberada.

#### Aislar una sesión local del entorno

```python
with requests.Session() as s:
    s.trust_env = False
    print(s.get(BASE + "/orders/101", timeout=5).status_code)
```

Desactivarlo cambia más que el proxy; hazlo solo de forma deliberada.

**Resultado esperado** 200.

## Pruebas y depuración

**Clave** `pruebas`

### Definición

**Clave** `definicion`

**Definición** Las pruebas con mocks sustituyen la comunicación real para verificar el comportamiento de una función. La depuración inspecciona la petición y respuesta.

**Búsqueda** mock, testing, debugging

**Para recordar** Una prueba simulada no confirma disponibilidad de una API real.

#### Simular un estado HTTP

```python
from unittest.mock import patch
with patch("requests.get") as get:
    get.return_value.status_code = 200
    print(requests.get(BASE, timeout=5).status_code)
```

Una prueba simulada no confirma disponibilidad de una API real.

**Resultado esperado** 200; sin tráfico.

### Inspeccionar la petición

**Clave** `debug-request`

**Definición** response.request permite ver método, URL, encabezados y cuerpo que se prepararon para el envío.

**Búsqueda** request.method, request.body, request.headers

**Para recordar** Redacta credenciales antes de mostrar información.

#### Comprobar el cuerpo enviado

```python
r = requests.post(BASE + "/echo", json={"amount": 500}, timeout=5)
print(r.request.method, r.request.body)
```

Redacta credenciales antes de mostrar información.

**Resultado esperado** POST b'{"amount": 500}'.

### Logging

**Clave** `logging`

**Definición** logging registra eventos operativos como estado, duración y errores sin necesidad de imprimir datos completos.

**Búsqueda** logging, observabilidad

**Para recordar** No registres tokens, cookies ni URLs con secretos.

#### Registrar un estado HTTP

```python
import logging
logging.basicConfig(level=logging.INFO)
r = requests.get(BASE + "/orders/101", timeout=5)
logging.getLogger("extract").info("HTTP %s", r.status_code)
```

No registres tokens, cookies ni URLs con secretos.

**Resultado esperado** Un mensaje de nivel INFO con HTTP 200, si el nivel está habilitado.

### Mock de respuesta y excepciones

**Clave** `mock-response`

**Definición** unittest.mock permite devolver valores controlados o lanzar excepciones para probar rutas de éxito y fallo.

**Búsqueda** patch, side_effect, mock response

**Para recordar** Parchea donde el código busca el objeto.

#### Probar un timeout sin red

```python
from unittest.mock import patch
with patch("requests.get", side_effect=requests.exceptions.Timeout):
    try:
        requests.get(BASE, timeout=5)
    except requests.exceptions.Timeout:
        print("Revisar timeout")
```

Parchea donde el código busca el objeto.

**Resultado esperado** Revisar timeout.

### requests-mock y responses

**Clave** `librerias-mock`

**Definición** Estas bibliotecas externas interceptan peticiones Requests y permiten simular respuestas con URL, código y contenido definidos.

**Búsqueda** requests-mock, responses

**Para recordar** No son dependencias obligatorias de Requests.

**Nota** Instala requests-mock para este ejemplo. responses es otra opción equivalente de propósito.

#### Simular una API con requests-mock

```python
import requests_mock
with requests_mock.Mocker() as m:
    m.get(BASE + "/orders/101", json={"id": 101})
    print(requests.get(BASE + "/orders/101", timeout=5).json())
```

No son dependencias obligatorias de Requests.

**Resultado esperado** {'id': 101}; sin servidor.

### pytest y asserts

**Clave** `pytest`

**Definición** pytest ejecuta funciones de prueba y muestra fallos de aserciones. También puedes usar assert en scripts sencillos.

**Búsqueda** pytest, assert, pruebas unitarias

**Para recordar** Comprueba contenido y errores, no solo el código HTTP.

#### Comprobar la estructura de un pedido

```python
from unittest.mock import patch
def test_order():
    with patch("requests.get") as get:
        get.return_value.json.return_value = {"id": 101}
        assert requests.get(BASE, timeout=5).json()["id"] == 101
test_order()
```

Comprueba contenido y errores, no solo el código HTTP.

**Resultado esperado** Sin excepción; para pytest, guarda como test_orders.py y ejecuta pytest.

## Transformación de respuestas

**Clave** `transformacion`

### Definición

**Clave** `definicion`

**Definición** Los datos de una respuesta deben convertirse y validarse antes del análisis. pandas permite construir tablas a partir de registros JSON o archivos.

**Búsqueda** pandas, DataFrame, JSON, ETL

**Para recordar** Verifica el estado y la estructura antes de transformar.

#### Obtener una tabla de pedidos

```python
import pandas as pd
r = requests.get(BASE + "/orders", params={"limit": 10}, timeout=5)
r.raise_for_status()
df = pd.DataFrame(r.json()["data"])
print(df.shape)
```

Verifica el estado y la estructura antes de transformar.

**Resultado esperado** (4, 5).

### Diccionarios, listas y JSON anidado

**Clave** `json-anidado`

**Definición** json() devuelve listas, diccionarios u otros tipos JSON convertidos a Python. Accede a los campos siguiendo la estructura.

**Búsqueda** JSON data, nested, listas

**Para recordar** Un objeto con data no es la lista de registros directamente.

#### Extraer ID y país

```python
r = requests.get(BASE + "/orders/101", timeout=5)
r.raise_for_status()
row = r.json()
print(row["id"], row["customer"]["country"])
```

Un objeto con data no es la lista de registros directamente.

**Resultado esperado** 101 MX.

### pd.DataFrame y json_normalize

**Clave** `json-normalize`

**Definición** DataFrame convierte registros en filas; json_normalize expande diccionarios anidados en columnas separadas.

**Búsqueda** pandas, flatten, normalizar JSON

**Para recordar** El nombre de las columnas depende de las claves y del separador.

#### Aplanar el cliente anidado

```python
import pandas as pd
r = requests.get(BASE + "/orders", params={"limit": 10}, timeout=5)
r.raise_for_status()
df = pd.json_normalize(r.json()["data"])
print(df.loc[0, ["id", "customer.country"]].tolist())
```

El nombre de las columnas depende de las claves y del separador.

**Resultado esperado** [101, 'MX'].

### BytesIO y read_csv

**Clave** `read-csv`

**Definición** BytesIO convierte bytes en un objeto de archivo en memoria que pandas puede leer.

**Búsqueda** BytesIO, read_csv, CSV

**Para recordar** No necesitas guardar el CSV si es pequeño y solo vas a analizarlo.

#### Leer un CSV descargado

```python
from io import BytesIO
import pandas as pd
r = requests.get(BASE + "/csv", timeout=5)
r.raise_for_status()
df = pd.read_csv(BytesIO(r.content))
print(df["amount"].sum())
```

No necesitas guardar el CSV si es pequeño y solo vas a analizarlo.

**Resultado esperado** 1100.

### Excel y otros binarios

**Clave** `read-excel`

**Definición** Los archivos Excel pueden leerse con pd.read_excel(BytesIO(response.content)) tras comprobar el estado y formato.

**Búsqueda** Excel, xlsx, BytesIO

**Para recordar** El cuerpo debe ser un archivo Excel válido; no basta un Content-Type declarado.

#### Reproducir una lectura de Excel en memoria

```python
from io import BytesIO
import pandas as pd
buf = BytesIO()
pd.DataFrame({"id": [101], "amount": [800]}).to_excel(buf, index=False, engine="openpyxl")
content = buf.getvalue()
print(pd.read_excel(BytesIO(content), engine="openpyxl")["amount"].iloc[0])
```

El cuerpo debe ser un archivo Excel válido; no basta un Content-Type declarado.

**Resultado esperado** 800. Se simulan los bytes descargados; requiere openpyxl.

### Validación de estructura

**Clave** `validacion`

**Definición** Antes de usar JSON, comprueba tipos y claves obligatorias. Una API puede devolver errores de negocio con HTTP 200.

**Búsqueda** schema validation, contrato, campos

**Para recordar** Una estructura distinta debe producir un error visible.

#### Verificar los registros recibidos

```python
r = requests.get(BASE + "/orders", timeout=5)
r.raise_for_status()
rows = r.json()["data"]
if not isinstance(rows, list) or not all(isinstance(x, dict) and {"id", "amount"} <= x.keys() for x in rows):
    raise ValueError("Esquema inesperado")
print(len(rows))
```

Una estructura distinta debe producir un error visible.

**Resultado esperado** 2.

### Limpieza y valores ausentes

**Clave** `limpieza`

**Definición** La limpieza convierte tipos, trata ausencias y elimina duplicados conforme a reglas de negocio.

**Búsqueda** missing, NaN, drop_duplicates

**Para recordar** No conviertas automáticamente un valor ausente a cero sin justificarlo.

#### Completar el país desconocido

```python
import pandas as pd
r = requests.get(BASE + "/orders", params={"limit": 10}, timeout=5)
r.raise_for_status()
df = pd.json_normalize(r.json()["data"])
df["customer.country"] = df["customer.country"].fillna("Unknown")
print(df.loc[df["id"] == 104, "customer.country"].iloc[0])
```

No conviertas automáticamente un valor ausente a cero sin justificarlo.

**Resultado esperado** Unknown.

### Exportar CSV, JSON, Excel y SQL

**Clave** `exportacion`

**Definición** El resultado limpio puede persistirse mediante to_csv, to_json, to_excel o to_sql, según el destino.

**Búsqueda** exportar, cargar datos, persistencia

**Para recordar** Conserva tipos, encoding y claves de identificación.

#### Exportar un resumen a CSV

```python
import pandas as pd
r = requests.get(BASE + "/orders", params={"limit": 10}, timeout=5)
r.raise_for_status()
df = pd.DataFrame(r.json()["data"])
print(df[["id", "amount"]].to_csv(index=False))
```

Conserva tipos, encoding y claves de identificación.

**Resultado esperado** CSV con encabezado id,amount y cuatro filas: 101,800; 102,300; 103,1200; 104,450. Sin escribir archivo.

## Extracción de datos y ETL

**Clave** `extraccion-etl`

### Definición

**Clave** `definicion`

**Definición** ETL extrae registros de una fuente, los transforma y los carga en un destino. Requests cubre principalmente la extracción HTTP.

**Búsqueda** ETL, API ingestion, automatización

**Para recordar** Una petición exitosa no garantiza una extracción completa.

#### Calcular ingresos completados

```python
r = requests.get(BASE + "/orders", params={"limit": 10, "status": "completed"}, timeout=5)
r.raise_for_status()
print(sum(x["amount"] for x in r.json()["data"]))
```

Una petición exitosa no garantiza una extracción completa.

**Resultado esperado** 2450; tres pedidos completados.

### Extracción completa e incremental

**Clave** `incremental`

**Definición** Una extracción completa recorre toda la fuente; una incremental solicita datos nuevos o actualizados desde un punto de control.

**Búsqueda** full load, incremental, since

**Para recordar** El parámetro de fecha depende de la API; pagina también la extracción incremental.

#### Solicitar pedidos desde una fecha

```python
r = requests.get(BASE + "/orders", params={"since": "2026-08-03", "limit": 10}, timeout=5)
r.raise_for_status()
print([x["id"] for x in r.json()["data"]])
```

El parámetro de fecha depende de la API; pagina también la extracción incremental.

**Resultado esperado** [103, 104].

### Watermarks y checkpoints

**Clave** `checkpoints`

**Definición** Un watermark identifica el último punto confirmado; un checkpoint permite reanudar la extracción tras un fallo.

**Búsqueda** checkpoint, watermark, updated_at

**Para recordar** Avanza el punto solo después de persistir datos; contempla empates y retrasos.

#### Calcular el siguiente watermark

```python
r = requests.get(BASE + "/orders", params={"limit": 10}, timeout=5)
r.raise_for_status()
rows = r.json()["data"]
watermark = max((x["updated_at"], x["id"]) for x in rows)
print(watermark)
```

Avanza el punto solo después de persistir datos; contempla empates y retrasos.

**Resultado esperado** ('2026-08-04', 104); todavía no se guarda el checkpoint.

### Batch processing y deduplicación

**Clave** `batch`

**Definición** Procesar por lotes acota el tamaño de cada operación. Una clave estable permite detectar o actualizar registros repetidos.

**Búsqueda** lotes, upsert, duplicados

**Para recordar** Deduplicar por ID requiere decidir qué versión conservar.

#### Procesar un lote repetido

```python
r = requests.get(BASE + "/orders", params={"limit": 2}, timeout=5)
r.raise_for_status()
batch = r.json()["data"]
store = {}
for rows in (batch, batch):
    store.update({x["id"]: x for x in rows})
print(len(store))
```

Deduplicar por ID requiere decidir qué versión conservar.

**Resultado esperado** 2 registros aunque el lote se procese dos veces; almacenamiento simulado en memoria.

### Schema drift y calidad

**Clave** `schema-drift`

**Definición** Schema drift es un cambio en campos o tipos respecto al contrato. Las comprobaciones de calidad detectan diferencias antes de cargar datos.

**Búsqueda** schema drift, calidad, validación

**Para recordar** Define columnas requeridas y reglas para cambios compatibles.

#### Detectar ausencia de una clave

```python
expected = {"id", "amount", "status"}
row = {"id": 101, "amount": 800}
print(sorted(expected - row.keys()))
```

Define columnas requeridas y reglas para cambios compatibles.

**Resultado esperado** ['status']; registro simulado incompleto.

### Caché y ETag

**Clave** `etag`

**Definición** ETag identifica una versión de una representación. If-None-Match permite comprobar si la copia local sigue vigente.

**Búsqueda** cache, ETag, If-None-Match

**Para recordar** Requests no mantiene por defecto una caché HTTP de respuestas.

#### Reutilizar datos si no cambiaron

```python
a = requests.get(BASE + "/versioned", timeout=5)
a.raise_for_status()
b = requests.get(BASE + "/versioned", headers={"If-None-Match": a.headers["ETag"]}, timeout=5)
b.raise_for_status()
print(b.status_code, a.json() if b.status_code == 304 else b.json())
```

Requests no mantiene por defecto una caché HTTP de respuestas.

**Resultado esperado** 304 {'version': 1}.

### Last-Modified

**Clave** `last-modified`

**Definición** Last-Modified indica cuándo se modificó una representación; If-Modified-Since permite una consulta condicional basada en esa fecha.

**Búsqueda** Last-Modified, If-Modified-Since

**Para recordar** Prefiere ETag si está disponible y el contrato lo admite.

#### Consultar cambios desde la última respuesta

```python
a = requests.get(BASE + "/versioned", timeout=5)
a.raise_for_status()
b = requests.get(BASE + "/versioned", headers={"If-Modified-Since": a.headers["Last-Modified"]}, timeout=5)
print(b.status_code)
```

Prefiere ETag si está disponible y el contrato lo admite.

**Resultado esperado** 304.

### Automatización y tareas periódicas

**Clave** `automatizacion`

**Definición** Requests puede integrarse en scripts programados mediante cron, Task Scheduler u otro orquestador. No incluye un planificador.

**Búsqueda** scheduler, extracción periódica, jobs

**Para recordar** Registra fallos, evita ejecuciones solapadas y define un presupuesto de reintentos.

#### Encapsular una extracción reutilizable

```python
def extract_orders():
    r = requests.get(BASE + "/orders", params={"limit": 10}, timeout=5)
    r.raise_for_status()
    return r.json()["data"]
print(len(extract_orders()))
```

Registra fallos, evita ejecuciones solapadas y define un presupuesto de reintentos.

**Resultado esperado** 4; solo se ejecuta una vez, no se programa ninguna tarea.

## Otros tipos de API

**Clave** `otros-tipos-api`

### Definición

**Clave** `definicion`

**Definición** Requests transporta mensajes HTTP independientemente de si la API usa REST, GraphQL, SOAP u otro contrato.

**Búsqueda** REST, GraphQL, SOAP, OpenAPI

**Para recordar** La biblioteca no interpreta automáticamente cada protocolo de aplicación.

#### Preparar una consulta REST

```python
p = requests.Request("GET", BASE + "/orders/101").prepare()
print(p.method, p.path_url)
```

La biblioteca no interpreta automáticamente cada protocolo de aplicación.

**Resultado esperado** GET /orders/101.

### OpenAPI, Swagger y versionado

**Clave** `openapi-versionado`

**Definición** OpenAPI describe rutas, métodos, parámetros, autenticación y esquemas. Las versiones pueden expresarse en ruta, encabezado u otra convención.

**Búsqueda** swagger, OpenAPI, v1, api version

**Para recordar** Consulta la versión y los campos documentados, no deduzcas el contrato.

#### Preparar una ruta versionada hipotética

```python
p = requests.Request("GET", "https://example.com/v1/orders", params={"limit": 2}).prepare()
print(p.path_url)
```

Consulta la versión y los campos documentados, no deduzcas el contrato.

**Resultado esperado** /v1/orders?limit=2; no se envía tráfico.

### GraphQL

**Clave** `graphql`

**Definición** GraphQL suele recibir una consulta y variables en un cuerpo JSON. Puede devolver errores de aplicación junto con HTTP 200.

**Búsqueda** GraphQL query variables errors

**Para recordar** Verifica también el campo errors de la respuesta.

**Nota** Necesita un endpoint GraphQL real con ese esquema para ejecutarse.

#### Preparar una consulta GraphQL hipotética

```python
p = requests.Request("POST", "https://example.com/graphql", json={"query": "query ($id: ID!) { order(id: $id) { amount } }", "variables": {"id": "101"}}).prepare()
print(p.headers["Content-Type"])
```

Verifica también el campo errors de la respuesta.

**Resultado esperado** application/json; solo se prepara el cuerpo.

### SOAP y XML

**Clave** `soap-xml`

**Definición** SOAP usa mensajes XML con una envoltura y reglas definidas por el servicio. Requests puede transmitirlos como bytes.

**Búsqueda** SOAP, XML, WSDL

**Para recordar** La versión SOAP determina encabezados y formato.

#### Preparar una envoltura SOAP 1.2

```python
body = b'<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope"><env:Body/></env:Envelope>'
p = requests.Request("POST", "https://example.com/soap", data=body, headers={"Content-Type": "application/soap+xml"}).prepare()
print(p.headers["Content-Type"])
```

La versión SOAP determina encabezados y formato.

**Resultado esperado** application/soap+xml; no se invoca una operación real.

### Webhooks

**Clave** `webhooks`

**Definición** Un webhook envía notificaciones HTTP a un receptor. Requests puede enviar una notificación, pero no es un servidor que escuche webhooks.

**Búsqueda** webhook, eventos, callback

**Para recordar** El receptor debe validar firmas y protegerse de reenvíos.

#### Enviar un evento a un receptor simulado

```python
r = requests.post(BASE + "/echo", json={"event": "order.completed", "id": 101}, timeout=5)
print(r.json()["body"]["event"])
```

El receptor debe validar firmas y protegerse de reenvíos.

**Resultado esperado** order.completed; el receptor demo devuelve el evento, no valida firmas.

## Concurrencia

**Clave** `concurrencia`

### Definición

**Clave** `definicion`

**Definición** Requests es síncrono y bloquea el hilo que realiza la petición. Para solicitudes independientes pueden usarse hilos, con límites de concurrencia.

**Búsqueda** síncrono, async, threads

**Para recordar** No confundas concurrencia con ausencia de límites de la API.

#### Consultar registros secuencialmente

```python
for i in (101, 103):
    r = requests.get(f"{BASE}/orders/{i}", timeout=5)
    r.raise_for_status()
    print(r.json()["amount"])
```

No confundas concurrencia con ausencia de límites de la API.

**Resultado esperado** 800 y 1200.

### ThreadPoolExecutor

**Clave** `thread-pool`

**Definición** ThreadPoolExecutor ejecuta tareas independientes en varios hilos. Limita trabajadores y conserva el manejo de excepciones.

**Búsqueda** threads, concurrent futures, max_workers

**Para recordar** Evita compartir una Session mutable entre hilos sin coordinación.

#### Consultar dos pedidos en paralelo

```python
from concurrent.futures import ThreadPoolExecutor
def fetch(i):
    r = requests.get(f"{BASE}/orders/{i}", timeout=5)
    r.raise_for_status()
    return r.json()["amount"]
with ThreadPoolExecutor(max_workers=2) as pool:
    print(list(pool.map(fetch, [101, 103])))
```

Evita compartir una Session mutable entre hilos sin coordinación.

**Resultado esperado** [800, 1200]; map conserva el orden de entrada.

### Límites y elección de cliente

**Clave** `limites-cliente`

**Definición** El número de trabajadores controla concurrencia, no peticiones por segundo. Para asyncio nativo se puede usar HTTPX o aiohttp en lugar de Requests.

**Búsqueda** asyncio, HTTPX, aiohttp, rate limit

**Para recordar** Define los límites de la API independientemente del tamaño del pool.

#### Separar concurrencia de cuota

```python
max_workers = 2
requests_per_minute = 60
print(max_workers, requests_per_minute)
```

Define los límites de la API independientemente del tamaño del pool.

**Resultado esperado** 2 60; son límites de configuración, no un limitador implementado.

## Fuentes

- [Requests — Quickstart](https://requests.readthedocs.io/en/latest/user/quickstart/): métodos, parámetros, JSON, contenido, headers, cookies, redirecciones y excepciones.
- [Requests — Advanced Usage](https://requests.readthedocs.io/en/latest/user/advanced/): sesiones, peticiones preparadas, certificados, streaming, hooks, autenticación, proxies, pooling y timeout.
- [Requests — API Reference](https://requests.readthedocs.io/en/latest/api/): firmas de métodos, Response, Session, Request, HTTPAdapter y excepciones.
- [Requests — Authentication](https://requests.readthedocs.io/en/latest/user/authentication/): Basic, Digest, netrc y AuthBase.
- [urllib3 — Retry](https://urllib3.readthedocs.io/en/stable/reference/urllib3.util.html#urllib3.util.Retry): configuración de reintentos, backoff, jitter y Retry-After.
- [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110): métodos, idempotencia, encabezados, códigos y consultas condicionales.
- [RFC 6585](https://www.rfc-editor.org/rfc/rfc6585): código 429.
- [RFC 9111 — HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111): caché HTTP y validación.
- [RFC 8288 — Web Linking](https://www.rfc-editor.org/rfc/rfc8288): encabezado Link.
- [RFC 6749 — OAuth 2.0](https://www.rfc-editor.org/rfc/rfc6749) y [RFC 6750](https://www.rfc-editor.org/rfc/rfc6750): tokens, renovación y Bearer.
- [Python — http.server](https://docs.python.org/3/library/http.server.html): servidor de práctica local.
- [Python — urllib.parse](https://docs.python.org/3/library/urllib.parse.html): codificación y resolución de URLs.
- [Python — unittest.mock](https://docs.python.org/3/library/unittest.mock.html): simulaciones de respuestas y errores.
- [Python — concurrent.futures](https://docs.python.org/3/library/concurrent.futures.html): ejecución mediante hilos.
- [Python — logging](https://docs.python.org/3/library/logging.html): registro de eventos.
- [pandas — IO tools](https://pandas.pydata.org/docs/user_guide/io.html): lectura y escritura de datos.
- [pandas — json_normalize](https://pandas.pydata.org/docs/reference/api/pandas.json_normalize.html): aplanar JSON.
- [requests-mock](https://requests-mock.readthedocs.io/en/latest/), [responses](https://github.com/getsentry/responses) y [pytest](https://docs.pytest.org/en/stable/): pruebas externas.
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html), [GraphQL over HTTP](https://graphql.github.io/graphql-over-http/draft/) y [SOAP 1.2](https://www.w3.org/TR/soap12-part1/): contratos de API complementarios.
