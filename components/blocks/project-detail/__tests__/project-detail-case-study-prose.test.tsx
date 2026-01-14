import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailCaseStudyProse } from "../project-detail-case-study-prose";

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

describe("ProjectDetailCaseStudyProse", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailCaseStudyProse title="Brand Redesign" />);
    expect(screen.getByText("Brand Redesign")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailCaseStudyProse subtitle="A comprehensive brand overhaul" />);
    expect(screen.getByText("A comprehensive brand overhaul")).toBeInTheDocument();
  });

  it("renders category, year, and client", () => {
    render(<ProjectDetailCaseStudyProse category="Branding" year="2024" client="TechCorp" />);
    expect(screen.getByText("Branding")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("TechCorp")).toBeInTheDocument();
  });

  it("renders overview section", () => {
    render(<ProjectDetailCaseStudyProse overview="This project transformed the brand identity" />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("This project transformed the brand identity")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    const sections = [
      { id: "challenge", title: "The Challenge", content: "Our client needed a fresh identity" },
    ];
    render(<ProjectDetailCaseStudyProse sections={sections} />);
    expect(screen.getByText("The Challenge")).toBeInTheDocument();
    expect(screen.getByText("Our client needed a fresh identity")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailCaseStudyProse className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailCaseStudyProse backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
