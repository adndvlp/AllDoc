# Punto 8: verificación final y rendimiento

Estado: completado con TDD y revisión final. Pasaron 60 pruebas de código y
288 de UI, con seis omisiones previstas y ningún fallo o resultado inestable.
Se revisaron las 42 capturas de producción, las muestras y la traza de arranque.
CA-23 cumple el presupuesto local bajo las condiciones documentadas.

[Evidencia final e integridad](point-8-final.json) ·
[Revisión del informe](../../benchmarks/verifications/2026-11-13T23-59-10-902Z-14f3739c0a/review.md) ·
[Comparación antes/después](../../benchmarks/verifications/2026-11-13T23-59-10-902Z-14f3739c0a/comparison.md).

## Entrega

```sh
npm run verify:final
```

Este comando ejecuta código, tipos, comparación UI contra las referencias ya
revisadas, build aislado, auditoría publicada, capturas y mediciones de producción.
Genera un informe en `benchmarks/verifications/` y enlaza la nueva medición de
`benchmarks/runs/`. La referencia inicial permanece intacta. El modo `--code-only`
conserva lo comprobable sin navegador y termina deliberadamente como `partial`.

La [documentación del procedimiento](../../benchmarks/README.md) explica las
etapas, condiciones y artefactos. Una ejecución automática completa queda como
`ready-for-review`, hasta inspeccionar capturas y trazas. No se usa actualizar
snapshots como sustituto de una comparación final independiente.

## TDD y correcciones

### Herramienta de verificación

Las pruebas se escribieron antes del comparador. La fase roja funcional exigía
un resultado completo para dos ejecuciones válidas; el contrato inicial devolvía
pending. El error inicial de importación no se usó como evidencia roja.
Después se añadieron casos para procedencia incompleta, esquema desconocido,
HTML de scripts y separación del corpus. Evidencia: [point-8-red.json](point-8-red.json).

Las once pruebas nuevas comprueban presupuesto calculado desde muestras crudas,
valores ausentes o inválidos, treinta muestras por acción, pérdida de perfiles o
rutas, diferencias de navegador/CPU/viewport/red, cobertura parcial de Event
Timing, mil entradas sintéticas, HTML publicado y cuerpos fuera del cargador de
portada. Un resumen almacenado favorable no oculta muestras lentas.

### Atajo del buscador desde otra ventana

La prueba de navegador confirmó dos diálogos abiertos al usar Ctrl+K desde el
menú de temas: se esperaba uno. El primer intento sin Chromium no cuenta como
fase roja. Evidencia: [point-8-overlay-red.json](point-8-overlay-red.json).

El listener existente cierra el menú antes de abrir búsqueda y enfoca su control
visible, para que el retorno nativo del foco tenga un destino válido. Desde un
selector del encabezado se cierra el details y se enfoca su summary. Se conserva
un único listener del atajo y no se añade una trampa manual de foco.

Se escribieron tres casos para menú, área y color, incluyendo Esc y retorno a un
control visible. También se añade el caso explícito de URL directa de WHERE y
recarga con todos los grupos contraídos. Los cuatro casos nuevos pasan en los
siete proyectos de la ejecución final: 28 comprobaciones adicionales.

### Cuerpos descargados por la portada

El build anterior incluía el corpus SQL en common. El cargador de la portada
pedía ese chunk aunque solo necesitara catálogo y búsqueda. Una nueva prueba
hizo visible la falta de guardia y la auditoría de producción confirmó el fallo:
[point-8-bodies-red.json](point-8-bodies-red.json).

Los cuerpos se trasladaron a `src/content/notes/sql.ts`; `src/content/sql.ts`
conserva la API de los MDX. Una regla de Webpack separa los módulos de esa carpeta
por herramienta. Sirve también para futuros cuerpos, sin introducir librerías
ni cargar contenidos ficticios de las herramientas vacías.

La auditoría del build ahora muestra `notes-sql` entre los cuerpos y ninguno en
las dependencias de portada. Las ocho consultas y sus resultados se conservan;
se verificó que el archivo original y el trasladado coinciden al normalizar solo
las dos rutas de importación. [Evidencia verde de código y build](point-8-bodies-green.json).

## Verificación final

| Comprobación | Resultado |
| --- | --- |
| Pruebas de código | 60 aprobadas |
| Tipos de aplicación y pruebas | Aprobados |
| UI contra referencias revisadas | 288 aprobadas, seis omisiones previstas, cero fallos e inestables |
| Build de producción aislado | Aprobado |
| Auditoría HTML | Diez páginas, un h1 por página, sin contenido/rutas retirados ni zoom bloqueado |
| Cuerpos en carga de portada | Ninguno entre sus dependencias de chunks |
| Buscador sintético | 1000 IDs únicos y ranking conservado; 30 consultas en Node |
| Capturas nuevas de producción | 42 revisadas; hashes y dimensiones verificados |
| Comparación de tiempos | Completa, doce métricas con p95 inferior a 100 ms |

