import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudiesFeaturedBorder } from "../case-studies-featured-border";

// Mock dependencies
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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>icon</span>
  ),
}));

describe("CaseStudiesFeaturedBorder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CaseStudiesFeaturedBorder />);
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("Workflow Automation for the Digital Age.")).toBeInTheDocument();
  });

  it("renders default featured case study", () => {
    render(<CaseStudiesFeaturedBorder />);
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("ARTIFICIAL INTELLIGENCE / ENTERPRISE SOLUTIONS")).toBeInTheDocument();
    expect(screen.getByText("How to automate your workflow with AI.")).toBeInTheDocument();
  });

  it("renders default secondary case studies", () => {
    render(<CaseStudiesFeaturedBorder />);
    expect(screen.getByText("Super")).toBeInTheDocument();
    expect(screen.getByText("Advent")).toBeInTheDocument();
    expect(screen.getByText("Enhance data migration with AI.")).toBeInTheDocument();
    expect(screen.getByText("Strategic AI for a future-proof business.")).toBeInTheDocument();
  });

  it("renders custom featured case study", () => {
    const customFeatured = {
      logo: "/custom-logo.svg",
      company: "Custom Company",
      tags: "CUSTOM / TAGS",
      title: "Custom Featured Title",
      subtitle: "Custom subtitle",
      image: "/custom.jpg",
      href: "/custom",
    };

    render(<CaseStudiesFeaturedBorder featuredCaseStudy={customFeatured} />);
    expect(screen.getByText("Custom Company")).toBeInTheDocument();
    expect(screen.getByText("Custom Featured Title")).toBeInTheDocument();
    expect(screen.getByText("CUSTOM / TAGS")).toBeInTheDocument();
  });

  it("renders custom secondary case studies", () => {
    const customStudies = [
      {
        logo: "/custom-logo.svg",
        company: "Custom Secondary",
        tags: "CUSTOM / SECONDARY",
        title: "Custom Secondary Title",
        subtitle: "Custom secondary subtitle",
        href: "/custom",
      },
    ];

    render(<CaseStudiesFeaturedBorder caseStudies={customStudies} />);
    expect(screen.getByText("Custom Secondary")).toBeInTheDocument();
    expect(screen.getByText("Custom Secondary Title")).toBeInTheDocument();
  });

  it("renders read case study links", () => {
    render(<CaseStudiesFeaturedBorder />);
    const links = screen.getAllByText("Read case study");
    expect(links.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<CaseStudiesFeaturedBorder className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<CaseStudiesFeaturedBorder />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for featured case study", () => {
    render(<CaseStudiesFeaturedBorder />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders company logos", () => {
    render(<CaseStudiesFeaturedBorder />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("handles empty case studies array", () => {
    render(<CaseStudiesFeaturedBorder caseStudies={[]} />);
    expect(screen.getByText("Acme")).toBeInTheDocument();
  });
});

