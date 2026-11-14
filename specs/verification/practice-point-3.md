# Práctica — punto 3: gestor de sesiones y borradores

Estado: completado con TDD. Pasaron 111 pruebas de código, los tipos de app y
pruebas, build, auditoría de once páginas y cuatro casos con IndexedDB real.

[Roja inicial](practice-point-3-red.json) ·
[Roja de concurrencia](practice-point-3-races-red.json) ·
[Roja del fin con liberación](practice-point-3-end-red.json) ·
[Roja de reset obsoleto](practice-point-3-reset-red.json) ·
[Roja de reset durante ejecución](practice-point-3-active-reset-red.json) ·
[Verde e integridad](practice-point-3-green.json) ·
[Informe de navegador](practice-point-3-ui.json) · [SDD](../practice-sdd.md).

## Alcance y contrato de integración

| Archivo | Responsabilidad |
| --- | --- |
| [drafts.ts](../../src/practice/drafts.ts) | Workspace validado e inmutable, revisiones, hidratación, debounce, flush y estado de guardado |
| [indexeddb-drafts.ts](../../src/practice/indexeddb-drafts.ts) | Base v1 y transacciones atómicas de comparación/escritura, con copias recuperables |
| [session-manager.ts](../../src/practice/session-manager.ts) | Contexto, apertura, recursos, ejecución explícita, cancelación, reinicio y completado |
| [practice-session.ts](../../tests/fixtures/practice-session.ts) | Adaptadores controlados de prueba, sin ejecución SQL/Python |

El futuro proveedor React puede observar `getSnapshot()` y `subscribe()`, llamar
`setContext()` al navegar y abrir/colapsar explícitamente. El gestor recibe un
registro, un almacén y un bootstrap; no importa cuerpos de fichas, motores,
CodeMirror, datos pesados o APIs del navegador al construirse. El bootstrap es
inyectado: las versiones reales de entorno se conectarán con sus adaptadores.
El almacén tiene vida independiente y debe cerrarse mediante `close()` cuando
su propietario termine; `manager.dispose()` libera motores y encola el texto.

La apertura empieza desactivada. Navegar con el panel cerrado no lee IndexedDB
ni carga proveedores. Un contexto sin práctica oculta la vista y conserva la
intención; volver restaura esa intención. Una recarga construye otro gestor
colapsado y puede recuperar el texto persistido al abrir.

SELECT → WHERE mantiene motor, archivos, datos y resultados. SQL → pandas libera
el motor SQL, carga su propio borrador y prepara datos separados. No traduce el
código ni ejecuta automáticamente. Se muestra un aviso de datos iniciales al
reconstruir un entorno ya utilizado. Cambiar la versión del entorno conserva
el código y señala el cambio.

## Persistencia

La clave combina herramienta, perfil, dataset y versión. El formato guardado
contiene `formatVersion`, `storageRevision`, `savedAt` y `workspace`; el workspace
registra `environmentVersion`, archivos, archivo activo y revisión del documento.
La versión del guardado es independiente de la revisión de edición y del reloj.
No se persisten heap, streams, tablas de salida o intención de apertura.

`load()` comparte lecturas en curso; no escribe un ejemplo inicial al abrir.
`edit()` actualiza inmediatamente una copia inmutable y agrupa escrituras durante
300 ms. `flush()` serializa los guardados; si llega otra edición durante una
escritura, también guarda la última antes de terminar. Al navegar se encola ese
flush sin retrasar la publicación del contexto nuevo.

Se valida la clave lógica, el dataset versionado, las rutas relativas sin `..`,
los archivos duplicados, el archivo activo y los contadores. El total de código
se limita a 1 MiB en UTF-8. Hay un límite de 64 archivos por workspace. Un formato
persistido inválido/futuro no se sobrescribe automáticamente.

La base `alldoc-practice`, versión 1, tiene almacenes `drafts` y `recoveries`.
La lectura de versión y escritura ocurren en una sola transacción `readwrite`.
Si otra conexión guardó antes, el código local queda como copia recuperable y
el estado es `conflict`; no se sincroniza activamente la edición entre pestañas.
La API `recoveries(workspaceId)` entrega esas copias para la recuperación del
punto 7. Una excepción, denegación o timeout de almacenamiento mantiene el texto
con estado `memory`, destinado al aviso «Guardado en esta sesión» del panel.
No se accede a recientes, favoritos o paleta.

## Ciclo de vida y resultados

