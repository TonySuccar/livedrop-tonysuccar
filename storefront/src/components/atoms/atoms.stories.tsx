import { type Meta, type StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { Badge } from './Badge';
import { Divider } from './Divider';
import { Text } from './Text';

const meta: Meta = { title: 'Atoms/All', component: Button };
export default meta;

export const All: StoryObj = {
  render: () => (
    <div className="p-6 space-y-4">
      <Button>Button</Button>
      <Input placeholder="Search…" />
      <Select aria-label="demo"><option>One</option></Select>
      <Badge>New</Badge>
      <Divider />
      <Text>Some text</Text>
    </div>
  ),
};
