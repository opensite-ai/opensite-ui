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

  it("handles empty testimonials array", () => {
    render(<CaseStudiesTestimonialStats testimonials={[]} />);
    expect(screen.getByText("4500+ Satisfied Customers")).toBeInTheDocument();
  });
});

