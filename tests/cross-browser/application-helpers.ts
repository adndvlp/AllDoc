import {expect, type Locator, type Page, type TestInfo} from '@playwright/test';
export {chooseHeaderArea, goHome} from '../ui/header-helpers';
export const reader = (page: Page) => page.locator('[data-scroll-panel="content"]');
export const header = (page: Page) => page.locator('.navbar__inner');
export const searchDialog = (page: Page) => page.getByRole('dialog', {name: 'Buscar en tus apuntes', exact: true});
export const topicsDialog = (page: Page) => page.getByRole('dialog', {name: 'Temas del área', exact: true});
export async function go(page: Page, route = '/') {
  const response = await page.goto(route, {waitUntil: 'networkidle'});
  expect(response?.ok()).toBe(true);
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  await expect(page.getByRole('heading', {level: 1})).toHaveCount(1);
}
export async function fits(page: Page, target: Locator) {
  await expect(target).toBeVisible();
  await expect.poll(async () => {
    const box = await target.boundingBox(), viewport = page.viewportSize()!;
    return Boolean(box && box.x >= -1 && box.y >= -1 && box.x + box.width <= viewport.width + 1 && box.y + box.height <= viewport.height + 1);
  }).toBe(true);
}
export async function noOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => ({pageTop: scrollY, horizontal: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > innerWidth + 1})))
    .toEqual({pageTop: 0, horizontal: false});
  await expect(page.locator('footer')).toHaveCount(0);
}
export async function activate(target: Locator, info: TestInfo) {
  if (info.project.use.hasTouch) await target.tap(); else await target.click();
}
export async function scrollRegion(page: Page, target: Locator, x: number, y: number, info: TestInfo, containment: Locator = target) {
  if (info.project.use.browserName==='webkit' && info.project.use.isMobile) {
    // Playwright rechaza mouse.wheel en WebKit móvil. Se comprueba el scroll
    // real del DOM y la contención CSS, sin simular un gesto táctil físico.
    if (!info.annotations.some(a=>a.type==='scroll-input')) info.annotations.push({type:'scroll-input',description:'DOM scrollBy + overscroll-behavior; Playwright no admite rueda en WebKit móvil. No acredita física de gestos.'});
    await expect(target).toBeVisible();
    await expect.poll(()=>containment.evaluate((el,axis)=>getComputedStyle(el).getPropertyValue(axis), x?'overscroll-behavior-x':'overscroll-behavior-y')).toBe('none');
    await target.evaluate((el,delta)=>el.scrollBy({left:delta.x,top:delta.y,behavior:'instant'}),{x,y});
  } else {await target.hover(); await page.mouse.wheel(x,y);}
}
