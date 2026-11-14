import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {Module} from 'webpack';
import {themes} from 'prism-react-renderer';
import {paletteBootstrapScript} from './src/content/palettes';
import {parseConceptFrontMatter} from './src/lib/concept-front-matter.ts';
import {docsBasePath} from './src/content/concepts.ts';
import {validateRuntimeLocation} from './src/practice/isolation/policy.ts';

const practiceOrigin = process.env.PRACTICE_ORIGIN ?? (new URL(process.env.SITE_URL ?? 'http://localhost:3000').hostname === 'localhost' ? 'http://localhost:3001' : '');
if (practiceOrigin) validateRuntimeLocation(process.env.PRACTICE_APP_ORIGIN ?? (process.env.SITE_URL || 'http://127.0.0.1:3000'), practiceOrigin);

const config: Config = {
  title: 'AllDoc',
  tagline: 'Lo que aprendes, a la mano.',
  favicon: 'img/mark.svg',
  url: process.env.SITE_URL ?? 'http://localhost:3000',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  headTags: [
    {tagName: 'meta', attributes: {name: 'alldoc-practice-origin', content: practiceOrigin}},
    {tagName: 'meta', attributes: {'http-equiv': 'Content-Security-Policy', content: `frame-src ${practiceOrigin || "'none'"}`}},
    {tagName: 'script', attributes: {}, innerHTML: paletteBootstrapScript},
  ],
  markdown: {
    parseFrontMatter: parseConceptFrontMatter,
    hooks: {onBrokenMarkdownLinks: 'throw'},
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
    localeConfigs: {es: {label: 'Español', htmlLang: 'es-MX'}},
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: docsBasePath.slice(1),
          sidebarPath: './sidebars.ts',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],
  plugins: [function noteBodyChunks() {
    return {
      name: 'alldoc-note-bodies',
      configureWebpack(_config, isServer) {
        if (isServer) return {};
        return {optimization: {splitChunks: {cacheGroups: {
          noteBodies: {
            test: /[/\\]src[/\\](?:content[/\\]notes|practice[/\\]datasets[/\\]rows)[/\\]/,
            name(noteModule: Module) {
              const resource = noteModule.nameForCondition() ?? '';
              const tool = resource.split(/[/\\](?:notes|rows)[/\\]/).at(-1)!.split(/[/\\]/)[0].replace(/\.[cm]?[jt]sx?$/, '');
              return 'notes-' + (/[/\\]practice[/\\]datasets[/\\]rows[/\\]/.test(resource) ? 'data-' : '') + tool;
            },
            chunks: 'all', enforce: true, priority: 50,
          },
        }}}};
      },
    };
  }],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'AllDoc',
      logo: {alt: '', src: 'img/mark.svg', width: 30, height: 30},
      hideOnScroll: false,
      // Navbar/Content compone áreas y controles a partir del catálogo común.
      items: [],
    },
    docs: {
      sidebar: {hideable: false, autoCollapseCategories: false},
    },
    prism: {
      theme: themes.vsDark,
      darkTheme: themes.vsDark,
      additionalLanguages: ['sql', 'python'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
