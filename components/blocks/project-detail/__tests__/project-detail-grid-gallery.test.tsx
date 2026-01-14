import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailGridGallery } from "../project-detail-grid-gallery";

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

describe("ProjectDetailGridGallery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailGridGallery title="Summer Collection" />);
    expect(screen.getByText("Summer Collection")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailGridGallery subtitle="Fashion forward designs" />);
    expect(screen.getByText("Fashion forward designs")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailGridGallery description="Our latest summer fashion collection" />);
    expect(screen.getByText("Our latest summer fashion collection")).toBeInTheDocument();
  });

  it("renders category, year, and artist", () => {
    render(<ProjectDetailGridGallery category="Fashion" year="2024" artist="Jane Doe" />);
    expect(screen.getByText("Fashion")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("renders creative process section", () => {
    render(<ProjectDetailGridGallery creativeProcess="Inspired by nature and movement" />);
    expect(screen.getByText("Inspired by nature and movement")).toBeInTheDocument();
    expect(screen.getByText("Creative Process")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailGridGallery className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailGridGallery backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
