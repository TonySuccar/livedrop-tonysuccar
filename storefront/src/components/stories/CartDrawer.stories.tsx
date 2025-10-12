import type { Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { CartDrawer } from '../organisms/CartDrawer';

const meta: Meta = { title: 'Organisms/CartDrawer', component: CartDrawer };
export default meta;

export const Empty = () => (
  <MemoryRouter>
    <div className="p-6"><CartDrawer open={true} onClose={() => {}} /></div>
  </MemoryRouter>
);

export const Closed = () => (
  <MemoryRouter>
    <CartDrawer open={false} onClose={() => {}} />
  </MemoryRouter>
);
