import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { SupportHeader } from "./SupportHeader";

describe("<SupportHeader />", () => {
  it("renders and calls onClose prop", () => {
    render(<SupportHeader onClose={() => {}} />);
  });
});
