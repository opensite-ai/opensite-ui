import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsAnimatedSplit } from "../testimonials-animated-split";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => (
      <div data-testid="mock-motion-div" className={className}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <button data-testid="mock-pressable" className={className}>
      {children}
    </button>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("TestimonialsAnimatedSplit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with explicit testimonials", () => {
    const testimonials = [
      {
        quote: "Test quote",
        author: "Test Author",
        role: "Test Role",
        company: "Test Company",
      },
    ];
    render(<TestimonialsAnimatedSplit testimonials={testimonials} />);
    expect(screen.getByText("Test quote")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  it("renders custom testimonials", () => {
    const testimonials = [
      {
        quote: "Custom quote",
        author: "John Doe",
        role: "CEO",
        company: "TestCo",
      },
    ];
    render(<TestimonialsAnimatedSplit testimonials={testimonials} />);
    expect(screen.getByText("Custom quote")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders author role and company", () => {
    const testimonials = [
      {
        quote: "Test quote",
        author: "Test Author",
        role: "Product Manager",
        company: "Test Company",
      },
    ];
    render(<TestimonialsAnimatedSplit testimonials={testimonials} />);
    expect(screen.getByText(/Product Manager/)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const testimonials = [
      {
        quote: "Test quote",
        author: "Test Author",
        role: "Test Role",
        company: "Test Company",
      },
    ];
    const { container } = render(
      <TestimonialsAnimatedSplit
        testimonials={testimonials}
        className="custom-class"
      />,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders linkConfig as a Pressable link when provided", () => {
    const testimonials = [
      {
        quote: "Great service!",
        author: "Alice",
        role: "Manager",
        company: "ReviewCo",
        linkConfig: {
          label: "Read Review",
          href: "https://google.com/review/123",
          className: "custom-link-class",
        },
      },
    ];
    render(<TestimonialsAnimatedSplit testimonials={testimonials} />);
    const pressable = screen.getByTestId("mock-pressable");
    expect(pressable).toBeInTheDocument();
    expect(pressable).toHaveTextContent("Read Review");
  });

  it("does not render linkConfig when not provided", () => {
    const testimonials = [
      { quote: "No link here", author: "Bob", role: "Dev", company: "NoCo" },
    ];
    render(<TestimonialsAnimatedSplit testimonials={testimonials} />);
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
  });
});
