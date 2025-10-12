import type { Meta } from '@storybook/react';
import { Text } from '../atoms/Text';

const meta: Meta = { title: 'Atoms/Text', component: Text };
export default meta;

export const Default = () => <Text>Sample text</Text>;
