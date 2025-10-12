import type { Meta } from '@storybook/react';
import { ProductGrid } from '../organisms/ProductGrid';

const meta: Meta = { title: 'Organisms/ProductGrid', component: ProductGrid };
export default meta;

export const Default = () => (
  <div className="p-6">
    <ProductGrid products={[{ id: 'p1', title: 'A', price: 1, image: '', stockQty: 1, tags: [], description: '' } as any]} />
  </div>
);
