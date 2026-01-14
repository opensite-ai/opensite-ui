import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterCtaSocial } from "../footer-cta-social";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FooterCtaSocial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FooterCtaSocial />);
    expect(screen.getByText("Let's connect")).toBeInTheDocument();
    expect(screen.getByText("You want to scale faster? Try Opensite today.")).toBeInTheDocument();
  });

  it("renders custom pre-heading", () => {
    render(<FooterCtaSocial preHeading="Custom Pre-Heading" />);
    expect(screen.getByText("Custom Pre-Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<FooterCtaSocial heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<FooterCtaSocial buttonText="Start Now" />);
    expect(screen.getByText("Start Now")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterCtaSocial className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
