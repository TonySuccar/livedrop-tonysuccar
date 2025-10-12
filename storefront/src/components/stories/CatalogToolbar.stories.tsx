import type { Meta } from '@storybook/react';
import { CatalogToolbar } from '../molecules/CatalogToolbar';

const meta: Meta = { title: 'Molecules/CatalogToolbar', component: CatalogToolbar };
export default meta;

export const Default = () => (
  <div className="p-6">
    <CatalogToolbar query="" onQuery={() => {}} tag="" onTag={() => {}} sort={'price-asc' as any} onSort={() => {}} tags={['all', 'new']} onReset={() => {}} />
  </div>
);
