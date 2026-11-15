# Compatibilidad Firefox/WebKit

El punto 1 prepara la matriz y comprueba el arranque. El punto 2 verifica la
práctica de escritorio. El punto 3 amplía la cobertura funcional a seis proyectos:
Firefox/WebKit estrecho, tableta y escritorio. Descubrir casos o compilar no
acredita su ejecución real.

```sh
npm run test:browser:smoke
npm run test:browser
```

El primer comando ejecuta cuatro casos: filtro SQL y pandas en Firefox y WebKit.
El segundo descubre 168 casos aplicables: 24 por proyecto estrecho/tableta y 36
por proyecto de escritorio. Incluye navegación, búsqueda, foco y diálogos,
preferencias, borradores, acciones explícitas, sesiones vivas, resultados,
aislamiento, adaptación y scroll. Los casos `@desktop` concentran cancelación,
timeout y fallos de carga/almacenamiento; se excluyen antes de ejecutar en otros
tamaños, sin tests omitidos. El catálogo en `scripts/lib/browser-cases.ts`
identifica archivo, alcance y requisitos CB-01 a CB-20 de cada caso.

Para repetir únicamente el caso afectado, sin reconstruir por cada motor:

```sh
npm run test:browser -- --project=webkit-escritorio --grep=PY-03
```

`--list` descubre los casos sin abrir motores ni servidores. `--build-only`
comprueba únicamente app, runtime y rutas publicadas. `--desktop` conserva el
recorrido histórico de veinte casos del punto 2. Las referencias visuales y la
aceptación consolidada corresponden a los puntos 4 y 5 del
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
En WebKit móvil, Playwright no admite `mouse.wheel`: se comprueba `scrollBy`
real del DOM, contención CSS e independencia de las regiones. El informe anota
esa condición; no acredita la física de un gesto. Los controles configurados
para toque utilizan `tap`. Los otros proyectos comprueban rueda nativa.
