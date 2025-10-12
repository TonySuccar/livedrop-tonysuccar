import type { Meta } from '@storybook/react';
import { SupportPanel } from '../organisms/SupportPanel';

const meta: Meta = { title: 'Organisms/SupportPanel', component: SupportPanel };
export default meta;

export const Open = () => <SupportPanel open={true} onClose={() => {}} /> as any;
export const WithContainer = () => <div className="p-6"><SupportPanel open={true} onClose={() => {}} /></div> as any;
