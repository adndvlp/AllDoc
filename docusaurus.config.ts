import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes} from 'prism-react-renderer';
import {paletteBootstrapScript} from './src/content/palettes';
import {parseConceptFrontMatter} from './src/lib/concept-front-matter.ts';
import {docsBasePath} from './src/content/concepts.ts';

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
      additionalLanguages: ['sql'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
