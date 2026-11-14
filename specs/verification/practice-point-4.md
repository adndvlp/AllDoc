# Práctica — punto 4: panel responsive y CodeMirror

Estado: completado con TDD. Pasaron 122 pruebas de código, los tipos y el build.
La actualización final y su comparación independiente terminaron con 397 pruebas
UI aprobadas, nueve omisiones previstas y cero fallos o resultados inestables.

[Roja de contrato/disposición](practice-point-4-red.json) ·
[Roja de navegador](practice-point-4-ui-red.json) ·
[Integridad de esa roja](practice-point-4-ui-red-integrity.json) ·
[Roja del foco](practice-point-4-focus-red.json) ·
[Roja de perfiles futuros](practice-point-4-future-red.json) ·
[Roja de resultados](practice-point-4-output-red.json) ·
[Roja del tercer perfil](practice-point-4-third-red.json) ·
[Roja de coordinación al rotar](practice-point-4-rotation-red.json) ·
[Roja del control compacto](practice-point-4-compact-red.json) ·
[Revisión de referencias](practice-point-4-reference-review.json) ·
[Evidencia verde](practice-point-4-green.json) ·
[UI final con actualización](practice-point-4-ui-update.json) ·
[Comparación independiente](practice-point-4-ui-compare.json) ·
[UI focalizada](practice-point-4-ui-practice-update.json) · [SDD](../practice-sdd.md).

## Comportamiento y alcance

El control «Practicar SQL/pandas» vive en el borde inferior del lector de una
ficha compatible. No aparece en Inicio, áreas o categorías. Reserva espacio al
final del contenido y no altera el sidebar o el encabezado. Abrir una categoría
no cambia el workspace; lo determina la metadata canónica de la ficha.

`editorAvailability` distingue poder editar de poder ejecutar. Los dos perfiles
tienen edición habilitada y runtime `planned`. El resolver de ejecución sigue
rechazándolos; el de edición los acepta por declaración explícita. Añadir un
perfil futuro no activa automáticamente una preparación inexistente.

La UI permite editar, recuperar un borrador y consultar el dataset. «Ejecutar»
permanece desactivado y dice «La ejecución aún no está disponible». No se evalúa
el texto, no se inicializan Workers de ejecución y no se inventan resultados.
Los motores reales y sus proveedores semánticos corresponden a los puntos 5/6.
Las acciones de sustitución/restauración del código inicial siguen en el punto 7.

El panel ya consume el contrato de eventos independiente del motor. Presenta
streams como texto escapado, tablas semánticas, errores con ubicación, truncado
y el estado terminal. Una revisión anterior se identifica sin sustituirla por
una ejecución nueva. Los controles detener/reiniciar dependen del estado y de
la disponibilidad real. Un tercer perfil de prueba con etiqueta propia comprueba
esa presentación mediante SSR; no se registra en el producto ni se acredita como
lenguaje soportado.

## Carga y estado

`PracticeProvider` conserva la intención durante la navegación SPA. Importa
`practice-session` al abrir; CodeMirror se descarga después en `practice-editor`.
SQL y Python tienen chunks de lenguaje distintos. La portada y las fichas
cerradas no solicitan estos módulos. El materializador inicial vive fuera de los
cuerpos editoriales y usa `productos-basico@1`.

El gestor admite un bootstrap sin manifiesto de runtime únicamente para un perfil
pendiente de ejecución. Recupera texto y esquema inicial sin cargar proveedores.
El bootstrap ejecutable sigue exigiendo manifiesto. Una recarga inicia colapsada;
el borrador se recupera al abrir. Se encola `flush()` en `pagehide` como mejor
esfuerzo, sin prometer completar una escritura si el navegador termina el proceso.

Hay un `EditorView` y un `EditorState` conservado por workspace. Cambiar de acento
usa variables CSS: no reconstruye el editor ni borra historial o selección.
Cambiar de disposición conserva el mismo nodo. La revisión llega al almacén en
cada cambio, con guardado agrupado por el contrato del punto 3. Las respuestas de
carga/lenguaje tardías no reabren el panel ni cambian al workspace anterior.

SQL ofrece sugerencias de palabras, `productos` y sus columnas desde el esquema
inicial. Python completa palabras y variables locales con su extensión nativa.
No se anuncia Jedi, tipos de pandas, atributos `pd.DataFrame` o columnas inferidas
antes de implementar y verificar el proveedor real.

## Disposición y acceso

La medida viene del contenedor del lector, su altura disponible y el tamaño raíz.
El panel va en paralelo si caben 26 rem de lectura, 28 rem de práctica y el
separador; por debajo pasa a inferior si dispone de 40 rem de ancho y 38 rem de
alto. En pantallas estrechas, bajas o con texto ampliado usa modalidad completa.
Un elemento de 1 rem observado detecta cambios de escala incluso sin redimensionar
la ventana. La altura y el desplazamiento de `visualViewport` ajustan el diálogo
al teclado virtual.

El acceso usa una container query del lector con altura definida. Cuando no caben
24 rem de ancho o de alto pasa a icono de 44×44, con nombre accesible y tooltip
conservados. La revisión visual detectó una etiqueta de 289 px al 200% en
horizontal; esa referencia se rechazó y el caso quedó protegido por una prueba
geométrica antes de corregirlo. No se desactiva la ampliación del texto del apunte.

El separador admite arrastre con Pointer Events, flechas y Home/Inicio para
restablecer. Limita el tamaño para conservar un lector legible. Los paneles tienen
`min-height: 0`/`min-width: 0` y overflow según necesidad; editor y tablas contienen
su scroll. No se añade footer global ni se modifica el bloqueo existente del
scroll del documento.

