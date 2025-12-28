import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudiesTestimonialStats } from "../case-studies-testimonial-stats";

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

describe("CaseStudiesTestimonialStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CaseStudiesTestimonialStats />);
    expect(screen.getByText("4500+ Satisfied Customers")).toBeInTheDocument();
    expect(screen.getByText("Real results from real users")).toBeInTheDocument();
  });

  it("renders custom heading and subheading", () => {
    render(
      <CaseStudiesTestimonialStats
        heading="Custom Heading"
        subheading="Custom subheading"
      />
    );
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom subheading")).toBeInTheDocument();
  });

  it("renders default testimonials", () => {
    render(<CaseStudiesTestimonialStats />);
    expect(screen.getByText("Michael Rivera")).toBeInTheDocument();
    expect(screen.getByText("Product Director")).toBeInTheDocument();
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("Operations Lead")).toBeInTheDocument();
  });

  it("renders testimonial quotes", () => {
    render(<CaseStudiesTestimonialStats />);
    expect(screen.getByText(/This productivity tool transformed/)).toBeInTheDocument();
    expect(screen.getByText(/The interface is intuitive/)).toBeInTheDocument();
  });

  it("renders stats for testimonials", () => {
    render(<CaseStudiesTestimonialStats />);
    expect(screen.getByText("98%")).toBeInTheDocument();
    expect(screen.getByText("Customer Satisfaction")).toBeInTheDocument();
    expect(screen.getByText("3.8x")).toBeInTheDocument();
    expect(screen.getByText("ROI Improvement")).toBeInTheDocument();
  });

  it("renders custom testimonials", () => {
    const customTestimonials = [
      {
        image: "/custom.jpg",
        quote: "Custom testimonial quote",
        authorName: "Custom Author",
        authorRole: "Custom Role",
        companyLogo: "/custom-logo.svg",
        stats: [
          { value: "200%", label: "Custom Stat", description: "Custom description" },
        ],
      },
    ];

    render(<CaseStudiesTestimonialStats testimonials={customTestimonials} />);
    expect(screen.getByText("Custom testimonial quote")).toBeInTheDocument();
    expect(screen.getByText("Custom Author")).toBeInTheDocument();
    expect(screen.getByText("Custom Role")).toBeInTheDocument();
    expect(screen.getByText("200%")).toBeInTheDocument();
  });

  it("renders stat descriptions", () => {
    render(<CaseStudiesTestimonialStats />);
    expect(screen.getByText("From verified reviews")).toBeInTheDocument();
    expect(screen.getByText("Within first quarter")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CaseStudiesTestimonialStats className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<CaseStudiesTestimonialStats />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for testimonials", () => {
    render(<CaseStudiesTestimonialStats />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("handles empty testimonials array", () => {
    render(<CaseStudiesTestimonialStats testimonials={[]} />);
    expect(screen.getByText("4500+ Satisfied Customers")).toBeInTheDocument();
  });
});

