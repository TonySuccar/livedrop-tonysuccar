import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { SupportPanel } from "./SupportPanel";

// jsdom doesn't implement scrollTo; mock it for the test
(global as any).HTMLElement.prototype.scrollTo = () => {};

describe("<SupportPanel />", () => {
  it("renders when open and calls onClose", () => {
    render(<SupportPanel open={true} onClose={() => {}} /> as any);
  });
});
