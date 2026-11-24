import {test,expect,type Page} from '@playwright/test';
import {practiceRegion,practiceResults,selectPracticeTable} from './practice-helpers';
test.setTimeout(60_000);
const panel=(page:Page)=>page.locator('dialog[data-practice-panel]');
const code=(page:Page)=>panel(page).getByRole('textbox',{name:'Código SQL',exact:true});
const editorScroll=(page:Page)=>panel(page).locator('.cm-scroller');
const option=(page:Page,label:string)=>panel(page).locator('.cm-tooltip-autocomplete').getByRole('option').filter({has:page.locator('.cm-completionLabel').filter({hasText:new RegExp('^'+label.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')})});
async function open(page:Page){await page.goto('/apuntes/analisis-de-datos/sql/select',{waitUntil:'networkidle'});await page.getByRole('button',{name:'Practicar SQL',exact:true}).click();await expect(panel(page).getByRole('button',{name:'Ejecutar',exact:true})).toBeEnabled();}
async function suggest(page:Page,marked:string,options:{fromLeftEdge?:boolean}={}){
 const position=marked.indexOf('▏');
 const input=code(page);
 await input.fill(marked.replace('▏',''));
 await input.press('ControlOrMeta+Home');
 for(let i=0;i<position;i++)await input.press('ArrowRight');
 if(options.fromLeftEdge){
  // El cursor ya está visible al inicio. Quita el desplazamiento residual
  // de fill() para que el menú se capture desde el mismo punto.
  await editorScroll(page).evaluate(scroller=>new Promise<void>(resolve=>{
   requestAnimationFrame(()=>{scroller.scrollLeft=0;requestAnimationFrame(()=>resolve());});
  }));
 }
 await input.press('Control+Space');
}
async function execute(page:Page,document:string){
 const run=panel(page).locator('[data-practice-run]');const previous=await run.count()?await run.getAttribute('data-practice-run'):null;
 await code(page).fill(document);await expect(panel(page).getByRole('button',{name:'Ejecutar',exact:true})).toBeEnabled();await panel(page).getByRole('button',{name:'Ejecutar',exact:true}).click();
 await expect.poll(()=>panel(page).locator('[data-practice-run]').getAttribute('data-practice-run')).not.toBe(previous);
 await expect(practiceResults(page).getByText('Ejecución completada',{exact:true})).toBeVisible();
}

test('columnas sin alias: prefijo e inserción real desde FROM sin ejecutar el documento',async({page,isMobile})=>{
 await open(page);await suggest(page,'SELECT pre▏ FROM productos;');await expect(option(page,'precio')).toBeVisible();
 if(isMobile)await option(page,'precio').tap();else await option(page,'precio').click();await expect(code(page)).toHaveText('SELECT precio FROM productos;');await expect(practiceResults(page)).toHaveCount(0);
 await suggest(page,'SELECT ▏ FROM productos;');for(const label of ['nombre','categoria','precio'])await expect(option(page,label)).toBeVisible();
 await expect(panel(page).getByText('Guardado local',{exact:true})).toBeVisible();await expect(page).toHaveScreenshot('sql-completion-columns.png');
});

test('alias y JOIN: columnas del origen, nombres ambiguos e inserción con teclado sin ejecutar',async({page})=>{
 await open(page);
 for(const marked of ['SELECT p.▏ FROM productos p;','SELECT p.▏ FROM productos p JOIN proveedores v ON p.proveedor_id=v.id;','SELECT * FROM productos p WHERE p.pre▏;','SELECT * FROM productos p ORDER BY p.pre▏;']){
  await suggest(page,marked);await expect(option(page,'precio')).toBeVisible();await expect(option(page,'telefono')).toHaveCount(0);
  await option(page,'precio').click();await expect(code(page)).toHaveText(marked.replace(/pre▏|▏/,'precio'));await expect(practiceResults(page)).toHaveCount(0);
 }
 await suggest(page,'SELECT ▏ FROM productos p JOIN proveedores v ON p.proveedor_id=v.id;',{fromLeftEdge:true});await expect(option(page,'p.nombre')).toBeVisible();await expect(option(page,'v.nombre')).toBeVisible();await expect(option(page,'nombre')).toHaveCount(0);
 await expect.poll(()=>editorScroll(page).evaluate(scroller=>scroller.scrollLeft)).toBe(0);
 await expect(panel(page).getByText('Guardado local',{exact:true})).toBeVisible();await expect(page).toHaveScreenshot('sql-completion-join.png');
 await option(page,'p.nombre').click();await expect(code(page)).toHaveText('SELECT p.nombre FROM productos p JOIN proveedores v ON p.proveedor_id=v.id;');
 await suggest(page,'SELECT pre▏ FROM productos;');await expect(option(page,'precio')).toHaveAttribute('aria-selected','true');
 // CodeMirror intentionally ignores Enter during its initial 75 ms interaction delay.
 await page.waitForTimeout(100);await code(page).press('Enter');await expect(code(page)).toHaveText('SELECT precio FROM productos;');await expect(practiceResults(page)).toHaveCount(0);
});

test('CTE y subconsulta: proyecciones conocidas, alias y expresiones conservadoras sin ejecutar',async({page})=>{
 await open(page);
 for(const marked of ['WITH c AS (SELECT nombre,precio AS importe FROM productos) SELECT c.▏ FROM c;','SELECT q.▏ FROM (SELECT nombre,precio AS importe FROM productos) q;','WITH c(corto,importe) AS (SELECT nombre,precio FROM productos) SELECT c.▏ FROM c;']){
  await suggest(page,marked);await expect(option(page,'importe')).toBeVisible();await expect(option(page,'precio')).toHaveCount(0);await option(page,'importe').click();await expect(code(page)).toHaveText(marked.replace('▏','importe'));
 }
 await suggest(page,'SELECT q.▏ FROM (SELECT precio+1,COUNT(*) AS total FROM productos) q;');await expect(option(page,'total')).toBeVisible();await expect(option(page,'precio')).toHaveCount(0);await expect(practiceResults(page)).toHaveCount(0);
});

test('esquema vivo: CREATE, ALTER, vista, ROLLBACK, COMMIT, DROP y reinicio actualizan el menú',async({page})=>{
 await open(page);
 await execute(page,'CREATE TABLE practica_sugerencias(id INTEGER,importe INTEGER); CREATE VIEW vista_sugerencias AS SELECT importe AS total FROM practica_sugerencias;');
 const choice=practiceRegion(page,'data').getByRole('combobox',{name:'Tabla de datos',exact:true});await expect(choice.locator('option[value="vista_sugerencias"]')).toHaveCount(1);
 await suggest(page,'SELECT ▏ FROM vista_sugerencias;');await expect(option(page,'total')).toBeVisible();await expect(option(page,'precio')).toHaveCount(0);
 await execute(page,'BEGIN; ALTER TABLE practica_sugerencias ADD COLUMN temporal TEXT;');await expect(await selectPracticeTable(page,'practica_sugerencias')).toContainText('temporal');
 await suggest(page,'SELECT ▏ FROM practica_sugerencias;');await expect(option(page,'temporal')).toBeVisible();
 await execute(page,'ROLLBACK;');await expect(practiceRegion(page,'data').getByRole('table')).not.toContainText('temporal');await suggest(page,'SELECT ▏ FROM practica_sugerencias;');await expect(option(page,'importe')).toBeVisible();await expect(option(page,'temporal')).toHaveCount(0);
 await execute(page,'BEGIN; ALTER TABLE practica_sugerencias ADD COLUMN confirmado TEXT; COMMIT;');await expect(practiceRegion(page,'data').getByRole('table')).toContainText('confirmado');await suggest(page,'SELECT ▏ FROM practica_sugerencias;');await expect(option(page,'confirmado')).toBeVisible();
 await execute(page,'DROP VIEW vista_sugerencias; DROP TABLE practica_sugerencias;');await expect(choice.locator('option[value="practica_sugerencias"]')).toHaveCount(0);await suggest(page,'SELECT * FROM ▏');await expect(option(page,'productos')).toBeVisible();await expect(option(page,'practica_sugerencias')).toHaveCount(0);
 await execute(page,'ALTER TABLE productos ADD COLUMN campo_nuevo INTEGER;');await expect(practiceRegion(page,'data').getByRole('table')).toContainText('campo_nuevo');
 await panel(page).getByRole('button',{name:'Reiniciar entorno',exact:true}).click();await expect(code(page)).toHaveText('ALTER TABLE productos ADD COLUMN campo_nuevo INTEGER;');await expect(practiceRegion(page,'data').getByRole('table')).not.toContainText('campo_nuevo');
 await suggest(page,'SELECT ▏ FROM productos;');await expect(option(page,'precio')).toBeVisible();await expect(option(page,'campo_nuevo')).toHaveCount(0);
});

for(const keyboard of ['macOS','Windows'] as const)test(`ejecución explícita ${keyboard}: botón usa selección y atajo ejecuta el documento`,async({page})=>{
 await page.addInitScript(platform=>Object.defineProperty(navigator,'platform',{configurable:true,get:()=>platform}),keyboard==='macOS'?'MacIntel':'Win32');
 await open(page);const selected='SELECT 42 AS respuesta;';const document=selected+'\nSELECT * FROM no_existe;';await code(page).fill(document);await code(page).press(keyboard==='macOS'?'Meta+Home':'Control+Home');
 for(let i=0;i<selected.length;i++)await code(page).press('Shift+ArrowRight');await panel(page).getByRole('button',{name:'Ejecutar',exact:true}).click();
 await expect(practiceResults(page).getByText('Ejecución completada',{exact:true})).toBeVisible();await expect(practiceResults(page).getByRole('cell')).toHaveText(['42']);await expect(code(page)).toHaveText(document,{useInnerText:true});
 const previous=await panel(page).locator('[data-practice-run]').getAttribute('data-practice-run');await code(page).fill('SELECT 7 AS documento;');await code(page).press(keyboard==='macOS'?'Meta+Enter':'Control+Enter');
 await expect.poll(()=>panel(page).locator('[data-practice-run]').getAttribute('data-practice-run')).not.toBe(previous);await expect(practiceResults(page).getByText('Ejecución completada',{exact:true})).toBeVisible();await expect(practiceResults(page).getByRole('cell')).toHaveText(['7']);
});

test('preparación, Enter normal e IME no dejan ejecuciones pendientes ni interceptan la edición',async({page})=>{
 let release!:()=>void;const gate=new Promise<void>(resolve=>release=resolve);let requested=false;
 await page.route('**/frame.html',async route=>{requested=true;await gate;await route.continue();});
 await page.goto('/apuntes/analisis-de-datos/sql/select',{waitUntil:'networkidle'});await page.getByRole('button',{name:'Practicar SQL',exact:true}).click();
 try{await expect(code(page)).toBeVisible();await expect.poll(()=>requested).toBe(true);await expect(panel(page).getByRole('button',{name:'Ejecutar',exact:true})).toBeDisabled();await code(page).press('ControlOrMeta+Enter');}finally{release();}
 await expect(panel(page).getByRole('button',{name:'Ejecutar',exact:true})).toBeEnabled();await expect(practiceResults(page)).toHaveCount(0);
 await code(page).fill('-- nota');await code(page).press('Enter');await expect(code(page).locator('.cm-line')).toHaveCount(2);await expect(practiceResults(page)).toHaveCount(0);
 await code(page).fill('SELECT 99;');await code(page).dispatchEvent('compositionstart',{data:'x'});try{await code(page).press('ControlOrMeta+Enter');}finally{await code(page).dispatchEvent('compositionend',{data:''});}
 await expect(code(page)).toHaveText('SELECT 99;');await expect(code(page).locator('.cm-line')).toHaveCount(1);await expect(practiceResults(page)).toHaveCount(0);
});
