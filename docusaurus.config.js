// @ts-check
const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cloudflare API',
  tagline: 'Interactive API Reference',
  favicon: 'img/favicon.ico',
  url: 'https://your-docusaurus-site.pages.dev', // Will update after deployment
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // REQUIRED: Tells Docusaurus to use the API Item component for doc pages
          docItemComponent: "@theme/ApiItem", 
        },
        blog: false, // Disable blog for this documentation site
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  // REQUIRED: Add the OpenAPI theme
  themes: ["docusaurus-theme-openapi-docs"],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api",
        docsPluginId: "classic",
        config: {
          cloudflare: {
            specPath: "openapi.json", // Path to the downloaded file
            outputDir: "docs/api",    // Output MDX files here
            downloadUrl: "https://raw.githubusercontent.com/cloudflare/api-schemas/refs/heads/main/openapi.json",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
            version: "1.0.0",
            label: "v1.0.0",
            baseUrl: "/api",
          }
        }
      },
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Cloudflare API',
        logo: {
          alt: 'Cloudflare Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'API Reference',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'diff', 'json'],
      },
      // REQUIRED: Configuration for the interactive API playground
      languageTabs: [
        {
          highlight: "bash",
          language: "curl",
          logoClass: "bash",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "go",
          language: "go",
          logoClass: "go",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
      ],
    }),
};

module.exports = config;
