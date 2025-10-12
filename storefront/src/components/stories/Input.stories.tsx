import { type Meta } from '@storybook/react';
import { Input } from '../atoms/Input';

const meta: Meta = { title: 'Atoms/Input', component: Input };
export default meta;

export const Default = () => <Input placeholder="Search…" />;
