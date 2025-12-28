import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogTechInsights } from "../blog-tech-insights";

// Mock dependencies
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>icon</span>
  ),
}));

describe("BlogTechInsights", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<BlogTechInsights />);
    expect(screen.getByText("Tech Insights")).toBeInTheDocument();
    expect(screen.getByText(/Exploring cutting-edge technologies/)).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <BlogTechInsights
        title="Custom Title"
        description="Custom description"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders default featured post", () => {
    render(<BlogTechInsights />);
    expect(screen.getByText("Next-Gen AI: Transforming Business Operations")).toBeInTheDocument();
    expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
    expect(screen.getByText("AI Researcher")).toBeInTheDocument();
  });

  it("renders default secondary posts content", () => {
    render(<BlogTechInsights />);
    expect(screen.getByText(/Exploring cost-effective cloud migration/)).toBeInTheDocument();
    expect(screen.getByText(/Implementing adaptive security frameworks/)).toBeInTheDocument();
    expect(screen.getByText(/Reducing latency in smart city deployments/)).toBeInTheDocument();
    expect(screen.getByText(/Enterprise applications of distributed ledger/)).toBeInTheDocument();
  });

  it("renders secondary post content", () => {
    render(<BlogTechInsights />);
    expect(screen.getByText(/Exploring cost-effective cloud migration/)).toBeInTheDocument();
    expect(screen.getByText(/Implementing adaptive security frameworks/)).toBeInTheDocument();
  });

  it("renders custom featured post", () => {
    const customFeaturedPost = {
      title: "Custom Featured Post",
      image: "/custom.jpg",
      author: "Custom Author",
      authorRole: "Custom Role",
    };

    render(<BlogTechInsights featuredPost={customFeaturedPost} />);
    expect(screen.getByText("Custom Featured Post")).toBeInTheDocument();
    expect(screen.getByText("Custom Author")).toBeInTheDocument();
    expect(screen.getByText("Custom Role")).toBeInTheDocument();
  });

  it("renders custom secondary posts", () => {
    const customSecondaryPosts = [
      {
        title: "Custom Secondary",
        content: "Custom secondary content text",
        image: "/custom.jpg",
      },
    ];

    render(<BlogTechInsights secondaryPosts={customSecondaryPosts} />);
    expect(screen.getByText("Custom secondary content text")).toBeInTheDocument();
  });

  it("renders read more button with default text", () => {
    render(<BlogTechInsights />);
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  it("renders custom read more text", () => {
    render(<BlogTechInsights readMoreText="Learn More" readMoreHref="/more" />);
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BlogTechInsights className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<BlogTechInsights />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for posts", () => {
    render(<BlogTechInsights />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("handles empty secondary posts array", () => {
    render(<BlogTechInsights secondaryPosts={[]} />);
    expect(screen.getByText("Tech Insights")).toBeInTheDocument();
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });
});

