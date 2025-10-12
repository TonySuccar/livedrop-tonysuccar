import type { Meta } from '@storybook/react';
import { SupportHeader } from '../molecules/SupportHeader';

const meta: Meta = { title: 'Molecules/SupportHeader', component: SupportHeader };
export default meta;

export const Default = () => <div className="p-6"><SupportHeader onClose={() => {}} /></div>;
