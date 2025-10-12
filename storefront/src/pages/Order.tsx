// /src/pages/Order.tsx
import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Text } from "../components/atoms/Text";
import { getOrderStatus, type OrderTracking } from "../lib/api";
import { OrderHeader } from "../components/organisms/OrderHeader";
import { CarrierBlock } from "../components/molecules/CarrierBlock";
import { OrderItems } from "../components/organisms/OrderItems";
import { Button } from "../components/atoms/Button";

export default function Order() {
  const { id = "" } = useParams<{ id: string }>();
  const nav = useNavigate();

  const [track, setTrack] = React.useState<OrderTracking | null>(null);
  const [loading, setLoading] = React.useState(true);

  const snap = React.useMemo(() => {
    try {
      const raw = sessionStorage.getItem("shoplite:lastOrder");
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed?.id === id ? parsed : null;
    } catch { return null; }
  }, [id]);

  React.useEffect(() => {
    let stop = false;
    const fetchStatus = async () => {
      const res = await getOrderStatus(id);
      if (!stop) setTrack(res);
    };
    setLoading(true);
    fetchStatus().finally(() => !stop && setLoading(false));
    const iv = setInterval(fetchStatus, 1000);
    return () => { stop = true; clearInterval(iv); };
  }, [id]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Text as="h1" variant="pageTitle" className="mb-2">Order Status</Text>
      <Text variant="subtitle" className="mb-6">We’ll keep this page updated as your order moves.</Text>

        <OrderHeader id={id} status={track?.status} loading={loading} />

  {/* Carrier + ETA shown from the start */}
  <div className="mt-4 rounded-2xl border border-[var(--neutral)] bg-[var(--bg-base)] p-5">
    <CarrierBlock
      carrier={track?.carrier}
      tracking={track?.tracking}
      etaISO={track?.eta}
    />
    {track && (track.status === "Placed" || track.status === "Packed") && (
      <Text variant="muted" className="mt-2 text-xs">
        Label created — your package will be handed to the carrier soon.
      </Text>
    )}
  </div>

      {snap ? (
        <OrderItems items={snap.items} total={snap.total} />
      ) : (
        <div className="mt-6 rounded-2xl border border-[var(--neutral)] bg-[var(--bg-base)] p-5">
          <Text variant="muted">We couldn’t load a snapshot for this order.</Text>
        </div>
      )}

      <div className="mt-6">
        <Button className="mt-4 w-full"
          variant="primary" onClick={() => nav("/")}>Back to home</Button>
      </div>
    </main>
  );
}
