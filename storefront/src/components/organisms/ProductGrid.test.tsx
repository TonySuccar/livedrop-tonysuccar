import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { ProductGrid } from "./ProductGrid";

describe("<ProductGrid />", () => {
  it("renders an empty grid", () => {
    render(<ProductGrid products={[]} /> as any);
  });
});
