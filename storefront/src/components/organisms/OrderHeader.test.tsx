import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { OrderHeader } from "./OrderHeader";

describe("<OrderHeader />", () => {
  it("renders with id and no status", () => {
    render(<OrderHeader id="ORD-1" /> as any);
  });
});
