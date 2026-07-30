import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutMissionDualImage } from "../about-mission-dual-image";

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
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="mock-img"
    />
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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("AboutMissionDualImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(
      <AboutMissionDualImage
        missionTitle="Test Mission Title"
        missionContent="Test Mission Content"
        visionTitle="Test Vision Title"
        visionContent="Test Vision Content"
      />
    );

    expect(screen.getByText("Test Mission Title")).toBeInTheDocument();
    expect(screen.getByText("Test Mission Content")).toBeInTheDocument();
    expect(screen.getByText("Test Vision Title")).toBeInTheDocument();
    expect(screen.getByText("Test Vision Content")).toBeInTheDocument();
  });

  it("renders custom mission title and content", () => {
    render(
      <AboutMissionDualImage
        missionTitle="Custom Mission"
        missionContent="Custom mission content"
      />,
    );

    expect(screen.getByText("Custom Mission")).toBeInTheDocument();
    expect(screen.getByText("Custom mission content")).toBeInTheDocument();
  });

  it("renders custom vision title and content", () => {
    render(
      <AboutMissionDualImage
        visionTitle="Custom Vision"
        visionContent="Custom vision content"
      />,
    );

    expect(screen.getByText("Custom Vision")).toBeInTheDocument();
    expect(screen.getByText("Custom vision content")).toBeInTheDocument();
  });

  it("renders an image through the responsive media panel", () => {
    const { container } = render(
      <AboutMissionDualImage
        mediaItem={{
          image: {
            src: "/mission.jpg",
            alt: "Mission workshop",
          },
        }}
      />,
    );

    expect(screen.getAllByAltText("Mission workshop")).toHaveLength(2);
    const mediaPanel = container.querySelector(
      "[data-slot='media-aspect-ratio']",
    );

    expect(mediaPanel).toBeInTheDocument();
    expect(mediaPanel?.children[1]).toHaveStyle({ aspectRatio: "1" });
  });

  it("renders video media and uses its image as the poster fallback", () => {
    const { container } = render(
      <AboutMissionDualImage
        mediaItem={{
          image: {
            src: "/mission-poster.jpg",
            alt: "Mission video poster",
          },
          video: {
            src: "/mission.mp4",
            autoPlay: true,
            muted: true,
          },
        }}
      />,
    );

    const videos = container.querySelectorAll("video");

    expect(videos).toHaveLength(2);
    expect(videos[0]).toHaveAttribute("src", "/mission.mp4");
    expect(videos[0]).toHaveAttribute("poster", "/mission-poster.jpg");
    expect(
      screen.queryByAltText("Mission video poster"),
    ).not.toBeInTheDocument();
  });

  it("prefers mediaItem over deprecated image props", () => {
    render(
      <AboutMissionDualImage
        mediaItem={{
          image: {
            src: "/current.jpg",
            alt: "Current media",
          },
        }}
        primaryImage={{ src: "/legacy-primary.jpg", alt: "Legacy primary" }}
        secondaryImage={{
          src: "/legacy-secondary.jpg",
          alt: "Legacy secondary",
        }}
      />,
    );

    expect(screen.getAllByAltText("Current media")).toHaveLength(2);
    expect(screen.queryByAltText("Legacy primary")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Legacy secondary")).not.toBeInTheDocument();
  });

  it("adapts only the deprecated primary image when both legacy props exist", () => {
    render(
      <AboutMissionDualImage
        primaryImage={{ src: "/legacy-primary.jpg", alt: "Legacy primary" }}
        secondaryImage={{
          src: "/legacy-secondary.jpg",
          alt: "Legacy secondary",
        }}
        primaryImageClassName="legacy-primary-class"
      />,
    );

    const primaryImages = screen.getAllByAltText("Legacy primary");

    expect(primaryImages).toHaveLength(2);
    expect(primaryImages[0]).toHaveClass("legacy-primary-class");
    expect(screen.queryByAltText("Legacy secondary")).not.toBeInTheDocument();
  });

  it("uses the deprecated secondary image when it is the only legacy image", () => {
    render(
      <AboutMissionDualImage
        secondaryImage={{
          src: "/legacy-secondary.jpg",
          alt: "Legacy secondary",
        }}
        secondaryImageClassName="legacy-secondary-class"
      />,
    );

    const secondaryImages = screen.getAllByAltText("Legacy secondary");

    expect(secondaryImages).toHaveLength(2);
    expect(secondaryImages[0]).toHaveClass("legacy-secondary-class");
  });

  it("does not render an empty media panel", () => {
    const { container } = render(<AboutMissionDualImage />);

    expect(
      container.querySelector("[data-slot='media-aspect-ratio']"),
    ).not.toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Learn More", href: "/about", variant: "default" as const },
    ];
    render(<AboutMissionDualImage actions={actions} />);
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <AboutMissionDualImage className="custom-class" />,
    );

    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
