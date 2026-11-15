import {test,expect} from '@playwright/test';
import {caseTitle} from '../../scripts/lib/browser-cases';
import {profiles,panel,code,runButton,openPractice,ready,fillCode,expectCode,execute,showResults,expectNoExecution,codeAction,savedCode} from './practice-helpers';
import {go} from './application-helpers';

for(const profile of profiles) {
  test.describe(profile.label,()=>{
    test.setTimeout(profile.id==='PY'?120_000:45_000);
    const busy=profile.id==='SQL'?'WITH RECURSIVE n(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM n) SELECT sum(x) FROM n;':'productos["precio"]=1\nwhile True:\n    pass';
    test(caseTitle(profile.id+'-10'),async({page})=>{
      await openPractice(page,profile); await fillCode(page,profile,busy); await runButton(page).click();
      await expect(panel(page).getByRole('button',{name:'Detener',exact:true})).toBeVisible();
      await code(page,profile).fill(profile.query); await code(page,profile).press('End');
      await panel(page).getByRole('button',{name:'Detener',exact:true}).click(); await expectCode(page,profile,profile.query);
      await expect(panel(page)).toContainText('Entorno reiniciado'); await ready(page,profile);
      await execute(page,profile,profile.query); await expect(panel(page).getByRole('table')).toContainText('3500');
    });
    test(caseTitle(profile.id+'-11'),async({page})=>{
      await openPractice(page,profile); await fillCode(page,profile,busy); await runButton(page).click(); await showResults(page);
      await expect(panel(page).getByText('Se alcanzó el tiempo máximo',{exact:true})).toBeVisible({timeout:15_000});
      await panel(page).getByRole('tab',{name:'Código',exact:true}).click(); await expectCode(page,profile,busy);
      await ready(page,profile); await execute(page,profile,profile.query); await expect(panel(page).getByRole('table')).toContainText('3500');
    });
    test(caseTitle(profile.id+'-12'),async({page})=>{
      await openPractice(page,profile);
      await execute(page,profile,profile.id==='SQL'?'WITH RECURSIVE n(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM n WHERE x<1000) SELECT x FROM n;':'pd.DataFrame({"numero":range(1000)})');
      await expect(panel(page).getByText('Vista previa truncada.',{exact:true})).toBeVisible();
      await expect(panel(page).getByRole('table').getByRole('row')).toHaveCount(201);
      await execute(page,profile,profile.query); await expect(panel(page).getByRole('table').getByRole('row')).toHaveCount(3);
    });
    test(caseTitle(profile.id+'-13'),async({page})=>{
      const pattern=profile.id==='SQL'?'**/alldoc-sqlite.*.js':'**/python/**/*.whl';
      await page.route(pattern,route=>route.abort()); await openPractice(page,profile,false);
      await expect(panel(page).getByRole('button',{name:'Reintentar',exact:true})).toBeVisible({timeout:30_000});
      await fillCode(page,profile,profile.query); await savedCode(page,profile,profile.query);
      await page.unroute(pattern); await panel(page).getByRole('button',{name:'Reintentar',exact:true}).click(); await ready(page,profile);
      await expectCode(page,profile,profile.query); await expectNoExecution(page);
      expect(page.frames().filter(frame=>new URL(frame.url()).hostname==='localhost')).toHaveLength(1);
      await execute(page,profile,profile.query); await expect(panel(page).getByRole('table')).toContainText('3500');
    });
  });
}

test(caseTitle('ERR-01'),async({page,context})=>{
  test.setTimeout(60_000); const sql=profiles[0], pattern='**/*practice-session*.js';
  let release!:()=>void; const gate=new Promise<void>(resolve=>{release=resolve;}); let requested=false;
  await page.route(pattern,async route=>{requested=true; await gate; await route.continue();});
  try {
    await go(page,sql.route); await page.getByRole('button',{name:'Probar este ejemplo: Columnas concretas',exact:true}).click();
    await expect.poll(()=>requested).toBe(true); await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();
  } finally {release();}
  await expect(panel(page)).toBeHidden(); await page.unroute(pattern);
  await page.getByRole('button',{name:'Probar este ejemplo: Columnas concretas',exact:true}).click(); await ready(page,sql);
  await expectCode(page,sql,'SELECT nombre, precio FROM productos;'); await expectNoExecution(page);
  const other=await context.newPage();
  try {
    await other.route(pattern,route=>route.abort()); await go(other,sql.route);
    await other.getByRole('button',{name:'Probar este ejemplo: Columnas concretas',exact:true}).click();
    await expect(panel(other).getByRole('button',{name:'Reintentar',exact:true})).toBeVisible();
    await other.unroute(pattern); await panel(other).getByRole('button',{name:'Reintentar',exact:true}).click(); await ready(other,sql);
    await expectCode(other,sql,'SELECT nombre, precio FROM productos;'); await expectNoExecution(other); await expect(panel(other).locator('.cm-editor')).toHaveCount(1);
  } finally {await other.close();}
});

test(caseTitle('ERR-02'),async({page})=>{
  const sql=profiles[0];
  await page.addInitScript(()=>{
    if(window.top!==window) return;
    const original=window.indexedDB;
    Object.defineProperty(window,'indexedDB',{configurable:true,get(){throw new DOMException('blocked','SecurityError');}});
    window.addEventListener('browser-enable-idb',()=>Object.defineProperty(window,'indexedDB',{configurable:true,value:original}),{once:true});
  });
  await openPractice(page,sql); await expect(panel(page).getByText('Guardado en esta sesión',{exact:true})).toBeVisible();
  await fillCode(page,sql,'SELECT 42;'); await codeAction(page,'Restaurar código inicial'); await expectCode(page,sql,'SELECT * FROM productos;');
  await page.evaluate(()=>window.dispatchEvent(new Event('browser-enable-idb'))); await codeAction(page,'Reintentar guardado');
  await savedCode(page,sql,'SELECT * FROM productos;'); await expect(panel(page).getByText('Guardado local',{exact:true})).toBeVisible();
  await page.reload({waitUntil:'networkidle'}); await page.evaluate(()=>window.dispatchEvent(new Event('browser-enable-idb')));
  await page.getByRole('button',{name:'Practicar SQL',exact:true}).click(); await ready(page,sql);
  await codeAction(page,'Recuperar código anterior'); await expectCode(page,sql,'SELECT 42;'); await expectNoExecution(page);
});
