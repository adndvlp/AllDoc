import {openPracticeRegion, practiceResults} from './practice-helpers';
import {test,expect,type Page} from '@playwright/test';
import {chooseHeaderArea,expectSelectedHeaderArea,goHome} from './header-helpers';
import {openCatalogSqlGroup,openSqlGroup} from './sql-tree-helpers';

const primary='/apuntes/analisis-de-datos/sql/';
const shared='/apuntes/lenguajes/sql/';
const panel=(page:Page)=>page.locator('dialog[data-practice-panel]');
const code=(page:Page)=>panel(page).getByRole('textbox',{name:'Código SQL',exact:true});
async function go(page:Page,route='/'){
 await page.goto(route,{waitUntil:'networkidle'});
 await expect(page.locator('html')).toHaveAttribute('data-has-hydrated','true');
}
async function topics(page:Page){
 const compact=page.viewportSize()!.width<=996;
 if(compact)await page.locator('.navbar__toggle').click();
 return page.locator(compact?'.navbar-sidebar .theme-doc-sidebar-menu':'.theme-doc-sidebar-container .theme-doc-sidebar-menu');
}
async function practice(page:Page){
 await page.getByRole('button',{name:'Practicar SQL',exact:true}).click();
 await openPracticeRegion(page,'editor');
 await expect(code(page)).toBeVisible();
 await expect(panel(page).getByRole('button',{name:'Ejecutar',exact:true})).toBeEnabled();
}
async function execute(page:Page,sql:string){
 await openPracticeRegion(page,'editor');
 await code(page).fill(sql);await panel(page).getByRole('button',{name:'Ejecutar',exact:true}).click();
 await openPracticeRegion(page,'results');
 await expect(panel(page).getByText('Ejecución completada',{exact:true})).toBeVisible();
}

test('árbol SQL: 34 grupos contraídos, Definición primero y despliegues independientes en ambas áreas',async({page})=>{
 await go(page);
 for(const area of ['Análisis de datos','Lenguajes']){
  if(area==='Lenguajes')await chooseHeaderArea(page,area);
  const catalog=page.locator('[data-catalog]');
  await expect(catalog.locator('details[open]')).toHaveCount(0);
  const original=page.url();const select=await openCatalogSqlGroup(page,'SELECT');
  await expect(catalog.locator('[data-sql-group]')).toHaveCount(34);
  await expect(select.getByRole('link').first()).toHaveAccessibleName('Definición');
  const where=await openCatalogSqlGroup(page,'WHERE');
  await expect(select).toHaveAttribute('open','');await expect(where).toHaveAttribute('open','');
  await where.locator(':scope > summary').focus();await page.keyboard.press('Space');
  await expect(where).not.toHaveAttribute('open');await expect(select).toHaveAttribute('open','');
  expect(page.url()).toBe(original);
 }
 await expect(page.locator('[data-catalog-item]')).toHaveCount(1);
 await expect(page).toHaveScreenshot('sql-tree-home.png');
 const select=await openCatalogSqlGroup(page,'SELECT');await select.getByRole('link',{name:'Definición',exact:true}).click();
 await expect(page).toHaveURL(shared+'select');
});

test('ruta directa compartida: área y breadcrumb propios, ancestros abiertos y categorías que no navegan',async({page})=>{
 await go(page,shared+'where/and');await expectSelectedHeaderArea(page,'Lenguajes');
 await expect(page.getByRole('navigation',{name:'Ruta del apunte'})).toContainText('Lenguajes');
 const menu=await topics(page);
 await expect(menu.getByRole('button',{name:'SQL',exact:true})).toHaveAttribute('aria-expanded','true');
 await expect(menu.getByRole('button',{name:'WHERE',exact:true})).toHaveAttribute('aria-expanded','true');
 await expect(menu.getByRole('button',{name:'SELECT',exact:true})).toHaveAttribute('aria-expanded','false');
 await expect(menu.locator('[aria-expanded="true"]')).toHaveCount(2);
 const original=page.url();const toggle=menu.getByRole('button',{name:'WHERE',exact:true});
 await toggle.focus();await toggle.press('Enter');await expect(toggle).toHaveAttribute('aria-expanded','false');expect(page.url()).toBe(original);
 const where=await openSqlGroup(menu,'WHERE');await expect(page).toHaveScreenshot('sql-tree-sidebar.png');
 await where.getByRole('link',{name:'OR',exact:true}).click();await expect(page).toHaveURL(shared+'where/or');
 await expect(page.getByRole('heading',{level:1,name:'WHERE · OR',exact:true})).toBeVisible();
 await page.reload({waitUntil:'networkidle'});const after=await topics(page);
 await expect(after.getByRole('button',{name:'WHERE',exact:true})).toHaveAttribute('aria-expanded','true');
});

