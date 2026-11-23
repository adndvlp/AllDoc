import {practiceResults} from '../ui/practice-helpers';
import {test, expect} from '@playwright/test';
import {caseTitle} from '../../scripts/lib/browser-cases';
import {profiles, panel, code, runButton, openPractice, ready, fillCode, expectCode, execute, completion, expectNoExecution, showResults, capture} from './practice-helpers';

for (const profile of profiles) {
  test.describe(profile.label, () => {
    test.setTimeout(profile.id === 'PY' ? 120_000 : 45_000);

    test(caseTitle(profile.id + '-01'), async ({page}, info) => {
      const requests: string[] = []; page.on('request', request => requests.push(request.url()));
      await page.goto(profile.route, {waitUntil: 'networkidle'});
      expect(requests.filter(url => /\.wasm(?:\?|$)|\.whl(?:\?|$)|\/frame\.html/.test(url))).toHaveLength(0);
      await openPractice(page, profile);
      await expect(code(page, profile)).toContainText(profile.seed);
      await expectNoExecution(page);
      await execute(page, profile, profile.query);
      const table = practiceResults(page).getByRole('table');
      await expect(table).toHaveCount(1);
      await expect(table.getByRole('columnheader')).toHaveText(['nombre', 'precio']);
      await expect(table.getByRole('row')).toHaveCount(3);
      for (let index = 0; index < profile.rows.length; index++) await expect(table.getByRole('row').nth(index + 1).getByRole('cell')).toHaveText([...profile.rows[index]]);
      await capture(page, info, profile.id + '-resultado-real');
    });

    test(caseTitle(profile.id + '-02'), async ({page}) => {
      await openPractice(page, profile);
      await test.step('Sintaxis visible y distinta del texto corriente', async () => {
        const keyword = panel(page).locator('.cm-line span').filter({hasText: new RegExp('^' + profile.keyword + '$')}).first();
        await expect(keyword).toBeVisible();
        await expect.poll(async () => await keyword.evaluate(e => getComputedStyle(e).color) !== await code(page, profile).evaluate(e => getComputedStyle(e).color)).toBe(true);
      });
      const original = await code(page, profile).innerText();
      const edited = profile.id === 'SQL' ? 'SELECT 42;' : 'numero = 42';
      await fillCode(page, profile, edited);
      await code(page, profile).press('ControlOrMeta+z'); await expectCode(page, profile, original);
      await code(page, profile).press('ControlOrMeta+Shift+z'); await expectCode(page, profile, edited);
      await code(page, profile).press('End'); await code(page, profile).pressSequentially('x');
      await expectCode(page, profile, edited + 'x');
      await code(page, profile).press('Escape'); await code(page, profile).press('Tab');
      await expect(code(page, profile)).not.toBeFocused();
      await expectNoExecution(page);
      await fillCode(page, profile, profile.query);
      await code(page, profile).press('ControlOrMeta+Enter'); await showResults(page);
      await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible();
      await expect(practiceResults(page).getByRole('table')).toContainText('3500');
    });

    test(caseTitle(profile.id + '-03'), async ({page}, info) => {
      await openPractice(page, profile);
      const examples = profile.id === 'SQL' ? [
        {source: 'SEL', label: 'SELECT', expected: 'SELECT'},
        {source: 'SELECT * FROM pro', label: 'productos', expected: 'SELECT * FROM productos'},
        {source: 'SELECT productos.pre', label: 'precio', expected: 'SELECT productos.precio'},
      ] : [
        {source: 'raise RuntimeError("no ejecutar")\nimport pandas as pd\npd.Da', label: 'DataFrame', expected: 'raise RuntimeError("no ejecutar")\nimport pandas as pd\npd.DataFrame'},
        {source: 'productos["pre"]', label: 'precio', expected: 'productos["precio"]'},
      ];
      for (const example of examples) await test.step('Completar ' + example.label, async () => {
        await fillCode(page, profile, example.source);
        if (profile.id === 'PY' && example.label === 'precio') {await code(page, profile).press('ArrowLeft'); await code(page, profile).press('ArrowLeft');}
        await code(page, profile).press('Control+Space');
        await expect(completion(page, example.label)).toBeVisible({timeout: 15_000});
        if (example.label === 'SELECT' || example.label === 'DataFrame') await capture(page, info, profile.id + '-sugerencias-reales');
        await completion(page, example.label).click(); await expectCode(page, profile, example.expected);
        await expectNoExecution(page);
      });
    });

    test(caseTitle(profile.id + '-04'), async ({page}) => {
      await openPractice(page, profile);
      const selected = profile.id === 'SQL' ? 'SELECT 42 AS respuesta;' : 'productos.head(1)';
      const invalid = profile.id === 'SQL' ? 'SELECT * FROM no_existe;' : 'raise ValueError("error real")';
      await fillCode(page, profile, selected + '\n' + invalid);
      await code(page, profile).press('ControlOrMeta+Home');
      for (let i = 0; i < selected.length; i++) await code(page, profile).press('Shift+ArrowRight');
      await runButton(page).click(); await showResults(page);
      await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible();
      await expect(practiceResults(page).getByRole('table').getByRole('row')).toHaveCount(2);
      await expect(practiceResults(page).getByRole('table')).toContainText(profile.id === 'SQL' ? '42' : 'Teclado');
      await fillCode(page, profile, profile.id === 'SQL' ? invalid : 'x = 1\n' + invalid);
      await runButton(page).click(); await showResults(page);
      await expect(panel(page).getByText('La ejecución terminó con error', {exact: true})).toBeVisible();
      await expect(panel(page).getByRole('alert')).toContainText(profile.id === 'SQL' ? 'consulta.sql' : 'main.py:2:');
      await execute(page, profile, profile.query);
      await expect(practiceResults(page).getByRole('table')).toContainText('3500');
    });

    test(caseTitle(profile.id + '-05'), async ({page}) => {
      let release!: () => void; const gate = new Promise<void>(resolve => {release = resolve;}); let requested = false;
      await page.route('**/frame.html', async route => {requested = true; await gate; await route.continue();});
      try {
        await openPractice(page, profile, false); await expect.poll(() => requested).toBe(true);
        await expect(runButton(page)).toBeDisabled(); await code(page, profile).press('ControlOrMeta+Enter');
      } finally {release();}
      await ready(page, profile); await expectNoExecution(page);
      await code(page, profile).press('ControlOrMeta+Enter'); await showResults(page);
      await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible();
      await expect(practiceResults(page).getByRole('table').getByRole('row')).toHaveCount(profile.id === 'SQL' ? 19 : 4);
    });
  });
}
