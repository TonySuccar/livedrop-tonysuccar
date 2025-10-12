import type { Meta } from '@storybook/react';
import { CarrierBlock } from '../molecules/CarrierBlock';

const meta: Meta = { title: 'Molecules/CarrierBlock', component: CarrierBlock };
export default meta;

export const Default = () => <div className="p-6"><CarrierBlock carrier="UPS" tracking="1Z999" etaISO={new Date().toISOString()} /></div>;
