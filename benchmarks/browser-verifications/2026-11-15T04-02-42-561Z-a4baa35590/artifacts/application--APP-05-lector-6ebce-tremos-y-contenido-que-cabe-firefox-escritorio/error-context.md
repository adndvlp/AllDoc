# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: application.spec.ts >> [APP-05] lector y sidebar independientes, extremos y contenido que cabe
- Location: tests/cross-browser/application.spec.ts:95:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1068.199951171875
Received: 1206.699951171875
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Saltar al contenido principal":
    - link "Saltar al contenido principal" [ref=e3] [cursor=pointer]:
      - /url: "#__docusaurus_skipToContent_fallback"
  - navigation "Principal" [ref=e4]:
    - generic [ref=e5]:
      - link "AllDoc" [ref=e7] [cursor=pointer]:
        - /url: /
      - navigation "Áreas de estudio" [ref=e11]:
        - link "Análisis de datos" [ref=e12] [cursor=pointer]:
          - /url: /apuntes/analisis-de-datos
        - link "Desarrollo web" [ref=e13] [cursor=pointer]:
          - /url: /apuntes/desarrollo-web
        - link "IA" [ref=e14] [cursor=pointer]:
          - /url: /apuntes/ia
      - generic [ref=e15]:
        - button "Buscar un concepto" [ref=e16] [cursor=pointer]:
          - generic [ref=e21]: ⌘ K
        - group [ref=e22]:
          - 'generic "Elegir color de texto: Azul" [ref=e23] [cursor=pointer]':
            - generic [aria-hidden] [ref=e24]: Aa
            - generic [ref=e25]: Texto
  - generic [ref=e29]:
    - complementary [ref=e30]:
      - navigation "Barra lateral de Documentos" [ref=e31]:
        - list [ref=e32]:
          - listitem [ref=e33]:
            - button "Excel" [ref=e35] [cursor=pointer]
          - listitem [ref=e39]:
            - button "Power Query" [ref=e41] [cursor=pointer]
          - listitem [ref=e44]:
            - button "SQL" [expanded] [ref=e46] [cursor=pointer]
            - list [ref=e52]:
              - listitem [ref=e53]:
                - link "SELECT" [ref=e54] [cursor=pointer]:
                  - /url: /apuntes/analisis-de-datos/sql/select
              - listitem [ref=e56]:
                - link "WHERE" [ref=e57] [cursor=pointer]:
                  - /url: /apuntes/analisis-de-datos/sql/where
              - listitem [ref=e59]:
                - link "ORDER BY" [ref=e60] [cursor=pointer]:
                  - /url: /apuntes/analisis-de-datos/sql/order-by
              - listitem [ref=e62]:
                - link "LIMIT" [ref=e63] [cursor=pointer]:
                  - /url: /apuntes/analisis-de-datos/sql/limit
              - listitem [ref=e65]:
                - link "Comentarios" [ref=e66] [cursor=pointer]:
                  - /url: /apuntes/analisis-de-datos/sql/comentarios
          - listitem [ref=e68]:
            - button "Tablas y archivos" [expanded] [ref=e70] [cursor=pointer]
            - list [ref=e74]:
              - listitem [ref=e75]:
                - button "Pandas" [expanded] [ref=e77] [cursor=pointer]
                - list [ref=e81]:
                  - listitem [ref=e82]:
                    - link "DataFrame" [ref=e83] [cursor=pointer]:
                      - /url: /apuntes/analisis-de-datos/pandas/dataframe
              - listitem [ref=e85]:
                - button "openpyxl" [expanded] [ref=e87] [cursor=pointer]
                - list [ref=e91]:
                  - listitem [ref=e92]:
                    - generic [ref=e93]: Sin apuntes todavía
          - listitem [ref=e94]:
            - button "Cálculo científico" [expanded] [ref=e96] [cursor=pointer]
            - list [ref=e109]:
              - listitem [ref=e110]:
                - button "NumPy" [expanded] [ref=e112] [cursor=pointer]
                - list [ref=e116]:
                  - listitem [ref=e117]:
                    - generic [ref=e118]: Sin apuntes todavía
              - listitem [ref=e119]:
                - button "SciPy" [expanded] [ref=e121] [cursor=pointer]
                - list [ref=e125]:
                  - listitem [ref=e126]:
                    - generic [ref=e127]: Sin apuntes todavía
          - listitem [ref=e128]:
            - button "Visualización" [expanded] [ref=e130] [cursor=pointer]
            - list [ref=e139]:
              - listitem [ref=e140]:
                - button "Matplotlib" [expanded] [ref=e142] [cursor=pointer]
                - list [ref=e145]:
                  - listitem [ref=e146]:
                    - generic [ref=e147]: Sin apuntes todavía
              - listitem [ref=e148]:
                - button "Seaborn" [expanded] [ref=e150] [cursor=pointer]
                - list [ref=e153]:
                  - listitem [ref=e154]:
                    - generic [ref=e155]: Sin apuntes todavía
          - listitem [ref=e156]:
            - button "Conexiones SQL" [expanded] [ref=e158] [cursor=pointer]
            - list [ref=e164]:
              - listitem [ref=e165]:
                - button "SQLAlchemy" [ref=e167] [cursor=pointer]
              - listitem [ref=e171]:
                - button "sqlite3" [ref=e173] [cursor=pointer]
              - listitem [ref=e177]:
                - button "mysql-connector-python" [ref=e179] [cursor=pointer]
              - listitem [ref=e183]:
                - button "psycopg" [ref=e185] [cursor=pointer]
          - listitem [ref=e189]:
            - button "Peticiones y formatos" [expanded] [active] [ref=e191] [cursor=pointer]
            - list [ref=e199]:
              - listitem [ref=e200]:
                - button "requests" [ref=e202] [cursor=pointer]
              - listitem [ref=e205]:
                - button "httpx" [ref=e207] [cursor=pointer]
              - listitem [ref=e210]:
                - button "json" [ref=e212] [cursor=pointer]
          - listitem [ref=e216]:
            - button "R" [ref=e218] [cursor=pointer]
          - listitem [ref=e222]:
            - button "Power BI" [ref=e224] [cursor=pointer]
          - listitem [ref=e227]:
            - button "Tableau" [ref=e229] [cursor=pointer]
    - generic [ref=e236]:
      - main "Contenido del apunte" [ref=e237]:
        - generic [ref=e241]:
          - article [ref=e242]:
            - navigation "Rastro de navegación" [ref=e243]:
              - list [ref=e244]:
                - listitem [ref=e245]:
                  - link "Página de Inicio" [ref=e246] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e249]:
                  - generic [ref=e250]: SQL
                - listitem [ref=e251]:
                  - generic [ref=e252]: SELECT
            - generic [ref=e253]:
              - generic [ref=e254]:
                - heading "SELECT" [level=1] [ref=e255]
                - button "Guardar en favoritos" [ref=e256] [cursor=pointer]
                - status
              - region "SELECT" [ref=e259]:
                - paragraph [ref=e260]: Consulta una tabla y elige qué columnas ver.
                - generic [ref=e261]:
                  - generic [ref=e262]:
                    - generic [ref=e263]:
                      - heading "Todas las columnas" [level=2] [ref=e264]
                      - 'button "Probar este ejemplo: Todas las columnas" [ref=e265] [cursor=pointer]': Probar
                    - generic [ref=e267]:
                      - code [ref=e269]:
                        - generic [ref=e270]: SELECT * FROM productos;
                      - button "Copiar código" [ref=e272] [cursor=pointer]
                    - paragraph [ref=e278]: El asterisco (*) pide todas.
                    - group [ref=e279]:
                      - generic "Ver resultado 3 filas" [ref=e280] [cursor=pointer]:
                        - text: Ver resultado
                        - generic [ref=e281]: 3 filas
                      - 'region "Resultado de SELECT: Todas las columnas" [ref=e282]':
                        - 'table "Resultado de SELECT: Todas las columnas" [ref=e283]':
                          - caption [ref=e284]: "Resultado de SELECT: Todas las columnas"
                          - rowgroup [ref=e285]:
                            - row [ref=e286]:
                              - columnheader "nombre" [ref=e287]
                              - columnheader "categoria" [ref=e288]
                              - columnheader "precio" [ref=e289]
                          - rowgroup [ref=e290]:
                            - row [ref=e291]:
                              - cell "Teclado" [ref=e292]
                              - cell "Accesorios" [ref=e293]
                              - cell "500" [ref=e294]
                            - row [ref=e295]:
                              - cell "Mouse" [ref=e296]
                              - cell "Accesorios" [ref=e297]
                              - cell "250" [ref=e298]
                            - row [ref=e299]:
                              - cell "Monitor" [ref=e300]
                              - cell "Pantallas" [ref=e301]
                              - cell "3500" [ref=e302]
                  - generic [ref=e303]:
                    - generic [ref=e304]:
                      - heading "Columnas concretas" [level=2] [ref=e305]
                      - 'button "Probar este ejemplo: Columnas concretas" [ref=e306] [cursor=pointer]': Probar
                    - generic [ref=e308]:
                      - code [ref=e310]:
                        - generic [ref=e311]: SELECT nombre, precio FROM productos;
                      - button "Copiar código" [ref=e313] [cursor=pointer]
                    - paragraph [ref=e319]: Escribe sus nombres separados por comas.
                    - group [ref=e320]:
                      - generic "Ver resultado 3 filas" [ref=e321] [cursor=pointer]:
                        - text: Ver resultado
                        - generic [ref=e322]: 3 filas
                      - 'region "Resultado de SELECT: Columnas concretas" [ref=e323]':
                        - 'table "Resultado de SELECT: Columnas concretas" [ref=e324]':
                          - caption [ref=e325]: "Resultado de SELECT: Columnas concretas"
                          - rowgroup [ref=e326]:
                            - row [ref=e327]:
                              - columnheader "nombre" [ref=e328]
                              - columnheader "precio" [ref=e329]
                          - rowgroup [ref=e330]:
                            - row [ref=e331]:
                              - cell "Teclado" [ref=e332]
                              - cell "500" [ref=e333]
                            - row [ref=e334]:
                              - cell "Mouse" [ref=e335]
                              - cell "250" [ref=e336]
                            - row [ref=e337]:
                              - cell "Monitor" [ref=e338]
                              - cell "3500" [ref=e339]
                - paragraph [ref=e340]: SELECT elige las columnas. FROM indica la tabla.
          - navigation "Página del documento" [ref=e341]:
            - link "Siguiente WHERE »" [ref=e342] [cursor=pointer]:
              - /url: /apuntes/analisis-de-datos/sql/where
              - generic [ref=e343]: Siguiente
              - generic [ref=e344]: WHERE »
      - button "Practicar SQL" [ref=e345] [cursor=pointer]:
        - generic [aria-hidden] [ref=e346]: </>
