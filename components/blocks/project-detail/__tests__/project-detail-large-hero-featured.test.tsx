import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailLargeHeroFeatured } from "../project-detail-large-hero-featured";

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

describe("ProjectDetailLargeHeroFeatured", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailLargeHeroFeatured title="Epic Journey" />);
    expect(screen.getByText("Epic Journey")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailLargeHeroFeatured subtitle="A documentary project" />);
    expect(screen.getByText("A documentary project")).toBeInTheDocument();
  });

  it("renders project details", () => {
    const details = [
      { label: "Duration", value: "6 months" },
      { label: "Location", value: "Global" },
    ];
    render(<ProjectDetailLargeHeroFeatured details={details} />);
    expect(screen.getByText("Duration")).toBeInTheDocument();
    expect(screen.getByText("6 months")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Global")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    const sections = [
      { title: "The Beginning", content: "It all started with a dream" },
    ];
    render(<ProjectDetailLargeHeroFeatured sections={sections} />);
    expect(screen.getByText("The Beginning")).toBeInTheDocument();
    expect(screen.getByText("It all started with a dream")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailLargeHeroFeatured className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailLargeHeroFeatured backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
