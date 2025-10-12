import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Navbar } from "./Navbar";
import { MemoryRouter } from "react-router-dom";

describe("<Navbar />", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });
});