La [ejecución completa](../../benchmarks/verifications/2026-11-13T23-59-10-902Z-14f3739c0a/README.md)
se realizó desde la terminal del usuario y se revisó en el workspace. La huella
`14f3739c0a2d727b772ce6e5f1f65123a3b068b3dfb56ab5161ea88022aeade2`
coincide con los 112 archivos de aplicación; también coinciden los 24 archivos
de pruebas y herramienta. No se actualizaron las 88 referencias UI al validar.

Las seis omisiones son las previstas: scroll del sidebar de escritorio en los
cuatro tamaños compactos y rotación en laptop/escritorio. La revisión visual
cubre seis estados en siete tamaños, con inspección adicional de originales.
No se observaron defectos nuevos. Los tamaños cortos requieren scroll del panel;
la suite comprueba que controles y contenido siguen accesibles.

El ensayo sintético final prepara 1000 entradas en 1,40 ms y obtiene un p95 mixto
de 0,38 ms. Es una prueba del motor en Node, separada de la respuesta de la UI;
esas entradas no se añaden al catálogo.

La [ejecución local anterior](../../benchmarks/verifications/2026-11-13T23-55-00-195Z-14f3739c0a/README.md)
conserva su estado partial porque omitió navegador. La ejecución completa aporta
la evidencia de UI y rendimiento que faltaba, sin reescribir ese registro.

## Comparación y condiciones

Se conserva el núcleo del observador y de la medición del punto 1. El script
original se recuperó del commit de referencia y su hash coincide con el guardado.
Las diferencias de selección del input, predicados de favoritos y marcas de fase
están documentadas en [point-8-method.json](point-8-method.json).

La comparación usa treinta muestras de cuatro acciones comunes por perfil y
quince altas/quince bajas de favorito. Disponibilidad de campo y resultados
reutilizan las mismas aperturas. Favoritos no tiene una referencia anterior;
no se inventa una mejora respecto a una función ausente.

Se exige mismo equipo, stack, navegador, CPU, viewport, caché, movimiento y red
local. Los datos incompletos quedan pendientes y las condiciones distintas son
incomparable. El p95 local de 100 ms se aplica al proxy DOM + siguiente rAF
acordado. Event Timing conserva sus ausencias; no se convierte ese proxy en INP.

Las tareas mayores de 50 ms se guardan con fase de arranque o posterior a la
primera entrada. Cuando aparecen, la herramienta toma una reproducción con
tracing después de medir; no altera las condiciones de las treinta muestras.
La traza de esta ejecución se revisó y su alcance queda registrado a continuación.

### Respuesta con el índice cargado

Cada celda expresa p95 en milisegundos; hay treinta muestras por acción y perfil.

| Acción | Laptop antes | Laptop después | Celular antes | Celular después |
| --- | ---: | ---: | ---: | ---: |
| Abrir buscador | 32,1 | 32,0 | 30,9 | 31,6 |
| Resultados al abrir | 32,1 | 32,0 | 30,9 | 31,6 |
| Escribir `w` | 26,2 | 20,1 | 31,4 | 17,9 |
| Abrir WHERE desde resultado | 33,2 | 35,3 | 52,7 | 54,0 |
| Abrir/cerrar SQL | 32,4 | 33,0 | 31,6 | 31,3 |
| Guardar/quitar favorito | No existía | 33,0 | No existía | 30,8 |

El peor p95 es 54,0 ms y cumple el presupuesto local de 100 ms. Se conservan
300 muestras crudas, más dos aperturas frías. Resultados y campo reutilizan las
mismas aperturas, sin aumentar artificialmente el tamaño de muestra.
En 27 de las 30 escrituras por perfil no hay entrada Event Timing; esa falta de
cobertura permanece explícita. Los tiempos DOM se conservan sin llamarlos INP.

### Carga fría y tareas largas

La única apertura fría hasta resultados fue de 48,0 ms en laptop y 136,4 ms en
celular con CPU 4×, frente a 64,7 y 97,5 ms de referencia. El campo estuvo
disponible en 35,0 y 100,8 ms, respectivamente. El dato móvil aumentó; una muestra
no permite calcular un percentil ni concluir una regresión estable. Se informa
por separado del presupuesto con índice cargado.

La medición móvil registró una tarea de 142 ms entre 117,9 y 259,9 ms desde la
navegación, antes de la primera entrada a los 1066 ms; no registró tareas mayores
de 50 ms después de esa entrada. La referencia ya tenía una tarea de arranque de
141 ms. Laptop no registró tareas mayores de 50 ms.

La [traza móvil](../../benchmarks/runs/2026-11-14T00-03-39-837Z-14f3739c0a/diagnostic-celular.trace.json)
no perdió datos y corresponde a una reproducción separada. Registra
`EvaluateScript` de `main.87845c23.js` durante 51,614 ms antes de la marca de
interacción, sin eventos completos mayores de 50 ms después de esa marca.
No permite asignar la tarea original de 142 ms a una función exacta. No se
introduce otra optimización sin evidencia de un problema durante las acciones.

