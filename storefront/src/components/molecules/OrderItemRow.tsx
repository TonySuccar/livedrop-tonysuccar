// /src/components/molecules/OrderItemRow.tsx
import "react";
import { Text } from "../atoms/Text";
import { formatCurrency } from "../../lib/format";

export function OrderItemRow({
  id, title, price, image, qty,
}: { id: string; title: string; price: number; image: string; qty: number }) {
  return (
    <li key={id} className="flex items-center gap-3 py-3">
      <img src={image} alt="" className="h-14 w-14 rounded-lg object-cover" />
      <div className="min-w-0 flex-1">
        <Text variant="body" className="font-medium line-clamp-1">{title}</Text>
        <Text variant="muted">Qty {qty}</Text>
      </div>
      <Text variant="body" className="font-semibold">{formatCurrency(price * qty)}</Text>
    </li>
  );
}
