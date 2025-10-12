import type { Preview } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#111827' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ padding: 8 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default preview;
