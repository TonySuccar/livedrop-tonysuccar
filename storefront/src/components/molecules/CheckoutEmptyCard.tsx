// /src/components/molecules/CheckoutEmptyCard.tsx

import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";

export function CheckoutEmptyCard({ onBack }: { onBack: () => void }) {
  return (
    <div className="rounded-2xl border border-[var(--neutral)] bg-[var(--bg-base)] p-8 text-center">
      <Text variant="body" className="mb-2">Your cart is empty.</Text>
      <Button onClick={onBack} variant="primary">Continue shopping</Button>
    </div>
  );
}
