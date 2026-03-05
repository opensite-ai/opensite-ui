import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsParallaxNumber } from "../testimonials-parallax-number";

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

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    className,
    href,
  }: {
    children: React.ReactNode;
    className?: string;
    href?: string;
  }) => (
    <a data-testid="mock-pressable" className={className} href={href}>
      {children}
    </a>
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
    span: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => (
      <span data-testid="mock-motion-span" className={className}>
        {children}
      </span>
    ),
    blockquote: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => (
      <blockquote data-testid="mock-motion-blockquote" className={className}>
        {children}
      </blockquote>
    ),
    button: ({
      children,
      className,
      onClick,
    }: {
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
    }) => (
      <button
        data-testid="mock-motion-button"
        className={className}
        onClick={onClick}
      >
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useMotionValue: () => ({ set: vi.fn() }),
  useSpring: () => ({ set: vi.fn() }),
  useTransform: () => 0,
}));

describe("TestimonialsParallaxNumber", () => {
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
    render(<TestimonialsParallaxNumber testimonials={testimonials} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
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
    render(<TestimonialsParallaxNumber testimonials={testimonials} />);
    expect(screen.getByText("Custom")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders author role", () => {
    const testimonials = [
      {
        quote: "Test quote",
        author: "Test Author",
        role: "Design Director",
        company: "Test Company",
      },
    ];
    render(<TestimonialsParallaxNumber testimonials={testimonials} />);
    expect(screen.getByText("Design Director")).toBeInTheDocument();
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
      <TestimonialsParallaxNumber
        testimonials={testimonials}
        className="custom-class"
      />,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders linkConfig as a Pressable link when provided", () => {
    const testimonials = [
      {
        quote: "Great service",
        author: "Alice",
        role: "Manager",
        company: "ReviewCo",
        linkConfig: {
          label: "Read Review",
          href: "https://google.com/review/123",
        },
      },
    ];
    render(<TestimonialsParallaxNumber testimonials={testimonials} />);
    const pressable = screen.getByTestId("mock-pressable");
    expect(pressable).toBeInTheDocument();
    expect(pressable).toHaveTextContent("Read Review");
  });

  it("does not render linkConfig when not provided", () => {
    const testimonials = [
      { quote: "No link here", author: "Bob", role: "Dev", company: "NoCo" },
    ];
    render(<TestimonialsParallaxNumber testimonials={testimonials} />);
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
  });

  it("renders backgroundIcon via DynamicIcon when provided", () => {
    const testimonials = [
      {
        quote: "Icon test",
        author: "Tester",
        role: "QA",
        company: "TestCo",
        backgroundIcon: "lucide/star",
      },
    ];
    render(<TestimonialsParallaxNumber testimonials={testimonials} />);
    const icon = screen.getByTestId("mock-icon");
    expect(icon).toHaveAttribute("data-name", "lucide/star");
  });

  it("renders backgroundLabel when backgroundIcon is not provided", () => {
    const testimonials = [
      {
        quote: "Label test",
        author: "Tester",
        role: "QA",
        company: "TestCo",
        backgroundLabel: "01",
      },
    ];
    render(<TestimonialsParallaxNumber testimonials={testimonials} />);
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("does not render background icon or label when neither is provided", () => {
    const testimonials = [
      { quote: "Plain test", author: "Tester", role: "QA", company: "TestCo" },
    ];
    render(<TestimonialsParallaxNumber testimonials={testimonials} />);
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });
});
