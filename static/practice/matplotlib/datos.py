import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import matplotlib.ticker as ticker
import matplotlib.colors as colors
from matplotlib import font_manager
from matplotlib.patches import Rectangle, Circle, Polygon
from matplotlib.widgets import Slider, Button
from matplotlib.animation import FuncAnimation
from cycler import cycler
import numpy as np
import pandas as pd
from pathlib import Path

meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
fechas = pd.date_range('2026-01-01', periods=6, freq='MS')
ventas = np.array([120, 150, 130, 180, 160, 210])
metas = np.array([130, 140, 150, 170, 180, 190])
publicidad = np.array([10, 15, 12, 20, 18, 25])
pedidos = np.array([24, 30, 26, 36, 32, 42])
conversion = np.array([.10, .12, .11, .14, .13, .16])
regiones = ['Norte', 'Centro', 'Sur']
ventas_region = np.array([240, 180, 120])
meta_region = np.array([220, 200, 150])
online = np.array([140, 100, 60])
tienda = np.array([100, 80, 60])
importes = np.array([20, 30, 40, 50, 60, 70, 90, 100, 120])
matriz = np.array([[80, 90, 70], [50, 60, 70], [30, 40, 50]])
g = np.linspace(-2, 2, 25)
X, Y = np.meshgrid(g, g)
Z = X**2 + Y**2

df = pd.DataFrame({'mes': meses, 'fecha': fechas, 'ventas': ventas,
                   'meta': metas, 'publicidad': publicidad,
                   'pedidos': pedidos, 'conversion': conversion})
transacciones = pd.DataFrame({
    'region': ['Norte', 'Centro', 'Sur', 'Norte', 'Centro', 'Sur'],
    'importe': [140, 100, 60, 100, 80, 60]})

salida = Path('salidas_matplotlib')
salida.mkdir(exist_ok=True)
