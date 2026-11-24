import {expect, type Locator} from '@playwright/test';

export async function focusSearchResult(surface: Locator, result: Locator) {
  const links = surface.getByRole('link');
  const href = await result.getAttribute('href');
  const index = (await links.evaluateAll(items => items.map(item => item.getAttribute('href')))).indexOf(href);
  expect(index).toBeGreaterThanOrEqual(0);

  await surface.getByRole('searchbox').press('ArrowDown');
  await expect(links.first()).toBeFocused();
  for (let step = 1; step <= index; step++) {
    await surface.page().keyboard.press('ArrowDown');
    await expect(links.nth(step)).toBeFocused();
  }
  await expect(result).toBeFocused();
}
