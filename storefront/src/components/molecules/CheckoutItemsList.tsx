// /src/components/molecules/CheckoutItemsList.tsx
import "react";
import { Text } from "../atoms/Text";

type Item = { id: string; title: string; price: number; image: string; qty: number };
type Props = { items: Item[]; format: (n: number) => string };

export function CheckoutItemsList({ items, format }: Props) {
  return (
    <section className="md:col-span-2 rounded-2xl border border-[var(--neutral)] bg-[var(--bg-base)] p-4">
      <Text as="h2" variant="sectionTitle" className="mb-3">Items</Text>
      <ul className="divide-y divide-[var(--neutral)]">
        {items.map((i) => (
          <li key={i.id} className="flex items-center gap-3 py-3">
            <img src={i.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <Text variant="body" className="font-medium line-clamp-1">{i.title}</Text>
              <Text variant="muted">Qty {i.qty}</Text>
            </div>
            <Text variant="body" className="font-semibold">{format(i.price * i.qty)}</Text>
          </li>
        ))}
      </ul>
    </section>
  );
}