En modalidad completa se usa `<dialog>.showModal()`; en el layout del lector se
usa `show()`. Esc, fondo inert y contención del foco son nativos. Al abrir por
navegación/restauración se enfoca antes el control «Practicar» para que el retorno
nativo tenga un invocador conectado. Esta decisión corrige el fallo observado
después de ir a Inicio y volver: el invocador anterior ya no existía.

Antes de abrir búsqueda/temas se suspende y cierra el modal de práctica. Al cerrar
el otro, se reanuda solo con contexto válido y la intención aún activa. No se
duplica el listener de Ctrl/Cmd+K ni se añade una trampa de foco. Cerrar durante
la descarga no reabre; un fallo de chunk ofrece reintento. Tab conserva la salida
del editor; Ctrl/Cmd+Enter solo se trata dentro de él y respeta composición IME.
Las pestañas admiten flechas, Home y End, con ARIA y paneles asociados.

Si la disposición pasa de lateral a modal mientras la búsqueda sigue abierta,
práctica espera en segundo plano. Rotar no cierra la búsqueda ni borra su consulta;
al cancelar, la práctica reaparece en la disposición nueva. Se verifica también
la transición inversa sin backdrop residual.

## Validación y límites

La fase roja de navegador falló esperando el botón «Practicar SQL» inexistente.
La salida `permission denied` del usuario se debió al salto de línea del comando;
no invalida el fallo funcional registrado. Después se añadió un script corto.
La fase roja de código usó stubs resolubles y fallos de disposición, contexto y
apertura para edición. Se registraron además los defectos de foco, independencia
de perfiles futuros y salida segura antes de corregirlos. El primer fixture SSR
del tercer perfil tenía toolKey incoherente; su registro se conserva, pero no se
cuenta como rojo válido de conformidad. El fixture final usa metadata canónica y
verifica etiqueta y controles del perfil independiente.

La primera suite focalizada terminó con 67 aprobadas y tres omisiones: el separador no
existe en los tres tamaños inicialmente modales. Incluye descargas tardías y
fallidas, reintento, borradores SQL ↔ pandas, recarga, búsqueda/temas/Inicio,
rotación, 200%, viewport visual reducido, teclado, acento, historial y scroll.
Se revisaron 28 imágenes nuevas —SQL, pandas, Datos y 200%— en los siete tamaños,
incluidas vistas originales de celular y la matriz de disposiciones. La
actualización global inicial registró 383 aprobadas; la final y la comparación
independiente registran 397 cada una, después de añadir los casos de rotación con
búsqueda y control compacto. Las nueve omisiones son seis heredadas y tres del
separador modal. Se revisaron también los 26 cambios de referencias anteriores;
76 conservan su hash y hay 130 referencias totales. La tolerancia permanece en
0.001; una imagen anterior puede permanecer si el cambio está dentro de ella.

La comparación conserva `updateSnapshots: default` y no cambió ningún hash de
referencia. Los informes y las pruebas están vinculados a la fuente final
`dc356e0a6ea067705ca35ef4b93876a35c6bbf03bf8d677201bb61f5bdc56a88`.

El [build final](../../benchmarks/runs/2026-11-14T06-53-24-277Z-dc356e0a6e/README.md)
audita once páginas. La portada declara 159016 bytes gzip de JS y 22358 de CSS:
2835 y 1238 bytes adicionales frente al punto 3, respectivamente. El incremento
conjunto de 4073 bytes cumple el presupuesto de 5 KiB. El cuerpo de CodeMirror
está en un chunk asíncrono de 109124 bytes gzip; el wrapper, gestor y lenguajes
tienen sus propios chunks. Estas cifras no prometen una primera apertura
instantánea. No se cargan cuerpos editoriales desde la portada.

El build de inventario mide descarga inicial y auditoría estática; no acredita
latencia de interacción o INP. Esos tiempos y los motores fríos/listos se medirán
en las fases de ejecución y aceptación global. Chromium se ejecutó desde la
terminal del usuario: la sandbox sigue devolviendo EPERM al abrir un servidor.
La emulación no equivale a una prueba física en iPad/iPhone ni valida Safari.

## Guía local aplicada

El CLI `modern-web-guidance` no estaba disponible sin registro de npm; se
consultaron los archivos de la copia local solicitada por el usuario, del
[repositorio GoogleChrome](https://github.com/GoogleChrome/modern-web-guidance),
commit `4dd968349e54ca45a05dd5c818fb035c9054b022`.

- [dialog](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/ui-components/dialog.md): «DON'T set display on dialog unconditionally». Se limita `display` a `[open]`; se usan las dos modalidades nativas, sin trampa de foco manual.
- [form-factor-adaptation](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/user-experience/form-factor-adaptation.md): «Let components respond to their container». El espacio del lector y el rem controlan la disposición; el contenido del estado usa una container query propia y controles de al menos 44×44 px.
- [prevent-page-scroll-under-modal-dialog](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/ui-behaviors/prevent-page-scroll-under-modal-dialog.md): «DO NOT apply overflow: hidden or position: fixed to html or body». No se altera el root para abrir modales; se contiene el scroll del diálogo y de su backdrop, con la degradación progresiva indicada para Safari.

Se comprobó también `conditional-async-dependencies`: no se necesitó un polyfill
o top-level await. Las importaciones se coordinan en efectos/funciones cliente,
compatibles con SSR. No se forzó una función de plataforma ajena al panel.
