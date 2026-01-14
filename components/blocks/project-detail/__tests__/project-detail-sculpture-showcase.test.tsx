import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailSculptureShowcase } from "../project-detail-sculpture-showcase";

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

describe("ProjectDetailSculptureShowcase", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailSculptureShowcase title="Metamorphosis" />);
    expect(screen.getByText("Metamorphosis")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailSculptureShowcase subtitle="A bronze sculpture" />);
    expect(screen.getByText("A bronze sculpture")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailSculptureShowcase description="A transformative piece exploring change and growth" />);
    expect(screen.getByText("A transformative piece exploring change and growth")).toBeInTheDocument();
  });

  it("renders artist and metadata", () => {
    render(
      <ProjectDetailSculptureShowcase
        artist="John Doe"
        materials="Bronze, Steel"
        dimensions="48 x 24 x 36 inches"
        location="Modern Art Museum"
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Bronze, Steel")).toBeInTheDocument();
    expect(screen.getByText("48 x 24 x 36 inches")).toBeInTheDocument();
    expect(screen.getByText("Modern Art Museum")).toBeInTheDocument();
  });

  it("renders category and year", () => {
    render(<ProjectDetailSculptureShowcase category="Sculpture" year="2024" />);
    expect(screen.getByText("Sculpture")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailSculptureShowcase className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailSculptureShowcase backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
