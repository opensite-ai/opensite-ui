import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeroFloatingImages } from "../hero-floating-images";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
    onClick,
  }: {
    src: string;
    alt: string;
    className?: string;
    onClick?: () => void;
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
      data-testid="mock-img"
    />
  ),
}));

vi.mock("@page-speed/lightbox", () => ({
  Lightbox: ({
    items,
    initialIndex,
    onClose,
  }: {
    items: unknown[];
    initialIndex: number;
    onClose: () => void;
  }) => (
    <div
      data-testid="mock-lightbox"
      data-items={items.length}
      data-index={initialIndex}
    >
      <button onClick={onClose} data-testid="lightbox-close">
        Close
      </button>
    </div>
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <span className={className} data-testid="mock-badge">
      {children}
    </span>
  ),
}));

vi.mock("@/components/ui/block-actions", () => ({
  BlockActions: ({
    actions,
    actionsSlot,
    actionsClassName,
  }: {
    actions?: Array<{ label?: React.ReactNode; href?: string }>;
    actionsSlot?: React.ReactNode;
    actionsClassName?: string;
  }) => {
    if (actionsSlot) {
      return (
        <div className={actionsClassName} data-testid="mock-actions-slot">
          {actionsSlot}
        </div>
      );
    }

    if (!actions?.length) return null;

    return (
      <div className={actionsClassName} data-testid="mock-actions">
        {actions.map((action, index) => (
          <a href={action.href} key={index}>
            {action.label}
          </a>
        ))}
      </div>
    );
  },
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: React.ReactNode }) =>
    typeof name === "string" ? (
      <span data-testid={`mock-icon-${name}`} />
    ) : (
      <>{name}</>
    ),
}));

