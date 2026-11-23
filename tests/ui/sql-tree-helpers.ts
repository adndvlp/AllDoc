import {expect,type Locator,type Page} from '@playwright/test';

export async function openSqlGroup(menu:Locator,label:string){
 const root=menu.getByRole('button',{name:'SQL',exact:true});
 if(await root.getAttribute('aria-expanded')==='false')await root.click();
 const button=menu.getByRole('button',{name:label,exact:true});
 if(await button.getAttribute('aria-expanded')==='false')await button.click();
 await expect(button).toHaveAttribute('aria-expanded','true');
 return button.locator('..').locator('..');
}
export async function openCatalogSqlGroup(page:Page,label:string){
 const topic=page.locator('[data-catalog-item="sql"] > details');
 if(!await topic.evaluate(e=>(e as HTMLDetailsElement).open))await topic.locator(':scope > summary').click();
 const summary=topic.getByLabel(label,{exact:true});
 const details=summary.locator('..');if(!await details.evaluate(e=>(e as HTMLDetailsElement).open))await summary.click();
 return details;
}
