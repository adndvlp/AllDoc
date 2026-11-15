# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: application.spec.ts >> [APP-04] acento, favoritos y recientes persisten al recargar
- Location: tests/cross-browser/application.spec.ts:79:1

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  locator('[data-search-surface="inline"]').getByRole('searchbox')
Expected: focused
Received: inactive
Timeout:  7000ms

Call log:
  - Expect "toBeFocused" locator('[data-search-surface="inline"]').getByRole('searchbox') with timeout 7000ms
  - waiting for locator('[data-search-surface="inline"]').getByRole('searchbox')
    18 × locator resolved to <input value="" type="search" id="_r_2_-input" autocomplete="off" spellcheck="false" autocapitalize="none" enterkeyhint="search" aria-describedby="_r_2_-help" placeholder="Buscar un concepto o cómo hacer algo…"/>
       - unexpected value "inactive"

```

```yaml
- searchbox "Buscar en tus apuntes"
```

# Test source

```ts
  1   | import {test, expect} from '@playwright/test';
  2   | import {caseTitle} from '../../scripts/lib/browser-cases';
  3   | import {go, reader, header, fits, noOverflow, activate, scrollRegion, chooseHeaderArea, goHome, searchDialog, topicsDialog} from './application-helpers';
  4   | import {profiles, panel, code, openPractice, fillCode, expectCode, capture} from './practice-helpers';
  5   | 
  6   | const sql=profiles[0];
  7   | test(caseTitle('APP-01'), async ({page}, info) => {
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
> 91  |   await expect(page.locator('[data-search-surface="inline"]').getByRole('searchbox')).toBeFocused();
      |                                                                                       ^ Error: expect(locator).toBeFocused() failed
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
  106 |   // La última categoría puede seguir en su transición height:0 -> auto al
  107 |   // regresar click(). La acción espera una posición estable del último tema.
  108 |   await menu.getByRole('button',{name:'Tableau',exact:true}).scrollIntoViewIfNeeded();
  109 |   await side.evaluate(el=>{el.scrollTop=0;});
  110 |   await expect.poll(()=>side.evaluate(el=>el.scrollHeight-el.clientHeight)).toBeGreaterThan(0);
  111 |   await scrollRegion(page,side,0,await side.evaluate(el=>el.scrollHeight),info); await expect.poll(()=>side.evaluate(el=>el.scrollTop)).toBeGreaterThan(0);
  112 |   let dimensions:unknown;
  113 |   try {
  114 |     await expect.poll(async()=>{
  115 |       const state=await side.evaluate(async el=>{
  116 |         const before={top:el.scrollTop,height:el.scrollHeight};
  117 |         await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));
  118 |         return {top:el.scrollTop,height:el.scrollHeight,client:el.clientHeight,remaining:el.scrollHeight-el.clientHeight-el.scrollTop,drift:el.scrollTop-before.top,heightStable:el.scrollHeight===before.height};
  119 |       });
  120 |       dimensions=state; return Math.abs(state.remaining)<=1 && Math.abs(state.drift)<.5 && state.heightStable;
  121 |     }).toBe(true);
  122 |   } finally {await info.attach('dimensiones-sidebar',{body:JSON.stringify(dimensions??{state:'not-sampled'}),contentType:'application/json'});}
  123 |   expect(await reader(page).evaluate(el=>el.scrollTop)).toBe(initial);
  124 |   if(compact) await page.keyboard.press('Escape');
  125 |   const sidebarPosition=await side.evaluate(el=>el.scrollTop), navbar=await page.locator('.navbar').boundingBox();
  126 |   for(const bottom of [true,false]) {
  127 |     await reader(page).evaluate((el,bottom)=>{el.scrollTop=bottom?el.scrollHeight:0;},bottom);
  128 |     const position=await reader(page).evaluate(el=>el.scrollTop);
  129 |     await scrollRegion(page,reader(page),0,bottom?2000:-2000,info);
  130 |     await expect.poll(()=>reader(page).evaluate(el=>el.scrollTop)).toBe(position);
  131 |     expect(await side.evaluate(el=>el.scrollTop)).toBe(sidebarPosition); expect(await page.locator('.navbar').boundingBox()).toEqual(navbar);
  132 |   }
  133 |   await page.setViewportSize({width,height:2400}); await go(page,'/apuntes/analisis-de-datos/sql/where');
  134 |   await expect.poll(()=>reader(page).evaluate(el=>el.scrollHeight<=el.clientHeight+1)).toBe(true);
  135 |   await scrollRegion(page,reader(page),0,2000,info); await expect.poll(()=>reader(page).evaluate(el=>el.scrollTop)).toBe(0);
  136 |   await noOverflow(page);
  137 | });
  138 | 
  139 | test(caseTitle('APP-06'), async ({page},info) => {
  140 |   const initial=page.viewportSize()!; await openPractice(page,sql);
  141 |   if(initial.width>=768) {
  142 |     await expect(panel(page)).toHaveAttribute('data-layout',initial.width>996?'parallel':'bottom');
  143 |     const separator=page.getByRole('separator',{name:'Tamaño de práctica',exact:true}); await fits(page,separator);
  144 |     const before=Number(await separator.getAttribute('aria-valuenow'));
  145 |     await separator.press((await separator.getAttribute('aria-orientation'))==='vertical'?'ArrowLeft':'ArrowUp');
  146 |     await expect.poll(async()=>Number(await separator.getAttribute('aria-valuenow'))).toBeGreaterThan(before);
  147 |     if(initial.width>996) {
  148 |       const box=(await separator.boundingBox())!; await page.mouse.move(box.x+box.width/2,box.y+box.height/2); await page.mouse.down(); await page.mouse.move(box.x-30,box.y+box.height/2); await page.mouse.up();
  149 |       const value=Number(await separator.getAttribute('aria-valuenow')); expect(value).toBeGreaterThanOrEqual(Number(await separator.getAttribute('aria-valuemin'))); expect(value).toBeLessThanOrEqual(Number(await separator.getAttribute('aria-valuemax')));
  150 |     }
  151 |     await separator.press('Home'); await expect(separator).toHaveAttribute('aria-valuenow',String(before));
  152 |   } else await expect(panel(page)).toHaveAttribute('data-layout','modal');
  153 |   await page.addStyleTag({content:'html {font-size:200% !important}'});
  154 |   await expect.poll(()=>code(page,sql).evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(27);
  155 |   await fits(page,panel(page).getByRole('button',{name:'Volver al apunte',exact:true})); await fits(page,panel(page).locator('.cm-editor')); await noOverflow(page);
  156 |   if(initial.width<768) {
  157 |     await page.setViewportSize({width:320,height:568}); await fits(page,panel(page));
  158 |     await page.setViewportSize({width:844,height:390}); await fits(page,panel(page).getByRole('button',{name:'Volver al apunte',exact:true}));
  159 |     await code(page,sql).scrollIntoViewIfNeeded(); await expect(code(page,sql)).toBeInViewport();
  160 |     await code(page,sql).press('End'); await noOverflow(page);
  161 |   }
  162 |   await capture(page,info,'adaptacion-200');
  163 |   await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click(); await noOverflow(page);
  164 | });
  165 | 
```