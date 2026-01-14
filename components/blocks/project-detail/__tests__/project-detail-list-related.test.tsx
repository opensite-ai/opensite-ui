import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailListRelated } from "../project-detail-list-related";

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

describe("ProjectDetailListRelated", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailListRelated title="Brand Identity" />);
    expect(screen.getByText("Brand Identity")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailListRelated subtitle="Complete brand system" />);
    expect(screen.getByText("Complete brand system")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailListRelated description="A comprehensive brand identity system" />);
    expect(screen.getByText("A comprehensive brand identity system")).toBeInTheDocument();
  });

  it("renders category and year", () => {
    render(<ProjectDetailListRelated category="Branding" year="2024" />);
    expect(screen.getByText("Branding")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders related projects", () => {
    const relatedProjects = [
      { title: "Website Design", category: "Web", year: "2024", src: "/thumb1.jpg", alt: "Website", href: "/projects/website" },
      { title: "App Design", category: "Mobile", year: "2023", src: "/thumb2.jpg", alt: "App", href: "/projects/app" },
    ];
    render(<ProjectDetailListRelated relatedProjects={relatedProjects} />);
    expect(screen.getByText("Website Design")).toBeInTheDocument();
    expect(screen.getByText("App Design")).toBeInTheDocument();
    expect(screen.getByText("Related Collections")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailListRelated className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailListRelated backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
