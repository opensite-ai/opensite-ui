import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleHeroProse } from "../article-hero-prose";
import type { ArticleHeroProsePost } from "../article-hero-prose";

// Mock the Img component from @page-speed/img
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// Mock the DynamicIcon component
vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid={`icon-${name}`} data-size={size} />
  ),
}));

// Mock date-fns format function
vi.mock("date-fns", () => ({
  format: (date: Date, formatStr: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  },
}));

describe("ArticleHeroProse", () => {
  const mockPost: ArticleHeroProsePost = {
    title: "Test Article Title",
    authorName: "Jane Doe",
    image: "https://example.com/image.jpg",
    pubDate: new Date("2024-03-15"),
    description: "This is a test article description.",
    authorImage: "https://example.com/avatar.jpg",
  };

  it("renders with default props", () => {
    render(<ArticleHeroProse />);
    expect(screen.getByText("Designing websites faster with Opensite AI")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders custom post data", () => {
    render(<ArticleHeroProse post={mockPost} />);
    expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("This is a test article description.")).toBeInTheDocument();
  });

  it("renders article images", () => {
    render(<ArticleHeroProse post={mockPost} />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThanOrEqual(1);
  });

  it("renders author avatar with fallback", () => {
    render(<ArticleHeroProse post={mockPost} />);
    expect(screen.getByText("J")).toBeInTheDocument(); // Fallback for Jane
  });

  it("applies custom className", () => {
    const { container } = render(<ArticleHeroProse className="custom-class" />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders default section styling", () => {
    const { container } = render(<ArticleHeroProse />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("py-32");
  });

  it("renders prose content sections", () => {
    render(<ArticleHeroProse />);
    expect(screen.getByText("The Great Joke Tax")).toBeInTheDocument();
    expect(screen.getByText("How the Tax System Works")).toBeInTheDocument();
    expect(screen.getByText("The People's Rebellion")).toBeInTheDocument();
    expect(screen.getByText("The King's Plan")).toBeInTheDocument();
  });

  it("renders alert component", () => {
    render(<ArticleHeroProse />);
    expect(screen.getByText("Royal Decree!")).toBeInTheDocument();
    expect(screen.getByText(/all jokes must be registered/)).toBeInTheDocument();
  });

  it("renders table content", () => {
    render(<ArticleHeroProse />);
    expect(screen.getByText("King's Treasury")).toBeInTheDocument();
    expect(screen.getByText("People's happiness")).toBeInTheDocument();
  });

  it("renders list items", () => {
    render(<ArticleHeroProse />);
    expect(screen.getByText("1st level of puns: 5 gold coins")).toBeInTheDocument();
    expect(screen.getByText("2nd level of jokes: 10 gold coins")).toBeInTheDocument();
    expect(screen.getByText("3rd level of one-liners : 20 gold coins")).toBeInTheDocument();
  });

  it("renders blockquote", () => {
    render(<ArticleHeroProse />);
    const blockquote = screen.getByText(/After all/);
    expect(blockquote).toBeInTheDocument();
  });

  it("renders with optixFlowConfig", () => {
    const optixConfig = {
      apiKey: "test-api-key",
      compression: 80,
    };
    render(<ArticleHeroProse post={mockPost} optixFlowConfig={optixConfig} />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });
});

