import { Text } from "../atoms/Text";

export function CarrierBlock({
  carrier,
  tracking,
  etaISO,
}: {
  carrier?: string;
  tracking?: string;
  etaISO?: string;
}) {
  const eta = etaISO ? new Date(etaISO).toLocaleString() : "—";
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div>
        <Text variant="muted" className="mb-1">Carrier</Text>
        <Text variant="body" className="font-medium">{carrier ?? "—"}</Text>
      </div>
      <div>
        <Text variant="muted" className="mb-1">Tracking</Text>
        <Text variant="body" className="font-medium">{tracking ?? "—"}</Text>
      </div>
      <div>
        <Text variant="muted" className="mb-1">ETA</Text>
        <Text variant="body" className="font-medium">{eta}</Text>
      </div>
    </div>
  );
}
