import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutDeveloperStory } from "../about-developer-story";

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
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
  avatarPlaceholders: Array(20).fill("https://placeholder.com/avatar.jpg"),
}));

describe("AboutDeveloperStory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(
      <AboutDeveloperStory
        title="Test Title"
        description="Test Description"
        storyTitle="Test Story Title"
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Story Title")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AboutDeveloperStory title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<AboutDeveloperStory description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom story title and content", () => {
    render(<AboutDeveloperStory storyTitle="Custom Story" storyContent="Custom story content" />);
    expect(screen.getByText("Custom Story")).toBeInTheDocument();
    expect(screen.getByText("Custom story content")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "default" as const },
    ];
    render(<AboutDeveloperStory actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { value: "10K+", label: "Developers" },
      { value: "500+", label: "Companies" },
    ];
    render(<AboutDeveloperStory stats={stats} />);
    expect(screen.getByText("10K+")).toBeInTheDocument();
    expect(screen.getByText("Developers")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutDeveloperStory className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
