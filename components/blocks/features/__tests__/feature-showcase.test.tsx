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

  it("renders all feature items correctly", () => {
    render(<FeatureShowcase items={mockItems} />);
    expect(screen.getByText("Feature 1 Content")).toBeInTheDocument();
    expect(screen.getByText("Feature 2 Content")).toBeInTheDocument();
    expect(screen.getByAltText("Feature 1")).toBeInTheDocument();
    expect(screen.getByAltText("Feature 2")).toBeInTheDocument();
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

  it("renders carousel with correct number of items", () => {
    const { container } = render(<FeatureShowcase items={mockItems} />);
    const carouselItems = container.querySelectorAll('[role="group"]');
    expect(carouselItems.length).toBe(2);
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
    const carousel = container.querySelector('[data-slot="carousel"]');
    expect(carousel?.className).toContain("custom-carousel");
  });

  it("applies custom slideClassName to all slides", () => {
    const { container } = render(
      <FeatureShowcase items={mockItems} slideClassName="custom-slide" />
    );
    const slides = container.querySelectorAll('[role="group"] > div');
    slides.forEach((slide) => {
      expect(slide.className).toContain("custom-slide");
    });
  });

  it("applies custom contentClassName to content areas", () => {
    const { container } = render(
      <FeatureShowcase items={mockItems} contentClassName="custom-content" />
    );
    const contentAreas = container.querySelectorAll('[role="group"] > div > div:first-child');
    contentAreas.forEach((content) => {
      expect(content.className).toContain("custom-content");
    });
  });

  it("applies custom mediaClassName to media areas", () => {
    const { container } = render(
      <FeatureShowcase items={mockItems} mediaClassName="custom-media" />
    );
    const mediaAreas = container.querySelectorAll('[role="group"] > div > div:last-child');
    mediaAreas.forEach((media) => {
      expect(media.className).toContain("custom-media");
    });
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
    const slideContent = container.querySelector('[role="group"] > div');
    expect(slideContent?.className).toContain("flex");
    expect(slideContent?.className).toContain("flex-col");
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
    const carousel = container.querySelector('[data-slot="carousel"]');
    const slide = container.querySelector('[role="group"] > div');
    const contentArea = container.querySelector('[role="group"] > div > div:first-child');
    const mediaArea = container.querySelector('[role="group"] > div > div:last-child');

    expect(wrapper.className).toContain("outer-custom");
    expect(carousel?.className).toContain("carousel-custom");
    expect(slide?.className).toContain("slide-custom");
    expect(contentArea?.className).toContain("content-custom");
    expect(mediaArea?.className).toContain("media-custom");
  });
});
