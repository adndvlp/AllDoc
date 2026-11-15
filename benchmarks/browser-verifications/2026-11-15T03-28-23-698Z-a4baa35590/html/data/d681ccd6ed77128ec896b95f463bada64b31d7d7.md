# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: practice-desktop.spec.ts >> pandas >> [PY-01] @smoke editor diferido y filtro real con columnas y números correctos
- Location: tests/cross-browser/practice-desktop.spec.ts:8:5

# Error details

```
Error: expect(locator).toBeEnabled() failed

Locator:  locator('dialog[data-practice-panel]').getByRole('button', { name: 'Ejecutar', exact: true })
Expected: enabled
Received: disabled

Call log:
  - Expect "toBeEnabled" locator('dialog[data-practice-panel]').getByRole('button', { name: 'Ejecutar', exact: true }) with timeout 90000ms
  - waiting for locator('dialog[data-practice-panel]').getByRole('button', { name: 'Ejecutar', exact: true })
    13 × locator resolved to <button disabled type="button">Ejecutar</button>
       - unexpected value "disabled"
  - Test ended.

```

```yaml
- button "Ejecutar" [disabled]
```

# Test source

```ts
  1  | import {expect, test, type Page, type TestInfo} from '@playwright/test';
  2  | 
  3  | export const profiles = [
  4  |   {id: 'SQL', label: 'SQL', route: '/apuntes/analisis-de-datos/sql/select', seed: 'SELECT * FROM productos;',
  5  |     query: 'SELECT nombre, precio FROM productos WHERE precio > 300 ORDER BY precio DESC;',
  6  |     rows: [['Monitor', '3500'], ['Teclado', '500']], keyword: 'SELECT'},
  7  |   {id: 'PY', label: 'pandas', route: '/apuntes/analisis-de-datos/pandas/dataframe', seed: 'pd.DataFrame',
  8  |     query: 'productos[productos["precio"] > 300][["nombre", "precio"]]',
  9  |     rows: [['Teclado', '500'], ['Monitor', '3500']], keyword: 'import'},
  10 | ] as const;
  11 | export type Profile = typeof profiles[number];
  12 | export const panel = (page: Page) => page.locator('dialog[data-practice-panel]');
  13 | export const code = (page: Page, profile: Profile) => panel(page).getByRole('textbox', {name: 'Código ' + profile.label, exact: true});
  14 | export const runButton = (page: Page) => panel(page).getByRole('button', {name: 'Ejecutar', exact: true});
  15 | 
  16 | export async function openPractice(page: Page, profile: Profile, waitForRuntime = true) {
  17 |   await test.step('Apunte hidratado y apertura explícita del editor', async () => {
  18 |     await page.goto(profile.route, {waitUntil: 'networkidle'});
  19 |     await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  20 |     await expect(page.locator('.cm-editor')).toHaveCount(0);
  21 |     await page.getByRole('button', {name: 'Practicar ' + profile.label, exact: true}).click();
  22 |     await expect(code(page, profile)).toBeVisible();
  23 |     await expect(panel(page).locator('.cm-editor')).toHaveCount(1);
  24 |   });
  25 |   if (waitForRuntime) await ready(page, profile);
  26 | }
  27 | export async function ready(page: Page, profile: Profile) {
  28 |   await test.step('Motor real preparado: ' + profile.label, async () => {
> 29 |     await expect(runButton(page)).toBeEnabled({timeout: profile.id === 'PY' ? 90_000 : 25_000});
     |                                   ^ Error: expect(locator).toBeEnabled() failed
  30 |   });
  31 | }
  32 | export async function showResults(page: Page) {
  33 |   await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  34 | }
  35 | export async function expectNoExecution(page: Page) {
  36 |   await showResults(page);
  37 |   await expect(panel(page).getByText('Todavía no has ejecutado código.', {exact: true})).toBeVisible();
  38 |   await expect(panel(page).getByRole('table')).toHaveCount(0);
  39 |   await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  40 | }
  41 | export async function fillCode(page: Page, profile: Profile, content: string) {
  42 |   await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  43 |   await code(page, profile).fill(content);
  44 |   await code(page, profile).press('End');
  45 |   await expect(code(page, profile)).toHaveText(content);
  46 | }
  47 | export async function execute(page: Page, profile: Profile, content: string) {
  48 |   await test.step('Ejecución explícita y resultado del motor', async () => {
  49 |     await fillCode(page, profile, content);
  50 |     await runButton(page).click(); await showResults(page);
  51 |     await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible({timeout: 15_000});
  52 |   });
  53 | }
  54 | export const completion = (page: Page, label: string) => panel(page).getByRole('option').filter({
  55 |   has: page.locator('.cm-completionLabel').filter({hasText: new RegExp('^' + label + '$')}),
  56 | });
  57 | export async function capture(page: Page, info: TestInfo, name: string) {
  58 |   await page.evaluate(() => document.fonts.ready);
  59 |   await info.attach(name, {body: await page.screenshot({animations: 'disabled', caret: 'hide'}), contentType: 'image/png'});
  60 | }
  61 | 
```