import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudiesStatsCard } from "../case-studies-stats-card";

// Mock dependencies
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className, asButton }: { children: React.ReactNode; href?: string; className?: string; asButton?: boolean }) => (
    asButton ? (
      <button className={className} data-testid="mock-pressable">{children}</button>
    ) : (
      <a href={href} className={className} data-testid="mock-pressable">{children}</a>
    )
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>icon</span>
  ),
}));

describe("CaseStudiesStatsCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CaseStudiesStatsCard />);
    expect(screen.getByText("How We Optimized Our Onboarding Flow to Triple User Activation")).toBeInTheDocument();
    expect(screen.getByText(/Learn how we revamped our product onboarding/)).toBeInTheDocument();
  });

  it("renders custom title and summary", () => {
    render(
      <CaseStudiesStatsCard
        title="Custom Title"
        summary="Custom summary"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom summary")).toBeInTheDocument();
  });

  it("renders default stats", () => {
    render(<CaseStudiesStatsCard />);
    expect(screen.getByText("45%")).toBeInTheDocument();
    expect(screen.getByText("improvement in onboarding completion")).toBeInTheDocument();
    expect(screen.getByText("61%")).toBeInTheDocument();
    expect(screen.getByText("reduction in time-to-value")).toBeInTheDocument();
    expect(screen.getByText("3x")).toBeInTheDocument();
    expect(screen.getByText("increase in user activation")).toBeInTheDocument();
  });

  it("renders default author", () => {
    render(<CaseStudiesStatsCard />);
    expect(screen.getByText("Sarah Williams")).toBeInTheDocument();
    expect(screen.getByText("CTO, Opensite AI")).toBeInTheDocument();
  });

  it("renders custom stats", () => {
    const customStats = [
      { number: "200%", text: "Custom stat text" },
    ];

    render(<CaseStudiesStatsCard stats={customStats} />);
    expect(screen.getByText("200%")).toBeInTheDocument();
    expect(screen.getByText("Custom stat text")).toBeInTheDocument();
  });

  it("renders custom author", () => {
    const customAuthor = {
      name: "Custom Author",
      image: "/custom-avatar.jpg",
      role: "Custom Role",
    };

    render(<CaseStudiesStatsCard author={customAuthor} />);
    expect(screen.getByText("Custom Author")).toBeInTheDocument();
    expect(screen.getByText("Custom Role")).toBeInTheDocument();
  });

  it("renders custom company name as alt text", () => {
    render(<CaseStudiesStatsCard companyName="Custom Company" />);
    const img = screen.getAllByTestId("mock-img")[0];
    expect(img).toHaveAttribute("alt", "Custom Company");
  });

  it("renders read story button", () => {
    render(<CaseStudiesStatsCard />);
    expect(screen.getByText("Read Story")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CaseStudiesStatsCard className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<CaseStudiesStatsCard />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for company logo and author", () => {
    render(<CaseStudiesStatsCard />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders read story button", () => {
    const { container } = render(<CaseStudiesStatsCard />);
    // The Read Story button is wrapped in a Pressable component
    const buttons = container.querySelectorAll("button, a");
    expect(buttons.length).toBeGreaterThan(0);
    expect(screen.getByText("Read Story")).toBeInTheDocument();
  });

  it("handles empty stats array", () => {
    render(<CaseStudiesStatsCard stats={[]} />);
    expect(screen.getByText("How We Optimized Our Onboarding Flow to Triple User Activation")).toBeInTheDocument();
    expect(screen.getByText("Read Story")).toBeInTheDocument();
  });
});

