# Runtime estático de práctica

SQL se ejecuta en SQLite WASM y pandas en Pyodide, dentro de Workers de otro origen. No hay API
de ejecución ni base de datos en Node. El servidor local entrega únicamente
los archivos declarados en el manifiesto de compilación.

## Desarrollo y pruebas

- Después de `npm install` o `npm ci`, ejecutar `npm run prepare:python` una vez
  para preparar el caché local de wheels. Reutiliza las versiones y SHA-256
  versionados; si los archivos ya están presentes no necesita red.
- `npm start`: app en `http://127.0.0.1:3000`, runtime en `http://localhost:3001`.
- `npm run build` y `npm run serve`: app compilada y el mismo runtime local.
- Playwright inicia automáticamente app en `127.0.0.1:4173` y runtime en
  `localhost:4174`; `npm run test:ui:sql` y `npm run test:ui:python` comprueban
  ambos motores reales.
- `npm run build:runtime` genera `.runtime-build/`. No se versiona ese directorio.
- `.python-packages/` contiene el caché descargado y tampoco se versiona.
  `src/practice/adapters/python/packages.ts` sí se versiona: fija ABI, versiones,
  URLs y hashes. `npm run update:python` resuelve las versiones estables actuales
  de Jedi/Parso y las compatibles con la distribución instalada de Pyodide.
  `npm run update:stack` incluye ese paso antes de validar el stack.

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
3. Ejecutar `npm ci`, `npm run prepare:python`, `npm run build` para la app y
   `npm run build:runtime` para el runtime. El build verifica el caché y no
   descarga paquetes ni resuelve versiones nuevas.
4. Publicar `build/` en el origen de la app y `.runtime-build/` en el del runtime.
5. Aplicar las cabeceras de `.runtime-build/_headers` a **todos** los archivos
   del runtime, incluidos los Workers. El archivo usa el formato de hosts
   estáticos compatibles; en otros hosts hay que configurar sus equivalentes.
6. Entregar `.wasm` como `application/wasm`, `.js`/`.mjs` como `text/javascript`,
   wheels/ZIP como `application/zip`;
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
- SQL usa una base en memoria; pandas un namespace Python con el mismo dataset
  de tres productos. Recargar o reiniciar pierde
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
- pandas conserva variables entre ejecuciones. La última expresión DataFrame
  produce una tabla; también se admiten Series, stdout/stderr y errores con
  archivo/posición. Reiniciar Python crea otra VM para limpiar también módulos
  modificados, sin sustituir el borrador.
- El análisis usa Jedi sin ejecutar el documento. Las columnas se completan
  desde el esquema registrado, para la forma directa `productos["..."]` y
  equivalentes con comillas simples. No se promete inferencia universal ni
  analizar objetos del usuario mediante sus propiedades.
- La primera apertura de pandas descarga SDK, WASM, stdlib y paquetes desde
  el propio origen estático. No se descargan al leer apuntes ni al abrir SQL.
  Los paquetes se cargan explícitamente y se verifica la sugerencia de
  `pd.DataFrame` antes de anunciar el entorno listo.

La comprobación actual de orígenes rechaza el mismo hostname y exige HTTPS
fuera de loopback. No utiliza una heurística de sufijos para certificar sitios
independientes: el dominio dedicado sin cookies es un requisito del despliegue.
