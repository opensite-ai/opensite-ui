import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ImageSlider } from "../image-slider";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
    loading,
  }: {
    src?: string;
    alt: string;
    className?: string;
    loading?: "eager" | "lazy";
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      data-testid="mock-img"
    />
  ),
}));

vi.mock("motion/react", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  motion: {
    div: ({
      children,
      className,
    }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div">
        {children}
      </div>
    ),
  },
}));

const images = [
  { src: "/first.jpg", alt: "First" },
  { src: "/second.jpg", alt: "Second" },
];

describe("ImageSlider", () => {
  it("keeps fade slides mounted and cross-fades opacity between them", () => {
    render(
      <ImageSlider images={images} transition="fade" autoplay={false} />,
    );

    const renderedImages = screen.getAllByTestId("mock-img");
    const firstSlide = renderedImages[0].parentElement;
    const secondSlide = renderedImages[1].parentElement;

    expect(renderedImages).toHaveLength(2);
    expect(firstSlide).toHaveClass("opacity-100");
    expect(firstSlide).toHaveAttribute("aria-hidden", "false");
    expect(secondSlide).toHaveClass("opacity-0");
    expect(secondSlide).toHaveAttribute("aria-hidden", "true");

    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(firstSlide).toHaveClass("opacity-0");
    expect(firstSlide).toHaveAttribute("aria-hidden", "true");
    expect(secondSlide).toHaveClass("opacity-100");
    expect(secondSlide).toHaveAttribute("aria-hidden", "false");
  });
});