Una generación invalida cargas, sugerencias, inspecciones y resultados anteriores.
La carga tardía no reabre un panel cerrado. La instancia se publica antes de
esperar `init()`, por lo que puede disponerse aunque ese init ignore el aborto.
Solo se construye otro motor después de confirmar `dispose()`; si falla, el
gestor informa error en vez de asumir que se liberó.

Colapsar conserva un motor listo durante 60 segundos; al vencer el plazo libera
recursos. Colapsar durante una carga la cancela. Las señales y temporizadores se
limpian al cambiar de herramienta o disponer el gestor. El plazo de retención
es una política inicial: su coste de memoria en móvil se mide con motores reales.

`execute()` captura archivos, selección y revisión; editar durante la ejecución
no modifica esa petición. Los eventos deben cumplir el protocolo v1 y coincidir
en run, generación y revisión. El último resultado ocupa hasta 1 MiB de eventos
normalizados, con las 200 filas por tabla del protocolo. Si excede el presupuesto,
se conserva la salida recibida, se detiene y se avisa que fue truncada; no se
inventa un total de filas. Hay un solo evento terminal, incluso frente a un
timeout de 10 segundos, fin ausente, excepción o cancelación sin respuesta.

Se esperan hasta 250 ms para cancelar y para disponer cada recurso. Si cancelar
no responde se fuerza `dispose()`; los motores reales deben implementar allí
la terminación del Worker. El gestor no puede terminar por sí solo código
arbitrario en el hilo principal: esa garantía corresponde al aislamiento de
los puntos 5/6. Los plazos se pueden inyectar para pruebas deterministas.

Un reinicio conserva el texto y restaura el entorno mediante el adaptador.
Los reinicios simultáneos comparten una operación. Un reset viejo que ignore
AbortSignal no bloquea cambiar de herramienta ni sobrescribe el estado nuevo.
El completado se invalida al editar/cambiar contexto; mientras hay ejecución
no bloquea el editor esperando sugerencias. Una inspección tardía no reemplaza
el esquema de una ejecución posterior.

## Evidencia y límites

La roja inicial usa módulos resolubles y stubs: fallan la lectura compartida y
el estado colapsado. Los casos posteriores detectaron ejecución involuntaria del
contexto nuevo, motores duplicados durante un reset, fin prematuro antes de
liberar, bloqueo por un reset viejo y falta de preparación tras cancelar para
reiniciar. Se conservan hashes y salidas de cada fallo antes de corregirlo.

La suite de código tiene 111 casos, 27 nuevos: seis de borradores, veinte de
sesiones y uno con el preset cliente real de Docusaurus. Esa última comprobación
evita depender de la semántica nativa de iteración de Map/Set de Node.

Las cuatro pruebas de Chromium usan dos conexiones reales a IndexedDB, reabren
la base, verifican una sola escritura ganadora y su copia recuperable, y
recuperan archivos/revisiones. También simulan una denegación de acceso y
comprueban que el texto permanece en memoria. Corrieron en celular y laptop:
cuatro aprobadas, cero fallos, omisiones o resultados inestables. No son una
prueba de Safari/iOS físico ni de SQLite/Pyodide.

La sandbox no permite abrir el servidor local (`EPERM`) o Chromium. El intento
de Playwright desde ella terminó además con un fallo de arranque del servidor;
no cuenta como validación funcional. El usuario ejecutó los cuatro casos desde
su terminal. Se corrigió previamente el uso de `import.meta` en una prueba que
Playwright cargaba como CommonJS, y se verificó su colección antes del reintento.
El harness elimina tipos/módulos para evaluar los tres módulos reales en la
página; no agrega una ruta, un endpoint o un adaptador de prueba al producto.

No cambian componentes, CSS, fichas o referencias visuales. El build es solo de
inventario y auditoría: no se atribuyen a esta entrega capturas o mediciones de
interacción nuevas. El [build registrado](../../benchmarks/runs/2026-11-14T05-52-07-925Z-68412ecc98/README.md)
tiene 156181 bytes gzip de JS inicial frente a 156177 del punto 2: cuatro bytes
adicionales. El CSS inicial permanece en 21120 bytes y las 102 referencias
visuales conservan sus hashes. La fuente final es
`68412ecc98b2527b001610242fe962d00579cc60f3ef1b86c278e72253aa28ab`.
Las cifras y hashes completos están en la evidencia verde. No se
instalaron dependencias. Los perfiles SQL/pandas permanecen `planned`, y el
gestor todavía no se monta en la app. Panel/CodeMirror corresponden al punto 4;
ejecución real, aislamiento y completado de lenguaje a los puntos 5 y 6.
