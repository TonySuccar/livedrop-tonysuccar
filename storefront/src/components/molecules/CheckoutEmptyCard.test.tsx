import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { CheckoutEmptyCard } from "./CheckoutEmptyCard";

describe("<CheckoutEmptyCard />", () => {
  it("renders", () => {
    render(<CheckoutEmptyCard onBack={() => {}} />);
  });
});
