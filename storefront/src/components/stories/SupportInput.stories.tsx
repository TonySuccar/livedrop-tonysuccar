import type { Meta } from '@storybook/react';
import { SupportInput } from '../molecules/SupportInput';

const meta: Meta = { title: 'Molecules/SupportInput', component: SupportInput };
export default meta;

export const Default = () => (
	<div className="p-6">
		<SupportInput input="" setInput={() => {}} sending={false} onSend={() => {}} />
	</div>
);
