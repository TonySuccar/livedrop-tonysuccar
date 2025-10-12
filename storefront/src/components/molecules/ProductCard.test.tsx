import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { ProductCard } from "./ProductCard";
import { MemoryRouter } from "react-router-dom";

describe("<ProductCard />", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <ProductCard product={{ id: 'p1', title: 'P', price: 1, image: '', stockQty: 1, tags: [], description: '' }} />
      </MemoryRouter>
    );
  });
});
