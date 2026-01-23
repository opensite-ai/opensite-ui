import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "../section";

describe("Section", () => {
  it("renders children correctly", () => {
    render(<Section>Test Content</Section>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Section title="Test Title">Content</Section>);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Title").tagName).toBe("H2");
  });

  it("renders subtitle when provided", () => {
    render(<Section subtitle="Test Subtitle">Content</Section>);
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("applies default background of theme", () => {
    const { container } = render(<Section>Test</Section>);
    const element = container.querySelector("section");
    expect(element?.className).toContain("bg-background");
  });

  it("applies custom background", () => {
    const { container } = render(<Section background="dark">Test</Section>);
    const element = container.querySelector("section");
    expect(element?.className).toContain("bg-foreground");
  });

  it("applies default spacing of lg", () => {
    const { container } = render(<Section>Test</Section>);
    const element = container.querySelector("section");
    expect(element?.className).toContain("py-20");
  });

  it("applies custom spacing", () => {
    const { container } = render(<Section spacing="sm">Test</Section>);
    const element = container.querySelector("section");
    expect(element?.className).toContain("py-12");
  });

  it("applies id attribute when provided", () => {
    render(<Section id="test-section">Content</Section>);
    expect(screen.getByText("Content").closest("section")).toHaveAttribute("id", "test-section");
  });

  it("applies custom className", () => {
    const { container } = render(<Section className="custom-class">Test</Section>);
    const element = container.querySelector("section");
    expect(element?.className).toContain("custom-class");
  });
});
