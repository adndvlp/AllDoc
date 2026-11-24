import {test, expect} from '@playwright/test';
import {caseTitle} from '../../scripts/lib/browser-cases';
import {go, reader, header, fits, noOverflow, activate, scrollRegion, chooseHeaderArea, goHome, searchDialog, topicsDialog} from './application-helpers';
import {profiles, panel, code, openPractice, fillCode, expectCode, capture, scrollInPractice} from './practice-helpers';
import {openCatalogSqlGroup} from '../ui/sql-tree-helpers';

const sql=profiles[0];
test(caseTitle('APP-01'), async ({page}, info) => {
  await go(page);
  const catalog=page.locator('[data-catalog]');
  await expect(catalog.locator('details')).toHaveCount(158);
  await expect(catalog.locator('details[open]')).toHaveCount(0);
  await activate(catalog.getByLabel('SQL',{exact:true}),info);
  await activate(catalog.getByLabel('Tablas y archivos',{exact:true}),info);
  await expect(catalog.locator('[data-catalog-item="sql"] > details')).toHaveAttribute('open','');
  await expect(page).toHaveURL(/\/$/);
  for (const area of ['Desarrollo web','IA','Análisis de datos']) {
    await chooseHeaderArea(page,area);
    await expect(catalog.locator('details[open]')).toHaveCount(0);
    if(area!=='Análisis de datos') {await expect(catalog.getByText('Sin apuntes todavía',{exact:true})).toBeVisible(); await expect(catalog.getByRole('link')).toHaveCount(0);}
  }
  await catalog.getByLabel('SQL',{exact:true}).click();
  await expect(catalog.locator('[data-catalog-item="sql"]').getByRole('link')).toHaveCount(0);
  const where=await openCatalogSqlGroup(page,'WHERE');
  await where.getByRole('link',{name:'Definición',exact:true}).click();
  await expect(page).toHaveURL(/\/sql\/where$/); await expect(page.getByRole('heading',{name:'WHERE',exact:true})).toBeVisible();
  await go(page,'/apuntes/analisis-de-datos');
  for (const [area,id] of [['Desarrollo web','desarrollo-web'],['IA','ia']]) {
    await chooseHeaderArea(page,area); await expect(page).toHaveURL(new RegExp('/apuntes/'+id+'$'));
    await expect(page.getByRole('heading',{level:1,name:area,exact:true})).toBeVisible();
    await expect(catalog.getByText('Sin apuntes todavía',{exact:true})).toBeVisible();
  }
  await noOverflow(page);
});

test(caseTitle('APP-02'), async ({page}, info) => {
  await go(page);
  const trigger=header(page).getByRole('button',{name:/^Elegir área:/});
  if(page.viewportSize()!.width<=996) {
    await activate(trigger,info); const areas=page.getByRole('navigation',{name:'Áreas de estudio',exact:true});
    await fits(page,areas); await areas.getByRole('button',{name:'IA',exact:true}).focus();
    await page.keyboard.press('Escape'); await expect(trigger).toBeFocused(); await expect(trigger).toHaveAttribute('aria-expanded','false');
  }
  const input=page.locator('[data-search-surface="inline"]').getByRole('searchbox');
  await input.fill('cómo filtrar'); const result=page.locator('[data-search-surface="inline"]').getByRole('link').filter({has:page.getByText('WHERE',{exact:true})});
  await expect(result).toHaveCount(1); await input.press('ArrowDown'); await page.keyboard.press('ArrowDown');
  await expect(result).toBeFocused(); await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/sql\/where$/);
  const search=header(page).getByRole('button',{name:'Buscar un concepto',exact:true});
  await activate(search,info); await fits(page,searchDialog(page));
  await searchDialog(page).getByRole('searchbox').fill('limitar');
  await expect(searchDialog(page).locator('a[href="/apuntes/analisis-de-datos/sql/limit"]')).toBeVisible();
  await page.keyboard.press('Escape'); await expect(search).toBeFocused();
  await search.press('ControlOrMeta+k'); await expect(searchDialog(page).getByRole('searchbox')).toHaveValue('limitar');
  await searchDialog(page).getByRole('searchbox').press('ArrowDown'); await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/sql\/limit$/); await noOverflow(page);
});

