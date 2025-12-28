import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactHelpCenter } from "../contact-help-center";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

describe("ContactHelpCenter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ContactHelpCenter />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders default heading", () => {
    render(<ContactHelpCenter />);
    expect(
      screen.getByText("Need help navigating coverage decisions?")
    ).toBeInTheDocument();
  });

  it("renders contact items", () => {
    render(<ContactHelpCenter />);
    expect(screen.getByText("Schedule a Strategy Call")).toBeInTheDocument();
    expect(screen.getByText("Email the Team")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ContactHelpCenter className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });
});
