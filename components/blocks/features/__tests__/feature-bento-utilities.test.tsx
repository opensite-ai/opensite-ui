import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureBentoUtilities } from "../feature-bento-utilities";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
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
      >
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("FeatureBentoUtilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureBentoUtilities label="Test Label" title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom label", () => {
    render(<FeatureBentoUtilities label="Custom Label" />);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureBentoUtilities title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureBentoUtilities description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders left column cards when provided", () => {
    const leftColumnCards = [
      { title: "Card One", description: "Description one" },
      { title: "Card Two", description: "Description two" },
    ];
    render(<FeatureBentoUtilities leftColumnCards={leftColumnCards} />);
    expect(screen.getByText("Card One")).toBeInTheDocument();
    expect(screen.getByText("Card Two")).toBeInTheDocument();
  });

  it("renders labelIcon names dynamically with the original size", () => {
    render(
      <FeatureBentoUtilities
        labelIcon="lucide/wrench"
        labelIconName="lucide/fallback"
        label="Utilities"
      />,
    );

    const icon = screen.getByTestId("mock-icon");
    expect(icon).toHaveAttribute("data-name", "lucide/wrench");
    expect(icon).toHaveAttribute("data-size", "20");
    expect(icon.parentElement).toHaveClass("flex", "items-center", "gap-2");
    expect(icon.parentElement).not.toHaveTextContent("lucide/wrench");
  });

  it.each([
    ["empty", ""],
    ["false", false],
    ["zero", 0],
  ])("falls through %s labelIcon values to labelIconName", (_label, labelIcon) => {
    render(
      <FeatureBentoUtilities
        labelIcon={labelIcon}
        labelIconName="lucide/fallback"
        label="Utilities"
      />,
    );

    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/fallback",
    );
  });

  it("omits a falsy labelIcon without a fallback", () => {
    const { container } = render(<FeatureBentoUtilities labelIcon={0} />);

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(container.querySelector("section")).not.toHaveTextContent("0");
  });

  it("preserves custom label icon elements", () => {
    render(
      <FeatureBentoUtilities
        labelIcon={<span data-testid="custom-icon" />}
        labelIconName="lucide/fallback"
        label="Utilities"
      />,
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("keeps both card columns, images, badges, and sparkle icons on their original paths", () => {
    render(
      <FeatureBentoUtilities
        leftColumnCards={[
          {
            title: "Left Media",
            imageSrc: "/left.jpg",
            showSparkle: true,
            badge: "lucide/content-badge",
          },
        ]}
        rightColumnCards={[
          {
            title: "Right Media",
            imageSrc: "/ignored.jpg",
            imageSlot: <div data-testid="image-slot">Custom image</div>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-img")).toHaveAttribute("src", "/left.jpg");
    expect(screen.getByTestId("image-slot")).toBeInTheDocument();
    expect(screen.getByText("lucide/content-badge")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/sparkles",
    );
    expect(screen.getByTestId("mock-icon")).toHaveAttribute("data-size", "16");
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureBentoUtilities className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
