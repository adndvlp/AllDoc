# Práctica — punto 1: referencia, contratos y contexto

Estado: completado. Se implementaron los contratos, el registro de perfiles y el
resolver contextual con TDD. Pasaron 76 pruebas de código, ambos chequeos de tipos,
el build y la auditoría publicada. Son 16 casos nuevos sobre los 60 existentes.

[Evidencia roja](practice-point-1-red.json) ·
[Roja adicional](practice-point-1-red-extra.json) ·
[Roja de identidades vacías](practice-point-1-red-identities.json) ·
[Evidencia verde e integridad](practice-point-1-green.json) ·
[SDD](../practice-sdd.md).

## Contratos implementados

| Archivo | Responsabilidad |
| --- | --- |
| [contracts.ts](../../src/practice/contracts.ts) | Perfiles, capacidades, workspace, archivos, esquema, manifiesto y los tres adaptadores |
| [registry.ts](../../src/practice/registry.ts) | Registro extensible, perfil predeterminado por herramienta y carga explícita de fábricas |
| [profiles.ts](../../src/practice/profiles.ts) | Metadata SQL/SQLite y Python/pandas; ambos perfiles pendientes |
| [context.ts](../../src/practice/context.ts) | Ruta canónica → herramienta, perfil habilitado e identidad del workspace |
| [protocol.ts](../../src/practice/protocol.ts) | Validación de eventos v1 y respuestas de autocompletado |
| [guards.ts](../../src/practice/guards.ts) | Validaciones primitivas compartidas, sin dependencias de navegador |

SELECT y WHERE producen la misma clave de workspace al registrar un adaptador
habilitado. La clave combina herramienta, perfil, dataset y versión; no depende
del título, del concepto ni de una versión del motor. Cambiar de perfil o dataset
produce otra clave. No se infiere contexto de una categoría, portada, área o URL
desconocida.

El registro permite varios perfiles para una herramienta, con un predeterminado
inequívoco. Se rechazan IDs duplicados, metadata inválida y habilitación sin los
tres proveedores. Los perfiles y capacidades se copian y congelan para impedir
que una configuración externa cambie identidades ya registradas.

Las consultas de metadata y resolución no llaman loaders. `loadProviders()`
comparte la promesa de carga y conserva las fábricas resueltas, sin crear un motor.
Un fallo limpia la entrada fallida y permite reintentar. Instanciar e inicializar
entornos pertenece al futuro gestor de sesiones.

SQL y pandas están en `planned` y no publican loaders ficticios. En consecuencia,
el resolver de producción todavía no habilita práctica. Las pruebas inyectan
registros explícitos para comprobar SQL → pandas y un tercer lenguaje sin añadir
ramas específicas a la resolución. Ese tercer adaptador es un doble de prueba,
no un motor Rust implementado. La ficha pandas y el dataset pertenecen al punto 2.

## Protocolo y límites

El protocolo acepta progreso, stdout/stderr, tablas tipadas, errores y final de
ejecución. Rechaza versión o tipo desconocido, identidad inválida y eventos de
otra ejecución/generación/revisión. Las tablas mantienen null, vacío, booleanos y
números; enteros mayores al rango seguro y decimales precisos se transportan como
texto con tipo explícito. Un número inseguro no se acepta como entero normal.

Columnas y celdas se verifican juntas y se rechazan objetos, NaN y arrays
dispersos. Se permiten nombres de columna repetidos porque un resultado SQL
puede tenerlos; sus valores se conservan por posición. Hay un límite de 200 filas
y 200 columnas por evento; los tipos fecha se transportan como texto normalizado
por el adaptador, no se recalculan fechas aquí.

El autocompletado verifica solicitud, workspace, archivo, generación, revisión y
rango UTF-16 dentro del documento. La respuesta incorpora workspace y archivo,
además de los campos del boceto inicial del SDD, para validar su procedencia de
forma explícita.

Las interfaces concretan `RuntimeContext`, `RuntimeSchema` y los resultados de
materialización sin exponer handles SQLite o proxies Python. Las fábricas se
mantienen separadas de los loaders: cargar un módulo no equivale a construir su
entorno.