test(caseTitle('APP-03'), async ({page},info) => {
  await openPractice(page,sql); await fillCode(page,sql,'SELECT 7;');
  await code(page,sql).press('ControlOrMeta+k'); await expect(searchDialog(page)).toBeVisible();
  await expect(page.locator('dialog:modal')).toHaveCount(1);
  await page.keyboard.press('Escape'); await expect(panel(page)).toBeVisible(); await expectCode(page,sql,'SELECT 7;');
  await expect.poll(()=>panel(page).evaluate(el=>el.contains(document.activeElement))).toBe(true);
  // Todos prueban el intercambio con temas; en escritorio también se verifica
  // salir de la disposición compacta sin dejar una capa modal invisible.
  await page.setViewportSize({width:768,height:700});
  await panel(page).getByRole('button',{name:'Abrir temas',exact:true}).click();
  await expect(topicsDialog(page)).toBeVisible(); await expect(page.locator('dialog:modal')).toHaveCount(1);
  await page.keyboard.press('ControlOrMeta+k'); await expect(searchDialog(page)).toBeVisible(); await expect(topicsDialog(page)).toBeHidden();
  await expect(page.locator('dialog:modal')).toHaveCount(1); await page.keyboard.press('Escape');
  await expect(panel(page)).toBeVisible(); await expectCode(page,sql,'SELECT 7;');
  await panel(page).getByRole('button',{name:'Abrir temas',exact:true}).click();
  await page.setViewportSize({width:1280,height:800});
  await expect(topicsDialog(page)).toBeHidden(); await expect(page.locator('dialog:modal')).toHaveCount(0);
  await expect(panel(page)).toBeVisible(); await expectCode(page,sql,'SELECT 7;');
  await capture(page,info,'dialogos-y-contexto');
  await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();
  await expect(page.getByRole('button',{name:'Practicar SQL',exact:true})).toBeFocused();
});

test(caseTitle('APP-04'), async ({page},info) => {
  await go(page,sql.route);
  const star=page.getByRole('button',{name:'Guardar en favoritos',exact:true}); await star.focus(); await page.keyboard.press('Space');
  await expect(page.getByRole('button',{name:'Quitar de favoritos',exact:true})).toHaveAttribute('aria-pressed','true');
  const palette=header(page).locator('summary[aria-label^="Elegir color de texto:"]');
  await palette.click(); await palette.locator('..').getByText('Violeta',{exact:true}).click();
  await page.reload({waitUntil:'networkidle'}); await expect(page.locator('html')).toHaveAttribute('data-palette','violeta');
  await expect(page.getByRole('button',{name:'Quitar de favoritos',exact:true})).toHaveAttribute('aria-pressed','true');
  await goHome(page);
  for(const name of ['Favoritos','Recientes']) await expect(page.getByRole('region',{name,exact:true}).getByRole('link')).toContainText('SELECT');
  await activate(page.getByRole('region',{name:'Favoritos',exact:true}).getByRole('button',{name:'Quitar SELECT de favoritos',exact:true}),info);
  await expect(page.getByRole('region',{name:'Favoritos',exact:true})).toHaveCount(0);
  await page.getByRole('region',{name:'Recientes',exact:true}).getByRole('link').filter({hasText:'SELECT'}).click();
  const add=page.getByRole('button',{name:'Guardar en favoritos',exact:true}); await add.focus(); await add.press('Space');
  await expect(page.getByRole('button',{name:'Quitar de favoritos',exact:true})).toHaveAttribute('aria-pressed','true');
  await goHome(page);
  const remove=page.getByRole('region',{name:'Favoritos',exact:true}).getByRole('button',{name:'Quitar SELECT de favoritos',exact:true});
  await remove.focus(); await remove.press('Enter');
  await expect(page.getByRole('region',{name:'Favoritos',exact:true})).toHaveCount(0);
  await expect(page.locator('[data-search-surface="inline"]').getByRole('searchbox')).toBeFocused();
  await expect(page.getByRole('region',{name:'Recientes',exact:true}).getByRole('link')).toContainText('SELECT');
});

