import type { Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../organisms/Footer';

const meta: Meta = { title: 'Organisms/Footer', component: Footer };
export default meta;

export const Default = () => (
  <MemoryRouter>
    <div className="p-6"><Footer /></div>
  </MemoryRouter>
);
