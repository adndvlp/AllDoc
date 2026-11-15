# Compatibilidad Firefox/WebKit

El punto 1 prepara la matriz y comprueba el arranque. El punto 2 añade diez
casos de práctica por motor en escritorio. Su aprobación requiere resultados
reales; descubrir los casos o compilar no acredita compatibilidad.

```sh
npm run test:browser:smoke
npm run test:browser
```

El primer comando ejecuta cuatro casos: filtro SQL y pandas en Firefox y WebKit.
El segundo ejecuta veinte: apertura sin ejecución automática, editor y resaltado,
escritura/deshacer/rehacer/Tab, completado SQL/Jedi/columnas, selección, error y
recuperación, y permiso de Ctrl+Enter mientras se prepara el motor.

Para repetir únicamente el caso afectado, sin reconstruir por cada motor:

```sh
npm run test:browser -- --project=webkit-escritorio --grep=PY-03
```

`--list` descubre los casos sin abrir motores ni servidores. `--build-only`
comprueba únicamente app, runtime y rutas publicadas. Los tamaños estrecho y
tableta, y las referencias visuales, corresponden a los puntos 3 y 4 del
[SDD](../../specs/browser-compatibility-sdd.md).

El comando dedicado comprueba primero los motores seleccionados y no descarga
binarios. Construye una sola vez, usa puertos y directorios propios, mantiene
los orígenes separados y libera sus recursos. No toca el servidor personal ni
`.runtime-build`. Exige los wheels ya preparados por `npm run prepare:python`.

Cada ejecución guarda configuración, versiones, hashes, resultados originales,
informe HTML, capturas adjuntas y trazas de fallos en
`benchmarks/browser-verifications/<fecha>-<fuente>/`. Muestra caso, fase y
progreso cada quince segundos; el detalle queda en los logs. Las capturas son
diagnóstico: estos comandos no crean ni actualizan referencias visuales.

Las pruebas usan roles y teclado de Playwright, sin CDP, motores simulados,
resultados preparados, reintentos ni omisiones para aprobar el recorrido.
