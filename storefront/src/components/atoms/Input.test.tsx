import { createRef } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("<Input />", () => {
  it("renders an input (textbox) and passes basic props", () => {
    render(<Input placeholder="Search…" />);
    const el = screen.getByRole("textbox");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("placeholder", "Search…");
  });

  it("forwards ref to the actual <input>", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("applies size classes: sm / md (default) / lg", () => {
  const { rerender } = render(<Input size={"sm" as any} />);
    let el = screen.getByRole("textbox");
    expect(el.className).toContain("h-9");
    expect(el.className).toContain("text-sm");

  rerender(<Input />); // default md
    el = screen.getByRole("textbox");
    expect(el.className).toContain("h-10");
    expect(el.className).toContain("text-sm");

  rerender(<Input size={"lg" as any} />);
    el = screen.getByRole("textbox");
    expect(el.className).toContain("h-11");
    expect(el.className).toContain("text-base");
  });

  it("sets aria-invalid when invalid", () => {
    render(<Input invalid />);
    const el = screen.getByRole("textbox");
    expect(el).toHaveAttribute("aria-invalid", "true");
  });

  it("renders left and right icons and adjusts padding", () => {
    const Left = () => <svg data-testid="left" />;
    const Right = () => <svg data-testid="right" />;

    // left only
    const { rerender } = render(<Input leftIcon={<Left />} />);
    let el = screen.getByRole("textbox");
    expect(screen.getByTestId("left")).toBeInTheDocument();
    expect(el.className).toContain("pl-9");
    expect(el.className).toContain("pr-3");

    // right only
    rerender(<Input rightIcon={<Right />} />);
    el = screen.getByRole("textbox");
    expect(screen.getByTestId("right")).toBeInTheDocument();
    expect(el.className).toContain("pl-3");
    expect(el.className).toContain("pr-9");

    // both
    rerender(<Input leftIcon={<Left />} rightIcon={<Right />} />);
    el = screen.getByRole("textbox");
    expect(el.className).toContain("pl-9");
    expect(el.className).toContain("pr-9");
  });

  it("has no border/ring/shadow classes", () => {
    render(<Input />);
    const el = screen.getByRole("textbox");
    const cls = el.className;
    expect(cls).toContain("border-0");
    expect(cls).toContain("ring-0");
    expect(cls).toContain("shadow-none");
  });
});
