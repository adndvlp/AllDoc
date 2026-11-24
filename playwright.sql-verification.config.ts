import path from 'node:path';
import {defineConfig} from '@playwright/test';
import {browserAcceptanceConfig,type AcceptanceSuite} from './playwright.browser-verification.config.ts';
import {sqlReferenceDirectories,type SqlVerificationSuite} from './scripts/lib/sql-closure.ts';

const suite = (process.env.SQL_VERIFICATION_SUITE ?? 'chromium') as SqlVerificationSuite;
const directory = process.env.SQL_VERIFICATION_REPORT_DIR;
const candidates = process.env.SQL_VERIFICATION_CANDIDATES;
const base = browserAcceptanceConfig(suite === 'sql' ? 'functional' : suite as AcceptanceSuite, directory);

export default defineConfig({
  ...base,
  ...(suite === 'sql' ? {
    testDir: './tests/ui',
    testIgnore: [],
    testMatch: ['**/sql-dialects.spec.ts', '**/sql-navigation.spec.ts', '**/practice-regions.spec.ts', '**/sql-completion.spec.ts'],
    projects: base.projects?.map(project => ({
      ...project,
      grep: /selector SQL:|FULL OUTER JOIN sin soporte:|sesión compartida:|regiones en orden:|datos elegidos:|320 px, texto al 200% y teclado virtual|320 px y texto al 200%: selector|columnas sin alias:|alias y JOIN:|CTE y subconsulta:|esquema vivo:/,
    })),
  } : {}),
  snapshotPathTemplate: path.join(candidates || sqlReferenceDirectories[suite], '{projectName}/{arg}{ext}'),
  metadata: {...base.metadata, stage: 'sql-point-9', suite},
  maxFailures: 0,
  use: {...base.use, trace: 'off'},
});