La política acumulada de salida en bytes, la terminación única, los temporizadores,
la cancelación y el descarte de resultados en una sesión real corresponden al
gestor del punto 3. Estos validadores de mensajes no sustituyen ese gestor.

## TDD y verificación

Se escribieron las expectativas y se ejecutaron con tipos resueltos y stubs de
comportamiento. La primera fase roja tuvo 12 fallos funcionales de 14 casos:
SELECT no resolvía contexto, los perfiles estaban ausentes y un evento de tabla
válido se rechazaba. No se contó un error de importación, navegador o permisos
como evidencia roja.

Tras implementar, los 14 casos pasaron. Una prueba adicional confirmó que
`Array.every` podía saltarse huecos y aceptar filas incompletas; falló con
`true !== false`. Se corrigió materializando esos huecos para validarlos. Se
añadió además una prueba con el preset cliente real de Babel/Docusaurus: la
resolución del registro y sus defaults funciona también con esa compilación.

La revisión final añadió una expectativa para IDs vacíos de autocompletado que
coincidían con los de una solicitud inválida. Se confirmó el fallo funcional y
se corrigió: coincidencia e identidad válida son ahora condiciones separadas.

| Comprobación | Resultado |
| --- | --- |
| `npm test` | 76 aprobadas; cero fallos, omisiones o cancelaciones |
| `npm run typecheck` | Aprobado |
| `npm run typecheck:tests` | Aprobado, incluidos contratos negativos con `@ts-expect-error` |
| Build de producción aislado | Aprobado |
| Auditoría publicada | Diez páginas, h1/zoom/rutas retiradas/cargador de portada aprobados |
| JS, CSS y HTML servidos | Inventario completo idéntico, incluidos hashes, al build previo |
| Dependencias | Sin instalaciones ni cambios de versiones/lockfile |

No se ejecutó la suite UI nuevamente: la app no consume aún estos módulos, y los
archivos JS/CSS/HTML servidos son idénticos a los ya verificados. Los contratos
se prueban en Node y con el preset cliente; la comprobación de carga de motores
en navegador se amplía cuando se conecte la UI.

## Referencia actual y procedencia

La fuente anterior a este punto es
`14f3739c0a2d727b772ce6e5f1f65123a3b068b3dfb56ab5161ea88022aeade2`.
Coincide exactamente con la [medición completa posterior al rediseño](../../benchmarks/runs/2026-11-14T00-03-39-837Z-14f3739c0a/README.md),
ya revisada en el [punto 8](point-8.md): 42 capturas y 300 muestras de acciones,
más dos aperturas frías. Esa medición se registra como referencia de la app sin
panel; no es una captura nueva de esta sesión.

Se intentó repetir `npm run baseline -- --post-redesign` antes de implementar.
El [build actual previo](../../benchmarks/runs/2026-11-14T04-24-34-687Z-14f3739c0a/README.md)
pasó, pero el servidor local falló con `listen EPERM`. Ese informe conserva
`partial`; no se completó ni se inventaron capturas. Su fuente, dependencias e
inventario coinciden con la referencia completa y se verificaron los hashes y
dimensiones de sus 42 imágenes originales.

Después de implementar se generó otro [build aislado](../../benchmarks/runs/2026-11-14T04-39-42-609Z-6bd01847db/README.md)
con `--bundle-only --post-redesign`. También conserva `partial` como registro de
captura porque no pidió navegador. Su build y auditoría pasaron, con exactamente
los mismos assets que los dos registros anteriores. Los 112 archivos anteriores
de aplicación permanecen iguales; solo se añadieron seis módulos en `src/practice/`.

La fuente de la fase verde es
`6bd01847dbbeb4bf9ec40a41db100f62a392e83aa0d48d363cb980d7ec4982d3`.
La evidencia verde conserva hashes de fuente, pruebas, referencia y capturas. No
modifica la medición histórica ni presenta sus 288 pruebas UI como una ejecución
nueva. No acredita todavía edición, ejecución SQL/Python en navegador ni cambios
visuales del panel; pertenecen a los puntos siguientes.
