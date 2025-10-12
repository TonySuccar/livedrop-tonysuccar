// /src/components/organisms/OrderItems.tsx
import * as React from "react";
import { Text } from "../atoms/Text";
import { Divider } from "../atoms/Divider";
import { OrderItemRow } from "../molecules/OrderItemRow";
import { formatCurrency } from "../../lib/format";

type Item = { id: string; title: string; price: number; image: string; qty: number };

export function OrderItems({ items, total }: { items: Item[]; total: number }) {
  return (
    <div className="mt-6 rounded-2xl border border-[var(--neutral)] bg-[var(--bg-base)] p-5">
      <Text as="h2" variant="sectionTitle" className="mb-3">Items</Text>
      <ul className="divide-y divide-[var(--neutral)]">
        {items.map((i) => <OrderItemRow key={i.id} {...i} />)}
      </ul>
      <Divider />
      <div className="flex items-center justify-between">
        <Text variant="body" className="font-semibold">Total</Text>
        <Text variant="price">{formatCurrency(total)}</Text>
      </div>
    </div>
  );
}
