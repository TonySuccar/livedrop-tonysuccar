import type { Meta } from '@storybook/react';
import { Select } from '../atoms/Select';

const meta: Meta = { title: 'Atoms/Select', component: Select };
export default meta;

export const Default = () => (
  <Select aria-label="S">
    <option>One</option>
    <option>Two</option>
  </Select>
);
export const Small = () => (
  <Select size={"sm" as any} aria-label="S">
    <option>Small</option>
  </Select>
);
