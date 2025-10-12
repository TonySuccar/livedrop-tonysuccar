import type { Meta } from '@storybook/react';
import { Stepper } from '../molecules/Stepper';

const meta: Meta = { title: 'Molecules/Stepper', component: Stepper };
export default meta;

export const Placed = () => <div className="p-6"><Stepper current={'Placed' as any} /></div>;
export const Delivered = () => <div className="p-6"><Stepper current={'Delivered' as any} /></div>;
