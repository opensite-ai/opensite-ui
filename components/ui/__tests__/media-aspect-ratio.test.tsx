import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MediaAspectRatio } from "../media-aspect-ratio";

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

vi.mock("../aspect-ratio", () => ({
  AspectRatio: ({
    children,
    className,
    ratio,
  }: {
    children: React.ReactNode;
    className?: string;
    ratio: number;
  }) => (
    <div data-testid="mock-aspect-ratio" data-ratio={ratio} className={className}>
      {children}
    </div>
  ),
}));

describe("MediaAspectRatio", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when no renderable media is provided", () => {
    const { container } = render(<MediaAspectRatio mediaItem={{}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders responsive image frames and preserves class override priority", () => {
    const { container } = render(
      <MediaAspectRatio
        breakpoint="md"
        frameClassName="rounded-xl shadow-xl"
        mobileFrameClassName="ring-1"
        mediaClassName="object-center"
        mediaItem={{
          image: {
            src: "/hero.jpg",
            alt: "Hero",
            className: "object-contain",
          },
          containerClassName: "border",
        }}
      />,
    );

    const root = container.querySelector("[data-slot='media-aspect-ratio']");
    const desktopFrame = container.querySelector(
      "[data-slot='media-aspect-ratio-frame']",
    );
    const images = screen.getAllByAltText("Hero");

    expect(root?.children[0]).toHaveClass("md:hidden");
    expect(root?.children[1]).toHaveClass("hidden", "md:block");
    expect(screen.getByTestId("mock-aspect-ratio")).toHaveClass(
      "rounded-xl",
      "shadow-xl",
      "ring-1",
      "border",
    );
    expect(desktopFrame).toHaveClass("size-full", "rounded-xl", "shadow-xl", "border");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveClass("object-contain");
    expect(images[0]).not.toHaveClass("object-cover");
    expect(images[0]).toHaveClass("object-center");
  });

  it("uses the image as a video poster fallback when video poster is omitted", () => {
    const { container } = render(
      <MediaAspectRatio
        mediaItem={{
          image: { src: "/poster.jpg", alt: "Poster" },
          video: { src: "/hero.mp4", muted: true },
        }}
      />,
    );

    const videos = container.querySelectorAll("video");

    expect(videos).toHaveLength(2);
    expect(videos[0]).toHaveAttribute("poster", "/poster.jpg");
    expect(videos[1]).toHaveAttribute("poster", "/poster.jpg");
  });
});
