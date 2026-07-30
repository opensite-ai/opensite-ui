import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ServicesListVideoShowcase } from "../services-list-video-showcase";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("@page-speed/video", () => ({
  Video: React.forwardRef<
    HTMLVideoElement,
    {
      src?: string;
      className?: string;
    }
  >(({ src, className }, ref) => (
    <video
      ref={ref}
      data-testid="mock-video"
      data-src={src}
      className={className}
    />
  )),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
  videoPlaceholders: Array(10).fill("https://placeholder.com/video.mp4"),
}));

vi.mock("../../../../lib/Pressable", () => ({
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

describe("ServicesListVideoShowcase", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    const { getByText } = render(
      <ServicesListVideoShowcase
        heading="Custom Heading"
        description="Custom Description"
      />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
    expect(getByText("Custom Description")).toBeInTheDocument();
  });

  it("preserves custom icon precedence, fallbacks, sentinels, and wrapper predicates", () => {
    const { container } = render(
      <ServicesListVideoShowcase
        services={[
          {
            title: "String icon",
            icon: "lucide/custom-video",
            iconName: "lucide/ignored-video",
            className: "string-service",
          },
          {
            title: "Custom icon",
            icon: <span data-testid="custom-service-icon">custom</span>,
            iconName: "lucide/ignored-custom",
            className: "custom-service",
          },
          {
            title: "Empty fallback",
            icon: "",
            iconName: "lucide/empty-fallback",
            className: "empty-fallback-service",
          },
          {
            title: "False fallback",
            icon: false,
            iconName: "lucide/false-fallback",
            className: "false-fallback-service",
          },
          {
            title: "Zero fallback",
            icon: 0,
            iconName: "lucide/zero-fallback",
            className: "zero-fallback-service",
          },
          {
            title: "Empty only",
            icon: "",
            className: "empty-only-service",
          },
          {
            title: "False only",
            icon: false,
            className: "false-only-service",
          },
          {
            title: "Zero only",
            icon: 0,
            className: "zero-only-service",
          },
        ]}
      />,
    );

    const stringCard = container.querySelector(".string-service") as HTMLElement;
    expect(
      stringCard.querySelector('[data-name="lucide/custom-video"]'),
    ).toHaveClass("h-5", "w-5", "text-primary");
    expect(
      stringCard.querySelector('[data-name="lucide/ignored-video"]'),
    ).not.toBeInTheDocument();
    expect(
      within(stringCard).queryByText("lucide/custom-video"),
    ).not.toBeInTheDocument();
    expect(
      stringCard.querySelector('[data-name="lucide/play"]'),
    ).toHaveClass("h-5", "w-5");
    expect(
      within(stringCard).getByText("String icon").parentElement?.children,
    ).toHaveLength(2);

    const customCard = container.querySelector(".custom-service") as HTMLElement;
    expect(
      within(customCard).getByTestId("custom-service-icon"),
    ).toBeInTheDocument();
    expect(
      customCard.querySelector('[data-name="lucide/ignored-custom"]'),
    ).not.toBeInTheDocument();

    for (const [selector, iconName, title] of [
      [".empty-fallback-service", "lucide/empty-fallback", "Empty fallback"],
      [".false-fallback-service", "lucide/false-fallback", "False fallback"],
      [".zero-fallback-service", "lucide/zero-fallback", "Zero fallback"],
    ]) {
      const card = container.querySelector(selector) as HTMLElement;
      expect(card.querySelector(`[data-name="${iconName}"]`)).toHaveClass(
        "h-5",
        "w-5",
        "text-primary",
      );
      expect(within(card).getByText(title).parentElement?.children).toHaveLength(
        2,
      );
    }

    for (const [selector, title] of [
      [".empty-only-service", "Empty only"],
      [".false-only-service", "False only"],
      [".zero-only-service", "Zero only"],
    ]) {
      const card = container.querySelector(selector) as HTMLElement;
      expect(within(card).getByText(title).parentElement?.children).toHaveLength(
        1,
      );
    }
  });

  it("preserves service slots, media URLs, video rendering, CTAs, and fixed icons", () => {
    const { container, rerender } = render(
      <ServicesListVideoShowcase
        servicesSlot={false}
        services={[
          {
            title: "Media service",
            posterImage: {
              src: "lucide/poster-looking-url",
              alt: "Service poster",
            },
            videoUrl: "lucide/video-looking-url",
            ctaText: "Watch service",
            ctaUrl: "/watch",
            className: "media-service",
          },
        ]}
      />,
    );

    const mediaCard = container.querySelector(".media-service") as HTMLElement;
    expect(within(mediaCard).getByAltText("Service poster")).toHaveAttribute(
      "src",
      "lucide/poster-looking-url",
    );
    expect(within(mediaCard).getByTestId("mock-video")).toHaveAttribute(
      "data-src",
      "lucide/video-looking-url",
    );
    expect(
      mediaCard.querySelector('[data-name="lucide/poster-looking-url"]'),
    ).not.toBeInTheDocument();
    expect(
      mediaCard.querySelector('[data-name="lucide/video-looking-url"]'),
    ).not.toBeInTheDocument();
    expect(mediaCard.querySelector('[data-name="lucide/play"]')).toHaveClass(
      "h-5",
      "w-5",
    );
    const cta = container.querySelector('a[href="/watch"]') as HTMLElement;
    expect(cta).toHaveAttribute("data-testid", "mock-pressable");
    expect(
      cta.querySelector('[data-name="lucide/arrow-right"]'),
    ).toHaveClass("ml-1", "h-4", "w-4");

    rerender(
      <ServicesListVideoShowcase
        services={[
          {
            title: "Hidden service",
            videoUrl: "/hidden.mp4",
            ctaText: "Hidden CTA",
            ctaUrl: "/hidden",
          },
        ]}
        servicesSlot={<div>Custom services slot</div>}
      />,
    );
    expect(screen.getByText("Custom services slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden service")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-video")).not.toBeInTheDocument();
    expect(container.querySelector('a[href="/hidden"]')).not.toBeInTheDocument();
  });
});
