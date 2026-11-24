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
