import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleSplitAnimated } from "../article-split-animated";

// Mock the Img component from @page-speed/img
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

describe("ArticleSplitAnimated", () => {
  it("renders with default props", () => {
    render(<ArticleSplitAnimated />);
    expect(screen.getByText("The Evolution of Design Systems in Modern Product Development")).toBeInTheDocument();
    expect(screen.getByText("David Park")).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <ArticleSplitAnimated
        title="Custom Article Title"
        description="This is a custom description for the article."
      />
    );
    expect(screen.getByText("Custom Article Title")).toBeInTheDocument();
    expect(screen.getByText("This is a custom description for the article.")).toBeInTheDocument();
  });

  it("renders author information", () => {
    render(
      <ArticleSplitAnimated
        authorName="Jane Smith"
        authorRole="Senior Designer"
      />
    );
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Senior Designer")).toBeInTheDocument();
  });

  it("renders publish date and read time", () => {
    render(
      <ArticleSplitAnimated
        publishDate="March 15, 2024"
        readTime="10 min read"
      />
    );
    expect(screen.getByText("March 15, 2024")).toBeInTheDocument();
    expect(screen.getByText("10 min read")).toBeInTheDocument();
  });

  it("renders category badge", () => {
    render(<ArticleSplitAnimated category="Technology" categoryHref="/tech" />);
    expect(screen.getByText("Technology")).toBeInTheDocument();
  });

  it("renders CTA button", () => {
    render(
      <ArticleSplitAnimated
        ctaText="Read More"
        ctaHref="/article"
      />
    );
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ArticleSplitAnimated className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders default section styling", () => {
    const { container } = render(<ArticleSplitAnimated />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("py-32");
  });

  it("renders author avatar with fallback", () => {
    render(<ArticleSplitAnimated authorName="Alice Brown" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("renders article image", () => {
    render(<ArticleSplitAnimated />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders grid layout", () => {
    const { container } = render(<ArticleSplitAnimated />);
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer?.className).toContain("lg:grid-cols-2");
  });

  it("renders motion animated elements", () => {
    render(<ArticleSplitAnimated />);
    const motionDivs = screen.getAllByTestId("motion-div");
    expect(motionDivs.length).toBe(2); // One for image, one for content
  });

  it("renders with optixFlowConfig", () => {
    const optixConfig = {
      apiKey: "test-api-key",
      compression: 80,
    };
    render(<ArticleSplitAnimated optixFlowConfig={optixConfig} />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders default values correctly", () => {
    render(<ArticleSplitAnimated />);
    expect(screen.getByText("Design Lead")).toBeInTheDocument();
    expect(screen.getByText("January 15, 2025")).toBeInTheDocument();
    expect(screen.getByText("8 min read")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Read Full Article")).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<ArticleSplitAnimated title="Test Title" />);
    const img = screen.getByTestId("mock-img");
    expect(img).toHaveAttribute("alt", "Test Title");
  });
});

