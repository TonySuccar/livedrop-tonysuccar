import { type Meta } from '@storybook/react';
import { Button } from '../atoms/Button';

const meta: Meta = { title: 'Atoms/Button', component: Button };
export default meta;

export const Primary = () => <Button>Click</Button>;
export const Secondary = () => <Button variant="outline">Cancel</Button>;
