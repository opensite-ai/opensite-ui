import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudyTocSocialSidebar } from "../case-study-toc-social-sidebar";

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor() {}
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

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

describe("CaseStudyTocSocialSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CaseStudyTocSocialSidebar />);
    expect(screen.getByText("How this tool helps teams achieve efficient workflows")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<CaseStudyTocSocialSidebar title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    render(<CaseStudyTocSocialSidebar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Components")).toBeInTheDocument();
  });

  it("renders custom breadcrumbs", () => {
    const customBreadcrumbs = [
      { label: "Custom Home", href: "/" },
      { label: "Custom Page" },
    ];

    render(<CaseStudyTocSocialSidebar breadcrumbs={customBreadcrumbs} />);
    expect(screen.getByText("Custom Home")).toBeInTheDocument();
    expect(screen.getByText("Custom Page")).toBeInTheDocument();
  });

  it("renders author information", () => {
    render(
      <CaseStudyTocSocialSidebar
        author={{ name: "John Doe", role: "Senior Developer" }}
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
  });

  it("renders company overview section", () => {
    render(
      <CaseStudyTocSocialSidebar
        details={[{ label: "Overview", value: "Custom overview text" }]}
      />
    );
    expect(screen.getByText("Custom overview text")).toBeInTheDocument();
  });

  it("renders company details", () => {
    render(
      <CaseStudyTocSocialSidebar
        details={[
          { label: "Sector", value: "Technology" },
          { label: "Team size", value: "50-100" },
          { label: "Location", value: "San Francisco" },
          { label: "Established", value: "2020" },
          { label: "Funding", value: "Series A" },
        ]}
      />
    );
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText("50-100")).toBeInTheDocument();
    expect(screen.getByText("San Francisco")).toBeInTheDocument();
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("Series A")).toBeInTheDocument();
  });

  it("renders problem and approach sections", () => {
    render(
      <CaseStudyTocSocialSidebar
        problem="Custom problem description"
        approach="Custom approach description"
      />
    );
    expect(screen.getByText("Custom problem description")).toBeInTheDocument();
    expect(screen.getByText("Custom approach description")).toBeInTheDocument();
  });

  it("renders outcomes list", () => {
    render(<CaseStudyTocSocialSidebar />);
    expect(screen.getByText(/A streamlined system/)).toBeInTheDocument();
    expect(screen.getByText(/A customizable CRM/)).toBeInTheDocument();
  });

  it("renders custom outcomes", () => {
    const customOutcomes = [
      { text: "Custom outcome 1" },
      { text: "Custom outcome 2" },
    ];

    render(<CaseStudyTocSocialSidebar outcomes={customOutcomes} />);
    expect(screen.getByText("Custom outcome 1")).toBeInTheDocument();
    expect(screen.getByText("Custom outcome 2")).toBeInTheDocument();
  });

  it("renders table of contents", () => {
    render(<CaseStudyTocSocialSidebar />);
    expect(screen.getByText("On this page")).toBeInTheDocument();
    expect(screen.getAllByText("The King's Plan").length).toBeGreaterThan(0);
  });

  it("renders social links", () => {
    render(<CaseStudyTocSocialSidebar />);
    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<CaseStudyTocSocialSidebar className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<CaseStudyTocSocialSidebar />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders hero image", () => {
    render(<CaseStudyTocSocialSidebar heroImageSrc="/hero.jpg" heroImageAlt="Hero image" />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });
});

