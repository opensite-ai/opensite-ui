import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureShowcase } from "../feature-showcase";
import type { FeatureShowcaseItem } from "../feature-showcase";

describe("FeatureShowcase", () => {
  const mockItems: FeatureShowcaseItem[] = [
    {
      content: <div>Feature 1 Content</div>,
      mediaComponent: <img src="feature1.jpg" alt="Feature 1" />,
    },
    {
      content: <div>Feature 2 Content</div>,
      mediaComponent: <img src="feature2.jpg" alt="Feature 2" />,
    },
  ];

  it("renders active feature item correctly", () => {
    render(<FeatureShowcase items={mockItems} />);
    // With crossfade, only the active item (first by default) is visible
    expect(screen.getByText("Feature 1 Content")).toBeInTheDocument();
    expect(screen.getByAltText("Feature 1")).toBeInTheDocument();
  });

  it("renders with empty items array", () => {
    const { container } = render(<FeatureShowcase items={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className to container", () => {
    const { container } = render(
      <FeatureShowcase items={mockItems} className="custom-container" />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("custom-container");
  });

  it("renders children content above carousel", () => {
    render(
      <FeatureShowcase items={mockItems}>
        <h2>Feature Showcase Title</h2>
      </FeatureShowcase>
    );
    expect(screen.getByText("Feature Showcase Title")).toBeInTheDocument();
  });

  it("renders carousel with navigation for multiple items", () => {
    const { container } = render(<FeatureShowcase items={mockItems} />);
    // With crossfade, only one item is shown at a time, but navigation buttons are present
    const buttons = container.querySelectorAll('button[aria-label]');
    // Should have at least 2 buttons (prev/next) - duplicated for mobile and desktop
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("renders navigation buttons", () => {
    const { container } = render(<FeatureShowcase items={mockItems} />);
    // CarouselPagination renders two buttons (previous and next)
    const buttons = container.querySelectorAll('button[aria-label]');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("applies custom carouselClassName", () => {
    const { container } = render(
      <FeatureShowcase items={mockItems} carouselClassName="custom-carousel" />
    );
    // The carouselClassName is applied to the wrapper div with class "relative"
    const carousel = container.querySelector('.custom-carousel');
    expect(carousel).toBeInTheDocument();
  });

  it("applies custom slideClassName to active slide", () => {
    const { container } = render(
      <FeatureShowcase items={mockItems} slideClassName="custom-slide" />
    );
    // With crossfade, only the active slide is rendered
    const slide = container.querySelector('.custom-slide');
    expect(slide).toBeInTheDocument();
  });

  it("applies custom contentClassName to content area", () => {
    const { container } = render(
      <FeatureShowcase items={mockItems} contentClassName="custom-content" />
    );
    // With crossfade, only the active content area is rendered
    const content = container.querySelector('.custom-content');
    expect(content).toBeInTheDocument();
  });

  it("applies custom mediaClassName to media area", () => {
    const { container } = render(
      <FeatureShowcase items={mockItems} mediaClassName="custom-media" />
    );
    // With crossfade, only the active media area is rendered
    const media = container.querySelector('.custom-media');
    expect(media).toBeInTheDocument();
  });

  it("renders CarouselPagination component", () => {
    const { container } = render(<FeatureShowcase items={mockItems} />);
    // CarouselPagination renders navigation buttons
    const buttons = container.querySelectorAll('button[aria-label]');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("renders complex content nodes", () => {
    const complexItems: FeatureShowcaseItem[] = [
      {
        content: (
          <div>
            <h3>Feature Title</h3>
            <p>Feature Description</p>
            <button>Learn More</button>
          </div>
        ),
        mediaComponent: (
          <div>
            <img src="complex.jpg" alt="Complex Feature" />
          </div>
        ),
      },
    ];

    render(<FeatureShowcase items={complexItems} />);
    expect(screen.getByText("Feature Title")).toBeInTheDocument();
    expect(screen.getByText("Feature Description")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("applies default responsive layout classes", () => {
    const { container } = render(<FeatureShowcase items={mockItems} />);
    // Find the slide content div with flex classes
    const slideContent = container.querySelector('.flex.flex-col-reverse');
    expect(slideContent).toBeInTheDocument();
    expect(slideContent?.className).toContain("md:flex-row");
  });

  it("renders with single item", () => {
    const singleItem: FeatureShowcaseItem[] = [
      {
        content: <div>Single Feature</div>,
        mediaComponent: <img src="single.jpg" alt="Single" />,
      },
    ];

    render(<FeatureShowcase items={singleItem} />);
    expect(screen.getByText("Single Feature")).toBeInTheDocument();
    expect(screen.getByAltText("Single")).toBeInTheDocument();
  });

  it("handles equalizeOnMobile prop", () => {
    render(<FeatureShowcase items={mockItems} equalizeOnMobile={false} />);
    expect(screen.getByText("Feature 1 Content")).toBeInTheDocument();
  });

  it("handles stretchMediaOnMobile prop", () => {
    render(<FeatureShowcase items={mockItems} stretchMediaOnMobile={false} />);
    expect(screen.getByText("Feature 1 Content")).toBeInTheDocument();
  });

  it("combines multiple custom classNames correctly", () => {
    const { container } = render(
      <FeatureShowcase
        items={mockItems}
        className="outer-custom"
        carouselClassName="carousel-custom"
        slideClassName="slide-custom"
        contentClassName="content-custom"
        mediaClassName="media-custom"
      />
    );

    const wrapper = container.firstChild as HTMLElement;
    const carousel = container.querySelector('.carousel-custom');
    const slide = container.querySelector('.slide-custom');
    const contentArea = container.querySelector('.content-custom');
    const mediaArea = container.querySelector('.media-custom');

    expect(wrapper.className).toContain("outer-custom");
    expect(carousel).toBeInTheDocument();
    expect(slide).toBeInTheDocument();
    expect(contentArea).toBeInTheDocument();
    expect(mediaArea).toBeInTheDocument();
  });
});
