import React from "react";
import { Text } from "../atoms/Text";

type Msg =
  | { role: "user"; text: string }
  | { role: "assistant"; text: string }
  | {
      role: "assistant";
      kind: "order";
      order: any;
    };

export function SupportMessageList({ messages, listRef }: { messages: Msg[]; listRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4 bg-[var(--bg-base)]">
      {messages.map((m, i) => {
        if ((m as any).kind === "order") {
          const o = (m as any).order;
          const meta = [
            { k: "Status", v: o.status },
            o.carrier ? { k: "Carrier", v: o.carrier } : null,
            o.tracking ? { k: "Tracking #", v: o.tracking } : null,
            o.eta ? { k: "ETA", v: new Date(o.eta).toLocaleString() } : null,
          ].filter(Boolean) as { k: string; v: string }[];

          return (
            <div key={i} className="mr-auto max-w-[85%] rounded-2xl border border-[var(--neutral)] bg-white p-3">
              <Text variant="sectionTitle" className="mb-1">Order {o.id}</Text>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${
                      o.status === "Delivered"
                        ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                        : o.status === "Shipped"
                        ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                        : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                    }`}
              >
                {o.status}
              </span>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {meta.map(({ k, v }) => (
                  <div key={k} className="rounded-lg bg-[var(--bg-base)] p-2">
                    <Text variant="muted" className="text-xs">{k}</Text>
                    <Text variant="body" className="font-medium">{v}</Text>
                  </div>
                ))}
              </div>

              <Text variant="muted" className="mt-3 text-xs">
                Tip: you can paste another order ID anytime to check its status.
              </Text>
            </div>
          );
        }

        return (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-3 py-2 ${
              m.role === "user" ? "ml-auto bg-[var(--brand)] text-white" : "mr-auto border border-[var(--neutral)] bg-white"
            }`}
          >
            <Text variant="body" className={m.role === "user" ? "text-white" : ""}>
              {("text" in m && m.text) || ""}
            </Text>
          </div>
        );
      })}
    </div>
  );
}
