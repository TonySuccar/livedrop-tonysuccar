import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { SupportLauncher } from "./SupportLauncher";

describe("<SupportLauncher />", () => {
  it("renders and shows hint behaviour", () => {
    // sessionStorage might persist between tests; ensure key not present
    sessionStorage.removeItem("supportHintSeen");
    render(<SupportLauncher onClick={() => {}} /> as any);
  });
});
