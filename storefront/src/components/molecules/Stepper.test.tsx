import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Stepper } from "./Stepper";

describe("<Stepper />", () => {
  it("renders", () => {
    render(<Stepper current={"Placed"} />);
  });
});
