import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutMinimalStory } from "../about-minimal-story";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("AboutMinimalStory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<AboutMinimalStory />);
    expect(screen.getByText("Our Story")).toBeInTheDocument();
    expect(screen.getByText(/Every great company starts with a simple idea/)).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AboutMinimalStory title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom content", () => {
    render(<AboutMinimalStory content="Custom content text" />);
    expect(screen.getByText("Custom content text")).toBeInTheDocument();
  });

  it("renders author when provided", () => {
    const author = { name: "John Doe", role: "CEO" };
    render(<AboutMinimalStory author={author} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("CEO")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutMinimalStory className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
