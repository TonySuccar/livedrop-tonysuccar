import type { Meta } from '@storybook/react';
import { OrderItemRow } from '../molecules/OrderItemRow';

const meta: Meta = { title: 'Molecules/OrderItemRow', component: OrderItemRow };
export default meta;

export const Default = () => (
  <div className="p-6">
    <OrderItemRow id="i1" title="Item" price={12.5} qty={2} image="" />
  </div>
);