### Tamaños y carga de cuerpos

| Conjunto | Antes, gzip bytes | Después, gzip bytes | Cambio |
| --- | ---: | ---: | ---: |
| JS total del build | 198248 | 201730 | +3482 (+1,76%) |
| CSS total | 20886 | 21063 | +177 (+0,85%) |
| JS declarado por el HTML de portada | 158281 | 154901 | −3380 (−2,14%) |

El crecimiento total acompaña las capacidades nuevas de búsqueda compartida,
colecciones, catálogo y encabezado. El inventario conserva el reparto por chunk:
`main` baja de 156074 a 152643 bytes gzip; `common` pasa de 5670 a 15958, y aparecen
`notes-sql` de 1132 y `search-index` de 628. Otros chunks se redistribuyen. No se
atribuyen bytes exactos a una función ni se confunde el total con la descarga
inicial. El HTML declara menos JS, pero el runtime puede solicitar otros chunks.

La auditoría verifica que el cargador de portada no pide `notes-sql`; los cuerpos
se reservan para sus rutas. No se añadió una dependencia de búsqueda ni de estado.

## Matriz de aceptación

Las pruebas de la columna de evidencia pasaron en la ejecución final. Capturas,
métricas y trazas se revisaron por separado; los límites de dispositivos y datos
de campo se mantienen explícitos. Los puntos 2 a 7 conservan sus registros históricos.

| Criterio | Evidencia final |
| --- | --- |
| CA-01 — portada sin colecciones ficticias | catalog.spec.ts y personal-library.spec.ts, contexto vacío |
| CA-02 — 19 herramientas, cinco grupos y orden | catalog.test.ts, catálogo y menú responsive |
| CA-03 — contraídos, URL directa y recarga | caso explícito de WHERE en catalog.spec.ts |
| CA-04 — SQL despliega y WHERE navega | catalog.spec.ts y responsive.spec.ts |
| CA-05 — área conserva URL y consulta | catálogo y selector del encabezado |
| CA-06 — consultas pedagógicas y comentarios | search.test.ts, search-store.test.ts y search.spec.ts |
| CA-07 — ranking y desempate | motor real, pruebas de código y crecimiento sintético |
| CA-08 — índice compartido y diálogo único | búsqueda diferida y nuevos casos de atajo desde menú/selectores |
| CA-09 — error, reintento y carga tardía | intercepción del chunk del índice en search.spec.ts |
| CA-10 — recientes ordenados y acotados | personal-library.test.ts y navegación de biblioteca |
| CA-11 — favorito persistente y foco útil | personal-library.spec.ts, alta/baja por teclado |
| CA-12 — almacenamiento bloqueado/corrupto | biblioteca: pruebas de lógica y navegador |
| CA-13 — sincronización entre pestañas | personal-library.spec.ts, contextos compartidos |
| CA-14 — ocho consultas y resultados | sql.test.ts con SQLite, corpus trasladado sin cambios |
| CA-15 — envoltura, copia y resultados | notes.spec.ts |
| CA-16 — fichas compactas y texto ampliado | notes.spec.ts en siete proyectos |
| CA-17 — negro, ocho acentos y sintaxis | palettes.test.ts y notas en navegador |
| CA-18 — encabezado compacto y sin footer | header.spec.ts y capturas |
| CA-19 — scroll independiente y límites | encabezado, responsive y buscador |
| CA-20 — rotación y teclado | resize, visualViewport reducido y atajos desde overlays |
| CA-21 — 320 px, foco y 200% | encabezado y notas; movimiento reducido en la suite |
| CA-22 — metadata y rutas coherentes | catálogo, build y auditoría de diez páginas |
| CA-23 — comparación y presupuesto | comparison.json/md, muestras y revisión de trazas |
| CA-24 — repaso retirado ausente | auditoría del contenido y rutas publicados |
| CA-25 — anterior/siguiente | notes.spec.ts y revisión visual |

Chromium usa siete proyectos; rotación, menú y casos de reflujo redimensionan la
ventana cuando corresponde. No equivale a siete dispositivos físicos. Firefox
y WebKit no estaban instalados al preparar esta entrega; las comprobaciones
físicas de Safari/iOS y los datos de campo siguen fuera de esta evidencia.

## Modern Web Guidance

Se consultaron las guías locales de
[interaction-paint-timing](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/performance/interaction-paint-timing.md)
y [identify-inp-causes](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/performance/identify-inp-causes.md).
Se respeta «does not track subsequent asynchronous paints» al separar
presentación nativa observada, resultados disponibles y navegación.
El diagnóstico separa entrada, procesamiento y presentación cuando Event Timing
los emite; no se instala telemetría ni una dependencia de analítica en la app.
La guía de [dialog](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/ui-components/dialog.md)
se aplica conservando el diálogo y retorno de foco nativos, sin otro listener
global del atajo ni una trampa adicional.
