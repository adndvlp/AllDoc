import type {ConceptId} from './concepts';

export const searchKeywords: Record<ConceptId, readonly string[]> = {
  'analisis-de-datos/sql/select': ['elegir', 'seleccionar', 'columnas', 'mostrar', 'consultar', 'tabla', 'from', 'origen', 'asterisco', 'todas', 'varias', 'coma', 'especificas', 'productos', 'nombre', 'precio', 'negocio'],
  'analisis-de-datos/sql/where': ['filtrar', 'filtro', 'condicion', 'condición', 'mayor', 'igual', 'filas', 'precio', 'productos'],
  'analisis-de-datos/sql/order-by': ['ordenar', 'orden', 'ascendente', 'descendente', 'asc', 'desc', 'precio', 'barato', 'caro'],
  'analisis-de-datos/sql/limit': ['limitar', 'maximo', 'máximo', 'cantidad', 'primeros', 'cinco', 'tres', '5', '3', 'filas', 'productos'],
  'analisis-de-datos/sql/comentarios': ['comentario', 'comentarios', 'notas', 'anotar', 'documentar', 'guiones', 'bloque', 'linea', 'línea', '--', '/*', '*/'],
  'analisis-de-datos/pandas/dataframe': ['crear', 'tabla', 'pandas', 'python', 'dataframe', 'columnas', 'filas', 'listas', 'productos', 'datos'],
};
