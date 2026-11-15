# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: application.spec.ts >> [APP-05] lector y sidebar independientes, extremos y contenido que cabe
- Location: tests/cross-browser/application.spec.ts:95:1

# Error details

```
Error: locator.evaluate: Test ended.
Call log:
  - waiting for getByRole('dialog', { name: 'Temas del área', exact: true }).locator('.navbar-sidebar__item')

```

# Test source

```ts
  8   |   await go(page);
  9   |   const catalog=page.locator('[data-catalog]');
  10  |   await expect(catalog.locator('details')).toHaveCount(24);
  11  |   await expect(catalog.locator('details[open]')).toHaveCount(0);
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
  103 |   const side=compact?menu.locator('.navbar-sidebar__item'):menu.locator('nav.menu');
  104 |   await expect.poll(()=>side.evaluate(el=>el.scrollHeight-el.clientHeight)).toBeGreaterThan(0);
  105 |   await scrollRegion(page,side,0,2000,info); await expect.poll(()=>side.evaluate(el=>el.scrollTop)).toBeGreaterThan(0);
  106 |   expect(await reader(page).evaluate(el=>el.scrollTop)).toBe(initial);
  107 |   if(compact) await page.keyboard.press('Escape');
> 108 |   const sidebarPosition=await side.evaluate(el=>el.scrollTop), navbar=await page.locator('.navbar').boundingBox();
      |                                    ^ Error: locator.evaluate: Test ended.
  109 |   for(const bottom of [true,false]) {
  110 |     await reader(page).evaluate((el,bottom)=>{el.scrollTop=bottom?el.scrollHeight:0;},bottom);
  111 |     const position=await reader(page).evaluate(el=>el.scrollTop);
  112 |     await scrollRegion(page,reader(page),0,bottom?2000:-2000,info);
  113 |     await expect.poll(()=>reader(page).evaluate(el=>el.scrollTop)).toBe(position);
  114 |     expect(await side.evaluate(el=>el.scrollTop)).toBe(sidebarPosition); expect(await page.locator('.navbar').boundingBox()).toEqual(navbar);
  115 |   }
  116 |   await page.setViewportSize({width,height:2400}); await go(page,'/apuntes/analisis-de-datos/sql/where');
  117 |   await expect.poll(()=>reader(page).evaluate(el=>el.scrollHeight<=el.clientHeight+1)).toBe(true);
  118 |   await scrollRegion(page,reader(page),0,2000,info); await expect.poll(()=>reader(page).evaluate(el=>el.scrollTop)).toBe(0);
  119 |   await noOverflow(page);
  120 | });
  121 | 
  122 | test(caseTitle('APP-06'), async ({page},info) => {
  123 |   const initial=page.viewportSize()!; await openPractice(page,sql);
  124 |   if(initial.width>=768) {
  125 |     await expect(panel(page)).toHaveAttribute('data-layout',initial.width>996?'parallel':'bottom');
  126 |     const separator=page.getByRole('separator',{name:'Tamaño de práctica',exact:true}); await fits(page,separator);
  127 |     const before=Number(await separator.getAttribute('aria-valuenow'));
  128 |     await separator.press((await separator.getAttribute('aria-orientation'))==='vertical'?'ArrowLeft':'ArrowUp');
  129 |     await expect.poll(async()=>Number(await separator.getAttribute('aria-valuenow'))).toBeGreaterThan(before);
  130 |     if(initial.width>996) {
  131 |       const box=(await separator.boundingBox())!; await page.mouse.move(box.x+box.width/2,box.y+box.height/2); await page.mouse.down(); await page.mouse.move(box.x-30,box.y+box.height/2); await page.mouse.up();
  132 |       const value=Number(await separator.getAttribute('aria-valuenow')); expect(value).toBeGreaterThanOrEqual(Number(await separator.getAttribute('aria-valuemin'))); expect(value).toBeLessThanOrEqual(Number(await separator.getAttribute('aria-valuemax')));
  133 |     }
  134 |     await separator.press('Home'); await expect(separator).toHaveAttribute('aria-valuenow',String(before));
  135 |   } else await expect(panel(page)).toHaveAttribute('data-layout','modal');
  136 |   await page.addStyleTag({content:'html {font-size:200% !important}'});
  137 |   await expect.poll(()=>code(page,sql).evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(27);
  138 |   await fits(page,panel(page).getByRole('button',{name:'Volver al apunte',exact:true})); await fits(page,panel(page).locator('.cm-editor')); await noOverflow(page);
  139 |   if(initial.width<768) {
  140 |     await page.setViewportSize({width:320,height:568}); await fits(page,panel(page));
  141 |     await page.setViewportSize({width:844,height:390}); await fits(page,panel(page).getByRole('button',{name:'Volver al apunte',exact:true}));
  142 |     await code(page,sql).scrollIntoViewIfNeeded(); await expect(code(page,sql)).toBeInViewport();
  143 |     await code(page,sql).press('End'); await noOverflow(page);
  144 |   }
  145 |   await capture(page,info,'adaptacion-200');
  146 |   await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click(); await noOverflow(page);
  147 | });
  148 | 
```