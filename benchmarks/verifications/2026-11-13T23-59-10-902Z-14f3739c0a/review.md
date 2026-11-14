# Revisión final del punto 8

Estado: revisión completada. El registro automático conserva `ready-for-review`
y `browserReview: pending`, tal como terminó el comando; este archivo acredita
la revisión posterior sin reescribir las mediciones.

[Informe del punto 8](../../../specs/verification/point-8.md) ·
[Evidencia de integridad y revisión](../../../specs/verification/point-8-final.json) ·
[Comparación antes/después](comparison.md).

## Comprobaciones

| Evidencia | Resultado |
| --- | --- |
| Código | 60 pruebas aprobadas |
| Tipos de aplicación y pruebas | Aprobados |
| UI sin actualizar referencias | 288 aprobadas, seis omisiones previstas, cero fallos e inestables |
| Producción | Build aprobado; diez páginas con un h1, zoom permitido y sin contenido/rutas retirados |
| Cuerpos SQL en cargador de portada | Ausentes; `notes-sql` separado por herramienta |
| Integridad | 112 archivos de fuente y 24 de pruebas/herramienta coinciden con la ejecución |
| Referencia inicial | Sin cambios en el árbol de trabajo |
| Capturas | 42 hashes y dimensiones verificados; seis estados en siete tamaños revisados |
| Muestras | 300 de acciones, más dos aperturas frías; archivos individuales coinciden con report.json |
| Presupuesto | Doce métricas con p95 inferior a 100 ms; peor p95: 54,0 ms |

Las seis omisiones corresponden al scroll del sidebar de escritorio en cuatro
tamaños compactos y rotación en laptop/escritorio. No representan fallos pendientes.
SQL alterna quince aperturas y quince cierres por perfil; favoritos alterna
quince altas y quince bajas. Campo y resultados usan las mismas treinta aperturas.

## Revisión visual

Se inspeccionaron las 42 capturas de la [medición de producción](../../runs/2026-11-14T00-03-39-837Z-14f3739c0a/README.md)
en siete hojas de contacto y, adicionalmente, los originales de SELECT en laptop,
Comentarios en escritorio y selector de texto en celular horizontal. No se
observaron defectos nuevos: encabezado compacto, categorías cerradas al inicio,
ejemplos con una sola envoltura, sintaxis y navegación legibles, logos coherentes,
diálogo y paleta dentro de la ventana. Los tamaños cortos conservan scroll propio;
su accesibilidad y contención se comprueban en la suite funcional.

La UI se comparó con las 88 referencias revisadas, sin regenerarlas ni ampliar
la tolerancia. Las capturas nuevas son evidencia de producción adicional.

## Rendimiento y diagnóstico

Los perfiles conservan el Apple M1, 8 GiB, Node 26, Chromium 158.0.8127.18,
red local sin caché HTTP y CPU 1×/4× de la referencia. La comprobación del
[método](../../../specs/verification/point-8-method.json) verifica el observador
y núcleo común, y documenta las extensiones de la herramienta.

La primera búsqueda fría hasta resultados registró 48,0 ms en laptop y 136,4 ms
en celular, frente a 64,7 y 97,5 ms iniciales. El incremento móvil se conserva;
es una muestra única y no permite calcular un percentil ni inferir una regresión
estable. Las acciones con índice cargado cumplen el presupuesto local acordado.

La única tarea medida de más de 50 ms fue de arranque móvil: 142 ms, terminada
a los 259,9 ms de navegación, antes de la primera entrada a los 1066 ms. La
referencia registró 141 ms también antes de interactuar. La traza móvil separada
no perdió datos y muestra `EvaluateScript` del main durante 51,614 ms antes
de la marca de interacción. No registra eventos completos mayores de 50 ms
después de esa marca. No se usa ese replay para asignar la tarea original a una
función exacta ni para sustituir las muestras sin tracing.

El JS total creció 3482 bytes gzip (+1,76%) y el CSS 177 (+0,85%) con las
capacidades añadidas. El HTML de portada declara 3380 bytes menos de JS
(−2,14%); esa cifra no incluye todos los imports dinámicos del runtime.
La auditoría confirma que su cargador no solicita los cuerpos de apuntes.

Los tiempos son proxy DOM + siguiente rAF, no INP de campo ni píxeles presentados.
Event Timing falta en 27 de 30 escrituras por perfil y mantiene cobertura parcial.
La emulación de Chromium no acredita otros motores, redes móviles o Safari/iOS
físico. El ensayo de mil entradas es del motor en Node, sin renderizado.
