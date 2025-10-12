import type { Meta } from '@storybook/react';
import { CheckoutSummaryCard } from '../molecules/CheckoutSummaryCard';

const meta: Meta = { title: 'Molecules/CheckoutSummaryCard', component: CheckoutSummaryCard };
export default meta;

export const Empty = () => (
  <div className="p-6">
    <CheckoutSummaryCard subtotal={0} shipping={0} taxes={0} total={0} onPlaceOrder={() => {}} onContinue={() => {}} format={(n: number) => `$${n.toFixed(2)}`} />
  </div>
);

export const WithValues = () => (
  <div className="p-6">
    <CheckoutSummaryCard subtotal={50} shipping={5} taxes={4.5} total={59.5} onPlaceOrder={() => {}} onContinue={() => {}} format={(n: number) => `$${n.toFixed(2)}`} />
  </div>
);