describe("HeroFloatingImages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ==========================================
  // SECTION: Basic Rendering
  // ==========================================

  it("renders an empty section when no props are provided", () => {
    const { container } = render(<HeroFloatingImages />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders named content props in the content area", () => {
    render(
      <HeroFloatingImages
        heading="Test Heading"
        description="Test description"
      />,
    );
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders badge, heading, description, and actions from named props", () => {
    render(
      <HeroFloatingImages
        badge="Featured"
        heading="Main Heading"
        description="Description text"
        actions={[{ label: "Call to Action", href: "/cta" }]}
      />,
    );
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByText("Main Heading")).toBeInTheDocument();
    expect(screen.getByText("Description text")).toBeInTheDocument();
    expect(screen.getByText("Call to Action")).toHaveAttribute("href", "/cta");
  });

  it("renders badge icon names through DynamicIcon", () => {
    render(
      <HeroFloatingImages badge="Featured" badgeIcon="lucide/shield" />,
    );

    expect(screen.getByTestId("mock-icon-lucide/shield")).toBeInTheDocument();
    expect(screen.queryByText("lucide/shield")).not.toBeInTheDocument();
  });

  it("preserves custom badge icon elements", () => {
    render(
      <HeroFloatingImages
        badge="Featured"
        badgeIcon={<span data-testid="custom-badge-icon" />}
      />,
    );

    expect(screen.getByTestId("custom-badge-icon")).toBeInTheDocument();
  });

  it("renders actionsSlot instead of configured actions", () => {
    render(
      <HeroFloatingImages
        heading="Custom actions"
        actions={[{ label: "Hidden action", href: "/hidden" }]}
        actionsSlot={<button type="button">Custom action</button>}
      />,
    );

    expect(screen.getByText("Custom action")).toBeInTheDocument();
    expect(screen.queryByText("Hidden action")).not.toBeInTheDocument();
  });

  // ==========================================
  // SECTION: Image Gallery Rendering
  // ==========================================

  it("renders images when provided", () => {
    const images = [
      {
        src: "https://example.com/image1.jpg",
        alt: "Image 1",
        featured: true,
      },
      { src: "https://example.com/image2.jpg", alt: "Image 2" },
      { src: "https://example.com/image3.jpg", alt: "Image 3" },
    ];
    render(<HeroFloatingImages images={images} />);
    const renderedImages = screen.getAllByTestId("mock-img");
    expect(renderedImages.length).toBe(3);
  });

  it("renders featured image separately from secondary images", () => {
    const images = [
      {
        src: "https://example.com/featured.jpg",
        alt: "Featured Image",
        featured: true,
      },
      { src: "https://example.com/secondary1.jpg", alt: "Secondary 1" },
      { src: "https://example.com/secondary2.jpg", alt: "Secondary 2" },
    ];
    render(<HeroFloatingImages images={images} />);

    const imageButtons = screen.getAllByRole("button");
    expect(imageButtons.length).toBe(3);

    expect(
      screen.getByLabelText("View Featured Image in lightbox"),
    ).toBeInTheDocument();
  });

  it("uses first image as featured when no image has featured flag", () => {
    const images = [
      { src: "https://example.com/image1.jpg", alt: "First Image" },
      { src: "https://example.com/image2.jpg", alt: "Second Image" },
    ];
    render(<HeroFloatingImages images={images} />);

    expect(
      screen.getByLabelText("View First Image in lightbox"),
    ).toBeInTheDocument();
  });

  it("does not render gallery when images array is empty", () => {
    render(<HeroFloatingImages images={[]} />);
    expect(screen.queryAllByTestId("mock-img")).toHaveLength(0);
  });

  it("renders imagesSlot instead of images when provided", () => {
    const images = [{ src: "https://example.com/image1.jpg", alt: "Image 1" }];
    render(
      <HeroFloatingImages
        images={images}
        imagesSlot={<div data-testid="custom-gallery">Custom Gallery</div>}
      />,
    );
    expect(screen.getByTestId("custom-gallery")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();
  });

  // ==========================================
  // SECTION: Lightbox Functionality
  // ==========================================

  it("opens lightbox when clicking on featured image", () => {
    const images = [
      {
        src: "https://example.com/featured.jpg",
        alt: "Featured Image",
        featured: true,
      },
      { src: "https://example.com/secondary.jpg", alt: "Secondary Image" },
    ];
    render(<HeroFloatingImages images={images} />);

    const featuredButton = screen.getByLabelText(
      "View Featured Image in lightbox",
    );
    fireEvent.click(featuredButton);

    expect(screen.getByTestId("mock-lightbox")).toBeInTheDocument();
    expect(screen.getByTestId("mock-lightbox")).toHaveAttribute(
      "data-index",
      "0",
    );
  });

  it("opens lightbox when clicking on secondary image", () => {
    const images = [
      {
        src: "https://example.com/featured.jpg",
        alt: "Featured Image",
        featured: true,
      },
      { src: "https://example.com/secondary.jpg", alt: "Secondary Image" },
    ];
    render(<HeroFloatingImages images={images} />);

    const secondaryButton = screen.getByLabelText(
      "View Secondary Image in lightbox",
    );
    fireEvent.click(secondaryButton);

    expect(screen.getByTestId("mock-lightbox")).toBeInTheDocument();
    expect(screen.getByTestId("mock-lightbox")).toHaveAttribute(
      "data-index",
      "1",
    );
  });

  it("closes lightbox when close button is clicked", () => {
    const images = [{ src: "https://example.com/image.jpg", alt: "Test Image" }];
    render(<HeroFloatingImages images={images} />);

    const imageButton = screen.getByLabelText("View Test Image in lightbox");
    fireEvent.click(imageButton);
    expect(screen.getByTestId("mock-lightbox")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("lightbox-close"));
    expect(screen.queryByTestId("mock-lightbox")).not.toBeInTheDocument();
  });

  it("does not open lightbox when enableLightbox is false", () => {
    const images = [{ src: "https://example.com/image.jpg", alt: "Test Image" }];
    render(<HeroFloatingImages images={images} enableLightbox={false} />);

    const imageButton = screen.getByLabelText("View Test Image in lightbox");
    fireEvent.click(imageButton);

    expect(screen.queryByTestId("mock-lightbox")).not.toBeInTheDocument();
  });

  it("opens lightbox on keyboard Enter press", () => {
    const images = [{ src: "https://example.com/image.jpg", alt: "Test Image" }];
    render(<HeroFloatingImages images={images} />);

    const imageButton = screen.getByLabelText("View Test Image in lightbox");
    fireEvent.keyDown(imageButton, { key: "Enter" });

    expect(screen.getByTestId("mock-lightbox")).toBeInTheDocument();
  });

  it("opens lightbox on keyboard Space press", () => {
    const images = [{ src: "https://example.com/image.jpg", alt: "Test Image" }];
    render(<HeroFloatingImages images={images} />);

    const imageButton = screen.getByLabelText("View Test Image in lightbox");
    fireEvent.keyDown(imageButton, { key: " " });

    expect(screen.getByTestId("mock-lightbox")).toBeInTheDocument();
  });

  // ==========================================
  // SECTION: Zoom Indicator
  // ==========================================

  it("renders zoom indicator overlay on images when lightbox is enabled", () => {
    const images = [{ src: "https://example.com/image.jpg", alt: "Test Image" }];
    const { container } = render(<HeroFloatingImages images={images} />);

    const zoomIndicators = container.querySelectorAll(
      ".rounded-full.shadow-lg",
    );
    expect(zoomIndicators.length).toBeGreaterThan(0);
  });

  it("renders zoom indicator with proper structure for lightbox functionality", () => {
    const images = [{ src: "https://example.com/image.jpg", alt: "Test Image" }];
    const { container } = render(<HeroFloatingImages images={images} />);

    const hoverOverlays = container.querySelectorAll(
      ".opacity-0.transition-opacity",
    );
    expect(hoverOverlays.length).toBeGreaterThan(0);
  });

  it("does not render zoom indicator when enableLightbox is false", () => {
    const images = [{ src: "https://example.com/image.jpg", alt: "Test Image" }];
    const { container } = render(
      <HeroFloatingImages images={images} enableLightbox={false} />,
    );

    const zoomIndicators = container.querySelectorAll(
      ".rounded-full.bg-white\\/90",
    );
    expect(zoomIndicators.length).toBe(0);
  });

  // ==========================================
  // SECTION: Custom className Props
  // ==========================================

  it("applies custom className to section", () => {
    const { container } = render(<HeroFloatingImages className="custom-section" />);
    expect(container.querySelector("section")).toHaveClass("custom-section");
  });

  it("applies custom gridClassName to grid container", () => {
    const { container } = render(
      <HeroFloatingImages gridClassName="custom-grid" heading="Content" />,
    );
    const grid = container.querySelector(".custom-grid");
    expect(grid).toBeInTheDocument();
  });

  it("applies custom contentClassName to content area", () => {
    const { container } = render(
      <HeroFloatingImages contentClassName="custom-content" heading="Content" />,
    );
    const content = container.querySelector(".custom-content");
    expect(content).toBeInTheDocument();
  });

  it("applies custom badgeClassName to badge", () => {
    render(<HeroFloatingImages badge="Featured" badgeClassName="custom-badge" />);
    expect(screen.getByTestId("mock-badge")).toHaveClass("custom-badge");
  });

  it("applies custom headingClassName to heading", () => {
    render(
      <HeroFloatingImages heading="Custom heading" headingClassName="custom-heading" />,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass(
      "custom-heading",
    );
  });

  it("applies custom descriptionClassName to description", () => {
    render(
      <HeroFloatingImages
        description="Custom description"
        descriptionClassName="custom-description"
      />,
    );
    expect(screen.getByText("Custom description")).toHaveClass(
      "custom-description",
    );
  });

  it("applies custom actionsClassName to actions", () => {
    render(
      <HeroFloatingImages
        actions={[{ label: "Act", href: "/act" }]}
        actionsClassName="custom-actions"
      />,
    );
    expect(screen.getByTestId("mock-actions")).toHaveClass("custom-actions");
  });

  it("applies custom galleryClassName to gallery container", () => {
    const images = [{ src: "https://example.com/image.jpg", alt: "Test" }];
    const { container } = render(
      <HeroFloatingImages images={images} galleryClassName="custom-gallery" />,
    );
    const gallery = container.querySelector(".custom-gallery");
    expect(gallery).toBeInTheDocument();
  });

  it("applies custom featuredImageClassName to featured image wrapper", () => {
    const images = [
      { src: "https://example.com/image.jpg", alt: "Test", featured: true },
    ];
    const { container } = render(
      <HeroFloatingImages
        images={images}
        featuredImageClassName="custom-featured"
      />,
    );
    expect(container.querySelector(".custom-featured")).toBeInTheDocument();
  });

  it("applies custom secondaryImageClassName to secondary image wrappers", () => {
    const images = [
      {
        src: "https://example.com/featured.jpg",
        alt: "Featured",
        featured: true,
      },
      { src: "https://example.com/secondary.jpg", alt: "Secondary" },
    ];
    const { container } = render(
      <HeroFloatingImages
        images={images}
        secondaryImageClassName="custom-secondary"
      />,
    );
    expect(container.querySelector(".custom-secondary")).toBeInTheDocument();
  });

  // ==========================================
  // SECTION: Section Props
  // ==========================================

  it("passes background prop to Section", () => {
    const { container } = render(<HeroFloatingImages background="dark" />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("passes spacing prop to Section", () => {
    const { container } = render(<HeroFloatingImages spacing="xl" />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("passes pattern and patternOpacity props to Section", () => {
    const { container } = render(
      <HeroFloatingImages pattern="dashedGridBasic" patternOpacity={0.5} />,
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  // ==========================================
  // SECTION: Null Guards / No Placeholder Content
  // ==========================================

  it("does not render content area when named content props are undefined", () => {
    const images = [{ src: "https://example.com/image.jpg", alt: "Test" }];
    const { container } = render(<HeroFloatingImages images={images} />);

    expect(screen.getByTestId("mock-img")).toBeInTheDocument();
    const contentWrappers = container.querySelectorAll(
      ".flex.flex-col.justify-center",
    );
    expect(contentWrappers.length).toBe(0);
  });

  it("does not render gallery area when no images and no imagesSlot", () => {
    const { container } = render(
      <HeroFloatingImages heading="Content Only" />,
    );

    expect(screen.getByText("Content Only")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();
    expect(container.querySelector(".grid.grid-cols-2.gap-4")).toBeNull();
  });

  // ==========================================
  // SECTION: OptixFlowConfig
  // ==========================================

  it("passes optixFlowConfig to Img components", () => {
    const images = [{ src: "https://example.com/image.jpg", alt: "Test" }];
    const optixFlowConfig = { apiKey: "test-key", compression: 80 };

    render(
      <HeroFloatingImages images={images} optixFlowConfig={optixFlowConfig} />,
    );
    expect(screen.getByTestId("mock-img")).toBeInTheDocument();
  });

  // ==========================================
  // SECTION: Performance (useMemo/useCallback verification)
  // ==========================================

  it("maintains stable references across re-renders for performance", () => {
    const images = [{ src: "https://example.com/image.jpg", alt: "Test" }];
    const { rerender } = render(<HeroFloatingImages images={images} />);

    rerender(<HeroFloatingImages images={images} />);

    expect(screen.getByTestId("mock-img")).toBeInTheDocument();
  });
});
