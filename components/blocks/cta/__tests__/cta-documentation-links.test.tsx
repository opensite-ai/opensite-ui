import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaDocumentationLinks } from "../cta-documentation-links";

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

describe("CtaDocumentationLinks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CtaDocumentationLinks />);
    expect(screen.getByText("Call To Action")).toBeInTheDocument();
    expect(screen.getByText("Build faster with our collection of pre-built components. Speed up your development and ship features in record time.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaDocumentationLinks heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaDocumentationLinks description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Contact Sales", href: "/contact", variant: "outline" as const },
    ];
    render(<CtaDocumentationLinks actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Contact Sales")).toBeInTheDocument();
  });

  it("renders documentation links when provided", () => {
    const links = [
      { iconName: "lucide/file", title: "Documentation", description: "Learn the basics", href: "/docs" },
      { iconName: "lucide/book", title: "Tutorials", description: "Step-by-step guides", href: "/tutorials" },
    ];
    render(<CtaDocumentationLinks links={links} />);
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    expect(screen.getByText("Learn the basics")).toBeInTheDocument();
    expect(screen.getByText("Tutorials")).toBeInTheDocument();
    expect(screen.getByText("Step-by-step guides")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaDocumentationLinks className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
