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

Expected: true
Received: false

Call Log:
- Timeout 7000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Saltar al contenido principal":
    - link "Saltar al contenido principal" [ref=e3]:
      - /url: "#__docusaurus_skipToContent_fallback"
  - navigation "Principal" [ref=e4]:
    - generic [ref=e5]:
      - button "Alternar barra lateral" [expanded] [ref=e7] [cursor=pointer]
      - group [ref=e11]:
        - 'button "Elegir área: Análisis de datos" [ref=e12] [cursor=pointer]':
          - generic [ref=e13]: Análisis de datos
      - generic [ref=e16]:
        - button "Buscar un concepto" [ref=e17] [cursor=pointer]
        - group [ref=e21]:
          - 'generic "Elegir color de texto: Azul" [ref=e22] [cursor=pointer]':
            - generic [aria-hidden] [ref=e23]: Aa
    - dialog "Temas del área" [active] [ref=e24]:
      - generic [ref=e25]:
        - link "AllDoc" [ref=e26]:
          - /url: /
        - button "Cerrar barra de lateral" [ref=e29] [cursor=pointer]
      - list [ref=e34]:
        - listitem [ref=e35]:
          - button "Excel" [ref=e37] [cursor=pointer]
        - listitem [ref=e41]:
          - button "Power Query" [ref=e43] [cursor=pointer]
        - listitem [ref=e46]:
          - button "SQL" [expanded] [ref=e48] [cursor=pointer]
          - list [ref=e54]:
            - listitem [ref=e55]:
              - link "SELECT" [ref=e56]:
                - /url: /apuntes/analisis-de-datos/sql/select
            - listitem [ref=e58]:
              - link "WHERE" [ref=e59]:
                - /url: /apuntes/analisis-de-datos/sql/where
            - listitem [ref=e61]:
              - link "ORDER BY" [ref=e62]:
                - /url: /apuntes/analisis-de-datos/sql/order-by
            - listitem [ref=e64]:
              - link "LIMIT" [ref=e65]:
                - /url: /apuntes/analisis-de-datos/sql/limit
            - listitem [ref=e67]:
              - link "Comentarios" [ref=e68]:
                - /url: /apuntes/analisis-de-datos/sql/comentarios
        - listitem [ref=e70]:
          - button "Tablas y archivos" [expanded] [ref=e72] [cursor=pointer]
          - list [ref=e76]:
            - listitem [ref=e77]:
              - button "Pandas" [expanded] [ref=e79] [cursor=pointer]
              - list [ref=e83]:
                - listitem [ref=e84]:
                  - link "DataFrame" [ref=e85]:
                    - /url: /apuntes/analisis-de-datos/pandas/dataframe
            - listitem [ref=e87]:
              - button "openpyxl" [expanded] [ref=e89] [cursor=pointer]
              - list [ref=e93]:
                - listitem [ref=e94]:
                  - generic [ref=e95]: Sin apuntes todavía
        - listitem [ref=e96]:
          - button "Cálculo científico" [expanded] [ref=e98] [cursor=pointer]
          - list [ref=e102]:
            - listitem [ref=e103]:
              - button "NumPy" [expanded] [ref=e105] [cursor=pointer]
              - list [ref=e109]:
                - listitem [ref=e110]:
                  - generic [ref=e111]: Sin apuntes todavía
            - listitem [ref=e112]:
              - button "SciPy" [expanded] [ref=e114] [cursor=pointer]
              - list [ref=e118]:
                - listitem [ref=e119]:
                  - generic [ref=e120]: Sin apuntes todavía
        - listitem [ref=e121]:
          - button "Visualización" [expanded] [ref=e123] [cursor=pointer]
          - list [ref=e127]:
            - listitem [ref=e128]:
              - button "Matplotlib" [expanded] [ref=e130] [cursor=pointer]
              - list [ref=e133]:
                - listitem [ref=e134]:
                  - generic [ref=e135]: Sin apuntes todavía
            - listitem [ref=e136]:
              - button "Seaborn" [expanded] [ref=e138] [cursor=pointer]
              - list [ref=e141]:
                - listitem [ref=e142]:
                  - generic [ref=e143]: Sin apuntes todavía
        - listitem [ref=e144]:
          - button "Conexiones SQL" [expanded] [ref=e146] [cursor=pointer]
          - list [ref=e152]:
            - listitem [ref=e153]:
              - button "SQLAlchemy" [ref=e155] [cursor=pointer]
            - listitem [ref=e159]:
              - button "sqlite3" [ref=e161] [cursor=pointer]
            - listitem [ref=e165]:
              - button "mysql-connector-python" [ref=e167] [cursor=pointer]
            - listitem [ref=e171]:
              - button "psycopg" [ref=e173] [cursor=pointer]
        - listitem [ref=e177]:
          - button "Peticiones y formatos" [expanded] [ref=e179] [cursor=pointer]
          - list [ref=e186]:
            - listitem [ref=e187]:
              - button "requests" [ref=e189] [cursor=pointer]
            - listitem [ref=e192]:
              - button "httpx" [ref=e194] [cursor=pointer]
            - listitem [ref=e197]:
              - button "json" [ref=e199] [cursor=pointer]
        - listitem [ref=e203]:
          - button "R" [ref=e205] [cursor=pointer]
        - listitem [ref=e209]:
          - button "Power BI" [ref=e211] [cursor=pointer]
        - listitem [ref=e214]:
          - button "Tableau" [ref=e216] [cursor=pointer]
  - generic [ref=e225]:
    - main "Contenido del apunte" [ref=e226]:
      - generic [ref=e230]:
        - article [ref=e231]:
          - navigation "Rastro de navegación" [ref=e232]:
            - list [ref=e233]:
              - listitem [ref=e234]:
                - link "Página de Inicio" [ref=e235]:
                  - /url: /
              - listitem [ref=e238]:
                - generic [ref=e239]: SQL
              - listitem [ref=e240]:
                - generic [ref=e241]: SELECT
          - generic [ref=e242]:
            - generic [ref=e243]:
              - heading "SELECT" [level=1] [ref=e244]
              - button "Guardar en favoritos" [ref=e245] [cursor=pointer]
              - status
            - region "SELECT" [ref=e248]:
              - paragraph [ref=e249]: Consulta una tabla y elige qué columnas ver.
              - generic [ref=e250]:
                - generic [ref=e251]:
                  - generic [ref=e252]:
                    - heading "Todas las columnas" [level=2] [ref=e253]
                    - 'button "Probar este ejemplo: Todas las columnas" [ref=e254] [cursor=pointer]': Probar
                  - generic [ref=e256]:
                    - code [ref=e258]:
                      - generic [ref=e259]: SELECT * FROM productos;
                    - button "Copiar código" [ref=e261] [cursor=pointer]
                  - paragraph [ref=e267]: El asterisco (*) pide todas.
                  - group [ref=e268]:
                    - generic "Ver resultado 3 filas" [ref=e269] [cursor=pointer]:
                      - text: Ver resultado
                      - generic [ref=e270]: 3 filas
                    - 'region "Resultado de SELECT: Todas las columnas" [ref=e271]':
                      - 'table "Resultado de SELECT: Todas las columnas" [ref=e272]':
                        - caption [ref=e273]: "Resultado de SELECT: Todas las columnas"
                        - rowgroup [ref=e274]:
                          - row [ref=e275]:
                            - columnheader "nombre" [ref=e276]
                            - columnheader "categoria" [ref=e277]
                            - columnheader "precio" [ref=e278]
                        - rowgroup [ref=e279]:
                          - row [ref=e280]:
                            - cell "Teclado" [ref=e281]
                            - cell "Accesorios" [ref=e282]
                            - cell "500" [ref=e283]
                          - row [ref=e284]:
                            - cell "Mouse" [ref=e285]
                            - cell "Accesorios" [ref=e286]
                            - cell "250" [ref=e287]
                          - row [ref=e288]:
                            - cell "Monitor" [ref=e289]
                            - cell "Pantallas" [ref=e290]
                            - cell "3500" [ref=e291]
                - generic [ref=e292]:
                  - generic [ref=e293]:
                    - heading "Columnas concretas" [level=2] [ref=e294]
                    - 'button "Probar este ejemplo: Columnas concretas" [ref=e295] [cursor=pointer]': Probar
                  - generic [ref=e297]:
                    - code [ref=e299]:
                      - generic [ref=e300]: SELECT nombre, precio FROM productos;
                    - button "Copiar código" [ref=e302] [cursor=pointer]
                  - paragraph [ref=e308]: Escribe sus nombres separados por comas.
                  - group [ref=e309]:
                    - generic "Ver resultado 3 filas" [ref=e310] [cursor=pointer]:
                      - text: Ver resultado
                      - generic [ref=e311]: 3 filas
                    - 'region "Resultado de SELECT: Columnas concretas" [ref=e312]':
                      - 'table "Resultado de SELECT: Columnas concretas" [ref=e313]':
                        - caption [ref=e314]: "Resultado de SELECT: Columnas concretas"
                        - rowgroup [ref=e315]:
                          - row [ref=e316]:
                            - columnheader "nombre" [ref=e317]
                            - columnheader "precio" [ref=e318]
                        - rowgroup [ref=e319]:
                          - row [ref=e320]:
                            - cell "Teclado" [ref=e321]
                            - cell "500" [ref=e322]
                          - row [ref=e323]:
                            - cell "Mouse" [ref=e324]
                            - cell "250" [ref=e325]
                          - row [ref=e326]:
                            - cell "Monitor" [ref=e327]
                            - cell "3500" [ref=e328]
              - paragraph [ref=e329]: SELECT elige las columnas. FROM indica la tabla.
        - navigation "Página del documento" [ref=e330]:
          - link "Siguiente WHERE »" [ref=e331]:
            - /url: /apuntes/analisis-de-datos/sql/where
            - generic [ref=e332]: Siguiente
            - generic [ref=e333]: WHERE »
    - button "Practicar SQL" [ref=e334] [cursor=pointer]:
      - generic [aria-hidden] [ref=e335]: </>
