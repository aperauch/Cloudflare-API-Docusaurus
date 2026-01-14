/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Cloudflare API',
      link: {
        type: 'generated-index',
        title: 'Cloudflare API Documentation',
        description: 'Complete API reference and guides for Cloudflare services',
        slug: '/',
      },
      items: [
        'intro',
        'getting-started',
        'api-reference',
      ],
    },
  ],
};

module.exports = sidebars;
