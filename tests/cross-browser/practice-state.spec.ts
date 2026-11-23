import {openPracticeRegion, practiceResults,selectPracticeTable,practiceRegion} from '../ui/practice-helpers';
import {test,expect} from '@playwright/test';
import {caseTitle} from '../../scripts/lib/browser-cases';
import {pandasExampleCode} from '../../src/practice/datasets/materialize.ts';
import {productsDataset} from '../../src/practice/datasets/rows/products.ts';
import {profiles,panel,code,runButton,openPractice,ready,fillCode,expectCode,execute,completion,showResults,codeAction,savedCode} from './practice-helpers';

for(const profile of profiles) {
  test.describe(profile.label,()=>{
    test.setTimeout(profile.id==='PY'?120_000:45_000);
    test(caseTitle(profile.id+'-06'),async({page})=>{
      await openPractice(page,profile);
      if(profile.id==='SQL') {
        await execute(page,profile,'CREATE TABLE ventas(total INTEGER); INSERT INTO ventas VALUES(7); UPDATE productos SET precio=1; SELECT * FROM ventas;');
        await openPracticeRegion(page,'data');
        await expect(await selectPracticeTable(page,'ventas')).toContainText('7');
        await fillCode(page,profile,'SELECT * FROM ven'); await code(page,profile).press('Control+Space'); await expect(completion(page,'ventas')).toBeVisible(); await code(page,profile).press('Escape');
      } else {
        await execute(page,profile,'numero=7\nproductos["precio"]=1\nventas=productos.rename(columns={"precio":"importe"})\nproductos');
        await execute(page,profile,'numero+1'); await expect(panel(page).locator('pre')).toHaveText('8');
        await fillCode(page,profile,'ventas["imp"]'); await code(page,profile).press('ArrowLeft'); await code(page,profile).press('ArrowLeft'); await code(page,profile).press('Control+Space');
        await expect(completion(page,'importe')).toBeVisible(); await code(page,profile).press('Escape');
      }
      await openPracticeRegion(page,'data');
      await expect((await selectPracticeTable(page,'productos')).getByRole('row').nth(1).getByRole('cell')).toHaveText(profile.id==='SQL'?['1','Teclado','Accesorios','1','45','1','1']:['Teclado','Accesorios','1']);
      const kept=profile.id==='SQL'?'SELECT * FROM productos;':'pd.DataFrame=None'; await fillCode(page,profile,kept);
      if(profile.id==='PY') {await runButton(page).click(); await showResults(page); await expect(panel(page).getByText('Ejecución completada',{exact:true})).toBeVisible();}
      await panel(page).getByRole('button',{name:'Reiniciar entorno',exact:true}).click();
      await openPracticeRegion(page,'editor'); await expectCode(page,profile,kept); await ready(page,profile);
      if(profile.id==='PY') {
        await fillCode(page,profile,'numero'); await runButton(page).click(); await showResults(page);
        await expect(panel(page).getByRole('alert')).toContainText('numero');
        await execute(page,profile,'pd.DataFrame({"ok":[1]})'); await expect(practiceResults(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['1']);
      }
      await execute(page,profile,profile.id==='SQL'?'SELECT precio FROM productos ORDER BY precio;':'productos[["precio"]]');
      await expect(practiceResults(page).getByRole('table')).toContainText('500'); await expect(practiceResults(page).getByRole('table')).toContainText('3500');
      await openPracticeRegion(page,'data'); await expect(practiceRegion(page,'data').getByRole('combobox',{name:'Tabla de datos',exact:true}).locator('option[value="ventas"]')).toHaveCount(0);
    });

    test(caseTitle(profile.id+'-07'),async({page})=>{
      await openPractice(page,profile);
      const initial=profile.id==='SQL'?'SELECT * FROM productos;':pandasExampleCode(productsDataset.tables[0]);
      await expectCode(page,profile,initial);
      const mutation=profile.id==='SQL'?'UPDATE productos SET precio=1; SELECT * FROM productos;':'productos["precio"]=1\nproductos';
      await execute(page,profile,mutation); await savedCode(page,profile,mutation);
      await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();
      const example=profile.id==='SQL'?'Columnas concretas':'Crear una tabla de productos';
      await page.getByRole('button',{name:(profile.id==='SQL'?'Probar en SQLite: ':'Probar este ejemplo: ')+example,exact:true}).click();
      await expect(code(page,profile)).toBeFocused();
      if(profile.id==='SQL') await expectCode(page,profile,'SELECT nombre, precio FROM productos;'); else await expectCode(page,profile,initial);
      await showResults(page); await expect(panel(page).getByText('Este resultado corresponde a una versión anterior del código.',{exact:true})).toBeVisible();
      await codeAction(page,'Recuperar código anterior'); await expectCode(page,profile,mutation);
      await codeAction(page,'Restaurar código inicial'); await expectCode(page,profile,initial);
      await openPracticeRegion(page,'data');
      await expect((await selectPracticeTable(page,'productos')).getByRole('row').nth(1).getByRole('cell')).toHaveText(profile.id==='SQL'?['1','Teclado','Accesorios','1','45','1','1']:['Teclado','Accesorios','1']);
      await savedCode(page,profile,initial); await page.reload({waitUntil:'networkidle'});
      await page.getByRole('button',{name:'Practicar '+profile.label,exact:true}).click(); await ready(page,profile);
      await codeAction(page,'Recuperar código anterior'); await expectCode(page,profile,mutation); await expect(code(page,profile)).toBeFocused();
    });

    test(caseTitle(profile.id+'-08'),async({page})=>{
      await openPractice(page,profile); const html='<img src=x onerror=alert(1)>';
      if(profile.id==='SQL') {
        await execute(page,profile,"SELECT nombre FROM productos WHERE 0; SELECT '"+html+"' AS texto, NULL AS vacio;");
        await expect(practiceResults(page).getByRole('table')).toHaveCount(2); await expect(practiceResults(page).getByRole('table').first().getByRole('row')).toHaveCount(1);
      } else await execute(page,profile,'pd.DataFrame({"texto":["'+html+'"],"vacio":[None]})');
      await expect(practiceResults(page).getByRole('table').last().getByRole('row').nth(1).getByRole('cell')).toHaveText([html,'NULL']);
      await expect(panel(page).locator('img')).toHaveCount(0);
      if(profile.id==='PY') {await execute(page,profile,'productos.head(0)'); await expect(practiceResults(page).getByRole('table').getByRole('row')).toHaveCount(1);}
    });

    test(caseTitle(profile.id+'-09'),async({page})=>{
      const requests:string[]=[]; page.on('request',r=>requests.push(r.url())); await openPractice(page,profile);
      await page.evaluate(()=>{localStorage.setItem('browser-isolation-secret','app-only'); document.cookie='browser-isolation-secret=app-only;path=/';});
      const element=page.locator('iframe[data-practice-runtime]'); await expect(element).toHaveAttribute('sandbox','allow-scripts allow-same-origin');
      const handle=await element.elementHandle(), frame=(await handle!.contentFrame())!;
      expect(new URL(frame.url()).hostname).not.toBe(new URL(page.url()).hostname);
      const checks=await frame.evaluate(async app=>{
        let parentDenied=false,networkDenied=false,navigationDenied=false,secret:string|null='unavailable',cookie='';
        try {void parent.localStorage.getItem('browser-isolation-secret');} catch {parentDenied=true;}
        try {await fetch(app,{credentials:'include'});} catch {networkDenied=true;}
        try {top!.location.href=app+'/forbidden-navigation';} catch {navigationDenied=true;}
        try {secret=localStorage.getItem('browser-isolation-secret'); cookie=document.cookie;} catch { /* Una política más restrictiva tampoco revela el secreto. */ }
        return {parentDenied,networkDenied,navigationDenied,secret,cookie};
      },new URL(page.url()).origin);
      expect(checks).toMatchObject({parentDenied:true,networkDenied:true,navigationDenied:true}); expect([null,'unavailable']).toContain(checks.secret); expect(checks.cookie).not.toContain('app-only');
      if(profile.id==='PY') {
        await fillCode(page,profile,'from js import localStorage'); await runButton(page).click(); await showResults(page);
        await expect(panel(page).getByRole('alert')).toContainText('localStorage');
      }
      await expect(page).toHaveURL(new RegExp(profile.route+'$')); expect(await page.evaluate(()=>localStorage.getItem('browser-isolation-secret'))).toBe('app-only');
      await execute(page,profile,profile.query); await expect(practiceResults(page).getByRole('table')).toContainText('3500');
      const runtimeRequests=requests.filter(url=>/\.wasm(?:\?|$)|\.whl(?:\?|$)/.test(url)); expect(runtimeRequests.length).toBeGreaterThan(0);
      expect(runtimeRequests.every(url=>new URL(url).hostname===new URL(frame.url()).hostname)).toBe(true);
    });
  });
}
