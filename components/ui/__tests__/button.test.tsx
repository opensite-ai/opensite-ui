import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies default variant and size", () => {
    const { container } = render(<Button>Default</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button.getAttribute("data-variant")).toBe("default");
    expect(button.getAttribute("data-size")).toBe("default");
  });

  it("applies custom variant", () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button.getAttribute("data-variant")).toBe("destructive");
    expect(button.className).toContain("bg-destructive");
  });

  it("applies custom size", () => {
    const { container } = render(<Button size="sm">Small</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button.getAttribute("data-size")).toBe("sm");
    expect(button.className).toContain("h-8");
  });

  it("applies custom className", () => {
    const { container } = render(<Button className="custom-class">Test</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain("custom-class");
  });

  it("handles click events", async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<Button onClick={() => { clicked = true; }}>Click</Button>);

    await user.click(screen.getByText("Click"));
    expect(clicked).toBe(true);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();
  });

  it("renders as Slot when asChild is true", () => {
    const { container } = render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    );
    expect(container.querySelector("a")).toBeInTheDocument();
  });

  it("applies all button variants correctly", () => {
    const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const;

    variants.forEach((variant) => {
      const { container } = render(<Button variant={variant}>Test</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button.getAttribute("data-variant")).toBe(variant);
    });
  });

  it("applies all size variants correctly", () => {
    const sizes = ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"] as const;

    sizes.forEach((size) => {
      const { container } = render(<Button size={size}>Test</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button.getAttribute("data-size")).toBe(size);
    });
  });

  it("applies focus-visible styles", () => {
    const { container } = render(<Button>Focus Test</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain("focus-visible:border-ring");
    expect(button.className).toContain("focus-visible:ring-ring/50");
  });

  it("applies disabled styles", () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain("disabled:pointer-events-none");
    expect(button.className).toContain("disabled:opacity-50");
  });
});
