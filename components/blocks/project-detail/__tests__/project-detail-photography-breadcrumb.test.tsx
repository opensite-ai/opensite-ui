import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailPhotographyBreadcrumb } from "../project-detail-photography-breadcrumb";

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

describe("ProjectDetailPhotographyBreadcrumb", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailPhotographyBreadcrumb title="Street Photography" />);
    expect(screen.getByText("Street Photography")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailPhotographyBreadcrumb subtitle="Urban life in motion" />);
    expect(screen.getByText("Urban life in motion")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailPhotographyBreadcrumb description="Capturing the energy and diversity of city streets" />);
    expect(screen.getByText("Capturing the energy and diversity of city streets")).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Photography", href: "/photography" },
      { label: "Street" },
    ];
    render(<ProjectDetailPhotographyBreadcrumb breadcrumbs={breadcrumbs} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Photography")).toBeInTheDocument();
    expect(screen.getByText("Street")).toBeInTheDocument();
  });

  it("renders category, year, and photographer", () => {
    render(<ProjectDetailPhotographyBreadcrumb category="Photography" year="2024" photographer="John Doe" />);
    expect(screen.getByText("Photography")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailPhotographyBreadcrumb className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
