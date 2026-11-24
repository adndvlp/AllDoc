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
import reprlib as _reprlib
from contextlib import closing as _closing
import pandas as _pd
import numpy as _np
import jedi as _jedi
from jedi.api.environment import InterpreterEnvironment as _JediEnvironment
from pyodide.code import CodeRunner as _CodeRunner

_DataFrame = _pd.DataFrame
_Series = _pd.Series
_namespace = {}
_sqlite_view = None
_jedi.settings.use_filesystem_cache = False
_jedi_environment = _JediEnvironment()

def _prepare(bootstrap):
    global _namespace, _sqlite_view
    _namespace = {"__name__": "__main__"}
    _sqlite_view = None
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

def _preview_records(records, limit, budget):
    sample = records[:limit]
    if not all(type(row) is dict for row in sample):
        return None
    columns = {}
    for row in sample:
        for key in row:
            if len(columns) >= 200:
                break
            if type(key) is str and 0 < len(key) <= 256:
                columns[key] = None
    rows = []
    for row in sample:
        values = [row.get(key) for key in columns]
        rows.append([_reprlib.repr(value) if type(value) in (dict, list) else value for value in values])
    preview = _table(_DataFrame(rows, columns=list(columns), dtype=object), limit, budget)
    preview["truncated"] = len(preview["rows"]) < len(records)
    return preview

def _preview_array(array, columns, limit, budget):
    if array.ndim == 1:
        rows = array[:limit].reshape(-1, 1).tolist()
        columns = ["valor"]
    elif array.ndim == 2 and array.shape[1] <= 200:
        rows = array[:limit].tolist()
        if len(columns) != array.shape[1]:
            columns = [str(index) for index in range(array.shape[1])]
    else:
        return None
    preview = _table(_DataFrame(rows, columns=columns, dtype=object), limit, budget)
    preview["truncated"] = len(preview["rows"]) < len(array)
    return preview

def _preview_sqlite(seed_tables):
    global _sqlite_view
    if not seed_tables:
        return []
    import sqlite3
    connection = _namespace.get("con")
    if _sqlite_view and _sqlite_view[0] is not connection:
        _sqlite_view = None
    if not isinstance(connection, sqlite3.Connection):
        return []
    entities, rows_left, bytes_left = [], 200, 524288
    def check_backup(status, remaining, total):
        if status in (sqlite3.SQLITE_BUSY, sqlite3.SQLITE_LOCKED):
            raise sqlite3.OperationalError("La base está bloqueada durante la inspección")

    try:
        # Un backup en la propia transacción de escritura puede quedar esperando.
        if connection.in_transaction:
            return list(_sqlite_view[1]) if _sqlite_view else []
        with _closing(sqlite3.connect(":memory:")) as snapshot:
            sqlite3.Connection.backup(connection, snapshot, pages=64, progress=check_backup, sleep=0)
            snapshot.execute("PRAGMA trusted_schema=OFF")
            snapshot.execute("PRAGMA query_only=ON")
            names = [row[0] for row in snapshot.execute("""
                SELECT name FROM pragma_table_list WHERE "schema" = 'main' AND type = 'table'
                AND substr(name, 1, 7) != 'sqlite_' ORDER BY name
            """) if 0 < len(row[0]) <= 256]
            ordered = [name for name in seed_tables if name in names]
            ordered += [name for name in names if name not in seed_tables]
            for name in ordered[:200]:
                table = 'main."' + name.replace('"', '""') + '"'
                primary = [row[0] for row in snapshot.execute(
                    "SELECT name FROM pragma_table_info(?) WHERE pk > 0 ORDER BY pk", (name,))]
                order = ' ORDER BY ' + ', '.join('"' + column.replace('"', '""') + '"' for column in primary) if primary else ''
                row_count = snapshot.execute("SELECT COUNT(*) FROM " + table).fetchone()[0]
                limit = min(20, rows_left)
                cursor = snapshot.execute("SELECT * FROM " + table + order + " LIMIT ?", (limit,))
                columns = [col[0] for col in cursor.description]
                if len(columns) > 200 or any(not 0 < len(column) <= 256 for column in columns):
                    continue
                preview = _table(_DataFrame(cursor.fetchall(), columns=columns, dtype=object), limit, max(0, bytes_left))
                preview["truncated"] = len(preview["rows"]) < row_count
                for column in preview["columns"]:
                    if column["name"] in primary:
                        column["primaryKey"] = True
                rows_left -= len(preview["rows"])
                bytes_left -= len(_json.dumps(preview, ensure_ascii=False).encode("utf-8"))
                entities.append({"name": name, "kind": "table", "columns": preview["columns"],
                                 "rowCount": row_count, "preview": preview})
    except sqlite3.Error:
        return entities
    _sqlite_view = (connection, list(entities))
    return entities

def _inspect():
    entities = _preview_sqlite(_json.loads(_inspect_tables))
    table_names = {entity["name"] for entity in entities}
    rows_left = 200 - sum(len(entity["preview"]["rows"]) for entity in entities)
    bytes_left = 524288 - sum(len(_json.dumps(entity["preview"], ensure_ascii=False).encode("utf-8")) for entity in entities)
    variables = _json.loads(_inspect_variables)
    for name in dict.fromkeys([*variables, *sorted(_namespace)]):
        if name in table_names:
            continue
        value = _namespace.get(name)
        limit, budget = min(20, rows_left), max(0, bytes_left)
        if isinstance(value, _DataFrame):
            kind, preview = "dataframe", _table(value, limit, budget)
        elif name in variables and type(value) is list:
            kind, preview = "variable", _preview_records(value, limit, budget)
        elif name in variables and type(value) is _np.ndarray:
            kind, preview = "variable", _preview_array(value, variables[name], limit, budget)
        else:
            continue
        if preview is None:
            continue
        if len(entities) >= 200 or len(name) > 256:
            raise ValueError("El esquema supera los límites")
        rows_left -= len(preview["rows"])
        bytes_left -= len(_json.dumps(preview, ensure_ascii=False).encode("utf-8"))
        entities.append({"name": name, "kind": kind, "columns": preview["columns"], "rowCount": len(value), "preview": preview})
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
        if _json.loads(_inspect_tables):
            header += "import sqlite3\ncon: sqlite3.Connection\n"
        for name in registered:
            if name.isidentifier():
                header += name + ": pd.DataFrame\n"
        script = _jedi.Script(header + document, path=request["file"], environment=_jedi_environment)
        options = script.complete(header.count("\n") + before.count("\n") + 1, len(before.rsplit("\n", 1)[-1]))
        items = [{"label": option.name, "insertText": option.name, "detail": option.type} for option in options[:200]]
    return _json.dumps({"from": from_position, "to": to_position, "items": items}, ensure_ascii=False)
`;
