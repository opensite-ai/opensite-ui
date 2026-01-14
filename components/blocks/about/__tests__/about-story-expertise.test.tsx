import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutStoryExpertise } from "../about-story-expertise";

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

describe("AboutStoryExpertise", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(
      <AboutStoryExpertise
        heading="Test Heading"
        eyebrow="Test Eyebrow"
        expertiseHeading="Test Expertise Heading"
      />
    );
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Eyebrow")).toBeInTheDocument();
    expect(screen.getByText("Test Expertise Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<AboutStoryExpertise heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom eyebrow", () => {
    render(<AboutStoryExpertise eyebrow="Custom Eyebrow" />);
    expect(screen.getByText("Custom Eyebrow")).toBeInTheDocument();
  });

  it("renders custom expertise heading and description", () => {
    render(<AboutStoryExpertise expertiseHeading="Custom Expertise" expertiseDescription="Custom expertise description" />);
    expect(screen.getByText("Custom Expertise")).toBeInTheDocument();
    expect(screen.getByText("Custom expertise description")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Learn More", href: "/about", variant: "default" as const },
    ];
    render(<AboutStoryExpertise actions={actions} />);
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutStoryExpertise className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
