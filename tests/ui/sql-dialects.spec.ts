import {openPracticeRegion, practiceResults} from './practice-helpers';
import {test,expect,type Page} from '@playwright/test';
const path=(id:string)=>'/apuntes/analisis-de-datos/sql/'+id;
const dialect=(p:Page)=>p.getByRole('combobox',{name:'Dialecto SQL',exact:true});
const note=(p:Page)=>p.locator('[data-sql-concept]');
const panel=(p:Page)=>p.locator('dialog[data-practice-panel]');
async function go(p:Page,id='select',query=''){await p.goto(path(id)+query,{waitUntil:'networkidle'});await expect(p.locator('html')).toHaveAttribute('data-has-hydrated','true');}

test('selector SQL: seis dialectos, TOP/FETCH explícitos y preferencia persistente',async({page})=>{
 await go(page,'limit');await expect(dialect(page)).toBeVisible();await expect(dialect(page).locator('option')).toHaveCount(6);await expect(dialect(page)).toHaveValue('sqlite');
 await dialect(page).selectOption('sqlserver');await expect(note(page).locator('pre').first()).toContainText('TOP (5)');await expect(note(page).getByRole('button',{name:/Probar equivalente en SQLite/}).first()).toBeVisible();
 await expect(note(page)).toContainText('El panel ejecuta SQLite');await expect(page).toHaveScreenshot('sql-dialect-limit.png');
 await page.reload({waitUntil:'networkidle'});await expect(dialect(page)).toHaveValue('sqlserver');
 await dialect(page).selectOption('oracle');await expect(note(page).locator('pre').first()).toContainText('FETCH FIRST 5 ROWS ONLY');
});
test('enlace de dialecto: prioridad local, inválidos seguros y concepto activo estable',async({page})=>{
 await go(page);await dialect(page).selectOption('mysql');
 await go(page,'cast','?dialect=postgresql');await expect(dialect(page)).toHaveValue('postgresql');
 await go(page,'cast','?dialect=inventado');await expect(dialect(page)).toHaveValue('sqlite');
 await go(page,'cast');await expect(dialect(page)).toHaveValue('mysql');await expect(note(page).locator('pre').first()).toContainText('AS CHAR');
 await expect(page.getByRole('heading',{name:'CAST',exact:true,level:1})).toBeVisible();
});
test('FULL OUTER JOIN sin soporte: explicación, alternativa y preparación externa sin resultado inventado',async({page})=>{
 await go(page,'outer-joins/full-outer-join','?dialect=mysql');await expect(note(page)).toContainText('no tiene FULL OUTER JOIN');await expect(note(page).locator('pre')).toHaveCount(0);
 await expect(note(page).getByRole('button',{name:/Probar/})).toHaveCount(0);await expect(note(page).getByRole('link',{name:'Ver anti join'})).toBeVisible();
 await expect(page.getByRole('link',{name:'Descargar datos para MySQL',exact:true})).toHaveAttribute('href','/sql/datasets/negocio-relacional-1/mysql.sql');
 await dialect(page).selectOption('sqlite');await expect(note(page).locator('pre')).toContainText('FULL OUTER JOIN');await expect(note(page).getByRole('button',{name:/Probar en SQLite/})).toBeVisible();
});
test('cambiar dialecto no toca el borrador ni ejecuta; equivalente exige acción explícita',async({page})=>{
 await go(page,'limit');await page.getByRole('button',{name:'Practicar SQL',exact:true}).click();const editor=panel(page).getByRole('textbox',{name:'Código SQL',exact:true});await expect(panel(page).getByRole('button',{name:'Ejecutar',exact:true})).toBeEnabled();await editor.fill('SELECT 42;');
 await expect(panel(page)).toContainText('Motor local: SQLite');await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();
 await dialect(page).selectOption('sqlserver');await page.getByRole('button',{name:'Practicar SQL',exact:true}).click();await expect(editor).toHaveText('SELECT 42;');
 await openPracticeRegion(page,'results');await expect(practiceResults(page)).toHaveCount(0);await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();
 await note(page).getByRole('button',{name:/Probar equivalente en SQLite/}).first().click();await expect(editor).toHaveText('SELECT * FROM productos LIMIT 5;');
 await openPracticeRegion(page,'results');await expect(practiceResults(page)).toHaveCount(0);
});
test('subsección directa y cambio de dialecto conservan despliegue y posición del lector',async({page})=>{
 await go(page,'where/not');const group=note(page).getByRole('group',{name:'Más de WHERE'});await expect(group).toHaveAttribute('open','');
 const reader=page.locator('[data-scroll-panel="content"]');await reader.evaluate(e=>e.scrollTop=20);const scroll=await reader.evaluate(e=>e.scrollTop);
 await dialect(page).selectOption('oracle');await expect(group).toHaveAttribute('open','');expect(await reader.evaluate(e=>e.scrollTop)).toBe(scroll);
 await expect(note(page)).toContainText('NULL');await expect(page).toHaveScreenshot('sql-dialect-section.png');
});
test('320 px y texto al 200%: selector, código y fuentes accesibles sin desbordar la página',async({page})=>{
 await page.setViewportSize({width:320,height:568});await go(page,'cast/tipos');await page.addStyleTag({content:'html {font-size:200% !important}'});await dialect(page).selectOption('oracle');await expect(note(page).locator('pre')).toContainText('VARCHAR2');
 expect(await page.evaluate(()=>Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)>innerWidth+1)).toBe(false);
 const box=await dialect(page).boundingBox();expect(box!.height).toBeGreaterThanOrEqual(44);expect(box!.x+box!.width).toBeLessThanOrEqual(321);
 await note(page).locator('pre').scrollIntoViewIfNeeded();
 await expect(page).toHaveScreenshot('sql-dialect-200.png');
});
