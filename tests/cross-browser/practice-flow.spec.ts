import {practiceResults} from '../ui/practice-helpers';
import {test,expect} from '@playwright/test';
import {caseTitle} from '../../scripts/lib/browser-cases';
import {profiles,panel,code,openPractice,ready,fillCode,execute,expectCode,expectNoExecution,savedCode,searchTo} from './practice-helpers';
import {reader,noOverflow,scrollRegion,fits} from './application-helpers';
const [sql,python]=profiles;
test(caseTitle('FLOW-01'),async({page})=>{
  test.setTimeout(120_000);
  await openPractice(page,sql); await execute(page,sql,'UPDATE productos SET precio=1; SELECT precio FROM productos;');
  const sqlDraft='SELECT precio FROM productos;'; await fillCode(page,sql,sqlDraft); await savedCode(page,sql,sqlDraft);
  await searchTo(page,'WHERE'); await ready(page,sql); await expectCode(page,sql,sqlDraft);
  await execute(page,sql,sqlDraft); await expect(practiceResults(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['1']);
  await searchTo(page,'DataFrame'); await ready(page,python); await execute(page,python,'productos[["precio"]]');
  await expect(practiceResults(page).getByRole('table')).toContainText('500');
  const pythonDraft='productos.head(2)'; await fillCode(page,python,pythonDraft); await savedCode(page,python,pythonDraft);
  await page.reload({waitUntil:'networkidle'}); await expect(panel(page)).toBeHidden();
  await page.getByRole('button',{name:'Practicar pandas',exact:true}).click(); await ready(page,python); await expectCode(page,python,pythonDraft); await expectNoExecution(page);
  await searchTo(page,'SELECT'); await ready(page,sql); await expectCode(page,sql,sqlDraft); await expectNoExecution(page);
  await execute(page,sql,sqlDraft); await expect(practiceResults(page).getByRole('table')).toContainText('500');
});

test(caseTitle('FLOW-02'),async({page},info)=>{
  await openPractice(page,sql); const position=await reader(page).evaluate(el=>el.scrollTop), navbar=await page.locator('.navbar').boundingBox();
  await code(page,sql).fill(Array.from({length:180},(_,i)=>'-- apunte '+i).join('\n')+'\nSELECT 1;');
  await code(page,sql).press('ControlOrMeta+Home');
  const scroller=panel(page).locator('.cm-scroller'); await expect.poll(()=>scroller.evaluate(el=>el.scrollHeight-el.clientHeight)).toBeGreaterThan(0);
  await scrollRegion(page,scroller,0,1000,info); await expect.poll(()=>scroller.evaluate(el=>el.scrollTop)).toBeGreaterThan(0);
  expect(await reader(page).evaluate(el=>el.scrollTop)).toBe(position); expect(await page.locator('.navbar').boundingBox()).toEqual(navbar);
  await execute(page,sql,"SELECT printf('%0300d',1) AS texto FROM productos;");
  const region=panel(page).getByRole('region',{name:/^Tabla de resultado/}); await fits(page,region);
  // Infima puede convertir table en un bloque con overflow propio. La prueba
  // sigue al scroller real y conserva la comprobación del contenedor acotado.
  const table=await region.evaluate(el=>el.scrollWidth>el.clientWidth+1)?region:region.getByRole('table');
  await expect.poll(()=>table.evaluate(el=>el.scrollWidth-el.clientWidth)).toBeGreaterThan(0);
  await scrollRegion(page,table,900,0,info,region); await expect.poll(()=>table.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);
  expect(await reader(page).evaluate(el=>el.scrollTop)).toBe(position); expect(await page.locator('.navbar').boundingBox()).toEqual(navbar); await noOverflow(page);
});
