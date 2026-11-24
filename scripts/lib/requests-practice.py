import io
from http.client import HTTPResponse as _WireResponse
from urllib3.response import HTTPResponse as _TransportResponse
from urllib3.exceptions import MaxRetryError
import pandas as pd
import requests

BASE = "http://127.0.0.1:8765"
pedidos = pd.json_normalize(ORDERS, sep="_")


class _PracticeHandler(API):
    def __init__(self, message):
        self.rfile = io.BytesIO(message)
        self.wfile = io.BytesIO()
        self.client_address = ("127.0.0.1", 0)
        self.handle_one_request()

    def log_message(self, *_args):
        pass

    def do_GET(self):
        if urlsplit(self.path).path == "/slow":
            self.reply({"ok": True})
            return
        super().do_GET()

    do_HEAD = do_GET


class _ResponseBuffer:
    def __init__(self, stream):
        self.stream = stream

    def makefile(self, *_args):
        return self.stream


def _dispatch(request):
    target = request.path_url
    body = request.body
    if body is None:
        body = b""
    elif hasattr(body, "read"):
        body = body.read()
    elif not isinstance(body, (str, bytes)):
        body = b"".join(chunk.encode() if isinstance(chunk, str) else chunk for chunk in body)
    if isinstance(body, str):
        body = body.encode()
    headers = requests.structures.CaseInsensitiveDict(request.headers)
    headers.pop("Transfer-Encoding", None)
    headers["Content-Length"] = str(len(body))
    start = f"{request.method} {target} HTTP/1.1\r\n"
    wire_headers = "".join(f"{key}: {value}\r\n" for key, value in headers.items())
    stream = _PracticeHandler((start + wire_headers + "\r\n").encode("latin-1") + body).wfile
    stream.seek(0)
    response = _WireResponse(_ResponseBuffer(stream), method=request.method)
    response.begin()
    return _TransportResponse(body=response, status=response.status, reason=response.reason,
                              headers=response.headers.items(), original_response=response,
                              request_method=request.method, preload_content=False, decode_content=False)


def _send_in_memory(adapter, request, stream=False, timeout=None, **_options):
    url = urlsplit(request.url)
    if (url.scheme, url.netloc) != ("http", "127.0.0.1:8765"):
        raise requests.exceptions.ConnectionError("La práctica admite las rutas de la API de pedidos", request=request)
    read_timeout = timeout[1] if isinstance(timeout, tuple) else timeout
    if url.path == "/slow" and isinstance(read_timeout, (int, float)) and read_timeout < 0.3:
        raise requests.exceptions.ReadTimeout("Tiempo de lectura simulado", request=request)

    retry = adapter.max_retries
    while True:
        raw = _dispatch(request)
        if not retry.is_retry(request.method, raw.status, "Retry-After" in raw.headers):
            return adapter.build_response(request, raw)
        try:
            retry = retry.increment(request.method, request.url, response=raw)
        except MaxRetryError as error:
            if not retry.raise_on_status:
                return adapter.build_response(request, raw)
            raw.close()
            raise requests.exceptions.RetryError(error, request=request) from error
        raw.close()


# La VM de esta práctica usa el adaptador solo para la API de pedidos.
requests.adapters.HTTPAdapter.send = _send_in_memory
