import {openPracticeRegion, practiceResults} from './practice-helpers';
import {test,expect,type Page} from '@playwright/test';
const note=(p:Page)=>p.locator('[data-sql-concept]');
const panel=(p:Page)=>p.locator('dialog[data-practice-panel]');
const dialect=(p:Page)=>p.getByRole('combobox',{name:'Dialecto SQL',exact:true});
async function go(p:Page,id:string,query=''){await p.goto('/apuntes/analisis-de-datos/sql/'+id+query,{waitUntil:'networkidle'});await expect(p.locator('html')).toHaveAttribute('data-has-hydrated','true');}
async function run(p:Page,code?:string){
 if(code){await openPracticeRegion(p,'editor');await panel(p).getByRole('textbox',{name:'Código SQL',exact:true}).fill(code);}
 await expect(panel(p).getByRole('button',{name:'Ejecutar',exact:true})).toBeEnabled();await panel(p).getByRole('button',{name:'Ejecutar',exact:true}).click();await openPracticeRegion(p,'results');
 await expect(panel(p).getByText('Ejecución completada',{exact:true})).toBeVisible();
}
test('tercer bloque: ALTER con sintaxis propia, equivalente local explícito y columna nueva real',async({page})=>{
 await go(page,'alter-table/add-column','?dialect=sqlserver');await expect(note(page).locator('pre')).toContainText('WITH VALUES');
 await note(page).getByRole('button',{name:/Probar equivalente en SQLite:/}).click();await expect(panel(page).getByRole('textbox',{name:'Código SQL',exact:true})).toContainText('ADD COLUMN prioridad');
 await openPracticeRegion(page,'results');await expect(practiceResults(page)).toHaveCount(0);await run(page);
 await expect(practiceResults(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['1','Compras','0']);
 await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();await dialect(page).selectOption('sqlite');await note(page).locator('summary').filter({hasText:'Ver resultado final'}).click();await expect(page).toHaveScreenshot('sql-alter-column.png');
 await go(page,'alter-table/rename-column','?dialect=sqlserver');await expect(note(page).locator('pre')).toContainText('sp_rename');
});
test('tercer bloque: vistas condicionales y reemplazo sin inventar soporte ni resultados externos',async({page})=>{
 await go(page,'views/if-not-exists','?dialect=mysql');await expect(note(page).locator('pre')).toHaveCount(0);await expect(note(page)).toContainText('no incluye CREATE VIEW IF NOT EXISTS');
 await expect(note(page).getByRole('link',{name:'Ver variante SQLite'})).toBeVisible();await dialect(page).selectOption('oracle');await expect(note(page).locator('pre')).toContainText('IF NOT EXISTS');
 await go(page,'views/replace-view','?dialect=sqlserver');await expect(note(page).locator('pre')).toContainText('CREATE OR ALTER');await expect(note(page).locator('pre')).toContainText('GO');
 await dialect(page).selectOption('sqlite');await note(page).getByRole('button',{name:/Probar/}).click();await run(page);await expect(practiceResults(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['1','Teclado','500']);await expect(page).toHaveScreenshot('sql-view-result.png');
});
test('tercer bloque: catálogo de índices por motor y rechazo UNIQUE en SQLite',async({page})=>{
 await go(page,'indexes/consultar');
 for(const [id,text] of [['postgresql','pg_indexes'],['mysql','information_schema.statistics'],['mariadb','information_schema.statistics'],['sqlserver','sys.indexes'],['oracle','user_indexes']]){await dialect(page).selectOption(id);await expect(note(page).locator('pre')).toContainText(text);await expect(note(page).getByRole('table')).toHaveCount(0);}
 await dialect(page).selectOption('sqlite');await note(page).locator('summary').filter({hasText:'Ver resultado final'}).click();await expect(note(page).getByRole('table')).toContainText('practica_idx_consulta');await expect(page).toHaveScreenshot('sql-index-catalog.png');
 await go(page,'indexes/unique');await note(page).getByRole('button',{name:/Probar/}).click();await run(page);
 await openPracticeRegion(page,'editor');await panel(page).getByRole('textbox',{name:'Código SQL',exact:true}).fill("INSERT INTO practica_indice_unico VALUES (2,'A-1');");await panel(page).getByRole('button',{name:'Ejecutar',exact:true}).click();await openPracticeRegion(page,'results');await expect(panel(page).getByRole('alert')).toContainText('UNIQUE');
});
test('tercer bloque: conjuntos y CTE ejecutables, subconsultas y último destino sin página siguiente',async({page})=>{
 await go(page,'except/equivalentes','?dialect=oracle');await expect(note(page).locator('pre')).toContainText('MINUS');await dialect(page).selectOption('sqlite');await note(page).getByRole('button',{name:/Probar/}).click();await run(page);
 await expect(practiceResults(page).getByRole('table').locator('tbody tr')).toHaveCount(6);await expect(practiceResults(page).getByRole('table').locator('tbody tr').first()).toContainText('19');
 await go(page,'cte/multiples');await dialect(page).selectOption('sqlite');await note(page).getByRole('button',{name:/Probar/}).click();await run(page);await expect(practiceResults(page).getByRole('table').locator('tbody tr')).toHaveCount(3);
 await go(page,'subqueries/not-exists');await expect(note(page).locator('pre')).toContainText('NOT EXISTS');
 await go(page,'transactions/autocommit');await expect(page.locator('.pagination-nav__link--next')).toHaveCount(0);await expect(page.locator('.pagination-nav__link--prev')).toHaveAttribute('href',/\/transactions\/rollback$/);
});
test('tercer bloque: ventanas con empates, marco explícito y lectura al 200% sin desbordar',async({page})=>{
 await go(page,'window-functions/frame');await note(page).locator('summary').filter({hasText:'Ver resultado final'}).click();const table=note(page).getByRole('table');await expect(table.getByRole('row').nth(1).getByRole('cell')).toHaveText(['4','35000','35000','105000']);await expect(page).toHaveScreenshot('sql-window-frame.png');
 await page.setViewportSize({width:320,height:568});await page.addStyleTag({content:'html {font-size:200% !important}'});await dialect(page).selectOption('postgresql');expect(await page.evaluate(()=>Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)>innerWidth+1)).toBe(false);
 await expect(dialect(page)).toBeVisible();await note(page).getByRole('group',{name:'Más de Funciones de ventana'}).scrollIntoViewIfNeeded();await expect(note(page).getByRole('link',{name:'RANK y DENSE_RANK',exact:true})).toBeVisible();
});
test('tercer bloque: transferencia fallida revierte, recupera y mantiene código externo fuera de SQLite',async({page})=>{
 await go(page,'transactions');const transfer=note(page).locator('[data-sql-example="Transferencia comprobada"]');await transfer.getByRole('button',{name:/Probar/}).click();const sql=await panel(page).getByRole('textbox',{name:'Código SQL',exact:true}).innerText();
 await run(page,'UPDATE cuentas SET saldo=0 WHERE id=1;');await openPracticeRegion(page,'editor');await panel(page).getByRole('textbox',{name:'Código SQL',exact:true}).fill(sql);await panel(page).getByRole('button',{name:'Ejecutar',exact:true}).click();await openPracticeRegion(page,'results');await expect(panel(page).getByRole('alert')).toContainText('NOT NULL');
 await run(page,'SELECT id,saldo FROM cuentas WHERE id IN(1,2) ORDER BY id;');await expect(practiceResults(page).getByRole('table').getByRole('row').nth(2).getByRole('cell')).toHaveText(['2','11000']);
 await panel(page).getByRole('button',{name:'Reiniciar entorno',exact:true}).click();await run(page,sql);await expect(practiceResults(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['1','9500']);await expect(practiceResults(page).getByRole('table').getByRole('row').nth(2).getByRole('cell')).toHaveText(['2','11500']);
 await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();await dialect(page).selectOption('postgresql');await expect(transfer.locator('pre')).toContainText('RAISE EXCEPTION');await expect(transfer.getByRole('button',{name:/Probar/})).toHaveCount(0);await expect(transfer.getByRole('link',{name:'Ver variante SQLite'})).toBeVisible();
});
