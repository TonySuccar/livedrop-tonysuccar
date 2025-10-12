import type { Meta } from '@storybook/react';
import { SupportLauncher } from '../molecules/SupportLauncher';

const meta: Meta = { title: 'Molecules/SupportLauncher', component: SupportLauncher };
export default meta;

export const Default = () => <div className="p-6"><SupportLauncher onClick={() => {}} /></div>;
