import numpy as np
from scipy import stats

ventas = np.array([100, 120, 120, 140, 220], dtype=float)
ventas_nan = np.array([100, 120, np.nan, 140, 220])
canal_a = np.array([98, 105, 110, 115, 120, 125, 130, 135])
canal_b = np.array([110, 118, 121, 130, 135, 142, 148, 155])
antes = np.array([42, 45, 48, 50, 54, 58, 60, 63])
despues = np.array([40, 42, 47, 46, 50, 53, 57, 58])
canal_c = np.array([120, 130, 140, 150, 160, 170, 180, 190])
publicidad = np.array([1, 2, 3, 4, 5])
ingresos = np.array([3, 5, 7, 8, 12])
matriz = np.array([[10, 20, 30], [40, 50, 60]])
# Filas A y B; columnas conversion y no conversion
conversiones = np.array([[40, 160], [60, 140]])
