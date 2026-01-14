import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailParallaxScroll } from "../project-detail-parallax-scroll";

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

describe("ProjectDetailParallaxScroll", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailParallaxScroll title="Immersive Experience" />);
    expect(screen.getByText("Immersive Experience")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailParallaxScroll subtitle="A visual journey" />);
    expect(screen.getByText("A visual journey")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailParallaxScroll description="An immersive storytelling experience" />);
    expect(screen.getByText("An immersive storytelling experience")).toBeInTheDocument();
  });

  it("renders category and year", () => {
    render(<ProjectDetailParallaxScroll category="Interactive" year="2024" />);
    expect(screen.getByText("Interactive")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders parallax sections", () => {
    const sections = [
      { title: "Chapter One", content: "The story begins", image: { src: "/img1.jpg", alt: "Chapter 1" } },
      { title: "Chapter Two", content: "The journey continues", image: { src: "/img2.jpg", alt: "Chapter 2" } },
    ];
    render(<ProjectDetailParallaxScroll sections={sections} />);
    expect(screen.getByText("Chapter One")).toBeInTheDocument();
    expect(screen.getByText("The story begins")).toBeInTheDocument();
    expect(screen.getByText("Chapter Two")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailParallaxScroll className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailParallaxScroll backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
