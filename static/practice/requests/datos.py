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
