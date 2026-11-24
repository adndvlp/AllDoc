import numpy as np

# Filas: sucursales Norte, Centro y Sur; columnas: T1, T2, T3 y T4.
sucursales = np.array(['Norte', 'Centro', 'Sur'])
ventas = np.array([[100, 150, 200, 250],
                   [150, 200, 250, 350],
                   [200, 200, 200, 150]], dtype=np.int64)

# Seis pedidos: la misma posición corresponde al mismo pedido en cada vector.
importes = np.array([100, 250, 150, 400, 300, 200], dtype=np.int64)
clientes = np.array([1, 2, 1, 3, 2, 3])
estados = np.array(['completed', 'cancelled', 'completed',
                    'completed', 'completed', 'cancelled'])
codigos = np.array([0, 1, 0, 2, 1, 2])  # 0=Norte, 1=Centro, 2=Sur
fechas = np.array(['2026-01-05', '2026-01-12', '2026-02-03',
                   '2026-02-10', '2026-03-02', '2026-03-09'], dtype='datetime64[D]')

# Tres productos: cantidades y precios unitarios alineados.
unidades = np.array([2, 5, 3])
precios = np.array([50, 20, 100])

# Seis meses consecutivos, de enero a junio.
serie = np.array([100, 120, 110, 160, 140, 200])

# Importes con datos faltantes e inválidos para ejemplos de limpieza.
faltantes = np.array([100., np.nan, 200., 300.])
invalidos = np.array([100., np.nan, np.inf, -np.inf, 300.])
