import type { Meta } from '@storybook/react';
import { DetailsCard } from '../molecules/DetailsCard';

const meta: Meta = { title: 'Molecules/DetailsCard', component: DetailsCard };
export default meta;

export const Default = () => <DetailsCard product={{ id: 'p', title: 'P', price: 1, image: '', stockQty: 1, tags: [], description: '' } as any} />;
export const WithDescription = () => (
	<DetailsCard product={{ id: 'p', title: 'P', price: 1, image: '', stockQty: 1, tags: [], description: 'This product has a longer description to show layout.' } as any} />
);
