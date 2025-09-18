import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'YaPay API Documentation',
  tagline: 'Complete API reference and integration guides for YaPay payment platform',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.yapay.to',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'yapay', // Usually your GitHub org/user name.
  projectName: 'yapay-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/docs',
          docItemComponent: '@theme/ApiItem',
        },
        blog: false, // Disable blog feature
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['docusaurus-theme-openapi-docs'],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'classic',
        config: {
          yapay: {
            specPath: '../../YaPay/openapi.yaml',
            outputDir: 'docs/api',
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag',
            },
          },
        },
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/yapay-social-card.jpg',
    navbar: {
      title: 'YaPay',
      logo: {
        alt: 'YaPay Logo',
        src: 'img/logo.png',
        srcDark: 'img/logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Platform Docs',
        },
        {
          type: 'doc',
          docId: 'api/yapay-api',
          position: 'left',
          label: 'API Reference',
        },
        {
          href: 'https://yapay.to',
          label: 'Dashboard',
          position: 'right',
        },
        {
          href: 'https://github.com/yapay-to',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Product',
          items: [
            {
              label: 'YaPay Platform',
              href: 'https://yapay.to',
            },
            {
              label: 'YaPay for Latin America',
              href: 'https://yapay.lat',
            },
          ],
        },
        {
          title: 'Developers',
          items: [
            {
              label: 'API Reference',
              href: '/api',
            },
            {
              label: 'Integration Guides',
              href: '/guides',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: 'Email Support',
              href: 'mailto:api@yapay.to',
            },
            {
              label: 'Status Page',
              href: 'https://status.yapay.to',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} YaPay. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
