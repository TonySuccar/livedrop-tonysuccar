import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { OrderItemRow } from "./OrderItemRow";

describe("<OrderItemRow />", () => {
  it("renders", () => {
  render(<OrderItemRow id={'o1'} title={'O'} price={1} image={''} qty={1} />);
  });
});
