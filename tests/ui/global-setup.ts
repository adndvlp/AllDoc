import {chromium} from '@playwright/test';

// Un solo diagnóstico antes de iniciar los proyectos y sus workers.
export default async function checkBrowser() {
  let browser;
  try {
    browser = await chromium.launch();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("Executable doesn't exist")) {
      throw new Error('Falta Chromium de Playwright. Ejecuta «npx playwright install chromium» y después «npm run test:ui:update».');
    }
    throw new Error('No se pudo iniciar Chromium para las pruebas. ' + message.split('\n')[0]);
  } finally {
    await browser?.close();
  }
}
