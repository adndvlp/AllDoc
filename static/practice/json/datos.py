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
