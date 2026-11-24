import numpy as np
import pandas as pd
import seaborn as sns
import seaborn.objects as so
import matplotlib.pyplot as plt

sns.set_theme()

ventas = pd.DataFrame([
    # fecha, sucursal, region, canal, ingresos, inversion, pedidos, satisfaccion
    ("2026-09-01", "N1", "Norte", "Online", 100, 24, 11, 4.0),
    ("2026-09-01", "N2", "Norte", "Tienda", 80, 21, 8, 3.6),
    ("2026-09-01", "S1", "Sur", "Online", 120, 28, 12, 4.1),
    ("2026-09-01", "S2", "Sur", "Tienda", 100, 25, 10, 3.7),
    ("2026-09-02", "N1", "Norte", "Online", 120, 38, 11, 4.2),
    ("2026-09-02", "N2", "Norte", "Tienda", 100, 25, 10, 3.8),
    ("2026-09-02", "S1", "Sur", "Online", 140, 35, 15, 4.3),
    ("2026-09-02", "S2", "Sur", "Tienda", 120, 29, 11, 3.9),
    ("2026-09-03", "N1", "Norte", "Online", 140, 33, 13, 4.4),
    ("2026-09-03", "N2", "Norte", "Tienda", 120, 31, 13, 4.0),
    ("2026-09-03", "S1", "Sur", "Online", 160, 43, 15, 4.5),
    ("2026-09-03", "S2", "Sur", "Tienda", 140, 36, 15, 4.1),
    ("2026-09-04", "N1", "Norte", "Online", 160, 44, 17, 4.6),
    ("2026-09-04", "N2", "Norte", "Tienda", 140, 37, 13, 4.2),
    ("2026-09-04", "S1", "Sur", "Online", 180, 49, 18, 4.7),
    ("2026-09-04", "S2", "Sur", "Tienda", 160, 42, 16, 4.3),
], columns=["fecha", "sucursal", "region", "canal", "ingresos", "inversion", "pedidos", "satisfaccion"])
ventas["fecha"] = pd.to_datetime(ventas["fecha"])
ventas["meta"] = (ventas["ingresos"] >= 140).astype(int)

diarias = ventas.pivot_table(index="fecha", columns="canal", values="ingresos", aggfunc="sum")
matriz = ventas.pivot_table(index="region", columns="canal", values="ingresos", aggfunc="sum")
rng = np.random.default_rng(42)
simulacion = pd.DataFrame({
    "canal": np.repeat(["Online", "Tienda"], 400),
    "ingresos": np.concatenate([
        rng.lognormal(mean=4.8, sigma=.5, size=400),
        rng.lognormal(mean=4.6, sigma=.45, size=400)
    ])
})
