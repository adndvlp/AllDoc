# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: practice-state.spec.ts >> pandas >> [PY-07] pandas: probar, recuperar y restaurar código conserva datos
- Location: tests/cross-browser/practice-state.spec.ts:37:5

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
                  - generic [ref=e41]: Tablas y archivos
                - listitem [ref=e42]:
                  - generic [ref=e43]: Pandas
                - listitem [ref=e44]:
                  - generic [ref=e45]: DataFrame
            - generic [ref=e46]:
              - generic [ref=e47]:
                - heading "DataFrame" [level=1] [ref=e48]
                - button "Guardar en favoritos" [ref=e49] [cursor=pointer]
                - status
              - region "DataFrame" [ref=e52]:
                - paragraph [ref=e53]: "Un DataFrame es una tabla: columnas para cada dato y filas para cada producto."
                - generic [ref=e55]:
                  - generic [ref=e56]:
                    - heading "Crear una tabla de productos" [level=2] [ref=e57]
                    - 'button "Probar este ejemplo: Crear una tabla de productos" [ref=e58] [cursor=pointer]': Probar
                  - generic [ref=e60]:
                    - code [ref=e62]:
                      - generic [ref=e63]: import pandas as pd
                      - generic [ref=e65]: "productos = pd.DataFrame({"
                      - generic [ref=e66]: "\"nombre\": [\"Teclado\", \"Mouse\", \"Monitor\"],"
                      - generic [ref=e67]: "\"categoria\": [\"Accesorios\", \"Accesorios\", \"Pantallas\"],"
                      - generic [ref=e68]: "\"precio\": [500, 250, 3500],"
                      - generic [ref=e69]: "})"
                      - generic [ref=e70]: productos
                    - button "Copiar código" [ref=e72] [cursor=pointer]
                  - paragraph [ref=e78]: Cada lista forma una columna.
                  - group [ref=e79]:
                    - generic "Ver resultado 3 filas" [ref=e80] [cursor=pointer]:
                      - text: Ver resultado
                      - generic [ref=e81]: 3 filas
                - paragraph [ref=e82]: DataFrame organiza tus datos en filas y columnas.
          - navigation "Página del documento"
      - button "Practicar pandas" [expanded] [ref=e83] [cursor=pointer]:
        - generic [aria-hidden] [ref=e84]: </>
        - generic [aria-hidden] [ref=e85]: Practicar pandas
    - dialog "Práctica pandas" [ref=e86]:
      - generic [ref=e87]:
        - banner [ref=e88]:
          - heading [level=2] [ref=e89]:
            - text: Práctica
            - strong [ref=e90]: pandas
          - generic [ref=e91]:
            - button "Buscar un concepto" [ref=e92] [cursor=pointer]
            - button "Abrir temas" [ref=e96] [cursor=pointer]
            - button "Volver al apunte" [ref=e99] [cursor=pointer]
        - generic [ref=e103]:
          - generic [ref=e104]: main.py
          - button "Ejecutar" [ref=e105] [cursor=pointer]
          - button "Reiniciar entorno" [ref=e106] [cursor=pointer]
          - group [ref=e107]:
            - button "Opciones de código" [ref=e108] [cursor=pointer]:
              - generic [aria-hidden] [ref=e109]: ⋯
          - button "Ver resultados" [ref=e110] [cursor=pointer]
        - tablist "Contenido de práctica" [ref=e111]:
          - tab "Código" [ref=e112] [cursor=pointer]
          - tab "Datos" [active] [selected] [ref=e113] [cursor=pointer]
          - tab "Resultados" [ref=e114] [cursor=pointer]
        - tabpanel "Datos" [ref=e116]:
          - generic [ref=e117]:
            - heading "productos 3 filas" [level=3] [ref=e118]
            - region "Tabla productos" [ref=e119]:
              - table "Datos de productos" [ref=e120]:
                - caption [ref=e121]: Datos de productos
                - rowgroup [ref=e122]:
                  - row [ref=e123]:
                    - columnheader "nombre text" [ref=e124]:
                      - text: nombre
                      - generic [ref=e125]: text
                    - columnheader "categoria text" [ref=e126]:
                      - text: categoria
                      - generic [ref=e127]: text
                    - columnheader "precio integer" [ref=e128]:
                      - text: precio
                      - generic [ref=e129]: integer
                - rowgroup [ref=e130]:
                  - row [ref=e131]:
                    - cell "Teclado" [ref=e132]
                    - cell "Accesorios" [ref=e133]
                    - cell "1" [ref=e134]
                  - row [ref=e135]:
                    - cell "Mouse" [ref=e136]
                    - cell "Accesorios" [ref=e137]
                    - cell "1" [ref=e138]
                  - row [ref=e139]:
                    - cell "Monitor" [ref=e140]
                    - cell "Pantallas" [ref=e141]
                    - cell "1" [ref=e142]
        - generic [ref=e143]:
          - generic [ref=e144]: Guardado local
          - generic [ref=e145]: Python · Jedi y columnas registradas
          - status [ref=e146]: Código preparado. Puedes recuperar el código anterior.
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
  15 | // CodeMirror representa cada línea como un bloque. textContent concatena sus
  16 | // límites; innerText conserva los saltos que ve y edita el usuario.
  17 | export async function expectCode(page: Page, profile: Profile, content: string) {
  18 |   await expect(code(page, profile)).toHaveText(content, {useInnerText: true});
  19 | }
  20 | 
  21 | export async function openPractice(page: Page, profile: Profile, waitForRuntime = true) {
  22 |   await test.step('Apunte hidratado y apertura explícita del editor', async () => {
  23 |     await page.goto(profile.route, {waitUntil: 'networkidle'});
  24 |     await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  25 |     await expect(page.locator('.cm-editor')).toHaveCount(0);
  26 |     await page.getByRole('button', {name: 'Practicar ' + profile.label, exact: true}).click();
  27 |     await expect(code(page, profile)).toBeVisible();
  28 |     await expect(panel(page).locator('.cm-editor')).toHaveCount(1);
  29 |   });
  30 |   if (waitForRuntime) await ready(page, profile);
  31 | }
  32 | export async function ready(page: Page, profile: Profile) {
  33 |   await test.step('Motor real preparado: ' + profile.label, async () => {
  34 |     await expect(runButton(page)).toBeEnabled({timeout: profile.id === 'PY' ? 90_000 : 25_000});
  35 |   });
  36 | }
  37 | export async function showResults(page: Page) {
  38 |   await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  39 | }
  40 | export async function expectNoExecution(page: Page) {
  41 |   await showResults(page);
  42 |   await expect(panel(page).getByText('Todavía no has ejecutado código.', {exact: true})).toBeVisible();
  43 |   await expect(panel(page).getByRole('table')).toHaveCount(0);
  44 |   await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  45 | }
  46 | export async function fillCode(page: Page, profile: Profile, content: string) {
  47 |   await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  48 |   await code(page, profile).fill(content);
  49 |   await code(page, profile).press('End');
  50 |   await expectCode(page, profile, content);
  51 | }
  52 | export async function execute(page: Page, profile: Profile, content: string) {
  53 |   await test.step('Ejecución explícita y resultado del motor', async () => {
  54 |     await fillCode(page, profile, content);
  55 |     await runButton(page).click(); await showResults(page);
  56 |     await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible({timeout: 15_000});
  57 |   });
  58 | }
  59 | export const completion = (page: Page, label: string) => panel(page).getByRole('option').filter({
  60 |   has: page.locator('.cm-completionLabel').filter({hasText: new RegExp('^' + label + '$')}),
  61 | });
  62 | export async function capture(page: Page, info: TestInfo, name: string) {
  63 |   await page.evaluate(() => document.fonts.ready);
  64 |   await info.attach(name, {body: await page.screenshot({animations: 'disabled', caret: 'hide'}), contentType: 'image/png'});
  65 | }
  66 | export async function codeAction(page: Page, name: string) {
  67 |   await panel(page).getByRole('button', {name: 'Opciones de código', exact: true}).click();
  68 |   await page.getByRole('region', {name: 'Opciones de código', exact: true}).getByRole('button', {name, exact: true}).click();
  69 | }
  70 | export async function searchTo(page: Page, query: string) {
  71 |   await panel(page).getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  72 |   const dialog=page.getByRole('dialog', {name: 'Buscar en tus apuntes', exact: true});
  73 |   await dialog.getByRole('searchbox').fill(query);
  74 |   await dialog.getByRole('link').filter({hasText: query}).first().click();
  75 | }
  76 | export async function savedCode(page: Page, profile: Profile, content: string) {
  77 |   const tool=profile.id==='SQL'?'sql':'pandas', engine=profile.id==='SQL'?'sql-sqlite':'python-pandas';
  78 |   await expect.poll(()=>page.evaluate(async ({tool,engine,content})=>{
  79 |     const db=await new Promise<IDBDatabase>((resolve,reject)=>{const request=indexedDB.open('alldoc-practice',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error);});
  80 |     try {return await new Promise<boolean>((resolve,reject)=>{
  81 |       const request=db.transaction('drafts').objectStore('drafts').get(JSON.stringify(['analisis-de-datos/'+tool,engine,'productos-basico',1]));
  82 |       request.onsuccess=()=>resolve(request.result?.workspace.files[0].content===content); request.onerror=()=>reject(request.error);
  83 |     });} finally {db.close();}
> 84 |   },{tool,engine,content})).toBe(true);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  85 | }
  86 | 
```