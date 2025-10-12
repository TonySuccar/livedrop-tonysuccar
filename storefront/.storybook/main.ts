import type { StorybookConfig } from '@storybook/react-vite';
import type { UserConfig } from 'vite';

// Storybook will use the Tailwind CDN injected in preview.tsx. No build-time
// tailwind plugin is required (PostCSS has been removed).
const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // No viteFinal needed
};

export default config;