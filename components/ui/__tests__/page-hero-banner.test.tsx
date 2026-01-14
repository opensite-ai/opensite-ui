import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHeroBanner } from "../page-hero-banner";

describe("PageHeroBanner", () => {
  it("renders with imageUrl", () => {
    const { container } = render(
      <PageHeroBanner imageUrl="https://example.com/image.jpg" alt="Test banner">
        <div>Test Content</div>
      </PageHeroBanner>
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders with videoUrl", () => {
    const { container } = render(
      <PageHeroBanner videoUrl="https://example.com/video.mp4" alt="Test banner">
        <div>Test Content</div>
      </PageHeroBanner>
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("throws error when neither imageUrl nor videoUrl is provided", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<PageHeroBanner alt="Test banner"><div>Test</div></PageHeroBanner>);
    }).toThrow("PageHeroBanner requires either imageUrl or videoUrl");

    consoleSpy.mockRestore();
  });

  it("applies custom className", () => {
    const { container } = render(
      <PageHeroBanner
        imageUrl="https://example.com/image.jpg"
        className="custom-class"
      >
        <div>Test Content</div>
      </PageHeroBanner>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders children", () => {
    render(
      <PageHeroBanner imageUrl="https://example.com/image.jpg">
        <h1>Test Heading</h1>
        <p>Test paragraph</p>
      </PageHeroBanner>
    );
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test paragraph")).toBeInTheDocument();
  });
});
