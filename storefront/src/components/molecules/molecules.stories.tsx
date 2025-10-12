import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';
import { QtyControl } from './QtyControl';
import { Stepper } from './Stepper';
import { CatalogToolbar } from './CatalogToolbar';
import { CheckoutSummaryCard } from './CheckoutSummaryCard';

const meta: Meta = { title: 'Molecules/All', component: ProductCard };
export default meta;

export const All: StoryObj = {
  render: () => (
    <div className="p-6 space-y-4">
      <ProductCard product={{ id: 'p', title: 'P', price: 1, image: '', stockQty: 1, tags: [], description: '' } as any} />
      <QtyControl id="p" max={1} title="P" price={1} image="" />
      <Stepper current={'Placed' as any} />
      <CatalogToolbar query="" onQuery={() => {}} tag="" onTag={() => {}} sort={'price-asc' as any} onSort={() => {}} tags={[]} onReset={() => {}} />
  <CheckoutSummaryCard subtotal={0} shipping={0} taxes={0} total={0} onPlaceOrder={() => {}} onContinue={() => {}} format={(n: number) => `$${n.toFixed(2)}`} />
    </div>
  ),
};
