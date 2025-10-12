// /src/components/organisms/SupportPanel.tsx
import * as React from "react";
import { answerSupport } from "../../assistant/engine";
import { trackOrderFromInput, type OrderStatus } from "../../lib/api";
import { SupportHeader } from "../molecules/SupportHeader";
import { SupportMessageList } from "../molecules/SupportMessageList";
import { SupportInput } from "../molecules/SupportInput";

type Msg =
  | { role: "user"; text: string }
  | { role: "assistant"; text: string }
  | {
      role: "assistant";
      kind: "order";
      order: {
        id: string;
        status: OrderStatus;
        carrier?: string;
        tracking?: string;
        eta?: string;
      };
    };

export function SupportPanel({ open, onClose, initialMessages }: { open: boolean; onClose: () => void; initialMessages?: Msg[] }) {
  const [messages, setMessages] = React.useState<Msg[]>(initialMessages ?? [
    {
      role: "assistant",
      text:
        "Hi! Ask about ShopLite policies or paste an order ID (e.g., ORD-2025-10-12-7GQ4K) to track it.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      prev?.focus();
    };
  }, [open, onClose]);

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const q = input.trim();
    if (!q || sending) return;
    setSending(true);
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");

    try {
      const tracked = await trackOrderFromInput(q);
      if (tracked.handled) {
        setMessages((m) => [...m, { role: "assistant", kind: "order", order: tracked.order } as any]);
        return;
      }

      const res = await answerSupport(q);
      setMessages((m) => [...m, { role: "assistant", text: res.text }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Invalid order ID. Please try again." }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-[999] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Ask Support"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SupportHeader onClose={onClose} />

  <SupportMessageList messages={messages as any} listRef={listRef} />

        <SupportInput input={input} setInput={setInput} sending={sending} onSend={send} />
      </aside>
    </div>
  );
}