test(caseTitle('APP-05'), async ({page},info) => {
  const width=page.viewportSize()!.width; await page.setViewportSize({width,height:400}); await go(page,sql.route);
  for(const summary of await reader(page).locator('summary').all()) await summary.click();
  await expect.poll(()=>reader(page).evaluate(el=>el.scrollHeight-el.clientHeight)).toBeGreaterThan(0);
  await reader(page).evaluate(el=>{el.scrollTop=30;}); const initial=await reader(page).evaluate(el=>el.scrollTop);
  const compact=width<=996; if(compact) await header(page).locator('.navbar__toggle').click();
  const menu=compact?topicsDialog(page):page.locator('.theme-doc-sidebar-container');
  for(const label of ['SQL','Tablas y archivos','Pandas','openpyxl','Cálculo científico','NumPy','SciPy','Visualización','Matplotlib','Seaborn','Conexiones SQL','Peticiones y formatos']){const button=menu.getByRole('button',{name:label,exact:true});if(await button.getAttribute('aria-expanded')==='false')await button.click();}
  // Se vuelve a medir después de cerrar el menú: el selector DOM conserva
  // acceso al nodo oculto, mientras getByRole lo excluiría por accesibilidad.
  const side=page.locator(compact?'.navbar-sidebar .navbar-sidebar__item':'.theme-doc-sidebar-container nav.menu');
  // La última categoría puede seguir en su transición height:0 -> auto al
  // regresar click(). La acción espera una posición estable del último tema.
  await menu.getByRole('button',{name:'Tableau',exact:true}).scrollIntoViewIfNeeded();
  await side.evaluate(el=>{el.scrollTop=0;});
  await expect.poll(()=>side.evaluate(el=>el.scrollHeight-el.clientHeight)).toBeGreaterThan(0);
  await scrollRegion(page,side,0,await side.evaluate(el=>el.scrollHeight),info); await expect.poll(()=>side.evaluate(el=>el.scrollTop)).toBeGreaterThan(0);
  let dimensions:unknown;
  try {
    await expect.poll(async()=>{
      const state=await side.evaluate(async el=>{
        const before={top:el.scrollTop,height:el.scrollHeight};
        await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));
        return {top:el.scrollTop,height:el.scrollHeight,client:el.clientHeight,remaining:el.scrollHeight-el.clientHeight-el.scrollTop,drift:el.scrollTop-before.top,heightStable:el.scrollHeight===before.height};
      });
      dimensions=state; return Math.abs(state.remaining)<=1 && Math.abs(state.drift)<.5 && state.heightStable;
    }).toBe(true);
  } finally {await info.attach('dimensiones-sidebar',{body:JSON.stringify(dimensions??{state:'not-sampled'}),contentType:'application/json'});}
  expect(await reader(page).evaluate(el=>el.scrollTop)).toBe(initial);
  if(compact) await page.keyboard.press('Escape');
  const sidebarPosition=await side.evaluate(el=>el.scrollTop), navbar=await page.locator('.navbar').boundingBox();
  for(const bottom of [true,false]) {
    await reader(page).evaluate((el,bottom)=>{el.scrollTop=bottom?el.scrollHeight:0;},bottom);
    const position=await reader(page).evaluate(el=>el.scrollTop);
    await scrollRegion(page,reader(page),0,bottom?2000:-2000,info);
    await expect.poll(()=>reader(page).evaluate(el=>el.scrollTop)).toBe(position);
    expect(await side.evaluate(el=>el.scrollTop)).toBe(sidebarPosition); expect(await page.locator('.navbar').boundingBox()).toEqual(navbar);
  }
  await page.setViewportSize({width,height:2400}); await go(page,'/apuntes/analisis-de-datos/sql/where');
  await expect.poll(()=>reader(page).evaluate(el=>el.scrollHeight<=el.clientHeight+1)).toBe(true);
  await scrollRegion(page,reader(page),0,2000,info); await expect.poll(()=>reader(page).evaluate(el=>el.scrollTop)).toBe(0);
  await noOverflow(page);
});

test(caseTitle('APP-06'), async ({page},info) => {
  const initial=page.viewportSize()!; await openPractice(page,sql);
  if(initial.width>=768) {
    await expect(panel(page)).toHaveAttribute('data-layout',initial.width>996?'parallel':'bottom');
    const separator=page.getByRole('separator',{name:'Tamaño de práctica',exact:true}); await fits(page,separator);
    const before=Number(await separator.getAttribute('aria-valuenow'));
    await separator.press((await separator.getAttribute('aria-orientation'))==='vertical'?'ArrowLeft':'ArrowUp');
    await expect.poll(async()=>Number(await separator.getAttribute('aria-valuenow'))).toBeGreaterThan(before);
    if(initial.width>996) {
      const box=(await separator.boundingBox())!; await page.mouse.move(box.x+box.width/2,box.y+box.height/2); await page.mouse.down(); await page.mouse.move(box.x-30,box.y+box.height/2); await page.mouse.up();
      const value=Number(await separator.getAttribute('aria-valuenow')); expect(value).toBeGreaterThanOrEqual(Number(await separator.getAttribute('aria-valuemin'))); expect(value).toBeLessThanOrEqual(Number(await separator.getAttribute('aria-valuemax')));
    }
    await separator.press('Home'); await expect(separator).toHaveAttribute('aria-valuenow',String(before));
  } else await expect(panel(page)).toHaveAttribute('data-layout','modal');
  await page.addStyleTag({content:'html {font-size:200% !important}'});
  await expect.poll(()=>code(page,sql).evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(27);
  await fits(page,panel(page).getByRole('button',{name:'Volver al apunte',exact:true}));
  const editor=panel(page).locator('.cm-editor');
  await scrollInPractice(editor); await fits(page,editor); await noOverflow(page);
  if(initial.width<768) {
    await page.setViewportSize({width:320,height:568}); await fits(page,panel(page));
    await page.setViewportSize({width:844,height:390}); await fits(page,panel(page).getByRole('button',{name:'Volver al apunte',exact:true}));
    await scrollInPractice(code(page,sql).locator('.cm-line').first());
    await code(page,sql).press('End'); await noOverflow(page);
  }
  await capture(page,info,'adaptacion-200');
  await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click(); await noOverflow(page);
});
