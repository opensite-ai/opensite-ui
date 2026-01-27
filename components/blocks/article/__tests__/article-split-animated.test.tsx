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

  it("renders CTA button", () => {
    render(
      <ArticleSplitAnimated
        title="Test Title"
        ctaText="Read More"
        ctaHref="/article"
      />
    );
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<ArticleSplitAnimated title="Test Title" image="/test-image.jpg" />);
    const img = screen.getByTestId("mock-img");
    expect(img).toHaveAttribute("alt", "Test Title");
  });
});

