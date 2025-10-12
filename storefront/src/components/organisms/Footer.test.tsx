import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Footer } from "./Footer";
import { MemoryRouter } from "react-router-dom";

describe("<Footer />", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });
});
