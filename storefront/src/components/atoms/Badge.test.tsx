
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import '@testing-library/jest-dom';
import { Badge } from "./Badge"; // <-- adjust path if needed

describe("<Badge />", () => {
  it("renders its children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies the expected styling classes", () => {
    render(<Badge>Sale</Badge>);
    const el = screen.getByText("Sale");

    // spot-check the important utility classes
    expect(el).toHaveClass("inline-flex");
    expect(el).toHaveClass("items-center");
    expect(el).toHaveClass("rounded-full");
    expect(el).toHaveClass("bg-blue-50");
    expect(el).toHaveClass("px-2.5", "py-0.5");
    expect(el).toHaveClass("text-xs", "font-medium", "text-blue-700");
    expect(el).toHaveClass("ring-1", "ring-blue-200");
  });

  it("renders as a non-interactive element (span)", () => {
    render(<Badge>Info</Badge>);
    const el = screen.getByText("Info");
    expect(el.tagName.toLowerCase()).toBe("span");
  });
});
