import type { Meta } from '@storybook/react';
import { Badge } from '../atoms/Badge';

const meta: Meta = { title: 'Atoms/Badge', component: Badge };
export default meta;

export const Default = () => <Badge>New</Badge>;
export const WithNumber = () => <div className="p-6"><Badge>5</Badge></div>;
