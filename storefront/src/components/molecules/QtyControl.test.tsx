import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { QtyControl } from "./QtyControl";

describe("<QtyControl />", () => {
  it("renders", () => {
    render(<QtyControl id="p1" max={5} title="P" price={1} image="" /> as any);
  });
});
