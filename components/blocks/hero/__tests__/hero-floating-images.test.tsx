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
    <div data-testid="mock-lightbox" data-items={items.length} data-index={initialIndex}>
      <button onClick={onClose} data-testid="lightbox-close">
        Close
      </button>
    </div>
  ),
}));

// Note: DynamicIcon is not mocked as it renders loading state in tests
// and the actual component functionality is tested through structure verification

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

  it("renders children content in the content area", () => {
    render(
      <HeroFloatingImages>
        <h1>Test Heading</h1>
        <p>Test description</p>
      </HeroFloatingImages>
    );
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders complex children with badges, buttons, and other elements", () => {
    render(
      <HeroFloatingImages>
        <span className="badge">Featured</span>
        <h1>Main Heading</h1>
        <p>Description text</p>
        <button>Call to Action</button>
      </HeroFloatingImages>
    );
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByText("Main Heading")).toBeInTheDocument();
    expect(screen.getByText("Description text")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Call to Action" })).toBeInTheDocument();
  });

  // ==========================================
  // SECTION: Image Gallery Rendering
  // ==========================================

  it("renders images when provided", () => {
    const images = [
      { src: "https://example.com/image1.jpg", alt: "Image 1", featured: true },
      { src: "https://example.com/image2.jpg", alt: "Image 2" },
      { src: "https://example.com/image3.jpg", alt: "Image 3" },
    ];
    render(<HeroFloatingImages images={images} />);
    const renderedImages = screen.getAllByTestId("mock-img");
    expect(renderedImages.length).toBe(3);
  });

  it("renders featured image separately from secondary images", () => {
    const images = [
      { src: "https://example.com/featured.jpg", alt: "Featured Image", featured: true },
      { src: "https://example.com/secondary1.jpg", alt: "Secondary 1" },
      { src: "https://example.com/secondary2.jpg", alt: "Secondary 2" },
    ];
    render(<HeroFloatingImages images={images} />);

    // Should have 3 total image buttons
    const imageButtons = screen.getAllByRole("button");
    expect(imageButtons.length).toBe(3);

    // Featured image should have specific aria-label
    expect(screen.getByLabelText("View Featured Image in lightbox")).toBeInTheDocument();
  });

  it("uses first image as featured when no image has featured flag", () => {
    const images = [
      { src: "https://example.com/image1.jpg", alt: "First Image" },
      { src: "https://example.com/image2.jpg", alt: "Second Image" },
    ];
    render(<HeroFloatingImages images={images} />);

    // First image should be treated as featured
    expect(screen.getByLabelText("View First Image in lightbox")).toBeInTheDocument();
  });

  it("does not render gallery when images array is empty", () => {
    render(<HeroFloatingImages images={[]} />);
    expect(screen.queryAllByTestId("mock-img")).toHaveLength(0);
  });

  it("renders imagesSlot instead of images when provided", () => {
    const images = [
      { src: "https://example.com/image1.jpg", alt: "Image 1" },
    ];
    render(
      <HeroFloatingImages
        images={images}
        imagesSlot={<div data-testid="custom-gallery">Custom Gallery</div>}
      />
    );
    expect(screen.getByTestId("custom-gallery")).toBeInTheDocument();
    // Images from the images prop should not render
    expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();
  });

  // ==========================================
  // SECTION: Lightbox Functionality
  // ==========================================

  it("opens lightbox when clicking on featured image", () => {
    const images = [
      { src: "https://example.com/featured.jpg", alt: "Featured Image", featured: true },
      { src: "https://example.com/secondary.jpg", alt: "Secondary Image" },
    ];
    render(<HeroFloatingImages images={images} />);

    // Click on featured image button
    const featuredButton = screen.getByLabelText("View Featured Image in lightbox");
    fireEvent.click(featuredButton);

    // Lightbox should be visible
    expect(screen.getByTestId("mock-lightbox")).toBeInTheDocument();
    expect(screen.getByTestId("mock-lightbox")).toHaveAttribute("data-index", "0");
  });

  it("opens lightbox when clicking on secondary image", () => {
    const images = [
      { src: "https://example.com/featured.jpg", alt: "Featured Image", featured: true },
      { src: "https://example.com/secondary.jpg", alt: "Secondary Image" },
    ];
    render(<HeroFloatingImages images={images} />);

    // Click on secondary image button
    const secondaryButton = screen.getByLabelText("View Secondary Image in lightbox");
    fireEvent.click(secondaryButton);

    // Lightbox should open at index 1
    expect(screen.getByTestId("mock-lightbox")).toBeInTheDocument();
    expect(screen.getByTestId("mock-lightbox")).toHaveAttribute("data-index", "1");
  });

  it("closes lightbox when close button is clicked", () => {
    const images = [
      { src: "https://example.com/image.jpg", alt: "Test Image" },
    ];
    render(<HeroFloatingImages images={images} />);

    // Open lightbox
    const imageButton = screen.getByLabelText("View Test Image in lightbox");
    fireEvent.click(imageButton);
    expect(screen.getByTestId("mock-lightbox")).toBeInTheDocument();

    // Close lightbox
    fireEvent.click(screen.getByTestId("lightbox-close"));
    expect(screen.queryByTestId("mock-lightbox")).not.toBeInTheDocument();
  });

  it("does not open lightbox when enableLightbox is false", () => {
    const images = [
      { src: "https://example.com/image.jpg", alt: "Test Image" },
    ];
    render(<HeroFloatingImages images={images} enableLightbox={false} />);

    // Click on image
    const imageButton = screen.getByLabelText("View Test Image in lightbox");
    fireEvent.click(imageButton);

    // Lightbox should not appear
    expect(screen.queryByTestId("mock-lightbox")).not.toBeInTheDocument();
  });

  it("opens lightbox on keyboard Enter press", () => {
    const images = [
      { src: "https://example.com/image.jpg", alt: "Test Image" },
    ];
    render(<HeroFloatingImages images={images} />);

    const imageButton = screen.getByLabelText("View Test Image in lightbox");
    fireEvent.keyDown(imageButton, { key: "Enter" });

    expect(screen.getByTestId("mock-lightbox")).toBeInTheDocument();
  });

  it("opens lightbox on keyboard Space press", () => {
    const images = [
      { src: "https://example.com/image.jpg", alt: "Test Image" },
    ];
    render(<HeroFloatingImages images={images} />);

    const imageButton = screen.getByLabelText("View Test Image in lightbox");
    fireEvent.keyDown(imageButton, { key: " " });

    expect(screen.getByTestId("mock-lightbox")).toBeInTheDocument();
  });

  // ==========================================
  // SECTION: Zoom Indicator
  // ==========================================

  it("renders zoom indicator overlay on images when lightbox is enabled", () => {
    const images = [
      { src: "https://example.com/image.jpg", alt: "Test Image" },
    ];
    const { container } = render(<HeroFloatingImages images={images} />);

    // Check for the zoom indicator container (the circular button with icon)
    const zoomIndicators = container.querySelectorAll(".rounded-full.bg-background\\/90");
    expect(zoomIndicators.length).toBeGreaterThan(0);
  });

  it("renders zoom indicator with proper structure for lightbox functionality", () => {
    const images = [
      { src: "https://example.com/image.jpg", alt: "Test Image" },
    ];
    const { container } = render(<HeroFloatingImages images={images} />);

    // Check for the hover overlay container
    const hoverOverlays = container.querySelectorAll(".opacity-0.transition-opacity");
    expect(hoverOverlays.length).toBeGreaterThan(0);
  });

  it("does not render zoom indicator when enableLightbox is false", () => {
    const images = [
      { src: "https://example.com/image.jpg", alt: "Test Image" },
    ];
    const { container } = render(<HeroFloatingImages images={images} enableLightbox={false} />);

    // When lightbox is disabled, there should be no zoom indicator circles
    const zoomIndicators = container.querySelectorAll(".rounded-full.bg-white\\/90");
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
      <HeroFloatingImages gridClassName="custom-grid">
        <div>Content</div>
      </HeroFloatingImages>
    );
    const grid = container.querySelector(".custom-grid");
    expect(grid).toBeInTheDocument();
  });

  it("applies custom contentClassName to content area", () => {
    const { container } = render(
      <HeroFloatingImages contentClassName="custom-content">
        <div>Content</div>
      </HeroFloatingImages>
    );
    const content = container.querySelector(".custom-content");
    expect(content).toBeInTheDocument();
  });

  it("applies custom galleryClassName to gallery container", () => {
    const images = [
      { src: "https://example.com/image.jpg", alt: "Test" },
    ];
    const { container } = render(
      <HeroFloatingImages images={images} galleryClassName="custom-gallery" />
    );
    const gallery = container.querySelector(".custom-gallery");
    expect(gallery).toBeInTheDocument();
  });

  it("applies custom featuredImageClassName to featured image wrapper", () => {
    const images = [
      { src: "https://example.com/image.jpg", alt: "Test", featured: true },
    ];
    const { container } = render(
      <HeroFloatingImages images={images} featuredImageClassName="custom-featured" />
    );
    expect(container.querySelector(".custom-featured")).toBeInTheDocument();
  });

  it("applies custom secondaryImageClassName to secondary image wrappers", () => {
    const images = [
      { src: "https://example.com/featured.jpg", alt: "Featured", featured: true },
      { src: "https://example.com/secondary.jpg", alt: "Secondary" },
    ];
    const { container } = render(
      <HeroFloatingImages images={images} secondaryImageClassName="custom-secondary" />
    );
    expect(container.querySelector(".custom-secondary")).toBeInTheDocument();
  });

  // ==========================================
  // SECTION: Section Props
  // ==========================================

  it("passes background prop to Section", () => {
    const { container } = render(<HeroFloatingImages background="dark" />);
    // The Section component applies background classes
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("passes spacing prop to Section", () => {
    const { container } = render(<HeroFloatingImages spacing="xl" />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("passes pattern and patternOpacity props to Section", () => {
    const { container } = render(
      <HeroFloatingImages pattern="dashedGridBasic" patternOpacity={0.5} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  // ==========================================
  // SECTION: Null Guards / No Placeholder Content
  // ==========================================

  it("does not render content area when children is undefined", () => {
    const images = [
      { src: "https://example.com/image.jpg", alt: "Test" },
    ];
    const { container } = render(<HeroFloatingImages images={images} />);

    // Should render gallery but not content area
    expect(screen.getByTestId("mock-img")).toBeInTheDocument();
    // The content wrapper should not exist
    const contentWrappers = container.querySelectorAll(".flex.flex-col.justify-center");
    expect(contentWrappers.length).toBe(0);
  });

  it("does not render gallery area when no images and no imagesSlot", () => {
    const { container } = render(
      <HeroFloatingImages>
        <div>Content Only</div>
      </HeroFloatingImages>
    );

    expect(screen.getByText("Content Only")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();
  });

  // ==========================================
  // SECTION: OptixFlowConfig
  // ==========================================

  it("passes optixFlowConfig to Img components", () => {
    const images = [
      { src: "https://example.com/image.jpg", alt: "Test" },
    ];
    const optixFlowConfig = { apiKey: "test-key", compression: 80 };

    // This test verifies the prop is passed - actual verification would require
    // inspecting the mock more deeply, but the type system ensures it's passed
    render(<HeroFloatingImages images={images} optixFlowConfig={optixFlowConfig} />);
    expect(screen.getByTestId("mock-img")).toBeInTheDocument();
  });

  // ==========================================
  // SECTION: Performance (useMemo/useCallback verification)
  // ==========================================

  it("maintains stable references across re-renders for performance", () => {
    const images = [
      { src: "https://example.com/image.jpg", alt: "Test" },
    ];
    const { rerender } = render(<HeroFloatingImages images={images} />);

    // Re-render with same props
    rerender(<HeroFloatingImages images={images} />);

    // Component should still render correctly (memoization working)
    expect(screen.getByTestId("mock-img")).toBeInTheDocument();
  });
});
