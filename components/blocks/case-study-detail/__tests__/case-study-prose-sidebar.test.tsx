import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudyProseSidebar } from "../case-study-prose-sidebar";

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

describe("CaseStudyProseSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CaseStudyProseSidebar />);
    expect(screen.getByText("How Opensite AI uses semantic components to build their design system")).toBeInTheDocument();
  });

  it("renders custom content with title", () => {
    const customContent = <h1>Custom Case Study Title</h1>;
    render(<CaseStudyProseSidebar content={customContent} />);
    expect(screen.getByText("Custom Case Study Title")).toBeInTheDocument();
  });

  it("renders custom content", () => {
    const customContent = <p>Custom content paragraph</p>;
    render(<CaseStudyProseSidebar content={customContent} />);
    expect(screen.getByText("Custom content paragraph")).toBeInTheDocument();
  });

  it("renders company information sidebar", () => {
    render(<CaseStudyProseSidebar />);
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Industry")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Company size")).toBeInTheDocument();
  });

  it("renders custom company information", () => {
    render(
      <CaseStudyProseSidebar
        companyDescription="Custom company description"
        industry="Custom Industry"
        location="Custom Location"
        companySize="Custom Size"
      />
    );
    expect(screen.getByText("Custom company description")).toBeInTheDocument();
    expect(screen.getByText("Custom Industry")).toBeInTheDocument();
    expect(screen.getByText("Custom Location")).toBeInTheDocument();
    expect(screen.getByText("Custom Size")).toBeInTheDocument();
  });

  it("renders website link", () => {
    render(<CaseStudyProseSidebar websiteUrl="https://example.com" websiteLabel="Visit Website" />);
    expect(screen.getByText("Visit Website")).toBeInTheDocument();
  });

  it("renders topics section", () => {
    render(<CaseStudyProseSidebar topics="Design Systems, Components, UI/UX" />);
    expect(screen.getByText("Topics")).toBeInTheDocument();
    expect(screen.getByText("Design Systems, Components, UI/UX")).toBeInTheDocument();
  });

  it("renders default content sections", () => {
    render(<CaseStudyProseSidebar />);
    expect(screen.getByText("The King's Plan")).toBeInTheDocument();
    expect(screen.getByText("The Joke Tax")).toBeInTheDocument();
    expect(screen.getByText("Jokester's Revolt")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CaseStudyProseSidebar className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<CaseStudyProseSidebar />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders hero image", () => {
    render(<CaseStudyProseSidebar heroImage="/hero.jpg" heroImageAlt="Hero image" />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders company logo", () => {
    render(<CaseStudyProseSidebar companyLogo="/logo.svg" />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders prose content with proper styling", () => {
    const { container } = render(<CaseStudyProseSidebar />);
    const proseContainer = container.querySelector(".prose");
    expect(proseContainer).toBeInTheDocument();
  });
});

