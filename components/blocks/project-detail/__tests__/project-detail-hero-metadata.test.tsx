import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailHeroMetadata } from "../project-detail-hero-metadata";

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

describe("ProjectDetailHeroMetadata", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailHeroMetadata title="Test Project" />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailHeroMetadata description="A test project description" />);
    expect(screen.getByText("A test project description")).toBeInTheDocument();
  });

  it("renders category, client, and year metadata", () => {
    render(<ProjectDetailHeroMetadata category="Digital Art" client="Jane Smith" year="2024" />);
    expect(screen.getByText("Digital Art")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders action button when provided", () => {
    render(<ProjectDetailHeroMetadata action={{ label: "View Project", href: "/projects/test" }} />);
    expect(screen.getByText("View Project")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailHeroMetadata className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders subtitle", () => {
    render(<ProjectDetailHeroMetadata subtitle="Lead Designer" />);
    expect(screen.getByText("Lead Designer")).toBeInTheDocument();
  });
});
