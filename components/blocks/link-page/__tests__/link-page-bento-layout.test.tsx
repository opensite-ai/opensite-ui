import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkPageBentoLayout } from "../link-page-bento-layout";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("LinkPageBentoLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<LinkPageBentoLayout name="Test Creator" />);
    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
  });

  it("renders name", () => {
    render(<LinkPageBentoLayout name="Digital Creator" />);
    expect(screen.getByText("Digital Creator")).toBeInTheDocument();
  });

  it("renders bio when provided", () => {
    render(<LinkPageBentoLayout name="Test" bio="Content creator" />);
    expect(screen.getByText("Content creator")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<LinkPageBentoLayout name="Test" className="custom-class" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("renders with light theme by default", () => {
    const { container } = render(<LinkPageBentoLayout name="Test" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-white");
  });

  it("renders with dark theme", () => {
    const { container } = render(<LinkPageBentoLayout name="Test" theme="dark" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-neutral-950");
  });

  it("renders featured links in larger cells", () => {
    const links = [
      { id: "1", label: "Featured Link", href: "https://example.com", featured: true },
      { id: "2", label: "Regular Link", href: "https://example.com/regular" },
    ];
    render(<LinkPageBentoLayout name="Test" links={links} />);
    expect(screen.getByText("Featured Link")).toBeInTheDocument();
    expect(screen.getByText("Regular Link")).toBeInTheDocument();
  });

  it("renders link descriptions when provided", () => {
    const links = [
      { id: "1", label: "Video", href: "https://example.com", featured: true, description: "Watch now" },
    ];
    render(<LinkPageBentoLayout name="Test" links={links} />);
    expect(screen.getByText("Watch now")).toBeInTheDocument();
  });

  it("renders powered by footer", () => {
    render(<LinkPageBentoLayout name="Test" />);
    expect(screen.getByText("Powered by OpenSite")).toBeInTheDocument();
  });
});
