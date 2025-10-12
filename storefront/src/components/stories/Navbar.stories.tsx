import type { Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../organisms/Navbar';

const meta: Meta = { title: 'Organisms/Navbar', component: Navbar };
export default meta;

export const Default = () => (
  <MemoryRouter>
    <div className="p-6"><Navbar /></div>
  </MemoryRouter>
);
