// /src/components/organisms/OrderHeader.tsx
import * as React from "react";
import { Text } from "../atoms/Text";
import { Stepper } from "../molecules/Stepper";
import type { OrderStatus } from "../../lib/api";

export function OrderHeader({
  id, status, loading,
}: { id: string; status?: OrderStatus; loading?: boolean }) {
  return (
    <div className="rounded-2xl border border-[var(--neutral)] bg-[var(--bg-base)] p-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <div>
          <Text variant="body" className="mb-1">Order ID</Text>
          <Text variant="sectionTitle">{id}</Text>
        </div>
        <div>
          {loading ? (
            <Text variant="muted">Loading status…</Text>
          ) : status ? (
            <Stepper current={status} />
          ) : (
            <Text variant="muted">No status available</Text>
          )}
        </div>
      </div>
    </div>
  );
}
