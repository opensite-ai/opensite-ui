import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExpandableCaseStudyCards } from "../expandable-case-study-cards";

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
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("ExpandableCaseStudyCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ExpandableCaseStudyCards />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders items when provided", () => {
    const items = [
      {
        id: "1",
        title: "E-commerce Redesign",
        href: "/case-1",
        image: "https://example.com/image.jpg",
        logo: "https://example.com/logo.svg",
        company: "TechCorp",
        badges: ["E-commerce", "UX Design"],
      },
    ];
    render(<ExpandableCaseStudyCards items={items} />);
    expect(screen.getByText("E-commerce Redesign")).toBeInTheDocument();
    expect(screen.getByText("E-commerce")).toBeInTheDocument();
    expect(screen.getByText("UX Design")).toBeInTheDocument();
  });

  it("renders company logo", () => {
    const items = [
      {
        id: "1",
        title: "Case Study",
        href: "/case-1",
        image: "https://example.com/image.jpg",
        logo: "https://example.com/logo.svg",
        company: "TestCompany",
      },
    ];
    render(<ExpandableCaseStudyCards items={items} />);
    expect(screen.getAllByAltText("TestCompany").length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<ExpandableCaseStudyCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
