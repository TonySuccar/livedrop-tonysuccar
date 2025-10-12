import type { Meta } from '@storybook/react';
import { ProductCard } from '../molecules/ProductCard';

const meta: Meta = { title: 'Molecules/ProductCard', component: ProductCard };
export default meta;

export const Default = () => (
  <div className="p-6">
    <ProductCard product={{ id: 'p1', title: 'Sample', price: 19.99, image: '', stockQty: 5, tags: ['new'], description: 'Nice product' } as any} />
  </div>
);

export const OutOfStock = () => (
  <div className="p-6">
    <ProductCard product={{ id: 'p2', title: 'Sold', price: 9.99, image: '', stockQty: 0, tags: [], description: '' } as any} />
  </div>
);
