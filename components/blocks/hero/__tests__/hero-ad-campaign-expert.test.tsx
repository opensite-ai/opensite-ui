import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroAdCampaignExpert } from "../hero-ad-campaign-expert";

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

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/aspect-ratio", () => ({
  AspectRatio: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="aspect-ratio">{children}</div>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroAdCampaignExpert", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroAdCampaignExpert heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroAdCampaignExpert heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroAdCampaignExpert description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "default" as const },
    ];
    render(<HeroAdCampaignExpert actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <HeroAdCampaignExpert heading="Test Heading" className="custom-class" />,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders image via mediaItem", () => {
    render(
      <HeroAdCampaignExpert
        heading="With Image"
        mediaItem={{ image: { src: "/hero.jpg", alt: "Hero" } }}
      />,
    );
    expect(screen.getAllByAltText("Hero").length).toBeGreaterThan(0);
  });

  it("renders video via mediaItem", () => {
    const { container } = render(
      <HeroAdCampaignExpert
        heading="With Video"
        mediaItem={{ video: { src: "/hero.mp4" } }}
      />,
    );
    const videos = container.querySelectorAll("video");
    expect(videos.length).toBeGreaterThan(0);
    expect(videos[0]).toHaveAttribute("src", "/hero.mp4");
  });

  it("does not render media section when no mediaItem is provided", () => {
    const { container } = render(<HeroAdCampaignExpert heading="No Media" />);
    expect(container.querySelector("video")).not.toBeInTheDocument();
    expect(
      container.querySelector("[data-testid='mock-img']"),
    ).not.toBeInTheDocument();
  });

  it("applies directionConfig for mediaLeft desktop", () => {
    const { container } = render(
      <HeroAdCampaignExpert
        heading="Direction Test"
        mediaItem={{ image: { src: "/hero.jpg", alt: "Hero" } }}
        directionConfig={{ desktop: "mediaLeft", mobile: "mediaBottom" }}
      />,
    );
    // The flex container has the direction classes
    const flexContainer = container.querySelector(
      "[class*='items-center'][class*='lg\\:flex-row-reverse']",
    );
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveClass("flex-col");
  });

  it("applies default directionConfig (mediaRight, mediaTop)", () => {
    const { container } = render(
      <HeroAdCampaignExpert
        heading="Default Direction"
        mediaItem={{ image: { src: "/hero.jpg", alt: "Hero" } }}
      />,
    );
    const flexContainer = container.querySelector(
      "[class*='items-center'][class*='lg\\:flex-row']",
    );
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveClass("flex-col-reverse");
  });
});