test('documento compartido: canonical único, favorito visible y enlaces internos y paginación de Lenguajes',async({page})=>{
 await go(page,shared+'select');
 await expect(page.locator('head link[rel="canonical"]')).toHaveCount(1);
 await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href',new RegExp(primary+'select$'));
 await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute('content',new RegExp(primary+'select$'));
 await expect(page.locator('article').getByRole('button',{name:'Guardar en favoritos',exact:true})).toBeVisible();
 await expect(page.locator('.pagination-nav__link--next')).toHaveAttribute('href',shared+'select/todas-las-columnas');
 await page.getByRole('group',{name:'Más de SELECT',exact:true}).locator('summary').click();
 await page.getByRole('navigation',{name:'Apartados de SELECT',exact:true}).getByRole('link',{name:'Todas las columnas',exact:true}).click();
 await expect(page).toHaveURL(shared+'select/todas-las-columnas');
 await expect(page.getByRole('heading',{level:1})).toHaveCount(1);
 await go(page,shared+'where/not');
 await expect(page.locator('article a[href^="'+primary+'"]').filter({hasText:'Ver NULL'})).toHaveCount(0);
 await expect(page.locator('article').getByRole('link',{name:'Ver NULL',exact:true})).toHaveAttribute('href',shared+'null');
 await expect(page).toHaveScreenshot('sql-shared-note.png');
});

test('sesión compartida: cambiar de área conserva motor, tabla creada, borrador y resultados sin ejecutar',async({page})=>{
 await go(page,primary+'select');await practice(page);
 await execute(page,'CREATE TABLE compartida(valor INTEGER); INSERT INTO compartida VALUES(7); SELECT valor FROM compartida;');
 await expect(practiceResults(page).getByRole('table').getByRole('cell')).toHaveText(['7']);
 const frame=page.locator('iframe[data-practice-runtime]');await frame.evaluate(e=>e.setAttribute('data-instance-test','shared'));
 await openPracticeRegion(page,'editor');await code(page).fill('SELECT valor + 1 AS siguiente FROM compartida;');
 await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();
 await chooseHeaderArea(page,'Lenguajes');await expect(page).toHaveURL(shared+'select');await practice(page);
 await expect(code(page)).toHaveText('SELECT valor + 1 AS siguiente FROM compartida;');
 await expect(frame).toHaveAttribute('data-instance-test','shared');
 await openPracticeRegion(page,'results');await expect(practiceResults(page).getByRole('table').getByRole('cell')).toHaveText(['7']);
 await execute(page,'SELECT valor + 1 AS siguiente FROM compartida;');await expect(practiceResults(page).getByRole('table').getByRole('cell')).toHaveText(['8']);
 await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();
 await chooseHeaderArea(page,'Análisis de datos');await expect(page).toHaveURL(primary+'select');await practice(page);
 await expect(code(page)).toHaveText('SELECT valor + 1 AS siguiente FROM compartida;');await expect(frame).toHaveAttribute('data-instance-test','shared');
 await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();await page.reload({waitUntil:'networkidle'});await practice(page);
 await expect(code(page)).toHaveText('SELECT valor + 1 AS siguiente FROM compartida;');
 const keys=await page.evaluate(()=>new Promise<string[]>((resolve,reject)=>{const r=indexedDB.open('alldoc-practice');r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result;const q=db.transaction('drafts').objectStore('drafts').getAllKeys();q.onsuccess=()=>{resolve(q.result as string[]);db.close();};q.onerror=()=>reject(q.error);};}));
 expect(keys).toHaveLength(1);expect(JSON.parse(keys[0])[0]).toBe('analisis-de-datos/sql');
});

