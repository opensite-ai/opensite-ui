import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutVisionGallery } from "../about-vision-gallery";

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
}));

describe("AboutVisionGallery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(
      <AboutVisionGallery
        title="Test Title"
        subtitle="Test Subtitle"
        visionTitle="Test Vision Title"
        creatorsTitle="Test Creators Title"
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Test Vision Title")).toBeInTheDocument();
    expect(screen.getByText("Test Creators Title")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AboutVisionGallery title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<AboutVisionGallery subtitle="Custom subtitle text" />);
    expect(screen.getByText("Custom subtitle text")).toBeInTheDocument();
  });

  it("renders custom vision title and content", () => {
    render(<AboutVisionGallery visionTitle="Custom Vision" visionContent="Custom vision content" />);
    expect(screen.getByText("Custom Vision")).toBeInTheDocument();
    expect(screen.getByText("Custom vision content")).toBeInTheDocument();
  });

  it("renders custom creators title", () => {
    render(<AboutVisionGallery creatorsTitle="Custom Creators" />);
    expect(screen.getByText("Custom Creators")).toBeInTheDocument();
  });

  it("renders CTA title", () => {
    render(<AboutVisionGallery ctaTitle="Join Our Team" />);
    expect(screen.getByText("Join Our Team")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutVisionGallery className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
