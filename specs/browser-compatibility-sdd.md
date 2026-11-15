# AllDoc — SDD de pruebas automáticas en Firefox y WebKit

**Fecha:** 14 de noviembre de 2026, America/Mexico_City.  
**Estado:** puntos 1 y 2 completados; puntos 3 a 5 pendientes. [Evidencia del punto 1](verification/browser-point-1.md). [Evidencia del punto 2](verification/browser-point-2.md).
**Objetivo:** comprobar automáticamente el comportamiento de AllDoc y su práctica SQL/pandas en los motores Firefox y WebKit de Playwright.  
**Alcance solicitado:** únicamente las pruebas automáticas del punto 1. No incluye pruebas en aparatos físicos ni publicación de la app.

## 1. Base comprobada

El [SDD de práctica](practice-sdd.md) está completado. Su [aceptación global](verification/practice-point-8.md), incluida en el commit `54ee2bf`, registra 192 pruebas de código, 558 pruebas de UI aprobadas, nueve omisiones previstas y 24 presupuestos de rendimiento aprobados. Hay 165 referencias visuales revisadas. Es evidencia de la configuración Chromium utilizada, no de Firefox o WebKit.

La configuración actual y los puntos que necesita ampliar esta entrega son:

| Pieza actual | Estado observado | Cambio necesario |
| --- | --- | --- |
| `playwright.config.ts` | Siete tamaños, todos con `browserName: 'chromium'` | Conservar esa suite y añadir una configuración específica para los otros motores |
| `tests/ui/global-setup.ts` | Comprueba únicamente que arranca Chromium | Comprobar solo los motores seleccionados por la nueva ejecución, antes de construir o lanzar casos |
| `scripts/lib/practice-browser.mjs` | `crossBrowserSmoke` ejecuta un filtro SQL y otro pandas a 1280×800 | Ampliar la cobertura funcional y visual con casos identificables por motor y tamaño |
| `scripts/verify-practice.mjs` | Las comprobaciones opcionales pueden informar `not-installed` | Un comando dedicado debe exigir ambos motores para cerrar esta entrega |
| Medición de práctica | Utiliza CDP e instrumentación de Chromium | Mantenerla separada de esta validación funcional |

Los dos casos básicos existentes acreditan carga del editor, ejecución y datos del filtro cuando pasan. No acreditan por sí solos autocompletado, persistencia, foco, navegación o scroll en esos motores.

## 2. Alcance y restricciones

Esta entrega incorpora configuración, pruebas, referencias visuales y un informe reproducible. Si una prueba revela una incompatibilidad de la aplicación, se corrige con TDD y se conserva el comportamiento esperado en los tres motores.

Se mantienen el stack actual, negro puro, ocho acentos saturados, resaltado, fichas compactas, encabezado, categorías, grupos y ausencia de footer global. También los contratos de práctica, datos de productos, límites de ejecución, aislamiento y versiones fijadas de SDK/WASM/wheels.

No incluye:

- Dispositivos físicos, Safari instalado por Apple, Chrome o Edge comerciales.
- Despliegue, dominios, HTTPS público, granjas de dispositivos o servicios externos de pruebas.
- Adaptadores nuevos, más lenguajes o librerías de práctica.
- Una nueva campaña de rendimiento de Firefox/WebKit ni equivalencias con INP de campo.
- Multiplicar automáticamente los 558 casos actuales por cada combinación nueva.

