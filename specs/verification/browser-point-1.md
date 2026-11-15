# Compatibilidad — punto 1: referencia, matriz y preflight

Estado: completado. La matriz, configuración y preflight pasan 208 pruebas de
código y ambos controles de tipos. Playwright está actualizado a 1.65.1;
Firefox 159.0 y WebKit 27.2 arrancaron y cerraron correctamente.

La [aceptación del punto 1](browser-point-1-green.json) conserva referencia,
versiones, configuración, comprobaciones de selección y arranque real. Este
punto acredita la preparación de las pruebas; los casos funcionales de AllDoc
en Firefox/WebKit comienzan en el punto 2.

## Referencia anterior a los cambios

La [referencia de archivos y configuración](../../benchmarks/browser-verifications/2026-11-15T02-48-24-937Z-eab186a574/reference.json)
registra el commit `54ee2bf`, la fuente `eab186a574`, siete proyectos Chromium,
165 referencias visuales con SHA-256, herramientas y revisiones de navegadores.
Incluye la procedencia del cierre del punto 8 de práctica.

Es una referencia del repositorio, no una ejecución nueva de la app ni una
aprobación de los navegadores que faltaban. Los archivos de referencias
anteriores no se actualizan para preparar esta etapa.

La [comprobación de versión](browser-point-1-version-check.json) encontró
Playwright estable 1.65.1 en el registro oficial, frente a 1.65.0 instalado entonces.
El intento local de actualización terminó con `ENOTFOUND`; no se presenta como
una actualización instalada ni como fase roja funcional. La actualización
posterior sí quedó instalada y fijada en el lockfile: solo cambiaron
`@playwright/test`, `playwright` y `playwright-core` de 1.65.0 a 1.65.1;
la declaración `latest` se conserva.

## Configuración y selección

`playwright.cross-browser.config.ts` declara seis proyectos independientes:
Firefox y WebKit, cada uno a 390×844, 768×1024 y 1280×800. Firefox utiliza
ventanas por tamaño con teclado/puntero; WebKit estrecho/tableta declara
`isMobile` y `hasTouch`. Todos usan escala 1, español de México, modo oscuro,
movimiento reducido y ejecución sin ventana visible.

El directorio de casos es `tests/cross-browser/` y tendrá sus propias
referencias. Los resultados y reportes usan rutas separadas. No se importa
el `globalSetup` de Chromium ni se configura un servidor automático que
construya la app antes del preflight. La configuración nueva está incluida
en `typecheck:tests`.

En este punto el directorio contiene su documentación de alcance; no se
añaden casos de aplicación vacíos u omitidos. La suite SQL/pandas comienza
en el punto 2. El futuro comando de casos deberá invocar el mismo preflight
antes del build y de sus servidores.

## Comando de comprobación

El comando disponible en este punto es:

```sh
npm run test:browser:preflight
```

Selecciona todos los proyectos y comprueba Firefox/WebKit una vez cada uno.
Para seleccionar un solo proyecto:

```sh
npm run test:browser:preflight -- --project=firefox-escritorio
```

Se admiten nombres exactos, repetición de `--project=nombre` o
`--project nombre`, y `--list`. Un nombre desconocido, un valor ausente o
una opción desconocida se rechazan antes de iniciar motores. Varios
proyectos de un motor no duplican su arranque.

El listado no inicia motores ni crea un informe de pruebas aprobadas:

```sh
npm run test:browser:preflight -- --list
```

La comprobación real abre y cierra cada motor seleccionado, registra su
versión y publica progreso al comenzar y terminar cada uno. El arranque usa
un plazo de 15 s y el cierre uno de 5 s. Una versión ausente, fallo de
arranque o de cierre impide declarar el resultado listo. Un motor aprobado
no compensa el fallo de otro requerido.

No instala binarios, inicia builds, crea servidores, abre Chromium ni
ejecuta código SQL/Python. Los motores se inyectan en las pruebas de código;
el comando real utiliza los launchers de Playwright.

Cada comprobación real conserva configuración efectiva, versiones, fuente,
hashes de herramientas, revisiones de binarios y diagnóstico en
`benchmarks/browser-verifications/<fecha>-<fuente>/`. `preflight-ready` solo
acredita el arranque/cierre, con `applicationCompatibility: not-tested` y
cero casos funcionales. Un problema produce `preflight-blocked` y salida 1.
Si el proceso se interrumpe, el informe inicial conserva `partial`.

## TDD y validación

- [Matriz y preflight en rojo](browser-point-1-red.json): once expectativas
  funcionales sobre una API declarada y aún sin implementar, sin ausencia de
  módulos o navegadores como causa del fallo.
- [Configuración en rojo](browser-point-1-config-red.json): faltaban los seis
  proyectos; el caso de conservación de Chromium ya pasaba.
- [Progreso en rojo](browser-point-1-progress-red.json): no se comunicaban
  el motor en curso y su resultado al invocador.
- Las 16 pruebas nuevas pasan: selección, deduplicación, errores de entrada,
  binarios ausentes, fallo parcial, permisos, versión, cierre, progreso,
  configuración y dos comprobaciones adicionales de la CLI.
- Pasan los tipos de aplicación y de pruebas con la configuración nueva.

La [comprobación local completa](browser-point-1-local-green.json) pasa los
208 casos de código con Playwright 1.65.1 instalado, incluidos los 16 nuevos.
Los tipos se repitieron con esa misma versión y pasaron. La configuración
Chromium, su `globalSetup` y las 165 referencias conservan exactamente sus
hashes. Dentro de los archivos de aplicación identificados por la referencia,
solo cambian `package.json` para añadir el comando y `package-lock.json` por
la actualización de Playwright; no cambia código del producto.

La [comprobación real inicial](../../benchmarks/browser-verifications/2026-11-15T02-56-52-583Z-f687c74cef/README.md)
encontró los dos binarios ausentes y terminó bloqueada antes del trabajo
pesado. Es un diagnóstico de instalación, no un fallo funcional de TDD ni
compatibilidad de aplicación rechazada.

## Comprobación real y cierre

La [comprobación real aprobada](../../benchmarks/browser-verifications/2026-11-15T03-01-48-183Z-46bfeb9159/README.md)
registra Firefox 159.0 y WebKit 27.2, ambos `ready`, con Playwright 1.65.1 en
macOS/arm64. Comprueba los motores necesarios para los seis proyectos, una
instancia por motor. La fuente y los hashes de herramientas coinciden con
las comprobaciones locales finales.

La selección individual y la deduplicación están comprobadas mediante los
casos de código y CLI; el arranque real se comprobó con la selección completa.
El informe mantiene `functionalCases: 0` y `applicationCompatibility: not-tested`.
No se iniciaron build ni servidor y no se ejecutaron programas SQL/Python.
La suite funcional y las nuevas capturas pertenecen a los puntos 2 a 5.
