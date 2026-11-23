import {test,expect,type Page,type TestInfo} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
import {visualTitle,visualPolicy,type VisualState} from '../../scripts/lib/browser-visual';
import {go,noOverflow,fits,header,searchDialog,topicsDialog} from './application-helpers';
import {profiles,panel,code,openPractice,fillCode,execute,completion,expectCode} from './practice-helpers';

const sql=profiles[0],python=profiles[1];
async function reference(page:Page,info:TestInfo,image:string,fontScale=1) {
  await test.step('Referencia visual: '+image,async()=>{
    await page.evaluate(async()=>{await document.fonts.ready;});
    await expect.poll(()=>page.locator('img').evaluateAll(images=>images.every(img=>(img as HTMLImageElement).complete&&(img as HTMLImageElement).naturalWidth>0))).toBe(true);
    await page.mouse.move(0,0); await noOverflow(page);
    // Solo se estabiliza el cursor dibujado por CodeMirror. Código, tablas,
    // controles y estados de guardado permanecen visibles y sin máscaras.
    await expect(page).toHaveScreenshot(image,{...visualPolicy,stylePath:'tests/cross-browser/visual-stabilize.css'});
    const state:VisualState={project:info.project.name,image,viewport:page.viewportSize()!,fontScale};
    const statePath=info.outputPath(image+'.state.json'); await writeFile(statePath,JSON.stringify(state));
    await info.attach('visual-state-'+image,{path:statePath,contentType:'application/json'});
  });
}

test(visualTitle('VIS-01'),async({page},info)=>{
  await go(page); await expect(page.locator('[data-catalog] details')).toHaveCount(58);
  await expect(page.locator('[data-catalog] details[open]')).toHaveCount(0);
  await expect(page.locator('[data-search-surface="inline"]').getByRole('searchbox')).toBeVisible();
  await reference(page,info,'inicio.png');
});

test(visualTitle('VIS-02'),async({page},info)=>{
  await openPractice(page,sql); await fillCode(page,sql,sql.query);
  await expect(panel(page).getByText('Guardado local',{exact:true})).toBeVisible();
  await reference(page,info,'sql-codigo.png');
  await execute(page,sql,sql.query);
  await expect(panel(page).getByText('Guardado local',{exact:true})).toBeVisible();
  const table=panel(page).getByRole('table');
  await expect(table.getByRole('columnheader')).toHaveText(['nombre','precio']);
  await expect(table.getByRole('row')).toHaveCount(3);
  for(let i=0;i<sql.rows.length;i++) await expect(table.getByRole('row').nth(i+1).getByRole('cell')).toHaveText([...sql.rows[i]]);
  await reference(page,info,'sql-resultado.png');
  await panel(page).getByRole('tab',{name:'Datos',exact:true}).click();
  const data=panel(page).getByRole('table',{name:'Datos de productos',exact:true});
  await expect(data.getByRole('row')).toHaveCount(4);await expect(data).toContainText('Teclado');await expect(data).toContainText('3500');
  await reference(page,info,'sql-datos.png');
});

test(visualTitle('VIS-03'),async({page},info)=>{
  test.setTimeout(120_000); await openPractice(page,python); await execute(page,python,python.query);
  await expect(panel(page).getByText('Guardado local',{exact:true})).toBeVisible();
  const table=panel(page).getByRole('table'); await expect(table.getByRole('columnheader')).toHaveText(['nombre','precio']);
  await expect(table.getByRole('row')).toHaveCount(3);
  for(let i=0;i<python.rows.length;i++) await expect(table.getByRole('row').nth(i+1).getByRole('cell')).toHaveText([...python.rows[i]]);
  await reference(page,info,'pandas-resultado.png');
  await fillCode(page,python,'import pandas as pd\npd.Da');
  await expect(panel(page).getByText('Guardado local',{exact:true})).toBeVisible();
  await code(page,python).press('Control+Space');
  await expect(completion(page,'DataFrame')).toBeVisible({timeout:15_000});
  await reference(page,info,'pandas-sugerencias.png');
  await completion(page,'DataFrame').click();await expectCode(page,python,'import pandas as pd\npd.DataFrame');
});

test(visualTitle('VIS-04'),async({page},info)=>{
  await openPractice(page,sql);await fillCode(page,sql,'SELECT nombre FROM productos;');
  await expect(panel(page).getByText('Guardado local',{exact:true})).toBeVisible();
  await code(page,sql).press('ControlOrMeta+k');await expect(searchDialog(page)).toBeVisible();
  await searchDialog(page).getByRole('searchbox').fill('filtrar');
  await expect(searchDialog(page).getByRole('link').filter({hasText:'WHERE'})).toHaveCount(1);
  await expect(page.locator('dialog:modal')).toHaveCount(1);
  await reference(page,info,'practica-busqueda.png');
  await page.keyboard.press('Escape');await expect(panel(page)).toBeVisible();
  await expectCode(page,sql,'SELECT nombre FROM productos;');
  if(info.project.use.viewport!.width<=996) {
    await panel(page).getByRole('button',{name:'Abrir temas',exact:true}).click();
    await expect(topicsDialog(page)).toBeVisible();await expect(page.locator('dialog:modal')).toHaveCount(1);
    await reference(page,info,'practica-temas.png');
    await page.keyboard.press('Escape');await expect(panel(page)).toBeVisible();
  } else {
    const sidebar=page.locator('.theme-doc-sidebar-container');await expect(sidebar).toBeVisible();
    const toggle=sidebar.getByRole('button',{name:'SQL',exact:true});
    if(await toggle.getAttribute('aria-expanded')!=='true') await toggle.click();
    await expect(sidebar.getByRole('link',{name:'WHERE',exact:true})).toBeVisible();
    await reference(page,info,'practica-temas.png');
  }
});

test(visualTitle('VIS-05'),async({page},info)=>{
  await page.setViewportSize({width:320,height:568});await openPractice(page,sql);
  await page.addStyleTag({content:'html {font-size:200% !important}'});
  await expect.poll(()=>code(page,sql).evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(27);
  await fits(page,panel(page).getByRole('button',{name:'Volver al apunte',exact:true}));
  await reference(page,info,'320-texto-200.png',2);
  await page.setViewportSize({width:844,height:390});
  await fits(page,panel(page).getByRole('button',{name:'Volver al apunte',exact:true}));
  await reference(page,info,'horizontal-texto-200.png',2);
  await code(page,sql).scrollIntoViewIfNeeded();await expect(code(page,sql)).toBeInViewport();
  await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();
  await expect(panel(page)).toBeHidden();await noOverflow(page);
});
