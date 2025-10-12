import type { Meta } from '@storybook/react';
import { CheckoutItemsList } from '../molecules/CheckoutItemsList';

const meta: Meta = { title: 'Molecules/CheckoutItemsList', component: CheckoutItemsList };
export default meta;

export const Default = () => (
  <div className="p-6">
    <CheckoutItemsList items={[{ id: 'a', title: 'A', price: 10, image: '', qty: 2 } as any]} format={(n: number) => `$${n.toFixed(2)}`} />
  </div>
);
