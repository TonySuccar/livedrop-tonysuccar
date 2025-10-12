import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";

export function SupportInput({
  input,
  setInput,
  sending,
  onSend,
}: {
  input: string;
  setInput: (v: string) => void;
  sending: boolean;
  onSend: () => void;
}) {
  return (
    <form
      className="border-t p-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <div className="flex gap-2">
        <Input
          className="flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ask a question or paste an order ID like "ORD-2025-10-12-7GQ4K"'
          aria-label="Message support"
        />
        <Button
          variant="primary"
          type="submit"
          disabled={sending || input.trim() === ""}
          aria-disabled={sending || input.trim() === ""}
        >
          {sending ? "Sending…" : "Send"}
        </Button>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <Button size="sm" variant="outline" type="button" onClick={() => setInput("What payment methods can I use on Shoplite?")}>
          Payments
        </Button>
        <Button size="sm" variant="outline" type="button" onClick={() => setInput("How long do I have to return a product on Shoplite?")}>
          Returns
        </Button>
        <Button size="sm" variant="outline" type="button" onClick={() => setInput("Track ORD-2025-10-12-7GQ4K")}>
          Track an order
        </Button>
      </div>
    </form>
  );
}
