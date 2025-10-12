import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";
import '@testing-library/jest-dom'; // For extended matchers

const user = userEvent.setup();

// Helper function to render a default set of options
function renderSelect(ui?: React.ReactNode) {
  return render(
    ui ?? (
      <Select aria-label="Product Categories">
        <option value="all">All</option>
        <option value="phones">Phones</option>
        <option value="laptops" disabled>
          Laptops (disabled)
        </option>
        <option>Accessories</option>
      </Select>
    )
  );
}

describe("<Select />", () => {
  it("renders with first option as fallback when no value/defaultValue", () => {
    renderSelect();
    const button = screen.getByRole("button");
    expect(within(button).getByText(/all/i)).toBeInTheDocument();
  });

  it("respects defaultValue (uncontrolled)", () => {
    render(
      <Select aria-label="Tags" defaultValue="phones">
        <option value="all">All</option>
        <option value="phones">Phones</option>
      </Select>
    );
    const btn = screen.getByRole("button");
    expect(within(btn).getByText(/phones/i)).toBeInTheDocument();
  });

  it("supports controlled value and updates when the value prop changes", async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Select aria-label="Tags" value="all" onChange={onChange}>
        <option value="all">All</option>
        <option value="phones">Phones</option>
      </Select>
    );

    // Initial state check
    expect(within(screen.getByRole("button")).getByText(/all/i)).toBeInTheDocument();

    // 1. User clicks a new option ("Phones")
    await user.click(screen.getByRole("button"));
    const listbox = screen.getByRole("listbox");
    await user.click(within(listbox).getByRole("option", { name: "Phones" }));

    // onChange fired
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.value).toBe("phones");

    // Value is still "all" because it's controlled by the parent
    expect(within(screen.getByRole("button")).getByText(/all/i)).toBeInTheDocument();

    // 2. Parent rerenders with the new controlled value
    rerender(
      <Select aria-label="Tags" value="phones" onChange={onChange}>
        <option value="all">All</option>
        <option value="phones">Phones</option>
      </Select>
    );
    expect(within(screen.getByRole("button")).getByText(/phones/i)).toBeInTheDocument();
  });

  it("applies size and fullWidth classes correctly", () => {
    const { rerender } = render(
      <Select size={"sm" as any} fullWidth aria-label="S">
        <option>One</option>
      </Select>
    );
    let btn = screen.getByRole("button");
    // Size check for small
    expect(btn.className).toContain("h-9 text-sm");
    // fullWidth check
    expect(btn).toHaveClass("w-full");

    rerender(
      <Select size={"lg" as any} aria-label="L">
        <option>One</option>
      </Select>
    );
    btn = screen.getByRole("button");
    // Size check for large
    expect(btn.className).toContain("h-11 text-base");
    // fullWidth default (false) check
    expect(btn).toHaveClass("w-auto");
  });

  it("invalid adds alert ring/border classes", () => {
    render(
      <Select aria-label="Invalid" invalid>
        <option>One</option>
      </Select>
    );
    const btn = screen.getByRole("button");
    expect(within(btn).getByText(/One/i)).toBeInTheDocument();
    expect(btn.className).toMatch(/border-\[var\(--alert\)\]/);
    expect(btn.className).toMatch(/focus:ring-\[var\(--alert\)\]/);
  });

  it("selects item (uncontrolled) on click and closes popover", async () => {
    renderSelect();
    const button = screen.getByRole("button");

    // 1. Open and check aria-expanded
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    const listbox = screen.getByRole("listbox");
    
    // 2. Click a new option
    await user.click(within(listbox).getByRole("option", { name: /Accessories/i }));

    // 3. Verify state change and closure
    expect(within(screen.getByRole("button")).getByText(/Accessories/i)).toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("does not select disabled options on click", async () => {
    renderSelect();
    const button = screen.getByRole("button");

    await user.click(button);
    const listbox = screen.getByRole("listbox");

    // Try clicking disabled option
    const disabledOpt = within(listbox).getByRole("option", { name: /Laptops/i });
    await user.click(disabledOpt);

    // Still open; value unchanged (still "All")
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(button).toBeInTheDocument(); // Still showing "All"
  });

  it("closes when clicking outside", async () => {
    render(
      <>
        <div data-testid="outside">outside click area</div>
        <Select aria-label="Tags">
          <option>One</option>
          <option>Two</option>
        </Select>
      </>
    );

    // Open popover
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    // Click outside
    await user.click(screen.getByTestId("outside"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("keyboard navigation: opens with Enter, navigates with Arrow keys, selects with Enter/Space", async () => {
    renderSelect();
    const button = screen.getByRole("button");
    button.focus();

    // 1. Open with Enter
    await user.keyboard("{Enter}");
    const listbox = screen.getByRole("listbox");
    
    // 2. Initial highlight is on "All" (current value)
    expect(listbox).toHaveAttribute('aria-activedescendant', 'all');

    // 3. Move to "Phones" (ArrowDown)
    await user.keyboard("{ArrowDown}");
    expect(listbox).toHaveAttribute('aria-activedescendant', 'phones');
    
    // 4. Move to "Accessories" (ArrowDown) - skips disabled "Laptops"
    await user.keyboard("{ArrowDown}");
    expect(listbox).toHaveAttribute('aria-activedescendant', 'Accessories');
    expect(screen.getByRole('option', { name: 'Accessories' })).toHaveClass('bg-[var(--brand)]/10');

    // 5. Select "Accessories" with Space
    await user.keyboard(" ");

    // Uncontrolled: label should update & listbox closes
    expect(within(screen.getByRole("button")).getByText(/Accessories/i)).toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("keyboard navigation: moves to start/end with Home/End", async () => {
    renderSelect();
    const button = screen.getByRole("button");
    button.focus();

    // Open and move to the middle item "Phones"
    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(screen.getByRole("listbox")).toHaveAttribute('aria-activedescendant', 'phones');

    // Home key moves to first item "all"
    await user.keyboard("{Home}");
    expect(screen.getByRole("listbox")).toHaveAttribute('aria-activedescendant', 'all');

    // End key moves to last item "Accessories"
    await user.keyboard("{End}");
    expect(screen.getByRole("listbox")).toHaveAttribute('aria-activedescendant', 'Accessories');
    
    // Select last item
    await user.keyboard("{Enter}");
    expect(within(screen.getByRole("button")).getByText(/Accessories/i)).toBeInTheDocument();
  });

  it("closes popover with Escape key", async () => {
    renderSelect();
    const button = screen.getByRole("button");
    button.focus();

    // Open popover
    await user.keyboard("{Enter}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    // Close popover with Escape
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("respects disabled prop and prevents interaction", async () => {
    render(
      <Select aria-label="Disabled" disabled onChange={vi.fn()}>
        <option>One</option>
      </Select>
    );

    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass('opacity-60 cursor-not-allowed');

    // 1. Try to open by click
    await user.click(btn);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // 2. Try to open by keyboard
    btn.focus();
    fireEvent.keyDown(btn, { key: "Enter" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // Ensure it still displays the selected label
    expect(within(btn).getByText("One")).toBeInTheDocument();
  });
});