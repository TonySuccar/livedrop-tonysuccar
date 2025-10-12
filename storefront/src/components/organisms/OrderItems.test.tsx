import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { OrderItems } from "./OrderItems";

describe("<OrderItems />", () => {
  it("renders with zero items", () => {
    render(<OrderItems items={[]} total={0} /> as any);
  });
});
