import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureBentoImageGrid } from "../feature-bento-image-grid";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("FeatureBentoImageGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureBentoImageGrid title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureBentoImageGrid title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureBentoImageGrid description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders items when provided", () => {
    const items = [
      { title: "Item One", iconBadge: "Badge One", size: "large" as const },
      { title: "Item Two", iconBadge: "Badge Two" },
    ];
    render(<FeatureBentoImageGrid items={items} />);
    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();
  });

  it("uses fixed bento heights for image cards", () => {
    const items = [
      { title: "Large Item", imageSrc: "/large.jpg", size: "large" as const },
      { title: "Small Item One", imageSrc: "/small-one.jpg" },
      { title: "Small Item Two", imageSrc: "/small-two.jpg" },
    ];

    render(<FeatureBentoImageGrid items={items} />);

    const [largeImage, firstSmallImage, secondSmallImage] =
      screen.getAllByTestId("mock-img");

    expect(largeImage).toHaveClass("h-full", "w-full");
    expect(largeImage).not.toHaveClass("max-h-[580px]");
    expect(largeImage.parentElement!).toHaveClass(
      "h-[22rem]",
      "xl:h-[580px]",
      "xl:col-span-2",
    );
    expect(firstSmallImage.parentElement!).toHaveClass("h-56", "xl:h-44");
    expect(secondSmallImage.parentElement!).toHaveClass("h-72", "xl:h-96");
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureBentoImageGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
