import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterContactCard } from "../footer-contact-card";

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

describe("FooterContactCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FooterContactCard heading="Test Heading" socialTitle="Test Social Label" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Social Label")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<FooterContactCard heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom email", () => {
    render(<FooterContactCard email="test@example.com" />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("renders custom phone", () => {
    render(<FooterContactCard phone="+1 (555) 987-6543" />);
    expect(screen.getByText("+1 (555) 987-6543")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterContactCard className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
