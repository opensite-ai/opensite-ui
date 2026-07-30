import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureImageCardsThreeColumn } from "../feature-image-cards-three-column";

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
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid={`mock-icon-${name}`}
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../ui/avatar", () => ({
  Avatar: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span data-testid="mock-avatar" className={className}>{children}</span>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt: string }) => (
    <img data-testid="mock-avatar-image" src={src} alt={alt} />
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("FeatureImageCardsThreeColumn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureImageCardsThreeColumn title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureImageCardsThreeColumn title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureImageCardsThreeColumn description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders cards when provided", () => {
    const cards = [
      { title: "Card One", badgeText: "Badge One" },
      { title: "Card Two", badgeText: "Badge Two" },
    ];
    render(<FeatureImageCardsThreeColumn cards={cards} />);
    expect(screen.getByText("Card One")).toBeInTheDocument();
    expect(screen.getByText("Card Two")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureImageCardsThreeColumn className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("preserves avatar then truthy raw then named icon precedence and badge gates", () => {
    render(
      <FeatureImageCardsThreeColumn
        cards={[
          {
            title: "Avatar priority",
            avatarSrc: "/avatar.jpg",
            icon: "lucide/ignored-avatar-raw",
            iconName: "lucide/ignored-avatar-name",
          },
          {
            title: "Raw icon",
            icon: "lucide/raw",
            iconName: "lucide/ignored-raw",
          },
          {
            title: "Custom icon",
            icon: <span data-testid="custom-icon" />,
            iconName: "lucide/ignored-custom",
          },
          {
            title: "Empty fallback",
            icon: "",
            iconName: "lucide/empty-fallback",
          },
          {
            title: "False fallback",
            icon: false,
            iconName: "lucide/false-fallback",
          },
          {
            title: "Zero fallback",
            icon: 0,
            iconName: "lucide/zero-fallback",
          },
          { title: "Named icon", iconName: "lucide/named" },
          { title: "No badge" },
        ]}
      />,
    );

    const avatarCard = screen.getByText("Avatar priority").closest(".group");
    const rawCard = screen.getByText("Raw icon").closest(".group");
    const noBadgeCard = screen.getByText("No badge").closest(".group");
    expect(avatarCard?.querySelector('[data-testid="mock-avatar-image"]')).toHaveAttribute(
      "src",
      "/avatar.jpg",
    );
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-avatar-raw"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-avatar-name"),
    ).not.toBeInTheDocument();

    const rawIcon = screen.getByTestId("mock-icon-lucide/raw");
    expect(rawIcon).toHaveAttribute("data-size", "18");
    expect(rawCard).not.toHaveTextContent("lucide/raw");
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-raw"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-custom"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/empty-fallback"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/false-fallback"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/zero-fallback"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon-lucide/named")).toBeInTheDocument();
    expect(rawCard?.querySelector('[data-slot="badge"]')).toBeInTheDocument();
    expect(noBadgeCard?.querySelector('[data-slot="badge"]')).not.toBeInTheDocument();
  });

  it("keeps card images, image slots, avatars, and static arrows as media", () => {
    render(
      <FeatureImageCardsThreeColumn
        cards={[
          {
            title: "Media card",
            imageSrc: "/feature.jpg",
            imageAlt: "Feature media",
            avatarSrc: "/avatar.jpg",
            linkText: "Learn more",
          },
          {
            title: "Slot card",
            imageSrc: "/hidden.jpg",
            imageSlot: <div data-testid="image-slot">Custom media</div>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "src",
      "/feature.jpg",
    );
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "alt",
      "Feature media",
    );
    expect(screen.getByTestId("mock-avatar-image")).toHaveAttribute(
      "src",
      "/avatar.jpg",
    );
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-up-right"),
    ).toHaveAttribute("data-size", "18");
    expect(screen.getByTestId("image-slot")).toHaveTextContent("Custom media");
    expect(screen.getAllByTestId("mock-img")).toHaveLength(1);
  });
});
