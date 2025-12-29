import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TestimonialsScrollingColumns } from "../testimonials-scrolling-columns";

vi.mock("../../../ui/avatar", () => ({
  Avatar: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-avatar" className={className}>{children}</div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="mock-avatar-image" />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-avatar-fallback">{children}</span>
  ),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    avatar1: "https://placeholder.com/avatar1.jpg",
    avatar2: "https://placeholder.com/avatar2.jpg",
    avatar3: "https://placeholder.com/avatar3.jpg",
    avatar4: "https://placeholder.com/avatar4.jpg",
    avatar5: "https://placeholder.com/avatar5.jpg",
    avatar6: "https://placeholder.com/avatar6.jpg",
    avatar7: "https://placeholder.com/avatar7.jpg",
    avatar8: "https://placeholder.com/avatar8.jpg",
    avatar9: "https://placeholder.com/avatar9.jpg",
  },
}));

describe("TestimonialsScrollingColumns", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<TestimonialsScrollingColumns />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<TestimonialsScrollingColumns className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<TestimonialsScrollingColumns />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    const { container } = render(<TestimonialsScrollingColumns heading="Custom Heading" />);
    expect(container.textContent).toContain("Custom Heading");
  });
});