```

# Test source

```ts
  12  |   await activate(catalog.getByLabel('SQL',{exact:true}),info);
  13  |   await activate(catalog.getByLabel('Tablas y archivos',{exact:true}),info);
  14  |   await expect(catalog.locator('[data-catalog-item="sql"] details')).toHaveAttribute('open','');
  15  |   await expect(page).toHaveURL(/\/$/);
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
  107 |   await scrollRegion(page,side,0,await side.evaluate(el=>el.scrollHeight),info); await expect.poll(()=>side.evaluate(el=>el.scrollTop)).toBeGreaterThan(0);
  108 |   await expect.poll(()=>side.evaluate(async el=>{
  109 |     const before={top:el.scrollTop,height:el.scrollHeight};
  110 |     await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));
  111 |     return Math.abs(el.scrollHeight-el.clientHeight-el.scrollTop)<=1 && Math.abs(el.scrollTop-before.top)<.5 && el.scrollHeight===before.height;
> 112 |   })).toBe(true);
      |       ^ Error: expect(received).toBe(expected) // Object.is equality
  113 |   expect(await reader(page).evaluate(el=>el.scrollTop)).toBe(initial);
  114 |   if(compact) await page.keyboard.press('Escape');
  115 |   const sidebarPosition=await side.evaluate(el=>el.scrollTop), navbar=await page.locator('.navbar').boundingBox();
  116 |   for(const bottom of [true,false]) {
  117 |     await reader(page).evaluate((el,bottom)=>{el.scrollTop=bottom?el.scrollHeight:0;},bottom);
  118 |     const position=await reader(page).evaluate(el=>el.scrollTop);
  119 |     await scrollRegion(page,reader(page),0,bottom?2000:-2000,info);
  120 |     await expect.poll(()=>reader(page).evaluate(el=>el.scrollTop)).toBe(position);
  121 |     expect(await side.evaluate(el=>el.scrollTop)).toBe(sidebarPosition); expect(await page.locator('.navbar').boundingBox()).toEqual(navbar);
  122 |   }
  123 |   await page.setViewportSize({width,height:2400}); await go(page,'/apuntes/analisis-de-datos/sql/where');
  124 |   await expect.poll(()=>reader(page).evaluate(el=>el.scrollHeight<=el.clientHeight+1)).toBe(true);
  125 |   await scrollRegion(page,reader(page),0,2000,info); await expect.poll(()=>reader(page).evaluate(el=>el.scrollTop)).toBe(0);
  126 |   await noOverflow(page);
  127 | });
  128 | 
  129 | test(caseTitle('APP-06'), async ({page},info) => {
  130 |   const initial=page.viewportSize()!; await openPractice(page,sql);
  131 |   if(initial.width>=768) {
  132 |     await expect(panel(page)).toHaveAttribute('data-layout',initial.width>996?'parallel':'bottom');
  133 |     const separator=page.getByRole('separator',{name:'Tamaño de práctica',exact:true}); await fits(page,separator);
  134 |     const before=Number(await separator.getAttribute('aria-valuenow'));
  135 |     await separator.press((await separator.getAttribute('aria-orientation'))==='vertical'?'ArrowLeft':'ArrowUp');
  136 |     await expect.poll(async()=>Number(await separator.getAttribute('aria-valuenow'))).toBeGreaterThan(before);
  137 |     if(initial.width>996) {
  138 |       const box=(await separator.boundingBox())!; await page.mouse.move(box.x+box.width/2,box.y+box.height/2); await page.mouse.down(); await page.mouse.move(box.x-30,box.y+box.height/2); await page.mouse.up();
  139 |       const value=Number(await separator.getAttribute('aria-valuenow')); expect(value).toBeGreaterThanOrEqual(Number(await separator.getAttribute('aria-valuemin'))); expect(value).toBeLessThanOrEqual(Number(await separator.getAttribute('aria-valuemax')));
  140 |     }
  141 |     await separator.press('Home'); await expect(separator).toHaveAttribute('aria-valuenow',String(before));
  142 |   } else await expect(panel(page)).toHaveAttribute('data-layout','modal');
  143 |   await page.addStyleTag({content:'html {font-size:200% !important}'});
  144 |   await expect.poll(()=>code(page,sql).evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(27);
  145 |   await fits(page,panel(page).getByRole('button',{name:'Volver al apunte',exact:true})); await fits(page,panel(page).locator('.cm-editor')); await noOverflow(page);
  146 |   if(initial.width<768) {
  147 |     await page.setViewportSize({width:320,height:568}); await fits(page,panel(page));
  148 |     await page.setViewportSize({width:844,height:390}); await fits(page,panel(page).getByRole('button',{name:'Volver al apunte',exact:true}));
  149 |     await code(page,sql).scrollIntoViewIfNeeded(); await expect(code(page,sql)).toBeInViewport();
  150 |     await code(page,sql).press('End'); await noOverflow(page);
  151 |   }
  152 |   await capture(page,info,'adaptacion-200');
  153 |   await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click(); await noOverflow(page);
  154 | });
  155 | 
```