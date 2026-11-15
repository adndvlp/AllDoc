# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: practice.spec.ts >> rotación con búsqueda abierta conserva su consulta y suspende la nueva modalidad de práctica
- Location: tests/ui/practice.spec.ts:167:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('dialog[data-practice-panel]')
Expected: "modal"
Received: "parallel"

Call log:
  - Expect "toHaveAttribute" locator('dialog[data-practice-panel]') with timeout 7000ms
  - waiting for locator('dialog[data-practice-panel]')
    3 × locator resolved to <dialog open="" class="panel_uX6m" data-layout="parallel" id="alldoc-practice-panel" data-practice-panel="true" aria-labelledby="_r_0_-title">…</dialog>
      - unexpected value "parallel"
  - Test ended.

```

```yaml
- dialog "Práctica SQL":
  - banner
  - text: consulta.sql
  - button "Ejecutar"
  - button "Reiniciar entorno"
  - group
  - tablist "Contenido de práctica"
  - tabpanel "Código"
  - text: Guardado local SQLite · Sugerencias del esquema actual
```

# Test source

```ts
  77  |   await go(page); await open(page);
  78  |   await panel(page).locator('.cm-editor').evaluate((element) => {element.setAttribute('data-instance-test', 'original');});
  79  |   await code(page).fill('SELECT 42;'); await code(page).press('Tab'); await expect(code(page)).not.toBeFocused();
  80  |   await panel(page).getByRole('button', {name: 'Volver al apunte', exact: true}).click();
  81  |   await page.locator('.navbar__inner summary[aria-label^="Elegir color de texto:"]').click();
  82  |   await page.getByText('Violeta', {exact: true}).click(); await open(page);
  83  |   await expect(panel(page).locator('.cm-editor')).toHaveAttribute('data-instance-test', 'original');
  84  |   await expect(code(page)).toHaveText('SELECT 42;'); await code(page).press('ControlOrMeta+z');
  85  |   await expect(code(page)).toHaveText('SELECT * FROM productos;');
  86  |   await expect.poll(() => panel(page).locator('.cm-editor').evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgb(0, 0, 0)');
  87  | });
  88  | 
  89  | test('modal: búsqueda y temas suspenden práctica sin apilar ventanas y reanudan con foco visible', async ({page}) => {
  90  |   await page.setViewportSize({width: 390, height: 700}); await go(page); await open(page);
  91  |   await code(page).fill('SELECT 7;'); await code(page).press('ControlOrMeta+k');
  92  |   const search = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  93  |   await expect(search).toBeVisible(); await expect(page.locator('dialog:modal')).toHaveCount(1);
  94  |   await page.keyboard.press('Escape'); await expect(panel(page)).toBeVisible();
  95  |   await expect(page.locator('dialog:modal')).toHaveCount(1); await expect(code(page)).toHaveText('SELECT 7;');
  96  |   await panel(page).getByRole('button', {name: 'Abrir temas', exact: true}).click();
  97  |   const topics = page.getByRole('dialog', {name: 'Temas del área', exact: true});
  98  |   await expect(topics).toBeVisible(); await expect(page.locator('dialog:modal')).toHaveCount(1);
  99  |   await topics.getByRole('link', {name: 'AllDoc', exact: true}).click();
  100 |   await expect(page).toHaveURL(/\/$/); await expect(panel(page)).toHaveCount(0);
  101 |   // Volver mediante una navegación SPA real desde la búsqueda de portada.
  102 |   await page.locator('[data-search-surface="inline"]').getByRole('searchbox').fill('SELECT');
  103 |   await page.locator('[data-search-surface="inline"]').getByRole('link').filter({hasText: 'SELECT'}).first().click();
  104 |   await expect(code(page)).toBeVisible(); await expect(code(page)).toHaveText('SELECT 7;');
  105 |   await page.keyboard.press('Escape'); await expect(panel(page)).toBeHidden();
  106 |   await expect(page.getByRole('button', {name: 'Practicar SQL', exact: true})).toBeFocused();
  107 | });
  108 | 
  109 | test('descarga tardía del editor no reabre práctica después de colapsar', async ({page}) => {
  110 |   let release!: () => void; const gate = new Promise<void>((resolve) => {release = resolve;});
  111 |   let requested = false;
  112 |   await page.route(/\/practice-editor\.[^/]+\.js$/, async (route) => {requested = true; await gate; await route.continue();});
  113 |   await go(page); await page.getByRole('button', {name: 'Practicar SQL', exact: true}).click();
  114 |   await expect.poll(() => requested).toBe(true);
  115 |   await panel(page).getByRole('button', {name: 'Volver al apunte', exact: true}).click();
  116 |   release(); await expect(panel(page)).toBeHidden(); await expect(page.locator('.cm-editor')).toHaveCount(0);
  117 |   await open(page); await expect(code(page)).toHaveText('SELECT * FROM productos;');
  118 | });
  119 | 
  120 | test('error de descarga permite reintentar el editor sin duplicarlo ni perder el borrador', async ({page}) => {
  121 |   let failed = false;
  122 |   await page.route(/\/practice-editor\.[^/]+\.js$/, async (route) => {
  123 |     if (!failed) {failed = true; await route.abort('failed');} else await route.continue();
  124 |   });
  125 |   await go(page); await page.getByRole('button', {name: 'Practicar SQL', exact: true}).click();
  126 |   await expect(panel(page).getByRole('alert')).toContainText('No se pudo preparar');
  127 |   await panel(page).getByRole('button', {name: 'Reintentar', exact: true}).click();
  128 |   await expect(code(page)).toBeVisible(); await expect(panel(page).locator('.cm-editor')).toHaveCount(1);
  129 |   await expect(code(page)).toHaveText('SELECT * FROM productos;');
  130 | });
  131 | 
  132 | test('responsive: rotación y texto al 200% conservan editor, selección y controles accesibles', async ({page}) => {
  133 |   await go(page); await open(page); await code(page).fill('SELECT nombre FROM productos;');
  134 |   await panel(page).locator('.cm-editor').evaluate((element) => {element.setAttribute('data-instance-test', 'original');});
  135 |   await page.setViewportSize({width: 1920, height: 1080}); await expect(panel(page)).toHaveAttribute('data-layout', 'parallel');
  136 |   await page.addStyleTag({content: 'html {font-size: 200% !important}'}); await expect(panel(page)).toHaveAttribute('data-layout', 'modal');
  137 |   await page.addStyleTag({content: 'html {font-size: 100% !important}'}); await expect(panel(page)).toHaveAttribute('data-layout', 'parallel');
  138 |   await page.setViewportSize({width: 768, height: 1024}); await expect(panel(page)).toHaveAttribute('data-layout', 'bottom');
  139 |   await page.setViewportSize({width: 390, height: 844}); await expect(panel(page)).toHaveAttribute('data-layout', 'modal');
  140 |   await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  141 |   await expect.poll(() => code(page).evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(27);
  142 |   await expect(panel(page).locator('.cm-editor')).toHaveAttribute('data-instance-test', 'original');
  143 |   await expect(code(page)).toHaveText('SELECT nombre FROM productos;'); await fits(page, panel(page));
  144 |   for (const button of await panel(page).getByRole('button').all()) {
  145 |     if (!await button.isVisible()) continue; const bounds = (await button.boundingBox())!;
  146 |     expect(bounds.width).toBeGreaterThanOrEqual(44); expect(bounds.height).toBeGreaterThanOrEqual(44);
  147 |   }
  148 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  149 |   await expect(page).toHaveScreenshot('practice-200.png');
  150 | });
  151 | 
  152 | test('teclado virtual: práctica usa el área visual reducida y mantiene el cierre accesible', async ({page}) => {
  153 |   await page.setViewportSize({width: 390, height: 844}); await go(page); await open(page);
  154 |   await code(page).focus();
  155 |   await page.evaluate(() => {
  156 |     const viewport = window.visualViewport!;
  157 |     Object.defineProperty(viewport, 'height', {configurable: true, value: 280});
  158 |     Object.defineProperty(viewport, 'offsetTop', {configurable: true, value: 12});
  159 |     viewport.dispatchEvent(new Event('resize'));
  160 |   });
  161 |   await expect.poll(async () => (await panel(page).boundingBox())!.height).toBeLessThanOrEqual(280);
  162 |   const close = panel(page).getByRole('button', {name: 'Volver al apunte', exact: true});
  163 |   const rect = (await close.boundingBox())!; expect(rect.y + rect.height).toBeLessThanOrEqual(292);
  164 |   await close.click(); await expect(panel(page)).toBeHidden();
  165 | });
  166 | 
  167 | test('rotación con búsqueda abierta conserva su consulta y suspende la nueva modalidad de práctica', async ({page}) => {
  168 |   await page.setViewportSize({width: 1920, height: 1080}); await go(page); await open(page);
  169 |   await expect(panel(page)).toHaveAttribute('data-layout', 'parallel');
  170 |   await panel(page).getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  171 |   const search = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  172 |   await search.getByRole('searchbox').fill('WHERE');
  173 |   await page.setViewportSize({width: 390, height: 700});
  174 |   await expect(search).toBeVisible(); await expect(search.getByRole('searchbox')).toHaveValue('WHERE');
  175 |   await expect(search.getByRole('searchbox')).toBeFocused(); await expect(page.locator('dialog:modal')).toHaveCount(1);
  176 |   await page.keyboard.press('Escape'); await expect(panel(page)).toBeVisible();
> 177 |   await expect(panel(page)).toHaveAttribute('data-layout', 'modal'); await expect(code(page)).toHaveText('SELECT * FROM productos;');
      |                             ^ Error: expect(locator).toHaveAttribute(expected) failed
  178 |   await page.setViewportSize({width: 1920, height: 1080}); await expect(panel(page)).toHaveAttribute('data-layout', 'parallel');
  179 |   await expect(page.locator('dialog:modal')).toHaveCount(0);
  180 | });
  181 | 
  182 | test('control compacto: al 200% y con poca altura conserva acceso sin tapar el apunte con una etiqueta grande', async ({page}) => {
  183 |   await page.setViewportSize({width: 844, height: 390}); await go(page);
  184 |   await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  185 |   const trigger = page.getByRole('button', {name: 'Practicar SQL', exact: true});
  186 |   await expect.poll(async () => (await trigger.boundingBox())!.width).toBeLessThanOrEqual(48);
  187 |   const bounds = (await trigger.boundingBox())!;
  188 |   expect(bounds.width).toBeGreaterThanOrEqual(44); expect(bounds.height).toBeGreaterThanOrEqual(44);
  189 |   expect(bounds.height).toBeLessThanOrEqual(48); await fits(page, trigger);
  190 |   await trigger.click(); await expect(code(page)).toBeVisible();
  191 |   await panel(page).getByRole('button', {name: 'Volver al apunte', exact: true}).click(); await expect(trigger).toBeFocused();
  192 | });
  193 | 
  194 | test('separador: teclado, arrastre y restablecer mantienen mínimos y scroll independiente', async ({page}) => {
  195 |   await go(page); await open(page);
  196 |   test.skip(await panel(page).getAttribute('data-layout') === 'modal', 'El modo modal ocupa el área visible y no tiene separador.');
  197 |   const separator = page.getByRole('separator', {name: 'Tamaño de práctica'});
  198 |   const before = Number(await separator.getAttribute('aria-valuenow'));
  199 |   await separator.focus(); await page.keyboard.press((await separator.getAttribute('aria-orientation')) === 'vertical' ? 'ArrowLeft' : 'ArrowUp');
  200 |   await expect.poll(async () => Number(await separator.getAttribute('aria-valuenow'))).toBeGreaterThan(before);
  201 |   const box = (await separator.boundingBox())!;
  202 |   await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down();
  203 |   await page.mouse.move(box.x - 80, box.y - 80); await page.mouse.up();
  204 |   const value = Number(await separator.getAttribute('aria-valuenow'));
  205 |   expect(value).toBeGreaterThanOrEqual(Number(await separator.getAttribute('aria-valuemin')));
  206 |   expect(value).toBeLessThanOrEqual(Number(await separator.getAttribute('aria-valuemax')));
  207 |   await separator.press('Home'); await expect(separator).toHaveAttribute('aria-valuenow', String(before));
  208 |   await code(page).fill(Array.from({length: 200}, (_, index) => `-- ${index} ${'x'.repeat(150)}`).join('\n'));
  209 |   const reader = page.locator('[data-scroll-panel="content"]'); const top = await reader.evaluate((element) => element.scrollTop);
  210 |   await panel(page).locator('.cm-scroller').hover(); await page.mouse.wheel(0, 4000);
  211 |   await expect.poll(() => panel(page).locator('.cm-scroller').evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
  212 |   expect(await reader.evaluate((element) => element.scrollTop)).toBe(top); expect(await page.evaluate(() => scrollY)).toBe(0);
  213 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  214 | });
  215 | 
```