import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { CarrierBlock } from "./CarrierBlock";

describe("<CarrierBlock />", () => {
  it("renders", () => {
    render(<CarrierBlock carrier="Carrier Co" tracking="123" etaISO={new Date().toISOString()} />);
  });
});
