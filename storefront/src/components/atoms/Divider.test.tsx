import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Divider } from "./Divider";

describe("<Divider />", () => {
  it("renders a single divider element", () => {
    const { container } = render(<Divider />);
    const el = container.querySelector("div");
    expect(el).toBeInTheDocument();
    // should be the only node rendered
    expect(container.childNodes.length).toBe(1);
  });

  it("has the expected Tailwind classes", () => {
    const { container } = render(<Divider />);
    const el = container.querySelector("div") as HTMLDivElement;
    const cls = el.className;

    expect(cls).toContain("my-4");
    expect(cls).toContain("h-px");
    expect(cls).toContain("w-full");
    expect(cls).toContain("bg-[var(--neutral)]");
  });
});
