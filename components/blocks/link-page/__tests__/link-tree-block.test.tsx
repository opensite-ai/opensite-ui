import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkTreeBlock } from "../link-tree-block";

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

describe("LinkTreeBlock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<LinkTreeBlock brandName="Test Brand" />);
    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
  });

  it("renders brand name", () => {
    render(<LinkTreeBlock brandName="My Brand" />);
    expect(screen.getByText("My Brand")).toBeInTheDocument();
  });

  it("renders brand tagline when provided", () => {
    render(<LinkTreeBlock brandName="Test" brandTagline="My tagline" />);
    expect(screen.getByText("My tagline")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<LinkTreeBlock brandName="Test" className="custom-class" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("renders with light theme by default", () => {
    const { container } = render(<LinkTreeBlock brandName="Test" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-muted/30");
  });

  it("renders with dark theme", () => {
    const { container } = render(<LinkTreeBlock brandName="Test" theme="dark" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-neutral-950");
  });

  it("renders with glass theme", () => {
    const { container } = render(<LinkTreeBlock brandName="Test" theme="glass" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-gradient-to-br");
  });

  it("renders links when provided", () => {
    const links = [
      { id: "1", label: "Link 1", href: "https://example.com" },
      { id: "2", label: "Link 2", href: "https://example2.com" },
    ];
    render(<LinkTreeBlock brandName="Test" links={links} />);
    expect(screen.getByText("Link 1")).toBeInTheDocument();
    expect(screen.getByText("Link 2")).toBeInTheDocument();
  });

  it("renders media gallery title when provided", () => {
    const mediaGallery = [
      { id: "m1", type: "image" as const, src: "https://example.com/image.jpg" },
    ];
    render(<LinkTreeBlock brandName="Test" mediaGallery={mediaGallery} mediaGalleryTitle="My Gallery" />);
    expect(screen.getByText("My Gallery")).toBeInTheDocument();
  });

  it("renders powered by footer", () => {
    render(<LinkTreeBlock brandName="Test" />);
    expect(screen.getByText("Powered by OpenSite")).toBeInTheDocument();
  });
});
