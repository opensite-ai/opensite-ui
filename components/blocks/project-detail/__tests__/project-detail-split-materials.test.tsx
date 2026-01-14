import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailSplitMaterials } from "../project-detail-split-materials";

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

describe("ProjectDetailSplitMaterials", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailSplitMaterials title="Ergonomic Chair" />);
    expect(screen.getByText("Ergonomic Chair")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailSplitMaterials subtitle="Premium office furniture" />);
    expect(screen.getByText("Premium office furniture")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailSplitMaterials description="A revolutionary ergonomic chair designed for all-day comfort" />);
    expect(screen.getByText("A revolutionary ergonomic chair designed for all-day comfort")).toBeInTheDocument();
  });

  it("renders category, year, and artist", () => {
    render(<ProjectDetailSplitMaterials category="Furniture Design" year="2024" artist="Design Studio" />);
    expect(screen.getByText("Furniture Design")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Design Studio")).toBeInTheDocument();
  });

  it("renders specifications table", () => {
    const specifications = [
      { label: "Material", value: "Recycled aluminum" },
      { label: "Weight", value: "35 lbs" },
    ];
    render(<ProjectDetailSplitMaterials specifications={specifications} />);
    expect(screen.getByText("Specifications")).toBeInTheDocument();
    expect(screen.getByText("Material")).toBeInTheDocument();
    expect(screen.getByText("Recycled aluminum")).toBeInTheDocument();
  });

  it("renders materials list", () => {
    const materials = ["Aluminum", "Mesh fabric"];
    render(<ProjectDetailSplitMaterials materials={materials} />);
    expect(screen.getByText("Materials")).toBeInTheDocument();
    expect(screen.getByText("Aluminum")).toBeInTheDocument();
    expect(screen.getByText("Mesh fabric")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailSplitMaterials className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailSplitMaterials backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
