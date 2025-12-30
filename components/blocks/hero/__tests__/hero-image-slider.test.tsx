import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroImageSlider } from "../hero-image-slider";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src?: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("motion/react", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div">
        {children}
      </div>
    ),
  },
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(10).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroImageSlider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroImageSlider />);
    expect(
      screen.getByText("A hero slider that keeps your message front and center")
    ).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<HeroImageSlider />);
    expect(screen.getByText("Start a demo")).toBeInTheDocument();
    expect(screen.getByText("View case studies")).toBeInTheDocument();
  });

  it("renders slider image", () => {
    render(<HeroImageSlider />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<HeroImageSlider className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });
});