Las distribuciones Firefox y WebKit de Playwright son las utilizadas por su automatización. En particular, un resultado WebKit no se rotula como una prueba de Safari comercial. [Documentación de navegadores de Playwright](https://playwright.dev/docs/browsers).

## 3. Matriz inicial

La nueva suite ejecuta el mismo conjunto funcional en seis proyectos:

| Proyecto propuesto | Motor | Viewport CSS | Configuración de interacción |
| --- | --- | --- | --- |
| `firefox-estrecho` | Firefox | 390×844 | Ventana estrecha, teclado y puntero; `isMobile: false`, `hasTouch: false` |
| `firefox-tableta` | Firefox | 768×1024 | Ventana intermedia, teclado y puntero; `isMobile: false`, `hasTouch: false` |
| `firefox-escritorio` | Firefox | 1280×800 | Escritorio, teclado y puntero |
| `webkit-estrecho` | WebKit | 390×844 | Emulación móvil de Playwright, teclado y eventos táctiles habilitados |
| `webkit-tableta` | WebKit | 768×1024 | Emulación de tamaño tableta, teclado y eventos táctiles habilitados |
| `webkit-escritorio` | WebKit | 1280×800 | Escritorio, teclado y puntero |

Firefox se configura aquí para verificar el diseño por ancho de ventana. Es una decisión de cobertura: no se afirma que reproduzca Firefox de Android ni se deduce una limitación de su API. En WebKit se declaran explícitamente las opciones de emulación. Ningún proyecto representa hardware real.

Condiciones comunes: modo oscuro, `locale: 'es-MX'`, escala de dispositivo 1 y movimiento reducido. Los nombres y referencias de los siete proyectos Chromium actuales permanecen intactos.

Los casos de adaptación añaden 320 px, texto al 200% y cambio entre 390×844 y 844×390 dentro de las pruebas correspondientes. No es necesario multiplicar toda la matriz por esos estados. Cambiar el viewport prueba la adaptación de la ventana; no acredita sensores de orientación ni un teclado virtual físico. [Emulación de Playwright](https://playwright.dev/docs/emulation).

## 4. Diseño de las pruebas y ejecución

### 4.1 Configuración separada

Se propone `playwright.cross-browser.config.ts`, con los seis proyectos y un conjunto de casos bajo `tests/cross-browser/`. Compartirá con la suite actual las opciones y utilidades que realmente sean comunes, sin importar ni ejecutar accidentalmente la suite completa o su preflight exclusivo de Chromium.

Las operaciones de usuario reutilizarán helpers existentes cuando sean portables. Si un helper está unido a Chromium o al formato de su informe, se separará la parte común con una prueba que conserve su comportamiento. No se copiarán suites completas para modificar únicamente `browserName`.

Los casos nuevos usan DOM, roles accesibles y APIs de Playwright disponibles en ambos motores. CDP, manipular un `visualViewport` para simular teclado o APIs de observación específicas no serán requisitos del flujo funcional común. Una capacidad ausente exige comprobar la alternativa que utiliza la aplicación o declarar exactamente la cobertura que no puede acreditarse; no saltarse silenciosamente el comportamiento central.

La configuración nueva y los helpers se incorporarán al control de tipos de pruebas.

### 4.2 Comprobación previa e instalación

La instalación explícita será:

```sh
npx playwright install firefox webkit
```

El preflight abrirá y cerrará una instancia de cada motor seleccionado y registrará sus versiones. Si falta un ejecutable o no puede arrancar, terminará con un único diagnóstico útil antes del build y los casos. No repetirá el mismo error por cada prueba ni descargará binarios de forma implícita al validar.

Una selección de Firefox comprueba Firefox; una selección de WebKit comprueba WebKit. El comando completo exige ambos. La falta de un motor requerido deja el resultado incompleto y el proceso con código distinto de cero, aunque el otro pase. El comportamiento opcional del informe histórico de práctica no se cambia retroactivamente.

Al implementar se comprueba la versión estable actual de Playwright y su compatibilidad con el proyecto. Las dependencias conservan la política `latest` y el lockfile reproducible; cualquier actualización efectiva se registra junto con sus nuevos binarios. No se sustituyen SDK/wheels o runtimes ajenos a esta entrega para resolver un problema de instalación. [Instalación y versiones de navegadores](https://playwright.dev/docs/browsers).

### 4.3 Servidores y build

El verificador compilará app y runtime de producción con orígenes locales separados y coherentes, usando directorios temporales y puertos propios. Reutilizará las utilidades ya verificadas del punto 8, incluido el resolvedor que contempla HTML hermano con directorio de fichas y la auditoría de todas las rutas publicadas.

El build de aplicación y runtime se hace una vez por ejecución de la matriz, no una vez por caso o motor. Los contextos de navegador permanecen aislados por prueba. Se reutiliza la caché local de wheels fijados; el build no descarga paquetes ni cambia sus versiones. La ejecución SQL/Python sigue ocurriendo en el navegador.

Se conservan CSP, sandbox del iframe, validación del puente, MIME y Content-Length. No se habilitan permisos, almacenamiento compartido, red adicional o `bypassCSP` para hacer pasar un navegador. Los recursos se liberan al terminar o fallar. La herramienta no reutiliza ni detiene un servidor personal, ni sobrescribe su directorio `.runtime-build`.

### 4.4 Comandos previstos

El punto 2 incorpora los dos primeros comandos, inicialmente limitados a escritorio. Los comandos de referencias y aceptación consolidada se incorporan en los puntos posteriores:

| Comando propuesto | Alcance |
| --- | --- |
| `npm run test:browser:smoke` | Primera comprobación, un caso SQL y uno pandas por motor, en escritorio |
| `npm run test:browser` | Punto 2: veinte casos de escritorio; admite selección con `--project=nombre` y `--grep=expresión`. El punto 3 ampliará los tamaños y comportamientos |
| `npm run test:browser:update` | Generar únicamente las nuevas referencias de Firefox/WebKit, después de revisar los resultados funcionales |
| `npm run verify:browser` | Preflight, código/tipos pertinentes, build, matriz estricta, invariantes e informe final |

Los filtros permiten repetir solo el caso y motor que falló. La ejecución dedicada no relanza los 24 benchmarks Chromium ni toda su suite por defecto. Si una corrección cambia código de aplicación o utilidades compartidas, se ejecutan primero sus regresiones Chromium afectadas; una única regresión completa de la suite actual cierra la entrega con la fuente final. Si cambia un camino medido de práctica, se repite también la medición afectada y la comprobación final necesaria.

## 5. Cobertura funcional obligatoria

Los grupos siguientes se ejecutan en ambos motores. Las capacidades por disposición se identifican por separado; por ejemplo, el separador solo existe fuera del modo modal.

| ID | Comportamiento observable | Comprobación |
| --- | --- | --- |
| CB-01 | La portada y las tres áreas cargan, hidratan y navegan | Estado HTTP correcto, un título principal, catálogo real y áreas vacías sin contenido ficticio |
| CB-02 | Categorías y grupos despliegan sin navegar; un concepto sí navega | Orden y contracción inicial, expansión independiente, URL y título del concepto |
| CB-03 | Encabezado, selector de área y menú se pueden utilizar con teclado y puntero | Controles accesibles, apertura/cierre y foco visible; toque en los proyectos configurados para ello |
| CB-04 | El buscador encuentra y abre conceptos | Consulta, sugerencias reales, flechas, Enter, Esc, consulta conservada y retorno del foco |
| CB-05 | Práctica, búsqueda y temas mantienen un solo diálogo modal | Suspender y reanudar, cierre exterior cuando corresponda y adaptación al redimensionar |
| CB-06 | Abrir la práctica carga un editor real, sin ejecutar el ejemplo | Editor CodeMirror editable, controles activos al prepararse y ausencia de resultados inventados |
| CB-07 | El editor mantiene teclado y edición | Escritura, selección, deshacer/rehacer, Tab para salir y atajo de ejecución con el mismo permiso que el botón |
| CB-08 | SQL completa esquema y palabras | Sugerencia de SELECT, tabla productos y columna precio; elegir una sugerencia inserta el texto correcto |
| CB-09 | pandas completa con Jedi y columnas registradas | `pd.Da` ofrece DataFrame; `productos["pre` ofrece precio; completar no ejecuta el documento |
| CB-10 | SQLite ejecuta y modifica datos reales | Filtro con WHERE/ORDER BY, columnas y números esperados, mutación y reinicio sin sustituir el código |
| CB-11 | Pyodide/pandas ejecuta y mantiene su sesión | Filtro real, precio numérico, variable/columna persistente entre ejecuciones y reinicio limpio |
| CB-12 | Borradores y contexto son independientes | SELECT/WHERE comparten SQL; SQL ↔ pandas conserva cada código; recarga recupera borradores sin ejecución automática |
| CB-13 | Probar, recuperar y restaurar código son acciones explícitas | Revisión anterior recuperable y datos mutados conservados cuando solo se restaura código |
| CB-14 | Detener, timeout y errores conservan una interfaz utilizable | Un caso de cancelación y otro de timeout por motor de ejecución, error con ubicación y posterior ejecución correcta |
| CB-15 | Resultados son datos seguros y están acotados | Selección del código, cero filas, null/texto, HTML mostrado como texto y aviso de salida truncada |
| CB-16 | El origen de AllDoc permanece inaccesible desde la práctica | Frame/Worker del origen separado, lectura/red del origen de app rechazadas y ejecución real posterior |
| CB-17 | Las regiones de lectura y práctica desplazan de forma independiente | Lector/sidebar según disposición; editor y tabla con contenido suficiente; sin arrastre de la página ni scroll innecesario |
| CB-18 | El diseño conserva acceso con poco espacio | 320 px, texto al 200%, ventana horizontal y cambio de disposición; controles de cierre y código accesibles |
| CB-19 | Preferencias y guardado funcionan en el motor probado | Acento persistente, favoritos/recientes utilizables y borradores IndexedDB tras recargar |
| CB-20 | Un fallo recuperable no obliga a recargar la app | Carga inicial retrasada/fallida, cierre durante carga y reintento sin duplicar recursos; almacenamiento bloqueado conserva edición y muestra su alcance |

Se emplea el dataset existente `productos-basico@1`, con Teclado/Accesorios/500, Mouse/Accesorios/250 y Monitor/Pantallas/3500. Los resultados esperados proceden de ese contrato, no de respuestas preparadas por el test. No se simulan los motores, sus sugerencias o sus tablas para acreditar CB-08 a CB-16.

Para limitar el coste sin perder identidad de las comprobaciones:

- CB-01 a CB-13 y CB-16 a CB-19 forman la matriz de seis proyectos, separando los casos que necesiten estado propio.
- Los bucles intencionados de CB-14 y las descargas bloqueadas de CB-20 se ejecutan al menos una vez por Firefox/WebKit en escritorio. Su informe los distingue de la cobertura por tamaños.
- En CB-15 se comprueban tabla y salida segura en la matriz; los programas grandes de truncamiento pueden concentrarse en escritorio por motor.
- Los casos exclusivos de una disposición se asignan a proyectos que la ejerciten. Un test omitido en modo modal no acredita un separador; debe existir un caso aprobado en disposición dividida para cada motor.

La lista de pruebas descubiertas se contrasta con estos requisitos antes de cerrar. No se fija de antemano un total de casos aprobados ni se acredita un grupo únicamente porque exista un archivo con ese nombre.

## 6. Esperas, portabilidad y correcciones

Se espera a estados observables: hidratación, aparición del editor, botón habilitado, opción exacta, fin de ejecución o cambio de URL. No se usan pausas arbitrarias para ocultar carreras. Las sugerencias se seleccionan mediante su etiqueta exacta y se comprueba el texto insertado.

Los límites de espera de pruebas son operativos, separados de los presupuestos de rendimiento. Como punto de partida: 30 s para interacción ordinaria y hasta 120 s para un caso que prepare o reinicie Python; la espera de motor respeta su plazo de inicialización vigente. Cualquier ajuste posterior se liga a la fase observada y se documenta. No se alarga el timeout de ejecución de 10 s de la aplicación.

Se comprobarán especialmente los diálogos y su foco, eventos de cierre, alternativas al cierre exterior nativo, geometría y scroll, Workers/WASM, entrega de paquetes e IndexedDB. Si un navegador expone un fallo, el resultado esperado sigue siendo el mismo: se corrige el código común o la adaptación de capacidad concreta. No se aceptan tablas distintas, aislamiento reducido, una sugerencia ficticia o saltarse el caso por su `browserName`.

Las diferencias de renderizado se resuelven con referencias por proyecto y entorno. Las diferencias funcionales se explican con una reproducción y una corrección; no se esconden como una diferencia de captura.

## 7. Referencias visuales

Cada proyecto nuevo guarda sus propias referencias, separadas de las 165 existentes. La ruta propuesta es `tests/cross-browser/__screenshots__/{projectName}/`, con un manifiesto de entorno que registra SO, arquitectura y versiones. Las capturas de un entorno distinto requieren referencias propias o una regeneración explícita y revisada; no se comparan silenciosamente entre plataformas. [Comparaciones visuales de Playwright](https://playwright.dev/docs/test-snapshots).

Estados mínimos de captura:

1. Portada con catálogo y buscador.
2. Práctica SQL: código, datos y resultado real.
3. Práctica pandas: código, sugerencias visibles y resultado real.
4. Convivencia de práctica con búsqueda/temas en ventana estrecha y el estado aplicable al resto de disposiciones.
5. Texto al 200% y ventana reducida en los proyectos estrechos.

Se espera a fuentes, logos, datos y estados concretos antes de capturar. Animaciones y cursor se estabilizan para comparar; no se ocultan código, resultados o controles relevantes. En los proyectos nuevos se parte de la tolerancia actual `maxDiffPixelRatio: 0.001`, sin ampliarla para aprobar una incompatibilidad.

La primera generación no equivale a aprobación. Se inspeccionan las imágenes y se guarda su revisión; después se ejecuta una comparación independiente sin actualización de referencias. El comando final no acepta nuevas referencias automáticamente y comprueba que sus hashes permanecieron iguales durante la ejecución.

## 8. TDD y evidencia

Se mantiene TDD para todo cambio de comportamiento:

1. Escribir la expectativa o seleccionar un caso existente que la exprese.
2. Ejecutarlo contra el comportamiento anterior y conservar un fallo funcional concreto.
3. Aplicar la corrección mínima en configuración, herramienta o app.
4. Comprobar el caso en verde, los casos vecinos afectados y la regresión que corresponda.
5. Revisar resultados y capturas antes de aceptar referencias nuevas.

La matriz, selección de motores, preflight y evaluación del informe tienen pruebas de código. Deben rechazar, entre otros, un proyecto ausente, un motor requerido omitido, selección que dependa injustificadamente de Chromium, resultados vacíos, casos no ejecutados, fallos, interrupciones, casos inestables y referencias cambiadas durante la comparación estricta.

La ausencia de binarios, errores de red, permisos o falta de un módulo no cuentan como fase roja funcional. Añadir una prueba portable que ya pasa tampoco se presenta como un fallo previo: se registra como cobertura adicional. Las incompatibilidades descubiertas sí conservan su rojo/verde real, sin introducir defectos artificiales para producir una captura roja.

El informe estará bajo `benchmarks/browser-verifications/<fecha>-<fuente>/`, con:

- Fuente, commit base cuando exista, versiones de paquetes/binarios, SO y configuración efectiva de cada proyecto.
- Hashes de herramientas, manifiestos de runtime, inventarios, referencias visuales y resultados originales.
- Casos descubiertos/ejecutados, archivo, nombre, motor, viewport, estado y duración; omisiones justificadas por capacidad/disposición.
- Resultados por CB-01 a CB-20; las ejecuciones parciales señalan qué requisito falta.
- Evidencia TDD, capturas revisadas y trazas Playwright de los fallos, archivadas antes de que otra ejecución sobrescriba `test-results/`.
- Estado `partial`, `ready-for-review` o `complete`, con las comprobaciones que sustentan cada transición.

Los resultados de fases anteriores permanecen intactos. Si se reúnen ejecuciones separadas, se comprueban fuente, versiones, configuración y referencias compatibles, y se conservan las diferencias de herramienta revisadas. Se recalculan los estados a partir de casos reales; no se adopta un resumen favorable sin sus datos.

## 9. Progreso y coste de ejecución

La terminal debe mostrar avance mientras corre la suite, no únicamente el nombre de la etapa. El verificador emitirá, al menos cada 30 s mientras siga activo, motor/proyecto, aprobadas, omitidas, fallidas y tiempo transcurrido. Si un caso tarda, identifica el caso y la fase. Las advertencias y trazas extensas van al log; un fallo muestra un diagnóstico breve y la ubicación del informe. [Reporters de Playwright](https://playwright.dev/docs/test-reporters).

Se comienza con un máximo de dos workers y sin reintentos que conviertan automáticamente un fallo en aprobación. El consumo real de Python y el tiempo por proyecto se registran para ajustar concurrencia con datos. No se comparte la VM entre casos que necesitan independencia para acelerar el resultado.

Durante una corrección se ejecuta primero el caso/motor afectado. La matriz completa y la comparación visual estricta se hacen al final con fuente estable; no se repiten por cada cambio documental. Si se interrumpe, se liberan servidores y Workers propios y se conserva un resultado parcial.

## 10. Criterios de cierre

| ID | Condición para completar esta entrega |
| --- | --- |
| CA-01 | Firefox y WebKit requeridos arrancan y sus versiones quedan registradas; no hay una aprobación basada en `not-installed` |
| CA-02 | Los seis proyectos existen y su configuración efectiva coincide con la matriz declarada |
| CA-03 | CB-01 a CB-20 tienen los casos aprobados exigidos por motor y tamaño; las omisiones no eliminan cobertura obligatoria |
| CA-04 | SQL y pandas ejecutan los motores reales con resultados y tipos correctos |
| CA-05 | Autocompletado, contexto, persistencia, recuperación, cancelación y timeout conservan sus contratos |
| CA-06 | Diálogos, foco, navegación, scroll y tamaños reducidos están comprobados en cada motor |
| CA-07 | Aislamiento y entrega de assets permanecen verificados sin permisos o cabeceras que eviten las restricciones |
| CA-08 | Las referencias nuevas fueron inspeccionadas y una ejecución posterior las compara sin actualización ni cambios de hashes |
| CA-09 | Las 165 referencias y los siete proyectos Chromium no se sobrescribieron; la regresión Chromium final pertinente está aprobada |
| CA-10 | Código, tipos, build y herramientas modificadas pasan sus comprobaciones con TDD; no hay fallos ni casos inestables escondidos |
| CA-11 | El informe conserva procedencia, casos reales, límites de cobertura y progreso observable; una ejecución interrumpida no queda completa |
| CA-12 | El cierre declara Firefox/WebKit de Playwright en el entorno registrado, sin atribuir pruebas físicas o Safari comercial |

El estado global `complete` se registra solo después de la revisión funcional y visual. CA-01 y CA-02 tienen evidencia en el punto 1: motores requeridos iniciados y seis proyectos configurados. El punto 2 acredita editor, sugerencias y ejecución de SQL/pandas en escritorio. La matriz completa y el cierre global permanecen pendientes de los puntos 3 a 5.

## 11. Secuencia de implementación

| Punto | Trabajo | Resultado revisable |
| --- | --- | --- |
| 1 | Registrar referencia actual, matriz, configuración dedicada y preflight por selección, con TDD | Completado: [evidencia](verification/browser-point-1.md), 208 pruebas de código, tipos y arranque/cierre real de Firefox/WebKit con Playwright 1.65.1; configuración Chromium y 165 referencias intactas |
| 2 | Ampliar la comprobación básica a editor, sugerencias y ejecución real SQL/pandas en escritorio | Completado: veinte casos reales aprobados, ocho capturas de diagnóstico revisadas, 218 pruebas de código, tipos y build; [evidencia](verification/browser-point-2.md) |
| 3 | Completar navegación, diálogos, persistencia, adaptación, scroll, aislamiento y errores de la matriz | CB-01 a CB-20 con cobertura por proyecto y sin omisiones que sustituyan casos obligatorios |
| 4 | Generar y revisar las referencias propias de Firefox/WebKit | Capturas aprobadas, hashes y manifiesto del entorno |
| 5 | Ejecutar comparación estricta, regresión pertinente y aceptación consolidada | CA-01 a CA-12 con evidencia, progreso visible y alcance documentado |

## 12. Fuentes y límites de las afirmaciones

- [Navegadores de Playwright](https://playwright.dev/docs/browsers): instalación, binarios asociados a su versión y distribuciones automatizadas de Firefox/WebKit.
- [Proyectos](https://playwright.dev/docs/test-projects): selección explícita de navegador y configuración de los conjuntos de pruebas.
- [Emulación](https://playwright.dev/docs/emulation): viewport y capacidades configuradas; no acredita un aparato físico.
- [Comparaciones visuales](https://playwright.dev/docs/test-snapshots): referencias propias por navegador/plataforma y necesidad de un entorno consistente.
- [Reporters](https://playwright.dev/docs/test-reporters): salida observable y resultados estructurados de ejecución.
- [Timeouts](https://playwright.dev/docs/test-timeouts): plazos de prueba y aserción, distintos del timeout del programa ejecutado por la app.

La matriz, los comandos y la selección de cobertura son decisiones de este diseño. El punto 1 verifica configuración y preflight. El punto 2 verifica la práctica real de escritorio en Firefox/WebKit y conserva su revisión de diagnóstico. La matriz restante, referencias visuales y aceptación consolidada corresponden a los puntos 3 a 5.
