import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailSidebarSticky } from "../project-detail-sidebar-sticky";

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

describe("ProjectDetailSidebarSticky", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailSidebarSticky title="Urban Perspectives" />);
    expect(screen.getByText("Urban Perspectives")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailSidebarSticky subtitle="A photographic journey" />);
    expect(screen.getByText("A photographic journey")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailSidebarSticky description="Exploring urban environments" />);
    expect(screen.getByText("Exploring urban environments")).toBeInTheDocument();
  });

  it("renders category and year", () => {
    render(<ProjectDetailSidebarSticky category="Photography" year="2024" />);
    expect(screen.getByText("Photography")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders related projects when provided", () => {
    const relatedProjects = [
      { title: "Project One", category: "Design", src: "/img1.jpg", alt: "Project 1" },
    ];
    render(<ProjectDetailSidebarSticky relatedProjects={relatedProjects} relatedProjectsTitle="Related Work" />);
    expect(screen.getByText("Related Work")).toBeInTheDocument();
    expect(screen.getByText("Project One")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailSidebarSticky className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
