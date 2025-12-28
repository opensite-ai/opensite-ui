import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudyStatsMetrics } from "../case-study-stats-metrics";

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

describe("CaseStudyStatsMetrics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CaseStudyStatsMetrics />);
    expect(screen.getByText("Boosting System Reliability by 125% with AI Monitoring")).toBeInTheDocument();
  });

  it("renders custom title and subtitle", () => {
    render(
      <CaseStudyStatsMetrics
        title="Custom Title"
        subtitle="Custom Subtitle"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Subtitle")).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    render(<CaseStudyStatsMetrics />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Components")).toBeInTheDocument();
  });

  it("renders custom breadcrumbs", () => {
    const customBreadcrumbs = [
      { label: "Custom Home", href: "/" },
      { label: "Custom Page" },
    ];

    render(<CaseStudyStatsMetrics breadcrumbs={customBreadcrumbs} />);
    expect(screen.getByText("Custom Home")).toBeInTheDocument();
    expect(screen.getByText("Custom Page")).toBeInTheDocument();
  });

  it("renders default stats", () => {
    render(<CaseStudyStatsMetrics />);
    expect(screen.getByText("19%")).toBeInTheDocument();
    expect(screen.getByText("increase in user engagement rate")).toBeInTheDocument();
    expect(screen.getByText("28%")).toBeInTheDocument();
    expect(screen.getByText("72%")).toBeInTheDocument();
  });

  it("renders custom stats", () => {
    const customStats = [
      { value: "100%", label: "Custom stat label" },
    ];

    render(<CaseStudyStatsMetrics stats={customStats} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("Custom stat label")).toBeInTheDocument();
  });

  it("renders overview section", () => {
    render(<CaseStudyStatsMetrics overview="Custom overview text" />);
    expect(screen.getByText("Custom overview text")).toBeInTheDocument();
  });

  it("renders sector information", () => {
    render(<CaseStudyStatsMetrics sector="Custom Sector" />);
    expect(screen.getByText("Custom Sector")).toBeInTheDocument();
  });

  it("renders CTA button", () => {
    render(<CaseStudyStatsMetrics ctaLabel="Get Started" ctaHref="/start" />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders learn more link", () => {
    render(<CaseStudyStatsMetrics learnMoreLabel="Learn More" />);
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CaseStudyStatsMetrics className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<CaseStudyStatsMetrics />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders hero image", () => {
    render(<CaseStudyStatsMetrics heroImage="/hero.jpg" heroImageAlt="Hero image" />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders company logo", () => {
    render(<CaseStudyStatsMetrics companyLogo="/logo.svg" />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders default content", () => {
    render(<CaseStudyStatsMetrics />);
    expect(screen.getByText("How the Tax System Works")).toBeInTheDocument();
    expect(screen.getByText("The People's Rebellion")).toBeInTheDocument();
  });

  it("renders custom content", () => {
    const customContent = <p>Custom content paragraph</p>;
    render(<CaseStudyStatsMetrics content={customContent} />);
    expect(screen.getByText("Custom content paragraph")).toBeInTheDocument();
  });
});

