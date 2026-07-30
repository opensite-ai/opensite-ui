import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { FeatureBentoImageGrid } from "../feature-bento-image-grid";

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

  it("renders icon prop names dynamically in both bento card paths", () => {
    render(
      <FeatureBentoImageGrid
        items={[
          {
            title: "Large Icon",
            icon: "lucide/atom",
            iconBadge: "Large badge",
            linkText: "Explore",
            size: "large",
          },
          {
            title: "Small Icon",
            icon: "lucide/zap",
            iconBadge: "Small badge",
          },
        ]}
      />,
    );

    const largeCard = screen
      .getByText("Large Icon")
      .closest(".group") as HTMLElement;
    const smallCard = screen
      .getByText("Small Icon")
      .closest(".group") as HTMLElement;
    const largeIcon = within(largeCard)
      .getAllByTestId("mock-icon")
      .find((icon) => icon.getAttribute("data-name") === "lucide/atom")!;
    const smallIcon = within(smallCard).getByTestId("mock-icon");

    expect(largeIcon).toHaveAttribute("data-size", "24");
    expect(smallIcon).toHaveAttribute("data-name", "lucide/zap");
    expect(smallIcon).toHaveAttribute("data-size", "24");
    expect(largeCard).not.toHaveTextContent("lucide/atom");
    expect(smallCard).not.toHaveTextContent("lucide/zap");
    expect(within(largeCard).getByText("Large badge")).toBeInTheDocument();
    expect(within(smallCard).getByText("Small badge")).toBeInTheDocument();
    expect(
      within(largeCard)
        .getAllByTestId("mock-icon")
        .some((icon) => icon.getAttribute("data-name") === "lucide/chevron-right"),
    ).toBe(true);
  });

  it.each([
    ["empty", ""],
    ["false", false],
    ["zero", 0],
  ])("falls through %s icon values to iconName", (_label, icon) => {
    render(
      <FeatureBentoImageGrid
        items={[
          {
            title: "Fallback Icon",
            icon,
            iconName: "lucide/fallback",
            size: "large",
          },
        ]}
      />,
    );

    const card = screen.getByText("Fallback Icon").closest(".group") as HTMLElement;
    expect(within(card).getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/fallback",
    );
  });

  it("omits icon badge UI for a falsy icon without a fallback or badge", () => {
    render(
      <FeatureBentoImageGrid
        items={[{ title: "No Icon", icon: 0, size: "large" }]}
      />,
    );

    const card = screen.getByText("No Icon").closest(".group") as HTMLElement;
    expect(within(card).queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(card.querySelector(".ml-auto")).not.toBeInTheDocument();
    expect(card).not.toHaveTextContent("0");
  });

  it("preserves custom icon elements", () => {
    render(
      <FeatureBentoImageGrid
        items={[
          {
            title: "Custom Icon",
            icon: <span data-testid="custom-icon" />,
            iconName: "lucide/fallback",
            iconBadge: "Custom badge",
            size: "large",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(screen.queryByText("lucide/fallback")).not.toBeInTheDocument();
  });

  it("keeps image slots and iconBadge content out of DynamicIcon", () => {
    render(
      <FeatureBentoImageGrid
        items={[
          {
            title: "Media Boundary",
            imageSrc: "/ignored.jpg",
            imageSlot: <div data-testid="image-slot">Custom image</div>,
            iconBadge: "lucide/content-label",
            size: "large",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("image-slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();
    expect(screen.getByText("lucide/content-label")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
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
