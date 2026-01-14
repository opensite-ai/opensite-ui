import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailFashionEditorial } from "../project-detail-fashion-editorial";

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

describe("ProjectDetailFashionEditorial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailFashionEditorial title="AUTUMN COLLECTION" />);
    expect(screen.getByText("AUTUMN COLLECTION")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailFashionEditorial subtitle="Fall/Winter 2024" />);
    expect(screen.getByText("Fall/Winter 2024")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailFashionEditorial description="A stunning fashion editorial" />);
    expect(screen.getByText("A stunning fashion editorial")).toBeInTheDocument();
  });

  it("renders category and year", () => {
    render(<ProjectDetailFashionEditorial category="Fashion" year="2024" />);
    expect(screen.getByText("Fashion")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders credits section", () => {
    const credits = [
      { role: "Photographer", name: "Jane Doe" },
      { role: "Stylist", name: "John Smith" },
    ];
    render(<ProjectDetailFashionEditorial credits={credits} />);
    expect(screen.getByText("Photographer")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Stylist")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailFashionEditorial className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailFashionEditorial backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
