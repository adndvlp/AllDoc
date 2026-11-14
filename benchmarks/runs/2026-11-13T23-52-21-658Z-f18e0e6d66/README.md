# Medición posterior al rediseño de AllDoc

**Estado:** partial.  
**Fuente SHA-256:** `f18e0e6d66bfef1656ee18be891a23d228d2506607cf44e3868e4b4b629db451`.  
**Inicio:** 2026-11-13T23:52:21.658Z.  
**Build:** failed. **Navegador:** pending.

Esta ejecución contribuye al punto 8 del SDD. Comparar con la referencia inicial; no sobrescribe ejecuciones anteriores. Condiciones en [report.json](report.json).

## Capturas

0 proyectos capturados en esta ejecución. Se esperan 7, con seis estados por proyecto.


88 referencias UI anteriores archivadas en prior-ui-references/. Son copias de archivos existentes, no capturas nuevas de esta fuente.

## Tiempos

El proxy DOM incluye espera hasta rAF y no es INP ni medición de píxeles presentados. Las entradas Event Timing y sus subpartes se guardan solo cuando el navegador las emite. Favoritos: 15 altas y 15 bajas por perfil; no existe referencia previa de esta función.

## Pendientes de esta ejecución

- build: La auditoría del HTML publicado detectó: La portada carga cuerpos de apuntes: assets/js/common.93aceb3b.js

Una ejecución parcial conserva evidencia válida de las etapas terminadas y no acredita las que faltan. Para obtener una ejecución completa, ejecutar `npm run baseline` en un entorno que pueda iniciar Chromium.

## Reproducción y comparación

Ejecutar `npm run baseline` en el mismo equipo, con versiones, CPU, red y viewport equivalentes y sin otras tareas intensivas. Cada ejecución crea una carpeta nueva. Comparar los perfiles y campos equivalentes; no mezclar el total de JS con la descarga inicial ni el proxy DOM con INP.

Procedimiento: [benchmarks/README.md](../../README.md).
