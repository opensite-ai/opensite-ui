import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Container } from "../container";

describe("Container", () => {
  it("renders children correctly", () => {
    render(<Container>Test Content</Container>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies default maxWidth of xl", () => {
    const { container } = render(<Container>Test</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain("max-w-7xl");
  });

  it("applies custom maxWidth", () => {
    const { container } = render(<Container maxWidth="2xl">Test</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain("max-w-screen-2xl");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Container className="custom-class">Test</Container>
    );
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain("custom-class");
  });

  it("renders as different element when as prop is provided", () => {
    const { container } = render(<Container as="section">Test</Container>);
    expect(container.firstChild?.nodeName).toBe("SECTION");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Container ref={ref as any}>Test</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies all standard spacing classes", () => {
    const { container } = render(<Container>Test</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain("mx-auto");
    expect(element.className).toContain("w-full");
    expect(element.className).toContain("px-4");
  });
});
