// /src/components/molecules/Stepper.tsx
import * as React from "react";
import type { OrderStatus } from "../../lib/api";

const STEPS: OrderStatus[] = ["Placed", "Packed", "Shipped", "Delivered"];

export function Stepper({ current }: { current: OrderStatus }) {
  const activeIdx = STEPS.indexOf(current);

  return (
    <ol className="flex items-center gap-3">
      {STEPS.map((label, i) => {
        const active = i <= activeIdx;
        return (
          <React.Fragment key={label}>
            <li className="flex items-center gap-2">
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold
                  ${active ? "bg-[var(--brand)] text-white" : "bg-[var(--neutral)] text-[#666]"}`}
                aria-label={label}
              >
                {i + 1}
              </span>
              <span className={active ? "text-sm font-semibold text-[var(--text)]" : "text-sm text-[#666]"}>
                {label}
              </span>
            </li>
            {i < STEPS.length - 1 && (
              <span
                className={`mx-2 h-[2px] w-8 rounded ${i < activeIdx ? "bg-[var(--brand)]" : "bg-[var(--neutral)]"}`}
                aria-hidden
              />
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
}
