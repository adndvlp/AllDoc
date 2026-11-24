/** Captura local de Matplotlib. Los bytes pasan al padre sin HTML ni SVG embebido. */
export const pythonFigures = String.raw`
import matplotlib as _mpl
_mpl.use("Agg", force=True)
import matplotlib.pyplot as _plt
from io import BytesIO as _FigureBuffer
from matplotlib._pylab_helpers import Gcf as _FigureManagers
from matplotlib.artist import Artist as _PlotArtist
from pyodide.ffi import to_js as _figure_to_js

def _reset_figures():
    _plt.close("all")
    _mpl.rcdefaults()
    _mpl.use("Agg", force=True)

def _is_plot_handle(value):
    if _inspect_seaborn:
        from seaborn.axisgrid import Grid, JointGrid
        if isinstance(value, (Grid, JointGrid)):
            return True
    return isinstance(value, _PlotArtist) or (
        isinstance(value, (tuple, list)) and value and all(isinstance(item, _PlotArtist) for item in value)
    )

def _capture_figure(figure):
    if figure in _shown or len(_shown) >= 8:
        return
    _shown.add(figure)
    inches = max(figure.get_size_inches())
    if not _math.isfinite(inches) or inches <= 0:
        return
    title = figure.get_suptitle().strip()
    if not title:
        title = next((axis.get_title().strip() for axis in figure.axes if axis.get_title().strip()), "")
    with _FigureBuffer() as buffer:
        figure.savefig(buffer, format="png", backend="agg", dpi=min(figure.dpi, 1280 / inches))
        figure.stale = False
        if buffer.tell() <= 1048576:
            _publish_figure((title or ("Gráfica " + str(len(_shown))))[:256], _figure_to_js(buffer.getvalue()))

def _show_figures(*args, **kwargs):
    for manager in _FigureManagers.get_all_fig_managers():
        _capture_figure(manager.canvas.figure)

def _start_figures():
    global _previous_figures, _shown, _original_show
    _previous_figures = {manager.canvas.figure for manager in _FigureManagers.get_all_fig_managers()}
    _shown = set()
    _original_show = _plt.show
    _plt.show = _show_figures

def _finish_figures(success):
    try:
        if success:
            for manager in _FigureManagers.get_all_fig_managers():
                figure = manager.canvas.figure
                if figure not in _previous_figures or figure.stale:
                    _capture_figure(figure)
    finally:
        _plt.show = _original_show
        _shown.clear()
        _previous_figures.clear()
`;
