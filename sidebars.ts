import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
// @ts-ignore
import apiSidebar from './docs/api/sidebar';

/**
 * YaPay API Documentation sidebar configuration
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'authentication',
      label: 'Authentication',
    },
    {
      type: 'doc',
      id: 'webhooks',
      label: 'Webhooks',
    },
    {
      type: 'doc',
      id: 'testing',
      label: 'Testing',
    },
    {
      type: 'category',
      label: 'Integration Guides',
      collapsed: false,
      items: [
        'guides/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: apiSidebar,
    },
  ],
};

export default sidebars;