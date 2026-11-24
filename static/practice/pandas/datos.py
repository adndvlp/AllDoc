import pandas as pd
import numpy as np
from io import StringIO
from pathlib import Path
from tempfile import TemporaryDirectory
import sqlite3

clientes = pd.DataFrame({
    'cliente_id': [1, 2, 3, 4, 5],
    'nombre': ['Ana', 'Luis', 'Marta', 'Pedro', 'Eva'],
    'pais': ['MX', 'MX', 'ES', None, 'ES'],
    'alta': pd.to_datetime(['2026-01-01', '2026-01-05', '2026-01-10', '2026-02-01', '2026-02-03'])
})
pedidos = pd.DataFrame({
    'pedido_id': [101, 102, 103, 104, 105, 106, 107],
    'cliente_id': [1, 2, 1, 3, 2, 3, 1],
    'fecha': pd.to_datetime(['2026-02-01', '2026-02-01', '2026-02-02', '2026-02-03', '2026-02-03', '2026-03-01', '2026-03-02']),
    'monto': [100, 200, 150, 200, 50, 300, 150],
    'estado': ['completado', 'completado', 'cancelado', 'completado', 'cancelado', 'completado', 'completado'],
    'canal': ['web', 'tienda', 'web', 'web', 'tienda', None, 'web']
})
productos = pd.DataFrame({
    'producto_id': [10, 20, 30, 40],
    'producto': ['Mouse', 'Teclado', 'Monitor', 'Silla'],
    'categoria': ['Tec', 'Tec', 'Tec', 'Hogar'],
    'precio': [25, 50, 200, 120]
})
detalle = pd.DataFrame({
    'pedido_id': [101, 101, 102, 103, 104, 105, 106, 106, 107],
    'producto_id': [10, 20, 30, 20, 30, 10, 30, 20, 20],
    'cantidad': [2, 1, 1, 3, 1, 2, 1, 2, 3],
    'precio_unitario': [25, 50, 200, 50, 200, 25, 200, 50, 50]
})
leads = pd.DataFrame({
    'lead_id': [1, 2, 3, 4, 5],
    'email': ['ana@ejemplo.com', 'luis@ejemplo.com', 'ana@ejemplo.com', None, 'eva@ejemplo.com'],
    'importe_texto': ['100', '200', 'error', None, '50'],
    'nombre_raw': [' Ana ', 'LUIS', 'ana ', None, 'Eva']
})
serie = pd.Series([100, np.nan, 200, 300], index=['a', 'b', 'c', 'd'], name='ventas')
diario = pd.Series([100, 200, 50, 150], index=pd.date_range('2026-02-01', periods=4, freq='D'), name='ventas')
