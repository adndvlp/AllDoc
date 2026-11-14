/** Código propio, evaluado solo dentro de la VM aislada de Pyodide. */
export const pythonHelper = String.raw`
import json as _json
import math as _math
import re as _re
import datetime as _datetime
import decimal as _decimal
import traceback as _traceback
import ast as _ast
import types as _types
import pandas as _pd
import numpy as _np
import jedi as _jedi
from jedi.api.environment import InterpreterEnvironment as _JediEnvironment
from pyodide.code import CodeRunner as _CodeRunner

_DataFrame = _pd.DataFrame
_Series = _pd.Series
_namespace = {}
_jedi.settings.use_filesystem_cache = False
_jedi_environment = _JediEnvironment()

def _prepare(bootstrap):
    global _namespace
    _namespace = {"__name__": "__main__"}
    exec(compile(bootstrap, "<datos>", "exec"), _namespace)

def _value(value):
    if value is None or value is _pd.NA or value is _pd.NaT:
        return None, None
    if isinstance(value, _np.generic):
        value = value.item()
    if isinstance(value, bool):
        return value, "boolean"
    if isinstance(value, int):
        return (value, "integer") if abs(value) <= 9007199254740991 else (str(value), "bigint")
    if isinstance(value, float):
        if _math.isnan(value):
            return None, None
        return (value, "number") if _math.isfinite(value) else (str(value), "text")
    if isinstance(value, _datetime.datetime):
        return value.isoformat(), "datetime"
    if isinstance(value, _datetime.date):
        return value.isoformat(), "date"
    if isinstance(value, _decimal.Decimal):
        return (format(value, "f"), "decimal") if value.is_finite() else (None, None)
    if isinstance(value, str):
        return value, "text"
    if isinstance(value, bytes):
        return "0x" + value.hex(), "text"
    return "<" + type(value).__name__ + ">", "text"

def _table(frame, limit=200, budget=983040):
    if len(frame.columns) > 200:
        raise ValueError("La tabla supera 200 columnas")
    names = [str(name) for name in frame.columns]
    if any(len(name) > 256 for name in names):
        raise ValueError("Nombre de columna demasiado largo")
    rows, kinds, size = [], [set() for _ in names], 0
    for source in frame.head(limit).itertuples(index=False, name=None):
        values = [_value(value) for value in source]
        row = [value for value, kind in values]
        length = len(_json.dumps([None if value is None else str(value) for value in row], ensure_ascii=False).encode("utf-8"))
        if size + length > budget:
            break
        size += length
        for index, (_, kind) in enumerate(values):
            if kind is not None:
                kinds[index].add(kind)
        rows.append(row)
    types = []
    for index, options in enumerate(kinds):
        if len(options) == 1:
            kind = next(iter(options))
        elif options and options <= {"integer", "number"}:
            kind = "number"
        elif options and options <= {"integer", "bigint"}:
            kind = "bigint"
        elif not options:
            dtype = frame.dtypes.iloc[index]
            kind = "boolean" if _pd.api.types.is_bool_dtype(dtype) else "integer" if _pd.api.types.is_integer_dtype(dtype) else "number" if _pd.api.types.is_float_dtype(dtype) else "datetime" if _pd.api.types.is_datetime64_any_dtype(dtype) else "text"
        else:
            kind = "text"
        types.append(kind)
    for row in rows:
        for index, value in enumerate(row):
            if value is not None and types[index] in ("text", "bigint"):
                row[index] = str(value)
    return {"columns": [{"name": name, "type": types[index]} for index, name in enumerate(names)],
            "rows": rows, "truncated": len(rows) < len(frame)}

def _send(value):
    _publish(_json.dumps(value, ensure_ascii=False, allow_nan=False))

def _u16(value):
    return len(value.encode("utf-16-le", "surrogatepass")) // 2

async def _run(payload):
    request = _json.loads(payload)
    source, filename = request["source"], request["entryFile"]
    _namespace["__file__"] = filename
    current_codes = set()
    try:
        runner = _CodeRunner(source, filename=filename, return_mode="last_expr", quiet_trailing_semicolon=True, flags=_ast.PyCF_ALLOW_TOP_LEVEL_AWAIT).compile()
        pending_codes = [runner.code]
        while pending_codes:
            code = pending_codes.pop()
            if isinstance(code, _types.CodeType):
                current_codes.add(id(code))
                pending_codes.extend(value for value in code.co_consts if isinstance(value, _types.CodeType))
        result = await runner.run_async(globals=_namespace)
        if isinstance(result, _Series):
            result = result.to_frame()
        if isinstance(result, _DataFrame):
            _send({"type": "table", **_table(result)})
        elif result is not None:
            _send({"type": "stream", "channel": "stdout", "text": repr(result) + "\n"})
        return "success"
    except BaseException as error:
        event = {"type": "error", "file": filename}
        try:
            event["message"] = (type(error).__name__ + ": " + str(error))[:2048]
        except BaseException:
            event["message"] = type(error).__name__
        line, column = None, None
        if isinstance(error, SyntaxError):
            line = error.lineno
            if line and error.offset:
                lines = source.splitlines()
                text = lines[line - 1] if line <= len(lines) else ""
                column = _u16(text[:error.offset - 1]) + 1
        else:
            summaries = _traceback.extract_tb(error.__traceback__)
            frames = [summary for (frame, _), summary in zip(_traceback.walk_tb(error.__traceback__), summaries) if id(frame.f_code) in current_codes]
            if frames:
                frame = frames[-1]
                line = frame.lineno
                if frame.colno is not None and line <= len(source.splitlines()):
                    text = source.splitlines()[line - 1]
                    column = _u16(text.encode("utf-8")[:frame.colno].decode("utf-8", "ignore")) + 1
        if line:
            event["line"] = line + request["lineOffset"]
            if column:
                event["column"] = column + (request["columnOffset"] if line == 1 else 0)
        _send(event)
        return "error"

def _inspect():
    entities, rows_left, bytes_left = [], 200, 524288
    for name, value in sorted(list(_namespace.items())):
        if not isinstance(value, _DataFrame):
            continue
        if len(entities) >= 200 or len(name) > 256:
            raise ValueError("El esquema supera los límites")
        preview = _table(value, min(20, rows_left), max(0, bytes_left))
        rows_left -= len(preview["rows"])
        bytes_left -= len(_json.dumps(preview, ensure_ascii=False).encode("utf-8"))
        entities.append({"name": name, "kind": "dataframe", "columns": preview["columns"], "rowCount": len(value), "preview": preview})
    return _json.dumps(entities, ensure_ascii=False, allow_nan=False)

def _complete(payload):
    request = _json.loads(payload)
    document, position = request["document"], request["position"]
    before = document.encode("utf-16-le", "surrogatepass")[:position * 2].decode("utf-16-le", "surrogatepass")
    cursor = len(before)
    registered = {entity["name"]: entity for entity in request["schema"]["entities"] if entity["kind"] == "dataframe"}
    match = _re.search(r"(?<![\w.])([^\W\d]\w*)\[\s*(['\"])([^'\"\\\n]*)$", before)
    if match and match[1] in registered:
        prefix = match[3]
        labels = [column["name"] for column in registered[match[1]]["columns"] if column["name"].startswith(prefix)]
        from_position = position - _u16(prefix)
        suffix = _re.match(r"[^'\"\\\n]*", document[cursor:])[0]
        to_position = position + _u16(suffix)
        items = [{"label": name, "insertText": name, "detail": "Columna registrada"} for name in labels[:200]]
    else:
        prefix = _re.search(r"\w*$", before)[0]
        from_position = position - _u16(prefix)
        to_position = position + _u16(_re.match(r"\w*", document[cursor:])[0])
        header = "import pandas as pd\n"
        for name in registered:
            if name.isidentifier():
                header += name + ": pd.DataFrame\n"
        script = _jedi.Script(header + document, path=request["file"], environment=_jedi_environment)
        options = script.complete(header.count("\n") + before.count("\n") + 1, len(before.rsplit("\n", 1)[-1]))
        items = [{"label": option.name, "insertText": option.name, "detail": option.type} for option in options[:200]]
    return _json.dumps({"from": from_position, "to": to_position, "items": items}, ensure_ascii=False)
`;
