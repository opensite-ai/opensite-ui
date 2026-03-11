import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroPremiumSplitAvatars } from "../hero-premium-split-avatars";

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

describe("HeroPremiumSplitAvatars", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroPremiumSplitAvatars heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroPremiumSplitAvatars heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroPremiumSplitAvatars description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders action when provided", () => {
    const action = { label: "Get Started", href: "/start", variant: "default" as const };
    render(<HeroPremiumSplitAvatars action={action} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroPremiumSplitAvatars heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders the image through MediaAspectRatio when provided", () => {
    render(
      <HeroPremiumSplitAvatars
        heading="Test Heading"
        image={{ src: "/hero.jpg", alt: "Hero" }}
      />,
    );

    expect(screen.getAllByAltText("Hero").length).toBeGreaterThan(0);
  });

  it("supports responsive direction overrides", () => {
    const { container } = render(
      <HeroPremiumSplitAvatars
        heading="Direction Test"
        image={{ src: "/hero.jpg", alt: "Hero" }}
        directionConfig={{ desktop: "mediaLeft", mobile: "mediaTop" }}
      />,
    );

    const flexContainer = container.querySelector(
      "[class*='md\\:flex-row-reverse']",
    );

    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveClass("flex-col-reverse");
  });
});
