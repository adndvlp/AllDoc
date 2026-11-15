# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: application.spec.ts >> [APP-06] texto al 200%, 320 px y cambio de disposición
- Location: tests/cross-browser/application.spec.ts:122:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 7000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Saltar al contenido principal":
    - link "Saltar al contenido principal" [ref=e3] [cursor=pointer]:
      - /url: "#__docusaurus_skipToContent_fallback"
  - navigation "Principal" [ref=e4]:
    - generic [ref=e5]:
      - button "Alternar barra lateral" [ref=e7] [cursor=pointer]
      - group [ref=e11]:
        - 'button "Elegir área: Análisis de datos" [ref=e12] [cursor=pointer]':
          - generic [ref=e13]: Análisis de datos
      - generic [ref=e16]:
        - button "Buscar un concepto" [ref=e17] [cursor=pointer]
        - group [ref=e21]:
          - 'generic "Elegir color de texto: Azul" [ref=e22] [cursor=pointer]':
            - generic [aria-hidden] [ref=e23]: Aa
  - generic [ref=e26]:
    - generic [ref=e27]:
      - main "Contenido del apunte" [ref=e28]:
        - generic [ref=e32]:
          - article [ref=e33]:
            - navigation "Rastro de navegación" [ref=e34]:
              - list [ref=e35]:
                - listitem [ref=e36]:
                  - link "Página de Inicio" [ref=e37] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e40]:
                  - generic [ref=e41]: SQL
                - listitem [ref=e42]:
                  - generic [ref=e43]: SELECT
            - generic [ref=e44]:
              - generic [ref=e45]:
                - heading "SELECT" [level=1] [ref=e46]
                - button "Guardar en favoritos" [ref=e47] [cursor=pointer]
                - status
              - region "SELECT" [ref=e50]:
                - paragraph [ref=e51]: Consulta una tabla y elige qué columnas ver.
                - generic [ref=e52]:
                  - generic [ref=e53]:
                    - generic [ref=e54]:
                      - heading "Todas las columnas" [level=2] [ref=e55]
                      - 'button "Probar este ejemplo: Todas las columnas" [ref=e56] [cursor=pointer]': Probar
                    - generic [ref=e58]:
                      - code [ref=e60]:
                        - generic [ref=e61]: SELECT * FROM productos;
                      - button "Copiar código" [ref=e63] [cursor=pointer]
                    - paragraph [ref=e69]: El asterisco (*) pide todas.
                    - group [ref=e70]:
                      - generic "Ver resultado 3 filas" [ref=e71] [cursor=pointer]:
                        - text: Ver resultado
                        - generic [ref=e72]: 3 filas
                  - generic [ref=e73]:
                    - generic [ref=e74]:
                      - heading "Columnas concretas" [level=2] [ref=e75]
                      - 'button "Probar este ejemplo: Columnas concretas" [ref=e76] [cursor=pointer]': Probar
                    - generic [ref=e78]:
                      - code [ref=e80]:
                        - generic [ref=e81]: SELECT nombre, precio FROM productos;
                      - button "Copiar código" [ref=e83] [cursor=pointer]
                    - paragraph [ref=e89]: Escribe sus nombres separados por comas.
                    - group [ref=e90]:
                      - generic "Ver resultado 3 filas" [ref=e91] [cursor=pointer]:
                        - text: Ver resultado
                        - generic [ref=e92]: 3 filas
                - paragraph [ref=e93]: SELECT elige las columnas. FROM indica la tabla.
          - navigation "Página del documento" [ref=e94]:
            - link "Siguiente WHERE »" [ref=e95] [cursor=pointer]:
              - /url: /apuntes/analisis-de-datos/sql/where
              - generic [ref=e96]: Siguiente
              - generic [ref=e97]: WHERE »
      - button "Practicar SQL" [expanded] [ref=e98] [cursor=pointer]:
        - generic [aria-hidden] [ref=e99]: </>
    - dialog "Práctica SQL" [ref=e100]:
      - generic [ref=e101]:
        - banner [ref=e102]:
          - heading [level=2] [ref=e103]:
            - text: Práctica
            - strong [ref=e104]: SQL
          - generic [ref=e105]:
            - button "Buscar un concepto" [active] [ref=e106] [cursor=pointer]
            - button "Abrir temas" [ref=e110] [cursor=pointer]
            - button "Volver al apunte" [ref=e113] [cursor=pointer]
        - generic [ref=e117]:
          - generic [ref=e118]: consulta.sql
          - button "Ejecutar" [ref=e119] [cursor=pointer]
          - button "Reiniciar entorno" [ref=e120] [cursor=pointer]
          - group [ref=e121]:
            - button "Opciones de código" [ref=e122] [cursor=pointer]:
              - generic [aria-hidden] [ref=e123]: ⋯
        - tablist "Contenido de práctica" [ref=e124]:
          - tab "Código" [selected] [ref=e125] [cursor=pointer]
          - tab "Datos" [ref=e126] [cursor=pointer]
          - tab "Resultados" [ref=e127] [cursor=pointer]
        - tabpanel "Código" [ref=e129]:
          - generic [ref=e132]:
            - generic [ref=e134]: "1"
            - textbox "Código SQL" [ref=e136]:
              - generic [ref=e137]: SELECT * FROM productos;
          - paragraph [ref=e138]: Tab sale del editor · Ctrl+Espacio sugiere
        - generic [ref=e139]:
          - generic [ref=e140]: Guardado local
          - generic [ref=e141]: SQLite · Sugerencias del esquema actual
```

# Test source

```ts
  1  | import {expect, type Locator, type Page, type TestInfo} from '@playwright/test';
  2  | export {chooseHeaderArea, goHome} from '../ui/header-helpers';
  3  | export const reader = (page: Page) => page.locator('[data-scroll-panel="content"]');
  4  | export const header = (page: Page) => page.locator('.navbar__inner');
  5  | export const searchDialog = (page: Page) => page.getByRole('dialog', {name: 'Buscar en tus apuntes', exact: true});
  6  | export const topicsDialog = (page: Page) => page.getByRole('dialog', {name: 'Temas del área', exact: true});
  7  | export async function go(page: Page, route = '/') {
  8  |   const response = await page.goto(route, {waitUntil: 'networkidle'});
  9  |   expect(response?.ok()).toBe(true);
  10 |   await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  11 |   await expect(page.getByRole('heading', {level: 1})).toHaveCount(1);
  12 | }
  13 | export async function fits(page: Page, target: Locator) {
  14 |   await expect(target).toBeVisible();
  15 |   await expect.poll(async () => {
  16 |     const box = await target.boundingBox(), viewport = page.viewportSize()!;
  17 |     return Boolean(box && box.x >= -1 && box.y >= -1 && box.x + box.width <= viewport.width + 1 && box.y + box.height <= viewport.height + 1);
> 18 |   }).toBe(true);
     |      ^ Error: expect(received).toBe(expected) // Object.is equality
  19 | }
  20 | export async function noOverflow(page: Page) {
  21 |   await expect.poll(() => page.evaluate(() => ({pageTop: scrollY, horizontal: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > innerWidth + 1})))
  22 |     .toEqual({pageTop: 0, horizontal: false});
  23 |   await expect(page.locator('footer')).toHaveCount(0);
  24 | }
  25 | export async function activate(target: Locator, info: TestInfo) {
  26 |   if (info.project.use.hasTouch) await target.tap(); else await target.click();
  27 | }
  28 | 
```