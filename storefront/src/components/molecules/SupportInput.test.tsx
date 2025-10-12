import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { SupportInput } from "./SupportInput";

describe("<SupportInput />", () => {
  it("renders and handles quick replies", () => {
    render(<SupportInput input="" setInput={() => {}} sending={false} onSend={() => {}} />);
  });
});
