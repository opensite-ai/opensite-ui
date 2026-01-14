import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailExhibitionSidebar } from "../project-detail-exhibition-sidebar";

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

describe("ProjectDetailExhibitionSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailExhibitionSidebar title="Reflections" />);
    expect(screen.getByText("Reflections")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailExhibitionSidebar subtitle="A mixed media series" />);
    expect(screen.getByText("A mixed media series")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailExhibitionSidebar description="A series exploring identity and self-perception" />);
    expect(screen.getByText("A series exploring identity and self-perception")).toBeInTheDocument();
  });

  it("renders category, year, and artist", () => {
    render(<ProjectDetailExhibitionSidebar category="Mixed Media" year="2024" artist="Jane Artist" />);
    expect(screen.getByText("Mixed Media")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Jane Artist")).toBeInTheDocument();
  });

  it("renders exhibitions sidebar", () => {
    const exhibitions = [
      { title: "Solo Show", venue: "Modern Gallery", date: "Jan 2024" },
      { title: "Group Exhibition", venue: "Art Center", date: "Mar 2024" },
    ];
    render(<ProjectDetailExhibitionSidebar exhibitions={exhibitions} />);
    expect(screen.getByText("Exhibitions")).toBeInTheDocument();
    expect(screen.getByText("Solo Show")).toBeInTheDocument();
    expect(screen.getByText("Modern Gallery")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailExhibitionSidebar className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailExhibitionSidebar backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
