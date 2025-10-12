import type { Meta } from '@storybook/react';
import { OrderHeader } from '../organisms/OrderHeader';

const meta: Meta = { title: 'Organisms/OrderHeader', component: OrderHeader };
export default meta;

export const Default = () => <div className="p-6"><OrderHeader id="o1" /></div>;
