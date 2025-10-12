import type { Meta } from '@storybook/react';
import { QtyControl } from '../molecules/QtyControl';

const meta: Meta = { title: 'Molecules/QtyControl', component: QtyControl };
export default meta;

export const Default = () => <div className="p-6"><QtyControl id="p1" max={10} title="Sample" price={9.99} image="" /></div>;

export const Large = () => <div className="p-6"><QtyControl id="p1" max={2} title="Few" price={1.0} image="" /></div>;
export const NoStock = () => <div className="p-6"><QtyControl id="p2" max={0} title="Out" price={1.0} image="" /></div>;
