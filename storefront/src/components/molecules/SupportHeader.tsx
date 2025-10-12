import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";

export function SupportHeader({ onClose }: { onClose: () => void }) {
  return (
    <header className="flex items-center justify-between border-b bg-[var(--brand)] p-4 text-white">
      <Text as="h2" variant="sectionTitle" className="text-white">
        Ask Support
      </Text>
      <Button variant="primary" size="sm" onClick={onClose} aria-label="Close support">
        Close
      </Button>
    </header>
  );
}
