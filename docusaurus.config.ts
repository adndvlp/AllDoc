import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes} from 'prism-react-renderer';
import {paletteBootstrapScript} from './src/content/palettes';

const config: Config = {
  title: 'AllDoc',
  tagline: 'Lo que aprendes, a la mano.',
  favicon: 'img/mark.svg',
  url: process.env.SITE_URL ?? 'http://localhost:3000',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  headTags: [
    {tagName: 'script', attributes: {}, innerHTML: paletteBootstrapScript},
  ],
  markdown: {
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
          routeBasePath: 'apuntes',
          sidebarPath: './sidebars.ts',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],
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
      items: [
        {
          to: '/apuntes/analisis-de-datos',
          label: 'Análisis de datos',
          position: 'left',
          activeBaseRegex: '^/apuntes/analisis-de-datos(?:/|$)',
        },
        {to: '/apuntes/desarrollo-web', label: 'Desarrollo web', position: 'left'},
        {to: '/apuntes/ia', label: 'IA', position: 'left'},
        {type: 'custom-palette', position: 'right'},
        {type: 'search', position: 'right'},
      ],
    },
    docs: {
      sidebar: {hideable: false, autoCollapseCategories: false},
    },
    prism: {
      theme: themes.vsDark,
      darkTheme: themes.vsDark,
      additionalLanguages: ['sql'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