test('identidad compartida: favoritos, recientes y resultados del buscador no se duplican',async({page})=>{
 await go(page,shared+'select');await page.getByRole('button',{name:'Guardar en favoritos',exact:true}).click();
 const before=await page.evaluate(()=>localStorage.getItem('alldoc-recents-v1'));
 await chooseHeaderArea(page,'Análisis de datos');await expect(page).toHaveURL(primary+'select');
 await expect(page.getByRole('button',{name:'Quitar de favoritos',exact:true})).toHaveAttribute('aria-pressed','true');
 expect(await page.evaluate(()=>localStorage.getItem('alldoc-recents-v1'))).toBe(before);
 await chooseHeaderArea(page,'Lenguajes');await goHome(page);
 for(const name of ['Favoritos','Recientes'])await expect(page.getByRole('region',{name,exact:true}).getByRole('link')).toHaveCount(1);
 await page.locator('[data-search-surface="inline"]').getByRole('searchbox').fill('SELECT');
 const results=page.locator('[data-search-surface="inline"]').getByRole('link');
 await expect(results.filter({has:page.getByText('SELECT',{exact:true})})).toHaveCount(1);
 await expect(results.filter({has:page.getByText('SELECT',{exact:true})})).toHaveAttribute('href',primary+'select');
 expect(await results.evaluateAll(links=>links.map(l=>l.getAttribute('href')))).not.toContain(shared+'select');
});

test('dialecto compartido: conserva consulta y hash al cambiar de área y localiza la alternativa documental',async({page})=>{
 await go(page,primary+'limit?dialect=postgresql#recordar');
 const dialect=page.getByRole('combobox',{name:'Dialecto SQL',exact:true});await expect(dialect).toHaveValue('postgresql');
 await dialect.selectOption('sqlserver');await chooseHeaderArea(page,'Lenguajes');
 await expect(page).toHaveURL(shared+'limit?dialect=sqlserver#recordar');await expect(dialect).toHaveValue('sqlserver');
 await expect(page.locator('[data-sql-concept] pre').first()).toContainText('TOP (5)');
 await go(page,shared+'outer-joins/full-outer-join?dialect=mysql');
 await expect(page.getByRole('link',{name:'Ver anti join',exact:true})).toHaveAttribute('href',new RegExp('^'+shared));
});

test('árbol accesible: 320 px al 200%, controles por teclado y sin desbordar el lector',async({page})=>{
 await page.setViewportSize({width:320,height:568});await go(page,shared+'where/and');
 await page.addStyleTag({content:'html {font-size:200% !important}'});const menu=await topics(page);
 const button=menu.getByRole('button',{name:'SELECT',exact:true});await button.focus();await button.press('Enter');
 await expect(button).toHaveAttribute('aria-expanded','true');
 const box=(await button.boundingBox())!;expect(box.height).toBeGreaterThanOrEqual(44);expect(box.x+box.width).toBeLessThanOrEqual(321);
 await button.press('Space');await expect(button).toHaveAttribute('aria-expanded','false');
 await page.keyboard.press('Escape');await expect(page.locator('.navbar__toggle')).toBeFocused();
 expect(await page.evaluate(()=>({overflow:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)>innerWidth+1,scroll:scrollY}))).toEqual({overflow:false,scroll:0});
 await expect(page).toHaveScreenshot('sql-shared-200.png');
});

test('entrada de Lenguajes: SQL y R, catálogo cerrado y editor y WASM diferidos',async({page})=>{
 const loaded:string[]=[];page.on('request',r=>loaded.push(r.url()));
 await go(page,'/apuntes/lenguajes');await expectSelectedHeaderArea(page,'Lenguajes');
 const catalog=page.locator('[data-catalog="lenguajes"]');await expect(catalog.locator('[data-catalog-item]')).toHaveCount(2);
 await expect(catalog.locator('details[open]')).toHaveCount(0);await expect(page.locator('.cm-editor')).toHaveCount(0);
 expect(loaded.filter(url=>/practice-editor|practice-session|\.wasm(?:\?|$)/.test(url))).toEqual([]);
 await expect(page.getByRole('button',{name:/^Practicar (SQL|R)$/})).toHaveCount(0);
 await expect(page).toHaveScreenshot('sql-languages-area.png');
});
