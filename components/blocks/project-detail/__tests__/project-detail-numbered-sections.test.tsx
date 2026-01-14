import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailNumberedSections } from "../project-detail-numbered-sections";

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

describe("ProjectDetailNumberedSections", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailNumberedSections title="Design Process" />);
    expect(screen.getByText("Design Process")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailNumberedSections subtitle="Our methodology" />);
    expect(screen.getByText("Our methodology")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailNumberedSections description="A step-by-step guide to our process" />);
    expect(screen.getByText("A step-by-step guide to our process")).toBeInTheDocument();
  });

  it("renders category and year", () => {
    render(<ProjectDetailNumberedSections category="Process" year="2024" />);
    expect(screen.getByText("Process")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders numbered sections", () => {
    const sections = [
      { number: "01", title: "Research", content: "Understanding user needs", image: { src: "/img1.jpg", alt: "Research" } },
      { number: "02", title: "Design", content: "Creating solutions", image: { src: "/img2.jpg", alt: "Design" } },
    ];
    render(<ProjectDetailNumberedSections sections={sections} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Research")).toBeInTheDocument();
    expect(screen.getByText("Understanding user needs")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailNumberedSections className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailNumberedSections backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
