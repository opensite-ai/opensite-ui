import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHeroBanner } from "../page-hero-banner";

describe("PageHeroBanner", () => {
  it("renders children correctly", () => {
    render(
      <PageHeroBanner imageUrl="test.jpg">
        <h1>Hero Title</h1>
      </PageHeroBanner>,
    );
    expect(screen.getByText("Hero Title")).toBeInTheDocument();
  });

  it("renders image when imageUrl is provided", () => {
    const { container } = render(
      <PageHeroBanner imageUrl="test.jpg">
        <h1>Hero Title</h1>
      </PageHeroBanner>,
    );
    const image = container.querySelector("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test.jpg");
  });

  it("renders video when videoUrl is provided", () => {
    const { container } = render(
      <PageHeroBanner videoUrl="test.mp4">
        <h1>Hero Title</h1>
      </PageHeroBanner>,
    );
    const video = container.querySelector("video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("src", "test.mp4");
  });

  it("applies custom minHeight", () => {
    const { container } = render(
      <PageHeroBanner imageUrl="test.jpg" minHeight="600px">
        <h1>Hero Title</h1>
      </PageHeroBanner>,
    );
    const hero = container.firstChild as HTMLElement;
    expect(hero.style.minHeight).toBe("600px");
  });

  it("shows overlay by default", () => {
    const { container } = render(
      <PageHeroBanner imageUrl="test.jpg">
        <h1>Hero Title</h1>
      </PageHeroBanner>,
    );
    const overlay = container.querySelector(".bg-gradient-to-b");
    expect(overlay).toBeInTheDocument();
  });

  it("hides overlay when showOverlay is false", () => {
    const { container } = render(
      <PageHeroBanner imageUrl="test.jpg" showOverlay={false}>
        <h1>Hero Title</h1>
      </PageHeroBanner>,
    );
    const overlays = container.querySelectorAll('[style*="linear-gradient"]');
    expect(overlays.length).toBe(0);
  });

  it("applies custom overlayOpacity", () => {
    const { container } = render(
      <PageHeroBanner imageUrl="test.jpg" overlayOpacity={0.8}>
        <h1>Hero Title</h1>
      </PageHeroBanner>,
    );
    const overlay = container.querySelector(
      '[style*="opacity"]',
    ) as HTMLElement;
    expect(overlay?.style.opacity).toBe("0.8");
  });

  it("applies custom className", () => {
    const { container } = render(
      <PageHeroBanner imageUrl="test.jpg" className="custom-class">
        <h1>Hero Title</h1>
      </PageHeroBanner>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("uses eager loading by default", () => {
    const { container } = render(
      <PageHeroBanner imageUrl="test.jpg">
        <h1>Hero Title</h1>
      </PageHeroBanner>,
    );
    const image = container.querySelector("img");
    expect(image).toHaveAttribute("loading", "eager");
  });

  it("applies lazy loading when specified", () => {
    const { container } = render(
      <PageHeroBanner imageUrl="test.jpg" loading="lazy">
        <h1>Hero Title</h1>
      </PageHeroBanner>,
    );
    const image = container.querySelector("img");
    expect(image).toHaveAttribute("loading", "lazy");
  });
});
