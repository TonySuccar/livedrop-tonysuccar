import type { Meta } from '@storybook/react';
import { CheckoutEmptyCard } from '../molecules/CheckoutEmptyCard';

const meta: Meta = { title: 'Molecules/CheckoutEmptyCard', component: CheckoutEmptyCard };
export default meta;

export const Default = () => <div className="p-6"><CheckoutEmptyCard onBack={() => {}} /></div>;
