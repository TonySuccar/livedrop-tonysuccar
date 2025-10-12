import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { CheckoutItemsList } from "./CheckoutItemsList";

describe("<CheckoutItemsList />", () => {
  it("renders", () => {
    render(<CheckoutItemsList items={[]} format={(n) => `$${n}`} />);
  });
});
