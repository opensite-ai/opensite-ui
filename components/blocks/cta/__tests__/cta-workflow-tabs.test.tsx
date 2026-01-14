import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaWorkflowTabs } from "../cta-workflow-tabs";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("CtaWorkflowTabs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CtaWorkflowTabs />);
    expect(screen.getByText("Build your workflow")).toBeInTheDocument();
    expect(screen.getByText("From design to deployment, we've got you covered. Choose your path and start building today.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaWorkflowTabs heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaWorkflowTabs description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Learn More", href: "/about", variant: "outline" as const },
    ];
    render(<CtaWorkflowTabs actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders tabs when provided", () => {
    const tabs = [
      { id: "design", label: "Design", iconName: "lucide/palette", heading: "Design Tab", description: "Design description" },
      { id: "develop", label: "Develop", iconName: "lucide/code", heading: "Develop Tab", description: "Develop description" },
    ];
    render(<CtaWorkflowTabs tabs={tabs} />);
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Develop")).toBeInTheDocument();
    expect(screen.getByText("Design Tab")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaWorkflowTabs className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
