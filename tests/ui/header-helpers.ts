import {expect, type Page} from '@playwright/test';

const trigger = (page: Page) => page.locator('.navbar__inner').getByRole('button', {name: /^Elegir área:/});

export async function chooseHeaderArea(page: Page, name: string) {
  if (await trigger(page).isVisible()) await trigger(page).click();
  const navigation = page.getByRole('navigation', {name: 'Áreas de estudio', exact: true});
  const role = new URL(page.url()).pathname === '/' ? 'button' : 'link';
  await navigation.getByRole(role, {name, exact: true}).click();
}

export async function expectSelectedHeaderArea(page: Page, name: string) {
  if (await trigger(page).isVisible()) {
    await expect(trigger(page)).toHaveAccessibleName('Elegir área: ' + name);
    await expect(trigger(page)).toHaveAttribute('aria-expanded', 'false');
  } else {
    const home = new URL(page.url()).pathname === '/';
    await expect(page.getByRole('navigation', {name: 'Áreas de estudio', exact: true}).getByRole(home ? 'button' : 'link', {name, exact: true})).toHaveAttribute(home ? 'aria-pressed' : 'aria-current', home ? 'true' : 'page');
  }
}

export async function goHome(page: Page) {
  const brand = page.locator('.navbar__inner').getByRole('link', {name: 'AllDoc', exact: true});
  if (await brand.isVisible()) await brand.click();
  else {
    await page.locator('.navbar__toggle').click();
    await page.getByRole('dialog', {name: 'Temas del área', exact: true}).getByRole('link', {name: 'AllDoc', exact: true}).click();
  }
  await expect(page).toHaveURL(/\/$/);
}
