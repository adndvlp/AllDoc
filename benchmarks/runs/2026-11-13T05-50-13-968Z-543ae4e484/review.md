# Revisión de la referencia previa al rediseño

**Resultado:** punto 1 del SDD completado. La interfaz conserva su diseño previo.  
**Ejecución:** `npm run baseline`, desde la terminal del usuario.  
**Informe original:** [README.md](README.md), [report.json](report.json).  
**Fuente:** `543ae4e484a129c91f0976155ee140eae180bbf8a32637d358a036f20638ebb6`.

## Integridad y revisión

- Estado de ejecución `complete`, sin fallos registrados; build y navegador completados.
- Las fuentes actuales de la app y los cuatro archivos de la herramienta coinciden con los hashes de la ejecución.
- Las 42 capturas coinciden con sus hashes y dimensiones de viewport. Se revisaron visualmente inicio, SELECT, Comentarios, menú expandido, buscador y selector de color en los siete tamaños.
- Las tablas de resultados permanecen cerradas en las fichas, el menú muestra los grupos previstos y el selector usa violeta en su captura específica. El resto utiliza azul.
- Hay treinta muestras completas de cada una de cuatro acciones en dos perfiles: 240 en total. Las dos primeras aperturas del buscador se conservan por separado.
- Se conservaron 35 referencias UI anteriores, claramente separadas de las capturas nuevas.
- El inventario del bundle coincide exactamente con el de las otras ejecuciones con el mismo nombre estable de archivos generados. Se comprobaron los tamaños, rutas y hashes.
- Se limpiaron el build temporal, el directorio generado y el lock de la ejecución.
- `npm test`: 21 pruebas aprobadas. `npm run typecheck:tests`: aprobado. Comprobación sintáctica de ambos scripts `.mjs`: aprobada.

## Condiciones

Apple M1, 8 CPU lógicas y 8 GiB de RAM; macOS arm64; Node 26.0.0; Chromium 158.0.8127.18. Build de producción servido en loopback con gzip y sin emular una conexión WAN. Perfiles laptop `1280×800`, CPU 1×, y celular `390×844`, CPU 4×; ambos con movimiento normal durante las mediciones. Las capturas usan movimiento reducido.

## Bundle

| Conjunto completo del build | Archivos | Bytes | Gzip bytes |
| --- | ---: | ---: | ---: |
| JavaScript | 23 | 605939 | 198248 |
| CSS | 1 | 103683 | 20886 |
| HTML | 10 | 204429 | 51623 |

El total JS incluye otras rutas y chunks diferidos. Los assets declarados por página están en [bundle.json](bundle.json); las solicitudes efectivamente observadas antes y después de abrir la búsqueda están en los JSON de tiempos. Estas magnitudes se comparan por separado.

## Tiempos de referencia

Percentil 95 del proxy DOM, en milisegundos. Treinta muestras por celda:

| Acción | Laptop CPU 1× | Celular emulado CPU 4× |
| --- | ---: | ---: |
| Abrir buscador con índice cargado | 32.1 | 30.9 |
| Escribir `w` y disponer del resultado filtrado | 26.2 | 31.4 |
| Abrir WHERE desde el resultado | 33.2 | 52.7 |
| Alternar SQL | 32.4 | 31.6 |

En la primera apertura, la disponibilidad de resultados se registró a los 64.7 ms en laptop y 97.5 ms en celular emulado. Son muestras únicas de la carga fría, sin percentiles.

Se observó una tarea larga de 141 ms en el perfil celular, iniciada a los 135.5 ms de la carga del documento y anterior a la primera interacción medida, registrada alrededor de los 1065.6 ms. Queda como referencia del arranque; no se atribuye a una función concreta sin una traza de ejecución.

Datos completos: [laptop](timings-laptop.json), [celular](timings-celular.json).

## Límites de interpretación

El proxy mide el timestamp de entrada, una condición DOM y el siguiente rAF. No mide exactamente la presentación de píxeles ni equivale a INP. Las entradas Event Timing nativas se conservan por separado y su cobertura puede ser parcial: seis muestras de escritura en laptop y once en celular no tienen entrada observada; no se les asignó cero.

La emulación en Chromium y red local no representa un teléfono físico ni Safari. Las diferencias pequeñas pueden deberse a alineación de frames y variabilidad del equipo, además de CPU. No se infiere que el celular sea más rápido que la laptop a partir de estos valores.

Los datos sirven para comparar el rediseño bajo las mismas condiciones. Completar esta referencia no acredita el INP de usuarios reales ni completa CA-23, que también exige la medición posterior.
