import {test,expect,type Page} from '@playwright/test';
import {chooseHeaderArea} from './header-helpers';
const panel=(page:Page)=>page.locator('dialog[data-practice-panel]');
const editor=(page:Page)=>panel(page).getByRole('textbox',{name:'Código SQL',exact:true});
const region=(page:Page,name:'data'|'editor'|'results')=>panel(page).locator(`[data-practice-region="${name}"]`);
async function expand(page:Page,name:'data'|'editor'|'results'){
 const label={data:'Datos',editor:'Editor',results:'Resultado'}[name];const button=region(page,name).getByRole('button',{name:label,exact:true});
 if(await button.getAttribute('aria-expanded')==='false')await button.click();
}
async function execute(page:Page,content:string,language:'SQL'|'pandas'='SQL'){
 await expand(page,'editor');const input=panel(page).getByRole('textbox',{name:'Código '+language,exact:true});
 const run=panel(page).locator('[data-practice-run]');const previous=await run.count()?await run.getAttribute('data-practice-run'):null;
 await input.fill(content);await expect(panel(page).getByRole('button',{name:'Ejecutar',exact:true})).toBeEnabled();await input.press('ControlOrMeta+Enter');
 await expect.poll(async()=>{const current=await panel(page).locator('[data-practice-run]').getAttribute('data-practice-run');return current!==null&&current!==previous;}).toBe(true);
 await expect(region(page,'results').getByText('Ejecución completada',{exact:true})).toBeVisible();
}
async function open(page:Page){
 await page.goto('/apuntes/analisis-de-datos/sql/select',{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Practicar SQL',exact:true}).click();
 await expect(panel(page).getByRole('button',{name:'Ejecutar',exact:true})).toBeEnabled();
 await expect(editor(page)).toBeVisible();
}
async function snapshot(page:Page,name:string){
 await expect(panel(page).getByText('Guardado local',{exact:true})).toBeVisible();
 await expect(page).toHaveScreenshot(name);
}
test('regiones en orden: datos y editor conviven; resultado aparece solo al ejecutar sin sustituir el código',async({page})=>{
 await open(page);
 await expect(panel(page).getByRole('tablist')).toHaveCount(0);
 expect(await panel(page).locator('[data-practice-region]').evaluateAll(regions=>regions.map(region=>region.getAttribute('data-practice-region')))).toEqual(['data','editor']);
 await expect(panel(page).locator('[data-practice-region="results"]')).toHaveCount(0);
 await panel(page).locator('.cm-editor').evaluate(element=>element.setAttribute('data-instance-test','original'));
 await editor(page).fill('SELECT nombre,precio FROM productos WHERE id<=3 AND precio>1000 ORDER BY precio DESC;');
 await editor(page).press('ControlOrMeta+Enter');
 const result=panel(page).locator('[data-practice-region="results"]');
 await expect(result).toBeVisible();await expect(result.getByText('Ejecución completada',{exact:true})).toBeVisible();
 await expect(result.getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['Monitor','3500']);
 await expect(editor(page)).toBeVisible();await expect(editor(page)).toBeFocused();
 await expect(panel(page).locator('.cm-editor')).toHaveAttribute('data-instance-test','original');
 expect(await panel(page).locator('[data-practice-region]').evaluateAll(regions=>regions.map(region=>region.getAttribute('data-practice-region')))).toEqual(['data','editor','results']);
 await region(page,'editor').getByRole('button',{name:'Ir al resultado',exact:true}).click();
 await snapshot(page,'practice-regions-result.png');
});

test('datos elegidos: una vista previa, veinte filas como máximo, esquema vivo y consulta sobre todas las tablas',async({page})=>{
 await open(page);await expand(page,'data');const choice=panel(page).getByRole('combobox',{name:'Tabla de datos',exact:true});
 await expect(choice.locator('option')).toHaveCount(13);await expect(choice).toHaveValue('productos');await expect(region(page,'data').getByRole('table')).toHaveCount(1);
 await expect(region(page,'data').getByRole('table').getByRole('row')).toHaveCount(19);
 await choice.selectOption('clientes');await expect(region(page,'data')).toContainText('24 filas');await expect(region(page,'data').getByRole('table').locator('tbody tr')).toHaveCount(20);
 await expect(editor(page)).toHaveText('SELECT * FROM productos;');await expect(region(page,'results')).toHaveCount(0);
 await region(page,'data').getByRole('button',{name:'Ver esquema',exact:true}).click();await expect(region(page,'data').getByRole('region',{name:'Esquema actual',exact:true})).toContainText('proveedor_id → proveedores (id)');
 await snapshot(page,'practice-regions-data.png');
 await execute(page,'CREATE TABLE practica_nueva(id INTEGER PRIMARY KEY); INSERT INTO practica_nueva VALUES(7); SELECT count(*) AS total FROM pedidos;');
 await expect(region(page,'results').getByRole('table').getByRole('row').nth(1)).toContainText('48');
 await expect(choice.locator('option')).toHaveCount(14);await choice.selectOption('practica_nueva');await expect(region(page,'data').getByRole('table')).toContainText('7');
 await execute(page,'DROP TABLE practica_nueva;');await expect(choice.locator('option')).toHaveCount(13);await expect(choice).toHaveValue('productos');
 await panel(page).getByRole('button',{name:'Reiniciar entorno',exact:true}).click();await expect(editor(page)).toHaveText('DROP TABLE practica_nueva;');await expect(region(page,'results')).toHaveCount(0);
});

test('plegado y rotación: una instancia, selección conservada y aperturas elegidas sin reinicio',async({page})=>{
 await page.setViewportSize({width:1920,height:1080});await open(page);await expect(panel(page)).toHaveAttribute('data-surface','stacked');
 const data=region(page,'data').getByRole('button',{name:'Datos',exact:true});await expect(data).toHaveAttribute('aria-expanded','true');await data.click();
 const content='SELECT 42 AS valor;\nSELECT * FROM no_existe;';await editor(page).fill(content);await panel(page).locator('.cm-editor').evaluate(e=>e.setAttribute('data-instance-test','same'));
 await editor(page).press('ControlOrMeta+Home');for(let i=0;i<'SELECT 42 AS valor;'.length;i++)await editor(page).press('Shift+ArrowRight');
 const toggle=region(page,'editor').getByRole('button',{name:'Editor',exact:true});await toggle.click();await expect(editor(page)).toBeHidden();
 await page.setViewportSize({width:390,height:844});await expect(data).toHaveAttribute('aria-expanded','false');await expect(toggle).toHaveAttribute('aria-expanded','false');
 await page.setViewportSize({width:768,height:1024});await expect(data).toHaveAttribute('aria-expanded','false');await expand(page,'editor');
 await expect(panel(page).locator('.cm-editor')).toHaveAttribute('data-instance-test','same');await expect(editor(page)).toHaveText(content,{useInnerText:true});
 await editor(page).focus();await editor(page).press('ControlOrMeta+Enter');await expect(region(page,'results').getByText('Ejecución completada',{exact:true})).toBeVisible();
 await expect(region(page,'results').getByRole('table').getByRole('cell')).toHaveText(['42']);
});

test('ir al resultado desplaza solo práctica; lector, encabezado y editor conservan su posición',async({page})=>{
 await page.setViewportSize({width:844,height:390});await open(page);
 const reader=page.locator('[data-scroll-panel="content"]');const before=await reader.evaluate(e=>e.scrollTop);const header=await page.locator('.navbar').boundingBox();
 await execute(page,'WITH RECURSIVE n(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM n WHERE x<150) SELECT x FROM n;');
 await region(page,'editor').getByRole('button',{name:'Ir al resultado',exact:true}).click();
 await expect(region(page,'results').getByRole('button',{name:'Resultado',exact:true})).toBeInViewport();
 await expect.poll(()=>panel(page).locator('[data-practice-scroll]').evaluate(e=>e.scrollTop)).toBeGreaterThan(0);
 expect(await reader.evaluate(e=>e.scrollTop)).toBe(before);expect(await page.locator('.navbar').boundingBox()).toEqual(header);expect(await page.evaluate(()=>scrollY)).toBe(0);
 await expect(editor(page)).toBeVisible();await expect(panel(page).locator('.cm-editor')).toHaveCount(1);
});

test('salidas reales: revisión anterior, cero filas, DML, DDL y error recuperable en la tercera región',async({page})=>{
 await open(page);await execute(page,'SELECT 42 AS valor;');await editor(page).fill('SELECT 43 AS valor;');
 await expect(region(page,'results')).toContainText('versión anterior');await expect(region(page,'results').getByRole('cell')).toHaveText(['42']);
 await execute(page,'SELECT nombre FROM productos WHERE 0;');await expect(region(page,'results').getByRole('columnheader')).toHaveText(['nombre']);await expect(region(page,'results').getByRole('row')).toHaveCount(1);
 await execute(page,'UPDATE productos SET stock=stock WHERE id=-1;');await expect(region(page,'results')).toContainText('0 filas afectadas');
 await execute(page,'CREATE TABLE prueba_region(id INTEGER);');await expect(region(page,'results')).toContainText('Sentencia completada');
 await editor(page).fill('SELEC 1;');await editor(page).press('ControlOrMeta+Enter');await expect(region(page,'results').getByRole('alert')).toContainText('consulta.sql');
 await execute(page,'SELECT NULL AS dato;');await expect(region(page,'results').getByRole('cell')).toHaveText(['NULL']);
});

test('pandas conserva su dataset y DataFrame con las mismas regiones y sin controles de dialecto SQL',async({page})=>{
 await page.goto('/apuntes/analisis-de-datos/pandas/dataframe',{waitUntil:'networkidle'});await page.getByRole('button',{name:'Practicar pandas',exact:true}).click();
 await expect(panel(page).getByRole('button',{name:'Ejecutar',exact:true})).toBeEnabled({timeout:25000});await expand(page,'data');
 const choice=panel(page).getByRole('combobox',{name:'Tabla de datos',exact:true});await expect(choice).toHaveValue('productos');await expect(region(page,'data').getByRole('table').locator('tbody tr')).toHaveCount(3);
 await expect(panel(page).getByRole('combobox',{name:'Dialecto SQL',exact:true})).toHaveCount(0);
 await execute(page,'productos.loc[productos["precio"] >= 500, ["nombre", "precio"]]','pandas');await expect(region(page,'results').getByRole('table').locator('tbody tr')).toHaveCount(2);
 await expect(region(page,'results').getByRole('table')).toContainText('3500');await region(page,'editor').getByRole('button',{name:'Ir al resultado',exact:true}).click();await snapshot(page,'practice-regions-pandas.png');
});

test('320 px, texto al 200% y teclado virtual conservan editor y controles accesibles',async({page})=>{
 await page.setViewportSize({width:320,height:568});await open(page);await editor(page).fill('SELECT 42;');await panel(page).locator('.cm-editor').evaluate(e=>e.setAttribute('data-instance-test','same'));
 await page.addStyleTag({content:'html {font-size:200% !important}'});
 await expect.poll(()=>editor(page).evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(27);
 expect(await page.evaluate(()=>Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)>innerWidth+1)).toBe(false);
 for(const name of ['Volver al apunte','Datos','Editor','Ejecutar']){const button=panel(page).getByRole('button',{name,exact:true});await button.scrollIntoViewIfNeeded();const box=(await button.boundingBox())!;expect(box.width).toBeGreaterThanOrEqual(44);expect(box.height).toBeGreaterThanOrEqual(44);}
 await panel(page).locator('[data-practice-scroll]').evaluate(e=>e.scrollTop=0);await snapshot(page,'practice-regions-200.png');
 await page.addStyleTag({content:'html {font-size:100% !important}'});await page.evaluate(()=>{const viewport=visualViewport!;Object.defineProperty(viewport,'height',{configurable:true,value:280});Object.defineProperty(viewport,'offsetTop',{configurable:true,value:12});viewport.dispatchEvent(new Event('resize'));});
 await expect.poll(async()=> (await panel(page).boundingBox())!.height).toBeLessThanOrEqual(280);const close=(await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).boundingBox())!;expect(close.y+close.height).toBeLessThanOrEqual(292);
 await expect(editor(page)).toHaveText('SELECT 42;');await expect(panel(page).locator('.cm-editor')).toHaveAttribute('data-instance-test','same');
});

test('contexto compartido: tabla elegida, plegado y borrador sobreviven al cambiar de área',async({page})=>{
 await open(page);await expand(page,'data');await panel(page).getByRole('combobox',{name:'Tabla de datos',exact:true}).selectOption('clientes');await editor(page).fill('SELECT 7;');
 await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();await chooseHeaderArea(page,'Lenguajes');await page.getByRole('button',{name:'Practicar SQL',exact:true}).click();
 await expect(editor(page)).toHaveText('SELECT 7;');await expect(panel(page).getByRole('combobox',{name:'Tabla de datos',exact:true})).toHaveValue('clientes');
 await expect(region(page,'data').getByRole('button',{name:'Datos',exact:true})).toHaveAttribute('aria-expanded','true');
 await execute(page,'SELECT count(*) AS total FROM productos;');await expect(region(page,'results').getByRole('cell')).toHaveText(['18']);
});

test('detener conserva código, resultado de cancelación y editor utilizable para la siguiente consulta',async({page})=>{
 await open(page);const busy='WITH RECURSIVE n(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM n) SELECT sum(x) FROM n;';await editor(page).fill(busy);await editor(page).press('ControlOrMeta+Enter');
 await expect(panel(page).getByRole('button',{name:'Detener',exact:true})).toBeVisible();await expect(region(page,'results')).toBeVisible();await panel(page).getByRole('button',{name:'Detener',exact:true}).click();
 await expect(region(page,'results').getByText('Ejecución detenida',{exact:true})).toBeVisible();await expect(editor(page)).toHaveText(busy);
 await expect(panel(page).getByRole('button',{name:'Ejecutar',exact:true})).toBeEnabled({timeout:25000});await execute(page,'SELECT 9 AS despues;');await expect(region(page,'results').getByRole('cell')).toHaveText(['9']);
});
