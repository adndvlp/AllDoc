from datetime import date, datetime
from pathlib import Path
from openpyxl import Workbook, load_workbook

wb = Workbook()
ws = wb.active
ws.title = "Ventas"
for fila in [
    ("ID", "Producto", "Region", "Unidades", "Precio", "Fecha", "Estado"),
    (101, "Laptop", "Norte", 2, 800, date(2026, 8, 1), "Completado"),
    (102, "Mouse", "Sur", 5, 20, date(2026, 8, 2), "Completado"),
    (103, "Laptop", "Norte", 1, 800, date(2026, 8, 3), "Pendiente"),
    (104, "Teclado", None, 3, 50, date(2026, 8, 4), "Completado"),
    (105, "Mouse", "Sur", 2, 20, date(2026, 8, 5), "Cancelado"),
]:
    ws.append(fila)
resumen = wb.create_sheet("Resumen")
resumen.append(["Indicador", "Valor"])
resumen.append(["Meta", 2000])
wb.save("ventas_base.xlsx")
