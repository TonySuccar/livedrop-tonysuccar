import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { CartDrawer } from "./CartDrawer";
import { MemoryRouter } from "react-router-dom";

describe("<CartDrawer />", () => {
  it("renders closed", () => {
    render(
      <MemoryRouter>
        <CartDrawer open={false} onClose={() => {}} />
      </MemoryRouter>
    );
  });
});
