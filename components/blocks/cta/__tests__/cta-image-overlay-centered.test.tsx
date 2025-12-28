import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaImageOverlayCentered } from "../cta-image-overlay-centered";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div" {...props}>
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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(30).fill("https://placeholder.com/image.jpg"),
}));

describe("CtaImageOverlayCentered", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders default heading", () => {
    render(<CtaImageOverlayCentered />);
    expect(
      screen.getByText("Ready to unlock OpenSite AI coverage insights?")
    ).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<CtaImageOverlayCentered />);
    expect(screen.getByText("Get a Free Quote")).toBeInTheDocument();
    expect(screen.getByText("Talk to an Advisor")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CtaImageOverlayCentered className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });
});
