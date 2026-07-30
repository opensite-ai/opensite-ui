import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureImageOverlayBadge } from "../feature-image-overlay-badge";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className} data-testid="mock-badge">{children}</span>
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

describe("FeatureImageOverlayBadge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureImageOverlayBadge badge="Test Badge" title="Test Title" />);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<FeatureImageOverlayBadge badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureImageOverlayBadge title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders overlay title", () => {
    render(<FeatureImageOverlayBadge imageSrc="/test.jpg" overlayTitle="Custom Overlay Title" />);
    expect(screen.getByText("Custom Overlay Title")).toBeInTheDocument();
  });

  it("renders avatar badge text", () => {
    render(<FeatureImageOverlayBadge imageSrc="/test.jpg" avatarBadgeText="Custom Avatar Badge" />);
    expect(screen.getByText("Custom Avatar Badge")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureImageOverlayBadge className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("routes fallback action icons while preserving children and action slots", () => {
    const result = render(
      <FeatureImageOverlayBadge
        actions={[
          {
            label: "String action",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-right",
          },
          {
            label: "Custom action",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
          {
            label: "Falsy action",
            icon: "",
            iconAfter: 0,
            "aria-label": "Falsy action control",
          },
          {
            label: "Generated label",
            icon: "lucide/hidden-leading",
            iconAfter: "lucide/hidden-trailing",
            children: <span data-testid="action-children">Replacement</span>,
          },
        ]}
      />,
    );

    const leadingIcon = screen.getByTestId("mock-icon-lucide/rocket");
    const stringAction = leadingIcon.parentElement;
    expect(leadingIcon).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    expect(stringAction).not.toHaveTextContent("lucide/rocket");
    expect(stringAction).not.toHaveTextContent("lucide/arrow-right");
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
    expect(screen.getByLabelText("Falsy action control")).toHaveTextContent(
      "Falsy action0",
    );
    expect(screen.getByTestId("action-children")).toHaveTextContent(
      "Replacement",
    );
    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/hidden-leading"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/hidden-trailing"),
    ).not.toBeInTheDocument();

    result.unmount();
    render(
      <FeatureImageOverlayBadge
        actions={[{ label: "Hidden action" }]}
        actionsSlot={<div data-testid="actions-slot">Custom actions</div>}
      />,
    );
    expect(screen.getByTestId("actions-slot")).toHaveTextContent(
      "Custom actions",
    );
    expect(screen.queryByText("Hidden action")).not.toBeInTheDocument();
  });

  it("keeps images, image slots, avatars, and static arrows as media", () => {
    const result = render(
      <FeatureImageOverlayBadge
        imageSrc="/feature.jpg"
        imageAlt="Feature media"
        avatarSrc="/avatar.jpg"
        overlayLinkText="Learn more"
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
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toHaveAttribute("data-size", "16");

    result.unmount();
    render(
      <FeatureImageOverlayBadge
        imageSrc="/hidden.jpg"
        imageSlot={<div data-testid="image-slot">Custom media</div>}
      />,
    );
    expect(screen.getByTestId("image-slot")).toHaveTextContent("Custom media");
    expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();
  });
});
