// /src/components/molecules/CheckoutSummaryCard.tsx
import * as React from "react";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { Divider } from "../atoms/Divider";

type Props = {
  subtotal: number;
  shipping: number;
  taxes: number;
  total: number;
  onPlaceOrder: () => void;
  placing?: boolean;
  disabled?: boolean;
  onContinue: () => void;
  format: (n: number) => string;
};

export function CheckoutSummaryCard({
  subtotal, shipping, taxes, total,
  onPlaceOrder, placing, disabled,
  onContinue, format
}: Props) {
  return (
    <aside className="overflow-hidden rounded-2xl border border-[var(--neutral)] bg-white shadow-sm">
      <div className="h-1 w-full bg-[var(--brand)]" aria-hidden />
      <div className="p-4">
        <Text as="h2" variant="sectionTitle" className="mb-3">Order summary</Text>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <Text variant="muted">Subtotal</Text>
            <Text variant="body">{format(subtotal)}</Text>
          </div>
          <div className="flex justify-between">
            <Text variant="muted">Shipping</Text>
            <Text variant="body">{shipping === 0 ? "Free" : format(shipping)}</Text>
          </div>
          <div className="flex justify-between">
            <Text variant="muted">Taxes</Text>
            <Text variant="body">{format(taxes)}</Text>
          </div>

          <Divider />

          <div className="flex justify-between">
            <Text variant="body" className="font-semibold">Total</Text>
            <Text variant="price">{format(total)}</Text>
          </div>
        </div>

        <Button
          className="mt-4 w-full"
          variant="primary"
          onClick={onPlaceOrder}
          disabled={disabled}
          aria-disabled={disabled}
          aria-label="Place order"
          title={disabled ? "Add items to place an order" : undefined}
        >
          {placing ? "Placing…" : "Place order"}
        </Button>

        <Button className="mt-2 w-full" variant="outline" onClick={onContinue}>
          Continue shopping
        </Button>
      </div>
    </aside>
  );
}
