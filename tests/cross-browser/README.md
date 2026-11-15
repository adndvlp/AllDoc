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
Antes de iniciar navegadores y build comprueba un margen operativo de 512 MiB
libres en el proyecto y el temporal. Un fallo al escribir el log termina el
proceso hijo y permite liberar los recursos propios; no se presenta como un
error global de Node ni como una aprobación del caso.

Cada ejecución guarda configuración, versiones, hashes, resultados originales,
informe HTML, capturas adjuntas y trazas de fallos en
`benchmarks/browser-verifications/<fecha>-<fuente>/`. Muestra caso, fase y
progreso cada quince segundos; el detalle queda en los logs. Las capturas son
diagnóstico: estos comandos no crean ni actualizan referencias visuales.

## Referencias visuales (punto 4)

```sh
npm run test:browser:update
```

Genera 52 imágenes mediante 26 casos visuales, separados de los 168 casos
funcionales. Cubre portada, código/datos/resultados SQL, resultado y sugerencias
Jedi de pandas, búsqueda y temas con práctica, y 320 px/ventana horizontal al
200% en los proyectos estrechos. No cambia los nombres, configuración o 165
referencias de Chromium. No instala navegadores automáticamente.

Cada proyecto guarda PNG y `manifest.json` bajo
`tests/cross-browser/__screenshots__/{projectName}/`. El manifiesto registra
entorno, versiones, dimensiones reales, escala de texto, fuente, herramientas
y hashes; se genera como `awaiting-review`. Las imágenes se deben inspeccionar
y su revisión se registra aparte. Generar no equivale a aprobar.

Para repetir la generación de un proyecto completo:

```sh
npm run test:browser:update -- --project=webkit-estrecho
```

La comparación independiente no crea referencias ausentes ni acepta cambios:

```sh
npm run test:browser -- --visual
```

Admite `--project` y `--grep`; un filtro no acredita toda la suite. Antes del
build comprueba manifiesto, hashes y compatibilidad de entorno/binarios. La
comparación conserva `maxDiffPixelRatio: 0.001` y verifica que las referencias
no cambian durante la ejecución. Los puertos efímeros se excluyen de la identidad
del entorno visual. Actualizar no admite `--grep`, para que cada manifiesto
corresponda a un proyecto completo. `--visual --list` solo descubre casos.

Las pruebas usan roles y teclado de Playwright, sin CDP, motores simulados,
resultados preparados, reintentos ni omisiones para aprobar el recorrido.
En WebKit móvil, Playwright no admite `mouse.wheel`: se comprueba `scrollBy`
real del DOM, contención CSS e independencia de las regiones. El informe anota
esa condición; no acredita la física de un gesto. Los controles configurados
para toque utilizan `tap`. Los otros proyectos comprueban rueda nativa.
