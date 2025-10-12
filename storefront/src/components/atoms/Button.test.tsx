import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("<Button />", () => {
  it("renders children", () => {
    render(<Button>Buy now</Button>);
    expect(screen.getByRole("button", { name: /buy now/i })).toBeInTheDocument();
  });

  it("applies base classes and default PRIMARY variant", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole("button", { name: /primary/i });
    // base class
    expect(btn.className).toContain("inline-flex");
    // default primary variant styling token present
    expect(btn.className).toContain("bg-[var(--cta)]");
  });

  it("respects size prop (sm)", () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole("button", { name: /small/i });
    expect(btn.className).toContain("h-9");
    expect(btn.className).toContain("px-3");
    expect(btn.className).toContain("text-sm");
  });

  it("respects size prop (lg)", () => {
    render(<Button size="lg">Large</Button>);
    const btn = screen.getByRole("button", { name: /large/i });
    expect(btn.className).toContain("h-11");
    expect(btn.className).toContain("px-5");
    expect(btn.className).toContain("text-base");
  });

  it("supports outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole("button", { name: /outline/i });
    expect(btn.className).toContain("border");
    expect(btn.className).toContain("bg-white");
  });

  it("fires onClick when enabled", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Disabled
      </Button>
    );
    fireEvent.click(screen.getByRole("button", { name: /disabled/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders left and right icons", () => {
    render(
      <Button
        iconLeft={<span data-testid="left-ico" />}
        iconRight={<span data-testid="right-ico" />}
      >
        With Icons
      </Button>
    );
    expect(screen.getByTestId("left-ico")).toBeInTheDocument();
    expect(screen.getByTestId("right-ico")).toBeInTheDocument();
  });

  it("passes through native props (e.g., aria-label)", () => {
    render(<Button aria-label="do it" />);
    expect(screen.getByRole("button", { name: /do it/i })).toBeInTheDocument();
  });
});