```

# Test source

```ts
  16  |   for (const area of ['Desarrollo web','IA','Análisis de datos']) {
  17  |     await chooseHeaderArea(page,area);
  18  |     await expect(catalog.locator('details[open]')).toHaveCount(0);
  19  |     if(area!=='Análisis de datos') {await expect(catalog.getByText('Sin apuntes todavía',{exact:true})).toBeVisible(); await expect(catalog.getByRole('link')).toHaveCount(0);}
  20  |   }
  21  |   await catalog.getByLabel('SQL',{exact:true}).click();
  22  |   await expect(catalog.locator('[data-catalog-item="sql"]').getByRole('link')).toHaveCount(5);
  23  |   await catalog.locator('[data-catalog-item="sql"]').getByRole('link').filter({hasText:'WHERE'}).click();
  24  |   await expect(page).toHaveURL(/\/sql\/where$/); await expect(page.getByRole('heading',{name:'WHERE',exact:true})).toBeVisible();
  25  |   await go(page,'/apuntes/analisis-de-datos');
  26  |   for (const [area,id] of [['Desarrollo web','desarrollo-web'],['IA','ia']]) {
  27  |     await chooseHeaderArea(page,area); await expect(page).toHaveURL(new RegExp('/apuntes/'+id+'$'));
  28  |     await expect(page.getByRole('heading',{level:1,name:area,exact:true})).toBeVisible();
  29  |     await expect(catalog.getByText('Sin apuntes todavía',{exact:true})).toBeVisible();
  30  |   }
  31  |   await noOverflow(page);
  32  | });
  33  | 
  34  | test(caseTitle('APP-02'), async ({page}, info) => {
  35  |   await go(page);
  36  |   const trigger=header(page).getByRole('button',{name:/^Elegir área:/});
  37  |   if(page.viewportSize()!.width<=996) {
  38  |     await activate(trigger,info); const areas=page.getByRole('navigation',{name:'Áreas de estudio',exact:true});
  39  |     await fits(page,areas); await areas.getByRole('button',{name:'IA',exact:true}).focus();
  40  |     await page.keyboard.press('Escape'); await expect(trigger).toBeFocused(); await expect(trigger).toHaveAttribute('aria-expanded','false');
  41  |   }
  42  |   const input=page.locator('[data-search-surface="inline"]').getByRole('searchbox');
  43  |   await input.fill('cómo filtrar'); const result=page.locator('[data-search-surface="inline"]').getByRole('link').filter({hasText:'WHERE'});
  44  |   await expect(result).toHaveCount(1); await input.press('ArrowDown'); await expect(result).toBeFocused(); await page.keyboard.press('Enter');
  45  |   await expect(page).toHaveURL(/\/sql\/where$/);
  46  |   const search=header(page).getByRole('button',{name:'Buscar un concepto',exact:true});
  47  |   await activate(search,info); await fits(page,searchDialog(page));
  48  |   await searchDialog(page).getByRole('searchbox').fill('limitar');
  49  |   await expect(searchDialog(page).getByRole('link').filter({hasText:'LIMIT'})).toBeVisible();
  50  |   await page.keyboard.press('Escape'); await expect(search).toBeFocused();
  51  |   await search.press('ControlOrMeta+k'); await expect(searchDialog(page).getByRole('searchbox')).toHaveValue('limitar');
  52  |   await searchDialog(page).getByRole('searchbox').press('ArrowDown'); await page.keyboard.press('Enter');
  53  |   await expect(page).toHaveURL(/\/sql\/limit$/); await noOverflow(page);
  54  | });
  55  | 
  56  | test(caseTitle('APP-03'), async ({page},info) => {
  57  |   await openPractice(page,sql); await fillCode(page,sql,'SELECT 7;');
  58  |   await code(page,sql).press('ControlOrMeta+k'); await expect(searchDialog(page)).toBeVisible();
  59  |   await expect(page.locator('dialog:modal')).toHaveCount(1);
  60  |   await page.keyboard.press('Escape'); await expect(panel(page)).toBeVisible(); await expectCode(page,sql,'SELECT 7;');
  61  |   await expect.poll(()=>panel(page).evaluate(el=>el.contains(document.activeElement))).toBe(true);
  62  |   // Todos prueban el intercambio con temas; en escritorio también se verifica
  63  |   // salir de la disposición compacta sin dejar una capa modal invisible.
  64  |   await page.setViewportSize({width:768,height:700});
  65  |   await panel(page).getByRole('button',{name:'Abrir temas',exact:true}).click();
  66  |   await expect(topicsDialog(page)).toBeVisible(); await expect(page.locator('dialog:modal')).toHaveCount(1);
  67  |   await page.keyboard.press('ControlOrMeta+k'); await expect(searchDialog(page)).toBeVisible(); await expect(topicsDialog(page)).toBeHidden();
  68  |   await expect(page.locator('dialog:modal')).toHaveCount(1); await page.keyboard.press('Escape');
  69  |   await expect(panel(page)).toBeVisible(); await expectCode(page,sql,'SELECT 7;');
  70  |   await panel(page).getByRole('button',{name:'Abrir temas',exact:true}).click();
  71  |   await page.setViewportSize({width:1280,height:800});
  72  |   await expect(topicsDialog(page)).toBeHidden(); await expect(page.locator('dialog:modal')).toHaveCount(0);
  73  |   await expect(panel(page)).toBeVisible(); await expectCode(page,sql,'SELECT 7;');
  74  |   await capture(page,info,'dialogos-y-contexto');
  75  |   await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();
  76  |   await expect(page.getByRole('button',{name:'Practicar SQL',exact:true})).toBeFocused();
  77  | });
  78  | 
  79  | test(caseTitle('APP-04'), async ({page}) => {
  80  |   await go(page,sql.route);
  81  |   const star=page.getByRole('button',{name:'Guardar en favoritos',exact:true}); await star.focus(); await page.keyboard.press('Space');
  82  |   await expect(page.getByRole('button',{name:'Quitar de favoritos',exact:true})).toHaveAttribute('aria-pressed','true');
  83  |   const palette=header(page).locator('summary[aria-label^="Elegir color de texto:"]');
  84  |   await palette.click(); await palette.locator('..').getByText('Violeta',{exact:true}).click();
  85  |   await page.reload({waitUntil:'networkidle'}); await expect(page.locator('html')).toHaveAttribute('data-palette','violeta');
  86  |   await expect(page.getByRole('button',{name:'Quitar de favoritos',exact:true})).toHaveAttribute('aria-pressed','true');
  87  |   await goHome(page);
  88  |   for(const name of ['Favoritos','Recientes']) await expect(page.getByRole('region',{name,exact:true}).getByRole('link')).toContainText('SELECT');
  89  |   await page.getByRole('region',{name:'Favoritos',exact:true}).getByRole('button',{name:'Quitar SELECT de favoritos',exact:true}).click();
  90  |   await expect(page.getByRole('region',{name:'Favoritos',exact:true})).toHaveCount(0);
  91  |   await expect(page.locator('[data-search-surface="inline"]').getByRole('searchbox')).toBeFocused();
  92  |   await expect(page.getByRole('region',{name:'Recientes',exact:true}).getByRole('link')).toContainText('SELECT');
  93  | });
  94  | 
  95  | test(caseTitle('APP-05'), async ({page},info) => {
  96  |   const width=page.viewportSize()!.width; await page.setViewportSize({width,height:400}); await go(page,sql.route);
  97  |   for(const summary of await reader(page).locator('summary').all()) await summary.click();
  98  |   await expect.poll(()=>reader(page).evaluate(el=>el.scrollHeight-el.clientHeight)).toBeGreaterThan(0);
  99  |   await reader(page).evaluate(el=>{el.scrollTop=30;}); const initial=await reader(page).evaluate(el=>el.scrollTop);
  100 |   const compact=width<=996; if(compact) await header(page).locator('.navbar__toggle').click();
  101 |   const menu=compact?topicsDialog(page):page.locator('.theme-doc-sidebar-container');
  102 |   for(const label of ['SQL','Tablas y archivos','Pandas','openpyxl','Cálculo científico','NumPy','SciPy','Visualización','Matplotlib','Seaborn','Conexiones SQL','Peticiones y formatos']) await menu.getByRole('button',{name:label,exact:true}).click();
  103 |   // Se vuelve a medir después de cerrar el menú: el selector DOM conserva
  104 |   // acceso al nodo oculto, mientras getByRole lo excluiría por accesibilidad.
  105 |   const side=page.locator(compact?'.navbar-sidebar .navbar-sidebar__item':'.theme-doc-sidebar-container nav.menu');
  106 |   await expect.poll(()=>side.evaluate(el=>el.scrollHeight-el.clientHeight)).toBeGreaterThan(0);
  107 |   await scrollRegion(page,side,0,2000,info); await expect.poll(()=>side.evaluate(el=>el.scrollTop)).toBeGreaterThan(0);
  108 |   expect(await reader(page).evaluate(el=>el.scrollTop)).toBe(initial);
  109 |   if(compact) await page.keyboard.press('Escape');
  110 |   const sidebarPosition=await side.evaluate(el=>el.scrollTop), navbar=await page.locator('.navbar').boundingBox();
  111 |   for(const bottom of [true,false]) {
  112 |     await reader(page).evaluate((el,bottom)=>{el.scrollTop=bottom?el.scrollHeight:0;},bottom);
  113 |     const position=await reader(page).evaluate(el=>el.scrollTop);
  114 |     await scrollRegion(page,reader(page),0,bottom?2000:-2000,info);
  115 |     await expect.poll(()=>reader(page).evaluate(el=>el.scrollTop)).toBe(position);
> 116 |     expect(await side.evaluate(el=>el.scrollTop)).toBe(sidebarPosition); expect(await page.locator('.navbar').boundingBox()).toEqual(navbar);
      |                                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  117 |   }
  118 |   await page.setViewportSize({width,height:2400}); await go(page,'/apuntes/analisis-de-datos/sql/where');
  119 |   await expect.poll(()=>reader(page).evaluate(el=>el.scrollHeight<=el.clientHeight+1)).toBe(true);
  120 |   await scrollRegion(page,reader(page),0,2000,info); await expect.poll(()=>reader(page).evaluate(el=>el.scrollTop)).toBe(0);
  121 |   await noOverflow(page);
  122 | });
  123 | 
  124 | test(caseTitle('APP-06'), async ({page},info) => {
  125 |   const initial=page.viewportSize()!; await openPractice(page,sql);
  126 |   if(initial.width>=768) {
  127 |     await expect(panel(page)).toHaveAttribute('data-layout',initial.width>996?'parallel':'bottom');
  128 |     const separator=page.getByRole('separator',{name:'Tamaño de práctica',exact:true}); await fits(page,separator);
  129 |     const before=Number(await separator.getAttribute('aria-valuenow'));
  130 |     await separator.press((await separator.getAttribute('aria-orientation'))==='vertical'?'ArrowLeft':'ArrowUp');
  131 |     await expect.poll(async()=>Number(await separator.getAttribute('aria-valuenow'))).toBeGreaterThan(before);
  132 |     if(initial.width>996) {
  133 |       const box=(await separator.boundingBox())!; await page.mouse.move(box.x+box.width/2,box.y+box.height/2); await page.mouse.down(); await page.mouse.move(box.x-30,box.y+box.height/2); await page.mouse.up();
  134 |       const value=Number(await separator.getAttribute('aria-valuenow')); expect(value).toBeGreaterThanOrEqual(Number(await separator.getAttribute('aria-valuemin'))); expect(value).toBeLessThanOrEqual(Number(await separator.getAttribute('aria-valuemax')));
  135 |     }
  136 |     await separator.press('Home'); await expect(separator).toHaveAttribute('aria-valuenow',String(before));
  137 |   } else await expect(panel(page)).toHaveAttribute('data-layout','modal');
  138 |   await page.addStyleTag({content:'html {font-size:200% !important}'});
  139 |   await expect.poll(()=>code(page,sql).evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(27);
  140 |   await fits(page,panel(page).getByRole('button',{name:'Volver al apunte',exact:true})); await fits(page,panel(page).locator('.cm-editor')); await noOverflow(page);
  141 |   if(initial.width<768) {
  142 |     await page.setViewportSize({width:320,height:568}); await fits(page,panel(page));
  143 |     await page.setViewportSize({width:844,height:390}); await fits(page,panel(page).getByRole('button',{name:'Volver al apunte',exact:true}));
  144 |     await code(page,sql).scrollIntoViewIfNeeded(); await expect(code(page,sql)).toBeInViewport();
  145 |     await code(page,sql).press('End'); await noOverflow(page);
  146 |   }
  147 |   await capture(page,info,'adaptacion-200');
  148 |   await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click(); await noOverflow(page);
  149 | });
  150 | 
```