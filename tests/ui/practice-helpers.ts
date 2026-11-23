import {expect,type Page} from '@playwright/test';

export const practiceRegion=(page:Page,name:'data'|'editor'|'results')=>page.locator(`dialog[data-practice-panel] [data-practice-region="${name}"]`);
export const practiceResults=(page:Page)=>practiceRegion(page,'results');
export async function openPracticeRegion(page:Page,name:'data'|'editor'|'results'){
 const region=practiceRegion(page,name);
 // Antes de la primera ejecución no se crea una región de resultado.
 if(name==='results'&&!await region.count())return region;
 const label={data:'Datos',editor:'Editor',results:'Resultado'}[name];
 const toggle=region.getByRole('button',{name:label,exact:true});
 if(await toggle.getAttribute('aria-expanded')==='false')await toggle.click();
 await expect(toggle).toHaveAttribute('aria-expanded','true');
 return region;
}
export async function selectPracticeTable(page:Page,name:string){
 const region=await openPracticeRegion(page,'data');
 await region.getByRole('combobox',{name:'Tabla de datos',exact:true}).selectOption(name);
 await expect(region.getByRole('table')).toHaveCount(1);
 return region.getByRole('table',{name:'Datos de '+name,exact:true});
}
