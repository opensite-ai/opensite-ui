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
    // Return format matching "MMMM d, yyyy" pattern
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
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
    const { container } = render(<ArticleHeroProse post={mockPost} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders post title", () => {
    render(<ArticleHeroProse post={mockPost} />);
    expect(screen.getByText("Test Article Title")).toBeInTheDocument();
  });

  it("renders post description", () => {
    render(<ArticleHeroProse post={mockPost} />);
    expect(screen.getByText("This is a test article description.")).toBeInTheDocument();
  });

  it("renders author name", () => {
    render(<ArticleHeroProse post={mockPost} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("renders formatted date", () => {
    render(<ArticleHeroProse post={mockPost} />);
    // Check for the date text (may vary by timezone, so check for March and 2024)
    expect(screen.getByText(/on March \d+, 2024/)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ArticleHeroProse post={mockPost} className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  // Feed contract D3 (§4.3): article blocks render both markdown and
  // server-sanitized HTML bodies through the single `markdownString` prop.
  // markdown-to-jsx parses embedded HTML natively (the fork does not set
  // disableParsingRawHTML), so HTML-in-markdownString must materialize as
  // real elements while script content must never execute.
  describe("markdownString HTML rendering (contract D3)", () => {
    it("renders embedded HTML tags as real DOM elements", () => {
      const { container } = render(
        <ArticleHeroProse
          post={{ title: "Doc" }}
          markdownString="<h2>Hi</h2><p>body</p>"
        />,
      );

      const heading = screen.getByText("Hi");
      expect(heading.tagName).toBe("H2");

      const paragraph = screen.getByText("body");
      expect(paragraph.tagName).toBe("P");

      // Content is rendered as parsed elements, not escaped text.
      expect(container.innerHTML).not.toContain("&lt;h2&gt;");
    });

    it("does not execute embedded <script> content", () => {
      const executed = vi.fn();
      (window as unknown as { __d3ScriptExecuted?: () => void }).__d3ScriptExecuted =
        executed;

      const { container } = render(
        <ArticleHeroProse
          post={{ title: "Doc" }}
          markdownString={
            '<p>safe body</p><script>window.__d3ScriptExecuted && window.__d3ScriptExecuted()</script>'
          }
        />,
      );

      // The benign body still renders.
      expect(screen.getByText("safe body")).toBeInTheDocument();

      // markdown-to-jsx converts markup into React elements rather than
      // injecting raw HTML, so any <script> that survives is created via
      // React.createElement and is inert — the browser only executes scripts
      // parsed from HTML or explicitly appended, never React-rendered ones.
      // The security guarantee is non-execution.
      expect(executed).not.toHaveBeenCalled();
      const script = container.querySelector("script");
      if (script) {
        // If present, it is an inert element whose body was set as text, not
        // parsed/run.
        expect(script.getAttribute("src")).toBeNull();
      }

      delete (window as unknown as { __d3ScriptExecuted?: () => void })
        .__d3ScriptExecuted;
    });
  });
});

