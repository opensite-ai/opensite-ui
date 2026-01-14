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

  const mockFeaturedCaseStudy = {
    logo: "https://example.com/logo.png",
    company: "Test Company",
    tags: "AI / ENTERPRISE",
    title: "Featured Case Study",
    subtitle: "How we helped Test Company",
    image: "https://example.com/featured.jpg",
    href: "/case-studies/test",
    ctaLabel: "Read More",
  };

  const mockCaseStudies = [
    {
      logo: "https://example.com/logo1.png",
      company: "Company 1",
      tags: "TECH / SAAS",
      title: "Case Study 1",
      subtitle: "Success story 1",
      href: "/case-studies/1",
      ctaLabel: "Learn More",
    },
    {
      logo: "https://example.com/logo2.png",
      company: "Company 2",
      tags: "FINANCE / FINTECH",
      title: "Case Study 2",
      subtitle: "Success story 2",
      href: "/case-studies/2",
      ctaLabel: "View Details",
    },
  ];

  it("renders with minimal props", () => {
    const { container } = render(<CaseStudiesFeaturedBorder featuredCaseStudy={mockFeaturedCaseStudy} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders featured case study", () => {
    render(<CaseStudiesFeaturedBorder featuredCaseStudy={mockFeaturedCaseStudy} />);
    expect(screen.getByText("Featured Case Study")).toBeInTheDocument();
    expect(screen.getByText("Test Company")).toBeInTheDocument();
  });

  it("renders case studies list", () => {
    render(<CaseStudiesFeaturedBorder caseStudies={mockCaseStudies} />);
    expect(screen.getByText("Case Study 1")).toBeInTheDocument();
    expect(screen.getByText("Case Study 2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CaseStudiesFeaturedBorder className="custom-class" featuredCaseStudy={mockFeaturedCaseStudy} />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders both featured and regular case studies", () => {
    render(
      <CaseStudiesFeaturedBorder
        featuredCaseStudy={mockFeaturedCaseStudy}
        caseStudies={mockCaseStudies}
      />
    );
    expect(screen.getByText("Featured Case Study")).toBeInTheDocument();
    expect(screen.getByText("Case Study 1")).toBeInTheDocument();
  });
});

