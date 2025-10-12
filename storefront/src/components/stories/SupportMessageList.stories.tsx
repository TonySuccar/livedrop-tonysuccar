import type { Meta } from '@storybook/react';
import { SupportMessageList } from '../molecules/SupportMessageList';
import React from 'react';

const meta: Meta = { title: 'Molecules/SupportMessageList', component: SupportMessageList };
export default meta;

export const Chat = () => (
  <div className="p-6 h-80">
    <SupportMessageList
      listRef={React.createRef<HTMLDivElement>()}
      messages={[{ role: 'assistant', text: 'Hi, how can I help?' }, { role: 'user', text: 'Where is my order?' }]}
    />
  </div>
);

export const WithOrder = () => (
  <div className="p-6 h-80">
    <SupportMessageList
      listRef={React.createRef<HTMLDivElement>()}
      messages={[{ role: 'assistant', kind: 'order', order: { id: 'ORD-1', status: 'Shipped', carrier: 'UPS', tracking: '1Z', eta: new Date().toISOString() } as any }]}
    />
  </div>
);
