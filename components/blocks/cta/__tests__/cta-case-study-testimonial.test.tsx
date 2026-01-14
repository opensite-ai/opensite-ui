import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaCaseStudyTestimonial } from "../cta-case-study-testimonial";

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
  avatarPlaceholders: Array(20).fill("https://placeholder.com/avatar.jpg"),
}));

describe("CtaCaseStudyTestimonial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CtaCaseStudyTestimonial />);
    expect(screen.getByText("Case Study")).toBeInTheDocument();
    expect(screen.getByText("How TechNova transformed their workflow")).toBeInTheDocument();
    expect(screen.getByText("See how TechNova achieved 200% productivity increase and 30% faster project delivery with our platform.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaCaseStudyTestimonial heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaCaseStudyTestimonial description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders testimonial quote", () => {
    render(<CtaCaseStudyTestimonial testimonialQuote="This is an amazing product!" />);
    expect(screen.getByText(/This is an amazing product!/)).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Read Full Case Study", href: "/case-studies", variant: "default" as const },
      { label: "Schedule a Demo", href: "/demo", variant: "outline" as const },
    ];
    render(<CtaCaseStudyTestimonial actions={actions} />);
    expect(screen.getByText("Read Full Case Study")).toBeInTheDocument();
    expect(screen.getByText("Schedule a Demo")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaCaseStudyTestimonial className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
