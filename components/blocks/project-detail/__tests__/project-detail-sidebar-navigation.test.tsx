import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailSidebarNavigation } from "../project-detail-sidebar-navigation";

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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(100).fill("/placeholder.jpg"),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name: string }) => <span data-testid="mock-icon">{name}</span>,
}));

describe("ProjectDetailSidebarNavigation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailSidebarNavigation title="Product Launch Campaign" />);
    expect(screen.getByText("Product Launch Campaign")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailSidebarNavigation subtitle="A multi-channel marketing initiative" />);
    expect(screen.getByText("A multi-channel marketing initiative")).toBeInTheDocument();
  });

  it("renders navigation sections", () => {
    const sections = [
      { id: "overview", title: "Overview", content: "Campaign overview" },
      { id: "strategy", title: "Strategy", content: "Our strategic approach" },
    ];
    render(<ProjectDetailSidebarNavigation sections={sections} />);
    expect(screen.getAllByText("Overview").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Strategy").length).toBeGreaterThan(0);
  });

  it("renders category, client, and year metadata", () => {
    render(<ProjectDetailSidebarNavigation category="Marketing" client="TechCorp" year="2024" />);
    expect(screen.getByText("Marketing")).toBeInTheDocument();
    expect(screen.getByText("TechCorp")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailSidebarNavigation className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailSidebarNavigation backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
