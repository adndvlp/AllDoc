import {openPracticeRegion, practiceResults} from './practice-helpers';
import {test,expect,type Page} from '@playwright/test';
const note=(p:Page)=>p.locator('[data-sql-concept]');
const panel=(p:Page)=>p.locator('dialog[data-practice-panel]');
const dialect=(p:Page)=>p.getByRole('combobox',{name:'Dialecto SQL',exact:true});
async function go(p:Page,id:string,query=''){
 await p.goto('/apuntes/analisis-de-datos/sql/'+id+query,{waitUntil:'networkidle'});
 await expect(p.locator('html')).toHaveAttribute('data-has-hydrated','true');
}
async function run(p:Page){
 await expect(panel(p).getByRole('button',{name:'Ejecutar',exact:true})).toBeEnabled();
 await panel(p).getByRole('button',{name:'Ejecutar',exact:true}).click();
 await openPracticeRegion(p,'results');
 await expect(panel(p).getByText('Ejecución completada',{exact:true})).toBeVisible();
}

test('segundo bloque: funciones de texto, longitud por dialecto y ruta directa con grupo abierto',async({page})=>{
 await go(page,'text-functions/length');
 await expect(note(page).getByRole('group',{name:'Más de Funciones de texto'})).toHaveAttribute('open','');
 await note(page).getByText('Ver resultado en SQLite',{exact:false}).click();
 await expect(note(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['Teclado','7']);
 await expect(page).toHaveScreenshot('sql-text-length.png');
 for(const [d,sql] of [['mysql','CHAR_LENGTH'],['mariadb','CHAR_LENGTH'],['sqlserver','LEN'],['postgresql','LENGTH'],['oracle','LENGTH']]){
  await dialect(page).selectOption(d);await expect(note(page).locator('pre')).toContainText(sql+'(nombre)');await expect(note(page).getByRole('table')).toHaveCount(0);
 }
 await dialect(page).selectOption('sqlserver');await expect(note(page)).toContainText('no cuenta espacios al final');
 await page.reload({waitUntil:'networkidle'});await expect(dialect(page)).toHaveValue('sqlserver');
});

test('segundo bloque: COUNT distingue NULL, conjunto vacío y concatenación agregada por motor',async({page})=>{
 await go(page,'aggregation/count');await note(page).locator('summary').filter({hasText:'Ver resultado en SQLite'}).first().click();
 await expect(note(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['18','16']);
 await go(page,'aggregation/con-where');const empty=note(page).locator('[data-sql-example="Sin coincidencias"]');await empty.locator('summary').click();
 await expect(empty.getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['0','NULL','NULL','NULL','NULL']);
 await expect(page).toHaveScreenshot('sql-aggregate-empty.png');
 await go(page,'aggregation/string-aggregate');
 for(const [d,sql] of [['postgresql','STRING_AGG'],['sqlserver','WITHIN GROUP'],['oracle','LISTAGG'],['mysql','SEPARATOR']]){
  await dialect(page).selectOption(d);await expect(note(page).locator('pre')).toContainText(sql);
 }
});

test('segundo bloque: UPDATE explícito prepara sin ejecutar y muestra antes y después reales',async({page})=>{
 await go(page,'update/comprobar-con-select');await expect(note(page)).toContainText('Sin WHERE se modifican todas las filas');
 await note(page).getByRole('button',{name:/Probar en SQLite:/}).click();
 const editor=panel(page).getByRole('textbox',{name:'Código SQL',exact:true});await expect(editor).toContainText('UPDATE productos SET precio = 520');
 await openPracticeRegion(page,'results');await expect(practiceResults(page)).toHaveCount(0);
 await run(page);const tables=practiceResults(page).getByRole('table');await expect(tables).toHaveCount(2);
 await expect(tables.first().getByRole('row').nth(1).getByRole('cell')).toHaveText(['1','Teclado','500']);
 await expect(tables.last().getByRole('row').nth(1).getByRole('cell')).toHaveText(['1','Teclado','520']);
 await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();
 await note(page).locator('summary').filter({hasText:'Ver resultado final en SQLite'}).click();await expect(page).toHaveScreenshot('sql-update-final.png');
});

test('segundo bloque: REPLACE sin soporte ofrece su variante SQLite y muestra el efecto real',async({page})=>{
 await go(page,'insert/replace','?dialect=postgresql');await expect(note(page).locator('pre')).toHaveCount(0);
 await expect(note(page)).toContainText('No hay un REPLACE de filas equivalente nativo');
 await expect(note(page).getByRole('link',{name:'Ver anti join'})).toHaveCount(0);
 await expect(note(page).getByRole('link',{name:'Ver variante SQLite'})).toHaveAttribute('href',/\/sql\/insert\/replace\?dialect=sqlite$/);
 await note(page).getByRole('link',{name:'Ver variante SQLite'}).click();await expect(dialect(page)).toHaveValue('sqlite');
 await note(page).getByRole('button',{name:/Probar en SQLite:/}).click();await run(page);
 await expect(practiceResults(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['1','Nuevo','0']);
});

test('segundo bloque: DDL con SET NULL real, tipos de identidad y controles al 200%',async({page})=>{
 await go(page,'create-table/on-delete-set-null');await note(page).getByRole('button',{name:/Probar en SQLite:/}).click();await run(page);
 await expect(practiceResults(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['1','NULL']);
 await panel(page).getByRole('button',{name:'Volver al apunte',exact:true}).click();
 await go(page,'create-table/primary-key');await dialect(page).selectOption('sqlserver');await expect(note(page).locator('pre').last()).toContainText('IDENTITY(1,1)');
 await go(page,'create-table/if-not-exists','?dialect=oracle');await expect(note(page).locator('pre')).toContainText('IF NOT EXISTS');
 await dialect(page).selectOption('sqlserver');await expect(note(page).locator('pre')).toHaveCount(0);await expect(note(page)).toContainText('no incluye IF NOT EXISTS');
 await dialect(page).selectOption('sqlite');await page.setViewportSize({width:320,height:568});await page.addStyleTag({content:'html {font-size:200% !important}'});
 await expect(dialect(page)).toBeVisible();expect(await page.evaluate(()=>Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)>innerWidth+1)).toBe(false);
 await note(page).locator('pre').scrollIntoViewIfNeeded();await expect(page).toHaveScreenshot('sql-create-200.png');
});
