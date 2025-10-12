import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { CheckoutSummaryCard } from "./CheckoutSummaryCard";

describe("<CheckoutSummaryCard />", () => {
  it("renders", () => {
    render(
      <CheckoutSummaryCard
        subtotal={10}
        shipping={0}
        taxes={1}
        total={11}
        onPlaceOrder={() => {}}
        onContinue={() => {}}
        format={(n) => `$${n.toFixed(2)}`}
      />
    );
  });
});
