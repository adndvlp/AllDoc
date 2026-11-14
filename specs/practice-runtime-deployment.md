# Runtime estático de práctica

SQL se ejecuta en SQLite WASM dentro de un Worker de otro origen. No hay API
de ejecución ni base de datos en Node. El servidor local entrega únicamente
los archivos declarados en el manifiesto de compilación.

## Desarrollo y pruebas

- `npm start`: app en `http://127.0.0.1:3000`, runtime en `http://localhost:3001`.
- `npm run build` y `npm run serve`: app compilada y el mismo runtime local.
- Playwright inicia automáticamente app en `127.0.0.1:4173` y runtime en
  `localhost:4174`; `npm run test:ui:sql` comprueba el motor real.
- `npm run build:runtime` genera `.runtime-build/`. No se versiona ese directorio.

Abrir la app local mediante `127.0.0.1`: el frame confía en ese origen exacto.
No basta cambiar el puerto del mismo hostname: las cookies no se aíslan por
puerto. Si se configuran otros orígenes, deben coincidir durante la compilación
de ambos sitios. Las variables de [.env.example](../.env.example) se exportan
en la terminal o en CI; no se carga ese archivo automáticamente.

## Publicación

1. Asignar dos orígenes HTTPS. El del runtime debe usar un dominio dedicado,
   sin cuentas, cookies ni recursos privados; evitar un dominio compartido al
   que las cookies de AllDoc puedan llegar con `Domain`.
2. Exportar `SITE_URL`, `PRACTICE_APP_ORIGIN` y `PRACTICE_ORIGIN` con esos valores.
3. Ejecutar `npm run build` para la app y `npm run build:runtime` para el runtime.
4. Publicar `build/` en el origen de la app y `.runtime-build/` en el del runtime.
5. Aplicar las cabeceras de `.runtime-build/_headers` a **todos** los archivos
   del runtime, incluidos los Workers. El archivo usa el formato de hosts
   estáticos compatibles; en otros hosts hay que configurar sus equivalentes.
6. Entregar `.wasm` como `application/wasm`, JavaScript como `text/javascript`;
   `frame.html` sin caché y assets con hash como inmutables. No activar CORS con
   credenciales ni añadir COOP/COEP globalmente a AllDoc para este adaptador.
7. Verificar en ese despliegue consultas y aislamiento antes de considerarlo
   listo. El build local no acredita la configuración de cabeceras de un host.

`runtime-manifest.json` registra orígenes, CSP, nombres permitidos y SHA-256.
El iframe tiene `allow-scripts allow-same-origin` en el origen separado; no
recibe permisos de navegación superior, formularios o ventanas. La CSP de
AllDoc limita los frames al origen del runtime, impidiendo navegar ese frame
al origen de la aplicación. La CSP del runtime limita conexiones y Workers a
su propio origen. La descarga de WASM usa `credentials: omit`.

El frame acepta una única conexión del padre y origen compilados, y transfiere
un MessagePort privado. Cada petición y respuesta valida protocolo, sesión,
identidad y datos; las tablas y errores se renderizan como texto. El servicio
estático local permite solo GET/HEAD sobre archivos del manifiesto.

## Límites de esta entrega

- Dialecto SQLite, con el manifiesto fijado al paquete instalado; no promete
  compatibilidad con todas las variantes de SQL.
- Base en memoria, tres productos iniciales. Recargar o reiniciar pierde
  cambios de datos y tablas; el código tiene guardado independiente.
- Límite de ejecución de 10 segundos. Detener destruye el frame/Worker; al
  ejecutar de nuevo se crea un entorno limpio y se conserva el borrador.
- Vista de resultados de hasta 200 filas y salida de hasta 1 MiB por ejecución.
  Se indica truncamiento; no se inventa un total para una consulta interrumpida.
- Inspección de hasta 200 entidades, con vistas previas de hasta 20 filas por
  tabla, 200 filas y 512 KiB en conjunto. Las vistas muestran su estructura;
  consultarlas requiere ejecutarlas explícitamente.
- SQLite limita sus asignaciones a 32 MiB, además de límites de longitud SQL,
  valores y columnas. Esta cifra no es un límite de toda la memoria de JS/WASM.
- Extensiones de archivos, ATTACH/DETACH y pragmas que eludan esas restricciones
  se rechazan. No hay acceso de práctica a APIs de red.
- pandas sigue editable con ejecución pendiente; Pyodide corresponde al punto 6.

La comprobación actual de orígenes rechaza el mismo hostname y exige HTTPS
fuera de loopback. No utiliza una heurística de sufijos para certificar sitios
independientes: el dominio dedicado sin cookies es un requisito del despliegue.
