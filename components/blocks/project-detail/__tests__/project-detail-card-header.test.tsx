import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailCardHeader } from "../project-detail-card-header";

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

describe("ProjectDetailCardHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailCardHeader title="Dashboard Redesign" />);
    expect(screen.getByText("Dashboard Redesign")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailCardHeader subtitle="Analytics Platform" />);
    expect(screen.getByText("Analytics Platform")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailCardHeader description="A complete overhaul of the analytics dashboard" />);
    expect(screen.getByText("A complete overhaul of the analytics dashboard")).toBeInTheDocument();
  });

  it("renders category, year, and artist", () => {
    render(<ProjectDetailCardHeader category="UI/UX" year="2024" artist="Design Team" />);
    expect(screen.getByText("UI/UX")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Design Team")).toBeInTheDocument();
  });

  it("renders gallery images", () => {
    const galleryImages = [
      { src: "/gallery1.jpg", alt: "Screen 1" },
      { src: "/gallery2.jpg", alt: "Screen 2" },
    ];
    render(<ProjectDetailCardHeader galleryImages={galleryImages} />);
    expect(screen.getByAltText("Screen 1")).toBeInTheDocument();
    expect(screen.getByAltText("Screen 2")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailCardHeader className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailCardHeader backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
