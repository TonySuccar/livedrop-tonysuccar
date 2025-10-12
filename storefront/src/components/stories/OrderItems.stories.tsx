import type { Meta } from '@storybook/react';
import { OrderItems } from '../organisms/OrderItems';

const meta: Meta = { title: 'Organisms/OrderItems', component: OrderItems };
export default meta;

export const Default = () => (
  <div className="p-6">
    <OrderItems items={[{ id: 'i1', title: 'One', price: 10, image: '', qty: 1 } as any]} total={10} />
  </div>
);
